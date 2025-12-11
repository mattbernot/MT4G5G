import { useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

function App() {
  const [showCategory1, setShowCategory1] = useState(true);
  const [showCategory2, setShowCategory2] = useState(true);
  const [showCategory3, setShowCategory3] = useState(true);

const obdobja = ['2025_Q1','2024_Q4','2024_Q1','2023_Q2','2023_Q1','2022_Q3','2021_Q2','2020_Q2','2019_Q3','2019_Q1','2018_Q1',];
const marks = obdobja.map((label, index) => ({
  value: index,
  label,
}));

function valuetext(val) {
    return `${val}`;
  }

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
            onClick={() => setShowCategory3(!showCategory3)}
          >
            Obdobje {showCategory3? "▲" : "▼"}
          </button>
          {showCategory3 && (
            <div style={{ paddingLeft: "10px", marginTop: "5px" }}>


          <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => obdobja[v]}
        aria-label="Obdobja"
        defaultValue={0}
        min={0}
        max={obdobja.length - 1}
        step={1}
        marks={marks}
        sx={{
          width: 240,
          marginTop: "10px",
          "& .MuiSlider-thumb": {
            width: 18,
            height: 18,
            backgroundColor: "#1976d2",
          },
          "& .MuiSlider-markLabel": {
            fontSize: "0.5rem",
            transform: "rotate(-20deg)",
            marginLeft: -2,
            whiteSpace: "normal",
          }
        }}
      />
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
