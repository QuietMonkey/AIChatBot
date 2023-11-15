import {css} from 'styled-components';

export const fadeIn = css`
  opacity: 0;
  animation: fadeInDown 1s;
  animation-fill-mode: forwards;

  @keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, 75%, 0);
  }

  100% {
    opacity: 1;
    transform: none;
    }
  }
`;