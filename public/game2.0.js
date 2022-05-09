class Player {
    constructor(name, x, y) {
      this.name = name
      this.deltaX = x
      this.deltaY = y
  
      this.move = function (x, y) {
        this.deltaX += x
        this.deltaY += y
      }
      this.position = function () {
        return this.deltaX + " " + this.deltaY
      }
    }
  }
  
  
  const canvas = document.querySelector("canvas")
  const gl = canvas.getContext('2d')
  
  if (gl == null) {
    alert('Webgl not supported')
  }
  let speed = 10
  let deltaX = 0
  let deltaY = 0
  
  let data = document.getElementById('data').innerHTML
  let user = document.getElementById('username').innerHTML
  
  
  function drawCircle(x, y, color) {
    gl.beginPath();
    gl.arc(x, y, 20, 0, 2 * Math.PI);
    gl.fillStyle = color;
    gl.fill();
    gl.closePath()
  }
  
  function draw() {
    gl.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(deltaX, deltaY, 'rgba(250,250,250,0.8)')
    // for (let z = 0; z < players.length; z++) {
    //   drawCircle(players[z].deltaX, players[z].deltaX, 'rgba(100,100,100,0.8)')
    // }
    let div = document.getElementById('data2')
    div.innerHTML = "X: " + deltaX + "  Y: " + deltaY
  
    window.requestAnimationFrame(draw)
  }
  
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  
  var dataS = JSON.stringify({
    "username": user,
    "deltaX": deltaX,
    "deltaY": deltaY
  });
  
  
  fetch('http://10.140.86.105:3000/data', {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: dataS
  }).then(() => {
      dispatch(contactFormSubmitSuccess());
  });
  
  // Movement
  window.addEventListener("keydown", keysPressed, false);
  window.addEventListener("keyup", keysReleased, false);
  
  var keys = [];
  
  function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;
  
    // left
    if (keys[37]) {
      deltaX -= speed;
    }
  
    // right
    if (keys[39]) {
      deltaX += speed;
    }
  
    // down
    if (keys[38]) {
      deltaY -= speed;
    }
  
    // up
    if (keys[40]) {
      deltaY += speed;
    }
  
    e.preventDefault();
  
    draw();
  }
  
  function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
  }
  
  
  draw()