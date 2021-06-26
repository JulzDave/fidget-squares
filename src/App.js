import './App.css';
import Wrapper from './components/Wrapper';
import useWindowDimensions from './components/GetWindowDimentions';
import styled from 'styled-components';
import { DEDICATED_VIEWPORT } from './constants/css-metrics';

const AppWrapper = styled.div`
	width: ${DEDICATED_VIEWPORT + DEDICATED_VIEWPORT * 0.025}vw;
	height: ${DEDICATED_VIEWPORT}vh;
	box-shadow: 0px 0px 10px 17px;
`;
const AppWrapperWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	/* 
.full {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  color: white;
  font-family: system-ui;
  font-size: 48px;
}
.full::before {
  content: '';
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.full::after {
  content: 'Hue hue hue';
  position: relative;
  text-align: center;
}

body {
  margin: 0;
} */
`;

const BackgroundAnimation = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1000;
	background-color: #2ecc71;
	animation: hue 5s linear 0s infinite reverse;

	@keyframes hue {
		to {
			filter: hue-rotate(1turn);
		}
	}
`;

function App() {
	const { height, width } = useWindowDimensions();

	return (
		<AppWrapperWrapper>
			<BackgroundAnimation />
			<AppWrapper>
				<Wrapper dimentions={{ height, width }}></Wrapper>;
			</AppWrapper>
		</AppWrapperWrapper>
	);
}

export default App;
