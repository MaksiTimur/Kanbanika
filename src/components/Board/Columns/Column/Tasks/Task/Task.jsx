import { useDispatch, useSelector } from 'react-redux';
import './Task.css';
import { insertAfter, setCurrent } from '../../../../../../redux/slices/tasksSlice';
import { setDraggable, setDragging } from '../../../../../../redux/slices/dragSlice';
import { setShow } from '../../../../../../redux/slices/modalSlice';

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

        e.target.classList.remove('dragging-down');
        e.currentTarget.classList.remove('dragging-inset');

        if (dragItem.id === task.id) return;

        dispatch(insertAfter({ droppedTask: dragItem, task }));
        dispatch(setDragging(false));
    }

    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging-down');
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
        e.currentTarget.classList.remove('dragging-inset');
    }

    return (
        <div
            className='task'
            id={data.id}
            onClick={() => {
                dispatch(setCurrent(data));
                dispatch(setShow({ taskEdit: true }));
            }}
            draggable
            onDrag={e => handleDragStart(e, data)}
            onDragEnd={e => handleDragEnd(e)}
            onDragOver={e => handleDragOver(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDrop={e => handleDrop(e, data)}
        >
            <h3 className='task-name'>{data.title}</h3>
            <p className="task-description">{data.description ?? ''}</p>
        </div>
    )
}

export default Task;