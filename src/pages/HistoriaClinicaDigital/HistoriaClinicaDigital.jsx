import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SidebarData } from '../../components/Sidebar/SidebarData'
import HCDRouter from './HCDRouter';
import SelectType from '../../components/SelectType';
import usePatient from '../../hooks/usePatient';
import institutionsServices from '../../services/institutionsServices';
import * as MdIcon from 'react-icons/md';

const HistoriaClinicaDigital = () => {

    const p = usePatient();
    const datahc = SidebarData.perfilDelPaciente.find(d => d.id === 6)
    const routes = datahc.options;
    const [institutions, setInstitutions] = useState([]);
    const getInstitutions = useCallback(
        () => {
            institutionsServices()
                .then((res) => {
                    setInstitutions(res);
                    p.changeInstitution(res[0].id)
                    return institutions
                })
                .catch((err) => { console.log(err) })
        },
        [institutions],
    )

    useEffect(() => {
        getInstitutions()
    }, [])


    return (
        <Container className='historia-clinica p-3'>
            <Col xs={12} lg={9} className="d-flex">
                <MdIcon.MdOutlineFolderShared className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                <h5 className='section-title'>Historia Clínica Digital</h5>
            </Col>
            <Row>
                <Col className='switch-container p-3'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <Row>
                <Col className='switch-container__hc'>
                    <Row className="my-3">
                        <Col xs={12} md="auto" className="d-flex align-items-center">
                            Buscar en institución
                        </Col>
                        <Col xs={12} md={8} className="d-flex align-items-center" >
                            <SelectType
                                name='institution'
                                variants={institutions}
                                selectValue={p.patientInstitution}
                                handleChange={e => p.changeInstitution(e)}
                            />
                        </Col>
                    </Row>
                    <HCDRouter></HCDRouter>
                </Col>
            </Row>

        </Container>
    )
}

export default HistoriaClinicaDigital;
