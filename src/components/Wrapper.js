import styled from 'styled-components';
import Cube from './cube';

const X = styled.div`
	background: black;
	height: 100%;
	width: 100%;
	color: white;
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	overflow: hidden;
`;

const Wrapper = props => {
	const height = props.dimentions.height;
	const width = props.dimentions.width;

	return (
		<X>
			{[...Array((height + width) * 3).keys()].map(x => (
				<Cube key={x} />
			))}
		</X>
	);
};

export default Wrapper;
