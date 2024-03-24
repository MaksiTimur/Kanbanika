import { useDispatch, useSelector } from 'react-redux';
import './BoardCard.css';
import { insertAfter } from '../../../redux/slices/boardsSlice';
import { setDraggable, setDragging } from '../../../redux/slices/dragSlice';

const BoardCard = ({ data, onClick }) => {
    const droppedBoard = useSelector(state => state.dragReducer).item;
    const dispatch = useDispatch();

    const handleDragStart = (e, data) => {
        dispatch(setDraggable(data));
        dispatch(setDragging(true));
    };

    const handleDrop = (e, board) => {
        e.preventDefault();

        e.currentTarget.classList.remove('dragging-right');

        if (droppedBoard.id === board.id) return;

        dispatch(insertAfter({ droppedBoard, board }));
        dispatch(setDragging(false));
    };

    const handleDragEnd = e => {
        e.currentTarget.classList.remove('dragging-right');

        dispatch(setDragging(false));
    };

    const handleDragOver = e => {
        e.preventDefault();

        e.currentTarget.classList.add('dragging-right');
    };

    const handleDragLeave = e => {
        e.currentTarget.classList.remove('dragging-right');
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