import { Col, Modal } from "react-bootstrap"
import * as MdIcon from "react-icons/md";
import MapView from "../../../../../components/MapsView/MapsView";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import Loader from "../../../../../components/Loader";
import usePatient from "../../../../../hooks/usePatient"
import { getShortestRoute } from "../../../../../services/institutionsServices";

const InstitutionMap = ({ institution, show, handleClose }) => {
    const [loading, setLoading] = useState(true)
    const adress = institution.domicilio +', '+  institution.localidad +', '+ institution.departamento
    const p = usePatient()

    const [ruta, setRuta] = useState(null);
    useEffect(async () => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [loading])

    const rutaMasCorta = async () =>{
        let patientId = p.patient.id;
        let institucionId = institution.id;
        let response;

        try {
            response = await getRutaMasCorta(patientId, institucionId);
            setRuta(response);
        } catch (error) {
            console.error(error);
        }
    }

    const getRutaMasCorta = useCallback((patientId, institucionId)=>{
        return getShortestRoute(patientId, institucionId)
            .then((response) => {
            return response;
            })
            .catch((error) => {
            console.error(error);
            throw error;
            });
    }, [])

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
                        <button onClick={rutaMasCorta}>¿Cómo llego?</button>
                        <MapView
                            latitud={institution.lat ?? 0}
                            longitud={institution.long ?? 0}
                            descripcion={adress}
                            coordinates={ruta}
                        />
                        {/* <MapView latitud={institution.lat ?? 0} longitud={institution.long ?? 0} descripcion={adress} /> */}
                    </Col>
                </Modal.Body>
            }
        </Modal>
    )
}

export default InstitutionMap