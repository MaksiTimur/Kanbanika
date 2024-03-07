import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./redux/slices/boardsSlice";
import columnsReducer from "./redux/slices/columnsSlice";
import tasksReducer from "./redux/slices/tasksSlice";

const store = configureStore({
        reducer: {
                boardsReducer,
                columnsReducer,
                tasksReducer
        }
});

export default store;