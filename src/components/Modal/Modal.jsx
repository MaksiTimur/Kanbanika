import { createPortal } from 'react-dom';
import ModalContent from './ModalContent/ModalContent';
import './Modal.css';

const modals = document.querySelector('#modals');

const Modal = ({ children, onClose }) => {
    return (
        <>
            {createPortal(
                <div className="modal-wrapper">
                    <div className="modal">
                        <button className='modal-close' onClick={onClose}>X</button>
                        <ModalContent>
                            {children}
                        </ModalContent>
                    </div>
                </div>, modals
            )}
        </>
    );
}
export default Modal;