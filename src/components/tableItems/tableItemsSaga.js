import { takeLatest, call, put } from 'redux-saga/effects'
import { fetchItems, fetchItemsSuccess, fetchItemsError } from './tableItemsSlice'
import axios from "axios"
import {openMessage} from "./TableItems";

function fetchHttpApi() {
    console.log('fetching API...')
    return axios({
        method: "GET",
        url: process.env.REACT_APP_API_GET,
    });
}

function* fetchItemsSaga() {
    console.log("FETCH_ITEMS")
    try {
        const response = yield call(fetchHttpApi);

        yield put(fetchItemsSuccess(response.data));
        // yield delay(1000)
        yield call(openMessage, 'success')
    } catch (error) {
        yield put(fetchItemsError(error));
    }
    // yield delay(3000)
    // yield put(fetchItemsSuccess(data))
    // yield put(fetchItemsError('error'))
}

export default function* tableItemsSaga() {
    console.log("tableItems saga!")
    yield takeLatest(fetchItems().type, fetchItemsSaga)
}