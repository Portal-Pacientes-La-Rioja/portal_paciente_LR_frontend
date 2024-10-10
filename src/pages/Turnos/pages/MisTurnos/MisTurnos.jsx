import React, { useCallback, useEffect, useState } from 'react';
import DataNotFound from '../../../../components/DataNotFound';
import { getUserAppointmentsService } from '../../../../services/applicactionService';
import Loader from '../../../../components/Loader';
import usePatient from '../../../../hooks/usePatient';
import Swal from 'sweetalert2';
import { error } from '../../../../components/SwalAlertData';
import AppointmentCard from '../../AppointmentCard';
import { Col, Container, Row } from 'react-bootstrap';
import SelectType from '../../../../components/SelectType';

function MisTurnos() {

    const [loading, setLoading] = useState(true)
    const [showData, setShowData] = useState([]);
    const variantsStatus = [
        { id: "1", name: 'Próximos turnos presenciales' },
        { id: "2", name: 'Próximos turnos virtuales' },
        { id: "3", name: 'Historial' },
    ]
    const [selectedStatus, setSelectedStatus] = useState("1");
    const [inPersonAppointments, setInPersonAppointments] = useState([]);
    const [virtualAppointments, setVirtualAppointments] = useState([]);
    const [historyAppointments, setHistoryAppointments] = useState([]);
    // //patient
    const p = usePatient()

    const getUserAppointments = useCallback(
        () => {
            const userData = {
                // identification_number: p.patient.identification_number,
                // identification_type_id: p.patient.id_identification_type,
                // gender_id: p.patient.id_gender,
                // birth_date: p.patient.birthdate.split('T')[0]
                identification_number: '27232387',
                identification_type_id: 1,
                gender_id: 1,
                birth_date: '1979-06-30'
            }
            getUserAppointmentsService(userData)
                .then((res) => {
                    filterData(res.appointmentData)
                })
                .catch(() => {
                    Swal.fire(error('Hubo un error al obtener turnos del usuario'))
                })
                .finally(() => {
                    setLoading(false);
                })
        }, [])

    useEffect(() => {
        getUserAppointments()
    }, []);


    const filterData = (appointmentsData) => {
        const inPerson = appointmentsData.filter(a => isNext(a.day) && !a.isOnline)
        const virtual = appointmentsData.filter(a => isNext(a.day) && a.isOnline)
        const history = appointmentsData.filter(a => !isNext(a.day))
        setInPersonAppointments(inPerson);
        setVirtualAppointments(virtual)
        setHistoryAppointments(history)
        setShowData(inPerson);
    }

    const handleVariants = (event) => {
        const status = event.target.value
        setSelectedStatus(status)
        switch (status) {
            case "1":
                setShowData(inPersonAppointments)
                break;
            case "2":
                setShowData(virtualAppointments)
                break;
            case "3":
                setShowData(historyAppointments)
                break;
            default:
                break;
        }
    }

    const isNext = (dateString) => {
        const today = new Date()
        const dateAppointment = new Date(dateString)
        return today <= dateAppointment
    }

    return (
        <div className='in'>
            {loading ? <Loader />
                : <Container>
                    <Row>
                        <Col xs={12} md={6} className='mb-3'>
                            <SelectType
                                name='select'
                                variants={variantsStatus}
                                selectValue={selectedStatus}
                                handleChange={handleVariants}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            {showData && showData.length > 0 ?
                                <> {showData.map((appointment, index) =>
                                    <AppointmentCard key={index} appointmentData={appointment} status={selectedStatus}/>
                                )} </>
                                : <DataNotFound text={"Mis turnos"} />}
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    )
}

export default MisTurnos;
