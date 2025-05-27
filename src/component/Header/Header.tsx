import React, { useState, useRef, useEffect } from "react";
import { RiAdminFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

import './style1.css';

const Header: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
        await axios.get("http://127.0.0.1:8000/logout", {
            headers: {
                Authorization: token
            }
        });
        localStorage.removeItem("token");
        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed", error);
        localStorage.removeItem("token"); // Still force logout if server fails
        window.location.href = "/";
    }
};   const handleSetting = () => {
        window.location.href = '/setting';
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='dashboard2'>
            <div className='dsh1'>
                <RiAdminFill className="logo" />
                <div className="profile-container" ref={dropdownRef}>
                    <FaUserCircle className="profile-icon" onClick={handleToggleDropdown} />
                    {showDropdown && (
                        <div className="dropdown">
                            <button className="profile-btn" onClick={handleSetting}>Setting</button>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <div className='setting'></div>
        </div>
    );
};

export default Header;
