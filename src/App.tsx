import React from "react";
import "./App.css";
import EmployeeForm from "./component/EmployeeForm";
import EmployeeList from "./component/EmployeeList";

function App() {
  return (
    <div className="App">
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
}
export default App;


