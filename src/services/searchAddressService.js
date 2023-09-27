import { API_ENDPOINT_ALL_DEPARTAMENTOS_FROM, API_ENDPOINT_ALL_LOCALIDADES_FROM, API_ENDPOINT_ALL_PROVINCIAS, AUTH_HEADER } from "../constants/api.constants";
import { get } from "./httpServices";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
export default async function searchAddressService(address) {

    const params = {
        // place_id: "53723809",
        q: address,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        headers: {
            "Accept-Language": "es"
        },
        redirect: "follow"
    };
    const promise = await fetch(`${NOMINATIM_BASE_URL}/search?${queryString}`, requestOptions)
        .then((response) => {
            return response.text()
        })
        .then((result) => {
            // console.log('searchAddress',JSON.parse(result));
            return JSON.parse(result);
        })
        .catch((err) => { console.log("error: ", err) })
    return promise
}
export async function searchAddressByLatLonService(lat, lon) {

    const params = {
        format: "json",
        lat: lat,
        lon: lon,
        addressdetails: 1,
        polygon_geojson: 0
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        headers: {
            "Accept-Language": "es"
        },
        redirect: "follow"
    };
    const promise = await fetch(`${NOMINATIM_BASE_URL}/reverse?${queryString}`, requestOptions)
        .then((response) => {
            return response.text()
        })
        .then((result) => {
            // console.log('completeaddress',JSON.parse(result));
            return JSON.parse(result);
        })
        .catch((err) => { console.log("error: ", err) })
    return promise
}
export async function getAllProvincias() {
    try {
        const promise = await get(`${API_ENDPOINT_ALL_PROVINCIAS()}`, AUTH_HEADER())
        return promise
    }
    catch (err) {
        console.error('Error al cargar datos: ', err);
    }
}

export async function getAllDepartamentosFrom(provincia_id) {
    try {
        const searchParams = new URLSearchParams({
            provincias_id: provincia_id
          });
          let query = searchParams.toString();
        const promise = await get(`${API_ENDPOINT_ALL_DEPARTAMENTOS_FROM(query)}`, AUTH_HEADER())
        return promise
    }
    catch (err) {
        console.error('Error al cargar datos: ', err);
    }
}

export async function getAllLocalidadesFrom(departamento_id) {
    try {
        const searchParams = new URLSearchParams({
            departamento_id: departamento_id
          });
          let query = searchParams.toString();
        const promise = await get(`${API_ENDPOINT_ALL_LOCALIDADES_FROM(query)}`, AUTH_HEADER())
        return promise
    }
    catch (err) {
        console.error('Error al cargar datos: ', err);
    }
}