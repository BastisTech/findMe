import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Homepage from './Homepage';
import SuchePage from './SuchePage';
import ImpressumPage from './ImpressumPage';
import SignInPage from './SignInPage';
import { LoadingProvider } from "./components/Loadingcomponent";

//Admin
import FindMEForm from './admin/FindMEForm';
import AdminPage from './admin/AdminPage';
import ServicePage from './admin/ServicePage';

//Error
import NotFoundPage from './error/NotFoundPage';
import UnauthorizedPage from './error/UnauthorizedPage';


function RequireRole({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !roles.includes(user.role)) {
    return <UnauthorizedPage />;
  }
  return children;
}

function AppRoutes() {
  const location = useLocation();
  
 return(
  <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Homepage />} key="home" />
      <Route path="/suche" element={<SuchePage />} />
      <Route
        path="/formular"
        element={
          <RequireRole roles={["Admin", "Verwalter"]}>
            <FindMEForm />
          </RequireRole>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireRole roles={["Admin"]}>
            <AdminPage />
          </RequireRole>
        }
      />
      <Route
        path="/service"
        element={
          <RequireRole roles={["Admin", "Verwalter"]}>
            <ServicePage />
          </RequireRole>
        }
      />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <LoadingProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LoadingProvider>
  );
}

export default App;
