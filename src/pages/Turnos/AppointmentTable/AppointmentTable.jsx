import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { confirmAppointment, error, success, warning } from '../../../components/SwalAlertData';
import usePatient from '../../../hooks/usePatient'
import DataNotFound from '../../../components/DataNotFound';
import { Table } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { postAppointment } from '../../../services/applicactionService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AppointmentTable({ dataTable, valuesForm, institutions, specialties, coverage }) {


  const [loading, setLoading] = useState(false)
  const history = useHistory();
  // //patient
  const p = usePatient()
  // //form
  const myDivRef = useRef(null);
  const [selectedAppointment, setSelectedAppointment] = useState('');

  const [values, setValues] = useState({})

  useEffect(() => {
    const newValues = {
      appointmentDataEmail: valuesForm.email,
      bookingAppointmentDto: {
        coverageId: valuesForm.coverage,
        day: "",
        diaryId: 0,
        phoneNumber: valuesForm.phoneNumber,
        hour: "",
        openingHoursId: 0,
        specialtyId: valuesForm.specialty,
      },
      bookingPersonDto: {
        idNumber: p.patient.identification_number,
        birthDate: p.patient.birthdate.split('T')[0],
        genderId: p.patient.id_gender,
        firstName: p.patient.name,
        lastName: p.patient.surname,
        email: valuesForm.email
      }
    }
    setValues(newValues)
  }, [valuesForm])

  useEffect(() => {
    if (myDivRef.current) {
      const topOffset = 200;
      const elementPosition = myDivRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - topOffset, behavior: 'smooth' });
    }
  }, [dataTable])

  const handleSelected = (appointment) => {
    if (valuesForm.email 
      && valuesForm.phoneNumber
      && valuesForm.institution
      && valuesForm.specialty
      && valuesForm.coverage) {
      setSelectedAppointment(appointment);
      handleRequest(appointment)
    } else {
      Swal.fire(warning('Faltan datos en formulario'))
    }
  }


  const handleRequest = (appointment) => {
    const options = { 
      weekday: 'long',  
      day: 'numeric',    
      month: 'long',     
      year: 'numeric'    
  };

    const confirmData = {
      nameAndSurname: values.bookingPersonDto.firstName+' '+values.bookingPersonDto.lastName,
      email: values.bookingPersonDto.email,
      phoneNumber: values.bookingAppointmentDto.phoneNumber,
      date: new Date(appointment.diary.startDate).toLocaleDateString('es-ES', options),
      hour: appointment.diary.from.hour,
      professional: appointment.diary.doctorsOfficeDescription,
      institution: institutions.find((i) => i.id === valuesForm.institution).description,
      specialty: specialties.find((s) => s.id === valuesForm.specialty).description,
      coverage: coverage.find((c) => c.id === valuesForm.coverage).description
    }
    Swal.fire(confirmAppointment(confirmData)).then((result) => {
      if (result.isConfirmed) {
          send(builRequestBody(appointment))
      }
    })
  }

  const builRequestBody = (appointment) => {
    const bookingAppointmentDto = {
      ...values.bookingAppointmentDto,
      diaryId: appointment.diary.id,
      day: appointment.diary.startDate,
      hour: appointment.diary.from.hour,
      openingHoursId: appointment.diary.openingHoursId
    }
    const body = {
      ...values,
      bookingAppointmentDto: bookingAppointmentDto
    }
    return body
  }

  const send = useCallback(
    (requestBody) => {
      postAppointment(requestBody, valuesForm.institution)
        .then((res) => {
          if (res.ok) {
            Swal.fire(success('La solicitud fue enviada con éxito'));
            history.push('/usuario/turnos/mis-turnos')
          } else {
            throw new Error("Hubo un error al enviar la solicitud");
          }
        })
        .catch((err) => {
          console.error('error', err)
          Swal.fire(error('Hubo un error al enviar la solicitud'))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [],
  )

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  }


  return (
    <>
      {loading ?
        <Loader isActive={loading}></Loader>
        : <div ref={myDivRef} style={{ minHeight: '75vh' }} className='in'>
          {dataTable && dataTable.length > 0 ?
            <div>
              <h5>Seleccionar turno</h5>
              <Table striped bordered borderless hover className='text-center'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Profesional</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((appointment, i) => {
                    return (
                      <tr key={i} onClick={() => {handleSelected(appointment)}} style={{cursor:'pointer'}}>
                        <td>
                          <input className="form-check-input" type="radio" name="selectedAppointment" id="selectedAppointment1" 
                            onChange={() => { }}
                            checked={appointment.diary.id === selectedAppointment?.diary?.id} />
                        </td>
                        <td>{formatDateToDDMMYYYY(appointment.diary.startDate)}</td>
                        <td>{appointment.diary.from.hour}</td>
                        <td>{appointment.diary.doctorsOfficeDescription}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            :
            <DataNotFound text="turnos disponibles" />
          }
        </div>
      }
    </>
  )
}

export default AppointmentTable;
