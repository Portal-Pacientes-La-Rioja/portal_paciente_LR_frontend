import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import AutocompleteComponent from '../../components/AutocompleteComponent';
import { useCallback, useEffect, useState } from 'react';
import EstablecimientoModal from './components/EstablecimientoModal';
import { getInstitutionsAll, updateStatusInstitution } from '../../services/institutionsServices';
import Swal from 'sweetalert2';
import { confirm, error } from '../../components/SwalAlertData';
import Loader from '../../components/Loader';
import DataNotFound from '../../components/DataNotFound';
import Paginador from '../../components/Paginador';
import useAuth from '../../hooks/useAuth';
import { getUserAdminById } from '../../services/adminServices';



const Establecimientos = () => {

    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const isSuperAdmin = auth.getAdminData().is_superadmin;
    const [establecimientos, setEstablecimientos] = useState([]);
    const [data, setData] = useState([]);
    const itemsPagina = 30
    const [resetPaginator, setResetPaginator] = useState(false);
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(false);
    const [institution, setInstitution] = useState('');
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
    };

    const openModal = (action, id) => {
        setAction(action)
        setInstitution(id)
        handleShow()
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

    const getAdminInstitutions = useCallback(
        () => {
            let idAdmin = auth.getAdminData().id
            getUserAdminById({user_id: idAdmin})
            .then((res) => {
                if (res[0].institutions) {
                    setEstablecimientos(res[0].institutions)
                    setLoading(false)
                }
            })
            .catch((err) => console.error(err))
        }, [])


    const handlePagination = (elementosEnPaginaActual) => {
        setData(elementosEnPaginaActual);
        setResetPaginator(false);
    }

    useEffect(() => {
        initData()
    }, [show])

    const initData = () => {
        setLoading(true)
        if (isSuperAdmin) getData()
        else getAdminInstitutions()
    }

    const handleChangeSearch = (selected) => {
        if (typeof selected === 'string' && selected !== '') {
            let value = selected.toLowerCase()
            let search = establecimientos.filter((item) => {
                return item.name.toLowerCase().includes(value)
                    || item.ciudad.toLowerCase().includes(value)
                    || item.localidad.toLowerCase().includes(value)
            });
            setData(search);
        } else if (selected.name) {
            let search = establecimientos.filter((item) => {
                return item.name.toLowerCase() === selected.name.toLowerCase()
            });
            setData(search)
        } else if (selected === '') {
            setResetPaginator(true)
        }
    }

    const confirmOnOff = (currentState, institution) => {
        let action = currentState === 1 ? 'Anular' : 'Activar'
        Swal.fire(confirm(`¿${action} Establecimiento ${institution.name}?`)).then((result) => {
            if (result.isConfirmed) {
                onOffInstitution(action, institution)
            }
        });
    }

    const onOffInstitution = useCallback(
        (action, institution) => {
            setLoading(true)
            let body = { ...institution }
            body.activate = action === 'Anular' ? 0 : 1
            updateStatusInstitution(body)
                .then((res) => {
                    if (res.ok) {
                        initData()
                    }
                })
                .catch((err) => {
                    console.error(err)
                    Swal.fire(error(`Error al ${action} Establecimiento`))
                    setLoading(false)
                })
        }, [])


    return (
        <Container className="p-3">
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} lg={6} className="d-flex">
                    <FaIcon.FaHospital className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                    <h5 className='section-title'>Establecimientos</h5>
                </Col>
                <Col xs={12} sm={6} lg={3} className='d-flex justify-content-end'>
                    <Button variant="danger" onClick={() => openModal('add')}>+ Agregar Establecimiento</Button>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <AutocompleteComponent
                        variants={establecimientos}
                        handleChange={handleChangeSearch}
                    />
                </Col>
            </Row>
            {loading
                ? <Loader isActive={loading} />
                : <Row className='p-3'>
                    <div className='overflow-auto mb-3' style={{ maxHeight: '60vh' }}>
                        <Table bordered borderless striped hover>
                            <thead>
                                <tr style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                    <th>Establecimiento</th>
                                    <th>Tipología</th>
                                    <th>Departamento</th>
                                    <th>Localidad</th>
                                    <th>Teléfono</th>
                                    <th className='text-center' style={{ width: "20px" }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 && data.map((establecimiento, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{establecimiento.name}</td>
                                            <td>{establecimiento.tipologia}</td>
                                            <td>{establecimiento.departamento}</td>
                                            <td>{establecimiento.localidad}</td>
                                            <td>{establecimiento.telefono}</td>
                                            <td className='d-flex'>
                                                <div className="my-tooltip">
                                                    <div className="text-dark">
                                                        <button className='btn text-secondary btn-icon' onClick={() => openModal('edit', establecimiento.id)}><MdIcon.MdEditNote style={{ fontSize: '1.5rem' }} /></button>
                                                        <span className="tiptext">
                                                            Editar
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="my-tooltip">
                                                    <div className="text-dark">
                                                        <button className='btn text-secondary btn-icon' onClick={() => confirmOnOff(establecimiento.activate, establecimiento)}><MdIcon.MdOutlinePowerSettingsNew style={{ fontSize: '1.5rem' }} /></button>
                                                        <span className="tiptext">
                                                            {establecimiento.activate === 1 ? 'Anular' : 'Activar'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    {data.length === 0 && <DataNotFound text="establecimientos"></DataNotFound>}
                    {establecimientos.length > 0 && <Paginador datos={establecimientos} elementosPorPagina={itemsPagina} handlePagination={handlePagination} reset={resetPaginator} showItems={true}></Paginador>}
                </Row>
            }
            {show && <EstablecimientoModal show={show} handleClose={handleClose} action={action} institution={institution} />}
        </Container>
    )
}

export default Establecimientos;
