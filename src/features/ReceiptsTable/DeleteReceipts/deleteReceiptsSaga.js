import {takeLatest, put, call, delay} from 'redux-saga/effects'
import {deleteItemsSaga, deleteItemsSagaSuccess, deleteItemsSagaFail, fetchItems} from "../../../components/tableItems/tableItemsSlice";
import axios from "axios";

function fetchHttpApi(payload) {
    console.log(payload)
    return axios({
        method: "DELETE",
        url: process.env.REACT_APP_API_DELETE,
        data: payload
    });
}

function* deleteItemsWorker(action) {
    try {
        yield call(fetchHttpApi, action.payload)

        yield put(deleteItemsSagaSuccess())
        yield delay(1000)
        yield put(fetchItems())
    } catch(error) {
        console.log(error)
        yield put(deleteItemsSagaFail())
    }
}

export default function* deleteItemsWatcher() {
    yield takeLatest(deleteItemsSaga().type, deleteItemsWorker)
}