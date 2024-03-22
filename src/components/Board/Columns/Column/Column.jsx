import { useDispatch, useSelector } from 'react-redux';
import './Column.css';
import Tasks from './Tasks/Tasks';
import { setColumn } from '../../../../redux/slices/tasksSlice';
import { FaPencil } from "react-icons/fa6";
import { resetShow, setShow } from '../../../../redux/slices/modalSlice';
import { useEffect } from 'react';
import { insertAfter, setCurrent } from '../../../../redux/slices/columnsSlice';
import { setDraggable, setDragging } from '../../../../redux/slices/dragSlice';

const Column = ({ data }) => {
    useEffect(() => {
        dispatch(resetShow());
    }, []);

    const dragItem = useSelector(state => state.dragReducer).item;
    const dispatch = useDispatch();

    const handleDragStart = (e, column) => {
        if (e.target.className !== 'column') return;

        dispatch(setDragging(true));
        dispatch(setDraggable(column));
    }

    const handleDragOver = e => {
        e.preventDefault();

        switch (dragItem.type) {
            case 'task':
                const tasksElements = e.currentTarget.children[1].children[0];

                if (tasksElements.children.length) return;

                e.currentTarget.style = `
                    box-shadow: inset 0px 0px 8px 0px var(--contrast-color);
                `;

                break;
            case 'column':
                e.currentTarget.style = `
                    box-shadow: 4px 0px 0px 0px var(--contrast-color);
                `;

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
                break;
            case 'column':
                dispatch(insertAfter({ droppedColumn: dragItem, column }))
                break;
            default:
                break;
        }

        e.currentTarget.style = `
            box-shadow: none;
        `;

        dispatch(setDragging(false));
    }

    const handleDragLeave = e => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    const handleDragEnd = e => {
        e.target.style = `
            box-shadow: none;
        `;
    }

    return (
        <div
            className='column'
            draggable
            onDrag={e => handleDragStart(e, data)}
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e, data)}
            onDragLeave={e => handleDragLeave(e)}
            onDragEnd={e => handleDragEnd(e)}
        >
            <div className="column-header">
                <h2>{data.title}</h2>
                <button onClick={() => {
                    dispatch(setCurrent(data));
                    dispatch(setShow({ columnRename: true }));
                }}>
                    <FaPencil />
                </button>
            </div>
            <Tasks data={data} />
        </div >
    )
}

export default Column;