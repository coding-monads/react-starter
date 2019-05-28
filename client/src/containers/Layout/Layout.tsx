import React from 'react';
import PropTypes from 'prop-types';

const Layout: React.FC = ({ children }) => (
  <>
    <nav />
    <main>{children}</main>
    <footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
