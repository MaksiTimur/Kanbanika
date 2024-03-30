import { useDispatch, useSelector } from 'react-redux';
import BoardCard from "./BoardCard/BoardCard";
import NewBoardCard from './BoardCard/NewBoardCard/NewBoardCard';
import './Boards.css';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { create as createBoard, remove as removeBoard, setCurrent } from '../../redux/slices/boardsSlice';
import DeletionZone from '../DeletionZone/DeletionZone';
import Modal from '../Modal/Modal';
import { resetShow } from '../../redux/slices/modalSlice';
import BoardEdit from '../BoardEdit/BoardEdit';
import { useEffect } from 'react';
import { create as createColumn } from '../../redux/slices/columnsSlice';
import { create as createTask } from '../../redux/slices/tasksSlice';

const Boards = () => {
    useEffect(() => {
        dispatch(resetShow());
    }, []);

    const boardsData = useSelector(state => state.boardsReducer).boards;
    const boards = Array(boardsData.length);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showModal = useSelector(state => state.modalReducer).boardEdit;

    const handleClick = (id) => {
        navigate(`${id}`);
    };

    const handleClose = () => {
        dispatch(resetShow());
    };

    const createTemplateBoard = () => {
        const boardId = self.crypto.randomUUID();
        const firstColumnId = self.crypto.randomUUID();

        dispatch(createBoard({ id: boardId }));

        dispatch(createColumn({ id: firstColumnId, title: 'Doing', board: boardId }));
        dispatch(createColumn({ title: 'Review', board: boardId }));
        dispatch(createColumn({ title: 'Done', board: boardId }));

        dispatch(createTask({ column: firstColumnId }));
        dispatch(createTask({ column: firstColumnId }));
    };

    boardsData.forEach(boardData => {
        boards.push(
            <BoardCard
                data={boardData}
                key={boardData.id}
                onClick={id => handleClick(id)}
            />
        );
    });

    return (
        <>
            <div className="boards">
                {boards}
                <NewBoardCard
                    data={{ title: <FaCirclePlus />, id: 'create-board' }}
                    key='create-board'
                    onClick={createTemplateBoard}
                />
            </div>
            
            <DeletionZone />

            {showModal && <Modal onClose={handleClose}><BoardEdit isNeedDeleteBtn={true} /></Modal>}
        </>
    )
}

export default Boards;