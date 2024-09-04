import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ErrorMessage } from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader';
import SelectType from '../../../components/SelectType';
import { error } from '../../../components/SwalAlertData';
import usePatient from '../../../hooks/usePatient'
import { getAvailableAppointmentsService, getCoverageHSI, getInstitutionsHSI, getSpecialtiesHSI, mockDataAppointments } from '../../../services/applicactionService';
import AppointmentTable from '../AppointmentTable';
import AutocompleteComponent from '../../../components/AutocompleteComponent';
import * as MdIcon from 'react-icons/md'

function AppointmentForm() {


  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  // //patient
  const p = usePatient()
  // //form
  const { register, setValue, handleSubmit, formState: { errors, isValid } } = useForm();
  const [dataTable, setDataTable] = useState([])
  const [institutions, setInstitutions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [coverage, setCoverage] = useState([]);

  const [valuesForm, setValuesForm] = useState({
    specialty: "",
    institution: "",
    coverage: "",
    email: p.patient.email,
    phoneNumber: p.patient.phone_number
  })

  const getInstitutions = useCallback(
    () => {
      getInstitutionsHSI()
        .then((res) => {
          setInstitutions(res);
        })
        .catch((err) => { console.error(err) })
    },
    [institutions]
  )

  const getSpecialties = useCallback(
    () => {
      getSpecialtiesHSI()
        .then((res) => {
          setSpecialties(res);
        })
        .catch((err) => { console.error(err) })
    },
    [specialties]
  )

  const getCoverage = useCallback(
    () => {
      getCoverageHSI()
        .then((res) => {
          setCoverage(res);
        })
        .catch((err) => { console.error(err) })
        .finally(() => {
          setLoading(false)
        })
    },
    [specialties]
  )

  useEffect(() => {
    setLoading(true)
    getInstitutions()
    getSpecialties()
    getCoverage()
  }, [])

  const handleChange = (e) => {
    if (e.target?.name) {
      let targetName = e.target.name
      setValuesForm({
        ...valuesForm,
        [targetName]: e.target?.value,
      });
    }
  }

  useEffect(() => {
    setValue('institution', valuesForm.institution);
    setValue('specialty', valuesForm.specialty);
    setValue('coverage', valuesForm.coverage);
  }, [valuesForm])

  const handleSearchInstitution = (value) => {
    handleChangeSearch(value, 'institution')
  }
  const handleSearchSpecialty = (value) => {
    handleChangeSearch(value, 'specialty')
  }

  const handleSearchCoverage = (value) => {
    handleChangeSearch(value, 'coverage')
  }


  const handleChangeSearch = (value, type) => {
    if (typeof value !== 'string' && value.id) {
      let variants
      switch (type) {
        case 'institution':
          variants = institutions
          break;
        case 'specialty':
          variants = specialties
          break;
        case 'coverage':
          variants = coverage
          break;
        default:
          break;
      }
      let selected = variants.find((item) => {
        return item.description.toLowerCase().trim() === value.name.toLowerCase()
      }).id
      setValuesForm({ ...valuesForm, [type]: selected })
    }
  }

  const onSubmit = () => {
    setLoadingData(true)
    getAvailableAppointments(valuesForm.institution, valuesForm.specialty, valuesForm.coverage);
  }


  const getAvailableAppointments = useCallback(
    (institution_id, specialty_id, coverage_id) => {
      getAvailableAppointmentsService(institution_id, specialty_id, coverage_id)
        .then((res) => {
          setDataTable(mockDataAppointments.availability)
        })
        .catch((err) => {
          console.error('error', err)
          Swal.fire(error('Hubo un error al enviar la solicitud'))
        })
        .finally(() => {
          setLoadingData(false)
        })
    }, [])

  return (
    <>
      {loading ? <Loader isActive={loading} />
        : <Container fluid>
          <Row>
            <Col xs={12} lg={6}>
                <Form className="form-group in" onSubmit={handleSubmit(onSubmit)}>
                  <Col xs={12} lg={8} className="d-flex">Paciente:
                    <span className='ps-1 text-uppercase fw-normal'>
                      {p.patient.name + ' ' + p.patient.surname}
                    </span>
                  </Col>
                  <Col xs={12} lg={8}>Dni:
                    <span className='ps-1 text-uppercase fw-normal'>
                      {p.patient.identification_number}
                    </span>
                  </Col>
                  <Col xs={12} lg={8}>
                    <Form.Group className="mt-4" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="text"
                        value={valuesForm.email}
                        className="form-control"
                        {...register('email', {
                          required: {
                            value: true,
                            message: "El campo es requerido."
                          },
                          pattern: {
                            value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                            message: "El formato ingresado no es válido"
                          }
                        })}
                        onChange={e => handleChange(e)}
                      />
                      {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                    </Form.Group>
                    <Form.Group className="mt-4" controlId="formBasicEmail">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        name="phoneNumber"
                        type="text"
                        value={valuesForm.phoneNumber}
                        className="form-control"
                        {...register('phoneNumber', {
                          required: {
                            value: true,
                            message: "El campo es requerido."
                          }
                        })}
                        onChange={e => handleChange(e)}
                      />
                      {errors.phoneNumber && <ErrorMessage><p>{errors.phoneNumber.message}</p></ErrorMessage>}
                    </Form.Group>
                  </Col>
                  <Row className="d-flex">
                    <Col xs={12}>
                      <Form.Group className="mt-4">
                        <Form.Label>Centro Médico</Form.Label>
                        <AutocompleteComponent
                          variants={institutions}
                          handleChange={handleSearchInstitution}
                          {...register('institution', {
                            required: {
                              value: true,
                              message: "El campo es requerido."
                            }
                          })}
                        />
                        {errors.institution && <ErrorMessage><p>{errors.institution.message}</p></ErrorMessage>}
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mt-4">
                        <Form.Label>Especialidad médica</Form.Label>
                        <AutocompleteComponent
                          variants={specialties}
                          handleChange={handleSearchSpecialty}
                          {...register('specialty', {
                            required: {
                              value: true,
                              message: "El campo es requerido."
                            }
                          })}
                        />
                        {errors.specialty && <ErrorMessage><p>{errors.specialty.message}</p></ErrorMessage>}

                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mt-4">
                        <Form.Label>Cobertura</Form.Label>
                        <AutocompleteComponent
                          variants={coverage}
                          handleChange={handleSearchCoverage}
                          {...register('coverage', {
                            required: {
                              value: true,
                              message: "El campo es requerido."
                            }
                          })}
                        />
                        {errors.coverage && <ErrorMessage><p>{errors.coverage.message}</p></ErrorMessage>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className='mt-4 d-flex justify-content-end'>
                    <Button variant='danger' className="me-2" type="submit"><MdIcon.MdSearch className='me-2'/>Buscar turnos</Button>
                  </div>
                </Form>
            </Col>
            <Col className="mt-4" xs={12}>
                {loadingData && <Spinner animation="border" variant="danger" />}
              {dataTable.length > 0 &&
                <AppointmentTable dataTable={dataTable} valuesForm={valuesForm} institutions={institutions} specialties={specialties} coverage={coverage}></AppointmentTable>              }
            </Col>
          </Row>

        </Container>
      }
    </>
  )
}

export default AppointmentForm;
