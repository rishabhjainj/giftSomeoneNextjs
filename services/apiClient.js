import Axios from "axios";

let urls = {
  test: `http://localhost:8888/api/`,
  production: `http://localhost:8888/api/`,
};
const api = Axios.create({
  baseURL: urls[process.env.config],
  headers: {},
});

export default api;
