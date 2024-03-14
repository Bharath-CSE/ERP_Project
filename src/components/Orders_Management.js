import React, { useState } from 'react';
import './OrdersManagement.css'; // Import CSS file for OrdersManagement

const OrdersManagement = () => {
  // Mock order data
  const [orders, setOrders] = useState([
    { id: 1, orderId: 'ORD001', customerName: 'Customer 1', orderDate: '2024-03-14', status: 'Pending' },
    { id: 2, orderId: 'ORD002', customerName: 'Customer 2', orderDate: '2024-03-13', status: 'Shipped' },
    { id: 3, orderId: 'ORD003', customerName: 'Customer 3', orderDate: '2024-03-12', status: 'Shipped' },
    { id: 4, orderId: 'ORD004', customerName: 'Customer 4', orderDate: '2024-03-11', status: 'Pending' }
    // More order data...
  ]);

  const handleViewDetails = (orderId) => {
    // Find the order by orderId
    const order = orders.find(order => order.orderId === orderId);
    // Implement logic to view order details, you can use an alert for demonstration
    alert(`Viewing details for order with ID: ${orderId}\nCustomer Name: ${order.customerName}\nOrder Date: ${order.orderDate}\nStatus: ${order.status}`);
  };

  const handleUpdateStatus = (orderId) => {
    // Find the order by orderId
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    // Prompt the user to enter the new status
    const newStatus = prompt(`Enter new status for order with ID ${orderId}:`, orders[orderIndex].status);
    if (newStatus !== null) {
      // Update the order status
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = { ...updatedOrders[orderIndex], status: newStatus };
      setOrders(updatedOrders);
    }
  };

  const handleDeleteOrder = (orderId) => {
    // Filter out the order with the given orderId
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <div className="orders-management-container">
      <h2>Orders Management</h2>
      <OrderList orders={orders} onViewDetails={handleViewDetails} onUpdateStatus={handleUpdateStatus} onDeleteOrder={handleDeleteOrder} />
    </div>
  );
}

const OrderList = ({ orders, onViewDetails, onUpdateStatus, onDeleteOrder }) => {
  return (
    <div className="order-list">
      <h3>Orders List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>
                <button className="view-details-button" onClick={() => onViewDetails(order.orderId)}>View Details</button>
                <button className="update-status-button" onClick={() => onUpdateStatus(order.orderId)}>Update Status</button>
                <button className="delete-button" onClick={() => onDeleteOrder(order.orderId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersManagement;
