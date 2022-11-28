import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionTypes from "../redux/actions/actionTypes";

import axios from "axios";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentsState } = useSelector((state) => state);

  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [stdClass, setStdClass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //validation
    if (!number || !firstName || !lastName || !school || !stdClass) {
      alert("Bütün alanları doldurmak zorunludur");
      return;
    }
    const hasStudent = studentsState.students.find(
      (item) => item.number === number
    );

    if (hasStudent !== undefined) {
      alert(
        `Girdiğiniz numara ${hasStudent.firstName} isimli öğrenciye aittir`
      );
      return;
    }

    const newStudent = {
      id: String(new Date().getTime()),
      firstName: firstName,
      lastName: lastName,
      number: number,
      class: stdClass,
      school: school,
    };
    axios
      .post("http://localhost:3004/students", newStudent)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_STUDENT, payload: newStudent });
        setFirstName("");
        setLastName("");
        setNumber("");
        setSchool("");
        setStdClass("");
        navigate("/");
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container d-flex justify-content-center my-5">
        <form onSubmit={handleSubmit} className="w-75">
          <div className="mb-3 mt-4">
            <label htmlFor="number" className="form-label">
              Öğrenci Numarası
            </label>
            <input
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              type="text"
              className="form-control"
              id="number"
            />
          </div>
          <div className="mb-3 mt-5">
            <label htmlFor="firstName" className="form-label">
              Öğrenci Adı
            </label>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
              className="form-control"
              id="firstName"
            />
          </div>
          <div className="mb-3 mt-5">
            <label htmlFor="lastName" className="form-label">
              Öğrenci Soyadı
            </label>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              type="text"
              className="form-control"
              id="lastName"
            />
          </div>
          <div className="mb-3 mt-5">
            <label htmlFor="school" className="form-label">
              Okulu
            </label>
            <input
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              type="text"
              className="form-control"
              id="school"
            />
          </div>
          <div className="mb-3 mt-5">
            <label htmlFor="class" className="form-label">
              Sınıfı
            </label>
            <input
              value={stdClass}
              onChange={(event) => setStdClass(event.target.value)}
              type="text"
              className="form-control"
              id="class"
            />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button type="submit" className="btn btn-primary w-50">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
