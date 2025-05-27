import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './style4.css';

const Setting: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/change-password/', {
                current_password: currentPassword,
                new_password: newPassword,
            });

            if (response.status === 200) {
                setMessage('Password changed successfully');
                setCurrentPassword('');
                setNewPassword('');
            }
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Failed to change password');
            } else {
                setError('Error: ' + err.message);
            }
        }
    };

    return (
        <div className='setting'>
            <div className='set'>
                <h2 className='h1'>Setting</h2>
                <div className='s1'>
                    <form className='cp' onSubmit={handleChangePassword}>
                        <div className="input-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='btn-submit' >Change Password</button>
                    </form>

                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Setting;
