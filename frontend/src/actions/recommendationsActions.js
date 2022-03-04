import axios from 'axios';
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
}
from "../constants/recommendationsConstants";

export const listRecommendations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECOMMENDATIONS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/recommendations`, config);

    dispatch({
      type: RECOMMENDATIONS_LIST_SUCCESS,
      payload: data,
    });
  }

  catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: RECOMMENDATIONS_LIST_FAIL,
      payload: message
    });
  }
}

export const createRecommendationAction =
  (title, author, genres, review, rating, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECOMMENDATIONS_CREATE_REQUEST,
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
        `/api/recommendations/create`,
        { title, author, genres, review, rating, image },
        config
      );

      dispatch({
        type: RECOMMENDATIONS_CREATE_SUCCESS,
        payload: data,
      });
    }

    catch (error) {
      const message =
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({
        type: RECOMMENDATIONS_CREATE_FAIL,
        payload: message
      });
    }
}

export const updateRecommendationAction =
(id, title, author, genres, review, rating, image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECOMMENDATIONS_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/recommendations/${id}`,
      { title, author, genres, review, rating, image },
      config
    );

    dispatch({
      type: RECOMMENDATIONS_UPDATE_SUCCESS,
      payload: data,
    });
  }

  catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: RECOMMENDATIONS_UPDATE_FAIL,
      payload: message
    });
  }
}

export const deleteRecommendationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECOMMENDATIONS_DELETE_REQUEST,
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

    const { data } = await axios.delete(`/api/recommendations/${id}`, config);

    dispatch({
      type: RECOMMENDATIONS_DELETE_SUCCESS,
      payload: data,
    });
  }

  catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: RECOMMENDATIONS_DELETE_FAIL,
      payload: message
    });
  }
}
