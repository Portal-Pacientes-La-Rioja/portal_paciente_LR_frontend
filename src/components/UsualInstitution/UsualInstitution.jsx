import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { useState } from "react";
import usePatient from "../../hooks/usePatient";
import { getInstitutionsAllWithNewData } from "../../services/institutionsServices";
import { useCallback } from "react";
import AutocompleteComponent from "../AutocompleteComponent";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { error, logOut, success } from "../SwalAlertData";
import { useEffect } from "react";
import { updatePerson } from "../../services/personServices";


function Usualinstitution({ show, type, handleClose }) {
    const [loading, setLoading] = useState(false)
    const p = usePatient();
    const auth = useAuth();
    const patientData = p.patient;
    // SET INSTITUTION
    const [usualInstitution, setUsualInstitution] = useState('');
    const [institutionsList, setInstitutionsList] = useState([]);
    const [changeInstitution, setChangeInstitution] = useState(false);
    const handleChangeInstitution = () => setChangeInstitution(!changeInstitution);

    const getInstitutionsAll = useCallback(
        (patient) => {
            getInstitutionsAllWithNewData()
                .then((res) => {
                    if (res.length > 0) {
                        setInstitutionsList(res);
                    }
                    return res
                })
                .catch((err) => console.error(err));
        }, [])

    useEffect(() => {
        getInstitutionsAll();
    }, [])

    const handleCloseSession = () => {
        Swal.fire(logOut).then((result) => {
            if (result.isConfirmed) {
                auth.logout()
            }
        });
    }

    const handleChangeSearch = (institution) => {
        if (typeof institution !== 'string' && institution.id) {
            let selectedInst = institutionsList.find((item) => {
                return item.name.toLowerCase().trim() === institution.name.toLowerCase()
            })
            setUsualInstitution(selectedInst)
        }
    }

    const handleSubmit = () => {
        let body = patientData
        body.birthdate = new Date(patientData.birthdate).toLocaleDateString()
        body.id_usual_institution = usualInstitution.id;
        sendUpdatePersonForm(body);
    }

    const sendUpdatePersonForm = useCallback(
        (body) => {
            updatePerson(body)
                .then((res) => {
                    if (res.ok) {
                        return res.text().then(text => {
                            let readeble = JSON.parse(text)
                            if (readeble.status) {
                                Swal.fire(success('El paciente ha sido actualizado.'))
                                setLoading(false)
                                handleClose()
                            } else {
                                Swal.fire(error('Error al actualizar datos de usuario'))
                                setLoading(false)
                                throw new Error(text)
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.error('error', err)
                    Swal.fire(error('Error al actualizar datos de usuario'))
                    setLoading(false)
                })
        },
        [],
    )


    return (

        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            size="lg"
            className="perfil-usuario"
        >
            <Modal.Header>
                <Modal.Title>Paciente:  {patientData.name + ' ' + patientData.surname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? <Loader isActive={loading} />
                    : <Container fluid>
                        <Row>
                            <Col>
                                <p>Seleccioná un establecimiento de atención usual:</p>
                                <AutocompleteComponent
                                    variants={institutionsList}
                                    handleChange={handleChangeSearch}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col className='d-flex justify-content-end'>
                                <Button variant='outline-secondary' type="button" className="me-2" onClick={handleCloseSession}>Cerrar sesión</Button>
                                <Button variant='primary' type="submit" disable={usualInstitution} onClick={handleSubmit} >Confirmar</Button>
                            </Col>
                        </Row>

                    </Container>
                }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default Usualinstitution;
