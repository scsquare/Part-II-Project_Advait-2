var url="https://script.google.com/macros/s/AKfycbxRAVsoNbzDXqBvKIy3XsnxhBlg0p3-urXadoOy9Y98GRwt1BCbe5Ioz6rS-m24MQaXFA/exec"

/***** 
Post request with data as payload 
*/
function post(data){
    //alert("posting "+data);
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

        const possible_codes=["A1A2B1B2","B1B2C1C2","C1C2D1D2","D1D2E1E2","E1E2A1A2"]
        var this_code=possible_codes.slice(parseInt(data-1)%5,parseInt(data-1)%5+1)


        localStorage.setItem("init_code",this_code)
        localStorage.setItem("working_page_code",this_code)


        document.getElementById("questionsButton").value="Next";
        document.getElementById("questionsButton").disabled = false;

    })
    .catch(error=>{
        //uh lets ignore it for now
    })
}