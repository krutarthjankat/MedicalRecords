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
import { useUserData } from "./store/PageContext.js";

function RoutesWithAnimation() {
  const location = useLocation();
  console.log(location);
  const { userId } = useUserData();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path={`/dashboard/${userId}`}
          element={<HomePage prop={<DashBoard />} />}
        />
        <Route
          path={`/settings/${userId}`}
          element={<HomePage prop={<Settings />} />}
        />
        <Route
          path={`/myprofile/${userId}`}
          element={<HomePage prop={<MyProfile />} />}
        />
        <Route
          path={`/patients/${userId}`}
          element={<HomePage prop={<PatientList />} />}
        />
        <Route
          path={`/about/${userId}`}
          element={<HomePage prop={<About />} />}
        />
      </Routes>
    </AnimatePresence>
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

export default App;
