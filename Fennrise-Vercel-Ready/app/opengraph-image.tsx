import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fennrise — intelligent digital products, voice AI and software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0b0b0b",
          color: "#f3efe5",
          padding: "68px 76px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            right: -120,
            top: 50,
            background: "transparent",
            border: "1px solid rgba(244,180,0,.16)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700 }}>
            <div style={{ width: 42, height: 42, borderRadius: 999, background: "#f4b400" }} />
            Fennrise
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 830 }}>
            <div style={{ fontSize: 82, lineHeight: .95, letterSpacing: -5, fontWeight: 650 }}>
              Software for everyday life.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", color: "#8c8981", fontSize: 19 }}>
            <span>Products and software from Fennrise</span>
            <span style={{ color: "#f4b400" }}>fennrise.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
