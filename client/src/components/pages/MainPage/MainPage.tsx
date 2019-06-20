import React from 'react';

interface MainPageTypes {
  children: string | JSX.Element[] | JSX.Element;
}

const MainPage: React.FC<MainPageTypes> = ({ children }) => (
  <>
    <nav />
    <main>{children}</main>
    <footer />
  </>
);

export default MainPage;
