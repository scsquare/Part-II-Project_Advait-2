const scales=JSON.parse(localStorage.getItem('scales'))["scales"]


/**
 * Given set name and attributed required, reads the parsed json file to return the right attribute.
 *
 * @param   {string} set  The set name. One of A1,A2,...E1,E2.
 * @param   {string} attr The attribute you want. One of start_genre, end_genre, spotify_link, song_names.
 * @returns  Either a list of strings (song_names), or a string (all other cases). Or an error.
 */
function retrieve_attr(set,attr){
    try{
        //type checking attempt
        idx=set.charCodeAt(0)-65
        
        if ((!(typeof(set)=="string"))||(!(typeof(attr)=="string"))){
            throw TypeError
        }

        //main body
        if (attr=="start_genre" || attr=="end_genre"){
            return scales[idx][attr]
        }
        else if (attr=="spotify_link"){
            return scales[idx][attr][Number(set.slice(1))-1]
        }
        else if (attr=="song_names"){
            var tmp=[];
            var indexes;
            if (Number(set.slice(1))==1){
                indexes=[0,2,4,6,7,8,10,12]
            }
            else if (Number(set.slice(1))==2){
                indexes=[1,3,5,6,7,8,9,11]
            }
            else{
                throw ("get_current_playlist -> retrieve_attr song_names: set number out of range")
            }
    
            for (i of indexes){
                tmp.push(scales[idx]["song_names"][i])
            }
            return tmp
        }
        else{
            throw ("get_current_playlist -> retrieve_attr: attr does not exist")
        }
    }
    catch (err){
        alert(err)
        return err
    }
}


/**
 * Sets the spotify embed src to the correct playlist url.
 * Relies on localstorage for input.
 */
function get_current_playlist(){
    var spotifyPlaylist=document.getElementById("spotify-playlist");
    var working_page_code=localStorage.getItem("working_page_code");
    //sanity checks
    try{
        if (working_page_code.length==0) throw ("No more sets to do??")
        var this_set=working_page_code.slice(0,2)
        if (["A1","A2","B1","B2","C1","C2","D1","D2","E1","E2"].includes(this_set)){
            //fine
        }
        else{throw ("Invalid set number")}
    }
    catch(err){
        alert("ERROR get_current_playlist.js:"+err+".");
    }

    if (localStorage.getItem('scales')==null){
        throw ("Spotify playlist information failed to initialise");
    }
    var src=retrieve_attr(this_set,"spotify_link");
    spotifyPlaylist.src=src;
}

/**
 * Sets the song names in drag n drop options.
 * Relies on local storage to work.
 */
function get_current_song_names(){
    //assume sanity checks are done by the previous function
    var this_set=localStorage.getItem("working_page_code").slice(0,2)
    var list_of_song_names=retrieve_attr(this_set,"song_names")

    var song_names=document.getElementsByClassName("song-name");
    for (var i=0;i<song_names.length;i++){
        song_names[i].innerHTML=(song_names[i].innerHTML).concat(list_of_song_names[i]);
    }
}

/**
 * Sets header and description to include correct start and stop genre names.
 */
function get_start_stop_genres(){
    var this_set=localStorage.getItem("working_page_code").slice(0,2)

    document.getElementById("header").innerHTML="From "+ retrieve_attr(this_set,"start_genre")+" to "+retrieve_attr(this_set,"end_genre")

    document.getElementById("description").innerHTML="Sort songs on the scale of "+ retrieve_attr(this_set,"start_genre")+" (top) to "+retrieve_attr(this_set,"end_genre") +" (bottom).";
}

function five_minute_reminder(){
    document.getElementById("reminder").innerHTML="(Reminder: You have already spent 5 minutes on this task. Each set should take approx. 5 minutes to sort.)"
}

get_current_playlist();
get_current_song_names();
get_start_stop_genres();

const myTimeout = setTimeout(five_minute_reminder, 1000*60*5);
