import { Form } from 'react-router-dom';
import './ColumnEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { setBackground, setTitle } from '../../../../../redux/slices/columnsSlice';
import { setShow } from '../../../../../redux/slices/modalSlice';
import { FaRegCircleXmark } from "react-icons/fa6";

const ColumnEdit = () => {
    const columns = useSelector(state => state.columnsReducer).columns;
    const currentColumn = useSelector(state => state.columnsReducer).current;
    const dispatch = useDispatch();

    let column = null;

    columns.forEach(columnData => {
        if (columnData.id !== currentColumn.id) return;

        column = columnData;
    });

    const handleSubmit = e => {
        e.preventDefault();

        const title = e.target.title.value;
        const background = e.target.background.value;

        if (title.length === 0) return;
        if (title.length > 20) return;

        dispatch(setTitle({ title, id: column.id }));
        dispatch(setBackground({ background, id: column.id }));
        dispatch(setShow({ columnEdit: false }));
    }

    const resetBgColor = e => {
        e.preventDefault();

        const inputColor = document.querySelector('.bg-color input');

        inputColor.value = '#242732';
    }


    return (
        <Form className="column-edit" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Column Title</label>
            <input type="text" name="title" minLength="1" maxLength="20" defaultValue={currentColumn.title} />

            <label htmlFor="background">Column Background</label>
            <div className="bg-color">
                <button onClick={e => resetBgColor(e)}><FaRegCircleXmark /></button>
                <input type="color" name="background" defaultValue={currentColumn.background ?? '#242732'} />
            </div>

            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default ColumnEdit;