import { useDispatch, useSelector } from 'react-redux';
import { FaCirclePlus } from "react-icons/fa6";
import Column from './Column/Column';
import { create } from '../../../redux/slices/columnsSlice';
import './Columns.css';
import Modal from '../../Modal/Modal';
import ColumnEdit from './Column/ColumnEdit/ColumnEdit';
import TaskEdit from './Column/Tasks/Task/TaskEdit/TaskEdit';
import { resetShow } from '../../../redux/slices/modalSlice';

const Columns = ({ data }) => {
    const columnsData = useSelector(state => state.columnsReducer).columns;
    const columns = Array(columnsData.length);
    const dispatch = useDispatch();

    const showColumnModal = useSelector(state => state.modalReducer).columnEdit;
    const showTaskModal = useSelector(state => state.modalReducer).taskEdit;

    const tasks = useSelector(state => state.tasksReducer).tasks;
    const grouppedTasksByColumns = {};

    tasks.forEach(task => {
        if (grouppedTasksByColumns[task.column] === undefined) grouppedTasksByColumns[task.column] = [];

        grouppedTasksByColumns[task.column].push(task);
    });

    columnsData.forEach(columnData => {
        if (columnData.board !== data.id) return;

        const columnTasks = grouppedTasksByColumns[columnData.id];

        columns.push(
            <Column
                columnData={columnData}
                tasks={columnTasks ?? null}
                key={columnData.id}
                clickHandler={id => clickHandler(id)}
            />
        )
    });

    return (
        <>
            <div className="columns">
                {columns}
                <button
                    id='create-column'
                    key='create-column'
                    onClick={() => dispatch(create({ title: 'New Column', board: data.id }))}
                >
                    <FaCirclePlus />
                </button>
            </div >
            {showColumnModal && <Modal onClose={() => dispatch(resetShow())}><ColumnEdit /></Modal>}
            {showTaskModal && <Modal onClose={() => dispatch(resetShow())}><TaskEdit /></Modal>}
        </>
    )
}

export default Columns;
