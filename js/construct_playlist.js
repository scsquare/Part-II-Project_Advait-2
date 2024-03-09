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


storageCheckResults=storageCheck()

fetch('data/scales_withsongname.json')
    .then((response) => response.json())
    .then((json) => {localStorage.setItem("scales",JSON.stringify(json))});
