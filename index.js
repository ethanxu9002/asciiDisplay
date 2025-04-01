//things to do: RENDERING ORDER MATTERS WHEN OBJECTS OVERLAP

/*

setup() and setupWithCode() conflicts with metaList

*/



let metaList = []
let displayList = []

let everything = { //static list that defines each object that can ever exist
  blankWall:{
    char: ".",
    foreground: "black",
    background: "black",
    solid: true
  },
  empty: {
    char: ".",
    foreground: "white",
    background: "black",
    solid: false
  },
  player: {
    char: "@",
    foreground: "white",
    background: "black",
    solid: true,
    update(){
      this.x += 1;
    }
  },
  vWall: {
    char: "|",
    foreground: "white",
    background: "black",
    solid: true
  },
  hWall: {
    char: "—",
    foreground: "white",
    background: "black",
    solid: true
  },
  boulder: {
    char: "0",
    foreground: "white",
    background: "black",
    solid: true
  },
  hole: {
    char: "^",
    foreground: "sienna",
    background: "black",
    solid: false
  },
  upStair: {
    char: "<",
    foreground: "white",
    background: "black",
    solid: false
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
    type: 'vWall',
    x:4,
    y:2
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
  {
    type: 'upStair',
    x:3,
    y:6
  },
  {
    type: 'boulder',
    x:3,
    y:4
  },
  {
    type: 'player',
    x:1,
    y:1
  }

]

let width = 10
let height = 10

let display = document.getElementById("display-El")

function sync(){ //syncs object list and metalist
  setup()
  for (let object of objects){
    //console.log(object)
    //console.log("sync", metaList[object.y][object.x])
    metaList[object.y][object.x] = object.type
    //console.log(metaList)
  }
  
}

function setupWithSeed(seed, px, py){
  width = seed[0].length
  height = seed.length

  let key = {  
    e:'empty',
    v:'vWall',
    h:'hWall',
    H:'hole',
    b:'boulder',
    u:'upStair',
    w:'blankWall'
    //P:'player'
  }

  objects = []

  for(row in seed){
    for(char in seed[row]){
      objects.push({
        type:key[seed[row][char]],
        x:Number(char),
        y:Number(row)
      })
    }
  }
  
  objects.push({
    type:'player',
    x:px,
    y:py
  })
  //purges 'empty' objects
  objects = objects.filter(object => object.type != 'empty')
  

}

setupWithSeed(
  ['hhhhhhhhwhhhhhh',
    'vuveeeehhheeeev',
    'vHvhebbeeeebeev',
    'vHvveebbvebebev',
    'vHvveeeeveeeeev',
    'vHvhhhhhhbhhhhv',
    'vHvwwwwveeeeeev',
    'vHvhhhhheeeeeev',
    'veeHHHHbbbbeeev',
    'veehhhhheeeeeev',
    'hhhhwwwhhhhhhhh'
  ],
     3, 1)

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
      row.push("empty")
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

function move(dx ,dy) {
  let player = objects.find(object => object.type == 'player')
  let collideKey = metaList[player.y + dy][player.x + dx]
  let toCollide = everything[collideKey]
  console.log(collideKey, toCollide)
  if (toCollide.solid || (collideKey == 'hole')) {
    if (collideKey == "boulder") {
      let boulder = objects.find(object => object.x == player.x + dx && object.y == player.y + dy && object.type == 'boulder')
      //console.log('eval boulder collide')
      if (everything[metaList[boulder.y + dy][boulder.x + dx]].solid) {
        //pass
      } else if (metaList[boulder.y + dy][boulder.x + dx] == "hole"){
        boulder.x += dx
        boulder.y += dy
        let holeIndex = objects.findIndex(object => object.type == 'hole' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        holeIndex = objects.findIndex(object => object.type == 'boulder' && object.x == boulder.x && object.y == boulder.y)
        objects.splice(holeIndex,1)
        player.x += dx
        player.y += dy
      } else {
        boulder.x += dx
        boulder.y += dy
        player.x += dx
        player.y += dy
      }
    } else {
      //pass
    }
  } else {
    player.x += dx
    player.y += dy
  }
}


document.addEventListener("keypress", function(press6){
  if (press6.key == "6"){
    move(1,0)
    sync()
    render()
  }
})
document.addEventListener("keypress", function(press4){
  if (press4.key == "4"){
    move(-1,0)
    sync()
    render()
  }
})
document.addEventListener("keypress", function(press8){
  if (press8.key == "8"){
    move(0,-1)
    sync()
    render()
  }
})
document.addEventListener("keypress", function(press2){
  if (press2.key == "2"){
    move(0,1)
    sync()
    render()
  }
})


// SETUP
console.log("initialize", objects)
sync()
render()

let loop = () => {
  update()
  setup()
  render()
}

//setInterval(loop, 1000)
