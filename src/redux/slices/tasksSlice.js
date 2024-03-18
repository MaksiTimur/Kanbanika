import { createSlice, current } from "@reduxjs/toolkit";

const init = JSON.parse(localStorage.getItem('tasks')) ?? [];
init.sort((a, b) => a.column.localeCompare(b.column));

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: init,
	reducers: {
		create: (state, action) => {
			const newTask = { title: action.payload.title, id: self.crypto.randomUUID(), column: action.payload.column };

			state.push(newTask);
			state.sort((a, b) => a.column.localeCompare(b.column));

			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		insertAfter: (state, action) => {
			const { droppedTask, task } = action.payload;

			const droppedTaskInState = state.find(stateTask => stateTask.id === droppedTask.id);
			const taskInState = state.find(stateTask => stateTask.id === task.id);

			droppedTaskInState.column = taskInState.column;

			state.sort((a, b) => a.column.localeCompare(b.column));

			const droppedIndex = state.indexOf(droppedTaskInState);
			const taskIndex = state.indexOf(taskInState);

			state.splice(droppedIndex, 1);

			if (droppedIndex > taskIndex) {
				state.splice(taskIndex + 1, 0, droppedTaskInState);
			} else {
				state.splice(taskIndex, 0, droppedTaskInState)
			}

			state.sort((a, b) => a.column.localeCompare(b.column));
			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		setColumn: (state, action) => {
			const task = action.payload.task;
			const columnId = action.payload.columnId;

			const taskInState = state.find(taskState => taskState.id === task.id);
			taskInState.column = columnId;
		}
	}
});

export const {
	create,
	insertAfter,
	setColumn
} = tasksSlice.actions;

export default tasksSlice.reducer;