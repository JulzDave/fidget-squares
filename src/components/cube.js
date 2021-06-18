import styled from 'styled-components';

const shuffle = array => {
	var currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex]
		];
	}

	return array;
};

const CubeStyle = styled.div`
	border-radius: 3px;
	height: 15px;
	width: 15px;
	color: white;
	margin: 1px;
	/* border: 0.5px groove white; */
	/* transition: background-color ease-out 3s; */
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;
const leaveHandler = ev => {
	ev.target.style.animation = 'fadeOut ease 3s';
	// ev.target.style.backgroundColor = 'transparent';
};

const hoverHandler = ev => {
	const a = Math.floor(Math.random() * (255 - 0 + 1) + 0);
	const b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
	const c = Math.floor(Math.random() * (255 - 0 + 1) + 0);
	const shuffledColors = shuffle([a, b, c]).join(', ');
	const rgbShuffledColors = `rgb(${shuffledColors})`;
	ev.target.style.backgroundColor = rgbShuffledColors;
	ev.target.style.animation = 'fadeOut ease 3s';
	ev.target.style.boxShadow = `0px 0px 6px 1px ${rgbShuffledColors}`;

	setTimeout(() => {
		ev.target.style.backgroundColor = 'black';
		ev.target.style.animation = '';
		ev.target.style.boxShadow = '';
	}, 3000);
};

const Cube = _props => {
	return <CubeStyle onMouseLeave={leaveHandler} onMouseOver={hoverHandler} />;
};

export default Cube;
