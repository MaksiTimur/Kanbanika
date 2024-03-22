import { useDispatch, useSelector } from 'react-redux';
import './Task.css';
import { insertAfter } from '../../../../../../redux/slices/tasksSlice';
import { setDraggable, setDragging } from '../../../../../../redux/slices/dragSlice';

const Task = ({ data }) => {
    const dragItem = useSelector(state => state.dragReducer).item;
    const dispatch = useDispatch();

    const handleDragStart = (e, task) => {
        dispatch(setDragging(true));
        dispatch(setDraggable(task));
    }

    const handleDrop = (e, task) => {
        e.preventDefault();

        if (dragItem.type !== 'task') return;

        e.target.style = `
            box-shadow: none;
        `;

        if (dragItem.id === task.id) return;

        dispatch(insertAfter({ droppedTask: dragItem, task }));
        dispatch(setDragging(false));
    }

    const handleDragEnd = (e) => {
        e.target.style = `
            box-shadow: none;
        `;

        dispatch(setDragging(false));
    }

    const handleDragOver = e => {
        e.preventDefault();

        if (dragItem.type !== 'task') return;

        e.target.style = `
            box-shadow: 0 4px #1a1c22;
        `;
    }

    const handleDragLeave = e => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    return (
        <h3
            className='task'
            draggable
            onDrag={e => handleDragStart(e, data)}
            onDragEnd={e => handleDragEnd(e)}
            onDragOver={e => handleDragOver(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDrop={e => handleDrop(e, data)}
        >
            {data.title}
        </h3>
    )
}

export default Task;