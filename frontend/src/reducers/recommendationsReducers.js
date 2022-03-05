import {
  RECOMMENDATIONS_LIST_REQUEST,
  RECOMMENDATIONS_LIST_SUCCESS,
  RECOMMENDATIONS_LIST_FAIL,
  RECOMMENDATIONS_CREATE_REQUEST,
  RECOMMENDATIONS_CREATE_SUCCESS,
  RECOMMENDATIONS_CREATE_FAIL,
  RECOMMENDATIONS_UPDATE_REQUEST,
  RECOMMENDATIONS_UPDATE_SUCCESS,
  RECOMMENDATIONS_UPDATE_FAIL,
  RECOMMENDATIONS_DELETE_REQUEST,
  RECOMMENDATIONS_DELETE_SUCCESS,
  RECOMMENDATIONS_DELETE_FAIL,
  RECOMMENDATIONS_LISTALL_REQUEST,
  RECOMMENDATIONS_LISTALL_SUCCESS,
  RECOMMENDATIONS_LISTALL_FAIL
}
from "../constants/recommendationsConstants";

export const recommendationListReducer = (state = { recommendations: []}, action) => {
  switch(action.type) {
    case RECOMMENDATIONS_LIST_REQUEST:
      return { loading: true };
    case RECOMMENDATIONS_LIST_SUCCESS:
      return { loading: false, recommendations: action.payload };
    case RECOMMENDATIONS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;

  }
}

export const recommendationListAllReducer = (state = { recommendations: []}, action) => {
  switch(action.type) {
    case RECOMMENDATIONS_LISTALL_REQUEST:
      return { loading: true };
    case RECOMMENDATIONS_LISTALL_SUCCESS:
      return { loading: false, recommendations: action.payload };
    case RECOMMENDATIONS_LISTALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;

  }
}

export const recommendationCreateReducer = (state = {}, action) => {
  switch(action.type) {
    case RECOMMENDATIONS_CREATE_REQUEST:
      return { loading: true };
    case RECOMMENDATIONS_CREATE_SUCCESS:
      return { loading: false, success: true }
    case RECOMMENDATIONS_CREATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state;
  }
}

export const reommendationUpdateReducer = (state = {}, action) => {
  switch(action.type) {
    case RECOMMENDATIONS_UPDATE_REQUEST:
      return { loading: true };
    case RECOMMENDATIONS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case RECOMMENDATIONS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
}

export const recommendationDeleteReducer = (state = {}, action) => {
  switch(action.type) {
    case RECOMMENDATIONS_DELETE_REQUEST:
      return { loading: true };
    case RECOMMENDATIONS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RECOMMENDATIONS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
}
