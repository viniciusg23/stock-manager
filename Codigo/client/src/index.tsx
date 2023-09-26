import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EntryPage from './pages/entry/EntryPage';
import HomePage from './pages/home/HomePage';
import CreateProductPage from './pages/manageProducts/CreateProductPage';
import CreateSupplierPage from './pages/manageSuppliers/CreateSupplierPage';
import ViewSupplierPage from './pages/manageSuppliers/ViewSupplierPage';
import ViewProductPage from './pages/manageProducts/ViewProductPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div></div>,
    children: [
      {
        path: "/",
        element: <EntryPage />
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/create-product",
        element: <CreateProductPage />
      },
      {
        path: "/view-product",
        element: <ViewProductPage />
      },
      {
        path: "/create-supplier",
        element: <CreateSupplierPage />
      },
      {
        path: "/view-supplier",
        element: <ViewSupplierPage />
      }

    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
