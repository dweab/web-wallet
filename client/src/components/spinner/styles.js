import styled from "styled-components";
import {keyframes} from "styled-components";

const rotate = keyframes`
  0% { -webkit-transform: rotate(0deg); }
  10% { -webkit-transform: rotate(90deg); }
  25% { -webkit-transform: rotate(90deg); }
  35% { -webkit-transform: rotate(180deg); }
  50% { -webkit-transform: rotate(180deg); }
  60% { -webkit-transform: rotate(270deg); }
  75% { -webkit-transform: rotate(270deg); }
  85% { -webkit-transform: rotate(360deg); }
  100% { -webkit-transform: rotate(360deg); }
`;


const flip = keyframes`
  0% { -webkit-transform: scaleY(1); }
  10% { -webkit-transform: scaleY(-1); }
  50% { -webkit-transform: scaleY(-1); }
  60% { -webkit-transform: scaleY(1); }
  100% { -webkit-transform: scaleY(1); }
`;


const scale = keyframes`
  0% { -webkit-transform: scale(1); }
  50% { -webkit-transform: scale(.7); }
  100% { -webkit-transform: scale(1); }
`;

// Here we create a component that will rotate everything we pass in over two seconds
export const Rotate = styled.div`
  display: inline-block;
  animation: ${scale} 1s ease infinite;
  padding: 2rem 1rem;
  font-size: .1rem;
`;