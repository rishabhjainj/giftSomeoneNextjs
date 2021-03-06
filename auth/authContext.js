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
  
  const AuthContext = createContext({});
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadUserFromCookies() {
        const token = Cookies.get("token");
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
    const enableService = async (projectId, service) => {
      const { data: response } = await api.post(
        "console/projects/".concat(`${projectId}`).concat("/enable_service/"),
        { service }
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
    const getProjectById = async (id) => {
      const { data: response } = await api.get(
        "console/projects/".concat(`${id}`),
        {}
      );
      if (response) {
        return response;
      }
    };
  
    const getCategories = async () => {
      const { data: response } = await api.get("console/categories");
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
        const { data: token } = await api.post("api-token-auth/", { email, password });
  
        if (token) {
          Cookies.set("token", "token " + token.token, { expires: 60 });
          api.defaults.headers.Authorization = `token ${token.token}`;
          window.location.pathname = "/projects/projects";
          return token.token;
        }
      } catch (err) {
        return { token: "error"+err };
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
          user,
          login,
          loading,
          logout,
          getProjects,
          getUsageByPoints,
          addProject,
          addProjectAPIKey,
          DeleteProjectAPIKey,
          getProjectAPIKey,
          getProjectById,
          getCategories,
          getServiceById,
          serviceIsEnabled,
          enableService,
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
  