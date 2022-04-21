import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./helper/StateProvider";
import reducer, { initialState } from "./helper/Reducer";
import {store} from "./store";

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer} store={store}  >
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
