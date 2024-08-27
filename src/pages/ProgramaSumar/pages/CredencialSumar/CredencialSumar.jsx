import { useCallback, useState } from "react";
import usePatient from "../../../../hooks/usePatient"
import * as MdIcons from 'react-icons/md'
import DataNotFound from "../../../../components/DataNotFound";
import logoSumar from '../../../../assets/statics/sumar-lr.png'
import { Button } from "react-bootstrap";
import '../../../../styles/CredentialCEB.scss'
import { cebService } from "../../../../services/sumarServices";
import { useEffect } from "react";
import html2canvas from 'html2canvas';
import { PDFDocument, rgb } from 'pdf-lib';

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

    const generatePDFCredential = async () => {
        const element = document.getElementById('pdf-content');

        // Usa html2canvas para capturar el contenido del elemento
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');

        // Crea un nuevo documento PDF con pdf-lib
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.276, 841.890]); // Tamaño A4 en puntos (210mm x 297mm)

        // Agrega la imagen al PDF
        const pngImage = await pdfDoc.embedPng(imgData);
        const { width, height } = pngImage.scale(1);

        // Calcula las coordenadas para centrar la imagen en la página A4
        const x = (page.getWidth() - width) / 2;
        const y = (page.getHeight() - height) / 2;

        page.drawImage(pngImage, {
            x,
            y,
            width,
            height,
        });

        // Genera el PDF y descárgalo
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `CEB-${patientName}-${patientSurname}.pdf`;
        link.click();
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
                        <div id="pdf-content" className="credential">
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