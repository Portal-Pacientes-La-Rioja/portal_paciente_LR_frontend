import { Col } from "react-bootstrap";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { useCallback } from "react";
import { getMasterUsersIndicators, getPendingUsersIndicators, getRejectedUsersIndicators, getValidatedUsersIndicators } from "../../../../services/dashboardService";
import Swal from 'sweetalert2';
import { error } from "../../../../components/SwalAlertData";

export const AltaUsers = () => {

    const fromDate = new Date('01/01/2023').toISOString().split('T')[0]
    const toDate = new Date().toISOString().split('T')[0];
    const [dataValidated, setDataValidated] = useState(0);
    const [dataRejected, setDataRejected] = useState(0);
    const [dataPending, setDataPending] = useState(0);


    useEffect(() => {
        handleDataValidatedUsers();
        handleDataRejectedUsers();
        handleDataPendingUsers();
    }, []);

    const handleDataValidatedUsers = useCallback(() => {
        getValidatedUsersIndicators()
            .then(
                (res) => {
                    let value = res?.usuarios_validados ?? 0
                    setDataValidated(value)
                })
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos'))
                }
            )
    }, [])

    const handleDataRejectedUsers = useCallback(() => {
        getRejectedUsersIndicators()
            .then(
                (res) => {
                    let value = res?.usuarios_rechazados ?? 0
                    setDataRejected(value)
                })
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos'))
                }
            )
    }, [])


    const handleDataPendingUsers = useCallback(() => {
        getPendingUsersIndicators()
            .then(
                (res) => {
                    let value = res?.usuarios_pendientes_autorizar ?? 0
                    setDataPending(value)
                })
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos'))
                }
            )
    }, [])
    

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: [`Pendientes: ${dataPending}`, `Rechazados: ${dataRejected}`, `Validados: ${dataValidated}` ],
        datasets: [
            {
                label: '',
                data: [dataPending, dataRejected, dataValidated],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Col lg={6} className='my-3'>
            <h5>Alta de usuarios</h5>
            <div className="mb-3 d-flex">
                <div>
                    <label htmlFor="desde">Desde:</label>
                    <input
                        className="mx-2 border boder-secundary rounded p-2"
                        type="date"
                        name='from'
                        disabled
                        value={fromDate}
                        onChange={() => { }}
                    />
                </div>
                <div>
                    <label htmlFor="desde">Hasta:</label>
                    <input className="mx-2 border boder-secundary rounded p-2"
                        type="date"
                        name='from'
                        value={toDate}
                        disabled
                        onChange={() => { }}
                    />
                </div>
                {/* <div xs={1}>
                    <Button><MdIcon.MdSearch /></Button>
                </div> */}
            </div>
            <div className="p-3 border border-secundary rounded" style={{ maxHeight: '400px' }}>
                <Pie data={data} />
            </div>
            <div className="d-flex border border-dark-subtle rounded justify-content-between p-4 mt-4">
                <h5 className="mb-0">Total solicitudes de alta:</h5>
                <h5 className="mb-0">{dataPending + dataRejected + dataValidated}</h5>
            </div>
        </Col>
    )
}
