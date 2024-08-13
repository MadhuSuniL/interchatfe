import React from 'react';
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import './App.css'
import Buffer from './Components/buffer/Buffer'
import router from './Router';

const App = () => {

  return (
    <Suspense fallback={<Buffer />}>
        <RouterProvider router={router} />
    </Suspense>
);
};

export default App;
