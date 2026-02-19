import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/orders";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(API);
    setOrders(res.data);
  };

  const acceptOrder = async (id) => {
    await axios.patch(`${API}/${id}`, { status: "Accepted" });
    fetchOrders();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {orders.map(order => (
        <div key={order._id}>
          <p>
            {order.name} - {order.item} - {order.paymentMethod} - 
            <strong> {order.status}</strong>
          </p>

          {order.status === "Pending" && (
            <button onClick={() => acceptOrder(order._id)}>
              Accept
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Admin;
