import React, { useState } from 'react';
import { MDBFile } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function FilesDragAndDrop({ onUpload }) {
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedExtensions = ['pdf', 'jpg', 'jpeg'];
    const selectedFiles = files.filter((file) => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        return true;
      } else {
        setErrorMessage(`El archivo ${file.name} no está permitido. Solo se permiten archivos PDF y JPG.`);
        return false;
      }
    });
    setFileList([...fileList, ...selectedFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const allowedExtensions = ['pdf', 'jpg', 'jpeg'];
    const selectedFiles = files.filter((file) => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        return true;
      } else {
        setErrorMessage(`El archivo ${file.name} no está permitido. Solo se permiten archivos PDF y JPG.`);
        return false;
      }
    });
    setFileList([...fileList, ...selectedFiles]);
  };

  const handleRemove = (fileToRemove) => {
    const updatedList = fileList.filter((file) => file !== fileToRemove);
    setFileList(updatedList);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <div>
        <h5>Cargue sus estudios</h5>
        <MDBFile
          label="Seleccione un archivo"
          id="estudioFile"
          onChange={handleFileChange}
        />
      </div>

      <div className="lista">
        <h5>Sus estudios</h5>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul>
          {fileList.map((file, index) => (
            <li key={index}>
              {file.name}
              <button onClick={() => handleRemove(file)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
