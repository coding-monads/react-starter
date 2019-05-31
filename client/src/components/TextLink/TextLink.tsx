import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

interface TextLinkTypes {
  children: string;
  to: string;
}

const TextLink: React.FC<TextLinkTypes> = ({ children, to }) => (
  <Typography>
    <Link component={RouterLink} to={to} variant="body2">
      {children}
    </Link>
  </Typography>
);

export default TextLink;
