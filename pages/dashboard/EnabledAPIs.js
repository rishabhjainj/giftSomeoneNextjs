import ReactDOM from 'react-dom'
import React from 'react'
//columns: Service name,API Enabled date,Category,Part of Project
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons';
import TitleFragment from "../TitleFragment"
import BaseTemplate from "./components/BaseTemplate"

function getDate(){
    return (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate());
}
// apienableddate,category,projectenabled(Action)
const data = [
  {
    key: '1',
    apienableddate: getDate(),
    servicename: 'FaceMask Detection',
    category: 'Face',
    //projectenabled: 'False',
  },
  {
    key: '2',
    apienableddate: getDate(),
    servicename: 'Face Recognition',
    category: 'Face',
    //projectenabled: 'True',
  },
  {
    key: '3',
    apienableddate: getDate(),
    servicename: 'Crowd Analysis',
    category: 'Body',
    //projectenabled: 'False',
  },
];


class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
  };
  handleChange = (filters) => {
    this.setState({
      filteredInfo: filters,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
    });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 15 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleProjectKeyChooser = (event) => {

    const enteredName = prompt('Enter Project Key')

    this.setState({ enteredName : enteredName })
}
  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Service Name',
        dataIndex: 'servicename',
        key: 'servicename',
        //width: '20%',
        ...this.getColumnSearchProps('servicename'),
      },
      {
        title: 'API Enable Date',
        dataIndex: 'apienableddate',
        key: 'apienableddate',
        //width: '15%',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        //width: '15%',
        filters: [
            { text: 'Face', value: 'Face' },
            { text: 'Body', value: 'Body' },
          ],
          filteredValue: filteredInfo.category || null,
          onFilter: (value, record) => record.category.includes(value),
      },
      // {
      //   title: 'Project Enabled',
      //   dataIndex: 'projectenabled',
      //   key: 'projectenabled',
      //   width: '10%',
      // },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a onClick={this.handleProjectKeyChooser}>Use in Project</a>
            <a onClick={this.handleProjectKeyChooser}>Revoke From Project</a>
          </Space>
        ),
      },
    ];
    return(
     <TitleFragment title="Enabled APIs">
        <BaseTemplate
         content={
          <Table columns={columns} dataSource={data} onChange={this.handleChange} />
         }
        />
      </TitleFragment>
    ); 
    }
}

export default App