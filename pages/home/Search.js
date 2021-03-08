import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useAuth from "../../auth/authContext";
import BaseTemplate from "./components/BaseTemplate";
import TitleFragment from "../TitleFragment";

import Apikeytablecomponent from "./Apikeytablecomponent";

const Credentials = () => {
  const { getProjectById } = useAuth();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { projectId } = router.query;

  const list = ["2"];
  useEffect(() => {
    const response = getProjectById(projectId);
    response.then((value) => {
      setData(value);
      setLoading(false);
      console.log("Project data", value);
    });
  }, [getProjectById]);
  return (
    <TitleFragment title="Search">
      <BaseTemplate
        selected={list}
        projectData={data}
        content={
          <div>
            
          </div>
        }
      />
    </TitleFragment>
  );
};

export default Credentials;
