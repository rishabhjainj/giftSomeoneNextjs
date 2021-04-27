import {
  Table,
  Icon,
  Space,
  Button,
  Row,
  Col,
  Tag,
  Popconfirm,
  Form,
  notification,
  Input,
} from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState, useRef } from "react";

import useAuth from "../../../auth/authContext";
import BaseTemplate from "../../components/BaseTemplate";
import CopyOutlined from "@ant-design/icons";
// import Copytoclipboard from './Copytoclipboard'
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/router";
import styles from "./Apikeytable.module.css";
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={styles.editableCell}
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const APIKeyTable = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const {
    getProjectById,
    addProjectAPIKey,
    deleteApiKey,
    updateApiKeyName,
  } = useAuth();
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    updateApiKeys();
  }, []);

  const handleSave = (row) => {
    const newData = dataSource;
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    updateApiKeyName(newData[index].id, newData[index].name);
    console.log(newData[index].id, newData[index].name);
    setDataSource([...newData]);
  };

  const updateApiKeys = () => {
    const projectData = getProjectById(projectId);
    projectData.then((value) => {
      setDataSource(value.api_keys);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Space size="middle">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
  const handleDelete = (key) => {
    const response = deleteApiKey(key);
    response.then((value) => {
      updateApiKeys();
    });
    // const data = dataSource.filter((item) => item.id !== key);
    // setDataSource(data);
  };

  const openNotification = (placement) => {
    notification.open({
      type: "success",
      message: "Key Created Successfully!",
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
      updateApiKeys();
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const editableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <Row>
      <Row style={{ width: "100vw" }}>
        <Button
          icon={<FolderAddOutlined />}
          type="primary"
          onClick={() => {
            createNewKey();
          }}
          style={{
            width: 200,
            position: "absolute",
            right: 0,
            float: "right",
            marginRight: "40px",
            height: 50,
          }}
        >
          Create New API Key
        </Button>
      </Row>
      <Row style={{ width: "100vw" }}>
        <Col lg={24} md={24} style={{ marginTop: "70px" }}>
          <Table
            components={components}
            rowClassName={() => {
              styles.editableRow;
            }}
            dataSource={dataSource}
            columns={editableColumns}
          ></Table>
        </Col>
      </Row>
    </Row>
  );
};
export default APIKeyTable;
// // function onCopytoclipboard() {
// //     return ( < Copytoclipboard / > )
// // }
