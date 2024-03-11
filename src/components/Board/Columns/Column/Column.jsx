import './Column.css';
import Tasks from './Tasks/Tasks';

const Column = ({ data }) => {
    return (
        <div className='column'>
            <h2>{data.title}</h2>
            <Tasks data={data} />
        </div>
    )
}

export default Column;