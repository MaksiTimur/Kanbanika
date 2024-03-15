import './Task.css';

const Task = ({ data }) => {
    return (
        <h3 className='task'>{data.title}</h3>
    )
}

export default Task;