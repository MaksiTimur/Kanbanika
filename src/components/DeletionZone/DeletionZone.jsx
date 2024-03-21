import { useDispatch, useSelector } from 'react-redux';
import './DeletionZone.css';
import { FaTrashCan } from "react-icons/fa6";
import { remove as removeTask } from '../../redux/slices/tasksSlice';
import { remove as removeColumn } from '../../redux/slices/columnsSlice';
import { remove as removeBoard } from '../../redux/slices/boardsSlice';
import { setDragging } from '../../redux/slices/dragSlice';

const DeletionZone = () => {
    const dragData = useSelector(state => state.dragReducer);
    const isNeedToShow = dragData.isDragging;
    const dispatch = useDispatch();

    const handleDragOver = e => {
        e.preventDefault();

        e.currentTarget.style = `
            background: rgba(255, 0, 0, .3);
        `;
    }

    const handleDrop = e => {
        e.currentTarget.style = `
            background: rgba(255, 0, 0, .25);
        `;

        const element = dragData.item;
        switch (element.type) {
            case 'task':
                dispatch(removeTask(element));
                break;
            case 'column':
                dispatch(removeColumn(element));
                break;
            case 'board':
                dispatch(removeBoard(element));
                break;
            default:
                break;
        }

        dispatch(setDragging(false));
    }

    const handleDragLeave = e => {
        e.target.style = `
            background: rgba(255, 0, 0, .25);
        `;
    }

    return (
        isNeedToShow && <div
            id='deletion-zone'
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e)}
            onDragLeave={e => handleDragLeave(e)}
        >
            <FaTrashCan />
        </div >
    )
}

export default DeletionZone;