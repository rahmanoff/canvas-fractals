window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // canvas settings
  ctx.fillStyle = 'green';
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.7)'
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  // effect settings
  let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
  const maxLevel = 7;
  const branches = 2;

  let sides = 10;
  let scale = 0.85;
  let spread = -0.2;
  let color = 'hsl(' + Math.random() * 360 + ',100%, 50%)';
  let lineWidth = 30;

  // contros
  const randomizeButton = document.getElementById('randomizeButton');
  const resetButton = document.getElementById('resetButton');

  const slider_spread = document.getElementById('spread');
  const label_spread = document.querySelector('[for="spread"]');
  slider_spread.addEventListener('change', function (e) {
    spread = e.target.value;
    updateSliders();
    drawFractal();
  })

  const slider_sides = document.getElementById('sides');
  const label_sides = document.querySelector('[for="sides"]');
  slider_sides.addEventListener('change', function (e) {
    sides = e.target.value;
    updateSliders();
    drawFractal();
  });

  function drawBranch(level) {
    if (level > maxLevel) return;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
    randomizeButton.style.backgroundColor = color;
  }

  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 18 + 2);
    spread = Math.random() * 0.6 - 0.3;
    color = 'hsl(' + Math.random() * 360 + ',100%, 50%)';
    lineWidth = Math.floor(Math.random() * 30 + 20);
  }

  randomizeButton.addEventListener('click', function () {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  function resetFractal() {
    sides = 15;
    scale = 0.85;
    spread = 0.2;
    color = 'hsl(290,100%, 50%)';
    lineWidth = 30;
  }

  resetButton.addEventListener('click', function () {
    resetFractal();
    updateSliders();
    drawFractal();
  })

  function updateSliders() {
    slider_spread.value = spread;
    label_spread.innerText = 'Spread:' + Number(spread).toFixed(1);
    slider_sides.value = sides;
    label_sides.innerText = 'Sides:' + sides;
  }
  updateSliders();

  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
    ctx.shadowColor = 'rgba(0,0,0,0.7)'
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    drawFractal();
  });
});