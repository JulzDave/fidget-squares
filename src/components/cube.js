// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
	ANIMATION_LINGER,
	ANIMATION_SPEED,
	SQUARE_WIDTH
} from '../constants/css-metrics';

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
	display: flex;
	justify-content: center;
	align-items: center;
	/* transition: background-color ease-out ${ANIMATION_SPEED}ms; */
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	&:active {
		filter: invert(1);
	}
`;
const leaveHandler = setAnimation => {
	setAnimation(() => `fadeOut ease ${ANIMATION_LINGER}ms`);
	// ev.target.style.backgroundColor = 'black';
};

const randomColorDepth = () => Math.floor(Math.random() * (255 - 0 + 1) + 0);

const hoverHandler = (props, statefulStyles) => {
	const { setInnerHTML, setBackgroundColor, setAnimation, setBoxShadow } =
		statefulStyles.setStatefulStyle;
	const { emojis } = props;
	if (statefulStyles.getStatefulStyle.innerHTML) {
		setInnerHTML('');
		setBackgroundColor('black');
		setAnimation('');
		setBoxShadow('');
		return;
	}
	const r = randomColorDepth();
	const g = randomColorDepth();
	const b = randomColorDepth();

	const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
	const shuffledColors = shuffle([r, g, b]).join(', ');
	const rgbShuffledColors = `rgb(${shuffledColors})`;

	setInnerHTML(randomEmoji);
	setBackgroundColor(rgbShuffledColors);
	setAnimation(`fadeOut ease ${ANIMATION_LINGER}ms`);
	setBoxShadow(`0px 0px 6px 1px ${rgbShuffledColors}`);
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

const animateOnClick = (ev, props, timeOut, setAnimation) => {
	if (!ev.target.innerHTML) {
		return;
	}
	setAnimation(() => `fadeIn ease ${ANIMATION_LINGER}ms`);
	clearTimeout(timeOut);
	ev.target.style.zIndex = '100';
	ev.target.style.transform = `translate(${translateByIndex(props)})`;
	ev.target.style.transform = ev.target.style.transform += ' scale(3)';
	ev.target.style.pointerEvents = 'none';
	assignEmojiData(ev, props);

	setTimeout(() => {
		ev.target.style.pointerEvents = 'initial';
		ev.target.style.zIndex = '10';
		ev.target.style.transform = 'scale(1)';
	}, ANIMATION_SPEED);
};

const translateByIndex = props => {
	const index = props.index + 1;
	const cubesInHeight = props.computedHeight;
	const cubesInWidth = props.computedWidth;

	if (index <= cubesInWidth) {
		if (index === 1) {
			return `${SQUARE_WIDTH}px, ${SQUARE_WIDTH}px`;
		} else if (index === cubesInWidth) {
			return `-${SQUARE_WIDTH}px, ${SQUARE_WIDTH}px`;
		}
		return `0px, ${SQUARE_WIDTH}px`;
	} else if (index > cubesInWidth * cubesInHeight - cubesInWidth) {
		if (index === cubesInWidth * cubesInHeight) {
			return `-${SQUARE_WIDTH}px, -${SQUARE_WIDTH}px`;
		} else if (index === cubesInWidth * cubesInHeight - cubesInWidth + 1) {
			return `${SQUARE_WIDTH}px, -${SQUARE_WIDTH}px`;
		}
		return `0px, -${SQUARE_WIDTH}px`;
	} else if (index % cubesInWidth === 0) {
		return `-${SQUARE_WIDTH}px, 0px`;
	} else if (index % cubesInWidth === 1) {
		return `${SQUARE_WIDTH}px, 0px`;
	}
};

const Cube = props => {
	const element = useRef();
	const [mounted, setMounted] = useState('');
	const [innerHTML, setInnerHTML] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('');
	const [animation, setAnimation] = useState('');
	const [boxShadow, setBoxShadow] = useState('');
	const [timer, setTimer] = useState();

	const getStatefulStyle = {
		innerHTML,
		backgroundColor,
		animation,
		boxShadow
	};
	const setStatefulStyle = {
		setInnerHTML,
		setBackgroundColor,
		setAnimation,
		setBoxShadow
	};
	const statefulStyles = { getStatefulStyle, setStatefulStyle };

	useEffect(() => {
		if (mounted) {
			//! ASSIGNING THE TIMEOUT TO A VARIABLE MAKES THE UI LAG.
			const timerId = setTimeout(() => {
				setInnerHTML('');
				setBackgroundColor('black');
				setAnimation('');
				setBoxShadow('');
				console.log('EFFECT!!!');
			}, ANIMATION_SPEED - 50);
			setTimer(timerId);
			return () => clearTimeout(timerId);
		} else {
			setMounted(true);
		}
	}, [mounted, innerHTML, backgroundColor, animation, boxShadow]);

	return (
		<CubeStyle
			ref={element}
			// onClick={fetchEmojiData}
			onClick={ev => {
				animateOnClick(ev, props, timer, setAnimation);
			}}
			onMouseLeave={() => {
				leaveHandler(setAnimation);
			}}
			onMouseOver={() => {
				hoverHandler(props, statefulStyles);
			}}
			style={{
				backgroundColor,
				animation,
				boxShadow
			}}
		>
			{innerHTML}
		</CubeStyle>
	);
};

export default Cube;
