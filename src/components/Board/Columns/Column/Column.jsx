import { useDispatch, useSelector } from 'react-redux';
import './Column.css';
import Tasks from './Tasks/Tasks';
import { setColumn } from '../../../../redux/slices/tasksSlice';

const Column = ({ data }) => {
    const dragData = useSelector(state => state.dragReducer);
    const dispatch = useDispatch();

    const handleDragOver = e => {
        e.preventDefault();

        const tasksElements = e.currentTarget.children[1].children[0];

        if (tasksElements.children.length) return;

        e.currentTarget.style = `
            -webkit-box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.75);
            box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.75);
        `;
    }

    const handleCardDrop = (e, column) => {
        const task = dragData.currentTask;
        const columnId = column.id;

        dispatch(setColumn({ task, columnId }));

        e.currentTarget.style = `
            box-shadow: none;
        `;
    }

    const handleDragLeave = e => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    const handleDragEnd = e => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    return (
        <div
            className='column'
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleCardDrop(e, data)}
            onDragLeave={e => handleDragLeave(e)}
            onDragEnd={e => handleDragEnd(e)}
        >
            <h2>{data.title}</h2>
            <Tasks data={data} />
        </div>
    )
}

export default Column;