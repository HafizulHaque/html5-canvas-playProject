const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []
let hue = 0;

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
  // console.log(`mouse at (${event.x}, ${event.y})`)
  init(1)
})

canvas.addEventListener('click', function(event){
  init(100)
})

class Particle {
  constructor(){
    this.x = mouse.x || Math.random() * canvas.width
    this.y = mouse.y || Math.random() * canvas.height
    this.size = Math.random()* 10 + 5;
    this.speedX = Math.random()*10 - 5
    this.speedY = Math.random()*10 - 5
    this.hue = Math.random() * 360
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    this.size = this.size > 0.2 ? this.size - 0.1 : 0
  }
  draw(){
    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
    ctx.fill()
  }
}

function init(n){
  for(let i = 0; i < n; i++){
    particlesArray.push(new Particle())
  }
}

function handleParticles(){
  for(let i = 0; i < particlesArray.length; i++){
    for(let j = i+1; j < particlesArray.length; j++){
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      const dist = Math.sqrt(dx*dx+dy*dy)
      if(dist < 150){
        ctx.strokeStyle = `hsl(${particlesArray[i].hue}, 100%, 50%)`
        ctx.lineWidth = particlesArray[i].size/10
        ctx.beginPath()
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
      }
    }
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
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // ctx.fillStyle =  `rgba(0, 0, 0, 0.1)`
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  handleParticles()
  hue = (hue+1)%360;
  requestAnimationFrame(animate)
}

animate()