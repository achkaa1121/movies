import { Navigate, Outlet } from "react-router-dom";

export const AuthProvderEffect = () => {
  const user = true;

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={"admin/login"} />;
};
