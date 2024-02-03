const sortableList = document.querySelector(".sortable-list"); //select the first thing with class .sortable-list
const items = sortableList.querySelectorAll(".item"); //from the sortableList, select all things with class .item

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        //item.classList.add("dragging")
        //this is needed to make sure the thing you're dragging stays visible
        setTimeout(() => item.classList.add("dragging"), 0); 
    });
    // Removing dragging class from item on dragend event
    item.addEventListener("dragend", () => {item.classList.remove("dragging");item.classList.add("touched")});

    /* This attempts to color the thing on mouse enter, but its still buggy.
    item.addEventListener('mouseenter', function () {
        this.classList.add('hover');
    });
    item.addEventListener('mouseleave', function () {
        this.classList.remove('hover');
    });*/
});

const updateSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and ... making array of them
    let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    //nb y-coordinate increases as we go down. weird.
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight*3;
        //why is this 3? Trial and error-ed but why??
    });

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
}

sortableList.addEventListener("dragover", updateSortableList);
sortableList.addEventListener("dragenter", function (e){
    e.preventDefault();
} );