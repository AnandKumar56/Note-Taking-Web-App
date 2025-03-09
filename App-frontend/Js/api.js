const API_BASE_URL = "http://localhost:3000/api";

export const API_URLS = {
    REGISTER: `${API_BASE_URL}/auth/signup`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    GET_USER: `${API_BASE_URL}/auth/getuser`,
    ADD_NOTE: `${API_BASE_URL}/notes`,
    FETCH_NOTES: `${API_BASE_URL}/notes`,
    UPDATE_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`,
    DELETE_NOTE: (noteId) => `${API_BASE_URL}/notes/${noteId}`,
};
