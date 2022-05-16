import classNames from "classnames";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sub1 from "./pages/Sub1";

function App() {
  return (
    <>
      <header className="p-4 flex">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            classNames("p-4", { "text-red-500": isActive })
          }
        >
          홈
        </NavLink>
        <NavLink
          to="/sub1"
          className={({ isActive }) =>
            classNames("p-4", { "text-red-500": isActive })
          }
        >
          서브1
        </NavLink>
      </header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sub1" element={<Sub1 />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
