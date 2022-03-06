import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer, userUpdateReducer } from "./reducers/userReducers";
import { recommendationListReducer, recommendationListAllReducer, recommendationCreateReducer, reommendationUpdateReducer, recommendationDeleteReducer, recommendationsUserReducer } from "./reducers/recommendationsReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userUpdate: userUpdateReducer,
  recommendationList: recommendationListReducer,
  recommendationListAll: recommendationListAllReducer,
  recommendationCreate: recommendationCreateReducer,
  recommendationUpdate: reommendationUpdateReducer,
  recommendationDelete: recommendationDeleteReducer,
  recommendationsUser: recommendationsUserReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {userInfo: userInfoFromStorage },
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
