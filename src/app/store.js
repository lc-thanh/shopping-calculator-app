import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tableItemsReducer from '../components/tableItems/tableItemsSlice'
import dateRangePickerReducer from "../features/ReceiptsTable/DateRangePicker/dateRangePickerSlice";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga";

const sagaMiddleWare = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tableItems: tableItemsReducer,
    dateRangePicker: dateRangePickerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleWare)
});
sagaMiddleWare.run(rootSaga)
