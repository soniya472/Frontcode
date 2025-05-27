// import React from "react";
//  import { ImOffice } from "react-icons/im";
//  import { FaCommentAlt } from "react-icons/fa";
//  import { MdDashboard } from "react-icons/md";
//  import { RiLockPasswordLine } from "react-icons/ri";
//  import './style.css';

//  const SlideBar: React.FC = () => {
//      return (
//          <div className='dashboard3'>
//              <a style={{ textDecoration: 'none' }} href="/dashboard">
//                 <div className="dashboard4">
//                      <MdDashboard className='ds' />
//                     <span>Dashboard</span>
//                  </div>
//              </a>
//              <a style={{ textDecoration: 'none' }} href="/department">
//                  <div className="dashboard5">
//                      <ImOffice className='department' />
//                      Add Departments
//               </div>
//              </a>
//              <a style={{ textDecoration: 'none' }} href="/employee">
//                  <div className="dashboard6">
//                      <FaCommentAlt className="Employee" />
//                      Add Employees
//                  </div>
//              </a> 
//                          <a style={{ textDecoration: 'none' }} href="/setting">
//                  <div className="dashboard7">
//                      <RiLockPasswordLine className='password' />
//                      Change Password
//                  </div>
//              </a>
//          </div>
//      );
// };

// export default SlideBar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImOffice } from "react-icons/im";
import { FaCommentAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import './style.css';

const SlideBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("dashboard");
    const navigate = useNavigate();

    const handleClick = (tab: string, route: string) => {
        setActiveTab(tab);
        navigate(route);
    };

    return (
        <div className='dashboard3'>
            <div  className={`dashboard5 ${activeTab === "dashboard" ? "clicked" : ""}`}
             onClick={() => handleClick("dashboard", "/department")}
            >
                <MdDashboard className='ds' />
                <span>Dashboard</span>
            </div>

            <div
                className={`dashboard5 ${activeTab === "department" ? "clicked" : ""}`}
                onClick={() => handleClick("department", "/department")}
            >
                <ImOffice className='department' />
                Add Departments
            </div>

            <div
                className={`dashboard6 ${activeTab === "employee" ? "clicked" : ""}`}
                onClick={() => handleClick("employee", "/employee")}
            >
                <FaCommentAlt className="Employee" />
                Add Employees
            </div>

            <div
                className={`dashboard7 ${activeTab === "setting" ? "clicked" : ""}`}
                onClick={() => handleClick("setting", "/setting")}
            >
                <RiLockPasswordLine className='password' />
                Change Password
            </div>
        </div>
    );
};

export default SlideBar;
