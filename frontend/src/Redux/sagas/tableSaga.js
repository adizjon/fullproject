import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import {tableActions} from "../reducers/tableReducer";
import apiCall from "../../Components/Api/apiCall"; // Make sure to import tableActions from the correct path
// import ApiCall from "../../Components/Api/apiCall";
function* changeSizeOfPage(action) {
    const LIMIT = action.payload.size;
    const SIZE_OF_PAGE = action.payload.page;
    let api = action.payload.api;
    api = api.replace("{page}", SIZE_OF_PAGE).replace("{limit}", LIMIT);
    const {data} = yield apiCall({url: api, method: "GET"});
    yield put({
        type: "table/changeData",
        payload: {
            data: data.content ? data.content : data,
            size: LIMIT
        },
    });
}

function downloadExcelFile(action) {
}

function* tableSaga() {
    yield takeEvery(tableActions.changePaginationTo.type, changeSizeOfPage);
    yield takeEvery(tableActions.getExcelFile.type, downloadExcelFile);
}

export default tableSaga;
