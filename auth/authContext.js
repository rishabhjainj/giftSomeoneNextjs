import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import api from "../services/apiClient";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = "JWT " + Cookies.get("token");
      if (token) {
        api.defaults.headers.Authorization = `${token}`;
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const serviceIsEnabled = async (serviceId, project) => {
    const { data: response } = await api.get(
      "console/services/".concat(`${serviceId}`).concat("/is_enabled/"),
      {
        params: {
          project: project,
        },
      }
    );
    if (response) {
      return response;
    }
  };

  const enableService = async (cart_id, product) => {
    const { data: response } = await api.post(
      "api/orders/".concat(`${cart_id}`).concat("/add_to_cart/"),
      { product }
    );
    if (response) {
      return response;
    }
  };
  const checkout = async (
    cart_id,
    street_address,
    apartment_address,
    country,
    state,
    zip
  ) => {
    const { data: response } = await api.post(
      "api/orders/".concat(`${cart_id}`).concat("/checkout/"),
      { street_address, apartment_address, state, country, zip }
    );
    if (response) {
      return response;
    }
  };
  const initiate_payment = async (cart_id) => {
    setTimeout(() => {
      window.open("http://localhost:8002/api/redirect/", "_blank");
    }, 2000);

    // const { data: response } = await api.get("api/redirect/");
    // if (response) {
    //   return response;
    // }
  };
  const addToCart = async (cart_id, product, qty = 1) => {
    const { data: response } = await api.post(
      "api/orders/".concat(`${cart_id}`).concat("/add_to_cart/"),
      { product, qty }
    );
    if (response) {
      return response;
    }
  };
  const removeFromWishlist = async (product) => {
    const { data: response } = await api.post(
      "api/products/".concat(`${product}`).concat("/remove_from_wishlist/"),
      {}
    );
    if (response) {
      return response;
    }
  };

  const addToWishlist = async (product) => {
    const { data: response } = await api.post(
      "api/products/".concat(`${product}`).concat("/add_to_wishlist/"),
      {}
    );
    if (response) {
      return response;
    }
  };
  const getWishlist = async () => {
    const { data: response } = await api.get(
      "api/products/".concat(`${1}`).concat("/get_wishlist/"),
      {}
    );
    if (response) {
      return response;
    }
  };

  const removeFromCart = async (cart_id, product) => {
    console.log(product);
    const { data: response } = await api.post(
      "api/orders/".concat(`${cart_id}`).concat("/remove_from_cart/"),
      { product }
    );
    if (response) {
      return response;
    }
  };

  const getCart = async (cart_id) => {
    const { data: response } = await api.get(
      "api/orders/".concat(`${cart_id}`).concat("/get_cart/"),
      {}
    );
    if (response) {
      return response;
    }
  };

  const disableService = async (projectId, service) => {
    const { data: response } = await api.post(
      "console/projects/"
        .concat(projectId.toString())
        .concat("/disable_service/"),
      { service }
    );
    if (response) {
      return response;
    }
  };
  const addProject = async (name, description) => {
    const { data: response } = await api.post("console/projects/", {
      name,
      description,
    });
    if (response) {
      console.log("Project added", response);
      return response;
    }
  };

  const addProjectAPIKey = async (project) => {
    const { data: response } = await api.post("console/api-keys/", {
      project,
    });
    if (response) {
      return response;
    }
  };

  const deleteProject = async (project_id) => {
    const { data: response } = await api.delete(
      "console/projects/".concat(`${project_id}`)
    );
    if (response) {
      return response;
    }
  };

  const deleteApiKey = async (api_key_id) => {
    console.log("deleting key", api_key_id);
    const { data: response } = await api.delete(
      "console/api-keys/".concat(`${api_key_id}`)
    );
    if (response) {
      return response;
    }
  };

  const updateApiKeyName = async (api_key_id, name) => {
    const { data: response } = await api.patch(
      "console/api-keys/".concat(`${api_key_id}`).concat("/"),
      {
        name,
      }
    );
    if (response) {
      return response;
    }
  };

  const getProjectAPIKey = async (project) => {
    //const project = projectId
    const { data: response } = await api.get("console/api-keys/", { project });
    console.log(response);
    if (response) return response;
  };

  const DeleteProjectAPIKey = async (id) => {
    setIsLoading(true);
    const response = await api.delete("console/api-keys/".concat(`${id}`), {});
    console.log(response);
    setIsLoading(false);
  };

  const getServiceById = async (id) => {
    const { data: response } = await api.get(
      "console/services/".concat(`${id}`),
      {}
    );
    if (response) {
      console.log("got services", response);
      return response;
    }
  };
  const getProductById = async (id) => {
    console.log("id is " + id);
    const { data: response } = await api.get(
      "api/products/".concat(`${id}`),
      {}
    );
    if (response) {
      return response;
    }
  };

  const getCategories = async () => {
    const { data: response } = await api
      .get("api/categories/")
      .catch((err) => err);
    if (response) {
      return response;
    }
  };
  const getProductList = async () => {
    const { data: response } = await api
      .get("api/products/")
      .catch((err) => err);
    if (response) {
      return response;
    }
  };
  const getProjects = async () => {
    const { data: response } = await api.get("console/projects/");
    if (response) {
      return response;
    }
  };

  const login = async (email, password) => {
    try {
      const { data: token } = await api.post("login/", { email, password });

      if (token) {
        Cookies.set("token", token.token, { expires: 60 });
        api.defaults.headers.common["authorization"] = `JWT ${token.token}`;
        api.defaults.headers.common["Access-Control-Allow-Origin"] = `*`;
        api.defaults.headers.common[
          "Access-Control-Allow-Methods"
        ] = `GET, POST, PATCH, PUT, DELETE, OPTIONS`;
        api.defaults.headers.common[
          "Access-Control-Allow-Headers"
        ] = `Origin, Content-Type, X-Auth-Token`;

        window.location.pathname = "/home";
        return token.token;
      }
    } catch (err) {
      return { token: "error" + err };
    }
    // } else {
    //   console.log("error");
    //   return { status: "error" };
    // }
  };
  const getUsageByPoints = async (start_time, end_time, points, project) => {
    const { data: response } = await api.get("console/usage/", {
      params: {
        start_time: start_time,
        end_time: end_time,
        points: points,
        project: project,
      },
    });
    if (response) {
      console.log("usage recieved", response);
      return response;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    // setUser(null);
    window.location.pathname = "/login/login-page";
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!Cookies.get("token"),

        login,

        logout,
        getProductList,
        getProjects,
        getUsageByPoints,
        addProject,
        addProjectAPIKey,
        DeleteProjectAPIKey,
        getProjectAPIKey,
        getProductById,
        getCategories,
        getServiceById,
        serviceIsEnabled,
        enableService,
        addToCart,
        checkout,
        initiate_payment,
        removeFromCart,
        getCart,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        updateApiKeyName,
        disableService,
        deleteApiKey,
        deleteProject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function ProtectRoute(Component) {
  return () => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) window.location.pathname = "/login/login-page";
    }, [loading, isAuthenticated]);

    return <Component {...arguments} />;
  };
}

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
