import { Form } from 'react-router-dom';
import './TaskEdit.css'
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../../../../../redux/slices/tasksSlice';
import { setShow } from '../../../../../../../redux/slices/modalSlice';

const TaskEdit = () => {
    const tasks = useSelector(state => state.tasksReducer).tasks;
    const currentTask = useSelector(state => state.tasksReducer).current;
    const dispatch = useDispatch();

    const handleSubmit = e => {
        tasks.forEach(task => {
            if (task.id !== currentTask.id) return;

            const value = e.target.title.value;
            task = task;

            if (value.length === 0) return;

            dispatch(setTitle({ value, id: task.id }));
            dispatch(setShow({ taskEdit: false }));
        });
    }

    return (
        <Form className="task-edit" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="title">Task Title</label>
            <input type="text" name="title" defaultValue={currentTask.title} />
            <button type='submit'>Confirm</button>
        </Form>
    );
}
export default TaskEdit;