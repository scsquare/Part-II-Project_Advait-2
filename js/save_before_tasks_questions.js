function saveBeforeTasksQuestions (form) {
    var time = form.time.value;
    var qualification = form.qualification.value;

    if ((time=="")||(qualification=="")){
        alert("Please fill in the form")
    }
    else{
        var results="{'time':'".concat(time,"'},{'qualification':'",qualification,"'}");
        //localStorage.setItem("beforeTaskQuestions",results);

        UID=localStorage.getItem("UID");
        alert("Your participant ID is "+UID+".")

        data=UID+"#"+"Before Task Questions"+"#"+results;
        localStorage.setItem("results_concat",data);
        //console.log("saveBeforeTask", data, typeof(data));
        post(data);

        window.location.href="../sets/Intro1.html";
    }

}


var qualification = document.getElementById("qualification");

qualification.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});