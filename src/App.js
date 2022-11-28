import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import Error from "./pages/Error";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import actionTypes from "./redux/actions/actionTypes";

function App() {
  const studentsState = useSelector((state) => state.studentsState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_STUDENTS_START });
    axios
      .get("http://localhost:3004/students")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_STUDENTS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_STUDENTS_FAIL,
          payload: "Serverda bir hata oluştu",
        });
      });
  }, []);

  if (studentsState.start === true) {
    return <Loading />;
  }

  if (studentsState.fail === true) {
    return <Error />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:studentId" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;