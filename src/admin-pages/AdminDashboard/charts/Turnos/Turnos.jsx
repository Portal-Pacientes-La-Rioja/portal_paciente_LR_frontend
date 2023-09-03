import { Row, Col, Button } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from "react";
import * as MdIcon from "react-icons/md";
import { Bar, Pie } from 'react-chartjs-2';
import { useCallback } from "react";
import { getTurnosIndicators } from "../../../../services/dashboardService";
import Swal from 'sweetalert2';
import { error } from "../../../../components/SwalAlertData";

export const Turnos = () => {

    const fromDate = new Date('01/01/2023').toISOString().split('T')[0]
    const toDate = new Date().toISOString().split('T')[0];
    const [labels, setLabels] = useState(['Turnos Solicitados']);
    const [dataTurnos, setDataTurnos] = useState([]);


    useEffect(() => {
        handleDataTurnos();
    }, []);

    const handleDataTurnos = useCallback(() => {
        getTurnosIndicators()
            .then(
                (res) => {
                    setDataTurnos([res])
                })
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos'))
                }
            )
    }, [])


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Usuarios activos',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: `Usuarios Principales: ${dataTurnos}`,
                data: dataTurnos,
                backgroundColor: 'rgba(0, 87, 128, 0.7)',
            }
        ],
    };

    return (
        <Col lg={6} className='my-3'>
            <h5>Usuarios Activos</h5>
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
                <Bar
                    data={data}
                    height={70}
                    width={100}
                    options={options}
                />
            </div>
        </Col>
    )
}
