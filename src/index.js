import React from "react";
import ReactDOM from "react-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import App from "./App";
require("dotenv").config();

ReactDOM.render(<App />, document.getElementById("root"));
