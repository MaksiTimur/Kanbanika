import { Form, useLoaderData } from 'react-router-dom';
import './BoardRename.css'
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../redux/slices/boardsSlice';

const BoardRename = ({ closeOnSubmit, title }) => {
    const boards = useSelector(state => state.boardsReducer);
    const boardId = useLoaderData();
    const dispatch = useDispatch();

    const handleSubmit = e => {
        boards.forEach(board => {
            if (board.id !== boardId) return;

            const value = e.target.title.value;

            if (value.length === 0) return; 

            dispatch(setTitle({ value: value, id: board.id }));
            closeOnSubmit();
        });
    }

    return (
        <Form className="board-rename" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Board Title</label>
            <input type="text" name="title" defaultValue={title} />
            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default BoardRename;