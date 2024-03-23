var url="https://script.google.com/macros/s/AKfycbzjUOB6BMsuoJR1gBRLhIlfWxcTiie8srqvxQ46ec7dkDEO0vUtQt_YXJRj4ht5EKyulw/exec"

/***** 
Post request with data as payload 
*/
function post(data_incoming){
    console.log("POSTING");
    console.log(typeof(data_incoming));
    // let packet={"value":data_incoming};
    // console.log("packet", packet, typeof(packet));
    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'text/plain' }, 
        body: String(data_incoming)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // or response.json() if the response is JSON
    })
    .then(data => {
        console.log('Success:', data); // Handle success response
    })
    .catch(error => {
        console.log("ERROR OCCURED");
        console.error('Error:', error); // Improved error handling
        console.log("error", error);
    });
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


        document.getElementById("questionsButton").value="Continue";
        document.getElementById("questionsButton").disabled = false;

    })
    .catch(error=>{
        //uh lets ignore it for now
    })
}