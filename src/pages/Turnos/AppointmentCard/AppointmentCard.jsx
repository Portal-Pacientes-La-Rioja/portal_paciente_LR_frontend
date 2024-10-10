import { Col, Row } from "react-bootstrap";
import * as MdIcon from 'react-icons/md'
import Swal from "sweetalert2";
import { confirm } from "../../../components/SwalAlertData";

function AppointmentCard({ appointmentData, status}) {

    const doctor = appointmentData.doctor.lastName + ', ' + appointmentData.doctor.name
    const specialty = appointmentData.doctor.specialtyList[0].description
    const isOnline = appointmentData.isOnline
    const institution = appointmentData.institution ? appointmentData.institution.name : ''
    const address = appointmentData.institution ? (appointmentData.institution.address+', '+ appointmentData.institution.city) : ''
    const date = new Date(appointmentData.day).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const handleDelete = () => {
        Swal.fire(confirm('¿Confirmás la cancelación del turno?')).then((res) => {
            console.log(res)
            //delete
        })
    }

    return (
        <Row className={`appointment-card in ${status === "3"? 'bg-third' : ''}`}>
            <Col xs={12}>
                <h5 className="mb-0">{doctor}</h5>
                <p>{specialty}</p>
                {isOnline && <span className="d-block text-secondary"><MdIcon.MdOutlineVideoCall /> Teleasistencia</span>}
                {!isOnline && <span className="d-block text-secondary"><MdIcon.MdPersonOutline /> Presencial</span>}
                <span>{institution}</span>
                <span>{address}</span>
                <hr />
            </Col>
            <Col xs={9}>
                <span>{date} - {appointmentData.hour}</span>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                {/* <div > */}
                {status !== "3" && <div className="my-tooltip" >
                    <button className='btn text-danger btn-icon ms-0' onClick={() => { handleDelete() }}>
                        <MdIcon.MdOutlineEventBusy style={{ fontSize: '1.5rem' }} /></button>
                    <span className="tiptext">
                        Cancelar turno
                    </span>
                </div>}
                {/* </div> */}
            </Col>
        </Row>
    )
}

export default AppointmentCard;
