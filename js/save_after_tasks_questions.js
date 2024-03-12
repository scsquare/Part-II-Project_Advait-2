function saveAfterTasksQuestions (form) {
    var q1 = form.q1.value;
    var q2 = form.q2.value;
    var q3 = form.q3.value;

    var results="{'q1':'".concat(q1,"'},{'q2':'",q2,"'},{'q3':'",q3,"'}");
    localStorage.setItem("afterTaskQuestions",results);

    //TODO: post this
    UID=localStorage.getItem("UID");

    data="#"+"After Task Questions"+"#"+results;
    existing_results=localStorage.getItem("results_concat");
    new_results=existing_results.concat(data)
    localStorage.setItem("results_concat",new_results);
    post(new_results);

    window.location.href="../outro/thankyou.html";
}
