function saveBeforeTasksQuestions (form) {
    var time = form.time.value;
    var qualification = form.qualification.value;

    if ((time=="")||(qualification=="")){
        alert("Please fill in the form")
    }
    else{
        var results="{'time':'".concat(time,"'},{'qualification':'",qualification,"'}");
        localStorage.setItem("beforeTaskQuestions",results);


        window.location.href="../sets/Intro1.html";
    }

}


var qualification = document.getElementById("qualification");

qualification.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("questionsButton").click();
  }
});