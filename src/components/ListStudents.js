import React from "react";

import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
import actionTypes from "../redux/actions/actionTypes";

const ListStudents = () => {
  const dispatch=useDispatch()
  //destructing
  const { studentsState } = useSelector((state) => state);

  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3004/students/${id}`)
    .then(res=>{
      dispatch({type:actionTypes.DELETE_STUDENT,payload:id})
    })
    .catch(err=>{

    })
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end">
        <Link to="/add-student" className="btn btn-primary">
          Öğrenci Ekle
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Öğr No</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Okulu</th>
            <th>Sınıfı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {studentsState.students.map((student) => (
            <tr key={student.id}>
              <th>{student.number}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.school}</td>
              <td>{student.class}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <Link to={`/edit-student/${student.id}`} className="btn btn-sm btn-secondary">
                    Düzenle
                  </Link>
                  <button onClick={()=>handleDelete(student.id)} type="button" className="btn btn-sm btn-danger">
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudents;
