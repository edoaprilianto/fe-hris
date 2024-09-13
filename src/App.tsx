// App.tsx or Router.tsx (Routing setup)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import EmployeeList from './component/EmployeeList';
import EmployeeForm from './component/EmployeeForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
