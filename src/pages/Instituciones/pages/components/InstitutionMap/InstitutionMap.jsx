import { Col, Modal } from "react-bootstrap"
import * as MdIcon from "react-icons/md";
import MapView from "../../../../../components/MapsView/MapsView";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../../../../components/Loader";

const InstitutionMap = ({ institution, show, handleClose }) => {
    const [loading, setLoading] = useState(true)
    const adress = institution.domicilio +', '+  institution.localidad +', '+ institution.departamento

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [loading])

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
               <h4 className="text-uppercase"><MdIcon.MdLocationOn style={{fontSize: '2rem'}} /> {institution.name}</h4>
            </Modal.Header>
            {loading
                ? <Loader isActive={true}/>
                : <Modal.Body>
                    <Col xs={12} style={{height: '500px'}}>
                        <MapView latitud={institution.lat ?? 0} longitud={institution.long ?? 0} descripcion={adress} />
                    </Col>
                </Modal.Body>
            }
        </Modal>
    )
}

export default InstitutionMap