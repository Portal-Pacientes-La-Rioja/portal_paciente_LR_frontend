import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from '../../components/Sidebar/SidebarData';
import InstitucionesRouter from "./InstitucionesRouter";
import * as FaIcon from 'react-icons/fa';

export default function Instituciones() {
    const routes = SidebarData.instituciones;


    return (
        <Container className='p-3' >
            <Row>
                <Col xs={12} lg={9} className="d-flex">
                    <FaIcon.FaHospital className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                    <h5 className='section-title'>Establecimientos</h5>
                </Col>
            </Row>
            <Row>
                <Col className='switch-container'>
                    {routes.map((route) => {
                        return (
                            <NavLink key={route.path} className='me-2' activeClassName='active-switch' to={route.path}>{route.title}</NavLink>
                        )
                    })}
                </Col>
            </Row>
            <InstitucionesRouter></InstitucionesRouter>
        </Container>
    )
}
