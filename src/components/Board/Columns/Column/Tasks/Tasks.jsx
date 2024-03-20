import { useDispatch, useSelector } from 'react-redux';
import Task from './Task/Task';
import { FaCirclePlus } from "react-icons/fa6";
import { create } from '../../../../../redux/slices/tasksSlice';
import './Tasks.css'

const Tasks = ({ data }) => {
    const tasksData = useSelector(state => state.tasksReducer).tasks;
    const tasks = Array(tasksData.length);
    const dispatch = useDispatch();

    tasksData.forEach(taskData => {
        if (taskData.column !== data.id) return;

        tasks.push(
            <Task
                data={taskData}
                key={taskData.id}
                clickHandler={id => clickHandler(id)}
            />
        )
    });

    return (
        <div className="tasks-wrapper">
            <div className='tasks'>
                {tasks}

            </div>
            <button
                id='create-task'
                key='create-task'
                onClick={() => dispatch(create({ title: 'New Task', column: data.id }))}
            >
                <FaCirclePlus />
            </button>
        </div>

    )
}

export default Tasks;