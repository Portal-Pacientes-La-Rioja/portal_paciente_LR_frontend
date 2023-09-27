import {  API_ENDPOINT_DELETESTUDY, API_ENDPOINT_GET_PERSON_STUDIES, API_ENDPOINT_GET_STUDY_BY_ID, API_ENDPOINT_GET_STUDY_TYPES, API_ENDPOINT_POST_ESTUDIO, AUTH_HEADER, UPDATE_HEADER_STUDIES } from "../constants/api.constants";
import { get, post, deleteService } from "./httpServices";

// export async function uploadStudies(patientId, description, study_type_id) {
//     try {
//       const searchParams = new URLSearchParams({
//         person_id: patientId,
//         description: description,
//         study_type_id: study_type_id,
//       });
//       let query = searchParams.toString();
//       const promise = await post(API_ENDPOINT_POST_ESTUDIO(query), AUTH_HEADER())
//       return promise
//     }
//     catch (err) {
//       console.error('Error al cargar los estudios: ', err);
//     }
//   }

export async function uploadStudies(params, body) {
  try {
    const query = new URLSearchParams({
        person_id: params.person_id,
        description: params.description,
        study_type_id: params.study_type_id,
    });

    // const data = JSON.stringify(body);
    const data = body;
    const promise = await post(API_ENDPOINT_POST_ESTUDIO(query), UPDATE_HEADER_STUDIES(), data);
    return promise;
  } catch (err) {
    console.error("Error al subir el estudio: ", err);
  }
}

export async function getStudyTypes() {
  try {
      const promise = await get(`${API_ENDPOINT_GET_STUDY_TYPES()}`, AUTH_HEADER())
      return promise
  }
  catch (err) {
      console.error('Error al cargar datos: ', err);
  }
}

export async function getPersonStudies(person_id) {
  try {
      const searchParams = new URLSearchParams({
          person_id: person_id
        });
        let query = searchParams.toString();
      const promise = await get(`${API_ENDPOINT_GET_PERSON_STUDIES(query)}`, AUTH_HEADER())
      return promise
  }
  catch (err) {
      console.error('Error al cargar datos: ', err);
  }
}

export async function getStudyById(study_id, token) {
  try {
    const promise = await getImageRequest(API_ENDPOINT_GET_STUDY_BY_ID(study_id), token);
    return promise
} catch(error) {
    console.log("Error fetching remote HTML: ", error);
}  
}

function getImageRequest (url, token) {
  return new Promise(function (resolve, reject) {
    let src
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob"; //so you can access the response like a normal URL
        xhr.open(
          "GET",
          url,
          true
        );
        xhr.setRequestHeader(
          'Authorization',
          `Bearer ${token}`
        );
        xhr.onload = function () {
          if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            src = URL.createObjectURL(xhr.response); 
            resolve(src)
          } else {
            reject(xhr.status);
          }
        };
        xhr.send();
});
}

export async function deleteStudy(study_id) {
  try {
    const searchParams = new URLSearchParams({
      study_id: study_id,
    });
    let query = searchParams.toString();
    const promise = await deleteService(
      API_ENDPOINT_DELETESTUDY(query),
      AUTH_HEADER(),
    );
    return promise;
  } catch (err) {
    console.log("Error al marcar mensaje como leido: ", err);
  }
}