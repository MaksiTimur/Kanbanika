import { useDispatch, useSelector } from 'react-redux';
import BoardCard from "./BoardCard/BoardCard";
import NewBoardCard from './BoardCard/NewBoardCard/NewBoardCard';
import './Boards.css';
import { useNavigate } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
import { create } from '../../redux/slices/boardsSlice';
import DeletionZone from '../DeletionZone/DeletionZone';
import { useEffect } from 'react';

const Boards = () => {
    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.style = ``;
    }, [])

    const boardsData = useSelector(state => state.boardsReducer).boards;
    const boards = Array(boardsData.length);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        </>
    )
}

export default Boards;