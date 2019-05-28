import styled from 'styled-components';
import posed from 'react-pose';

export const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const AnimatedH1 = posed(H1)({
  closed: {
    y: '-100%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      duration: 500,
    },
  },
  open: {
    y: '0',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      duration: 500,
    },
  },
});
