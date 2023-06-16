import { useState } from "react";
import usePatient from "../../../../hooks/usePatient"
import * as MdIcons from 'react-icons/md'
import DataNotFound from "../../../../components/DataNotFound";
import logoSumar from '../../../../assets/statics/sumar-lr.png'
import jsPDF from 'jspdf';
import { Col, Container, Row, Button } from "react-bootstrap";
import '../../../../styles/CredentialCEB.scss'

const CredencialSumar = () => {

    const p = usePatient();
    const patientName = p.patient.name
    const patientSurname = p.patient.surname
    const patientDNI = p.patient.identification_number
    
    const patientBirthdate = new Date(p.patient.birthdate).toLocaleDateString();

    const [credential, setCredential] = useState(false)
    const [credentialError, setCredentialError] = useState(false)

    const checkCredential = () => {
        // consulta si el paciente está afiliado
        // si la respuesta es true
        // muestra credencial
        setCredential(true);
        // habilita boton para descargar credencial

        // si es false. Deriba para qu paciente pueda afiliarse
    }
    //     Consultar si el ciudadano está inscripto al programa SUMAR y tiene Cobertura efectiva básica. Generación de una
    // credencial para ciudadanos que estén inscriptos al programa SUMAR, es decir que tienen cobertura publica exclusiva,
    // si tiene o no CEB, posibilidad de bajar esa credencial el PDF.
    const generatePDFCredential = () => {
        console.log('here')
        let doc = new jsPDF("p", "pt", "a4")
        console.log(doc);
        doc.html(document.querySelector('#credential'), {
            callback: function (pdf) {
                pdf.save(`CEB-${patientName}-${patientSurname}.pdf`)
                console.log('here to')
            } 
        })
    }


    return (
        <>
            {!credential && !credentialError &&
                <Button variant="danger" onClick={() => checkCredential()}><MdIcons.MdOutlineSearch className="me-2"></MdIcons.MdOutlineSearch>Consultar credencial</Button>
            }
            {credentialError &&
                <DataNotFound text="Credencial de cobertura básica"></DataNotFound>}

            {credential &&
                <>
                    <div id="credential" className="credential-container">
                        <div className="credential">
                            <div className="credential-title">
                                <h5 className="title1">CREDENCIAL</h5>
                                <h5 className="title2">COBERTURA&ensp;&ensp;EFECTIVA&ensp;&ensp;BÁSICA</h5>
                            </div>

                            <div className="credential-body">
                                <span>{patientSurname.toUpperCase()}&ensp;{patientName.toUpperCase()}</span>
                                <span>DNI: Nº {patientDNI}</span>
                                <span>Fec. Nac.: {patientBirthdate}</span>
                            </div>

                            <div className="credential-footer">
                                <div className="credential-footer_border"></div>
                                <div className="credential-footer_img-container">
                                    <img className="credential-footer_img" src={logoSumar} alt="sumar" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex w-50 justify-content-end">
                        <Button variant="primary" onClick={() => generatePDFCredential()}><MdIcons.MdFileDownload className="me-2"></MdIcons.MdFileDownload>Descargar Credencial</Button>
                    </div>
                </>
            }
        </>
    )
}

export default CredencialSumar