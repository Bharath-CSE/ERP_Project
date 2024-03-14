// Dashboard.js

import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './Dashboard.css'; // Import CSS file for Dashboard
import OrdersCalendarView from './Orders_Calendar_View';
import OrdersManagement from './Orders_Management';
import ProductsManagement from './Products_Management';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <DashboardSummary totalProducts={80} totalOrders={4} />
        <BrowserRouter>
            <Link to="/products" className="dashboard-button">Manage Products</Link>
            <Link to="/orders" className="dashboard-button">Manage Orders</Link>
            <Link to="/calendarView" className="dashboard-button">Calendar View</Link>
            <Routes>
                <Route path='/products' element={<ProductsManagement/>}/>
                <Route path='/orders' element={<OrdersManagement/>}/>
                <Route path='/calendarView' element={<OrdersCalendarView/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

const DashboardSummary = ({ totalProducts, totalOrders }) => {
  return (
    <div className="dashboard-summary">
      <h3>Summary</h3>
      <p>Total Number of Products: {totalProducts}</p>
      <p>Total Number of Orders: {totalOrders}</p>
    </div>
  );
}

export default Dashboard;
