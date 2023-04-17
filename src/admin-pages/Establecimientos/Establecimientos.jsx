import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco-2.jpg'
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import AutocompleteComponent from '../../components/AutocompleteComponent';
import { useCallback, useEffect, useState } from 'react';
import EstablecimientoModal from './components/EstablecimientoModal';
import { getInstitutionsAll } from '../../services/institutionsServices';
import Swal from 'sweetalert2';
import { error } from '../../components/SwalAlertData';
import Loader from '../../components/Loader';
import DataNotFound from '../../components/DataNotFound';
import Paginador from '../../components/Paginador';



const Establecimientos = () => {

    const [loading, setLoading] = useState(true);
    const [establecimientos, setEstablecimientos] = useState([]);
    const [data, setData] = useState([]);
    const itemsPagina = 10
    const [resetPaginator, setResetPaginator] = useState(false);
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

    const getData = useCallback(
        () => {
            getInstitutionsAll()
                .then((res) => {
                    if (res) {
                        setEstablecimientos(res);
                        setLoading(false)
                        return establecimientos
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error('Error al cargar los estableciemientos'))
                    setLoading(false)
                })
        },
        [establecimientos],
    )

    const handlePagination = (elementosEnPaginaActual) => {
        setData(elementosEnPaginaActual);
        setResetPaginator(false);
    }

    useEffect(() => {
        initData()
    }, [])

    const initData = () => {
        setLoading(true)
        getData()
    }

    const handleChangeSearch = (selected) => {
        if (typeof selected === 'string' && selected !== '') {
            let search = establecimientos.filter((item) => {
                return item.name.includes(selected.toLocaleUpperCase())
                    || item.ciudad.includes(selected)
                    || item.localidad.includes(selected)
            });
            setData(search);
        } else if (selected.name) {
            let search = establecimientos.filter((item) => {
                return item.name === selected.name
            });
            setData(search)
        } else if (selected === ''){
            setResetPaginator(true)
        }
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
                        variants={establecimientos}
                        handleChange={handleChangeSearch}
                    />
                </Col>
            </Row>
            {loading
                ? <Loader isActive={loading} />
                : <Row className='p-3'>
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
                            {data.length > 0 && data.map((esatblecimiento, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{esatblecimiento.name}</td>
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
                    {data.length === 0 && <DataNotFound text="establecimientos"></DataNotFound>}
                    {establecimientos.length > 0 && <Paginador datos={establecimientos} elementosPorPagina={itemsPagina} handlePagination={handlePagination} reset={resetPaginator}></Paginador>}
                </Row>
            }
            {show && <EstablecimientoModal show={show} handleClose={handleClose} action={action} />}
        </Container>
    )
}

export default Establecimientos;
