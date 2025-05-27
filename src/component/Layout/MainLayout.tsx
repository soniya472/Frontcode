import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import SlideBar from '../Slidebar/Slidebar';
import './layout.css'; 

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="main-layout">
        <SlideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
