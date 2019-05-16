import React from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <div className="App">Starter</div>
    </Wrapper>
  );
};

export default App;
