"use client";

import { log } from "console";
import { useState, useEffect } from "react";

export interface Employee {
  id: number;
  employeeName: string;
  dateOfBirth: string;
  image: string;
  email: string;
}

interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  initialData?: Employee | null;
}

export default function EmployeeForm({
  onSubmit,
  initialData,
}: EmployeeFormProps) {
  const [employee, setEmployee] = useState<Employee>({
    id:Math.floor(Math.random() * (100000000 - 1 + 1)) + 1,
    employeeName: "",
    dateOfBirth: "",
    image: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setEmployee(initialData);
    }
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call onSubmit with employee data, ID may be undefined for new entries
    onSubmit(employee);
    // Reset form fields
    setEmployee({
      id: Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1,
      employeeName: "",
      dateOfBirth: "",
      image: "",
      email: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Employee Name</label>
        <input
          type="text"
          name="employeeName"
          value={employee.employeeName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={employee.dateOfBirth}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          name="image"
          value={employee.image}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {initialData ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
}
