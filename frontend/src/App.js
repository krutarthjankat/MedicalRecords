import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import {
  Route,
  Routes,
  useLocation,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageContextProvider, UserDataProvider } from "./store/PageContext.js";
import HomePage from "./components/HomePage.js";
import MyProfile from "./components/Content/MyProfile.js";
import PatientList from "./components/Content/PatientList.js";
import About from "./components/Content/About.js";
import DashBoard from "./components/Content/Dashboard.js";
import Settings from "./components/Content/Settings.js";
import EditProfile from "./components/Content/EditProfile.js";
import { CookiesProvider } from "react-cookie";

export const baseurl = "https://medicalrecords.onrender.com";
// export const baseurl = "http://localhost:3000";

function RoutesWithAnimation() {
  const location = useLocation();
  console.log(location);
  return (
    <CookiesProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path={`/Dashboard`}
            element={<HomePage prop={<DashBoard />} />}
          />
          <Route
            path={`/Settings`}
            element={<HomePage prop={<Settings />} />}
          />
          <Route
            path={`/Myprofile`}
            element={<HomePage prop={<MyProfile />} />}
          />
          <Route
            path={`/Patients`}
            element={<HomePage prop={<PatientList />} />}
          />
          <Route path={`/About`} element={<HomePage prop={<About />} />} />
          <Route
            path={`/Editprofile`}
            element={<HomePage prop={<EditProfile />} />}
          />
        </Routes>
      </AnimatePresence>
    </CookiesProvider>
  );
}
function App() {
  return (
    <PageContextProvider>
      <UserDataProvider>
        <BrowserRouter basename={"/MedicalRecords"}>
          <RoutesWithAnimation />
        </BrowserRouter>
      </UserDataProvider>
    </PageContextProvider>
  );
}
//  
export default App;
