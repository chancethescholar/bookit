import axios from "axios";
import {
  BOOKMARKS_LIST_REQUEST,
  BOOKMARKS_LIST_SUCCESS,
  BOOKMARKS_LIST_FAIL,
  BOOKMARKS_CREATE_REQUEST,
  BOOKMARKS_CREATE_SUCCESS,
  BOOKMARKS_CREATE_FAIL,
  BOOKMARKS_DELETE_REQUEST,
  BOOKMARKS_DELETE_SUCCESS,
  BOOKMARKS_DELETE_FAIL,
} from "../constants/bookmarksConstants";

export const listBookmarks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKMARKS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/bookmarks`, config);

    dispatch({
      type: BOOKMARKS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKMARKS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createBookmarkAction =
  (title, author, genres, review, rating, image) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOKMARKS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/bookmarks/add`,
        { title, author, genres, review, rating, image },
        config
      );

      dispatch({
        type: BOOKMARKS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: BOOKMARKS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteBookmarkAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKMARKS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/bookmarks/remove/${id}`, config);

    dispatch({
      type: BOOKMARKS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BOOKMARKS_DELETE_FAIL,
      payload: message,
    });
  }
};
