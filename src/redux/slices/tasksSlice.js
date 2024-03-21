import { createSlice, current } from "@reduxjs/toolkit";

const init = JSON.parse(localStorage.getItem('tasks')) ?? { tasks: [], current: null };
init.tasks.sort((a, b) => a.column.localeCompare(b.column));

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: init,
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newTask = { type: "task", title: action.payload.title, id: self.crypto.randomUUID(), column: action.payload.column };

			state.tasks.push(newTask);
			state.tasks.sort((a, b) => a.column.localeCompare(b.column));

			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		insertAfter: (state, action) => {
			const { droppedTask, task } = action.payload;

			state.tasks.sort((a, b) => a.column.localeCompare(b.column));

			const droppedIndex = state.tasks.findIndex(stateTask => stateTask.id === droppedTask.id);
			const taskIndex = state.tasks.findIndex(stateTask => stateTask.id === task.id);

			state.tasks[droppedIndex].column = task.column;

			state.tasks.splice(droppedIndex, 1);

			if (droppedIndex > taskIndex) {
				state.tasks.splice(taskIndex + 1, 0, droppedTask);
			} else {
				state.tasks.splice(taskIndex, 0, droppedTask)
			}

			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		remove: (state, action) => {
			const task = action.payload;
			const taskIndex = state.tasks.findIndex(stateTask => stateTask.id === task.id);

			state.tasks.splice(taskIndex, 1);
			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		setColumn: (state, action) => {
			const task = action.payload.task;
			const columnId = action.payload.columnId;

			const taskInState = state.tasks.find(taskState => taskState.id === task.id);
			taskInState.column = columnId;
		}
	}
});

export const {
	setCurrent,
	create,
	insertAfter,
	remove,
	setColumn
} = tasksSlice.actions;

export default tasksSlice.reducer;