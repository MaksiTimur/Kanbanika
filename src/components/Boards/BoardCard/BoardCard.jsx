import { useDispatch } from 'react-redux';
import './BoardCard.css';
import { setDraggable, setDragging } from '../../../redux/slices/dragSlice';

const BoardCard = ({ data, onClick }) => {
    const dispatch = useDispatch();

    const handleDragStart = (e, data) => {
        dispatch(setDraggable(data));
        dispatch(setDragging(true));
    };

    const handleDragEnd = e => {
        dispatch(setDragging(false));
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDragLeave = e => {

    };

    const handleDrop = (e, data) => {
        e.preventDefault();
        dispatch(setDragging(false));
    };

    return (
        <div
            className="board-card"
            id={data.id}
            draggable
            onClick={() => onClick(data.id)}
            onDrag={e => handleDragStart(e, data)}
            onDragEnd={e => handleDragEnd(e)}
            onDragOver={e => handleDragOver(e)}
            onDragLeave={e => handleDragLeave(e)}
            onDrop={e => handleDrop(e, data)}
        >
            <h2 className="title">{data.title}</h2>
        </div>
    )
}

export default BoardCard;