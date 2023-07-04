import { API_ENDPOINT_CREATE_INSTITUTION, API_ENDPOINT_ESPECIALIDADES_ALL, API_ENDPOINT_INSTITUCIONES, API_ENDPOINT_INSTITUCIONESAallWithNewData, API_ENDPOINT_INSTITUTIONS_ALL, API_ENDPOINT_INSTITUTIONS_BY_ID, API_ENDPOINT_SERVICIOS_ALL, API_ENDPOINT_SHORTEST_ROUTE, API_ENDPOINT_STATUS_INSTITUTION, API_ENDPOINT_UPDATE_INSTITUTION, API_HEADER, AUTH_HEADER, UPDATE_HEADER } from "../constants/api.constants";
import { get, post, put } from "./httpServices";

export default async function institutionsServices() {
  try {
    const promise = await get(API_ENDPOINT_INSTITUCIONES, API_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar las instituciones: ', err);
  }
}

export async function getInstitutionsAll() {
  try {
    const promise = await get(API_ENDPOINT_INSTITUTIONS_ALL, AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar las instituciones: ', err);
  }
}

export async function getInstitutionsAllWithNewData() {
  try {
    const promise = await get(API_ENDPOINT_INSTITUCIONESAallWithNewData, API_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar las instituciones: ', err);
  }
}

export async function getInstitutionsByID(id) {
  try {
    const searchParams = new URLSearchParams({
      institution_id: id
    });
    let query = searchParams.toString();
    const promise = await get(API_ENDPOINT_INSTITUTIONS_BY_ID(query), AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar la institución: ', err);
  }
}

export async function createInstitution(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await post(API_ENDPOINT_CREATE_INSTITUTION, UPDATE_HEADER(), data);
    return promise;
  } catch (err) {
    console.error("Error al crear institucion: ", err);
  }
}

export async function updateInstitution(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await put(API_ENDPOINT_UPDATE_INSTITUTION, UPDATE_HEADER(), data);
    return promise;
  } catch (err) {
    console.error("Error al ACTUALIZAR institucion: ", err);
  }
}

export async function updateStatusInstitution(body) {
  try {
    const data = JSON.stringify(body);
    const promise = await put(API_ENDPOINT_STATUS_INSTITUTION, UPDATE_HEADER(), data);
    return promise;
  } catch (err) {
    console.error("Error al ACTUALIZAR institucion: ", err);
  }
}

export async function getEspecialidadesAll() {
  try {
    const promise = await get(API_ENDPOINT_ESPECIALIDADES_ALL, AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar las especialidades: ', err);
  }
}

export async function getServiciosAll() {
  try {
    const promise = await get(API_ENDPOINT_SERVICIOS_ALL, AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar los servicios: ', err);
  }
}

export async function getShortestRoute(patientId, institucionId) {
  try {
    const searchParams = new URLSearchParams({
      person_id: patientId,
      institution_id: institucionId
    });
    let query = searchParams.toString();
    const promise = await get(API_ENDPOINT_SHORTEST_ROUTE(query), AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar los servicios: ', err);
  }
}
