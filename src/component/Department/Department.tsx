import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './style2.css';
import '../Set/style4.css'
import axios from 'axios';
import { MdDelete } from "react-icons/md";

interface DepartmentData {
  id: number;
  DepartmentName: string;
  DepartmentCode: string;
}

const Department: React.FC = () => {
  const [departmentName, setDepartmentName] = useState<string>('');
  const [departmentCode, setDepartmentCode] = useState<string>('');
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchDepartments = async (query = ''):Promise<void> => {
    try {
      const res = await axios.get<DepartmentData[]>(`http://127.0.0.1:8000/depart?search=${query}`);
      setDepartments(res.data);
    } catch (err) {
      setError('Error fetching departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchDepartments(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (departmentCode.length !== 3 || departmentCode !== departmentCode.toUpperCase()) {
      setError('Code must be uppercase and exactly 3 characters.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/depart', {
        department_name: departmentName,
        department_code: departmentCode
      });

      setDepartmentName('');
      setDepartmentCode('');
      fetchDepartments();
    } catch (err:any) {
      setError(err.response?.data?.error || 'Failed to add department');
    }
  };

  const handleDelete = async (id:number): Promise<void> => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/depart/${id}/`);
      if (response.status === 200) {
        fetchDepartments(searchTerm);
      } else {
        setError('Failed to delete department');
      }
    } catch {
      setError('Failed to delete department');
    }
  };

  return (
    <div className='dpt'>
      <div className='fm'>
        <form onSubmit={handleSubmit}>
          <h2 className='dptheading'>Department</h2>
          <div className="Department1">
            <label htmlFor="departmentName">Department Name</label>
            <input
              type="text"
              id="departmentName"
              value={departmentName}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setDepartmentName(e.target.value)}
              required
            />
          </div>
          <div className="Department2">
            <label htmlFor="departmentCode">Department Code</label>
            <input
              type="text"
              id="departmentCode"
              value={departmentCode}
              maxLength={3}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setDepartmentCode(e.target.value.toUpperCase())}
              required
            />
          </div>
          <button type="submit" className="bt">Add Department</button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      </div>

      <div className='dt'>
        <div className="data">
          <div className='Search'>
            <input
              type="text"
              placeholder="Search by Name or Code"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <table>
            <thead>
              <tr className="tr">
                <th>Department Name</th>
                <th>Department Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.DepartmentName}</td>
                  <td>{dept.DepartmentCode}</td>
                  <td>
                    <div onClick={() => handleDelete(dept.id)}>
                      <MdDelete size={22} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Department;
