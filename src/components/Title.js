import styled from 'styled-components';

const TitleStyle = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	position: absolute;
	pointer-events: none;
	z-index: 1000;
`;

const Title = props => {
	return (
		<TitleStyle>
			<h1
				style={{
					background: 'red',
					padding: '15px',
					borderRadius: '100px',
					textTransform: 'capitalize',
					textDecoration: 'underline',
					border: '5px double aliceblue'
				}}
			>
				{props.findSubject}
			</h1>
		</TitleStyle>
	);
};

export default Title;
