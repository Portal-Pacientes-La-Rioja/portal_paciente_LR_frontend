import { Col, Row } from "react-bootstrap";
import * as MdIcon from 'react-icons/md'
import Swal from "sweetalert2";
import { confirm } from "../../../components/SwalAlertData";

function AppointmentCard({ appointmentData }) {

    const handleDelete = () => {
        Swal.fire(confirm('¿Confirmás la cancelación del turno?')).then(() => {
            //delete
        })
    }

    return (
        <Row className="appointment-card in">
            <Col xs={12}>
                <h5 className="mb-0">Vanina Álvarez</h5>
                <p>Cardiología</p>
                <span className="d-block"><MdIcon.MdPersonOutline /> Presencial</span>
                <span>Centro Médico Número 8 La Rioja</span>
                <hr />
            </Col>
            <Col xs={9}>
                <span>Lunes, 10 de Octubre de 2024 - 18:00 hs</span>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                {/* <div > */}
                <div className="my-tooltip" >
                    <button className='btn text-danger btn-icon ms-0' onClick={() => { handleDelete() }}>
                        <MdIcon.MdOutlineEventBusy style={{ fontSize: '1.5rem' }} /></button>
                    <span className="tiptext">
                        Cancelar turno
                    </span>
                </div>
                {/* </div> */}
            </Col>
        </Row>
    )
}

export default AppointmentCard;
