import { useDispatch, useSelector } from 'react-redux';
import { FaCirclePlus } from "react-icons/fa6";
import Column from './Column/Column';
import { create } from '../../../redux/slices/columnsSlice';
import './Columns.css';

const Columns = ({ data }) => {
    const columnsData = useSelector(state => state.columnsReducer);
    const columns = Array(columnsData.length);
    const dispatch = useDispatch();

    columnsData.forEach(columnData => {
        if (columnData.board !== data.id) return;

        columns.push(
            <Column
                data={columnData}
                key={columnData.id}
                clickHandler={id => clickHandler(id)}
            />
        )
    });

    return (
        <div className="columns">
            {columns}
            <button
                id='create-column'
                key='create-column'
                onClick={() => dispatch(create({ title: 'New Column', board: data.id }))}
            >
                <FaCirclePlus />
            </button>
        </div >
    )
}

export default Columns;
