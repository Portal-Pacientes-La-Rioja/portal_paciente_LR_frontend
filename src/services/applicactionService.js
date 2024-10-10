import { HSI_GET_AVAILABLE_APPOINTMENTS, HSI_GET_INSTITUTIONS, HSI_GET_MEDICAL_COVERAGE, HSI_GET_SPECIALTY, HSI_HEADER, HSI_HEADER_API_KEY, HSI_POST_APPOINTMENT } from "../constants/api-hsi.constants";
import { API_ENDPOINT_GET_USER_APPOINTMENTS, API_ENDPOINT_SEND_TURNO_MAIL, AUTH_HEADER } from "../constants/api.constants";
import { get, post } from "./httpServices";

export async function sendAppointmentEmailService(person_id, subject, body) {
  try {
    const searchParams = new URLSearchParams({
      person_id: person_id,
      subject: subject,
      body: body,
    });
    let query = searchParams.toString();
    const promise = await post(
      API_ENDPOINT_SEND_TURNO_MAIL(query),
      AUTH_HEADER()
    );
    return promise;
  } catch (err) {
    console.error(err);
  }
}

/**   -----   HSI    -----     */

export async function getInstitutionsHSI() {
  try {
    const promise = await get(HSI_GET_INSTITUTIONS, HSI_HEADER());
    return promise;
  } catch (err) {
    console.error(err);
  }
}
export async function getSpecialtiesHSI() {
  try {
    const promise = await get(HSI_GET_SPECIALTY, HSI_HEADER());
    return promise;
  } catch (err) {
    console.error(err);
  }
}
export async function getCoverageHSI() {
  try {
    const promise = await get(HSI_GET_MEDICAL_COVERAGE, HSI_HEADER());
    return promise;
  } catch (err) {
    console.error(err);
  }
}

export async function getAvailableAppointmentsService(institution_id, specialty_id, coverage_id) {
  try {
    const promise = await get(HSI_GET_AVAILABLE_APPOINTMENTS(institution_id, specialty_id, coverage_id), HSI_HEADER_API_KEY());
    return promise;
  } catch (err) {
    console.error(err);
  }
}

export async function postAppointment(body, institution_id) {
  try {
    const data = JSON.stringify(body);
    const promise = await post(
      HSI_POST_APPOINTMENT(institution_id),
      HSI_HEADER(),
      data
    );
    return promise;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserAppointmentsService(userData) {
  try {
    const searchParams = new URLSearchParams(userData);
    let query = searchParams.toString();
    const promise = await get(API_ENDPOINT_GET_USER_APPOINTMENTS(query), AUTH_HEADER());
    return promise;
  } catch (err) {
    console.error(err);
  }
}

export const mockDataAppointments = {
  "availability": [
    {
      "diary": {
        "id": 19216,
        "doctorsOfficeId": 0,
        "doctorsOfficeDescription": "Alvarez Vanina",
        "startDate": "2024-09-02",
        "endDate": "2024-09-02",
        "appointmentDuration": 15,
        "from": {
          "hour": "07:45",
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "to": {
          "hour": "08:00",
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "openingHoursId": 6509
      },
      "slots": {
        "date": "2024-09-02",
        "slots": [
          "string"
        ]
      }
    },
    {
      "diary": {
        "id": 19217,
        "doctorsOfficeId": 0,
        "doctorsOfficeDescription": "Alvarez Vanina",
        "startDate": "2024-11-15",
        "endDate": "2024-11-15",
        "appointmentDuration": 15,
        "from": {
          "hour": "08:00",
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "to": {
          "hour": "08:15",
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "openingHoursId": 6510
      },
      "slots": {
        "date": "2024-09-02",
        "slots": [
          "string"
        ]
      }
    },
    {
      "diary": {
        "id": 19218,
        "doctorsOfficeId": 0,
        "doctorsOfficeDescription": "Alvarez Vanina",
        "startDate": "2024-09-02",
        "endDate": "2024-09-02",
        "appointmentDuration": 15,
        "from": {
          "hour": "08:15",
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "to": {
          "hour": "08:30",
          "minute": 0,
          "second": 0,
          "nano": 0
        },
        "openingHoursId": 6511
      },
      "slots": {
        "date": "2024-09-02",
        "slots": [
          "string"
        ]
      }
    }
  ]
}
