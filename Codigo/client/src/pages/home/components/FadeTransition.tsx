import { useRef, useState, useEffect } from "react";
import { Transition } from "react-transition-group";

interface ITransitionStyle {
    [key: string]: any
    entering: { opacity: number },
    entered:  { opacity: number },
    exiting:  { opacity: number },
    exited:  { opacity: number }
}

const defaultStyle = {
    transition: `opacity 300ms ease-in-out`,
    opacity: 0,
}
  
const transitionStyles: ITransitionStyle = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 1 },
    exited:  { opacity: 0 },
};

function FadeTransition(props: {children: JSX.Element}) {
    const nodeRef = useRef(null);
    const [inProp, setInProp] = useState<boolean>(false);

    useEffect(() => {
        setInProp(true);
    }, []);
    
    return (
        <Transition nodeRef={nodeRef} in={inProp} timeout={300}>
            {(state: string) => (
                <div ref={nodeRef} style={{...defaultStyle, ...transitionStyles[state]}}>
                    {props.children}
                </div>
            )}
        </Transition>
    );
}

export default FadeTransition;