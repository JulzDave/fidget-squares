// import { useState } from 'react';
import styled from 'styled-components';
import { SQUARE_WIDTH } from '../constants/css-metrics';

const ANIMATION_SPEED = 1500;
const ANIMATION_LINGER = ANIMATION_SPEED + 20;

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

const CubeStyle = styled.span`
	border-radius: 3px;
	height: ${SQUARE_WIDTH}px;
	width: ${SQUARE_WIDTH}px;
	font-size: ${SQUARE_WIDTH * 0.7}px;
	/* border: 1px solid white; */
	cursor: pointer;
	text-align: center;
	user-select: none;
	/* transition: background-color ease-out ${ANIMATION_SPEED}ms; */
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	&:active {
		filter: invert(1);
	}
`;
const leaveHandler = ev => {
	ev.target.style.animation = `fadeOut ease ${
		ANIMATION_LINGER
	}ms`;
	// ev.target.style.backgroundColor = 'transparent';
};

const hoverHandler = (ev, props) => {
	if (ev.target.innerHTML) {
		return;
	}

	const a = Math.floor(Math.random() * (255 - 0 + 1) + 0);
	const b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
	const c = Math.floor(Math.random() * (255 - 0 + 1) + 0);

	const shuffledColors = shuffle([a, b, c]).join(', ');
	const rgbShuffledColors = `rgb(${shuffledColors})`;
	const { emojis } = props;
	ev.target.style.backgroundColor = rgbShuffledColors;
	ev.target.style.animation = `fadeOut ease ${
		ANIMATION_LINGER
	}ms`;
	ev.target.style.boxShadow = `0px 0px 6px 1px ${rgbShuffledColors}`;
	ev.target.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

	setTimeout(() => {
		ev.target.style.backgroundColor = 'transparent	';
		ev.target.style.animation = '';
		ev.target.style.boxShadow = '';
		ev.target.innerHTML = '';
	}, ANIMATION_SPEED);
};

// const fetchEmojiData = async ev => {
// 	const url = 'https://api.emojidata.ai/sentiment-analysis';
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({
// 			api_key: 'rrpsw-mHZPIfDM3vK4IA',
// 			text: ev.target.innerHTML
// 		})
// 	};
// 	const response = await fetch(url, requestOptions);
// 	const data = await response.json();
// 	console.log(data);
// };

const assignEmojiData = (ev, props) => {
	const foundEmojiDatum = props.emojiData?.[ev.target.innerHTML];
	if (foundEmojiDatum?.group === props.findSubject) {
		const slug = foundEmojiDatum?.slug;
		if (slug) {
			alert(
				`SUCCESS! this is a ${slug} and a ${slug} is part of ${props.findSubject}`
			);
		}
	}
	if (foundEmojiDatum) {
		console.log(foundEmojiDatum);
	}
};

const animateOnClick = (ev, props) => {
	ev.target.style.zIndex = '100';
	ev.target.style.transform = 'scale(3)';
	ev.target.style.pointerEvents = 'none';
	assignEmojiData(ev, props);

	setTimeout(() => {
		ev.target.style.pointerEvents = 'initial';
		ev.target.style.zIndex = '10';
		ev.target.style.transform = 'scale(1)';
	}, ANIMATION_SPEED);
};

const Cube = props => {
	// const [innerHtml, setInnerHtml] = useState('')
	return (
		<CubeStyle
			// onClick={fetchEmojiData}
			onClick={ev => {
				animateOnClick(ev, props);
			}}
			onMouseLeave={leaveHandler}
			onMouseOver={ev => {
				hoverHandler(ev, props);
			}}
		/>
	);
};

export default Cube;
