import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 576,
    isTablet: window.innerWidth > 576 && window.innerWidth <= 768,
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const isMobile = newWidth <= 576;
      const isTablet = newWidth > 576 && newWidth <= 768;

      setWindowSize({
        width: newWidth,
        height: newHeight,
        isMobile,
        isTablet,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
