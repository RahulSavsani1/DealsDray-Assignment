import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeList from './pages/EmployeList';
import UserLogin from './pages/UserLogin';
import CreateEmpoye from './pages/CreateEmpoye';
import EditEmploye from './pages/EditEmploye';
import Home from './pages/Home';

function App() {
  const AppRoutes = () => {
    return(<Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path='/Home' element={<Home />} />
      <Route path="/EmployeList" element={<EmployeList />} />
      <Route path="/CreateEmploye" element={<CreateEmpoye />} />
      <Route path="/EditEmploye/:id" element={<EditEmploye />} />
    </Routes>
    );
  };
  return (
    <div className="App">
      <div className='header-container'>
        LOGO
      </div>
     <AppRoutes />
    </div>
  );
}

export default App;
