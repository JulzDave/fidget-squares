import './App.css';
import Wrapper from './components/Wrapper';
import useWindowDimensions from './components/GetWindowDimentions';
import styled from 'styled-components';
import { DEDICATED_VIEWPORT } from './constants/css-metrics';
import { useState } from 'react';

const AppWrapper = styled.div`
	width: ${DEDICATED_VIEWPORT + DEDICATED_VIEWPORT * 0.025}vw;
	height: ${DEDICATED_VIEWPORT}vh;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	/* box-shadow: 0px 0px 10px 17px; */
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

const GameMenu = styled.div`

font-size: 2rem;

width: 30vw;
height: 30vh;
background-color: black;
border: 10px double white;
display:flex;
justify-content: center;
align-items: center;
cursor: pointer;
user-select: none;

color: white;
&:hover{
	color: yellow;
}
`
const BackgroundAnimation = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1000;
	background: linear-gradient(-45deg, #9bffb4, #ff92ff, #9be4ff, #fffd8e, red);
	background-size: 400% 400%;
	animation: hue 5s ease infinite;

	@keyframes hue {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
		/* filter: hue-rotate(1turn); */
	}
	}
`;

function App() {
	const { height, width } = useWindowDimensions();
	const [startGame, setStartGame] = useState(false)
	return (
		<AppWrapperWrapper>
			<BackgroundAnimation />
			<AppWrapper>
				{startGame ?
					<Wrapper dimentions={{ height, width }}></Wrapper>
					: <GameMenu><p onClick={() => setStartGame(!startGame)}>Start Game</p></GameMenu>}
			</AppWrapper>
		</AppWrapperWrapper>
	);
}

export default App;
