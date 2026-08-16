export default function VoiceVisual() {
  const bars = [18, 34, 52, 28, 64, 44, 72, 36, 58, 30, 48, 24, 40];

  return (
    <div
      style={{
        width: "82%",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 18,
        background: "linear-gradient(145deg, rgba(20,20,18,.96), rgba(10,10,9,.92))",
        boxShadow: "0 28px 70px rgba(0,0,0,.45), 0 0 45px rgba(244,180,0,.08)",
        overflow: "hidden",
        transform: "perspective(900px) rotateX(2deg) rotateY(-4deg)",
      }}
    >
      <div
        style={{
          height: 38,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 13px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          color: "#77766f",
          fontSize: 8,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#3c3c39" }} />
        <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#3c3c39" }} />
        <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#3c3c39" }} />
        <span style={{ marginLeft: "auto" }}>Live call</span>
      </div>

      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
          <div>
            <div style={{ color: "#ece8dc", fontSize: 18, letterSpacing: "-.04em" }}>Fennrise Voice</div>
            <div style={{ marginTop: 5, color: "#77756e", fontSize: 9 }}>AI calling assistant · in development</div>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              color: "#15130e",
              background: "#f4b400",
              boxShadow: "0 0 24px rgba(244,180,0,.3)",
              fontSize: 17,
            }}
          >
            ☎
          </div>
        </div>

        <div
          style={{
            height: 76,
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 13,
            background: "rgba(255,255,255,.018)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at center, rgba(244,180,0,.11), transparent 64%)",
            }}
          />
          {bars.map((height, index) => (
            <span
              key={index}
              style={{
                width: 4,
                height,
                borderRadius: 99,
                background: index % 3 === 0 ? "#f4b400" : "rgba(244,180,0,.42)",
                boxShadow: index % 3 === 0 ? "0 0 9px rgba(244,180,0,.32)" : "none",
                position: "relative",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15, fontSize: 8, color: "#85847e" }}>
          <span>Understanding caller</span>
          <b style={{ color: "#f4b400", fontWeight: 550 }}>LIVE</b>
        </div>

        <div style={{ marginTop: 8, height: 3, borderRadius: 4, background: "#242420", overflow: "hidden" }}>
          <div style={{ width: "82%", height: "100%", background: "#f4b400", boxShadow: "0 0 9px rgba(244,180,0,.45)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
          {[
            ["Lead captured", "Ready"],
            ["Call summary", "Auto"],
            ["Intent detected", "Sales"],
            ["Follow-up", "Queued"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: 10,
                padding: "10px 11px",
                background: "rgba(255,255,255,.018)",
              }}
            >
              <div style={{ color: "#6f6d66", fontSize: 7, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
              <div style={{ color: "#d8d3c5", marginTop: 5, fontSize: 9 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
