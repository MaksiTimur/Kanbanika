import { useDispatch, useSelector } from 'react-redux';
import './Task.css';
import { insertAfter, setCurrent } from '../../../../../../redux/slices/tasksSlice';
import { setDraggable, setDragging } from '../../../../../../redux/slices/dragSlice';
import { setShow } from '../../../../../../redux/slices/modalSlice';
import { useEffect } from 'react';

const Task = ({ taskData }) => {
    useEffect(() => {
        const task = document.getElementById(taskData.id);

        switch (taskData.priority) {
            case '1':
                task.classList.add('first-priority');
                task.classList.remove('second-priority');
                task.classList.remove('third-priority');
                break;
            case '2':
                task.classList.remove('first-priority');
                task.classList.add('second-priority');
                task.classList.remove('third-priority');
                break;
            case '3':
                task.classList.remove('first-priority');
                task.classList.remove('second-priority');
                task.classList.add('third-priority');
                break;
            default:
                task.classList.remove('first-priority');
                task.classList.remove('second-priority');
                task.classList.remove('third-priority');
                break;
        }
    }, [taskData.priority]);

    const dragItem = useSelector(state => state.dragReducer).item;
    const dispatch = useDispatch();

    const handleDragStart = (e, task) => {
        dispatch(setDragging(true));
        dispatch(setDraggable(task));
    }

    const handleDrop = (e, task) => {
        e.preventDefault();

        if (dragItem.type !== 'task') return;

        e.target.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-inset');

        if (dragItem.id === task.id) return;

        dispatch(insertAfter({ droppedTask: dragItem, task }));
        dispatch(setDragging(false));
    }

    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-inset');

        dispatch(setDragging(false));
    }

    const handleDragOver = e => {
        e.preventDefault();

        if (dragItem.type !== 'task') return;
        if (e.currentTarget.id === dragItem.id) return;

        e.currentTarget.classList.add('dragging-down');
    }

    const handleDragLeave = e => {
        e.target.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-inset');
    }

    return (
        <div
            className={`task`}
            id={taskData.id}
            onClick={() => {
                dispatch(setCurrent(taskData));
                dispatch(setShow({ taskEdit: true }));
            }}
            draggable
            onDrag={e => handleDragStart(e, taskData)}
            onDragEnd={e => handleDragEnd(e)}
            onDragOver={e => handleDragOver(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDrop={e => handleDrop(e, taskData)}
        >
            <h3>{taskData.title}</h3>
            <p>{taskData.description ?? ''}</p>
        </div>
    )
}

export default Task;
