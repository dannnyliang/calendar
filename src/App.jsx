import React from "react";

import Calendar from "./components/Calendar";

function App() {
  const handleSelect = (date) => console.log(date);

  return (
    <div>
      Hello React
      <Calendar date={new Date()} onSelect={handleSelect} />
    </div>
  );
}

export default App;
