import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";


const filePath = path.join(process.cwd(), "database", "employees.json");

function readEmployeesData() {
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
}

function writeEmployeesData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  switch (method) {
    case "GET":
      // Get all employees
      const employees = readEmployeesData();
      console.log(employees);
      res.status(200).json(employees);
      break;
    case "POST":
      // Add a new employee
      const newEmployee = req.body;
      const data = readEmployeesData();
      data.push(newEmployee);
      writeEmployeesData(data);
      res.status(201).json(newEmployee);
      break;
    case "PUT":
      // Update an employee by id
      const { id } = req.query;
      const updatedEmployee = req.body;
      let employeeData = readEmployeesData();
      const index = employeeData.findIndex((emp: any) => emp.id === Number(id));
      if (index !== -1) {
        employeeData[index] = { ...employeeData[index], ...updatedEmployee };
        writeEmployeesData(employeeData);
        res.status(200).json(employeeData[index]);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
      break;
    case "DELETE":
      const deleteId = req.query.id;
      let employeesData = readEmployeesData();
      
      employeesData = employeesData.filter(
        (emp: any) => emp.id !== Number(deleteId)
      );
      writeEmployeesData(employeesData);
      res.status(200).json({ message: "Employee deleted" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
