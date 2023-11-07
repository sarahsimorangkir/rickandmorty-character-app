import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import routes from "./cores/routes/routes";
import {Provider} from "./cores/context/store";
import "./plugins/plugins";
import {ApolloProvider} from "@apollo/client";
import client from "./cores/utils/apollo";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider>
            <ApolloProvider client={client}>
                <RouterProvider router={routes}/>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
