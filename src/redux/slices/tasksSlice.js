import { createSlice, current } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: JSON.parse(localStorage.getItem('tasks')) ?? [],
	reducers: {
		create: (state, action) => {
			const newTask = { title: action.payload.title, id: self.crypto.randomUUID(), column: action.payload.column };

			state.push(newTask);

			localStorage.setItem('tasks', JSON.stringify(current(state)));
		}
	}
});

export const {
	create
} = tasksSlice.actions;

export default tasksSlice.reducer;