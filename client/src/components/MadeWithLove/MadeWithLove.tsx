import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = {
  marginTop: '30px'
};

const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center" style={styles}>
    {'Built with love by the '}
    <Link color="inherit" href="https://material-ui.com/">
      Coding Monads
    </Link>
    {' team.'}
  </Typography>
);

export default MadeWithLove;
