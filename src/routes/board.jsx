import { useSelector } from "react-redux";
import BoardComponent from "../components/Board/Board";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    return params.boardId;
}

const Board = () => {
    const boardsData = useSelector(state => state.boardsReducer);
    const id = useLoaderData();
    let board = null;

    boardsData.forEach(boardData => {
        if (boardData.id != id) return;

        board = boardData;
    });

    return (
        <>
            <h1>Board {board.title}</h1>
            <BoardComponent data={board} />
        </>
    );
}

export default Board;