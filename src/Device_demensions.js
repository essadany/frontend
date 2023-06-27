import React, { useEffect, useState } from 'react';

const  Device_demensions = ()=> {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set the CSS variables dynamically
  useEffect(() => {
    document.documentElement.style.setProperty('--window-width', `${windowWidth}px`);
    document.documentElement.style.setProperty('--window-height', `${windowHeight}px`);
  }, [windowWidth, windowHeight]);
}
export default Device_demensions;