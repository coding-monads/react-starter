import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

interface TextHeadingTypes {
  children: string;
}

const TextHeading: React.FC<TextHeadingTypes & TypographyProps> = ({
  children,
  variant,
}) => (
  <Typography variant={variant} gutterBottom align="center">
    {children}
  </Typography>
);

export default TextHeading;
