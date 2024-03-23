const sortableList = document.querySelector(".sortable-list"); //select the first thing with class .sortable-list
const items = sortableList.querySelectorAll(".item"); //from the sortableList, select all things with class .item

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        //this is needed to make sure the thing you're dragging stays visible
        setTimeout(() => item.classList.add("dragging"), 0); 
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => {item.classList.remove("dragging");item.classList.add("touched")});

});

const updateSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and ... making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
        //return e.clientY <= sibling.offsetTop + sibling.offsetHeight*3;
        //why is this 3? Trial and error-ed but why??
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight*3 ;
    });
 
    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
    sortableList.insertBefore(document.getElementById("bottom-genre"),null);
}

sortableList.addEventListener("dragover", updateSortableList);
sortableList.addEventListener("dragenter", function (e){
    e.preventDefault();
} );