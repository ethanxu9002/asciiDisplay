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

let atPos = 0

function setup() {
    for (let step = 0; step < width*height; step++) {
        displayList.push(".")
    }
    displayList.splice(atPos, 1, "@")
}
function update() {
  display.innerText = displayList.join("")
}

setup()

//Movement
document.addEventListener("keypress", function(press6) {
  if (press6.key == "6"){
    displayList.splice(atPos, 1, ".")
    displayList.splice(atPos + 1, 1, "@")
    atPos += 1
  }
  update()
})
document.addEventListener("keypress", function(press4) {
  if (press4.key == "4"){
    displayList.splice(atPos, 1, ".")
    displayList.splice(atPos - 1, 1, "@")
    atPos -= 1
  }
  update()
})
document.addEventListener("keypress", function(press2) {
  if (press2.key == "2"){
    displayList.splice(atPos, 1, ".")
    displayList.splice(atPos + width, 1, "@")
    atPos += width
  }
  update()
})
document.addEventListener("keypress", function(press8) {
  if (press8.key == "8"){
    displayList.splice(atPos, 1, ".")
    displayList.splice(atPos - width, 1, "@")
    atPos -= width
  }
  update()
})

display.style.width=width+"ch"
display.innerText = displayList.join("")
console.log(screen)
