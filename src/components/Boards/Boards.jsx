import { useDispatch, useSelector } from 'react-redux';
import BoardCard from "./BoardCard/BoardCard";
import NewBoardCard from './BoardCard/NewBoardCard/NewBoardCard';
import './Boards.css';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { create } from '../../redux/slices/boardsSlice';
import DeletionZone from '../DeletionZone/DeletionZone';
import Modal from '../Modal/Modal';
import { resetShow } from '../../redux/slices/modalSlice';
import BoardEdit from '../BoardEdit/BoardEdit';
import { useEffect } from 'react';

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
                    onClick={() => dispatch(create({ title: 'New Board' }))}
                />
            </div>
            <DeletionZone />
            {showModal && <Modal onClose={() => dispatch(resetShow())}><BoardEdit /></Modal>}
        </>
    )
}

export default Boards;