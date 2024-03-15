import { createPortal } from 'react-dom';
import ModalContent from './ModalContent/ModalContent';
import { useDispatch, useSelector } from 'react-redux';
import { show } from '../../redux/slices/modalSlice'
import './Modal.css';

const modals = document.querySelector('#modals');

const Modal = ({ children }) => {
    const isNeedToShow = useSelector(state => state.modalReducer)
    const dispatch = useDispatch();

    const close = () => {
        dispatch(show(false));
    }

    return (
        <>
            {isNeedToShow && createPortal(
                <div className="modal-wrapper">
                    <div className="modal">
                        <button className='modal-close' onClick={close}>X</button>
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