import { QRCodeCanvas } from "qrcode.react";

function QRPage() {
  const url = "http://172.22.10.68:5173"; // replace with YOUR network URL

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
