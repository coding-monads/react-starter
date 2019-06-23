import React from 'react';
import Container from '@material-ui/core/Container';

interface ContainerTypes {
  children: string | JSX.Element[] | JSX.Element;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

const ContainerMUI: React.FC<ContainerTypes> = ({
  children,
  maxWidth = 'lg'
}) => <Container maxWidth={maxWidth}>{children}</Container>;

export default ContainerMUI;
