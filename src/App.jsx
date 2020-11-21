import React from "react";

import StyledControlBar from "./components/ControlBar";
import DateView from "./components/DateView";
import MonthView from "./components/MonthView";
import YearView from "./components/YearView";

function Calendar() {
  return <DateView />;
  // return <MonthView />;
  // return <YearView />;
}

function App() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      Hello React
      <StyledControlBar />
      <Calendar />
    </div>
  );
}

export default App;
