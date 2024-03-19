import styled, { css } from "styled-components";

/*from https://codesandbox.io/s/cool-waterfall-b9xi9?from-embed=&file=/src/App.js:582-595 */

export const Container = styled.div`
  margin: 0px auto;
  max-width: 500px;
  height: 45vh;
  min-height: 150px;
  display: block;
  flex-direction: row;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: block;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const MainContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BarChartContainer = styled.div`
  display: block;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: auto;
`;

export const Chart = css`
  margin-top: 10px;
  margin-buttom: 10px;
  /*width: 56px;*/
  &:hover {
    opacity: 0.8;
  }
  /*@media (max-width: 420px) {
    width: 34px;
  }*/
`;

export const Number = styled.span`
  text-align: center;
  color: ${(props) => props.color};
  word-wrap:
  width: 5%;
  display: block;
`;

export const MakeBar = styled.div`
  width: ${(props) => props.width}%;
  height: 5vh;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  ${Chart};
  display: block;
`;

export const BlackLine = styled.div`
  width: 100%;
  height: 5px;
  background-color: grey;
`;
