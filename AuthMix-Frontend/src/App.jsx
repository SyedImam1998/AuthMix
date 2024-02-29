import { Routes, Route } from "react-router-dom";
import LoginPage from "./Screen/Login/loginPage";
import Home from "./Screen/Home/Home";

import PrivateRoute from "./Hoc/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute component={Home} />} />
    </Routes>
  );
}

export default App;
