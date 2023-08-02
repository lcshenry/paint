const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const inputColor = document.querySelector('.input-color')
const tool = document.querySelectorAll('.button-tool')
const sizeButtons = document.querySelector('.button-size')
const buttonClear = document.querySelector('.button-clear')

let brushSize = 30
let isPainting = false

let activeTool = "brush"

inputColor.addEventListener('change', ({target}) => {
    ctx.fillStyle = target.value
})

canvas.addEventListener('mousedown', (event) => {
    const {clientX, clientY} = event
    isPainting = true

    if(activeTool == "brush"){
        draw(clientX, clientY)
    }
    if(activeTool == "rubber"){
        erase(clientX, clientY)
    }
})

canvas.addEventListener('mousemove', (event) => {
    const {clientX, clientY} = event
    if(isPainting){
        if(activeTool == "brush"){
            draw(clientX, clientY)
        }
        if(activeTool == "rubber"){
            erase(clientX, clientY)
        }
    }
})

canvas.addEventListener('mouseup', ({clientX, clientY}) => {
    isPainting = false
})

const draw = (x,y) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft,y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI )
    ctx.fill()
}

const erase = (x,y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft,y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI )
    ctx.fill()
}

const selectTool = ({target}) => {
 const selectedTool = target.closest("button")
 const action = selectedTool.getAttribute('data-action')

if(action){
    activeTool = action
}

}
tools.forEach ((tool) => {
    tool.addEventListener('click', selectTool)
})