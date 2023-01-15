const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
canvas.width = 1024
canvas.height = 576

const gravity = 1.5

//SPRITE IMAGES                                             
let standright = new Image()
standright.src = ('./Images/NOTMine/spriteStandRight.png')
let standleft = new Image()
standleft.src = ('./Images/NOTMine/spriteStandLeft.png')
let runright = new Image()
runright.src = ('./Images/NOTMine/spriteRunRight.png')
let runleft = new Image()
runleft.src = ('./Images/NOTMine/spriteRunLeft.png')
let flag = new Image()
flag.src = ('./Images/Dinos/Flag.png')
//************************************ */

class Player {
    constructor() { //constructor is a special method of a class for creating and initializing an object instance of that class. 
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {//gravity effect 
            x: 0,
            y: 0
        }

        this.width = 66
        this.height = 150
        this.image = standright
        
        this.frames = 0 //represents what frame in animation we are on.
        this.sprites = {
            stand: {
                right: standright,
                left: standleft,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: runright,
                left: runleft,
                cropWidth: 341,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw() {
        c.drawImage(this.currentSprite, 
                    this.currentCropWidth * this.frames,
                    0,
                    this.currentCropWidth, 
                    400,
                    this.position.x, this.position.y,this.width,this.height)
    }

    update(){ //how we are going to change our players properties 
        this.frames++

        if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right ||this.currentSprite === this.sprites.stand.left)) this.frames = 0 //this will allow us to go through our different animations properly

        else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right|| this.currentSprite === this.sprites.run.left)) this.frames = 0

        this.draw() //redraw the player in it's new position
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        //adding gravity onto our velocity's y axis to accelerate based on condition
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

//Making our Platform CLASS
class Platform{
    constructor({x,y, image}){
        this.position = { //we give each platform a modable x and y
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image,this.position.x, this.position.y)
    }
}


class GenericObject{
    constructor({x,y, image}){
        this.position = { 
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image,this.position.x, this.position.y)
    }
}


//*******************************BASE INFO******************************************************* */
//******************************************************************** */
let image = new Image()
image.src = ('./Images/NOTMine/platform.png')

let platsmalltall = new Image()
platsmalltall.src = ('./Images/NOTMine/platformSmallTall.png')

let backgroundImage = new Image()
backgroundImage.src = ('./Images/NOTMine/background.png')

let hillsImage = new Image()
hillsImage.src = ('./Images/NOTMine/hills.png')

//******************************************************************************* */

let platforms = [
]

//let lilbigplat = [new Platform2({x:platsmalltall.width*4 +300-2, y:370, image: platsmalltall})]

let player = new Player() //define it as a constant because its not changing, and we set it to a new player object 

let background =  [new GenericObject({x:0,y:0,image: backgroundImage}),new GenericObject({x:0,y:0,image: hillsImage})]

let lastKey

//an object which are the keys we want to monitor
const keys = {
    right:{
        pressed: false
    },
    left: {
        pressed: false 
    }
}
let scrolloffset = 0 //keeps track of how far we've scrolled for our win condition


//************************************************************************************** */

function init(){
    image = new Image()
    image.src = ('./Images/NOTMine/platform.png')

    platsmalltall = new Image()
    platsmalltall.src = ('./Images/NOTMine/platformSmallTall.png')

    backgroundImage = new Image()
    backgroundImage.src = ('./Images/NOTMine/background.png')

    hillsImage = new Image()
    hillsImage.src = ('./Images/NOTMine/hills.png')

    flag = new Image()
    flag.src = ('./Images/Dinos/Flag.png')  
    
    platforms = [new Platform({x:-1, y:470, image}),
        new Platform({x:image.width*4 +300-2 + image.width - platsmalltall.width, y:270, image: platsmalltall}),
        new Platform({x:image.width*10 +300-2 + image.width - platsmalltall.width, y:270, image: platsmalltall}),
        new Platform({x:image.width*10 +700-2 + image.width - platsmalltall.width, y:270, image: platsmalltall}),
        new Platform({x:image.width*10 +700-2 + image.width - platsmalltall.width, y:130, image: platsmalltall}),
        new Platform({x:image.width - 3, y:470, image}),
        new Platform({x:image.width*2 +150, y:470, image}),
        new Platform({x:image.width*3 +300, y:470, image}),
        new Platform({x:image.width*4 +300-3, y:470, image}),
        new Platform({x:image.width*5 +700-3, y:470, image}),
        new Platform({x:image.width*6 +400-3, y:470, image}),
        new Platform({x:image.width*7 +800-3, y:470, image}),
        new Platform({x:image.width*8 +700-3, y:470, image}),
        new Platform({x:image.width*9 +700-3, y:470, image}),
        new Platform({x:image.width*10 +700-3, y:470, image}),
        new Platform({x:image.width*12 +600-3, y:470, image}),
        new Platform({x:image.width*13 +600-4, y:470, image}),
        new Platform({x:image.width*14 +600-4, y:470, image}),
        new Platform({x:8500, y:53, image: flag})
    ]
    // flag_img = new Platform({x:image.width*10 +700-2 + image.width - platsmalltall.width, y:130, image: flag})

    player = new Player() 

    background =  [new GenericObject({x:0,y:0,image: backgroundImage}),new GenericObject({x:0,y:0,image: hillsImage})]

    scrolloffset = 0 
}

function animate(){ //our animation loop
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height) //so its not drawing ontop of old drawing

    background.forEach((background) => {
        background.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })     

    player.update()

    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = player.speed
    }
    else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrolloffset === 0 && player.position.x > 0)){
        player.velocity.x = -player.speed
    }
    //our else condition is used to scroll when we are out of the range of no screen scroll
    else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrolloffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            }) 
            background.forEach((background)=> {
                background.position.x -= player.speed*.66
            }) 
        }

        else if (keys.left.pressed){
            scrolloffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })  
            background.forEach((background)=> {
                background.position.x += player.speed*.66
            }) 
        }
    }

    
    //platform-player collision detection
    platforms.forEach((platform) => {
        if ((player.position.y + player.height <= platform.position.y)&&
        (player.position.y + player.height + player.velocity.y >= platform.position.y) && 
        (player.position.x + player.width >= platform.position.x) && 
        (player.position.x  <= platform.position.x + platform.width)){
            player.velocity.y = 0
        }
    })

    //Sprite Switching Conditional
    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right){ // not in standing state
        player.frames = 1 
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left){
        player.frames=1
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left){
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right){
        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    
    //win condition
    if (scrolloffset > 8200){
        console.log("you win")
        init()
    }

    //lose condition
    if (player.position.y > canvas.height){
        console.log("You lose")
        init()
        
    }
}

init()
animate()

//this is a method which looks out for an event (looks for keypressed)

addEventListener('keydown', ({key}) => {
    //we use a switch case statement to individualize each key
    switch (key) {
        case 'a':
            console.log('left')
            keys.left.pressed = true
            lastKey = 'left'
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = true
            lastKey = 'right'
            
            break
        case 'w':
            console.log('up')
            player.velocity.y -= 25 //moving player up (-ve is up)'
            break
    }
})

//we now need to add an event listener for keyup, which is when the key is let go so when we want velocity to be 0
addEventListener('keyup', ({key}) => {
   
    switch (key) {
        case 'a':
            console.log('left')
            keys.left.pressed = false
            //lastKey = 'left_off'
            // player.currentSprite = player.sprites.stand.left
            // player.currentCropWidth = player.sprites.stand.cropWidth 
            // player.width = player.sprites.stand.width 
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = false
            //lastKey = 'right_off'
            break
        case 'w':
            console.log('up')
            break
    }
})
