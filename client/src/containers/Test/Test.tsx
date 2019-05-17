import React from 'react';
import { AnimatedH1 } from './styled';
import { Button, ButtonA } from '../../components/UI/Button';

const Test = () => (
  <>
    <AnimatedH1 initialPose="closed" pose="open">
      Hello World
    </AnimatedH1>

    <Button size="small">Button</Button>
    <Button>Button</Button>
    <Button size="large" rounded>
      Button
    </Button>
    <ButtonA primary size="small">
      Button
    </ButtonA>
    <ButtonA primary>Button</ButtonA>
    <ButtonA primary size="large" rounded>
      Button
    </ButtonA>
  </>
);

export default Test;
