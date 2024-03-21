import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/Board/Board";
import { useLoaderData } from "react-router-dom";
import { show } from "../redux/slices/modalSlice";
import Modal from "../components/Modal/Modal";
import { FaPencil } from "react-icons/fa6";
import BoardRename from "../components/Boards/BoardRename/BoardRename";
import { useEffect } from "react";
import DeletionZone from "../components/DeletionZone/DeletionZone";

export async function loader({ params }) {
    return params.boardId;
}

const Board = () => {
    useEffect(() => {
        dispatch(show(false));
    }, []);

    const boardsData = useSelector(state => state.boardsReducer).boards;
    const id = useLoaderData();
    const dispatch = useDispatch();
    let board = null;

    boardsData.forEach(boardData => {
        if (boardData.id != id) return;

        board = boardData;
    });

    return (
        <>
            <h1 className="board-title">Board {board.title}
                <button onClick={() => dispatch(show(true))}>
                    <FaPencil />
                </button>
            </h1 >
            <BoardComponent data={board} />
            <DeletionZone />
            <Modal><BoardRename title={board.title} /></Modal>
        </>
    );
}

export default Board;