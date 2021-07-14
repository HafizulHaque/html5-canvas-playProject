const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('mousemove', function(event){
  mouse.x = event.x
  mouse.y = event.y
  console.log(`mouse at (${event.x}, ${event.y})`)
})

canvas.addEventListener('click', function(event){
  init()
})

class Particle {
  constructor(){
    this.x = mouse.x || Math.random() * canvas.width
    this.y = mouse.y || Math.random() * canvas.height
    this.size = Math.random()*20 + 10;
    this.speedX = Math.random()*5 -2.5
    this.speedY = Math.random()*5 -2.5
    this.hue = Math.random() * 360
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    this.size = this.size > 0.2 ? this.size - 0.2 : 0
  }
  draw(){
    this.hue += 2
    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
    ctx.fill()
  }
}

function init(){
  for(let i = 0; i < 100; i++){
    particlesArray.push(new Particle())
  }
}

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
    if(particlesArray[i].size==0){
      particlesArray.splice(i, 1)
      i--
      continue
    }
    particlesArray[i].update()
    particlesArray[i].draw()
  }
}

function animate(){
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleParticles()
  requestAnimationFrame(animate)
}

animate()