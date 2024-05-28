import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songReducer from "./songState";
import sagaSong from "./sagaSong";

const rootReducer = combineReducers({
  songs: songReducer,
});

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,

  middleware: () => [saga],
});

saga.run(sagaSong);
