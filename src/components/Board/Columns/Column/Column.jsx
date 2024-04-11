import { useDispatch, useSelector } from 'react-redux';
import './Column.css';
import Tasks from './Tasks/Tasks';
import { setColumn } from '../../../../redux/slices/tasksSlice';
import { FaPencil } from "react-icons/fa6";
import { setShow } from '../../../../redux/slices/modalSlice';
import { useEffect } from 'react';
import { insertAfter, setCurrent } from '../../../../redux/slices/columnsSlice';
import { setDraggable, setIsDragging } from '../../../../redux/slices/dragSlice';

const Column = ({ columnData, tasks }) => {
    useEffect(() => {
        const column = document.getElementById(columnData.id);

        column.style = `background: ${columnData.background}`;
    }, [columnData.background]);

    const dragItem = useSelector(state => state.dragReducer).item;
    const dispatch = useDispatch();

    const handleDragStart = (e, column) => {
        if (e.target.className !== 'column') return;

        dispatch(setIsDragging(true));
        dispatch(setDraggable(column));
    }

    const handleDragOver = e => {
        e.preventDefault();

        switch (dragItem.type) {
            case 'task':
                const tasksElements = e.currentTarget.children[1].children[0];

                if (tasksElements.children.length) return;

                e.currentTarget.classList.add('dragging-inset');
                break;
            case 'column':
                if (e.currentTarget.id === dragItem.id) return;

                e.currentTarget.classList.add('dragging-right');
                break;
            default:
                break;
        }
    }

    const handleDrop = (e, column) => {
        const columnId = column.id;

        switch (dragItem.type) {
            case 'task':
                dispatch(setColumn({ task: dragItem, columnId }));

                e.currentTarget.classList.remove('dragging-down');
                e.currentTarget.classList.remove('dragging-inset');

                break;
            case 'column':
                dispatch(insertAfter({ droppedColumn: dragItem, column }));

                e.currentTarget.classList.remove('dragging-right');
                e.currentTarget.classList.remove('dragging-inset');

                break;
            default:
                break;
        }

        dispatch(setIsDragging(false));
    }

    const handleDragLeave = e => {
        e.target.classList.remove('dragging-right');
        e.currentTarget.classList.remove('dragging-right');

        e.target.classList.remove('dragging-inset');
        e.currentTarget.classList.remove('dragging-inset');
    }

    const handleDragEnd = e => {
        e.target.classList.remove('dragging-right');

        e.target.classList.remove('dragging-inset');
        e.currentTarget.classList.remove('dragging-inset');

        dispatch(setIsDragging(false));
    }

    return (
        <div
            className='column'
            id={columnData.id}
            draggable
            onDrag={e => handleDragStart(e, columnData)}
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e, columnData)}
            onDragLeave={e => handleDragLeave(e)}
            onDragEnd={e => handleDragEnd(e)}
        >
            <div className="column-header">
                <h2>{columnData.title}</h2>
                <button onClick={() => {
                    dispatch(setCurrent(columnData));
                    dispatch(setShow({ columnEdit: true }));
                }}>
                    <FaPencil />
                </button>
            </div>
            <Tasks data={columnData} tasks={tasks} />
        </div >
    )
}

export default Column;
