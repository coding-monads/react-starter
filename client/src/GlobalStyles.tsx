import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html {
        font-size: 16px;
    }
    
    body {
        padding: 0;
        margin: 0;
        background-color: white;
    }

    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
    }

    ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: white;
    }
`;
