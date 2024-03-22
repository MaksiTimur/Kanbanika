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
		insertAfter: (state, action) => {
			const { droppedColumn, column } = action.payload;

			const droppedIndex = state.columns.findIndex(stateColumn => stateColumn.id === droppedColumn.id);
			const columnIndex = state.columns.findIndex(stateColumn => stateColumn.id === column.id);

			state.columns.splice(droppedIndex, 1);

			if (droppedIndex > columnIndex) {
				state.columns.splice(columnIndex + 1, 0, droppedColumn);
			} else {
				state.columns.splice(columnIndex, 0, droppedColumn)
			}

			localStorage.setItem('columns', JSON.stringify(current(state)));
		},
		remove: (state, action) => {
			const column = action.payload;
			const columnIndex = state.columns.findIndex(stateColumn => stateColumn.id === column.id);

			state.columns.splice(columnIndex, 1);
			localStorage.setItem('columns', JSON.stringify(current(state)));
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
	insertAfter,
	remove,
	removeByBoard,
	setTitle
} = columnsSlice.actions;

export default columnsSlice.reducer;