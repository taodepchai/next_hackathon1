"use client";
import { useState, useEffect } from "react";
import EmployeeForm, { Employee } from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

export default function EmployeeManager() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const addEmployee = (employee: Employee) => {
    fetch("http://localhost:3000/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((newEmployee) => {
        setEmployees([...employees, newEmployee]);
      });
  };

  const updateEmployee = (employee: Employee) => {
    fetch(`http://localhost:3000/api/employees/?id=${employee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((updatedEmployee) => {
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setEditingEmployee(null);
      });
  };

  const deleteEmployee = (id: number) => {
    fetch(`http://localhost:3000/api/employees/?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      setEmployees(employees.filter((emp) => emp.id !== id));
    });
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleSubmit = (employee: Employee) => {
    if (editingEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      <EmployeeForm onSubmit={handleSubmit} initialData={editingEmployee} />
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={deleteEmployee}
      />
    </div>
  );
}
