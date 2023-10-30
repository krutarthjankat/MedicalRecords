import { Navigate } from "react-router-dom";
const Root = () => {
  console.log("in Root now");
  return <Navigate to="/login" />;
};
export default Root;
