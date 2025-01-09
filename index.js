let displayList = []
let width = 20
let height = 10

/*█
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    alert('hi.');
  }
});
*/

let display = document.getElementById("display-El")


function setup() {
    for (let step = 0; step < width*height; step++) {
        displayList.push(".")
    }
}

setup()

display.style.width=width+"ch"
display.innerText = displayList.join("")
console.log(screen)

