import Axios from "axios";

let urls = {
  test: `http://localhost:8002/`,
  production: `https://65.2.38.72/api/`,
};
const api = Axios.create({
  baseURL: urls[process.env.config],
  headers: {},
});

export default api;
