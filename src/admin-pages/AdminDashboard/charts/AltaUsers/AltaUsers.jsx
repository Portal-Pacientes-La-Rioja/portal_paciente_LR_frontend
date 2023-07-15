import { Row, Col, Button } from "react-bootstrap";
import {
    Chart as ChartJS,
    // CategoryScale,
    // LinearScale,
    // BarElement,
    // Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { useEffect, useState } from "react";
import * as MdIcon from "react-icons/md";
import { Bar, Pie } from 'react-chartjs-2';
import { useCallback } from "react";
import { getFamilyGroupIndicators, getUsersIndicators } from "../../../../services/dashboardService";
import Swal from 'sweetalert2';
import { error } from "../../../../components/SwalAlertData";

export const AltaUsers = () => {

    const fromDate = new Date('01/01/2023').toISOString().split('T')[0]
    const toDate = new Date().toISOString().split('T')[0];
    const [labels, setLabels] = useState(['Usuarios']);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataFamilyGroup, setDataFamilyGroup] = useState([]);


    useEffect(() => {
        handleDataUsers();
        handleDataFamilyGroup();
    }, []);

    const handleDataUsers = useCallback(() => {
        getUsersIndicators()
            .then(
                (res) => {
                    setDataUsers([res])
                })
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos'))
                }
            )
    }, [])

    const handleDataFamilyGroup = useCallback(() => {
        getFamilyGroupIndicators()
            .then(
                (res) => {
                    setDataFamilyGroup([res])
                })
            .catch(
                (err) => {
                    console.error(err);
                    Swal.fire(error('Error al cargar datos'))
                }
            )
    }, [])


    ChartJS.register(ArcElement, Tooltip, Legend);

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
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
        </Col>
    )
}
