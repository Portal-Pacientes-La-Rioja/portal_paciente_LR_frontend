import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";
import AdminPanelRouter from "./AdminPanelRouter";
import * as FaIcon from 'react-icons/fa'

export default function AdminPanel() {
    const data = SidebarData.superadmin.find(d => d.id === 16);
    const routes = data.options

    return (
        <Container className='p-3'>
            <Col xs={12} lg={6} className="d-flex">
                <FaIcon.FaUsersCog className="menu-icon text-danger me-2" style={{fontSize: 'x-large'}}/>
                <h5 className='section-title mb-3'>Panel de administradores</h5>
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
            <AdminPanelRouter></AdminPanelRouter>
        </Container>
    )
}
