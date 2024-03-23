import { createSlice, current } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: JSON.parse(localStorage.getItem('tasks')) ?? { tasks: [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newTask = { type: "task", title: action.payload.title, id: self.crypto.randomUUID(), column: action.payload.column };

			state.tasks.push(newTask);

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
		removeByColumn: (state, action) => {
			const columnId = action.payload.id;
			const deletionIndexes = [];

			for (let i = 0; i < state.tasks.length; i++) {
				if (state.tasks[i].column !== columnId) continue;

				deletionIndexes.push(i);
			}

			deletionIndexes.sort((a, b) => b - a);

			for (const index of deletionIndexes) {
				state.tasks.splice(index, 1);
			}

			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		setColumn: (state, action) => {
			const task = action.payload.task;
			const columnId = action.payload.columnId;

			const taskInState = state.tasks.find(taskState => taskState.id === task.id);
			taskInState.column = columnId;
			localStorage.setItem('tasks', JSON.stringify(current(state)));
		},
		setTitle: (state, action) => {
			const task = state.tasks.find(task => task.id === action.payload.id)

			task.title = action.payload.value;

			localStorage.setItem('tasks', JSON.stringify(current(state)));
		}
	}
});

export const {
	setCurrent,
	create,
	insertAfter,
	remove,
	removeByColumn,
	setColumn,
	setTitle
} = tasksSlice.actions;

export default tasksSlice.reducer;