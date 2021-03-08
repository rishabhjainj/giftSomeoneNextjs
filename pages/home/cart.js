import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseTemplate from "./components/BaseTemplate";
import dynamic from "next/dynamic";
import useAuth from "../../auth/authContext";
import TitleFragment from "../TitleFragment";
const CartComponent = dynamic(() => import("./components/CartComponent"), {
  ssr: false,
});
// import HomeComponent from "../components/HomeComponent";

const Index = () => {
  const { getProjectById } = useAuth();
  const router = useRouter();
  const { projectId } = router.query;
  const [projectData, setProjectData] = useState({});
  const list = ["5"];

//   useEffect(() => {
//     const response = getProjectById(projectId);
//     response.then(function (value) {
//       setProjectData(value);
//     });
//   }, [getProjectById]);

  return (
    <TitleFragment title="Home">
      <BaseTemplate
        selected={list}
        projectData={projectData}
        content={<CartComponent />}
      />
    </TitleFragment>
  );
};

export default Index;
