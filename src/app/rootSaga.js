import { all } from 'redux-saga/effects'
import tableItemsSaga from "../components/tableItems/tableItemsSaga";
import addItemWatcher from "../components/Modal/addItemSaga";
import deleteItemsWatcher from "../components/Popconfirm/deletePopconfirmSaga";

export default function* rootSaga() {
    yield all([
        tableItemsSaga(),
        addItemWatcher(),
        deleteItemsWatcher()
    ])
}