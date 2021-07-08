import { useState, useEffect } from 'react';
import { DEDICATED_VIEWPORT } from '../constants/css-metrics';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width: width * parseFloat(`0.${DEDICATED_VIEWPORT}`),
        height: height * parseFloat(`0.${DEDICATED_VIEWPORT}`),
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions(),
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
