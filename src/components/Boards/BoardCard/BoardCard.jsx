import './BoardCard.css';
import { useDispatch } from 'react-redux';

const BoardCard = ({ data, onClick }) => {
    const dispatch = useDispatch();

    return (
        <div className="board-card" id={data.id} onClick={() => onClick(data.id)}>
            <h2 className="title">{data.title}</h2>
        </div>
    )
}

export default BoardCard;