import { useDispatch, useSelector } from "react-redux";
import BoardComponent from "../components/Board/Board";
import { useLoaderData } from "react-router-dom";
import { resetShow, setShow } from "../redux/slices/modalSlice";
import Modal from "../components/Modal/Modal";
import { FaPencil } from "react-icons/fa6";
import BoardEdit from "../components/BoardEdit/BoardEdit";
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

    const board = boardsData.find(boardData => boardData.id === id);

    const showModal = useSelector(state => state.modalReducer).boardEdit;

    // Setting board's background
    useEffect(() => {
        dispatch(resetShow());

        if (board === undefined) return;

        const wrapper = document.querySelector('.wrapper');

        switch (board.background.active) {
            case 'url':
                wrapper.style = `
                    background: url(${board.background.data.bgUrl});
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                `;
                break;
            case 'color':
                wrapper.style = `background: ${board.background.data.bgColor}`;
                break;
            default:
                break;
        }

        return (() => {
            const wrapper = document.querySelector('.wrapper');
            wrapper.style = ``;
        })
    }, [board?.background]);

    if (board === undefined) return;

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

            {showModal && <Modal onClose={() => dispatch(resetShow())}><BoardEdit /></Modal>}
        </>
    );
}

export default Board;