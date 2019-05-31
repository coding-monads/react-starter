import React from 'react';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';

const styles = {
  margin: 0,
};

interface TextHelperTypes {
  children: string | JSX.Element[] | JSX.Element;
  error?: boolean;
}

const TextHelper: React.FC<TextHelperTypes & FormHelperTextProps> = ({
  children,
  error,
  component,
}) => (
  <FormHelperText error={error} component={component} style={styles}>
    {children}
  </FormHelperText>
);

export default TextHelper;
