import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import usePatient from '../../hooks/usePatient';
import * as MdIcon from 'react-icons/md';
import { Paciente } from './Paciente/Paciente';
import Loader from '../../components/Loader';


function GrupoFamiliar() {

    const [loading, setLoading] = useState(true)
    const p = usePatient();
    const [dniPatient, setDniPatient] = useState(p.patient.identification_number);
    const handlePatient = (idn) => {
        setDniPatient(idn)
    }

    const history = useHistory();
    const verHistoriaClinica = (idn) => {
        setDniPatient(idn);
        setTimeout(() => {
            history.push('/usuario/historia-clinica/alergias');
        }, 300);
    }

    useEffect(() => {
        p.getPatient(dniPatient)
        setLoading(false)
    }, [dniPatient]);

    return (
        <Container className='p-3'>
            <Col xs={12} lg={9} className="d-flex">
                <MdIcon.MdOutlineGroup className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                <h5 className='section-title'>Grupo familiar</h5>
            </Col>
            {loading
                ? <Loader isActive={loading} />
                : <Container className='pt-3'>
                    {p.allPatients.map((patient, i) => {
                        return (
                            <Paciente
                                key={patient.identification_number + i}
                                patientIdn={patient.identification_number}
                                patientNombre={patient.name}
                                patientApellido={patient.surname}
                                verHistoriaClinica={verHistoriaClinica}
                                handlePatient={handlePatient}
                            />
                        )
                    })}
                </Container>
            }
        </Container >
    )
}

export default GrupoFamiliar;
