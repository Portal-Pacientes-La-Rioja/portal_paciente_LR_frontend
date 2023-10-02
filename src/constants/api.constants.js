import { environment } from "../environments/environments.demo";

const baseUrl = environment.baseURL;

export let LOGIN_HEADER = () => {
  let header = {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return header;
};

export let API_HEADER = () => {
  let header = {
    "accept": "application/json",
  };
  return header;
};

export let REGISTER_HEADER = () => {
  let header = {
    "Content-Type": "application/json",
  };
  return header;
};

export let NONE_HEADER = () => {
  let header = {
    // "Content-Type": "multipart/form-data",
  };
  return header;
};

export let AUTH_HEADER = () => {
  const jwt = localStorage.getItem("tokenUser")
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : null;
  let header = {
    "accept": "application/json",
    "Authorization": `Bearer ${jwt}`,
  };
  return header;
};

export let UPDATE_HEADER = () => {
  const jwt = localStorage.getItem("tokenUser")
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : null;
  let header = {
    "Content-type": "application/json",
    "Authorization": `Bearer ${jwt}`,
  };
  return header;
};

export let UPDATE_HEADER_STUDIES = () => {
  const jwt = localStorage.getItem("tokenUser")
    ? JSON.parse(localStorage.getItem("tokenUser"))
    : null;
  let header = {
    //"Content-type": "multipart/form-data",
    "Authorization": `Bearer ${jwt}`,
    //"accept": "application/json",
  };
  return header;
};

// login ---------------------------------------

export const API_ENDPOINT_LOGINADMIN = `${baseUrl}/login-admin`;

export const API_ENDPOINT_LOGINPERSON = `${baseUrl}/login`;

// validate ---------------------------------------

export const API_ENDPOINT_VALIDATEEMAIL = (token) => {
  let url = `${baseUrl}/validate-email/${token}`;
  return url;
};

export const API_ENDPOINT_RECOVERPASSWORD = (query) => {
  let url = `${baseUrl}/recover-password?${query}`;
  return url;
};

export const API_ENDPOINT_CHANGEPASSWORD = (query) => {
  let url = `${baseUrl}/change-password?${query}`;
  return url;
};

// PERSON ---------------------------------------

export const API_ENDPOINT_CREATEPERSONANDUSER = `${baseUrl}/createpersonanduser`;

export const API_ENDPOINT_CREATEPERSON = `${baseUrl}/createperson`;

export const API_ENDPOINT_UPDATEPEROSN = `${baseUrl}/updateperson`;

export const API_ENDPOINT_UPLOADIDENTIFICATIONIMAGES = (query) => {
  let url = `${baseUrl}/uploadidentificationimages?${query}`;
  return url;
};

export const API_ENDPOINT_DOWNLOADIDENTIFICATIONIMAGES = (query) => {
  let url = `${baseUrl}/downloadidentificationimage?${query}`;
  return url;
};
//admin ---------------------------------------

export const API_ENDPOINT_SETADMINSTATUSTOPERSON = (query) => {
  let url = `${baseUrl}/setadminstatustoperson?${query}`;
  return url;
};

export const API_ENDPOINT_GETADMINSTATUS = `${baseUrl}/getadminstatus`;

export const API_ENDPOINT_GETPERSONS = `${baseUrl}/persons`;

export const API_ENDPOINT_PERSONS_TO_BE_ACCEPTED = `${baseUrl}/persons_to_be_accepted`;

export const API_ENDPOINT_PERSONS_RELATIVES_TO_ACCEPT = `${baseUrl}/relatives_to_accept`;

export const API_ENDPOINT_GETPERSONSACCEPTED = `${baseUrl}/persons_accepted`;

export const API_ENDPOINT_PERSONACCEPTED = `${baseUrl}/accepted`;

export const API_ENDPOINT_PERSONNOTACCEPT = `${baseUrl}/notaccept`;

// CRUD ADMINS ------------------------------------------------------
export const API_ENDPOINT_GET_USERS_ADMIN_LIST = `${baseUrl}/admins`;

export const API_ENDPOINT_GET_USER_ADMIN_BY_ID = (query) => {
  let url = `${baseUrl}/adminbyid?${query}`;
  return url;
}

export const API_ENDPOINT_CREATEUSERADMIN = `${baseUrl}/create_admin`;


export const API_ENDPOINT_UPDTAEUSERADMIN = `${baseUrl}/updateuseradmin`;
export const API_ENDPOINT_UPDTAEUSERADMINPASSWORD = `${baseUrl}/change_password`;
export const API_ENDPOINT_ASSIGN_INSTITUTIONS = (query) => {
  let url = `${baseUrl}/assign_institutions?${query}`;
  return url;
}

export const API_ENDPOINT_DELETEUSERADMIN = (query) => {
  let url = `${baseUrl}/deleteuseradmin?${query}`;
  return url;
}
export const API_ENDPOINT_ONOFFADMIN = (query) => {
  let url = `${baseUrl}/onoffadmin?${query}`;
  return url;
}
// get patients/users data ---------------------------------------

export const API_ENDPOINT_GETPERSONBYIDENTIFICATIONNUMBER = (query) => {
  let url = `${baseUrl}/getpersonbyidentificationnumber?${query}`;
  return url;
};

export const API_ENDPOINT_GETPERSONBYID = (query) => {
  let url = `${baseUrl}/getpersonbyid?${query}`;
  return url;
};

export const API_ENDPOINT_PATIENTBASICDATA = (query) => {
  let url = `${baseUrl}/patient/basicData?${query}`;
  return url;
};

export const API_ENDPOINT_PATIENTCOMPLETEDATA = (query) => {
  let url = `${baseUrl}/patient/completeData?${query}`;
  return url;
};

export const API_ENDPOINT_CATEGORIES = `${baseUrl}/categories`;

export const API_ENDPOINT_SEND_TURNO_MAIL = (query) => {
  let url = `${baseUrl}/send-turno-mail?${query}`;
  return url;
};

// formData---------------------------------------
export const API_ENDPOINT_INSTITUCIONES = `${baseUrl}/institutions/all`;
export const API_ENDPOINT_INSTITUCIONESAallWithNewData = `${baseUrl}/allWithNewData`;

export const API_ENDPOINT_PARAMETRIC = `${baseUrl}/parametric`;

// messages---------------------------------------

export const API_ENDPOINT_GETALLMESSAGES = `${baseUrl}/get-all-messages`;

export const API_ENDPOINT_GETMESSAGESBYPERSON = (query) => {
  let url = `${baseUrl}/get-messages-by-person?${query}`;
  return url;
};

export const API_ENDPOINT_CREATEMESSAGE = (query) => {
  let url = `${baseUrl}/createmessage?${query}`;
  return url;
};

export const API_ENDPOINT_SETMESSAGEREAD = (query) => {
  let url = `${baseUrl}/setmessageread?${query}`;
  return url;
};

export const API_ENDPOINT_GETMESSAGE = (query) => {
  let url = `${baseUrl}/getmessage?${query}`;
  return url;
};

export const API_ENDPOINT_SENDMESSAGE = (query) => {
  let url = `${baseUrl}/sendmessage?${query}`;
  return url;
};

export const API_ENDPOINT_UPDATEMESSAGE = `${baseUrl}/updatemessage`;

export const API_ENDPOINT_DELETEMESSAGE = (query) => {
  let url = `${baseUrl}/deletemessage?${query}`;
  return url;
};

// sumar ---------------------------------------
export const API_ENDPOINT_SUMAR = (idn) => {
  let url = `${baseUrl}/data/${idn}`;
  return url;
};

export const API_ENDPOINT_CEB = (idn) => {
  let url = `${baseUrl}/ceb/${idn}`;
  return url;
};

// hce---------------------------------------
export const API_ENDPOINT_ALLERGIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/allergies/${patient_id}`;
  return url;
};

export const API_ENDPOINT_ANTHROPOMETRICDATA = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/anthropometricData/${patient_id}`;
  return url;
};

export const API_ENDPOINT_FAMILYHISTORIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/familyHistories/${patient_id}`;
  return url;
};

export const API_ENDPOINT_CHRONIC = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/chronic/${patient_id}`;
  return url;
};

export const API_ENDPOINT_TOOTHRECORDS = (
  institution_id,
  patient_id,
  tooth_sct_id
) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/toothRecords/${patient_id}/tooth/${tooth_sct_id}`;
  return url;
};

export const API_ENDPOINT_ACTIVEPROBLEMS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/activeProblems/${patient_id}`;
  return url;
};

export const API_ENDPOINT_HOSPITALIZATION = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/hospitalization/${patient_id}`;
  return url;
};

export const API_ENDPOINT_SOLVEDPROBLEMS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/solvedProblems/${patient_id}`;
  return url;
};

export const API_ENDPOINT_VITALSIGNS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/vitalSigns/${patient_id}`;
  return url;
};

export const API_ENDPOINT_INMUNIZATION = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/immunizations/${patient_id}`;
  return url;
};

export const API_ENDPOINT_MEDICATIONS = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/medications/${patient_id}`;
  return url;
};

export const API_ENDPOINT_PERSONALHYSTORIES = (institution_id, patient_id) => {
  let url = `${baseUrl}/hcegeneral/${institution_id}/personalHistories/${patient_id}`;
  return url;
};

// INSTITUTIONS ---------------------------------------
export const API_ENDPOINT_INSTITUTIONS_ALL = `${baseUrl}/getinstitutions`;
export const API_ENDPOINT_CREATE_INSTITUTION = `${baseUrl}/createinstitution`;
export const API_ENDPOINT_UPDATE_INSTITUTION = `${baseUrl}/updateinstitution`;
export const API_ENDPOINT_STATUS_INSTITUTION = `${baseUrl}/onoffinstitution`;
export const API_ENDPOINT_INSTITUTIONS_BY_ID = (query) => {
  return `${baseUrl}/getinstitutionsbyid?${query}`;
}
export const API_ENDPOINT_SHORTEST_ROUTE= (query) => {
  return `${baseUrl}/shortest-route?${query}`;
}
export const API_ENDPOINT_ESPECIALIDADES_ALL = `${baseUrl}/especialidades`;
export const API_ENDPOINT_ESPECIALIDADES_BY_ID = (especialidad) => {
  return `${baseUrl}/especialidades/${especialidad}`;
}
export const API_ENDPOINT_SERVICIOS_ALL = `${baseUrl}/servicios`;
export const API_ENDPOINT_SERVICIOS_BY_ID = (servicio) => {
  return `${baseUrl}/servicios/${servicio}`;
}
export const API_ENDPOINT_ALL_PROVINCIAS = () => {
  return `${baseUrl}/get_all_provincias`;
}
export const API_ENDPOINT_ALL_DEPARTAMENTOS_FROM = (query) => {
  return `${baseUrl}/get_all_departamentos_from?${query}`;
}
export const API_ENDPOINT_ALL_LOCALIDADES_FROM = (query) => {
  return `${baseUrl}/get_all_localidades_from?${query}`;
}
// // INDICADORES
export const INDICADOR_USUARIOS_ACTIVOS = () => {
  let url = `${environment.baseURL}/indicador_usuarios_activos`;
  return url;
};

// ESTUDIOS -------------------------------------------------
export const API_ENDPOINT_POST_ESTUDIO= (query) => {
  return `${baseUrl}/upload-study?${query}`;
}

export const API_ENDPOINT_GET_STUDY_TYPES = () => {
  return `${baseUrl}/study-types`;
}

export const API_ENDPOINT_GET_STUDY_BY_ID = (query) => {
  return `${baseUrl}/study/${query}/file`;
}

export const API_ENDPOINT_GET_PERSON_STUDIES = (query) => {
  return `${baseUrl}/studies?${query}`;
}

export const API_ENDPOINT_DELETESTUDY = (query) => {
  let url = `${baseUrl}/delete-study?${query}`;
  return url
}
export const INDICADOR_USUARIOS_MASTER = () => {
  let url = `${environment.baseURL}/indicador_usuarios_master`;
  return url;
};

export const INDICADOR_CANTIDAD_USUARIOS = () => {
  let url = `${environment.baseURL}/indicador_cantidad_usuarios`;
  return url;
};

export const INDICADOR_GRUPO_FAMILIAR = () => {
  let url = `${environment.baseURL}/indicador_grupo_familiar`;
  return url;
};

export const INDICADOR_USUARIOS_VALIDADOS = () => {
  let url = `${environment.baseURL}/indicador_usuarios_validados`;
  return url;
};

export const INDICADOR_USUARIOS_RECHAZADOS = () => {
  let url = `${environment.baseURL}/indicador_usuarios_recazados`;
  return url;
};

export const INDICADOR_USUARIOS_PENDIENTES = () => {
  let url = `${environment.baseURL}/indicador_usuarios_pendientes`;
  return url;
};
export const INDICADOR_TURNOS = () => {
  let url = `${environment.baseURL}/turnos/count`;
  return url;
};