import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

function App() {
  const Login = lazy(() => import("./pages/login/Login"));
  const Users = lazy(() => import("./pages/users/Users"));
  const UserDetails = lazy(() => import("./pages/user-details/UserDetails"));

  return (
    <Router>
      <Suspense
        fallback={
          <div className="app-loader">
            <MoonLoader size={25} color="#0715ae" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
