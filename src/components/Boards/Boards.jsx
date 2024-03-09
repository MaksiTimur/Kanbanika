import { useSelector } from 'react-redux';
import BoardCard from "./BoardCard/BoardCard";
import './Boards.css';
import { useNavigate } from 'react-router-dom';

const Boards = () => {
    const boardsData = useSelector(state => state.boardsReducer);
    const boards = Array(boardsData.length);
    const navigate = useNavigate();

    const clickHandler = (id) => {
        navigate(`${id}`);
    }

    boardsData.forEach(boardData => {
        boards.push(
            <BoardCard
                data={boardData}
                key={boardData.id}
                clickHandler={id => clickHandler(id)}
            />
        )
    });

    return (
        <div className="boards">
            {boards}
        </div>
    )
}

export default Boards;