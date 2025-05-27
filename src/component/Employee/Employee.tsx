import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './style3.css';
import '../Department/style2.css';
import '../Set/style4.css';
import { MdDelete } from "react-icons/md";

interface Department {
  id: number;
  code: string;
  name: string;
}

interface EmployeeData {
  id: number;
  code: string;
  name: string;
  department: any;
}

const Employee: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentId, setDepartmentId] = useState<string>('');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');

  
useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await axios.get<Department[]>('http://127.0.0.1:8000/api/departments/');
      console.log(response.data)
      setDepartments(response.data);
    } catch (error) {
      setError('Failed to fetch departments');
    }
  };

  fetchDepartments();
}, []);


  
  const fetchEmployees = async (search = ''): Promise<void> => {
    try {
      const res = await axios.get<EmployeeData[]>('http://127.0.0.1:8000/api/employees/', {
        params: search ? { search } : {},
      });
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees(searchQuery);
  }, [searchQuery]);

  const handleAddEmployee = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setEmployeeCode('');

    if (!departmentId || !employeeName.trim()) {
      setError('Please select department and enter employee name');
      return;
    }

    try {
      const res = await axios.post<{ code: string }>('http://127.0.0.1:8000/api/add-employee/', {
        department_id: departmentId,
        name: employeeName.trim(),
      });
      console.log("Response is ", res);

      setEmployeeCode(res.data.code);
      setEmployeeName('');
      setDepartmentId('');
      fetchEmployees();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add employee');
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employees/${id}/`);
      fetchEmployees(searchQuery);
    } catch {
      setError('Failed to delete employee');
    }
  };

  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    console.log("handle department ", e.target.value);
    setDepartmentId(e.target.value);
  };

  const handleEmployeeNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmployeeName(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='emp'>
      <div className="em">
        <h2 className="em-h">Add Employee</h2>
        <div className='div'>
          <form onSubmit={handleAddEmployee} className="employee-form">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                className="form-control"
                value={departmentId}
                onChange={handleDepartmentChange}
              >
                <option value="">Select Department</option>
                {departments.map((dep:any) => (
                  <option key={dep.id} value={dep.id}>
                     {dep.DepartmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                placeholder="Enter name"
                className="form-control"
                value={employeeName}
                onChange={handleEmployeeNameChange}
              />
            </div>

            <button type="submit" className="btn-submit">Add Employee</button>

            {error && <p className="error">{error}</p>}
            {employeeCode && <p>Generated Employee Code: {employeeCode}</p>}
          </form>
        </div>

        <div className='table-emp'>
          <div className='tab'>
            <div className='Search-emp'>
              <input
                type="text"
                placeholder="Search by Name or Code"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Code</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr><td colSpan={4}>No employees found.</td></tr>
                ) : (
                  employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.code}</td>
                      <td>{emp.name}</td>
                      <td>{emp.department.name}</td>
                      <td>
                        <div onClick={() => handleDelete(emp.id)}>
                          <MdDelete size={22} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
