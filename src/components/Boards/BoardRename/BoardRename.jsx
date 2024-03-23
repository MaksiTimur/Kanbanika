import { Form, useLoaderData } from 'react-router-dom';
import './BoardRename.css'
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../redux/slices/boardsSlice';
import { setShow } from '../../../redux/slices/modalSlice';

const BoardRename = () => {
    const boards = useSelector(state => state.boardsReducer).boards;
    const currentBoard = useSelector(state => state.boardsReducer).current;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        boards.forEach(board => {
            if (board.id !== currentBoard.id) return;

            const value = e.target.title.value;

            if (value.length === 0) return;

            dispatch(setTitle({ value, id: board.id }));
            dispatch(setShow({ boardRename: false }));
        });
    }

    return (
        <Form className="board-rename" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Board Title</label>
            <input type="text" name="title" defaultValue={currentBoard.title} />
            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default BoardRename;