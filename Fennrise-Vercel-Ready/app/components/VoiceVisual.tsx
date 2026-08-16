export default function RelayVisual() {
  const route = ["Caller", "Relay", "Sales"];

  return (
    <div
      style={{
        width: "76%",
        maxWidth: 520,
        border: "1px solid rgba(255,255,255,.11)",
        borderRadius: 20,
        background: "linear-gradient(145deg, rgba(18,18,16,.98), rgba(8,8,8,.96))",
        boxShadow: "0 32px 80px rgba(0,0,0,.48), 0 0 52px rgba(244,180,0,.07)",
        overflow: "hidden",
        transform: "perspective(1000px) rotateX(2deg) rotateY(-4deg)",
      }}
    >
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          color: "#6f6e68",
          fontSize: 8,
          letterSpacing: ".11em",
          textTransform: "uppercase",
        }}
      >
        <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#343430" }} />
        <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#343430" }} />
        <i style={{ width: 5, height: 5, borderRadius: "50%", background: "#343430" }} />
        <span style={{ marginLeft: "auto", color: "#b89a35" }}>Call intelligence</span>
      </div>

      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ color: "#f0ecdf", fontSize: 19, letterSpacing: "-.045em" }}>Fennrise Relay</div>
            <div style={{ marginTop: 5, color: "#77756f", fontSize: 8.5 }}>AI calling assistant · in development</div>
          </div>
          <div
            style={{
              padding: "7px 9px",
              borderRadius: 999,
              border: "1px solid rgba(244,180,0,.22)",
              background: "rgba(244,180,0,.06)",
              color: "#d7b642",
              fontSize: 7,
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            Live routing
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: 10,
            marginTop: 18,
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 14,
              background: "rgba(255,255,255,.018)",
              padding: 13,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(244,180,0,.1)",
                  border: "1px solid rgba(244,180,0,.18)",
                  color: "#f4b400",
                  fontSize: 12,
                  fontWeight: 650,
                }}
              >
                C
              </div>
              <div>
                <div style={{ color: "#d8d4c8", fontSize: 10 }}>Incoming customer</div>
                <div style={{ marginTop: 3, color: "#696761", fontSize: 7 }}>00:42 · connected</div>
              </div>
              <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#f4b400", boxShadow: "0 0 10px rgba(244,180,0,.65)" }} />
            </div>

            <div style={{ marginTop: 13, display: "grid", gap: 7 }}>
              <div style={{ padding: "8px 9px", borderRadius: "10px 10px 10px 3px", background: "rgba(255,255,255,.035)", color: "#98968f", fontSize: 7.5, lineHeight: 1.45 }}>
                I want to know which plan fits my business.
              </div>
              <div style={{ marginLeft: 20, padding: "8px 9px", borderRadius: "10px 10px 3px 10px", background: "rgba(244,180,0,.09)", border: "1px solid rgba(244,180,0,.12)", color: "#c9bd91", fontSize: 7.5, lineHeight: 1.45 }}>
                I can help with that. I&apos;ll ask two quick questions.
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {[
              ["Intent", "Sales inquiry"],
              ["Lead", "Qualified"],
              ["Action", "Route to sales"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 12,
                  padding: "10px 11px",
                  background: "rgba(255,255,255,.018)",
                }}
              >
                <div style={{ color: "#625f59", fontSize: 6.5, textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</div>
                <div style={{ color: value === "Qualified" ? "#e0bd45" : "#d3cec0", marginTop: 5, fontSize: 8.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 10,
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 13,
            padding: "12px 13px",
            background: "linear-gradient(90deg, rgba(244,180,0,.035), rgba(255,255,255,.012))",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", color: "#6e6c65", fontSize: 7, textTransform: "uppercase", letterSpacing: ".1em" }}>
            <span>Conversation route</span>
            <span style={{ color: "#b79b3d" }}>Active</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
            {route.map((item, index) => (
              <div key={item} style={{ display: "flex", alignItems: "center", flex: index === route.length - 1 ? "0 0 auto" : 1 }}>
                <div style={{ display: "grid", placeItems: "center", minWidth: 46 }}>
                  <div
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: index === 1 ? 8 : "50%",
                      display: "grid",
                      placeItems: "center",
                      border: index === 1 ? "1px solid rgba(244,180,0,.28)" : "1px solid rgba(255,255,255,.1)",
                      background: index === 1 ? "rgba(244,180,0,.11)" : "rgba(255,255,255,.025)",
                      color: index === 1 ? "#f4b400" : "#8e8b83",
                      fontSize: 7,
                    }}
                  >
                    {index === 0 ? "01" : index === 1 ? "R" : "02"}
                  </div>
                  <span style={{ marginTop: 5, color: "#77746d", fontSize: 6.5 }}>{item}</span>
                </div>
                {index < route.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(244,180,0,.18), rgba(244,180,0,.55), rgba(244,180,0,.18))" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
