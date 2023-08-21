import {clientActions} from "../reducers/ClientsReducer";
import {takeEvery, select, put, call} from "redux-saga/effects"
import ApiCall from "../../Components/Api/apiCall";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function* getClientsSaga(action) {
    try {
        const res = yield ApiCall({
            url: "/api/client",
            method: "GET",
            param:action.payload
        });
        yield put(clientActions.getClientsSuccess(res.data))
        editClientSaga()
    } catch (e) {
        yield put(clientActions.getClientsFailure(e.data))
    }
}

function* saveTerritorySaga(action) {
    try {
        yield call(() => ApiCall({
            url: "/api/client",
            method: "POST",
            data: action.payload
        }));
        yield call(getClientsSaga);
    } catch (error) {
        const errorMessage = error.response.data || error.response.message;
        alert(errorMessage);
        toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT
        });
    }


}

function* editClientSaga(action) {
    try {

        const res = yield ApiCall({
            url: "/api/client/put/"+action.payload.id,
            method: "GET",
            param:action.payload
        });
        yield call(getClientsSaga);

    } catch (error) {
        const errorMessage = error.response.data || error.response.message;
        alert(errorMessage);
        toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT
        });
    }


}

export default function* territorySaga() {
    yield takeEvery("client/getClients", getClientsSaga)
    yield takeEvery("client/saveClient", saveTerritorySaga)
    yield takeEvery("client/editClient", editClientSaga)
}