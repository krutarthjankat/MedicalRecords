import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageContextProvider } from "./store/PageContext.js";
import Dashboard from "./components/Dashboard.js";
import Root from "./components/Root.js";

function RoutesWithAnimation() {
  const location = useLocation();
  console.log(location);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Root />} />
      </Routes>
    </AnimatePresence>
  );
}
function App() {
  return (
    <PageContextProvider>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <RoutesWithAnimation />
      </BrowserRouter>
    </PageContextProvider>
  );
}

export default App;
