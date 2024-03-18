import { useDispatch, useSelector } from 'react-redux';
import './Task.css';
import { setCurrentCard } from '../../../../../../redux/slices/dragSlice';
import { insertAfter } from '../../../../../../redux/slices/tasksSlice';

const Task = ({ data }) => {
    const dragData = useSelector(state => state.dragReducer);
    const dispatch = useDispatch();

    const hadleDragStart = (e, task) => {
        dispatch(setCurrentCard(task));
    }

    const handleDrop = (e, task) => {
        e.preventDefault();

        e.target.style = `
            box-shadow: none;
        `;

        const droppedTask = dragData.currentTask;

        if (droppedTask.id === task.id) return;

        dispatch(insertAfter({ droppedTask, task }));
    }

    const handleDragEnd = (e) => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    const hadleDragOver = e => {
        e.preventDefault();
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
            onDrag={e => hadleDragStart(e, data)}
            onDragEnd={e => handleDragEnd(e)}
            onDragOver={e => hadleDragOver(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDrop={e => handleDrop(e, data)}
        >
            {data.title}
        </h3>
    )
}

export default Task;