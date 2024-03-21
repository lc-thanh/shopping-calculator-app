import {takeLatest, call, put, delay} from 'redux-saga/effects'
import {addItemSaga, addItemSagaFail, addItemSagaSuccess, fetchItems} from "../../../components/tableItems/tableItemsSlice";
import axios from "axios"

function fetchHttpApi(payload) {
    console.log('fetching API...')
    const now_date = new Date()
    console.log({
        ...payload,
        add_date: now_date.getTime()
    })
    return axios({
        method: "POST",
        url: process.env.REACT_APP_API_POST,
        data: {
            ...payload,
            add_date: now_date.getTime()
        }
    });
}

function* addItemWorker(action) {
    console.log("ADD_ITEM")
    try {
        yield call(fetchHttpApi, action.payload);

        yield put(addItemSagaSuccess())
        yield delay(1000)
        yield put(fetchItems())
    } catch(error) {
        console.log(error)
        yield put(addItemSagaFail())
    }
}

export default function* addItemWatcher() {
    yield takeLatest(addItemSaga().type, addItemWorker)
}