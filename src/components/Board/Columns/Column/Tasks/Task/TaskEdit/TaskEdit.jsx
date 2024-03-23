import { Form } from 'react-router-dom';
import './TaskEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setTitle } from '../../../../../../../redux/slices/tasksSlice';
import { setShow } from '../../../../../../../redux/slices/modalSlice';

const TaskEdit = () => {
    const tasks = useSelector(state => state.tasksReducer).tasks;
    const currentTask = useSelector(state => state.tasksReducer).current;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        tasks.forEach(task => {
            if (task.id !== currentTask.id) return;

            const target = e.target;

            const title = target.title.value;
            const description = target.description.value;

            if (title.length === 0) return;

            dispatch(setTitle({ title, id: task.id }));
            dispatch(setDescription({ description, id: task.id }));
            dispatch(setShow({ taskEdit: false }));
        });
    }

    return (
        <Form className="task-edit" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Task Title</label>
            <input type="text" name="title" defaultValue={currentTask.title} />

            <label htmlFor="description">Task Description</label>
            <textarea name="description" rows="3" defaultValue={currentTask.description}></textarea>

            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default TaskEdit;