import React from 'react';
import Typography from '@material-ui/core/Typography';

interface TextHeadingTypes {
  children: string;
  variant?: 'body1' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const TextHeading: React.FC<TextHeadingTypes> = ({
  children,
  variant = 'body1'
}) => (
  <Typography variant={variant} gutterBottom align='center'>
    {children}
  </Typography>
);

export default TextHeading;
