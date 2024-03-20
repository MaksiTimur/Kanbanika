import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./redux/slices/boardsSlice";
import columnsReducer from "./redux/slices/columnsSlice";
import tasksReducer from "./redux/slices/tasksSlice";
import modalReducer from "./redux/slices/modalSlice";
import currentReducer from "./redux/slices/currentSlice";

const store = configureStore({
        reducer: {
                boardsReducer,
                columnsReducer,
                tasksReducer,
                modalReducer,
                currentReducer
        }
});

export default store;