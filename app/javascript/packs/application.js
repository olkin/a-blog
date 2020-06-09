import React from "react";
import { render } from "react-dom";
import App from "../components/App";

function main() {
    render(
        <App />,
        document.querySelector(".app-wrapper")
    );
}

document.addEventListener("DOMContentLoaded", main);