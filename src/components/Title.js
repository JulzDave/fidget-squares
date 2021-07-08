import styled from 'styled-components';

const TitleStyle = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    pointer-events: none;
    z-index: 1000;
    user-select: none;
`;

const Title = props => {
    return (
        <TitleStyle>
            <div
                style={{
                    background: 'black',
                    /* padding: 45px, */
                    /* border-radius: 100px, */
                    textTransform: 'capitalize',
                    textDecoration: 'underline',
                    /* border: 5px double aliceblue, */
                    width: 'calc((45px * 6) + 10px)',
                    height: 'calc((45px * 3) + 10px)',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    borderColor: 'white',
                }}
            >
                {props.findSubject}
            </div>
        </TitleStyle>
    );
};

export default Title;
