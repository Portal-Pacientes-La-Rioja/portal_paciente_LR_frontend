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


export const LoginChart = (props) => {

    const { handleSearch, results } = props
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
    const search = 1; //id type of search (Tabla en la que debe buscarse la data)

    useEffect(() => {
        handleSearch(fromDate, toDate, search);
    }, [fromDate, toDate, handleSearch]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    // TODO: setear labels segun resultado
    // mapear resultado segun labes

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Inicios de sesión',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Usuarios TGD',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                data: results,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Usuarios Portal del Paciente',
                // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                data: results,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const dataPie = {
        labels: ['TGD', 'PDP'],
        datasets: [
            {
                label: 'Usuarios',
                data: [12, 19],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPie = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            }
        },
    };

    return (
        <Row className="mb-3">
            <h5>Inicios de sesión</h5>
            <div className="mb-3 d-flex">
                <div>
                    <label htmlFor="desde">Desde:</label>
                    <input
                        className="mx-2 border boder-secundary rounded p-2"
                        type="date"
                        name='from'
                        value={fromDate}
                        onChange={(event) => setFromDate(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="desde">Hasta:</label>
                    <input className="mx-2 border boder-secundary rounded p-2"
                        type="date"
                        name='from'
                        value={toDate}
                        onChange={(event) => setToDate(event.target.value)}
                    />
                </div>
                <div xs={1}>
                    <Button><MdIcon.MdSearch /></Button>
                </div>
            </div>
            <div className="d-flex ms-3 p-3  border border-secundary rounded justify-content-between" >
                <Col lg={6} className='my-3'>
                    <div style={{ maxHeight: '400px' }}>
                        <Bar
                            data={data}
                            height={70}
                            width={100}
                            options={options}
                        />
                    </div>
                </Col>
                <Col lg={4} className='my-3'>
                    {/* <h5>TGD/Portal del paciente</h5> */}
                    <div style={{ maxWidth: '380px' }}>
                        <Pie
                            data={dataPie}
                            options={optionsPie}
                        />
                    </div>
                </Col>
            </div>
        </Row>
    )
}
