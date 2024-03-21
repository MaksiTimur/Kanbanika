import { useDispatch, useSelector } from 'react-redux';
import './Column.css';
import Tasks from './Tasks/Tasks';
import { setColumn } from '../../../../redux/slices/tasksSlice';
import { FaPencil } from "react-icons/fa6";
import { resetShow, setShow } from '../../../../redux/slices/modalSlice';
import { useEffect } from 'react';
import { setCurrent } from '../../../../redux/slices/columnsSlice';
import { setDragging } from '../../../../redux/slices/dragSlice';

const Column = ({ data }) => {
    useEffect(() => {
        dispatch(resetShow());
    }, []);

    const task = useSelector(state => state.dragReducer).item;
    const dispatch = useDispatch();

    const handleDragOver = e => {
        e.preventDefault();

        const tasksElements = e.currentTarget.children[1].children[0];

        if (tasksElements.children.length) return;

        e.currentTarget.style = `
            -webkit-box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.75);
            box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.75);
        `;
    }

    const handleTaskDrop = (e, column) => {
        const columnId = column.id;

        dispatch(setColumn({ task, columnId }));

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
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleTaskDrop(e, data)}
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