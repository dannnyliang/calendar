import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "./components/Calendar";
import DatePicker from "./components/DatePicker";

function App() {
  const [date, setDate] = useState(null);
  const handleSelect = (date) => setDate(date);

  return (
    <Wrapper>
      <h1>DatePicker</h1>
      <DatePicker />

      <hr />

      <h1>Calendar</h1>
      <StyledCalendar date={date} onSelect={handleSelect} />
    </Wrapper>
  );
}

const StyledCalendar = styled(Calendar)`
  margin: 0 auto;
`;
const Wrapper = styled.div`
  text-align: center;
`;

export default App;
