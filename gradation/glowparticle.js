const PI2 = Math.PI * 2

export class GlowParticle {
  constructor(x, y, radius, rgb) {
    this.x = x
    this.y = y
    this.radius = radius
    this.rgb = rgb

    this.vx = Math.random() * 4
    this.vy = Math.random() * 4

    this.sinValue = Math.random()
  }
  animate(ctx, stageWidth, stageHeight) {
    this.sinValue += 0.01

    this.radius = Math.sin(this.sinValue)

    this.x += this.vx
    this.y += this.vy

    if (this.x < 0) {
      this.vx *= -1
      this.x += 10
    } else if (this.x > stageWidth) {
      this.vx *= -1
      this.x -= 10
    }

    if (this.y < 0) {
      this.vy *= -1
      this.y += 10
    } else if (this.y > stageWidth) {
      this.vy *= -1
      this.y -= 10
    }

    ctx.beginPath()

    ctx.fillStyle = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`
    ctx.arc(this.x, this.y, this.radius, 0, PI2, false)
    ctx.fill()
  }
}
