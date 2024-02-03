var url="https://script.google.com/macros/s/AKfycbxPTGclZZsM2jXKzfREGYaQoNQXPJZhFHkZ8JK3QO_js5p9vbanGuZWgzxSrFAvdWw/exec"

function post(data){
    alert("posting "+data);
    fetch(url, {
    method: "POST",
    body:  data
    })
    .catch(error=>{
        //uh lets ignore it for now
    })
}

function get(){
    fetch(url)
    .then(response => response.text())
    .then(data=>{
        localStorage.setItem("UID",data);
        //alert(data);
        document.getElementById("questionsButton").classList.remove("timing-out");
    })
    .catch(error=>{
        //uh lets ignore it for now
    })
}