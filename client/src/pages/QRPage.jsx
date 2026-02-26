import { QRCodeCanvas } from "qrcode.react";

function QRPage() {

  // ✅ PUBLIC RENDER URL
  const url = "https://whitestone-client.onrender.com/menu";

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>Scan To Order</h1>

      <QRCodeCanvas
        value={url}
        size={250}
      />

      <p style={{ marginTop: "20px" }}>
        {url}
      </p>

    </div>
  );
}

export default QRPage;