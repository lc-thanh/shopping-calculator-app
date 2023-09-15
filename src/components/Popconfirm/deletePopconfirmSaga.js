import {takeLatest, put, call, delay} from 'redux-saga/effects'
import {deleteItemsSaga, deleteItemsSagaSuccess, deleteItemsSagaFail} from "../tableItems/tableItemsSlice";
import axios from "axios";

function fetchHttpApi(payload) {
    console.log(payload)
    return axios({
        method: "DELETE",
        url: "https://api-shopping-calculation-app.onrender.com/api/v1/receipts",
        data: payload
    });
}

function* deleteItemsWorker(action) {
    try {
        yield call(fetchHttpApi, action.payload)

        yield put(deleteItemsSagaSuccess())
    } catch(error) {
        console.log(error)
        yield put(deleteItemsSagaFail())
    }
}

export default function* deleteItemsWatcher() {
    yield takeLatest(deleteItemsSaga().type, deleteItemsWorker)
}