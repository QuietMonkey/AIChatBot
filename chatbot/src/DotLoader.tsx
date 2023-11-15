import styled from 'styled-components';

import {colors} from './colors';

const Dots = styled.div`
  position: relative;
  left: -9994px;
  top: 6px;
  width: 4px;
  height: 4px;
  border-radius: 5px;
  background-color: ${colors.text};
  color: ${colors.text};
  animation: dot-loader 1.3s infinite linear;
  margin: 0 12px;

  @keyframes dot-loader {
  0% {
    box-shadow: 9984px 0 0 0 ${colors.text}, 9999px 0 0 0 ${colors.text}, 10014px 0 0 0 ${colors.text};
  }
  16.667% {
    box-shadow: 9984px -10px 0 0 ${colors.text}, 9999px 0 0 0 ${colors.text}, 10014px 0 0 0 ${colors.text};
  }
  33.333% {
    box-shadow: 9984px 0 0 0 ${colors.text}, 9999px 0 0 0 ${colors.text}, 10014px 0 0 0 ${colors.text};
  }
  50% {
    box-shadow: 9984px 0 0 0 ${colors.text}, 9999px -10px 0 0 ${colors.text}, 10014px 0 0 0 ${colors.text};
  }
  66.667% {
    box-shadow: 9984px 0 0 0 ${colors.text}, 9999px 0 0 0 ${colors.text}, 10014px 0 0 0 ${colors.text};
  }
  83.333% {
    box-shadow: 9984px 0 0 0 ${colors.text}, 9999px 0 0 0 ${colors.text}, 10014px -10px 0 0 ${colors.text};
  }
  100% {
    box-shadow: 9984px 0 0 0 ${colors.text}, 9999px 0 0 0 ${colors.text}, 10014px 0 0 0 ${colors.text};
  }
}
`;

const DotLoader = () => {
	return <Dots />;
};

export default DotLoader;
