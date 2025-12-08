import { useState } from "react";

function App() {
  const [showCategory1, setShowCategory1] = useState(true);
  const [showCategory2, setShowCategory2] = useState(true);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          overflowY: "auto" // scroll if content is too long
        }}
      >
        <h2 style={{ marginTop: 0 }}>Filtri</h2>

        {/*Operater*/}
        <div>
          <button
            style={{
              width: "100%",
              padding: "8px",
              background: "#e0e0e0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "left"
            }}
            onClick={() => setShowCategory1(!showCategory1)}
          >
            Operater {showCategory1 ? "▲" : "▼"}
          </button>
          {showCategory1 && (
            <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
              <label><input type="checkbox" /> A1</label><br />
              <label><input type="checkbox" /> T2</label><br />
              <label><input type="checkbox" /> Telemach</label><br />
              <label><input type="checkbox" /> Telekom Slovenije</label>
            </div>
          )}
        </div>

        {/*Tehnologija*/}
        <div>
          <button
            style={{
              width: "100%",
              padding: "8px",
              background: "#e0e0e0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "left"
            }}
            onClick={() => setShowCategory2(!showCategory2)}
          >
            Tehnologija {showCategory2 ? "▲" : "▼"}
          </button>
          {showCategory2 && (
            <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
              <label><input type="checkbox" /> 5G</label><br />
              <label><input type="checkbox" /> 4G</label><br />
              <label><input type="checkbox" /> 3G</label><br />
              <label><input type="checkbox" /> 2G</label>
            </div>
          )}
        </div>




                {/*Obdobje */}
        <div>
          <button
            style={{
              width: "100%",
              padding: "8px",
              background: "#e0e0e0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "left"
            }}
            onClick={() => setShowCategory2(!showCategory2)}
          >
            Obdobje {showCategory2 ? "▲" : "▼"}
          </button>
          {showCategory2 && (
            <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
              <label><input type="checkbox" /> 2025</label><br />
              <label><input type="checkbox" /> 2024</label><br />
              <label><input type="checkbox" /> 2023</label><br />
              <label><input type="checkbox" /> 2022</label><br />
              <label><input type="checkbox" /> 2021</label><br />
              <label><input type="checkbox" /> 2020</label><br />
              <label><input type="checkbox" /> 2019</label><br />
              <label><input type="checkbox" /> 2018</label><br />
            </div>
          )}
        </div>

        {/* Add more categories as needed */}
      </div>

      {/* Map area */}
      <div
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#e5e5e5",
    paddingTop: "100px"   // <-- add some space at the top
  }}
      >
        <h1 style={{ position: "absolute", top: "20px", left: "20px" }}>
          Zemljevid Pokritja 5G in 4G Signalov
        </h1>

        <img
          src="/slovenia.svg"
          alt="Slovenia Map"
          style={{ width: "70%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default App;
