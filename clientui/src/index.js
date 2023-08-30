import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"

import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ConfigProvider } from 'antd';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Provider store={store}>
    <ConfigProvider 
        theme={{
            components: {
                Button : {
                  colorPrimary: "#9B1111",
                  colorPrimaryHover: "#A53434",
                  borderRaduis: '2px',
                }
            },
            token: {
                borderRadius: "2px",
                colorPrimary: "crimson",
            }
        }}>
  
    <App />
    </ConfigProvider>
    </Provider>
    </BrowserRouter>
    </React.StrictMode>
    
);

