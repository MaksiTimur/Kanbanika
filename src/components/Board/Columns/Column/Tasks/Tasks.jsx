import { useDispatch } from 'react-redux';
import Task from './Task/Task';
import { FaCirclePlus } from "react-icons/fa6";
import { create } from '../../../../../redux/slices/tasksSlice';
import './Tasks.css'

const Tasks = ({ data, tasks }) => {
    const dispatch = useDispatch();

    const tasksComponents = Array(tasks?.length ?? 0);

    if (tasks) {
        tasks.forEach(task => {
            tasksComponents.push(
                <Task
                    taskData={task}
                    key={task.id}
                    clickHandler={id => clickHandler(id)}
                />
            );
        });
    }

    return (
        <div className="tasks-wrapper">
            <div className='tasks'>
                {tasksComponents}
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