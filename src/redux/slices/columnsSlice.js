import { createSlice, current } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
	name: 'columns',
	initialState: JSON.parse(localStorage.getItem('columns')) ?? [],
	reducers: {
		create: (state, action) => {
			const newColumn = { title: action.payload.title, id: self.crypto.randomUUID(), board: action.payload.board };

			state.push(newColumn);

			localStorage.setItem('columns', JSON.stringify(current(state)));
		}
	}
});

export const {
	create
} = columnsSlice.actions;

export default columnsSlice.reducer;