import { useState, useEffect } from "react";
import axios from "axios";
import menu from "../data/menu";

const API = "https://whitestone-backend.onrender.com/api/orders";
function Customer() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [orderStatus, setOrderStatus] = useState("");

  const getItemPrice = (item) => {
    if (typeof item.price === "object") {
      return item.price.single; // default use single price
    }
    return item.price;
  };

  const addToCart = (item) => {
    const exist = cart.find(i => i.name === item.name);

    if (exist) {
      setCart(cart.map(i =>
        i.name === item.name
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQty = (name) => {
    setCart(cart.map(item =>
      item.name === name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (name) => {
    setCart(
      cart
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const getTotal = () =>
    cart.reduce((total, item) =>
      total + getItemPrice(item) * item.quantity, 0
    );

  const placeOrder = async () => {
    try {
      if (!tableNumber) {
        alert("Enter Table Number");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      const res = await axios.post(API, {
        tableNumber,
        items: cart,
        totalAmount: getTotal(),
        paymentMethod,
        status: "Pending"
      });

      setOrderStatus(res.data.status || "Pending");

      alert("Order placed successfully!");

      setCart([]);
      setShowCart(false);

    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!tableNumber) return;

        const res = await axios.get(API);

        const latestOrder = res.data
          .filter(o => o.tableNumber === tableNumber)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        if (latestOrder) {
          setOrderStatus(latestOrder.status);
        }

      } catch (error) {
        console.error("Status check error:", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [tableNumber]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Whitestone Creamery</h1>

      {menu.map(category => (
        <div key={category.category}>
          <h2 style={styles.category}>{category.category}</h2>

          {category.items.map(item => {
            const cartItem = cart.find(i => i.name === item.name);

            return (
              <div key={item.name} style={styles.menuItem}>
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>

                  {typeof item.price === "object" ? (
                    <div>
                      <p style={{ margin: 0 }}>Single: ₹ {item.price.single}</p>
                      <p style={{ margin: 0 }}>Double: ₹ {item.price.double}</p>
                      <p style={{ margin: 0 }}>Family: ₹ {item.price.family}</p>
                    </div>
                  ) : (
                    <p style={{ margin: 0 }}>₹ {item.price}</p>
                  )}

                </div>

                {!cartItem ? (
                  <button
                    onClick={() => addToCart(item)}
                    style={styles.addBtn}
                  >
                    ADD
                  </button>
                ) : (
                  <div style={styles.qtyBox}>
                    <button onClick={() => decreaseQty(item.name)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => increaseQty(item.name)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {cart.length > 0 && (
        <div
          style={styles.viewCartBar}
          onClick={() => setShowCart(true)}
        >
          <span>{cart.length} items</span>
          <span>View Cart • ₹ {getTotal()}</span>
        </div>
      )}

      {showCart && (
        <div style={styles.overlay}>
          <div style={styles.cartBox}>
            <h2>Your Cart</h2>

            {cart.map(item => (
              <div key={item.name} style={styles.cartItem}>
                <span>{item.name}</span>

                <div style={styles.qtyBox}>
                  <button onClick={() => decreaseQty(item.name)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.name)}>+</button>
                </div>

                <span>₹ {getItemPrice(item) * item.quantity}</span>
              </div>
            ))}

            <hr />

            <h3>Total: ₹ {getTotal()}</h3>

            <input
              type="text"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              style={styles.input}
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.input}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>

            <button onClick={placeOrder} style={styles.placeBtn}>
              Place Order
            </button>

            <button
              onClick={() => setShowCart(false)}
              style={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {orderStatus && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background:
            orderStatus === "Accepted" ? "green" : "orange",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px"
        }}>
          Order Status: {orderStatus}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial" },
  title: { textAlign: "center", marginBottom: "20px" },
  category: { marginTop: "30px", borderBottom: "1px solid #ddd" },
  menuItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" },
  addBtn: { backgroundColor: "green", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer" },
  qtyBox: { display: "flex", alignItems: "center", gap: "8px" },
  viewCartBar: { position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#111", color: "white", padding: "14px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", width: "90%", maxWidth: "500px", cursor: "pointer" },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  cartBox: { backgroundColor: "white", width: "90%", maxWidth: "500px", padding: "20px", borderRadius: "10px" },
  cartItem: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  input: { width: "100%", padding: "10px", marginTop: "10px", borderRadius: "6px", border: "1px solid #ccc" },
  placeBtn: { width: "100%", padding: "12px", backgroundColor: "black", color: "white", border: "none", borderRadius: "8px", marginTop: "10px", cursor: "pointer" },
  closeBtn: { width: "100%", padding: "10px", backgroundColor: "#ddd", border: "none", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }
};

export default Customer;