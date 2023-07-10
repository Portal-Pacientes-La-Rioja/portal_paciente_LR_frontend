import { API_HEADER, INDICADOR_GRUPO_FAMILIAR, INDICADOR_USUARIOS_ACTIVOS } from "../constants/api.constants";
import { get } from "./httpServices";

export async function getUsersIndicators() {
  try {
    const promise = await get((INDICADOR_USUARIOS_ACTIVOS()), API_HEADER()) 
   return promise
  }
  catch (err) {
    console.log('Error al cargar las instituciones: ', err);
  }
}

export async function getFamilyGroupIndicators() {
    try {
      const promise = await get((INDICADOR_GRUPO_FAMILIAR()), API_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar las instituciones: ', err);
    }
  }
