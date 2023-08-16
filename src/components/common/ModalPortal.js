import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  const elRef = useRef(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    const currentEl = elRef.current;  // make a copy of the ref's current value

    modalRoot.appendChild(currentEl);
    return () => modalRoot.removeChild(currentEl);
  }, []);

  return ReactDOM.createPortal(children, elRef.current);
};

export default ModalPortal;
