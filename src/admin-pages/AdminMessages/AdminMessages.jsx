import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SidebarData } from "../../components/Sidebar/SidebarData";
import AdminMessagesRouter from "./AdminMessagesRouter";
import * as MdIcon from 'react-icons/md';

export default function AdminMessages() {
    const data = SidebarData.admin.find(d => d.id === 15);
    const routes = data.options

    return (
        <Container className='p-3'>
            <Col xs={12} lg={9} className="d-flex">
                <MdIcon.MdOutlineMessage className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                <h5 className='section-title'>Mensajería</h5>
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
            <AdminMessagesRouter></AdminMessagesRouter>
        </Container>
    )
}
