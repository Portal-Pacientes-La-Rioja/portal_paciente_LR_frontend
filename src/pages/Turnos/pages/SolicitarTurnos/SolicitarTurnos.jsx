import { useState} from "react";
import { Button } from "react-bootstrap";
import AppointmentModal from '../../AppointmentModal';

function SolicitarTurnos() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='in'>
            <p>Para solicitar un turno, completá el formulario y enviá la
                solicitud. A la brevedad, una persona del área de Salud se
                contactará para ofrecerte turnos disponibles. </p>
            <Button variant="danger" onClick={() => handleShow()}>Completar solicitud</Button>
            {show && <AppointmentModal type={'patient'} show={show} handleClose={handleClose} />}
        </div>
    )
}

export default SolicitarTurnos;
