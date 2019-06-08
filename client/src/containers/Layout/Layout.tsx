import React from 'react';

interface LayoutTypes {
  children: string | JSX.Element[] | JSX.Element;
}

const Layout: React.FC<LayoutTypes> = ({ children }) => (
  <>
    <nav />
    <main>{children}</main>
    <footer />
  </>
);

export default Layout;
