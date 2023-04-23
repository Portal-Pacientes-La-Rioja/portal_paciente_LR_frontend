import { useEffect, useState, useCallback } from "react";
import institutionsServices, { getInstitutionsAll } from '../../../../services/institutionsServices'
import useAuth from '../../../../hooks/useAuth.js'
import Loader from '../../../../components/Loader'
import DataNotFound from "../../../../components/DataNotFound";
import Swal from "sweetalert2";
import { error } from "../../../../components/SwalAlertData";
import { Col, Container, Row, Table } from "react-bootstrap";
import * as MdIcon from 'react-icons/md';
import AutocompleteComponent from "../../../../components/AutocompleteComponent";
import Paginador from "../../../../components/Paginador";
import InstitutionCard from "../components/InstitutionCard";


export default function CentrosMedicos() {


    const [loading, setLoading] = useState(true);
    const [establecimientos, setEstablecimientos] = useState([]);
    const [data, setData] = useState([]);
    const itemsPagina = 10
    const [resetPaginator, setResetPaginator] = useState(false);
    // const [show, setShow] = useState(false);
    // const [action, setAction] = useState(false);
    // const [institution, setInstitution] = useState('');
    // const handleShow = () => setShow(true);
    // const handleClose = () => {
    //     setShow(false)
    // };

    // const openModal = (action, id) => {
    //     setAction(action)
    //     setInstitution(id)
    //     handleShow()
    // }

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


    return (
        <>
            <Col xs={12} lg={4} className="ms-auto">
                <AutocompleteComponent
                    variants={establecimientos}
                    handleChange={handleChangeSearch}
                />
            </Col>
            {loading
                ? <Loader isActive={loading} />
                : <Row className='p-3 in'>
                    {data.length > 0 && data.map((establecimiento, index) => {
                        return (
                            <Col key={index} xs={12} lg={8}>
                                <InstitutionCard  institution={establecimiento} />
                            </Col>
                        )
                    })}
                    {data.length === 0 && <DataNotFound text="establecimientos"></DataNotFound>}
                    {establecimientos.length > 0 && <Paginador datos={establecimientos} elementosPorPagina={itemsPagina} handlePagination={handlePagination} reset={resetPaginator} showItems={false}></Paginador>}
                </Row>
            }
            {/* {show && <EstablecimientoModal show={show} handleClose={handleClose} action={action} institution={institution} />} */}
        </>
    )
}
