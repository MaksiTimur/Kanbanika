import { Form } from 'react-router-dom';
import './TaskEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { remove as removeTask, setDescription, setPriority, setTitle } from '../../../../../../../redux/slices/tasksSlice';
import { resetShow, setShow } from '../../../../../../../redux/slices/modalSlice';
import { FaTrashCan } from "react-icons/fa6";

const TaskEdit = () => {
    const tasks = useSelector(state => state.tasksReducer).tasks;
    const currentTask = useSelector(state => state.tasksReducer).current;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        tasks.forEach(task => {
            if (task.id !== currentTask.id) return;

            const target = e.target;

            const title = target.title.value;
            const description = target.description.value;
            const priority = target.priority.value;

            if (title.length === 0) return;
            if (title.length > 24) return;

            if (description.length > 160) return;

            dispatch(setTitle({ title, id: task.id }));
            dispatch(setDescription({ description, id: task.id }));
            dispatch(setPriority({ priority, id: task.id }))
            dispatch(setShow({ taskEdit: false }));
        });
    }

    const deleteTask = () => {
        dispatch(removeTask(currentTask));

        dispatch(resetShow());
    }

    return (
        <>
            <Form className="task-edit" onSubmit={e => handleSubmit(e)}>
                <label htmlFor="title">Task Title</label>
                <input type="text" name="title" minLength="1" maxLength="24" defaultValue={currentTask.title} />

                <label htmlFor="description">Task Description</label>
                <textarea name="description" rows="4" maxLength="160" defaultValue={currentTask.description}></textarea>

                <label htmlFor="priority">Priority</label>
                <select name="priority" defaultValue={currentTask.priority}>
                    <option value={null}>No priority</option>
                    <option value={1}>First</option>
                    <option value={2}>Second</option>
                    <option value={3}>Third</option>
                </select>

                <button type='submit'>Confirm</button>
            </Form>
            <button className='delete-btn' type='button' onClick={deleteTask}><FaTrashCan /></button>
        </>
    );
}
export default TaskEdit;