import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchBoards = () => API.get("/boards");
export const createColumn = (data) => API.post("/columns", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteBoard = (id) => API.delete(`/boards/${id}`);
