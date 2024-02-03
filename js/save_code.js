function storageCheck(){
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    localStorage.clear();
    return 1;
    
} else {
    // Sorry! No Web Storage support..
    return 0;
}
}


function saveCode (form) {
    var code = form.code.value;
    var storageCheckResults=storageCheck();
    if (storageCheckResults!=1){
      alert("No Web Storage support :( Please try using another web browser/drop me a message");
      return;
    }

    var name=document.getElementById("name").value;
    if (name.value==""){
      alert("Please type in your name to agree to the consent form (or let me know if you no longer want to participate).")
    }
    else if (code==""){
      alert("Please enter your code to start");
    }
    else if (code.length!= 6){
      alert("Your code should be 6 characters long. Please double check");
      //example of code that's ok: AB2CD3
    }
    else if ((code[2]!=2)||(code[5]!=3)||(code[0]<"A")||(code[0]>"I")||(code[1]<"A")||(code[1]>"I")||(code[3]<"J")||(code[3]>"R")||(code[4]<"J")||(code[4]>"R")){
      alert("Double check if you have typed your code correctly?:"+code);
      //ASSERT: the set codes correspond to the right task
    }
    else{
      //From previous version
      localStorage.setItem("name","{'name':'".concat(name,"'}")); //consent

      alert("You entered the code " +code);
      code="1".concat(code);
      localStorage.setItem("init_code",code);
      localStorage.setItem("working_code",code);
      localStorage.setItem("current_page_code","1");

      //actually proceed
      window.location.href = "sets/BeforeTasks.html";
      
    }

}

var code = document.getElementById("code");

code.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("codeButton").click();
  }
});