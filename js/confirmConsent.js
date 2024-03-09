function confirmConsent () {
    if (storageCheckResults!=1){
      alert("No Web Storage support :( Please try using another web browser/drop me a message");
      return;
    }

    var name=document.getElementById("name").value;
    if (name==""){
      alert("Please type in your name to agree to the consent form (or let me know if you no longer want to participate).")
    }
    else{
      //save code part moved to beforetaskquestions
      //actually proceed
      window.location.href = "sets/BeforeTasks.html";
      
    }

}

var textinput = document.getElementById("name");

textinput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("codeButton").click();
  }
});