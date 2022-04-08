import axios from "axios";
const dateBase = import.meta.env.VITE_DATEBASE;
const instance = axios.create({baseURL: dateBase})
const paginationFixer = (a, b) => {
    if (b > a) {
        return Math.round(b+1)
    } else {
        return a
    }
}
const pagination = (a, b) => `?_page=${a}&_limit=${b}`
export { instance, pagination, paginationFixer };
