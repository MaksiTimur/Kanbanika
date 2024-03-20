import { createSlice, current } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
	name: 'columns',
	initialState: JSON.parse(localStorage.getItem('columns')) ?? [],
	reducers: {
		create: (state, action) => {
			const newColumn = { title: action.payload.title, id: self.crypto.randomUUID(), board: action.payload.board };

			state.push(newColumn);

			localStorage.setItem('columns', JSON.stringify(current(state)));
		},
		setTitle: (state, action) => {
			const column = state.find(column => column.id === action.payload.id)

			column.title = action.payload.value;

			localStorage.setItem('columns', JSON.stringify(current(state)));
		}
	}
});

export const {
	create,
	setTitle
} = columnsSlice.actions;

export default columnsSlice.reducer;