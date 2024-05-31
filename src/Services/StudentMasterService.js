import axios from "axios";

const StudentMasterService = {
getStudentList : async function () {
    const responseGet = await axios.get("http://localhost:8080/student/all");
    console.log("responseGet : ",responseGet)
    return responseGet;    
},
addStudentData : async function (studentForm) {
    const responsePost = await axios.post("http://localhost:8080/student/add",studentForm)
    return responsePost;
}
}

export default StudentMasterService;