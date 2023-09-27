import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader";
import FormGroup from "../../../../components/RegisterForm/Forms/FormGroup";
import { confirm, error, success } from "../../../../components/SwalAlertData";
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import Selector from "../Selector";
import { createInstitution, getEspecialidadesAll, getInstitutionsByID, getServiciosAll, updateInstitution } from "../../../../services/institutionsServices";
import MapView from "../../../../components/MapsView/MapsView";
import { getAllDepartamentosFrom, getAllLocalidadesFrom, getAllProvincias } from "../../../../services/searchAddressService";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

const EstablecimientoModal = (props) => {

    const { show, handleClose, action, institution } = props;
    const [loading, setLoading] = useState(true);
    const [actionModal, setActionModal] = useState(action);
    //////// FORM /////////////////////////////////////////////////////////////
    const initState = {
        id: 0,
        name: '',
        codigo: '',
        domicilio: '',
        lat: 0,
        long: 0,
        tipologia: '',
        categoria_tipologia: '',
        dependencia: '',
        departamento: '',
        localidad: '',
        ciudad: '',
        tetlefono: '',
        email: '',
        activate: 1,
        services: [],
        especialidades: []
    }
    const [valuesForm, setValuesForm] = useState(initState);
    const [newValue, setNewValue] = useState("") //Get and set values form to validate required fields
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const registerRequired = {
        required: {
            value: true,
            message: "El campo es requerido.",
        },
    }
    //////// FORM /////////////////////////////////////////////////////////////
    /////// SELECTORES ////////////////////////////////////////////////////////
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadesSelected, setEspecialidadesSelected] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [serviciosSelected, setServiciosSelected] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
    const [tipoSelector, setTipoSelector] = useState('');
    const openSelector = (tipo) => {
        setTipoSelector(tipo)
        setShowSelector(true);
    }
    const closeSelector = (tipo, dataSelecetd) => {
        if (dataSelecetd) {
            setEspecialidadesYServicios(tipo, dataSelecetd)
        }
        setShowSelector(false);
    }
    /////// SELECTORES ////////////////////////////////////////////////////////
    // //// LOCALIZACION ////////////////////////////////////////////////////////
    const [ubicacion, setUbicacion] = useState({ lat: 0, long: 0 });
    const provinciaID = '46' //hardcode; 
    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoSelected, setDepartamentoSelected] = useState('');
    const [localidades, setLocalidades] = useState([]);
    const [localidadSelected, setLocalidadSelected] = useState('');



    const getInstitutionData = useCallback(
        (idInstitution) => {
            getInstitutionsByID(idInstitution)
                .then((res) => {
                    if (res) setForm(res)
                    return valuesForm
                })
                .then((res) => {
                    if (res) {
                        setUbicacion({ lat: res.lat, long: res.long })
                        setEspecialidadesYServicios('especialidades', res.especialidades)
                        setEspecialidadesYServicios('services', res.services)
                    }
                })
                .then(() => setLoading(false))
                .catch((err) => {
                    Swal.fire(error('Error al obtener datos de establecimeinto.'))
                    handleClose();
                })
        }, [])

    //SET VALUES FROM DATA
    const setForm = (data) => {
        if (show) {
            Object.entries(data).forEach(([key, value], index, arr) => {
                let newValue = value ?? '';
                setValue(`${key}`, newValue);
                valuesForm[`${key}`] = newValue;
            });
        }
    }

    useEffect(() => {
        getDepartamentos(provinciaID);
        getEspecialidades()
        getServicios()
        if (actionModal === 'edit') getInstitutionData(institution)
        else setLoading(false)
    }, [show])

    // SET NEW VALUES
    const handleChange = (e) => {
        if (e.target?.name) {
            let targetName = e.target.name;
            let targetValue = e.target.value;
            setValuesForm({
                ...valuesForm,
                [`${targetName}`]: targetValue,
            });
            setNewValue(targetName);
        }
    }

    const handleChangeUbicacion = (e) => {
        let targetName = e.target.name;
        let targetValue = e.target.value;
        let variants = targetName === 'departamento' ? departamentos : localidades
        let stringValue = variants.find((item) => item.id === targetValue)?.name
        valuesForm[`${targetName}`] = stringValue;
        setNewValue(targetName);

        if (targetName === 'departamento') {
            getLocalidades(targetValue)
        }
    }

    useEffect(() => {
        setValue(`${newValue}`, valuesForm[newValue]);
    }, [newValue, valuesForm[newValue]])

    const getEspecialidades = useCallback(
        () => {
            getEspecialidadesAll()
                .then((res) => {
                    let ordenado = res.sort((a, b) => {
                        if (a.name === b.name) { return 0; }
                        if (a.name < b.name) { return -1; }
                        return 1;
                    });
                    return ordenado
                })
                .then((res) => {
                    if (res?.length > 0) setEspecialidades(res);
                })
                .catch((err) => { console.error(err) })
        },
        [],
    )

    const getServicios = useCallback(
        () => {
            getServiciosAll()
                .then((res) => {
                    let ordenado = res.sort((a, b) => {
                        if (a.name.trim() === b.name.trim()) { return 0; }
                        if (a.name.trim() < b.name.trim()) { return -1; }
                        return 1;
                    });
                    return ordenado
                })
                .then((res) => {
                    if (res?.length > 0) setServicios(res);
                })
                .catch((err) => { console.error(err) })
        },
        [],
    )

    const getDepartamentos = useCallback(
        (provinciaID) => {
            getAllDepartamentosFrom(provinciaID)
                .then((res) => {
                    return res.map((item) => {
                        item.name = item.nombre
                        return item
                    })
                })
                .then((res) => setDepartamentos(res))
                .catch((err) => console.error(err))
        }, [])

    const getLocalidades = useCallback(
        (departamentoID) => {
            getAllLocalidadesFrom(departamentoID)
                .then((res) => {
                    return res.map((item) => {
                        item.name = item.nombre
                        return item
                    })
                })
                .then((res) => setLocalidades(res))
                .catch((err) => console.error(err))
        }, [])

    useEffect(() => {
        if (departamentoSelected !== '') getLocalidades(departamentoSelected)
    }, [departamentoSelected])

    useEffect(() => {
        if (actionModal === 'edit' && departamentos.length > 0 && valuesForm.departamento) {
            setDepartamentoData(valuesForm.departamento)
        }
    }, [actionModal, departamentos, valuesForm.departamento])

    useEffect(() => {
        if (actionModal === 'edit' && localidades.length > 0 && valuesForm.localidad) {
            setLocalidadData(valuesForm.localidad)
        }
    }, [actionModal, localidades, valuesForm])

    const setEspecialidadesYServicios = (tipo, data) => {
        let arrayIDs = data.map((item) => item.id)
        valuesForm[tipo] = arrayIDs
        if (tipo === 'especialidades') setEspecialidadesSelected(data)
        if (tipo === 'services') setServiciosSelected(data)
    }

    const setDepartamentoData = (data) => {
        let selected = departamentos.find((item) => item.name.toLowerCase().trim() === data.toLowerCase().trim());
        if (selected) setDepartamentoSelected(selected.id)
    }

    const setLocalidadData = (data) => {
        let selected = localidades.find((item) => item.name.toLowerCase().trim() === data.toLowerCase().trim());
        if (selected) setLocalidadSelected(selected.id)
    }

    const onSubmit = () => {
        Swal.fire(confirm(`¿Confirma ${actionModal === 'add' ? 'creación' : 'edición'} de Establecimiento?`)).then((result) => {
            if (result.isConfirmed) {
                buildBodyToSend()
            }
        });
    }

    const buildBodyToSend = () => {
        setLoading(true)
        const body = { ...valuesForm }
        actionModal === 'add'
            ? createEstablecimiento(body)
            : updateEstablecimiento(body)
    }

    const createEstablecimiento = useCallback(
        (body) => {
            createInstitution(body)
                .then((res) => {
                    if (res.ok) {
                        return res.text()
                            .then(text => {
                                let readeble = JSON.parse(text)
                                console.log(text)
                                const newInstitution = readeble.value
                                setActionModal('edit')
                                getInstitutionData(newInstitution)
                            })
                    } else {
                        throw new Error('Error')
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error('Error al crear establecimiento'))
                    setLoading(false)
                })
        }, [])

    const updateEstablecimiento = useCallback(
        (body) => {
            updateInstitution(body)
                .then((res) => {
                    if (res.ok) {
                        Swal.fire(success('Establecimiento actualizado'));
                        getInstitutionData(institution)
                    } else {
                        throw new Error('Error')
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error('Error al editar establecimiento'))
                    setLoading(false)
                })
        }, [])

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            fullscreen={actionModal === 'edit'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="d-flex align-items-center">
                    {actionModal === 'add' ? 'Agregar' : 'Editar'} Establecimiento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '500px' }}>
                {loading ? <Loader isActive={loading} />
                    : <Container fluid>
                        <Row className="d-flex flex-wrap-reverse">
                            {actionModal === 'edit' && ubicacion.lat !== '' && ubicacion.long !== '' &&
                                <Col xs={12} lg={6}>
                                    <Container>
                                        <Row className='in d-flex mb-3'>
                                            <Col xs={12} className="d-flex align-items-center mb-2">
                                                <FaIcon.FaMapMarkerAlt style={{ fontSize: '1rem', marginRight: '0.5rem' }}></FaIcon.FaMapMarkerAlt>
                                                <h5 className="mb-0">Ubicación</h5>
                                            </Col>
                                            <Col xs={12} style={{ height: '800px' }}>
                                                <MapView latitud={ubicacion.lat} longitud={ubicacion.long} descripcion={valuesForm.domicilio + ', ' + valuesForm.localidad}></MapView>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            }
                            <Col>
                                <Form className="form-group form_establecimiento" onSubmit={handleSubmit(onSubmit)}>
                                    <Container>
                                        <Row className='in d-flex'>
                                            <div className="d-flex align-items-center mb-2">
                                                <MdIcon.MdEditNote style={{ fontSize: '1rem', marginRight: '0.5rem' }}></MdIcon.MdEditNote>
                                                <h5 className="mb-0">Datos del Establecimiento</h5>
                                            </div>
                                            <Col xs={12} className="mb-2">
                                                <FormGroup
                                                    inputType={'input'}
                                                    paste={true}
                                                    label={'Nombre de Establecimiento'}
                                                    name={'name'}
                                                    value={valuesForm.name}
                                                    {...register('name', registerRequired)}
                                                    onChange={handleChange}
                                                />
                                                {errors.name && <ErrorMessage><p>{errors.name.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'input'}
                                                    type='number'
                                                    paste={true}
                                                    label={'Teléfono'}
                                                    name={'telefono'}
                                                    value={valuesForm.telefono}
                                                    {...register('telefono', registerRequired)}
                                                    onChange={handleChange}
                                                />
                                                {errors.telefono && <ErrorMessage><p>{errors.telefono.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'input'}
                                                    type='email'
                                                    paste={true}
                                                    label={'Email'}
                                                    name={'email'}
                                                    value={valuesForm.email}
                                                    {...register('email', registerRequired)}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <ErrorMessage><p>{errors.email.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'select'}
                                                    label={'Departamento'}
                                                    name={'departamento'}
                                                    value={departamentoSelected}
                                                    selectValue={departamentoSelected}
                                                    variants={{ data: departamentos }}
                                                    handleChange={handleChangeUbicacion}
                                                    {...register('departamento', registerRequired)}
                                                />
                                                {errors.departamento && <ErrorMessage><p>{errors.departamento.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'select'}
                                                    label={'Localidad'}
                                                    name={'localidad'}
                                                    value={localidadSelected}
                                                    selectValue={localidadSelected}
                                                    variants={{ data: localidades }}
                                                    handleChange={handleChangeUbicacion}
                                                    {...register('localidad', registerRequired)}
                                                />
                                                {errors.localidad && <ErrorMessage><p>{errors.localidad.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'input'}
                                                    paste={true}
                                                    label={'Domicilio'}
                                                    name={'domicilio'}
                                                    value={valuesForm.domicilio}
                                                    {...register('domicilio', registerRequired)}
                                                    onChange={handleChange}
                                                />
                                                {errors.domicilio && <ErrorMessage><p>{errors.domicilio.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'input'}
                                                    paste={true}
                                                    label={'Código de establecimiento'}
                                                    name={'codigo'}
                                                    value={valuesForm.codigo}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2 justify-content-center">
                                                {actionModal === 'edit' &&
                                                    <div
                                                        className={`badge bg-${valuesForm.activate ? 'success' : 'danger'} d-flex align-items-center justify-content-center opacity-75 rounded-pill`}
                                                        style={{ height: '28px', marginTop: '14px', fontWeight: '500' }}>
                                                        <span>
                                                            {valuesForm.activate ? 'Activo ✓' : 'Inactivo'}
                                                        </span>
                                                    </div>
                                                }
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className='in d-flex'>
                                            <div className="d-flex align-items-center mb-2">
                                                <FaIcon.FaHospital style={{ fontSize: '1rem', marginRight: '0.5rem' }}></FaIcon.FaHospital>
                                                <h5 className="mb-0">Datos del Servicio</h5>
                                            </div>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'select'}
                                                    label={'Dependencia'}
                                                    name={'dependencia'}
                                                    value={valuesForm.dependencia}
                                                    selectValue={valuesForm.dependencia}
                                                    variants={'dependency'}
                                                    handleChange={handleChange}
                                                    {...register('dependencia', registerRequired)}
                                                />
                                                {errors.dependencia && <ErrorMessage><p>{errors.dependencia.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} sm={6} className="mb-2">
                                                <FormGroup
                                                    inputType={'select'}
                                                    label={'Tipo Efector'}
                                                    name={'tipologia'}
                                                    value={valuesForm.tipologia}
                                                    selectValue={valuesForm.tipologia}
                                                    variants={'tipology'}
                                                    handleChange={handleChange}
                                                    {...register('tipologia', registerRequired)}
                                                />
                                                {errors.tipologia && <ErrorMessage><p>{errors.tipologia.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} className="mb-2">
                                                <FormGroup
                                                    inputType={'select'}
                                                    label={'Categoría'}
                                                    name={'categoria_tipologia'}
                                                    value={valuesForm.categoria_tipologia}
                                                    selectValue={valuesForm.categoria_tipologia}
                                                    variants={'tipology_category'}
                                                    handleChange={handleChange}
                                                    {...register('categoria_tipologia', registerRequired)}
                                                />
                                                {errors.categoria_tipologia && <ErrorMessage><p>{errors.categoria_tipologia.message}</p></ErrorMessage>}
                                            </Col>
                                            <Col xs={12} className="mb-2 d-flex">
                                                <div className="d-flex align-items-baseline mb-2">
                                                    <label className="form-label me-1">Especialidades</label>
                                                    <button className="btn text-primary" type="button" onClick={() => openSelector('especialidades')}>{valuesForm.especialidades.length > 0 ? 'Agregar/Quitar' : 'Agregar'}...</button>
                                                </div>
                                                <div className="est-list">
                                                    {especialidadesSelected.length > 0 && especialidadesSelected.map((item) => {
                                                        return <span className="me-1 d-inline-block" key={item.id}>{item.name + ' - '}</span>
                                                    })}
                                                </div>
                                            </Col>
                                            <Col xs={12} className="mb-2 d-flex">
                                                <div className="d-flex align-items-baseline mb-2">
                                                    <label className="form-label me-1">Servicios</label>
                                                    <button className="btn text-primary" type="button" onClick={() => openSelector('services')}>{valuesForm.services.length > 0 ? 'Agregar/Quitar' : 'Agregar'}...</button>
                                                </div>
                                                <div className="est-list">
                                                    {serviciosSelected.length > 0 && serviciosSelected.map((item) => {
                                                        return <span className="me-1 d-inline-block" key={item.id}>{item.name + ' - '}</span>
                                                    })}
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className='d-flex justify-content-end py-4'>
                                                <Button variant='outline-secondary' className="d-inline-block me-2" onClick={() => handleClose()}>Cancelar</Button>
                                                <Button variant='primary' type="submit">
                                                    {actionModal === 'add' ? <MdIcon.MdAdd style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} /> : <MdIcon.MdEditNote style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />}
                                                    {actionModal === 'add' ? 'Agregar Esatblecimiento' : 'Guardar cambios'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                }
            </Modal.Body>
            {showSelector &&
                <Selector
                    show={showSelector}
                    tipo={tipoSelector}
                    close={closeSelector}
                    values={valuesForm}
                    dataList={tipoSelector === 'especialidades' ? especialidades : servicios} />
            }
        </Modal>
    )
}

export default EstablecimientoModal;
