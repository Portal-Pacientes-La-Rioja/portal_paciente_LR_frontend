
import { API_ENDPOINT_CEB, API_ENDPOINT_SUMAR, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

export default async function sumarServices(idn) {
  try {
    const promise = await get(API_ENDPOINT_SUMAR(idn), AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar Sumar: ', err);
  }
}

export async function cebService(idn) {
  try {
    const promise = await get(API_ENDPOINT_CEB(idn), AUTH_HEADER())
    return promise
  }
  catch (err) {
    console.error('Error al cargar CEB: ', err);
  }
}
