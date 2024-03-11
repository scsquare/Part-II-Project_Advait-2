function writeResults(){
    var items= document.getElementsByClassName("song-name");

    const texts=[];
    console.log("writeResults says hi");
    for (let i=0;i<8;i++){
        //get text of song name, extract int at the beginning of it
        var temp=Number((items[i].innerText)[0])-1; //changes it to 0-7
        texts[i]=temp;
    }

    if (typeof(Storage) !== "undefined") {
        // store in local storage
        var current_page_code=localStorage.getItem("working_page_code").slice(0,2);
       
        //THE ACTUAL STORE
        localStorage.setItem(current_page_code,texts); 

        //ASSERT: UID is not null
        //this is enforced by not even showing the next button in BeforeTasks until UID is ready 
        //idek anymore
        UID=localStorage.getItem("UID");

        data=UID+"#"+current_page_code+"#"+texts;
        console.log("presubmit", data, typeof(data));
        // post(data);
        let test_string="helloWorld2";
        console.log("test_string", test_string);
        alt_post(test_string)

        if (localStorage.getItem(current_page_code)===null){
            alert("ERROR on_click_next_page: store failed")
        }


    } else {
        // Sorry! No Web Storage support..
        alert("ERROR: No Web Storage support.");
        console.log("ERROR");
    }
}
function alt_post(data_incoming){
    console.log("ALT POSTING");
    console.log("url",url)
    console.log(typeof(data_incoming));
    // let packet={"value":data_incoming};
    // console.log("packet", packet, typeof(packet));
    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'text/plain' }, // Set content type if sending JSON
        body: data_incoming
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


function updateCode(){ 
    //update working code
    var old_working_code=localStorage.getItem("working_page_code");
    if (old_working_code.length<=2){
        var new_working_code=[]
    }
    else{
        //working_code is string and each code is 2 chars long
        var new_working_code=old_working_code.slice(2,);
    }
    localStorage.setItem("working_page_code",new_working_code);


}

function findNextPage(){
    var working_code=localStorage.getItem("working_page_code");
    if (working_code.length==0){
        return "../sets/AfterTasks.html"
    }
    else if ((working_code.length>0)&&(working_code.length<9)){
        get_current_playlist();
        get_current_song_names();
        return "../sets/Task1.html";
    }
    else{
        //something went wrong
        alert("ERROR: cannot find next page! current code:"+working_code);
        return "../index.html";
    }
}

const contButton = document.getElementById("cont");

contButton.addEventListener("click", () => {
    console.log("button click");
    writeResults();
    updateCode();
    window.location.href = findNextPage();
    }
);

