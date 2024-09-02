import { useState} from "react";
import AppointmentForm from "../../AppointmentForm";

function SolicitarTurnos() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='in'>
            <AppointmentForm></AppointmentForm>
        </div>
    )
}

export default SolicitarTurnos;
