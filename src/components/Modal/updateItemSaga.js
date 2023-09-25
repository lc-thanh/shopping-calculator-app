import { takeLatest, call, put } from 'redux-saga/effects'
import { updateItemSaga, updateItemSagaSuccess, updateItemSagaFail } from "../tableItems/tableItemsSlice";
import axios from "axios";

function fetchHttpApi(payload) {
    console.log('fetching API...')

    const key = payload.formName.match(/\d+/)

    return axios({
        method: "PUT",
        url: "https://api-shopping-calculation-app.onrender.com/api/v1/receipts/" + key,
        data: {
            name: payload.name,
            item: payload.item,
            cost: payload.cost,
            note: payload.note,
        }
    })
}

function* updateItemWorker(action) {
    try {
        yield call(fetchHttpApi, action.payload)

        yield put(updateItemSagaSuccess())
    } catch(error) {
        console.log(error)
        yield put(updateItemSagaFail())
    }
}

export default function* updateItemWatcher() {
    yield takeLatest(updateItemSaga().type, updateItemWorker)
}