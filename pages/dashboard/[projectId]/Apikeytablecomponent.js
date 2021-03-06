import useAuth from "../../../auth/authContext";
import { Table, Button, Row, Col } from "antd";
import { render } from "react-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import TitleFragment from "../../TitleFragment";
import BaseTemplate from "../components/BaseTemplate";
import APIKeyTable from "./components/Apikeytable";
import { useRouter } from "next/router";

const apiURL = `http://localhost:9000/`;
const api = Axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: "token a924880f4e36331b97d23e9111ff896fe0e5c9c9",
  },
});

function Apikeytablecomponent() {
  const [status, setStatus] = useState(0);
  const { getProjectById } = useAuth();

  const [dataSource, setDataSource] = useState([]);
  const [list, setlist] = useState([
    { name: "nameN/A", key: "keyN/A", project: 0 },
  ]);
  const { getProjectAPIKey } = useAuth();
  const router = useRouter();
  const { projectId } = router.query;

  // useEffect(() => {
  //   updateApiKeys();
  // }, []);

  // const updateApiKeys = () => {
  //   const projectData = getProjectById(projectId);
  //   projectData.then((value) => {
  //     setDataSource(value);
  //   });
  // };

  return (
    <TitleFragment title="APIKeyTable">
      <BaseTemplate
        content={
          <div>
            <APIKeyTable />
          </div>
        }
      />
    </TitleFragment>
  );
}

export default Apikeytablecomponent;
