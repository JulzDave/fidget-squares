import { useState } from 'react';
import styled from 'styled-components';
import { DEDICATED_VIEWPORT, SQUARE_WIDTH } from '../constants/css-metrics';
import { EMOJI_DATA, EMOJIS } from '../constants/emoji-data';
import Cube from './cube';
import Title from './Title';

const WrapperStyle = styled.div`
	background: black;
	height: ${DEDICATED_VIEWPORT}vh;
	width: 100%;
	color: white;
	margin: 0;
	padding: 0;
	overflow: hidden;
	display: grid;
	/* grid-template-columns: repeat(auto-fill, ${SQUARE_WIDTH}px) */
	grid-template-columns: ${props => {
		return `repeat(${Math.floor(
			props.dimentions.width / SQUARE_WIDTH
		)}, 1fr)`;
	}};
	grid-template-areas:
		A A A A A A A A A A B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		A A A A A A A A A A B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		A A A A A A A A A A B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		A A A A A A A A A A B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
		B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B;
`;

const sample = () => {
	const groupNames = [
		'smileys-emotion',
		'people-body',
		'animals-nature',
		'food-drink',
		'travel-places',
		'activities',
		'symbols',
		'objects',
		'flags'
	];
	const len = groupNames == null ? 0 : groupNames.length;
	return len ? groupNames[Math.floor(Math.random() * len)] : undefined;
};

const Wrapper = props => {
	const [findSubject, setFindSubject] = useState(sample());
	// const [AudSucces] = useState(new Audio('../../public/sounds/zapsplat_bell_small_reception_desk_bell_single_ring_003_15125.mp3'));

	/*
	A 2-step calculation for the following problem:
	? how many tiles fit on random screen resolution:

		? Given that:
		--> 38 tiles fit in a 1920px wide screen.
		--> 19 tiles fit in a 937px high screen.

		? calculation step A:
		--> Calculated width: {1920 / x = 38}  //x = 50.5263 ==> 0.0265625 ==>  2.7%
		--> Calculated height: {937 / x = 19}   //x = 49.3157 ==> 0.0202774 ==> 2.05%

		? calculation step B:
		--> ((width * 0.027) + (height * 0.0205))
	*/
	const height = props.dimentions.height;
	const width = props.dimentions.width;
	// console.log({
	// 	height: Math.floor(height / SQUARE_WIDTH),
	// 	width: Math.floor(width / SQUARE_WIDTH)
	// });

	const computedWidth = Math.floor(width / SQUARE_WIDTH);
	const computedHeight = Math.floor(height / SQUARE_WIDTH);
	return (
		<WrapperStyle className="wrapper" dimentions={props.dimentions}>
			<Title findSubject={findSubject} />
			{[...Array(computedWidth * computedHeight).keys()].map(index => (
				<Cube
					emojis={EMOJIS}
					emojiData={EMOJI_DATA}
					findSubject={findSubject}
					computedWidth={computedWidth}
					computedHeight={computedHeight}
					setFindSubject={setFindSubject}
					key={index}
					index={index}
				/>
			))}
		</WrapperStyle>
	);
};

export default Wrapper;
