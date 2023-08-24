import React, { useCallback, useState, useEffect } from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { deleteStudy, getPersonStudies, getStudyTypes, uploadStudies } from '../../../services/studies';
import usePatient from '../../../hooks/usePatient';
import Swal from "sweetalert2";
import { error } from '../../../components/SwalAlertData';
import Loader from '../../../components/Loader';
import { Form, Button } from "react-bootstrap";
import * as MdIcon from "react-icons/md";
import { Col, Row } from "react-bootstrap";


export default function FilesDragAndDrop({ onUpload }) {
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  const [studyTypes, setStudyTypes] = useState([]);
  const studyTypeMappings = {
    'Estudios de Imágenes': 1,
    'Estudios de Laboratorio': 2,
    'Estudios Observacionales': 3,
    'Resumen de Historia Clínica': 4,
    'Otros': 5,
  };
  const [studyDescription, setStudyDescription] = useState('');

  const [loading, setLoading] = useState(true);

  const p = usePatient()

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  
  const [tempFile, setTempFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setTempFile(file);
  };

  const handleDescriptionChange = (event) => {
    setStudyDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!tempFile) {
      setErrorMessage('Por favor, seleccione un archivo.');
      return;
    }
  
    if (!selectedType) {
      setErrorMessage('Por favor, seleccione un tipo de estudio.');
      return;
    }
  
    const allowedExtensions = ['pdf', 'jpg', 'jpeg'];
    const fileExtension = tempFile.name.split('.').pop().toLowerCase();
  
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('El archivo no está permitido. Solo se permiten archivos PDF y JPG.');
      return;
    }
  
    if (!studyDescription) {
      setErrorMessage('Por favor, ingrese una descripción del estudio.');
      return;
    }
  
    const fileInfo = { file: tempFile, type: selectedType, description: studyDescription };

    setTempFile(null);
    setSelectedType('');
    setStudyDescription('');
    setErrorMessage('');

    const studyTypeId = studyTypeMappings[selectedType];

    // Convertir el archivo en una cadena binaria (base64)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(tempFile);

    fileReader.onload = function () {
      let patientId = p.patient.id;

      const fileInfo = {
          person_id: patientId,
          study_type_id: selectedType,
          description: studyDescription,
        };

      let body = new FormData();
      body.append('study', tempFile, tempFile.name)

      subirEstudios(fileInfo, body);
    };
};
  


const subirEstudios = useCallback(
  (params, body) => {
      uploadStudies(params, body)
          .then((res) => {
              if (res.ok) {
                  getEstudiosDePersona(p.patient.id)
                  console.log(res)
              } else {
                  throw new Error('Error')
              }
          })
          .catch((err) => {
              console.error(err)
              Swal.fire(error('Error al subir el estudio.'))
          })
  }, [])

  useEffect(() => {
      getTiposDeEstudios()
      getEstudiosDePersona(p.patient.id)
  }, [p.patient])

  const getTiposDeEstudios = useCallback(
    () => {
        getStudyTypes()
            .then((res) => {
                setStudyTypes(res);
                setLoading(false);
            })
            .catch((err) => console.error(err))
    }, [])

    const getEstudiosDePersona = useCallback(
      (person_id) => {
          getPersonStudies(person_id)
              .then((res) => {
                  console.log(res);
                  setFileList(res);
              })
              .catch((err) => console.error(err))
      }, [])

  const handleDelete = useCallback((fileToRemove, index)=>{
    const study_id = fileToRemove.study_id
    deleteStudy(study_id)
    .then((res) => {
      console.log(res);
      if (res.ok) {
        getEstudiosDePersona(p.patient.id)
      }
    })
    .catch((err) => console.error(err))
  }, [])

  return (<>
    {loading
        ? <Loader isActive={loading} />
        :<div>
      <div>
      <div>
        <h5>Cargá tus estudios</h5>
        <div className="input-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <Col xs={12} sm={6} >
              <Form.Select value={selectedType} onChange={handleTypeChange}>
                <option value="">Seleccioná un tipo de estudio</option>
                {studyTypes.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </div>
          <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <textarea
              rows="2"
              cols="30"
              placeholder="Ingresá una descripción del estudio"
              value={studyDescription}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="input-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <input
              type="file"
              id="estudioFile"
              onChange={handleFileChange}
            />
            <div className="input-item">
              <Button variant="danger" style={{ marginTop: '10px'}}
                onClick={handleUpload}>Subir archivo</Button>
              </div>
          </div>
        </div>
      </div>



      <div className="lista">
        <Col xs={12} sm={6} >
        <h5>Tus estudios</h5>
        {errorMessage && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
        )}
        <ul>
          {fileList.length > 0 && fileList.map((fileInfo, index) => (
            <li key={fileInfo.study_name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                {fileInfo.study_name} - Tipo: {fileInfo.type} - Descripción: {fileInfo.description}
              </div>
              <div className="my-tooltip">
                <button className='btn text-danger btn-icon ms-0' onClick={() => handleDelete(fileInfo, index)}>
                  <MdIcon.MdDeleteForever style={{ fontSize: '1.5rem' }} />
                </button>
                <span className="tiptext">
                  Eliminar
                </span>
              </div>
            </li>
          ))}
        </ul>  
        </Col>      
      </div>
      </div>
      </div>
    }
    </>
  );
}
