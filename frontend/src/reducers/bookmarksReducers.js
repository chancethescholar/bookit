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
  BOOKMARKS_USER_REQUEST,
  BOOKMARKS_USER_SUCCESS,
  BOOKMARKS_USER_FAIL,
} from "../constants/bookmarksConstants";

export const bookmarkListReducer = (state = { BOOKMARKS: [] }, action) => {
  switch (action.type) {
    case BOOKMARKS_LIST_REQUEST:
      return { loading: true };
    case BOOKMARKS_LIST_SUCCESS:
      return { loading: false, BOOKMARKS: action.payload };
    case BOOKMARKS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookmarkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARKS_CREATE_REQUEST:
      return { loading: true };
    case BOOKMARKS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BOOKMARKS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookmarkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARKS_DELETE_REQUEST:
      return { loading: true };
    case BOOKMARKS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOKMARKS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const bookmarkUserReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARKS_USER_REQUEST:
      return { loading: true };
    case BOOKMARKS_USER_SUCCESS:
      return { loading: false, BOOKMARKS: action.payload, success: true };
    case BOOKMARKS_USER_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
