import { Form } from 'react-router-dom';
import './BoardEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBackground, setBackground, setTitle } from '../../../redux/slices/boardsSlice';
import { setShow } from '../../../redux/slices/modalSlice';
import ChangeBackground from './ChangeBackground/ChangeBackground';
import { useState } from 'react';

const BoardEdit = () => {
    const boards = useSelector(state => state.boardsReducer).boards;
    const currentBoard = useSelector(state => state.boardsReducer).current;
    const dispatch = useDispatch();

    let board = null;

    boards.forEach(boardData => {
        if (boardData.id !== currentBoard.id) return;

        board = boardData;
    });

    const [activeBg, setActiveBg] = useState(board.background.active);

    const handleSubmit = e => {
        e.preventDefault();

        const title = e.target.title.value;

        if (title.length === 0) return;
        if (title.length > 20) return;

        switch (activeBg) {
            case 'color':
                const bgColor = e.target.bgColor.value;

                dispatch(setActiveBackground({ id: board.id, type: 'color' }));
                dispatch(setBackground({ type: 'bgColor', background: bgColor, id: board.id }));

                break;
            case 'url':
                const bgUrl = e.target.bgUrl.value;

                dispatch(setActiveBackground({ id: board.id, type: 'url' }));
                dispatch(setBackground({ type: 'bgUrl', background: bgUrl, id: board.id }));

                break;
            default:
                break;
        }

        dispatch(setTitle({ title, id: board.id }));

        dispatch(setShow({ boardEdit: false }));
    }

    return (
        <Form className="board-edit" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Board Title</label>
            <input
                type="text"
                name="title"
                maxLength="20"
                defaultValue={currentBoard.title}
            />

            <ChangeBackground activeBtn={{ activeBg, setActiveBg }} />

            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default BoardEdit;