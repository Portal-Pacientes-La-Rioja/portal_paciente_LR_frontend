import { Card, Col, Row } from "react-bootstrap"
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
import { useState } from "react";
import InstitutionMap from "../InstitutionMap/InstitutionMap";

const InstitutionCard = ({ institution }) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const institutionData = institution

    return (
        <Card className="card-institution">
            <Row>
                <Col xs={12} md={2} className="border-end d-flex justify-content-center align-items-center mb-2 mb-md-0">
                    {institutionData.tipologia === 'Hospital' && <FaIcon.FaHospital style={{ fontSize: '3rem' }} />}
                    {institutionData.tipologia === 'Transporte' && <FaIcon.FaAmbulance style={{ fontSize: '3rem' }} />}
                    {institutionData.tipologia === ("Centro de salud \"A\"" || 'Centro de salud "A"') && <MdIcon.MdOutlineHealthAndSafety style={{ fontSize: '3rem' }} />}
                    {institutionData.tipologia === 'Laboratorio' && <MdIcon.MdOutlineScience style={{ fontSize: '3rem' }} />}
                </Col>
                <Col xs={12} md={10} className="d-flex flex-column justify-content-between">
                    <div>
                        <h4 className="text-uppercase">{institutionData.name}</h4>
                        <h6 className="text-uppercase">{institutionData.tipologia} - {institutionData.categoria_tipologia}</h6>
                        <span className="my-2">
                            {institutionData.services.length > 0 && <div className="">Servicios: {institutionData.services.map(item => <span key={item.id}>{item.name} - </span>)}</div>}
                        </span>
                        <br />
                    </div>
                    <div>
                        <span className="text-secondary fst-italic" style={{ cursor: 'pointer' }} onClick={() => handleShow()}>{institutionData.domicilio}, {institutionData.departamento}, {institutionData.localidad}<MdIcon.MdLocationOn className="menu-icon ms-2" /><span>Ver ubicación</span></span>
                        <span className="text-secondary fst-italic d-block">{institutionData.telefono && 'Teléfono: ' + institutionData.telefono}</span>
                    </div>
                </Col>
            </Row>
            {show && <InstitutionMap institution={institution} show={show} handleClose={handleClose} />}
        </Card>
    )
}

export default InstitutionCard