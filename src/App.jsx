import React from "react";

import Calendar from "./components/Calendar";

function App() {
  const handleSelect = (date) => console.log(date);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      Hello React
      <Calendar date={new Date()} onSelect={handleSelect} />
    </div>
  );
}

export default App;
