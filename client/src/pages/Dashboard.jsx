import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/orders";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const previousOrderCount = useRef(0);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API);

      // 🔔 If new order arrives → play sound
      if (res.data.length > previousOrderCount.current) {
        playNotification();
      }

      previousOrderCount.current = res.data.length;
      setOrders(res.data);

    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const playNotification = () => {
    const audio = new Audio(
      "https://www.soundjay.com/buttons/sounds/button-3.mp3"
    );
    audio.play();
  };

  const acceptOrder = async (id) => {
    await axios.patch(`${API}/${id}`, {
      status: "Accepted"
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "8px",
              backgroundColor:
                order.status === "Pending"
                  ? "#fff8e1"
                  : "#e8f5e9"
            }}
          >
            <h3>Table: {order.tableNumber}</h3>

            {order.items.map(item => (
              <p key={item.name}>
                {item.name} x {item.quantity}
              </p>
            ))}

            <h4>Total: ₹ {order.totalAmount}</h4>

            <p>
              Status:{" "}
              <b
                style={{
                  color:
                    order.status === "Accepted"
                      ? "green"
                      : "orange"
                }}
              >
                {order.status}
              </b>
            </p>

            {order.status === "Pending" && (
              <button
                onClick={() => acceptOrder(order._id)}
                style={{
                  background: "green",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Accept Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
