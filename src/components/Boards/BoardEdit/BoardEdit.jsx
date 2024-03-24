import { Form } from 'react-router-dom';
import './BoardEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { resetBackground, setBackground, setTitle } from '../../../redux/slices/boardsSlice';
import { setShow } from '../../../redux/slices/modalSlice';
import { FaRegCircleXmark } from "react-icons/fa6";

const BoardEdit = () => {
    const boards = useSelector(state => state.boardsReducer).boards;
    const currentBoard = useSelector(state => state.boardsReducer).current;
    const dispatch = useDispatch();
    let board = null;

    boards.forEach(boardData => {
        if (boardData.id !== currentBoard.id) return;

        board = boardData;
    });

    const handleSubmit = e => {
            const title = e.target.title.value;
            const background = e.target.background.value;

            if (title.length === 0) return;

            dispatch(setTitle({ title, id: board.id }));
            dispatch(setBackground({ background, id: board.id }));
            dispatch(setShow({ boardEdit: false }));
    }

    const resetBgColor = e => {
        e.preventDefault();

        const inputColor = document.querySelector('.change-bg input');

        inputColor.value = '#1f2229';
    }

    return (
        <Form className="board-edit" onSubmit={e => handleSubmit(e)} action=''>
            <label htmlFor="title">Board Title</label>
            <input type="text" name="title" defaultValue={currentBoard.title} />

            <label htmlFor="background">Board Background</label>
            <div className="change-bg">
                <button onClick={e => resetBgColor(e)}><FaRegCircleXmark /></button>
                <input type="color" name="background" defaultValue={currentBoard.background ?? '#1f2229'} />
            </div>
            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default BoardEdit;