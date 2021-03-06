import Axios from "axios";

let urls = {
  test: `http://localhost:9000/`,
  production: `https://api.skylarklabs.ai/`,
};
const api = Axios.create({
  baseURL: urls[process.env.config],
  headers: {},
});

export default api;
