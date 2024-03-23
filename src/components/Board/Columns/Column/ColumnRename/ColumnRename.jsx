import { Form } from 'react-router-dom';
import './ColumnRename.css'
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../../../redux/slices/columnsSlice';
import { setShow } from '../../../../../redux/slices/modalSlice';

const ColumnRename = () => {
    const columns = useSelector(state => state.columnsReducer).columns;
    const currentColumn = useSelector(state => state.columnsReducer).current;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        columns.forEach(column => {
            if (column.id !== currentColumn.id) return;

            const value = e.target.title.value;

            if (value.length === 0) return;

            dispatch(setTitle({ value, id: column.id }));
            dispatch(setShow({ columnRename: false }));
        });
    }

    return (
        <Form className="column-rename" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Column Title</label>
            <input type="text" name="title" defaultValue={currentColumn.title} />
            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default ColumnRename;