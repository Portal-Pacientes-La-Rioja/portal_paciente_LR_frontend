import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco-2.jpg'
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import AutocompleteComponent from '../../components/AutocompleteComponent';
import { useState } from 'react';
import EstablecimientoModal from './components/EstablecimientoModal';



const Establecimientos = () => {

    const [show, setShow] = useState(false);
    const [action, setAction] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
    };

    const openModal = (action) => {
        setAction(action);
        handleShow();
    }

    const [establecimientos, setEstablecimientos] = useState(false);

    const establecimientoList = [
        { id: 1, nombre: 'Establecimiento 1', ciudad: 'Ciudad 1', direccion: 'Direccion 1', telefono: 'Teléfono 1' },
        { id: 2, nombre: 'Establecimiento 2', ciudad: 'Ciudad 2', direccion: 'Direccion 2', telefono: 'Teléfono 2' },
        { id: 3, nombre: 'Establecimiento 3', ciudad: 'Ciudad 3', direccion: 'Direccion 3', telefono: 'Teléfono 3' },
        { id: 4, nombre: 'Establecimiento 4', ciudad: 'Ciudad 4', direccion: 'Direccion 4', telefono: 'Teléfono 4' },
        { id: 5, nombre: 'Establecimiento 5', ciudad: 'Ciudad 5', direccion: 'Direccion 5', telefono: 'Teléfono 5' },
        { id: 6, nombre: 'Establecimiento 6', ciudad: 'Ciudad 6', direccion: 'Direccion 6', telefono: 'Teléfono 6' },
        { id: 7, nombre: 'Establecimiento 7', ciudad: 'Ciudad 7', direccion: 'Direccion 7', telefono: 'Teléfono 7' }
    ];

    const handleChangeSearch = (selected) => {
        console.log('selected', selected);
    }

    return (
        <Container className="main pt-5">
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} lg={6} className="d-flex">
                    <FaIcon.FaHospital className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                    <h5 className='section-title'>Establecimientos</h5>
                </Col>
                <Col xs={8} sm={6} lg={3} className='d-flex justify-content-end'>
                    <Button variant="danger" onClick={() => openModal('add')}>+ Agregar Establecimiento</Button>
                </Col>
                <Col xs={4} sm={6} lg={3}>
                    <AutocompleteComponent 
                        variants={establecimientoList}
                        handleChange={handleChangeSearch}
                    />
                </Col>
            </Row>
            <Row className='p-3'>
                <Table bordered borderless striped hover>
                    <thead>
                        <tr>
                            <th>Establecimiento</th>
                            <th>Municipio</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th style={{ width: "20px" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {establecimientoList.map((esatblecimiento, index) => {
                            return (
                                <tr key={index}>
                                    <td>{esatblecimiento.nombre}</td>
                                    <td>{esatblecimiento.ciudad}</td>
                                    <td>{esatblecimiento.direccion}</td>
                                    <td>{esatblecimiento.telefono}</td>
                                    <td>
                                        <div className="my-tooltip">
                                            <div className="text-dark">
                                                <button className='btn text-secondary btn-icon' onClick={() => openModal('edit')}><MdIcon.MdEditNote style={{ fontSize: '1.5rem' }} /></button>
                                                <span className="tiptext">
                                                    Editar
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>
           { show && <EstablecimientoModal show={show} handleClose={handleClose} action={action} /> }
        </Container>
    )
}

export default Establecimientos;
