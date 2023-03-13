import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import MyPage from "../pages/Mypage";
import Register from "../pages/Register";
import SelectWorkspace from "../pages/SelectWorkspace";
import Workspace from "../pages/Workspace";
import WorkspaceConfig from "../pages/WorkspaceConfig";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<SelectWorkspace />} />
        <Route path="/" element={<MyPage />} />
        <Route path="/" element={<Workspace />} />
        <Route path="/" element={<WorkspaceConfig />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
