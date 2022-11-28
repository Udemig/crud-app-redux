import actionTypes from "../actions/actionTypes"
/* 
    1. initialState / başlangıç state'i oluştur
    2. reducer fonksiyonunu oluştur
*/

const initialState={
    start: false,
    success:false,
    students: [],
    fail:false,
    error:""
}

const studentsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.FETCH_STUDENTS_START:
            return{
                ...state,
                start:true
            }
        case actionTypes.FETCH_STUDENTS_SUCCESS:
            return{
                ...state,
                fail:false,
                start:false,
                success:true,
                students:action.payload
            }
        case actionTypes.FETCH_STUDENTS_FAIL:
            return{
                ...state,
                start:false,
                fail:true,
                error:action.payload
            }   
        case actionTypes.ADD_STUDENT:
            return{
                ...state,
                students:[...state.students,action.payload]
            } 
        case actionTypes.DELETE_STUDENT:
            const filteredStudents=state.students.filter(item => item.id !== action.payload)
            return{
                ...state,
                students: filteredStudents
            }
        case actionTypes.UPDATE_STUDENT:
            let tempStudents=[]
            for(let i=0;i<state.students.length;i++){
                if(state.students[i].id !== action.payload.id){
                    tempStudents.push(state.students[i])
                }else{
                    tempStudents.push(action.payload)
                }
            }
            return{
                ...state,
                students: tempStudents
            }
        default:
            return state
    } 
}

export default studentsReducer

