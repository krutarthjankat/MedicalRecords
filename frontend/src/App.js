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
import {
  PageContextProvider,
  PatientDataProvider,
} from "./store/PageContext.js";
import HomePage from "./components/HomePage.js";
import MyProfile from "./components/Content/MyProfile.js";
import PatientList from "./components/Content/PatientList.js";
import DashBoard from "./components/Content/Dashboard.js";
import Settings from "./components/Content/Settings.js";
import EditProfile from "./components/Content/EditProfile.js";
import { CookiesProvider, useCookies } from "react-cookie";
import Sop from "./components/Content/Sop.js";
import Patient from "./components/Content/Patient.js";
import AddPatient from "./components/Content/AddPatient.js";
import ChangePassword from "./components/Content/ChangePassword.js";

export const baseurl = "https://medicalrecords.onrender.com";
// export const baseurl = "http://localhost:3000";

function RoutesWithAnimation() {
  const [cookie] = useCookies();
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
          <Route
            path={`/Editprofile`}
            element={<HomePage prop={<EditProfile />} />}
          />
          <Route path={`/SOPs`} element={<HomePage prop={<Sop />} />} />
          <Route
            path={`/Patients/add`}
            element={<HomePage prop={<AddPatient />} />}
          />
          <Route
            path={`/Patients/${cookie.patientid}`}
            element={<HomePage prop={<Patient />} />}
          />
          <Route
            path={`/Changepassword`}
            element={<HomePage prop={<ChangePassword />} />}
          />
        </Routes>
      </AnimatePresence>
    </CookiesProvider>
  );
}
function App() {
  return (
    <PageContextProvider>
      <PatientDataProvider>
        <BrowserRouter basename={"/MedicalRecords"}>
          <RoutesWithAnimation />
        </BrowserRouter>
      </PatientDataProvider>
    </PageContextProvider>
  );
}
//
export default App;
