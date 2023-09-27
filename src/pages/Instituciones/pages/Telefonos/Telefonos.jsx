import { Col, Container, Row } from "react-bootstrap";
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
import { institutionData } from "../../../../components/ComponentsData";
import MapView from "../../../../components/MapsView/MapsView";

export default function Telefonos() {
    const data = institutionData

    return (
        <Container>
            <Row className="card-institution">
                <Col xs={12} md={6}>
                    <h5 className="mt-3">{data.name}</h5>
                    <h6 className="mb-3">{data.gob}</h6>
                    <p><MdIcon.MdLocationOn className="menu-icon me-1" /> Dirección:  <a href={data.addressLink} rel="noreferrer" target="_blank">{data.address}</a></p>
                    <p><MdIcon.MdPhone className="menu-icon me-1" /> Teléfono: {data.phone}</p>
                    <p><MdIcon.MdLanguage className="menu-icon me-1" /> Visitar <a href={data.webLink} rel="noreferrer" target="_blank"> sitio web</a> </p>
                    <p className="d-flex">
                        <a href={data.facebook} rel="noreferrer" target="_blank" className="text-dark me-3"><FaIcon.FaFacebookF className="menu-icon me-1" /></a>
                        <a href={data.instagram} rel="noreferrer" target="_blank" className="text-dark me-3"><FaIcon.FaInstagram className="menu-icon me-1" /></a>
                        <a href={data.twitter} rel="noreferrer" target="_blank" className="text-dark me-3"><FaIcon.FaTwitter className="menu-icon me-1" /></a>
                    </p>
                </Col>
                <Col xs={12} md={6} style={{ maxHeight: '300px' }}>
                    <MapView latitud={data.lat} longitud={data.long} descripcion={data.address} />
                </Col>
            </Row>
        </Container >
    )
}
