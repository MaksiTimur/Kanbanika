import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/Board/Board";
import { useLoaderData } from "react-router-dom";
import { resetShow, setShow } from "../redux/slices/modalSlice";
import Modal from "../components/Modal/Modal";
import { FaPencil } from "react-icons/fa6";
import BoardEdit from "../components/Boards/BoardEdit/BoardEdit";
import { useEffect } from "react";
import DeletionZone from "../components/DeletionZone/DeletionZone";
import { setCurrent } from "../redux/slices/boardsSlice";

export async function loader({ params }) {
    return params.boardId;
}

const Board = () => {
    const boardsData = useSelector(state => state.boardsReducer).boards;
    const id = useLoaderData();
    const dispatch = useDispatch();
    let board = null;

    const showModal = useSelector(state => state.modalReducer).boardEdit;

    boardsData.forEach(boardData => {
        if (boardData.id != id) return;

        board = boardData;
    });

    useEffect(() => {
        dispatch(resetShow());

        const wrapper = document.querySelector('.wrapper');

        wrapper.style = `background: ${board.background}`;
    }, [board.background]);

    return (
        <>
            <div className="board-title">
                <h1>
                    Board <span>{board.title}</span>
                </h1 >
                <button onClick={() => {
                    dispatch(setShow({ boardEdit: true }));
                    dispatch(setCurrent(board));
                }}
                >
                    <FaPencil />
                </button>
            </div >
            <BoardComponent data={board} />
            <DeletionZone />
            {showModal && <Modal onClose={() => dispatch(setShow({ boardEdit: false }))}><BoardEdit /></Modal>}
        </>
    );
}

export default Board;