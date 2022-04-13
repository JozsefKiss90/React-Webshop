import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
    const routePath = useLocation();
    const onTop = () => {
      window.scrollTo(0, 0);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [routePath]);
    
    return null;
};

export default ScrollToTop;