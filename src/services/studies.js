import { API_ENDPOINT_CREATE_INSTITUTION, API_ENDPOINT_DELETESTUDY, API_ENDPOINT_ESPECIALIDADES_ALL, API_ENDPOINT_GET_PERSON_STUDIES, API_ENDPOINT_GET_STUDY_TYPES, API_ENDPOINT_INSTITUCIONES, API_ENDPOINT_INSTITUCIONESAallWithNewData, API_ENDPOINT_INSTITUTIONS_ALL, API_ENDPOINT_INSTITUTIONS_BY_ID, API_ENDPOINT_POST_ESTUDIO, API_ENDPOINT_SERVICIOS_ALL, API_ENDPOINT_SHORTEST_ROUTE, API_ENDPOINT_STATUS_INSTITUTION, API_ENDPOINT_UPDATE_INSTITUTION, API_HEADER, AUTH_HEADER, UPDATE_HEADER, UPDATE_HEADER_STUDIES } from "../constants/api.constants";
import { get, post, put, deleteService } from "./httpServices";

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