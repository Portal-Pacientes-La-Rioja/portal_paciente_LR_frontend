import { Col, Container, Row } from "react-bootstrap";
import TurnosRouter from "./TurnosRouter";
import { SidebarData } from '../../components/Sidebar/SidebarData'
import { NavLink } from "react-router-dom";
import * as MdIcon from 'react-icons/md'

export default function Turnos() {
    const routes = SidebarData.perfilDelPaciente[2].options;

    return (
        <Container className='p-3'>
            <Col xs={12} lg={9} className="d-flex">
                <MdIcon.MdOutlineWatchLater className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                <h5 className='section-title'>Turnos</h5>
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
            <TurnosRouter></TurnosRouter>
        </Container>
    )
}
