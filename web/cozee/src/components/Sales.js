import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card } from "antd";

const dataLine = [
  {
    name: "January",
    uv: 500,
    pv: 241,
    amt: 240
  },
  {
    name: "February",
    uv: 300,
    pv: 139,
    amt: 221
  },
  {
    name: "March",
    uv: 200,
    pv: 780,
    amt: 229
  },
  {
    name: "April",
    uv: 278,
    pv: 390,
    amt: 200
  },
  {
    name: "July",
    uv: 189,
    pv: 480,
    amt: 218
  },
  {
    name: "August",
    uv: 239,
    pv: 380,
    amt: 250
  },
  {
    name: "September",
    uv: 349,
    pv: 430,
    amt: 210
  },
  {
    name: "October",
    uv: 110,
    pv: 230,
    amt: 210
  }
];

const dataPie = [
  { name: "IDEA", value: 30 },
  { name: "Homeshopie", value: 20 },
  { name: "FurnitureCosmos", value: 11 },
  { name: "ChairCharm", value: 19 },
  { name: "LampIt", value: 5 },
  { name: "BeautifulHouse", value: 15 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class Sales extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";

  render() {
    return (
      <div>
        <Card style={{ width: 750, paddingRight: 400 }}>
          <LineChart
            width={700}
            height={300}
            data={dataLine}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </Card>
      </div>
    );
  }
}
