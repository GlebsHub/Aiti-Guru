import { BrowserRouter, Route, Routes } from "react-router";

import LoginPage from "../../pages/LoginPage";

import App from "../../App";
import ProtectedRoute from "./ProtectedRoute";
import SessionBootstrap from "./SessionBootstrap";

const RouterApp = () => {
  return (
    <BrowserRouter basename="/Aiti-Guru/">
      <SessionBootstrap />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
