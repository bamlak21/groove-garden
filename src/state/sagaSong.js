import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  addSongFailure,
  addSongSuccess,
  deleteSongSuccess,
  deleteSongFailure,
  getSongFailure,
  getSongSuccess,
  updateSongSuccess,
  updateSongFailure,
} from "./songState";
import axios from "axios";

function* workGetSong() {
  try {
    const songs = yield call(fetch, "http://localhost:4000");
    const formatSong = yield songs.json();
    yield put(getSongSuccess(formatSong));
    return;
  } catch (err) {
    yield put(getSongFailure(err));
  }
}

function* workAddSong(action) {
  try {
    const res = yield call(axios.post, "http://localhost:4000", action.payload);
    yield put(addSongSuccess(res));
  } catch (error) {
    yield put(addSongFailure(error));
  }
}

function* workDeleteSong(action) {
  try {
    const res = yield call(
      axios.delete,
      `http://localhost:4000/${action.payload}`
    );
    console.log(res);
    yield put(deleteSongSuccess(res));
  } catch (err) {
    yield put(deleteSongFailure(err));
  }
}

function* workUpdateSong(action) {
  try {
    const res = yield call(
      axios.put,
      `http://localhost:4000/${action.payload.SongId}`,
      action.payload
    );
    yield put(updateSongSuccess(res));
  } catch (error) {
    yield put(updateSongFailure(error));
  }
}

function* getSongSaga() {
  yield takeEvery("songs/getSong", workGetSong);
}

function* addSongSaga() {
  yield takeEvery("songs/addSong", workAddSong);
}

function* deleteSongSaga() {
  yield takeLatest("songs/deleteSong", workDeleteSong);
}

function* updateSongSaga() {
  yield takeEvery("songs/updateSong", workUpdateSong);
}

export default function* sagaSong() {
  yield all([getSongSaga(), addSongSaga(), deleteSongSaga(), updateSongSaga()]);
}
