import { environment } from "../environments/environments.demo";

const baseUrlHSI = environment.hsi.apiUrl

export const HSI_HEADER = () => {
    return { 
        "Content-type": "application/json",
        "Authorization": environment.hsi.apiKey 
    }
};

export const HSI_HEADER_API_KEY = () => {
    return { 
        "Content-type": "application/json",
        "api-key": environment.hsi.apiKey 
    }
};


export const HSI_GET_INSTITUTIONS = `${baseUrlHSI}/appointment/booking/institutionExtended`;
export const HSI_GET_SPECIALTY = `${baseUrlHSI}/appointment/booking/specialties`;
export const HSI_GET_MEDICAL_COVERAGE = `${baseUrlHSI}/appointment/booking/medicalCoverages`;

export const HSI_GET_AVAILABLE_APPOINTMENTS = (institution_id, specialty_id, coverage_id) => {
    return `${baseUrlHSI}/institution/${institution_id}/appointment/booking/specialty/${specialty_id}/practice/2/medicalCoverages/${coverage_id}/availability`;
};

export const HSI_POST_APPOINTMENT = (institution_id) => {
    return `${baseUrlHSI}/institution/${institution_id}/appointment/booking`;
};

export const HSI_GET_USER_APPOINTMENTS = (userData) => {
    return `${baseUrlHSI}/patient/${userData.dni}/appointments?identificationTypeId=${userData.identificationTypeId}&genderId=${userData.genderId}&birthDate=${userData.birthDate}`;
};

