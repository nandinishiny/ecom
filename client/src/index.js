import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import { AppRouter } from './App.js';
import {Provider} from 'react-redux';
import store from './redux/store';

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
    <Provider store={store}>
    <RouterProvider router={AppRouter}/>
    </Provider>
);