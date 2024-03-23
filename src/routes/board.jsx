import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/Board/Board";
import { useLoaderData } from "react-router-dom";
import { resetShow, setShow } from "../redux/slices/modalSlice";
import Modal from "../components/Modal/Modal";
import { FaPencil } from "react-icons/fa6";
import BoardRename from "../components/Boards/BoardRename/BoardRename";
import { useEffect } from "react";
import DeletionZone from "../components/DeletionZone/DeletionZone";
import { setCurrent } from "../redux/slices/boardsSlice";

export async function loader({ params }) {
    return params.boardId;
}

const Board = () => {
    useEffect(() => {
        dispatch(resetShow());
    }, []);

    const boardsData = useSelector(state => state.boardsReducer).boards;
    const id = useLoaderData();
    const dispatch = useDispatch();
    let board = null;
    const showModal = useSelector(state => state.modalReducer).boardRename;

    boardsData.forEach(boardData => {
        if (boardData.id != id) return;

        board = boardData;
    });

    return (
        <>
            <div className="board-title">
                <h1>
                    Board <span>{board.title}</span>
                </h1 >
                <button onClick={() => {
                    dispatch(setShow({ boardRename: true }));
                    dispatch(setCurrent(board));
                }}
                >
                    <FaPencil />
                </button>
            </div >
            <BoardComponent data={board} />
            <DeletionZone />
            {showModal && <Modal onClose={() => dispatch(setShow({ boardRename: false }))}><BoardRename /></Modal>}
        </>
    );
}

export default Board;