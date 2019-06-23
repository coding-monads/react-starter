import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
  margin: 0
};

interface TextHelperTypes {
  children: string | JSX.Element[] | JSX.Element;
  component?: 'p' | 'div';
  error?: boolean;
}

const TextHelper: React.FC<TextHelperTypes> = ({
  children,
  component = 'p',
  error = false
}) => (
  <FormHelperText error={error} component={component} style={styles}>
    {children}
  </FormHelperText>
);

export default TextHelper;
