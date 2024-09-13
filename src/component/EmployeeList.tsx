import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import axios from "axios";

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


  // Fetch employees once on component mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:9001/api/employees")
      .then((response) => setEmployees(response.data.data))
      .catch((error) => console.error(error));
  }, []);

 

   // Filter employees based on search query
   const filteredEmployees = employees.filter((employee) =>
   employee.name.toLowerCase().includes(search.toLowerCase())
 );


  return (
    <div>
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
            <th>Position</th>
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
                    <td>{employee.hourly_rate}</td>
                    <td>{employee.department}</td>
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
    </div>
  );
};

export default EmployeeList;
