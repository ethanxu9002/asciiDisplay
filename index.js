
let metaList = []
let displayList = []

let everything = { //static list that defines each object that can ever exist
  '': {
    char: ".",
    foreground: 'white',
    background: 'black'
  },
  player: {
    char: "@",
    foreground: "white",
    background: "black",
    update(){
      this.x += 1;
    }
  },
  cat: {
    char: 'f',
    foreground: "white",
    background: "black"
  },
  floatingEye: {
    char: 'e',
    foreground: "blue",
    background: "black"
  },
  zombie: {
    char: 'Z',
    foreground: "darkorange",
    background: "black"
  }

  // "full":['@', '<span class="redF"> <span class="DblueB"']
}

let objects = [ //live list of everything currently existing
  {
    type: 'player',
    x:1,
    y:2,
  },
  {
    type: 'cat',
    x:4,
    y:2,
    id:0
  },
  {
    type: 'floatingEye',
    x:3,
    y:3,
    id:0
  },
  {
    type: 'zombie',
    x:5,
    y:4,
    id:0
  }
]

let width = 10
let height = 10

let display = document.getElementById("display-El")

//processing functions
function render() {
  // render
  let tableEl = document.createElement("table")//creates display-El
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
}
function setup() {
  metaList = []
    for (let y = 0; y < height; y++) {
      let row = []//initaliation row by row
      for (let x = 0; x < width; x++){
        row.push('')
      }  
      metaList.push(row)
    }
    //console.log(metaList)
    for (let object of objects){
      metaList[object.y][object.x] = object.type
    }
    //displayList.splice(atPos, 1, "@")
}

function update() {
  console.log("update")
  for (let object of objects){
    let obj = everything[object.type]
    obj.update?.bind(object)()
  }
}
//gameplay functions
function move(obj, id, x, y) {

}

document.addEventListener("kepress", function(press6){
  if (press6.key == "6"){

  }
})

setup()

let loop = () => {
  update()
  setup()
  render()
}

setInterval(loop, 1000)
