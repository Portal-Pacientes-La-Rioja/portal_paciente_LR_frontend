import { AUTH_HEADER, INDICADOR_CANTIDAD_USUARIOS, INDICADOR_GRUPO_FAMILIAR, INDICADOR_USUARIOS_ACTIVOS, INDICADOR_USUARIOS_MASTER, INDICADOR_USUARIOS_PENDIENTES, INDICADOR_USUARIOS_RECHAZADOS, INDICADOR_USUARIOS_VALIDADOS } from "../constants/api.constants";
import { get } from "./httpServices";

export async function getUsersIndicators() {
  try {
    const promise = await get((INDICADOR_USUARIOS_ACTIVOS()), AUTH_HEADER()) 
   return promise
  }
  catch (err) {
    console.log('Error al cargar datos: ', err);
  }
}

export async function getFamilyGroupIndicators() {
    try {
      const promise = await get((INDICADOR_GRUPO_FAMILIAR()), AUTH_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }

  export async function getValidatedUsersIndicators() {
    try {
      const promise = await get((INDICADOR_USUARIOS_VALIDADOS()), AUTH_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }

  export async function getRejectedUsersIndicators() {
    try {
      const promise = await get((INDICADOR_USUARIOS_RECHAZADOS()), AUTH_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }

  export async function getPendingUsersIndicators() {
    try {
      const promise = await get((INDICADOR_USUARIOS_PENDIENTES()), AUTH_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }
  
  export async function getQuantityUsersIndicators() {
    try {
      const promise = await get((INDICADOR_CANTIDAD_USUARIOS()), AUTH_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }

  export async function getMasterUsersIndicators() {
    try {
      const promise = await get((INDICADOR_USUARIOS_MASTER()), AUTH_HEADER()) 
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }
  
  