import { useDispatch, useSelector } from 'react-redux';
import './Task.css';
import { setCurrentTask } from '../../../../../../redux/slices/currentSlice';
import { insertAfter } from '../../../../../../redux/slices/tasksSlice';

const Task = ({ data }) => {
    const currentData = useSelector(state => state.currentReducer);
    const dispatch = useDispatch();

    const handleDragStart = (e, task) => {
        dispatch(setCurrentTask(task));
    }

    const handleDrop = (e, task) => {
        e.preventDefault();

        e.target.style = `
            box-shadow: none;
        `;

        const droppedTask = currentData.currentTask;

        if (droppedTask.id === task.id) return;

        dispatch(insertAfter({ droppedTask, task }));
    }

    const handleDragEnd = (e) => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    const handleDragOver = e => {
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