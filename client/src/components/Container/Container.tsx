import React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';

interface ContainerTypes {
  children: string | JSX.Element[] | JSX.Element;
}

const ContainerMUI: React.FC<ContainerTypes & ContainerProps> = ({
  children,
  maxWidth,
}) => <Container maxWidth={maxWidth}>{children}</Container>;

export default ContainerMUI;
