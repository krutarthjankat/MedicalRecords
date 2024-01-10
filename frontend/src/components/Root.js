import { useNavigate } from "react-router-dom";
function Root() {
  const navigate1 = useNavigate();
  setInterval(()=>{navigate1("/login");},10); 
};
export default Root;
