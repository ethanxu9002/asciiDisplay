
let metaList = []
let displayList = []

let everything = {
  '': {
    char: ".",
    foreground: 'white',
    background: 'black'
  },
  player: {
    char: "@",
    foreground: "red",
    background: "black",
  },
  cat: {
    char: 'f',
    foreground: "pink",
    background: "black"
  }
  // "full":['@', '<span class="redF"> <span class="DblueB"']
}

let objects = [
  {
    type: 'player',
    x: 1,
    y: 2,
  },
  {
    type: 'cat',
    x: 4,
    y: 2,
  },
]

let width = 10
let height = 10

let display = document.getElementById("display-El")



function setup() {
    for (let y = 0; y < height; y++) {
      let row = []
      for (let x = 0; x < width; x++){
        row.push('')
      }  
      metaList.push(row)
    }
    console.log(metaList)
    for (let object of objects){
      metaList[object.y][object.x] = object.type
    }
    // render
    let tableEl = document.createElement("table")
    for (let row of metaList){
      let rowEl = document.createElement("tr")
      for (let char of row){
        let obj = everything[char]
        let locEl = document.createElement("td")
        locEl.style.color = obj.foreground
        locEl.style.backgroundColor = obj.background
        locEl.innerHTML = obj.char
        rowEl.appendChild(locEl)
      }
      tableEl.appendChild(rowEl)
    }
    display.innerHTML = ""
    display.appendChild(tableEl)
    //displayList.splice(atPos, 1, "@")
}

setup()
