import React, { useState } from "react";

import ControlBar from "./components/ControlBar";
import { VIEW } from "./constant";
import { getHigherView, getLowerView, getViewComponent } from "./utils";

const initialView = VIEW.DATE;
const initialDate = new Date();

function Calendar() {
  const [currentView, setCurrentView] = useState(initialView);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleChangeView = (selectedDate) => {
    if (selectedDate) {
      setCurrentView(getLowerView);
      setSelectedDate(selectedDate);
    }
    setCurrentView(getHigherView);
  };

  const ViewComponent = getViewComponent(currentView);

  return (
    <>
      <ControlBar
        currentView={currentView}
        selectedDate={selectedDate}
        handleChangeView={handleChangeView}
      />
      <ViewComponent />
    </>
  );
}

function App() {
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      Hello React
      <Calendar />
    </div>
  );
}

export default App;
