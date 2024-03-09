import './BoardCard.css';

const Board = ({ data, clickHandler }) => {
    return (
        <div className="board-card" id={data.id} onClick={() => clickHandler(data.id)}>
            <h2 className="board-title">{data.title}</h2>
        </div>
    )
}

export default Board;