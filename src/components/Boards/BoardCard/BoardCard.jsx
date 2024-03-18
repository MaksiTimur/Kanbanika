import './BoardCard.css';

const BoardCard = ({ data, onClick }) => {
    return (
        <div className="board-card" id={data.id} onClick={() => onClick(data.id)}>
            <h2 className="title">{data.title}</h2>
        </div>
    )
}

export default BoardCard;