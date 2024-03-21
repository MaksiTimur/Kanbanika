import { createSlice, current } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
	name: 'columns',
	initialState: JSON.parse(localStorage.getItem('columns')) ?? { columns: [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newColumn = { type: "column", title: action.payload.title, id: self.crypto.randomUUID(), board: action.payload.board };

			state.columns.push(newColumn);

			localStorage.setItem('columns', JSON.stringify(current(state)));
		},
		remove: (state, action) => {
			const column = action.payload;
			const columnIndex = state.columns.findIndex(stateColumn => stateColumn.id === column.id);

			state.columns.splice(columnIndex, 1);
			localStorage.setItem('columns', JSON.stringify(current(state)));
		},
		setTitle: (state, action) => {
			const column = state.columns.find(column => column.id === action.payload.id)

			column.title = action.payload.value;

			localStorage.setItem('columns', JSON.stringify(current(state)));
		}
	}
});

export const {
	setCurrent,
	create,
	remove,
	setTitle
} = columnsSlice.actions;

export default columnsSlice.reducer;