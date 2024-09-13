import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';


// Define the form schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email must be valid").required("Email is required"),
  department: yup.string().required("Department is required"),
  hourly_rate: yup
    .number()
    .typeError("Hourly rate must be a number")
    .positive("Hourly rate must be greater than 0")
    .required("Hourly rate is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("Password is required"),

    justification: yup.string().when("hourly_rate", (hourly_rate, schema) => {
        if(hourly_rate)
          return schema.required("the justification is required")
          return schema
      })

    // justification: yup.string().when('hourly_rate', {
    //     is: (hourly_rate: any) => hourly_rate >= 50,
    //     then: yup.string().required('Justification is required for rates above 50'),
    //     otherwise: yup.string(),
    //   }),
      
      

});

// Define form data types
interface FormData {
  name: string;
  email: string;
  department: string;
  hourly_rate: number;
  password: string;
  justification?: string;
}

const EmployeeForm: React.FC = () => {
  const [showJustification, setShowJustification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {

    try {
        const token = 'YOUR_ACCESS_TOKEN'; // Replace with a valid token
         axios.post('http://127.0.0.1:9001/api/employees', data, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        });
        alert('Employee added successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error adding employee:', error);
        alert('An error occurred while adding the employee');
      }


    console.log("Form Submitted: ", data);
  };

  // Watch hourlyRate to conditionally show/hide the justification field
  const hourly_rate = watch("hourly_rate");

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label>Name</label>
          <input {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Department Field */}
        <div>
          <label>Department</label>
          <input {...register("department")} />
          {errors.department && <p>{errors.department.message}</p>}
        </div>

        {/* Hourly Rate Field */}
        <div>
          <label>Hourly Rate</label>
          <input type="number" {...register("hourly_rate")} />
          {errors.hourly_rate && <p>{errors.hourly_rate.message}</p>}
        </div>

        {/* Justification Field (Conditionally Rendered) */}
        {hourly_rate > 50 && (
          <div>
            <label>Justification</label>
            <input {...register("justification")} />
            {errors.justification && <p>{errors.justification.message}</p>}
          </div>
        )}

        {/* Password Field */}
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
