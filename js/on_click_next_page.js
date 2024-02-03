function writeResults(){
    var items= document.getElementsByClassName("song-name");

    const texts=[];

    for (let i=0;i<8;i++){
        var temp=Number((items[i].innerText)[0])-1; //changes it to 0-7
        texts[i]=temp;
    }

    if (typeof(Storage) !== "undefined") {
        // store in local storage
        var current_page_code=localStorage.getItem("current_page_code");
       
        //THE ACTUAL STORE
        localStorage.setItem(current_page_code,texts); 

        //ASSERT: UID is not null
        //this is enforced by not even showing the next button in BeforeTasks until UID is ready 

        UID=localStorage.getItem("UID");

        data=UID+"."+current_page_code+"."+texts;
        post(data);

        if (localStorage.getItem(current_page_code)===null){
            alert("ERROR on_click_next_page: store failed")
        }


    } else {
        // Sorry! No Web Storage support..
        alert("ERROR: No Web Storage support.");
    }
}

function updateCode(){ 
    //update working code and current code
    var old_working_code=localStorage.getItem("working_code");
    var new_working_code=old_working_code.slice(1,);
    localStorage.setItem("working_code",new_working_code);
    localStorage.setItem("current_page_code",new_working_code.slice(0,1));

    //alert("new working code:"+localStorage.getItem("working_code")+" next page:"+localStorage.getItem("current_page_code"));

}

function findNextPage(){
    var current_page_code=localStorage.getItem("current_page_code");
    if (current_page_code===null){
        alert("ERROR: ran out of current page codes??");
    }
    if (current_page_code==1){
        return "../sets/Intro1.html";
    }
    else if (current_page_code==2){
        return "../sets/Intro2.html"
    }
    else if (current_page_code==3){
        return "../sets/AfterTasks.html"
    }
    else if ((current_page_code>="A")&&(current_page_code<="I")){
        //first task (tempo)
        return "../sets/Task1.html";
    }
    else if ((current_page_code>="J")&&(current_page_code<="R")){
        //second task (loudness)
        return "../sets/Task2.html"
    }
    else{
        //something went wrong
        alert("ERROR: cannot find next page! Did you enter the correct code? :"+localStorage.getItem("init_code"));
        return "../index.html";
    }
}

const contButton = document.getElementById("cont");

contButton.addEventListener("click", () => {
    var current_page_code=localStorage.getItem("current_page_code");
    if (current_page_code>="A"){
        writeResults();
    }
    updateCode();
    window.location.href = findNextPage();
    }
);

//"../sets/Intro1.html"