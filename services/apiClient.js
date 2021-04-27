import Axios from "axios";

let urls = {
  test: `http://65.2.38.72/api/`,
  production: `http://65.2.38.72/api/`,
};
const api = Axios.create({
  baseURL: urls[process.env.config],
  headers: {},
});

export default api;
