import {
  Skeleton,
  Switch,
  Card,
  Avatar,
  Col,
  PageHeader,
  DatePicker,
  Divider,
  Tag,
  Button,
  Statistic,
  Descriptions,
  Row,
} from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
let Charts;
let Bar;
if (process.browser) {
  Charts = require("ant-design-pro/lib/Charts");
  Bar = Charts.Bar;
}

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useState, useEffect } from "react";
import useAuth from "../../../auth/authContext";
import { useRouter } from "next/router";

const { Meta } = Card;

const dateFormat = "YYYY-MM-DD";
const monthFormat = "YYYY-MM";

const UsageCard = (props) => {
  const router = useRouter();
  const { projectId } = router.query;

  const curday = (sp) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + sp + mm + sp + dd;
  };
  const curmonth = (sp) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + sp + mm;
  };

  const [serviceData, setServiceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [serviceName, setServiceName] = useState(props.service);
  const [startdate, setstartdate] = useState(curday("-"));
  const [enddate, setenddate] = useState(curday("-"));

  const [hourlydata, sethourlydata] = useState({});
  const [dailydata, setdailydata] = useState({});

  const [imagedata, setimagedata] = useState({});
  const [videodata, setvideodata] = useState({});
  const [websocketdata, setwebsocketdata] = useState({});

  const [monthlyimagedata, setmonthlyimagedata] = useState({});
  const [monthlyvideodata, setmonthlyvideodata] = useState({});
  const [monthlywebsocketdata, setmonthlywebsocketdata] = useState({});

  const [month, setmonth] = useState(curmonth("-"));

  const { getUsageByPoints } = useAuth();

  useEffect(() => {
    const hourlyUsage = getUsageByPoints(
      startdate.concat(" 00:00:01"),
      enddate.concat(" 23:59:59"),
      "hourly",
      projectId
    );
    hourlyUsage.then(function (value) {
      setServiceData(value);
      let imageXaxis = [];
      let imageYaxis = [];
      let imagearray = value[`${props.service}`].image_grains;
      for (let i = 0; i < imagearray.length; i++) {
        imageXaxis.push(`${i + 1}`);
        imageYaxis.push(imagearray[i].stats);
      }

      let data = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: imageXaxis,
          },
        },
        series: [
          {
            name: "Image Results",
            data: imageYaxis,
          },
        ],
      };
      setimagedata(data);

      let videoXaxis = [];
      let videoYaxis = [];
      for (let i = 0; i < 24; i++) {
        videoXaxis.push(`${i + 1}`);
        let videoarray = value[`${props.service}`].video_grains;
        videoYaxis.push(videoarray[i].stats);
      }

      data = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: videoXaxis,
          },
        },
        series: [
          {
            name: "Video Results",
            data: videoYaxis,
          },
        ],
      };
      setvideodata(data);
      let usage = value[`${serviceName}`].aggregate;
      let websocketusage = usage.websocket;
      setwebsocketdata(websocketusage);
      setLoading(false);
    });

    const dailyUsage = getUsageByPoints(
      month.concat("-01 00:00:01"),
      month.concat("-30 23:59:00"),
      "daily",
      projectId
    );
    dailyUsage.then(function (value) {
      let monthlyData = [];
      let imagearray = value[`${serviceName}`].image_grains;
      for (let i = 0; i < imagearray.length; i++) {
        monthlyData.push({
          x: `${i + 1}`,
          y: imagearray[i].stats,
        });
      }
      setmonthlyimagedata(monthlyData);

      monthlyData = [];
      let videoarray = value[`${serviceName}`].video_grains;
      for (let i = 0; i < videoarray.length; i++) {
        monthlyData.push({
          x: `${i + 1}`,
          y: videoarray[i].stats,
        });
      }
      setmonthlyvideodata(monthlyData);

      let usage = value[`${serviceName}`].aggregate;
      let websocketusage = usage.websocket;
      setmonthlywebsocketdata(websocketusage);
      setLoading(false);
    });
  }, [getUsageByPoints]);

  const onDateChanged = (date, dateString) => {
    setLoading(true);
    setstartdate(dateString);
    const hourlyUsage = getUsageByPoints(
      dateString.concat(" 00:00:01"),
      dateString.concat(" 23:59:00"),
      "hourly",
      projectId
    );
    hourlyUsage.then(function (value) {
      console.log(value);
      let imageXaxis = [];
      let imageYaxis = [];
      let imagearray = value[`${serviceName}`].image_grains;
      for (let i = 0; i < imagearray.length; i++) {
        imageXaxis.push(`${i + 1}`);
        imageYaxis.push(imagearray[i].stats);
      }

      let data = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: imageXaxis,
          },
        },
        series: [
          {
            name: "Image Results",
            data: imageYaxis,
          },
        ],
      };
      setimagedata(data);

      let videoXaxis = [];
      let videoYaxis = [];
      let videoarray = value[`${serviceName}`].video_grains;
      for (let i = 0; i < videoarray.length; i++) {
        videoXaxis.push(`${i + 1}`);
        videoYaxis.push(videoarray[i].stats);
      }

      data = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: videoXaxis,
          },
        },
        series: [
          {
            name: "Video Results",
            data: videoYaxis,
          },
        ],
      };
      setvideodata(data);
      let usage = value[`${serviceName}`].aggregate;
      let websocketusage = usage.websocket;
      setwebsocketdata(websocketusage);
      setLoading(false);
    });
  };
  const onMonthChanged = (date, dateString) => {
    setLoading(true);
    setmonth(dateString);
    console.log(dateString);
    // setstartdate(dateString.concat(" 00:00:00"));
    // setenddate(dateString.concat(" 23:59:00"));
    // console.log(dateString);
    // setpoints("hourly");
    const usageData = getUsageByPoints(
      dateString.concat("-01 00:00:01"),
      dateString.concat("-30 23:59:00"),
      "daily",
      projectId
    );
    usageData.then(function (value) {
      console.log("here", value);
      let monthlyData = [];
      let imagearray = value[`${serviceName}`].image_grains;
      for (let i = 0; i < imagearray.length; i++) {
        monthlyData.push({
          x: `${i + 1}`,
          y: imagearray[i].stats,
        });
      }
      setmonthlyimagedata(monthlyData);

      monthlyData = [];
      let videoarray = value[`${serviceName}`].video_grains;
      for (let i = 0; i < imagearray.length; i++) {
        monthlyData.push({
          x: `${i + 1}`,
          y: videoarray[i].stats,
        });
      }
      setmonthlyvideodata(monthlyData);

      let usage = value[`${serviceName}`].aggregate;
      let websocketusage = usage.websocket;
      setmonthlywebsocketdata(websocketusage);
      setLoading(false);
    });
  };

  return (
    <>
      <Card
        style={{
          minHeight: "80vh",
          margin: "30px",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <Skeleton loading={loading} avatar active>
          <PageHeader
            title={
              serviceData[`${serviceName}`]
                ? serviceData[`${serviceName}`].name.concat(" Usage")
                : "service name"
            }
            tags={<Tag color="blue">Running</Tag>}
            subTitle="Hourly and Monthly Data"
          >
            <Divider />

            {/* <Row>
              <Row lg={24}>
                <Statistic
                  style={{ margin: "30px" }}
                  title="Requests This Month"
                  value="0 of 250"
                />
                <Statistic
                  style={{ margin: "30px" }}
                  title="Projected Requests"
                  value="189"
                />
                <Statistic
                  style={{ margin: "30px" }}
                  title="Requests Today"
                  value="10"
                />
              </Row>
            </Row> */}
          </PageHeader>
          <Row>
            <Col
              offset={1}
              style={{ paddingBottom: "20px", marginBottom: "30px" }}
            >
              <h2>Hourly Requests</h2>
              <DatePicker
                defaultValue={moment(startdate, dateFormat)}
                style={{ width: "auto" }}
                size="large"
                onChange={onDateChanged}
                format={dateFormat}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={7} sm={23} md={11} xs={23} offset={1}>
              <Row>
                <h3>Image Requests</h3>
              </Row>
              {imagedata.options ? (
                <Chart
                  options={imagedata.options}
                  series={imagedata.series}
                  type="line"
                  width="350"
                />
              ) : null}
            </Col>
            <Col lg={7} sm={23} xs={23} md={11} offset={1}>
              <Row>
                <h3>Video Requests</h3>
              </Row>
              {videodata.options ? (
                <Chart
                  options={videodata.options}
                  series={videodata.series}
                  type="line"
                  width="350"
                />
              ) : null}
            </Col>
            {/* <Col lg={7} sm={23} xs={23} md={7} offset={1}>
              <Row>
                <h3>Websocket Requests</h3>
              </Row>
              <Statistic
                style={{ margin: "30px" }}
                title="Requests Today"
                value={websocketdata.total_requests}
              />
              <Statistic
                style={{ margin: "30px" }}
                title="Time Today"
                value={websocketdata.total_time}
              />
            </Col> */}
          </Row>
          <Row>
            <Divider />
            <Col
              offset={1}
              style={{ paddingBottom: "20px", marginBottom: "30px" }}
            >
              <h2>Monthly Requests</h2>
              <DatePicker
                picker="month"
                onChange={onMonthChanged}
                defaultValue={moment(month, monthFormat)}
                style={{ width: "auto" }}
                size="large"
                format={monthFormat}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={7} sm={23} md={11} xs={23} offset={1}>
              <Row>
                <h3>Image Requests</h3>
              </Row>
              {process.browser && Bar ? (
                <Bar
                  line
                  height={100}
                  data={monthlyimagedata}
                  strokeWidth={8}
                />
              ) : null}
            </Col>
            <Col lg={7} sm={23} md={11} xs={23} offset={1}>
              <Row>
                <h3>Video Requests</h3>
              </Row>
              {process.browser && Bar ? (
                <Bar
                  line
                  height={100}
                  data={monthlyvideodata}
                  strokeWidth={8}
                />
              ) : null}
            </Col>
            {/* <Col lg={7} sm={23} md={7} xs={23} offset={1}>
              <Row>
                <h3>Websocket Requests</h3>
              </Row>
              <Statistic
                style={{ margin: "30px" }}
                title="Requests This Month"
                value={monthlywebsocketdata.total_requests}
              />
              <Statistic
                style={{ margin: "30px" }}
                title="Time This Month"
                value={monthlywebsocketdata.total_time}
              />
            </Col> */}
          </Row>
        </Skeleton>
      </Card>
    </>
  );
};
export default UsageCard;
