import { AppBar, Toolbar } from "@mui/material";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { NoticeSnackbar } from "./components/NoticeSnackbar";
import Edit from "./pages/Edit";
import Main from "./pages/Main";
import Write from "./pages/Write";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <NavLink
            to="/main"
            className="font-bold select-none self-stretch flex items-center mr-auto"
          >
            HAPPY NOTE
          </NavLink>

          {location.pathname == "/main" && (
            <NavLink
              className="select-none self-stretch flex items-center"
              to="/write"
            >
              할일추가
            </NavLink>
          )}
          {location.pathname != "/main" && (
            <span
              className="select-none cursor-pointer self-stretch flex items-center"
              onClick={() => navigate(-1)}
            >
              다음에 할래요.
            </span>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
