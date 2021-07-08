// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    ANIMATION_LINGER,
    ANIMATION_SPEED,
    ANIMATION_SPEED_OFFSET,
    SQUARE_WIDTH,
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
            array[currentIndex],
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
const leaveHandler = (setElementProperties, elementProperties) => {
    setElementProperties({
        innerHTML: elementProperties.innerHTML,
        backgroundColor: elementProperties.backgroundColor,
        animation: `fadeOut ease ${ANIMATION_LINGER}ms`,
        boxShadow: elementProperties.boxShadow,
    });
};

const summonRgb = () => {
    const randomColorDepth = () =>
        Math.floor(Math.random() * (255 - 0 + 1) + 0);

    const r = randomColorDepth();
    const g = randomColorDepth();
    const b = randomColorDepth();

    const shuffledColors = shuffle([r, g, b]).join(', ');

    return `rgb(${shuffledColors})`;
};
const hoverHandler = (props, setElementProperties, elementProperties) => {
    if (elementProperties.innerHTML) {
        return;
    }

    const { emojis } = props;

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const summonedRgb = summonRgb();
    setElementProperties({
        innerHTML: randomEmoji,
        backgroundColor: summonedRgb,
        animation: `fadeOut ease ${ANIMATION_LINGER}ms`,
        boxShadow: `0px 0px 6px 1px ${summonedRgb}`,
    });
};

const assignEmojiData = (ev, props) => {
    const foundEmojiDatum = props.emojiData?.[ev.target.innerHTML];
    if (foundEmojiDatum?.group === props.findSubject) {
        ev.target.style.border = '3px solid limegreen';
        ev.target.style.boxShadow = '0px 0px 6px 3px limegreen';
        ev.target.style.transform = 'scale(3)';
        ev.target.style.transform += `translate(${translateByIndex(props)})`;

        setTimeout(() => {
            ev.target.style.transition = `transform ease-out ${ANIMATION_SPEED}ms`;
            ev.target.style.transform += ' translate(0px, -50px)';
        }, 0);
    }
    if (foundEmojiDatum) {
        console.log(foundEmojiDatum);
    }
};

const animateOnClick = (
    ev,
    props,
    timeOut,
    setElementProperties,
    elementProperties,
) => {
    if (!ev.target.innerHTML) {
        return;
    }
    setElementProperties({
        innerHTML: elementProperties.innerHTML,
        backgroundColor: elementProperties.backgroundColor,
        // animation: `fadeIn ease ${ANIMATION_LINGER}ms`,
        boxShadow: elementProperties.boxShadow,
    });
    clearTimeout(timeOut);
    ev.target.style.zIndex = '100';
    // ev.target.style.transform = `translate(${translateByIndex(props)})`;
    // ev.target.style.transform = ev.target.style.transform += ' scale(3)';
    ev.target.style.pointerEvents = 'none';
    assignEmojiData(ev, props);

    setTimeout(() => {
        ev.target.style.pointerEvents = 'initial';
        ev.target.style.zIndex = '10';
        ev.target.style.transform = 'scale(1)';
        ev.target.style.border = '';
    }, ANIMATION_SPEED - ANIMATION_SPEED_OFFSET * 3);
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
    const [timer, setTimer] = useState();
    const [elementProperties, setElementProperties] = useState({
        innerHTML: '',
        backgroundColor: '',
        animation: '',
        boxShadow: '',
    });

    useEffect(() => {
        if (mounted) {
            const timerId = setTimeout(() => {
                setElementProperties({
                    innerHTML: '',
                    backgroundColor: 'transparent',
                    animation: '',
                    boxShadow: '',
                });
                console.log('EFFECT!!!');
            }, ANIMATION_SPEED - ANIMATION_SPEED_OFFSET);
            setTimer(timerId);
        } else {
            setMounted(true);
        }
    }, [mounted, elementProperties.animation]);

    const { backgroundColor, animation, boxShadow, innerHTML } =
        elementProperties;

    return (
        <CubeStyle
            ref={element}
            // onClick={fetchEmojiData}
            onClick={ev => {
                animateOnClick(
                    ev,
                    props,
                    timer,
                    setElementProperties,
                    elementProperties,
                );
            }}
            onMouseLeave={() => {
                leaveHandler(setElementProperties, elementProperties);
            }}
            onMouseOver={() => {
                hoverHandler(props, setElementProperties, elementProperties);
            }}
            style={{
                backgroundColor,
                animation,
                boxShadow,
            }}
        >
            {innerHTML}
        </CubeStyle>
    );
};

export default Cube;
