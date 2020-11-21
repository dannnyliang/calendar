import { format } from "date-fns";
import React, { useState } from "react";

import ControlBar from "./components/ControlBar";
import DateView from "./components/DateView";
import MonthView from "./components/MonthView";
import YearView from "./components/YearView";
import { VIEW } from "./constant";
import { getHigherView, getLowerView } from "./utils";

const initialView = VIEW.DATE;
const initialDate = new Date();

function Calendar() {
  const [currentView, setCurrentView] = useState(initialView);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleSelectDate = (selectedDate) => setSelectedDate(selectedDate);

  const handleChangeView = (selectedDate) => {
    if (selectedDate) {
      setCurrentView(getLowerView);
      setSelectedDate(selectedDate);
    } else {
      setCurrentView(getHigherView);
    }
  };

  return (
    <>
      <div>{format(selectedDate, "yyyy-MM-dd")}</div>
      <ControlBar
        currentView={currentView}
        selectedDate={selectedDate}
        handleChangeView={handleChangeView}
      />
      {currentView === VIEW.DATE && (
        <DateView
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
        />
      )}
      {currentView === VIEW.MONTH && (
        <MonthView
          selectedDate={selectedDate}
          handleChangeView={handleChangeView}
        />
      )}
      {currentView === VIEW.YEAR && (
        <YearView
          selectedDate={selectedDate}
          handleChangeView={handleChangeView}
        />
      )}
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
