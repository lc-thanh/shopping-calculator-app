import { takeLatest, call, put, delay } from 'redux-saga/effects'
import {updateItemSaga, updateItemSagaSuccess, updateItemSagaFail, fetchItems} from "../../../components/tableItems/tableItemsSlice";
import axios from "axios";

function fetchHttpApi(payload) {
    console.log('fetching API...')

    const key = payload.formName.match(/\d+/)

    return axios({
        method: "PUT",
        url: process.env.REACT_APP_API_PUT + key,
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
        yield delay(1000)
        yield put(fetchItems())
    } catch(error) {
        console.log(error)
        yield put(updateItemSagaFail())
    }
}

export default function* updateItemWatcher() {
    yield takeLatest(updateItemSaga().type, updateItemWorker)
}