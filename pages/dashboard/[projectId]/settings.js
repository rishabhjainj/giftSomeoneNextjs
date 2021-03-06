import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BaseTemplate from "../components/BaseTemplate";
import SettingsComponent from "./components/SettingsComponent";
import TitleFragment from "../../TitleFragment";

import useAuth from "../../../auth/authContext";

import Apikeytablecomponent from "./Apikeytablecomponent";

const Settings = () => {
  const { getProjectById } = useAuth();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { projectId } = router.query;

  const list = ["3"];
  useEffect(() => {
    const response = getProjectById(projectId);
    response.then((value) => {
      setData(value);
      setLoading(false);
      console.log("Project data", value);
    });
  }, [getProjectById]);
  return (
    <TitleFragment title="APIKeyTable">
      <BaseTemplate
        selected={list}
        projectData={data}
        content={
          <div>
            <SettingsComponent loading={loading} projectData={data} />
          </div>
        }
      />
    </TitleFragment>
  );
};

export default Settings;
