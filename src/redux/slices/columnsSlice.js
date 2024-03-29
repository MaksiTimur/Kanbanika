import { createSlice, current } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
	name: 'columns',
	initialState: { columns: JSON.parse(localStorage.getItem('columns')) ?? [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newColumn = {
				type: "column",
				title: action.payload.title,
				background: null,
				id: self.crypto.randomUUID(),
				board: action.payload.board
			};

			state.columns.push(newColumn);

			localStorage.setItem('columns', JSON.stringify(current(state.columns)));
		},
		insertAfter: (state, action) => {
			const { droppedColumn, column } = action.payload;

			let droppedIndex;
			let columnIndex;

			for (let i = 0; i < state.columns.length; i++) {
				const currColumn = state.columns[i];

				if (currColumn.id === droppedColumn.id) droppedIndex = i;
				if (currColumn.id === column.id) columnIndex = i;

				if (droppedIndex !== undefined && columnIndex !== undefined) break;
			}

			state.columns.splice(droppedIndex, 1);

			const addition = droppedIndex > columnIndex ? 1 : 0;
			state.columns.splice(columnIndex + addition, 0, droppedColumn);

			localStorage.setItem('columns', JSON.stringify(current(state.columns)));
		},
		remove: (state, action) => {
			const column = action.payload;
			const columnIndex = state.columns.findIndex(stateColumn => stateColumn.id === column.id);

			state.columns.splice(columnIndex, 1);
			localStorage.setItem('columns', JSON.stringify(current(state.columns)));
		},
		removeByBoard: (state, action) => {
			const boardId = action.payload.id;
			const deletionIndexes = [];

			for (let i = 0; i < state.columns.length; i++) {
				if (state.columns[i].board !== boardId) continue;

				deletionIndexes.push(i);
			}

			deletionIndexes.sort((a, b) => b - a);

			for (const index of deletionIndexes) {
				state.columns.splice(index, 1);
			}

			localStorage.setItem('columns', JSON.stringify(current(state.columns)));
		},
		setTitle: (state, action) => {
			const column = state.columns.find(column => column.id === action.payload.id)

			column.title = action.payload.title;

			localStorage.setItem('columns', JSON.stringify(current(state.columns)));
		},
		setBackground: (state, action) => {
			const column = state.columns.find(column => column.id === action.payload.id)

			column.background = action.payload.background;

			localStorage.setItem('columns', JSON.stringify(current(state.columns)));
		}
	}
});

export const {
	setCurrent,
	create,
	insertAfter,
	remove,
	removeByBoard,
	setTitle,
	setBackground
} = columnsSlice.actions;

export default columnsSlice.reducer;