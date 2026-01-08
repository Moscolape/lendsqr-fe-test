import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";


function App() {
  const Login = lazy(() => import("./pages/login/login"));
  const Users = lazy(() => import("./pages/users/users"));

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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
