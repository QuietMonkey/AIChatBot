import styled from 'styled-components';

const Dots = styled.div`
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: black;
  color: black;
  animation: dot-loader 1.3s infinite linear;
  margin: 0 12px;

  @keyframes dot-loader {
  0% {
    box-shadow: 9984px 0 0 0 black, 9999px 0 0 0 black, 10014px 0 0 0 black;
  }
  16.667% {
    box-shadow: 9984px -10px 0 0 black, 9999px 0 0 0 black, 10014px 0 0 0 black;
  }
  33.333% {
    box-shadow: 9984px 0 0 0 black, 9999px 0 0 0 black, 10014px 0 0 0 black;
  }
  50% {
    box-shadow: 9984px 0 0 0 black, 9999px -10px 0 0 black, 10014px 0 0 0 black;
  }
  66.667% {
    box-shadow: 9984px 0 0 0 black, 9999px 0 0 0 black, 10014px 0 0 0 black;
  }
  83.333% {
    box-shadow: 9984px 0 0 0 black, 9999px 0 0 0 black, 10014px -10px 0 0 black;
  }
  100% {
    box-shadow: 9984px 0 0 0 black, 9999px 0 0 0 black, 10014px 0 0 0 black;
  }
}
`;

const DotLoader = () => {
	return <Dots />;
};

export default DotLoader;
