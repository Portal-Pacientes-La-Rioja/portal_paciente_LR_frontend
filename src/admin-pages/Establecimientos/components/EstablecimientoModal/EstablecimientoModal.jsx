import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { variantsSpecialties } from '../../../../components/ComponentsData';
import Swal from "sweetalert2";
import AutocompleteComponent from "../../../../components/AutocompleteComponent";
import Loader from "../../../../components/Loader";
import FormGroup from "../../../../components/RegisterForm/Forms/FormGroup";
import { confirm } from "../../../../components/SwalAlertData";
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import MapView from "../../../../components/MapsView/MapsView";

const EstablecimientoModal = (props) => {

    const { show, handleClose, action } = props;
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const initState = {
        name: '',
        code: '',
        address: '',
        lat: 0,
        long: 0,
        tipology: '',
        tipology_category: '',
        dependecy: '',
        department: '',
        location: '',
        city: '',
        activate: 1
    }

    const [especialidadesLista, setEspecialidadesLista] = useState(variantsSpecialties);
    const [especialidadesListaFiltrada, setEspecialidadesListaFiltrada] = useState(especialidadesLista);
    const [especialidades, setEspecialidades] = useState([]);
    const [serviciosLista, setServiciosLista] = useState(variantsSpecialties);
    const [serviciosListaFiltrada, setServiciosListaFiltrada] = useState(serviciosLista);
    const [servicios, setServicios] = useState([]);

    const [valuesForm, setValuesForm] = useState(initState);
    const [newValue, setNewValue] = useState("") //Get and set values form to validate required fields


    //SET VALUES FROM DATA
    const setForm = () => {
        // if (show) {
        //     Object.entries(data).forEach(([key, value]) => {
        //         setValue(`${key}`, value);
        //         values[`${key}`] = value;
        //     });
        // }
    }
    useEffect(() => {
        setForm();
        setLoading(false);
    }, [show])

    // SET NEW VALUES
    const handleChange = (e) => {
        // console.log(e)
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

    const handleEspecialidades = (selected) => {
        let existe = especialidades?.find((item) => item.id === selected.id);
        if (!existe && selected.id) {
            // AGREGA A ARRAY DE ITEMS SELECCIONADOS
            let array = [...especialidades];
            array.push(selected);
            setEspecialidades(array);
            // ELIMINA DE LISTADO
            let list = [...especialidadesListaFiltrada];
            let indexItem = list.findIndex((item) => item.id === selected.id);
            list.splice(indexItem, 1);
            setEspecialidadesListaFiltrada(list);
        }
    }

    const eliminarEspecialidad = (itemID, index) => {
        // ELIMINA DE ELEMENTOS SELECCIONADOS
        let array = [...especialidades];
        array.splice(index, 1);
        setEspecialidades(array);
        //  AGREGA A LISTADO
        let list = [...especialidadesListaFiltrada];
        let item = especialidadesLista.find((item) => item.id === itemID);
        list.push(item);
        setEspecialidadesListaFiltrada(list);
    }

    const handleServicios = (selected) => {
        let existe = servicios?.find((item) => item.id === selected.id);
        if (!existe && selected.id) {
            let array = [...servicios];
            array.push(selected);
            setServicios(array);
            // ELIMINA DE LISTADO
            let list = [...serviciosListaFiltrada];
            let indexItem = list.findIndex((item) => item.id === selected.id);
            list.splice(indexItem, 1);
            setServiciosListaFiltrada(list);
        }
    }

    const eliminarServicios = (itemID, index) => {
        let array = [...servicios];
        array.splice(index, 1);
        setServicios(array);
        //  AGREGA A LISTADO
        let list = [...serviciosListaFiltrada];
        let item = serviciosLista.find((item) => item.id === itemID);
        list.push(item);
        setServiciosListaFiltrada(list);
    }

    useEffect(() => {
        if (show) {
        }
        setLoading(false);
    }, [show]);

    const onSubmit = () => {
        Swal.fire(confirm(`¿Confirma ${action === 'add' ? 'creación' : 'edición'} de Establecimiento?`)).then((result) => {
            if (result.isConfirmed) {
                // sendUpdatePersonForm(body)
            }
        });
        setLoading(true)
    }

    const createEstablecimiento = () => {

    }

    const updateEstablecimiento = () => {

    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="d-flex align-items-center">
                    {action === 'add' ? 'Agregar' : 'Editar'} Establecimiento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? <Loader isActive={loading} />
                    : <Container fluid>
                        <Form className="form-group form_register" onSubmit={handleSubmit(onSubmit)}>
                            <Row className='in d-flex mb-3'>
                                <div className="d-flex align-items-center mb-2">
                                    <MdIcon.MdEditNote style={{ fontSize: '1rem', marginRight: '0.5rem' }}></MdIcon.MdEditNote>
                                    <h5 className="mb-0">Datos del Establecimiento</h5>
                                </div>
                                <Col xs={12} className="mb-2">
                                    <FormGroup
                                        inputType={'input'}
                                        label={'Nombre de Establecimiento'}
                                        name={'name'}
                                        value={valuesForm.name}
                                        onChange={handleChange}
                                    />
                                </Col>
                                {/* <Col xs={12} sm={4} className="mb-2">
                                    <FormGroup
                                        inputType={'input'}
                                        label={'Código'}
                                        name={'code'}
                                        value={valuesForm.code}
                                        onChange={handleChange}
                                    />
                                </Col> */}
                                <Col xs={12} sm={6} className="mb-2">
                                    <FormGroup
                                        inputType={'input'}
                                        label={'Domicilio'}
                                        name={'address'}
                                        value={valuesForm.address}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} sm={6} className="mb-2">
                                    <FormGroup
                                        inputType={'input'}
                                        label={'Departamento'}
                                        name={'department'}
                                        value={valuesForm.department}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} sm={6} className="mb-2">
                                    <FormGroup
                                        inputType={'input'}
                                        label={'Localidad'}
                                        name={'location'}
                                        value={valuesForm.location}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} sm={6} className="mb-2">
                                    <FormGroup
                                        inputType={'input'}
                                        label={'Ciudad'}
                                        name={'city'}
                                        value={valuesForm.city}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row className='in d-flex mb-3'>
                                <div className="d-flex align-items-center mb-2">
                                    <FaIcon.FaHospital style={{ fontSize: '1rem', marginRight: '0.5rem' }}></FaIcon.FaHospital>
                                    <h5 className="mb-0">Datos del Servicio</h5>
                                </div>
                                <Col xs={12} sm={6} className="mb-2">
                                    <FormGroup
                                        inputType={'select'}
                                        label={'Dependencia'}
                                        name={'dependency'}
                                        value={valuesForm.dependency}
                                        variants={'dependency'}
                                        handleChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} sm={6} className="mb-2">
                                    <FormGroup
                                        inputType={'select'}
                                        label={'Tipo Efector'}
                                        name={'tipology'}
                                        value={valuesForm.tipology}
                                        variants={'tipology'}
                                        handleChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <FormGroup
                                        inputType={'select'}
                                        label={'Categoría'}
                                        name={'tipology_category'}
                                        value={valuesForm.tipology_category}
                                        variants={'tipology_category'}
                                        handleChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12} className="mb-2 z-index-10">
                                    <Form.Group>
                                        <Form.Label>Especialidades</Form.Label>
                                        <AutocompleteComponent
                                            variants={especialidadesListaFiltrada}
                                            handleChange={handleEspecialidades}
                                            clearInput={true}
                                        />
                                        {especialidades.length > 0 && <div className="d-flex flex-wrap mb-3">
                                            {especialidades.map((esp, index) => {
                                                return <div key={index} className="d-flex in-fast badge bg-secondary p-2 align-items-center m-1">
                                                    <span>{esp.name}</span>
                                                    <button className="btn p-0 px-2 text-light" type="button" onClick={() => eliminarEspecialidad(esp.id, index)}>X</button>
                                                </div>
                                            })}
                                        </div>}
                                    </Form.Group>
                                </Col>
                                <Col xs={12} className="mb-2">
                                    <Form.Group>
                                        <Form.Label>Servicios</Form.Label>
                                        <AutocompleteComponent
                                            variants={serviciosListaFiltrada}
                                            handleChange={handleServicios}
                                            clearInput={true}
                                        />
                                        {servicios.length > 0 && <div className="d-flex flex-wrap mb-3">
                                            {servicios.map((serv, index) => {
                                                return <div key={index} className="d-flex in-fast badge bg-secondary p-2 align-items-center m-1">
                                                    <span>{serv.name}</span>
                                                    <button className="btn p-0 ps-2 text-light" type="button" onClick={() => eliminarServicios(serv.id, index)}>X</button>
                                                </div>
                                            })}
                                        </div>}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <hr />
                            <Row className='in d-flex mb-3'>
                                <div className="d-flex align-items-center mb-2">
                                    <FaIcon.FaMapMarkerAlt style={{ fontSize: '1rem', marginRight: '0.5rem' }}></FaIcon.FaMapMarkerAlt>
                                    <h5 className="mb-0">Mapa</h5>
                                </div>
                                <MapView latitud={-29.16195} longitud={-67.4974} descripcion={"Hola"}></MapView>
                            </Row>
                            <div className='d-flex justify-content-end'>
                                <Button variant='outline-secondary' className="me-2" onClick={() => handleClose()}>Cancelar</Button>
                                <Button variant='primary' type="submit" >
                                    {action === 'add' ? <MdIcon.MdAdd style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} /> : <MdIcon.MdEditNote style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />}
                                    {action === 'add' ? 'Agregar' : 'Guardar cambios'}
                                </Button>
                            </div>
                        </Form>
                    </Container>
                }
            </Modal.Body>
        </Modal>
    )
}

export default EstablecimientoModal;
