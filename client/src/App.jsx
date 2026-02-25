import { BrowserRouter, Routes, Route } from "react-router-dom";

import Customer from "./pages/temp";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import QRPage from "./pages/QRPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;