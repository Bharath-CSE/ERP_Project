import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './OrdersCalendarView.css'; // Import CSS file for OrdersCalendarView

const localizer = momentLocalizer(moment);

const OrdersCalendarView = () => {
  // Mock order data
  const orders = [
    { id: 1, orderId: 'ORD001', deliveryDate: '2024-03-14T10:00:00', status: 'Pending' },
    { id: 2, orderId: 'ORD002', deliveryDate: '2024-03-15T10:00:00', status: 'Shipped' },
    { id: 3, orderId: 'ORD003', deliveryDate: '2024-03-16T10:00:00', status: 'Shipped' },
    { id: 4, orderId: 'ORD004', deliveryDate: '2024-03-17T10:00:00', status: 'Pending' }

    // More order data...
  ];

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const events = orders.map(order => ({
    id: order.id,
    title: `Order ${order.orderId}`,
    start: new Date(order.deliveryDate),
    end: moment(order.deliveryDate).add(1, 'days').toDate(),
  }));

  return (
    <div className="orders-calendar-view-container">
      <h2>Orders Calendar View</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleDateSelect}
      />
      {selectedDate && (
        <div className="selected-date-orders">
          <h3>Orders due for delivery on {moment(selectedDate).format('MMMM Do, YYYY')}:</h3>
          <ul>
            {orders
              .filter(order => moment(order.deliveryDate).isSame(selectedDate, 'day'))
              .map(order => (
                <li key={order.id}>Order {order.orderId}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrdersCalendarView;
