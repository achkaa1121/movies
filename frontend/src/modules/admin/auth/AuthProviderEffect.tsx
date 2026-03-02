import { Outlet } from "react-router-dom";

export const AuthProvderEffect = () => {
  const user = false;

  if (user) {
    return <Outlet />;
  }

  return <div>login</div>;
};
