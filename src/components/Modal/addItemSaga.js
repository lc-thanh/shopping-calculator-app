import {takeLatest, call, put} from 'redux-saga/effects'
import {addItemSaga, addItemSagaFail, addItemSagaSuccess} from "../tableItems/tableItemsSlice";
import axios from "axios"

function fetchHttpApi(payload) {
    console.log('fetching API...')
    const now_date = new Date()
    console.log({
        ...payload,
        add_date: now_date.toLocaleDateString('pt-PT')
    })
    return axios({
        method: "POST",
        url: "https://api-shopping-calculation-app.onrender.com/api/v1/receipts",
        data: {
            ...payload,
            add_date: now_date.toLocaleDateString('pt-PT')
        }
    });
}

function* addItemWorker(action) {
    console.log("ADD_ITEM")
    try {
        yield call(fetchHttpApi, action.payload);

        yield put(addItemSagaSuccess())
    } catch(error) {
        console.log(error)
        yield put(addItemSagaFail())
    }
}

export default function* addItemWatcher() {
    yield takeLatest(addItemSaga().type, addItemWorker)
}