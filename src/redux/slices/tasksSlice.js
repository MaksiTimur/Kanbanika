import { createSlice, current } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: { tasks: JSON.parse(localStorage.getItem('tasks')) ?? [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newTask = {
				type: "task",
				title: action.payload.title,
				description: null,
				id: self.crypto.randomUUID(),
				column: action.payload.column,
				priority: null
			};

			state.tasks.push(newTask);

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		insertAfter: (state, action) => {
			const { droppedTask, task } = action.payload;

			let droppedIndex;
			let taskIndex;

			for (let i = 0; i < state.tasks.length; i++) {
				const currTask = state.tasks[i];

				if (currTask.id === droppedTask.id) droppedIndex = i;
				if (currTask.id === task.id) taskIndex = i;

				if (droppedIndex !== undefined && taskIndex !== undefined) break;
			}

			state.tasks[droppedIndex].column = task.column;

			state.tasks.splice(droppedIndex, 1);

			const addition = droppedIndex > taskIndex ? 1 : 0;
			state.tasks.splice(taskIndex + addition, 0, droppedTask);

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		remove: (state, action) => {
			const task = action.payload;
			const taskIndex = state.tasks.findIndex(stateTask => stateTask.id === task.id);

			state.tasks.splice(taskIndex, 1);
			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		removeByColumns: (state, action) => {
			const columns = action.payload;
			const deletionIndexes = [];

			for (let i = 0; i < state.tasks.length; i++) {
				if (state.tasks[i].column in columns) deletionIndexes.push(i);
			}

			deletionIndexes.sort((a, b) => b - a);

			for (const index of deletionIndexes) {
				state.tasks.splice(index, 1);
			}

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		setColumn: (state, action) => {
			const task = action.payload.task;
			const columnId = action.payload.columnId;

			const taskInState = state.tasks.find(taskState => taskState.id === task.id);
			taskInState.column = columnId;

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		setTitle: (state, action) => {
			const task = state.tasks.find(task => task.id === action.payload.id)

			task.title = action.payload.title;

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		setDescription: (state, action) => {
			const task = state.tasks.find(task => task.id === action.payload.id)

			task.description = action.payload.description;

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		},
		setPriority: (state, action) => {
			const task = state.tasks.find(task => task.id === action.payload.id)

			task.priority = action.payload.priority;

			localStorage.setItem('tasks', JSON.stringify(current(state.tasks)));
		}
	}
});

export const {
	setCurrent,
	create,
	insertAfter,
	remove,
	removeByColumns,
	setColumn,
	setTitle,
	setDescription,
	setPriority
} = tasksSlice.actions;

export default tasksSlice.reducer;