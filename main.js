const container = document.querySelector("#container");
const deleteicon = document.querySelector("img");
const delete_rect =deleteicon.getBoundingClientRect();
var activeItem = null;
var active = false;
var todelete = false;
// currentX, currentY: relative position for translate
// initialX, initialY: initial position of dragged element for the next drag operation
// xOffset, yOffset: where your pointer is relative to the dragged element's position.
// clientX, clientY: the absolute position of the pointer inside the container element.

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.target !== e.currentTarget) { // console.log(e.currentTarget)  // <div id="container">...</div>
        active = true;
        activeItem = e.target;

        if (activeItem !== null) {
            if (!activeItem.xOffset) { activeItem.xOffset = 0; }
            if (!activeItem.yOffset) { activeItem.yOffset = 0; }
            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
}}}

function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
        if(todelete){
            activeItem.parentNode.removeChild(activeItem)
        }
    }
    active = false;
    activeItem = null;
}

function drag(e) {
    if (active) {
        e.preventDefault();
        if (e.type === "touchmove") {
            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }
        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;
        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);

        var item_rect =activeItem.getBoundingClientRect();
        todelete = !(item_rect.right < delete_rect.left +10 || 
            item_rect.bottom < delete_rect.top+10 )
        if(todelete){
            activeItem.classList.add("todelete")
        }else{
            activeItem.classList.remove("todelete")
        }
    }
    
    
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

var selected_size = document.getElementById("select");
var input_text = document.getElementById("text");
var selected_color = document.getElementById("color");

function add(){
    var size = selected_size.value;
    var text = input_text.value;
    var color = selected_color.value;
    console.log(size)
    console.log(text)
    console.log(color)
    create(size,text,color);
    input_text.value = ""
}

function create(size,text,color){
    var new_div = document.createElement("div");
    const newContent = document.createTextNode(text);
    new_div.appendChild(newContent);
    new_div.classList.add("item");
    new_div.style.backgroundColor=color;
    var length;
    if(size=="Large"){ length="150px"; }
    else if(size=="Midium"){ length="130px"; }
    else if (size=="Small"){ length="100px"; }
    new_div.style.width=length;
    new_div.style.height=length;
    new_div.addEventListener("click", ()=>{listenForDoubleClick(new_div)});
    new_div.addEventListener("blur", ()=>{new_div.contentEditable=false});
    container.appendChild(new_div);
}

var add_button = document.getElementById("add");
add_button.addEventListener("click", add);

function listenForDoubleClick(element) {
    element.contentEditable = true;
    setTimeout(()=>{if (document.activeElement !== element) {
        element.contentEditable = false; }}, 300);
}