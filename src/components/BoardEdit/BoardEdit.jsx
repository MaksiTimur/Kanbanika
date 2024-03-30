import { Form, useNavigate } from 'react-router-dom';
import './ChangeBackground/ChangeBackground'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBackground, setBackground, setTitle } from '../../redux/slices/boardsSlice';
import { resetShow, setShow } from '../../redux/slices/modalSlice';
import ChangeBackground from './ChangeBackground/ChangeBackground';
import { useState } from 'react';
import { FaTrashCan } from "react-icons/fa6";
import './BoardEdit.css';
import { removeByColumns as removeTasksByColumns } from '../../redux/slices/tasksSlice';
import { removeByBoard as removeColumnsByBoard } from '../../redux/slices/columnsSlice';

const BoardEdit = () => {
    const currentBoard = useSelector(state => state.boardsReducer).current;
    const columns = useSelector(state => state.columnsReducer).columns;

    const dispatch = useDispatch();

    const [activeBg, setActiveBg] = useState(currentBoard.background.active);

    const handleSubmit = e => {
        e.preventDefault();

        const title = e.target.title.value;

        if (title.length === 0) return;
        if (title.length > 20) return;

        switch (activeBg) {
            case 'color':
                const bgColor = e.target.bgColor.value;

                dispatch(setActiveBackground({ id: currentBoard.id, type: 'color' }));
                dispatch(setBackground({ type: 'bgColor', background: bgColor, id: currentBoard.id }));

                break;
            case 'url':
                const bgUrl = e.target.bgUrl.value;

                const image = new Image();
                image.src = bgUrl;

                image.addEventListener('load', () => {
                    dispatch(setActiveBackground({ id: currentBoard.id, type: 'url' }));
                    dispatch(setBackground({ type: 'bgUrl', background: bgUrl, id: currentBoard.id }));
                });

                break;
            default:
                break;
        }

        dispatch(setTitle({ title, id: currentBoard.id }));
        dispatch(setShow({ boardEdit: false }));
    }

    const deleteContent = () => {
        const boardColumns = {};

        columns.forEach(column => {
            if (column.board !== currentBoard.id) return;

            boardColumns[column.id] = null;
        });

        dispatch(removeColumnsByBoard(currentBoard));
        dispatch(removeTasksByColumns(boardColumns));

        dispatch(resetShow());
    }

    return (
        <>
            <Form className="board-edit" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="title">Board Title</label>
                <input
                    required
                    type="text"
                    name="title"
                    maxLength="20"
                    defaultValue={currentBoard.title}
                />

                <ChangeBackground activeBtn={{ activeBg, setActiveBg }} />

                <button type='submit'>Confirm</button>
            </Form>
            <Form method='post' action={`/boards/${currentBoard.id}/delete`} onSubmit={deleteContent}>
                <button className='delete-btn' type='submit'><FaTrashCan /></button>
            </Form>
        </>
    );
}
export default BoardEdit;