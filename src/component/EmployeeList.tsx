import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

import { useNavigate } from 'react-router-dom';



// Define types for employee and form data
interface Employee {
  id: number;
  name: string;
  email: string;
  hourly_rate: string;
  department: string;
}


const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();



  // Fetch employees once on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:9001/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          'http://127.0.0.1:9001/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
  };

 

   // Filter employees based on search query
   const filteredEmployees = employees.filter((employee) =>
   employee.name.toLowerCase().includes(search.toLowerCase())
 );
  

  return (  
    <div>
      <EmployeeForm />
      <h2>Employee List</h2>
           <table
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Hourly Rate</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.hourly_rate}</td>

                  </>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout user
      </button>
    </div>
  );
};

export default EmployeeList;
