export const BASE_URL = 'http://localhost:8000';
export const AUTH_URL = 'http://localhost:8001/api/auth';
export const API_URL = `${BASE_URL}/api`;

export const GET_DATA = `${API_URL}/data`;
export const PATCH_DATA_BY_ID = (id) => `${API_URL}/data/${id}`;

export const SIGNIN = `${AUTH_URL}/signin`;
export const SIGNUP = `${AUTH_URL}/signup`;

export const GET_CONTENT_TYPES = `${API_URL}/contentTypes`;
export const GET_CONTENT_TYPE_BY_ID = (id) => `${API_URL}/contentTypes/${id}`;
export const POST_CONTENT_TYPE = `${API_URL}/contentTypes`;
export const PUT_CONTENT_TYPE_BY_ID = (id) => `${API_URL}/contentTypes/${id}`;

export const EDIT_SCHEMA_FIELD_TYPE = (id) => `${API_URL}/schemas/${id}`;
export const EDIT_SCHEMA_FIELD_NAME = (id) =>
  `${API_URL}/schemas/${id}/updateFieldName`;

export const DELETE_RECORD = (id) => `${API_URL}/records/${id}`;

export const CREATE_RECORD = `${API_URL}/records`;
export const UPDATE_RECORD = (id) => `${API_URL}/records/${id}`;
