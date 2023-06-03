import { API_ENDPOINT_ASSIGN_INSTITUTIONS, API_ENDPOINT_CREATEUSERADMIN, API_ENDPOINT_DELETEUSERADMIN, API_ENDPOINT_GETPERSONS, API_ENDPOINT_GETPERSONSACCEPTED, API_ENDPOINT_GET_USERS_ADMIN_LIST, API_ENDPOINT_GET_USER_ADMIN_BY_ID, API_ENDPOINT_ONOFFADMIN, API_ENDPOINT_PERSONACCEPTED, API_ENDPOINT_PERSONNOTACCEPT, API_ENDPOINT_UPDTAEUSERADMIN, API_ENDPOINT_UPDTAEUSERADMINPASSWORD, AUTH_HEADER, UPDATE_HEADER } from "../constants/api.constants";
import { get, post, put } from "./httpServices";

export async function getPersons() {
  try {
    const promise = await get(API_ENDPOINT_GETPERSONS, AUTH_HEADER())
   return promise
  }
  catch (err) {
    console.log('Error al cargar datos: ', err);
  }
}

export async function getPersonsAccepted() {
    try {
      const promise = await get(API_ENDPOINT_GETPERSONSACCEPTED, AUTH_HEADER())
     return promise
    }
    catch (err) {
      console.log('Error al cargar datos: ', err);
    }
  }

  export async function personAccepted(body){
    try {
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_PERSONACCEPTED, AUTH_HEADER(), data);
      return promise;
    } catch (err) {
      console.log("Error al editar persona: ", err);
    }
  }

  export async function personNotAccept(body){
    try {
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_PERSONNOTACCEPT, AUTH_HEADER(), data);
      return promise;
    } catch (err) {
      console.log("Error al editar persona: ", err);
    }
  }

  // crud ADMINISTRADORES -------------------------------------------------

  export async function getUsersAdminList() {
    try {
      const promise = await get(API_ENDPOINT_GET_USERS_ADMIN_LIST, AUTH_HEADER());
      return promise;
    } catch (err) {
      console.error("Error cargar datos: ", err);
    }
  }
  
  export async function getUserAdminById(id) {
    try {
      const searchParams = new URLSearchParams(id);
      let query = searchParams.toString();
      const promise = await get(API_ENDPOINT_GET_USER_ADMIN_BY_ID(query), AUTH_HEADER());
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }


  export async function postCreateUserAdmin(body) {
    try {
      const data = JSON.stringify(body);
      const promise = await post(API_ENDPOINT_CREATEUSERADMIN, UPDATE_HEADER(), data);
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }
  
  export async function putAssignInstitutionsAdmin(username, body) {
    try {
      const searchParams = new URLSearchParams(username);
      let query = searchParams.toString();
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_ASSIGN_INSTITUTIONS(query), UPDATE_HEADER(), data);
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }

  export async function putOnOffAdmin(id) {
    try {
      const searchParams = new URLSearchParams(id);
      let query = searchParams.toString();
      const promise = await put(API_ENDPOINT_ONOFFADMIN(query), AUTH_HEADER());
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }

  export async function putUpdateUserAdmin(body) {
    try {
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_UPDTAEUSERADMIN, UPDATE_HEADER(), data);
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }
  
  export async function putUpdateUserAdminPassword(body) {
    try {
      const data = JSON.stringify(body);
      const promise = await put(API_ENDPOINT_UPDTAEUSERADMINPASSWORD, UPDATE_HEADER(), data);
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }
  
  
  export async function deleteUserAdmin(id) {
    try {
      const searchParams = new URLSearchParams(id);
      let query = searchParams.toString();
      const promise = await put(API_ENDPOINT_DELETEUSERADMIN(query), UPDATE_HEADER());
      return promise;
    } catch (err) {
      console.error("Error al cargar datos: ", err);
    }
  }
  