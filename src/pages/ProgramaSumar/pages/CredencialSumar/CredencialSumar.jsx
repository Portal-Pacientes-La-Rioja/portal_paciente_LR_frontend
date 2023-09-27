import { useCallback, useState } from "react";
import usePatient from "../../../../hooks/usePatient"
import * as MdIcons from 'react-icons/md'
import DataNotFound from "../../../../components/DataNotFound";
import logoSumar from '../../../../assets/statics/sumar-lr.png'
import jsPDF from 'jspdf';
import { Button } from "react-bootstrap";
import '../../../../styles/CredentialCEB.scss'
import { cebService } from "../../../../services/sumarServices";
import { useEffect } from "react";

const CredencialSumar = () => {

    const p = usePatient();
    const patientName = p.patient.name
    const patientSurname = p.patient.surname
    const patientDNI = p.patient.identification_number

    const patientBirthdate = new Date(p.patient.birthdate).toLocaleDateString();

    const [credential, setCredential] = useState(false)
    const [credentialError, setCredentialError] = useState(false)

    const checkCredential = useCallback(
        (dni) => {
            cebService(dni)
                .then((res) => {
                    if (res.msg) setCredential(true)
                    else setCredentialError(true)
                })
                .catch((err) => console.error(err))
        }, [])

    //  Consultar si el ciudadano está inscripto al programa SUMAR y tiene Cobertura efectiva básica. Generación de una
    // credencial para ciudadanos que estén inscriptos al programa SUMAR, es decir que tienen cobertura publica exclusiva,
    // si tiene o no CEB, posibilidad de bajar esa credencial el PDF.

    const generatePDFCredential = () => {
        let doc = new jsPDF("p", "pt", "a4")
        doc.html(document.querySelector('#credential'), {
            callback: function (pdf) {
                pdf.save(`CEB-${patientName}-${patientSurname}.pdf`)
            }
        })
    }

    useEffect(() => {
        setCredential(false)
    }, [p.patient])

    return (
        <>
            <p>Paciente: {patientSurname.toUpperCase()}&ensp;{patientName.toUpperCase()}, DNI: Nº {patientDNI}</p>
            {!credential && !credentialError &&
                <Button variant="danger" onClick={() => checkCredential(patientDNI)}><MdIcons.MdOutlineSearch className="me-2"></MdIcons.MdOutlineSearch>Consultar credencial</Button>
            }
            {credentialError &&
                <DataNotFound text="Credencial de Cobertura Efectiva Básica"></DataNotFound>
            }
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