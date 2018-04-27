import React from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";

const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
`;

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Box />
      </div>
    );
  }
}

export default hot(module)(App);
