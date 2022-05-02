import { API_ENDPOINTS_FAMILYHISTORIES, AUTH_HEADER } from "../../constants/api.constants";
import { get } from "../httpServices";

export default async function familyHistoriesServices(institution_id,patient_id) {
  try {
    const promise = await get(API_ENDPOINTS_FAMILYHISTORIES(institution_id,patient_id), AUTH_HEADER() )
    return promise
  }
  catch (err) {
    console.log('Error al cargar FamilyHistory: ', err);
  }
}