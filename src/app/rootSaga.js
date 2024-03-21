import { all } from 'redux-saga/effects'
import tableItemsSaga from "../components/tableItems/tableItemsSaga";
import addItemWatcher from "../features/ReceiptsTable/AddReceipt/addReceiptSaga";
import deleteItemsWatcher from "../features/ReceiptsTable/DeleteReceipts/deleteReceiptsSaga";
import updateItemWatcher from "../features/ReceiptsTable/UpdateReceipt/updateReceiptSaga";

export default function* rootSaga() {
    yield all([
        tableItemsSaga(),
        addItemWatcher(),
        deleteItemsWatcher(),
        updateItemWatcher(),
    ])
}