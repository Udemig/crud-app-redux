import {createStore,combineReducers} from "redux"

import studentsReducer from "./reducers/studentsReducer"

const rootReducer=combineReducers({
    studentsState:studentsReducer
})

const store=createStore(rootReducer)

export default store