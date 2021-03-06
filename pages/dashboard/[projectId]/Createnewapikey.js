import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, notification, Radio } from "antd";
import Axios from "axios";
import useAuth from "../../../auth/authContext";
import { useRouter } from "next/router";

const CreateProjectAPI = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addProjectAPIKey } = useAuth();
  const router = useRouter();
  const { projectId } = router.query;

  const openNotification = (placement) => {
    notification.open({
      type: "success",
      message: "Key Created!",
      description: "You can now use this key!",
      placement,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const createNewKey = () => {
    const response = addProjectAPIKey(projectId);
    response.then((value) => {
      console.log("created key", value);
      openNotification("bottomLeft");
    });
  };

  // const AddProjectAPIKey = async(name,project) =>
  // {
  //   setIsLoading(true)
  //   const response  = await api.post("console/api-keys/",{name,project});
  //   console.log(response)
  //   setIsLoading(false)
  // }

  return (
    <div style={{ width: "100vw", float: "right" }}>
      <Button
        id="createapibutton"
        type="primary"
        onClick={() => {
          createNewKey();
        }}
        style={{
          width: 200,
          marginLeft: "20px",
          height: 50,
        }}
      >
        Create New API Key
      </Button>
    </div>
  );
};
export default CreateProjectAPI;
