//things to do: keypress detection
let metaList = []
let displayList = []

let everything = { //static list that defines each object that can ever exist
  '': {
    char: ".",
    foreground: "white",
    background: "black"
  },
  player: {
    char: "@",
    foreground: "white",
    background: "black",
    update(){
      this.x += 1;
    }
  },
  vWall: {
    char: "|",
    foreground: "white",
    background: "black"
  },
  hWall: {
    char: "—",
    foreground: "white",
    background: "black",
  },
  boulder: {
    char: "0",
    foreground: "white",
    background: "black",
  },
  hole: {
    char: "^",
    foreground: "sienna",
    background: "black"
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
    type: 'vWall',
    x:4,
    y:2
  },
  {
    type: 'boulder',
    x:3,
    y:4
  },
  {
    type: 'hole',
    x:4,
    y:5
  },
  {
    type: 'vWall',
    x:6,
    y:6
  },
  {
    type: 'vWall',
    x:6,
    y:7
  },
  {
    type: 'hWall',
    x:6,
    y:8
  },
  {
    type: 'hWall',
    x:7,
    y:8
  },
]

let width = 10
let height = 10

let display = document.getElementById("display-El")

function sync(){ //syncs object list and metalist
  setup()
  for (let object of objects){
    metaList[object.y][object.x] = object.type
  }
}

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
  sync()
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
  //displayList.splice(atPos, 1, "@")
}

function update() {
  console.log("update")
  for (let object of objects){
    let obj = everything[object.type]
    obj.update?.bind(object)()
  }
  sync()
}

//gameplay functions

function moveLeft() {
  let player = objects.find(object => object.type == 'player')
  let toCollide = metaList[player.y][player.x + 1]
  console.log(toCollide)
  if (toCollide != '') {
    if (toCollide == "boulder") {
      let boulder = objects.find(object => object.x == player.x + 1 && object.y == player.y)
      if (metaList[boulder.y][boulder.x + 1] == '') {
        boulder.x++
        player.x++
      } else if (metaList[boulder.y][boulder.x + 1] == "hole"){
        boulder.x++
        let holeIndex = objects.findIndex(object => object.type == 'hole' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        holeIndex = objects.findIndex(object => object.type == 'boulder' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        player.x++
      }
    } else {
      //pass
    }
  } else {
    player.x++
  }
}
function moveRight() {
  let player = objects.find(object => object.type == 'player')
  let toCollide = metaList[player.y][player.x - 1]
  if (toCollide != '') {
    if (toCollide == "boulder") {
      let boulder = objects.find(object => object.x == player.x - 1 && object.y == player.y)
      if (metaList[boulder.y][boulder.x - 1] == '') {
        boulder.x--
        player.x--
      } else if (metaList[boulder.y][boulder.x - 1] == "hole"){
        boulder.x--
        let holeIndex = objects.findIndex(object => object.type == 'hole' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        holeIndex = objects.findIndex(object => object.type == 'boulder' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        player.x--
      }
    } else {
      //pass
    }
  } else {
    player.x--
  }
}
function moveUp() {
  let player = objects.find(object => object.type == 'player')
  let toCollide = metaList[player.y - 1][player.x]
  if (toCollide != '') {
    if (toCollide == "boulder") {
      let boulder = objects.find(object => object.x == player.x && object.y == player.y - 1)
      if (metaList[boulder.y - 1][boulder.x] == '') {
        boulder.y--
        player.y--
      } else if (metaList[boulder.y - 1][boulder.x] == "hole"){
        boulder.y--
        let holeIndex = objects.findIndex(object => object.type == 'hole' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        holeIndex = objects.findIndex(object => object.type == 'boulder' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        player.y--
      }
    } else {
      //pass
    }
  } else {
    player.y--
  }
}
function moveDown() {
  let player = objects.find(object => object.type == 'player')
  let toCollide = metaList[player.y + 1][player.x]
  if (toCollide != '') {
    if (toCollide == "boulder") {
      let boulder = objects.find(object => object.x == player.x && object.y == player.y + 1)
      if (metaList[boulder.y + 1][boulder.x] == '') {
        boulder.y++
        player.y++
      } else if (metaList[boulder.y + 1][boulder.x] == "hole"){
        boulder.y++
        let holeIndex = objects.findIndex(object => object.type == 'hole' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        holeIndex = objects.findIndex(object => object.type == 'boulder' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        player.y++
      }
    } else {
      //pass
    }
  } else {
    player.y++
  }
}



document.addEventListener("keypress", function(press6){
  if (press6.key == "6"){
    moveLeft()
    sync()
    render()
  }
})
document.addEventListener("keypress", function(press4){
  if (press4.key == "4"){
    moveRight()
    sync()
    render()
  }
})
document.addEventListener("keypress", function(press8){
  if (press8.key == "8"){
    moveUp()
    sync()
    render()
  }
})
document.addEventListener("keypress", function(press2){
  if (press2.key == "2"){
    moveDown()
    sync()
    render()
  }
})


// SETUP
sync()
render()

let loop = () => {
  update()
  setup()
  render()
}

//setInterval(loop, 1000)
