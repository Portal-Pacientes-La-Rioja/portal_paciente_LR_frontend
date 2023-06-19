import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoFondoBlanco from '../../assets/statics/logo-fondo-blanco-2.jpg'
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';


const AdminMain = () => {

    const links = [
        { id: 2, path: "/admin/alta-de-pacientes/pacientes-pendientes", namePath: "Alta de pacientes", icon: <FaIcon.FaUserCheck className="main__icon" /> },
        { id: 3, path: "/admin/mensajeria/mensajes-enviados", namePath: "Mensajería", icon: <MdIcon.MdOutlineMessage className="main__icon" /> },
        { id: 4, path: "/admin/establecimientos", namePath: "Establecimientos", icon: <FaIcon.FaHospital className="main__icon" /> },
    ]

    const linksSuperAdmin = [
        { id: 1, path: "/admin/panel/listado", namePath: "Panel de Administradores", icon: <FaIcon.FaUsersCog className="main__icon" /> }
    ]

    const auth = useAuth();
    const isSuperAdmin = auth.getAdminData().is_superadmin

    return (
        <Container className="main pt-5">
            <Row className="d-flex justify-content-center">
                <Col xs={12} lg={6}>
                    <img className='main__banner' src={logoFondoBlanco} alt="logo fondo rojo - portal del paciente la rioja" />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center p-3 in">
                {links.map((link) =>
                    <Col key={link.id} xs={12} md={5} className='main__card'>
                        <Link className="btn-outline-danger" to={link.path}>
                            {link.icon}
                            <h5>{link.namePath}</h5>
                        </Link>
                    </Col>
                )}
                {isSuperAdmin ? linksSuperAdmin.map((link) =>
                    <Col key={link.id} xs={12} md={5} className='main__card'>
                        <Link className="btn-outline-danger" to={link.path}>
                            {link.icon}
                            <h5>{link.namePath}</h5>
                        </Link>
                    </Col>
                ): ''}
            </Row>
        </Container>
    )
}

export default AdminMain;
