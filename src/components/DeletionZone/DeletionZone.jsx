import { useDispatch, useSelector } from 'react-redux';
import './DeletionZone.css';
import { FaTrashCan } from "react-icons/fa6";
import { removeByColumns as removeTasksByColumns, remove as removeTask } from '../../redux/slices/tasksSlice';
import { removeByBoard as removeColumnsByBoard, remove as removeColumn } from '../../redux/slices/columnsSlice';
import { remove as removeBoard } from '../../redux/slices/boardsSlice';
import { setIsDragging } from '../../redux/slices/dragSlice';

const DeletionZone = () => {
    const dragData = useSelector(state => state.dragReducer);
    const isNeedToShow = dragData.isDragging;
    const dispatch = useDispatch();

    const columns = useSelector(state => state.columnsReducer).columns;

    const handleDragOver = e => {
        e.preventDefault();

        e.currentTarget.style = `background: var(--warning-hover-color);`;
        e.currentTarget.firstChild.style = `background: none;`
    }

    const handleDrop = e => {
        e.currentTarget.style = `background: var(--warning-color);`;
        e.currentTarget.firstChild.style = `background: none;`

        const element = dragData.item;

        switch (element.type) {
            case 'task':
                dispatch(removeTask(element));
                break;

            case 'column':
                const columnId = element.id;
                const column = {};
                column[columnId] = null;

                dispatch(removeColumn(element));
                dispatch(removeTasksByColumns(column));
                break;

            case 'board':
                const boardColumns = {};

                columns.forEach(column => {
                    if (column.board !== element.id) return;

                    boardColumns[column.id] = null;
                });

                dispatch(removeBoard(element));
                dispatch(removeColumnsByBoard(element));
                dispatch(removeTasksByColumns(boardColumns));
                break;

            default:
                break;
        }

        dispatch(setIsDragging(false));
    }

    const handleDragLeave = e => {
        e.currentTarget.style = `background: var(--warning-color);`;
        e.currentTarget.firstChild.style = `background: none;`
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