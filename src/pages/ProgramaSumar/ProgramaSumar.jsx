import { Col, Container, Row } from "react-bootstrap";
import * as MdIcon from 'react-icons/md';
import { SidebarData } from '../../components/Sidebar/SidebarData'
import ProgramaSumarRouter from "./ProgramaSumarRouter";
import { NavLink } from "react-router-dom";

export default function ProgramaSumar() {
    const datahc = SidebarData.perfilDelPaciente.find(d => d.id === 8)
    const routes = datahc.options;
    
    return (
        <Container className='programa-sumar p-3'>
            <Row>
                <Col xs={12} lg={9} className="d-flex">
                    <MdIcon.MdAddCircleOutline className="menu-icon text-danger me-1" style={{ fontSize: 'x-large' }} />
                    <h5 className='section-title'>Programa SUMAR</h5>
                </Col>
            </Row>
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
                    <ProgramaSumarRouter></ProgramaSumarRouter>
                </Col>
            </Row>
            {/* {loading
                ? <Loader isActive={loading} />
                : <div className="mt-5">
                    {data.length > 0 ? data.map((d, i) => {
                        return <InformationCard
                            key={i}
                            date={d.fecha_comprobante}
                            group={d.grupo}
                            subgroup={d.subgrupo}
                            description={d.descripcion}
                            diagnosis={d.diagnostico}
                            code={d.codigo}
                            weight={d.peso}
                            blood_pressure={d.tension_arterial}
                        />
                    })
                        : <DataNotFound text="información en Programa Sumar" />
                    }
                </div>
            } */}
        </Container>
    )
}
