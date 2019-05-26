import React from "react";
import { AnimatedH1 } from "./styled";
import { MadeWithLove } from "../../components/MadeWithLove";

const Test = () => (
  <>
    <AnimatedH1 initialPose="closed" pose="open">
      Hello World
    </AnimatedH1>
    <MadeWithLove />
  </>
);

export default Test;
