import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoginForm: React.FC = () => {
    const [employeeId, setEmployeeId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/log', {
                employee_id: employeeId,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate('/department');
            }
        } catch (error: any) {
            if (error.response) {
                alert(error.response.data.message || "Login failed.");
            } else {
                alert("Server not responding. Try again later."); 
            }
        }
    };

    return (
        <div className='wrapper'>
            <div className="background">
                <img src="hero.jpg" alt="photo not upload" className="img" />
                <div className="overlay"></div>
            </div>
            <div className='box'>
                <form onSubmit={handleSubmit} className='form'>
                    <h5 className="heading">Login</h5>

                    <label htmlFor="employeeId" className="txt">Employee ID</label>
                    <input
                        type="text"
                        className="input1"
                        id="employeeId"
                        value={employeeId}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmployeeId(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="txt">Password</label>
                    <input
                        type="password"
                        className="input2"
                        id="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required
                    />

                    <a href="/setting" className="txt">Forgot Password? Contact Admin Team</a>
                    <div>
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;


