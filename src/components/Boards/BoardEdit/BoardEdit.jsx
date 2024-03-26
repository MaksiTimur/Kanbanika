import { Form } from 'react-router-dom';
import './BoardEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBackground, setBackground, setTitle } from '../../../redux/slices/boardsSlice';
import { setShow } from '../../../redux/slices/modalSlice';
import ChangeBackground from './ChangeBackground/ChangeBackground';

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
        if (title.length === 0) return;

        const typesBtns = document.querySelectorAll('.change-bg .bg-types button');

        switch (typesBtns[0].classList[1]) {
            case 'active':
                const bgColor = e.target.bgColor.value;

                dispatch(setActiveBackground({ id: board.id, type: 'color' }));
                dispatch(setBackground({ type: 'color', background: bgColor, id: board.id }));

                break;
            case undefined:
                const bgUrl = e.target.bgUrl.value;

                dispatch(setActiveBackground({ id: board.id, type: 'url' }));
                dispatch(setBackground({ type: 'url', background: bgUrl, id: board.id }));

                break;
            default:
                break;
        }

        dispatch(setTitle({ title, id: board.id }));

        dispatch(setShow({ boardEdit: false }));
    }

    return (
        <Form className="board-edit" onSubmit={e => handleSubmit(e)} action=''>
            <label htmlFor="title">Board Title</label>
            <input
                type="text"
                name="title"
                onKeyDown={e => {
                    if (e.key == "Enter") e.preventDefault()
                }}
                defaultValue={currentBoard.title}
            />

            <ChangeBackground></ChangeBackground>

            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default BoardEdit;