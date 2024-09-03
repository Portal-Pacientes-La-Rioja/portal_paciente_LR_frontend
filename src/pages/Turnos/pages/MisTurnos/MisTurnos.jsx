import React, { useCallback, useEffect, useState } from 'react';
import DataNotFound from '../../../../components/DataNotFound';
import { getUserAppointmentsService, mockDataUserAppointments } from '../../../../services/applicactionService';
import Loader from '../../../../components/Loader';
import usePatient from '../../../../hooks/usePatient';
import Swal from 'sweetalert2';
import { error } from '../../../../components/SwalAlertData';
import AppointmentCard from '../../AppointmentCard';
import { Col, Container, Row } from 'react-bootstrap';

function MisTurnos() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    // //patient
    const p = usePatient()

    // const getUserAppointments = useCallback(
    //     () => {
    //         const userData = {
    //             dni: p.patient.identification_number,
    //             identificationTypeId: p.patient.id_identification_type,
    //             genderId: p.patient.id_gender,
    //             birthDate: p.patient.birthdate.split('T')[0]
    //         }
    // getUserAppointmentsService(userData)
    //     .then(() => {

    //     })  
    //     .catch(() => {
    //       Swal.fire(error('Hubo un error al obtener turnos del usuario'))
    //     })
    //     .finally(() => {
    // setLoading(false);
    // })
    // }, [])

    useEffect(() => {
        // getUserAppointments()
        setData(mockDataUserAppointments);
    }, []);

    return (
        <div className='in'>
            {loading ? <Loader />
                : <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            {data && data.length > 0 ?
                                <> {data.map((appointment, index) =>
                                    <AppointmentCard key={index} appointmentData={appointment} />
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
