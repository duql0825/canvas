var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// beginPath() 와 closePath()를 통해 그린다.
// ctx.beginPath()
// ctx.rect(20, 40, 50, 50) //사각형 각각 좌표위치
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false)
// x,y좌표 , 원의 반지름, 각도 , * 3.14 * 2
// false는 그리는 방향 (시계방향으로 그려짐)
// ctx.fillStyle = '#FF0000' // 채워지는 색깔
// ctx.fill()
// ctx.closePath()

var score = 0

var x = canvas.width / 2
var y = canvas.height - 30

// 공의 움직이는 속도
var dx = 2
var dy = -2

var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffSetTop = 30
var brickOffSetLeft = 30

var bricks = []
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

var ballRadius = 10

var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth) / 2

// 오른쪽 왼쪽 누르는 기본값은 fasle
var rightPressed = false
var leftPressed = false

// 키다운 키업
document.addEventListener('mousemove', mouseMoveHandler, false)
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

// paddle 그리기
function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

//눌렀을때
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true
  } else if (e.keyCode == 37) {
    leftPressed = true
  }
}

// 땟을 때
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false
  } else if (e.keyCode == 37) {
    leftPressed = false
  }
}

function mouseMoveHandler(e) {
  // relativeX는 수평 마우스 위치 clientX - 캔버스 왼쪽 가장자리
  // 좌표가 0보다 크고 canvas 너비보다 적으면 된다
  var relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2
  }
}
// 매 프레임마다 그리기 위한 draw함수
function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffSetLeft
        var brickY = r * (brickHeight + brickPadding) + brickOffSetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r]
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy
          b.status = 0
          score++
          if (score === brickRowCount * brickColumnCount) {
            alert('You Win')
            document.location.reload()
            clearInterval(interval)
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText('Score: ' + score, 8, 20) // 8,20은 텍스트가 위치한 좌표
}

function draw() {
  //clearRect로 계속 찍히지 않고 clear
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // 공의 x값과 dx값을 더한 값이 캔버스width - 공의 각도보다 크거나
  // 공의 각도가 더 클 경우 dx값을 -로 변경시켜준다
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  //y도 마찬가지
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    // 아랫면에 닿을때
    // 공의 x좌표를 통해 paddle이 있을 경우 튕기고 아니면 Game Over
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    } else {
      alert('Game Over')
      document.location.reload()
    }
  }

  // right
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
  drawBricks()
  drawBall()
  drawPaddle()
  drawScore()
  collisionDetection()
  x += dx
  y += dy
}

setInterval(draw, 10)
