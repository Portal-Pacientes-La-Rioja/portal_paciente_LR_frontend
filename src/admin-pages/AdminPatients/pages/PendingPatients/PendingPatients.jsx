import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PendingPatient from "../../PendingPatient";
import DataNotFound from "../../../../components/DataNotFound";
import Loader from "../../../../components/Loader";
import { getPersons, getPersonsRelativesToAccept, getPersonsToBeAccepted } from "../../../../services/adminServices";
import { getInstitutionsAllWithNewData } from '../../../../services/institutionsServices'
import { getAdminStatus } from "../../../../services/personServices";
import Swal from "sweetalert2";
import { error } from "../../../../components/SwalAlertData";
import Paginador from "../../../../components/Paginador";
import AutocompleteComponent from "../../../../components/AutocompleteComponent";

export default function PendingPatients() {

    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(1)
    const [patientsPending, setPendingPatients] = useState([]);
    const [adminStatus, setAdminStatus] = useState([])
    const [institutions, setInstitutions] = useState([]);
    const status = adminStatus?.find(s => s.name === 'PENDIENTE DE VALIDACIÓN')
    const statusName = status ? status.name : 'pendiente'

    const itemsPagina = 6
    const [data, setData] = useState([]);
    const [resetPaginator, setResetPaginator] = useState(false);

    const handlePagination = (elementosEnPaginaActual) => {
        setData(elementosEnPaginaActual);
        setResetPaginator(false);
    }

    const handleChangeSearch = (selected) => {
        if (typeof selected === 'string' && selected !== '') {
            let value = selected.toLowerCase()
            let search = patientsPending.filter((item) => {
                return item.name.toLowerCase().includes(value)
            });
            setData(search);
        } else if (selected.name) {
            let search = patientsPending.filter((item) => {
                return item.name.toLowerCase() === selected.name.toLowerCase()
            });
            setData(search)
        } else if (selected === '') {
            setResetPaginator(true)
        }
    }

    const getData = useCallback(
        () => {
            setLoading(true);
            getPersonsRelativesToAccept()
                .then((res) => {
                    if (res) {
                        let patients = res.filter(p => p.id_admin_status === 1)//note - table db =>  1: pending , 2: validated , 3: refused
                        setPendingPatients(patients)
                    } else {
                        throw new Error(res)
                    }
                })
                .then(() => setLoading(false))
                .catch((err) => {
                    console.error('error', err)
                    Swal.fire(error('Hubo un error al cargar pacientes pendientes'));
                    setLoading(false)
                })
        },
        [],
    )

    const getAdminStatusToSetPerson = useCallback(
        () => {
            getAdminStatus()
                .then((res) => {
                    setAdminStatus(res)
                })
                .catch((err) => {
                    console.error('Error', err)
                    Swal.fire(error('Error al obtenter estados'))
                })

        }, []
    )

    useEffect(() => {
        getAdminStatusToSetPerson()
        getInstitutions()
    }, [])


    useEffect(() => {
        getData()
    }, [])

    const getInstitutions = useCallback(
        () => {
            getInstitutionsAllWithNewData()
                .then((res) => {
                    if (res.length > 0) {
                        const allInstitutions = res
                        setInstitutions(allInstitutions);
                        return allInstitutions;
                    }
                })
                .catch((err) => { console.error(err) })
        },
        [institutions],
    )

    return (
        <>
            {loading ?
                <Loader isActive={loading}></Loader>
                : <Container>
                    <Row className="w-100 d-flex justify-content-between align-items-baseline mb-3">
                        <Col xs={12} sm={6}>
                            <h5 className="mt-5 mb-3">Pacientes pendientes <span className="fw-light text-danger">({patientsPending.length})</span></h5>
                        </Col>
                        <Col xs={12} sm={6} lg={3}>
                            <AutocompleteComponent
                                variants={patientsPending}
                                handleChange={handleChangeSearch}
                            />
                        </Col>
                    </Row>
                    {data.length > 0 ? data.map((p, i) => {
                        return (
                            <PendingPatient key={i} name={p.name + " " + p.surname} status_id={p.id_admin_status}
                                status_name={statusName} id={p.id} 
                                est={institutions.find((item) => item.id === p.id_usual_institution && item.portal === p.inst_from_portal)?.name || null} 
                                action={getData}></PendingPatient>
                        )
                    })
                        :
                        <DataNotFound text="pacientes pendientes" />
                    }
                </Container>
            }
            {patientsPending.length > 0 && <Paginador datos={patientsPending} elementosPorPagina={itemsPagina} handlePagination={handlePagination} reset={resetPaginator} showItems={true}></Paginador>}

        </>
    )
}
