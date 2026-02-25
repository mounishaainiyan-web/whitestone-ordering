import { QRCodeCanvas } from "qrcode.react";

function QRPage() {
  const url = "https://whitestone-ordering.onrender.com/";

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Scan To Order</h1>

      <div style={{ marginTop: "30px" }}>
        <QRCodeCanvas
          value={url}
          size={250}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
          includeMargin={true}
        />
      </div>

      <p style={{ marginTop: "20px", fontSize: "16px" }}>
        {url}
      </p>
    </div>
  );
}

export default QRPage;