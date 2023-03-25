import { BrowserRouter, Route, Routes } from "react-router-dom";
import CelebrateSignUp from "../pages/CelebrateSignUp";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordSendEmail from "../pages/ResetPasswordSendEmail";
import ResetPasswordSent from "../pages/ResetPasswordSent";
import ResetPasswordSucceed from "../pages/ResetPasswordSucceed";
import SelectWorkspace from "../pages/SelectWorkspace";
import Workspace from "../pages/Workspace";
import WorkspaceConfig from "../pages/WorkspaceConfig";
import Workspace2 from "../pages/Wrokspace2";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-workspace" element={<SelectWorkspace />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/workspace2/:workspaceId" element={<Workspace2 />} />
        <Route path="/workspace-config/:workspaceId" element={<WorkspaceConfig />} />
        <Route path="/celebrate-sign-up" element={<CelebrateSignUp />} />
        <Route path="/reset-password-send-email" element={<ResetPasswordSendEmail />} />
        <Route path="/reset-password-sent" element={<ResetPasswordSent />} />
        <Route path="/reset-password/:uui" element={<ResetPassword />} />
        <Route path="/reset-password-succeed" element={<ResetPasswordSucceed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
