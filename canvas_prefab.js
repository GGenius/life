const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

document.body.style.margin = 0
document.body.style.padding = 0

document.body.style.overflow = 'hidden'

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.onresize = e =>
{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

document.body.appendChild(canvas)

function clear(r = 255, g = 255, b = 255, a = 1)
{
    let color = `rgba(${r}, ${g}, ${b}, ${a})`
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}