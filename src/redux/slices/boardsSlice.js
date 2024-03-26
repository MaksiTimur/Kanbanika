import { createSlice, current } from "@reduxjs/toolkit";

export const boardsSlice = createSlice({
	name: 'boards',
	initialState: { boards: JSON.parse(localStorage.getItem('boards')) ?? [], current: null },
	reducers: {
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
		create: (state, action) => {
			const newBoard = {
				type: "board",
				title: action.payload.title,
				background: { active: 'color', data: { bgUrl: null, bgColor: null } },
				id: self.crypto.randomUUID()
			};

			state.boards.push(newBoard);

			localStorage.setItem('boards', JSON.stringify(current(state.boards)));
		},
		insertAfter: (state, action) => {
			const { droppedBoard, board } = action.payload;

			const droppedIndex = state.boards.findIndex(stateBoard => stateBoard.id === droppedBoard.id);
			const boardIndex = state.boards.findIndex(stateBoard => stateBoard.id === board.id);

			state.boards.splice(droppedIndex, 1);

			if (droppedIndex > boardIndex) {
				state.boards.splice(boardIndex + 1, 0, droppedBoard);
			} else {
				state.boards.splice(boardIndex, 0, droppedBoard)
			}

			localStorage.setItem('boards', JSON.stringify(current(state.boards)));
		},
		remove: (state, action) => {
			const board = action.payload;
			const boardIndex = state.boards.findIndex(stateBoard => stateBoard.id === board.id);

			state.boards.splice(boardIndex, 1);
			localStorage.setItem('boards', JSON.stringify(current(state.boards)));
		},
		setTitle: (state, action) => {
			const board = state.boards.find(board => board.id === action.payload.id)

			board.title = action.payload.title;

			localStorage.setItem('boards', JSON.stringify(current(state.boards)));
		},
		setBackground: (state, action) => {
			const board = state.boards.find(board => board.id === action.payload.id)

			switch (action.payload.type) {
				case 'url':
					board.background.data.bgUrl = action.payload.background;
					break;
				case 'color':
					board.background.data.bgColor = action.payload.background;
					break;
				default:
					break;
			}

			localStorage.setItem('boards', JSON.stringify(current(state.boards)));
		},
		setActiveBackground: (state, action) => {
			const board = state.boards.find(board => board.id === action.payload.id)

			board.background.active = action.payload.type;

			localStorage.setItem('boards', JSON.stringify(current(state.boards)));
		},
	}
});

export const {
	setCurrent,
	create,
	insertAfter,
	remove,
	setTitle,
	setBackground,
	setActiveBackground
} = boardsSlice.actions;

export default boardsSlice.reducer;