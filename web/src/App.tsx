import { Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Panel } from './pages/Panel';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/giris" element={<Login />} />
      <Route path="/kayit" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/panel" element={<Panel />} />
      </Route>
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
