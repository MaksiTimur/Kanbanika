import { Form, useLoaderData } from 'react-router-dom';
import './ColumnRename.css'
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../../../redux/slices/columnsSlice';
import { show } from '../../../../../redux/slices/modalSlice';

const ColumnRename = ({ title }) => {
    const columns = useSelector(state => state.columnsReducer);
    const currectColumn = useSelector(state => state.currentReducer).currentColumn;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        columns.forEach(column => {
            if (column.id !== currectColumn.id) return;

            const value = e.target.title.value;

            if (value.length === 0) return;

            dispatch(setTitle({ value, id: column.id }));
            dispatch(show(false));
        });
    }

    if (!title) {
        const currentData = useSelector(state => state.currentReducer);
        const currentColumn = currentData.currentColumn;

        const column = columns.find(column => column.id === currentColumn.id);
        title = column.title;
    }

    return (
        <Form className="column-rename" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Column Title</label>
            <input type="text" name="title" defaultValue={title} />
            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default ColumnRename;