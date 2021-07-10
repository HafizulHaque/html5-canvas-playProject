const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
console.log(ctx)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: null,
  y: null
}

const color = {
  h: 0
}

canvas.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
  drawCircle()
})

function drawCircle(){
  ctx.fillStyle = `hsl(${color.h++%361}, 100%, 50%)`
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI*2)
  ctx.fill()
}

// drawCircle()