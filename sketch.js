function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let sensors = [];

let sensorsActive = [];

let dataPackets = [];

let cityDataReceived = 0;

function setup() {

  createCanvas(800, 400);

  textAlign(CENTER, CENTER);

  rectMode(CENTER);

  // Criar sensores em posições fixas

  let startX = 100;

  let startY = 250;

  let spacing = 60;

  for (let i = 0; i < 6; i++) {

    let x = startX + (i % 3) * spacing;

    let y = startY + floor(i / 3) * spacing;

    sensors.push({ x: x, y: y, size: 30 });

    sensorsActive.push(false);

  }

}

function draw() {

  background(30, 144, 255); // Céu azul

  // Desenhar campo

  fill(34, 139, 34);

  rect(160, 260, 260, 160, 20);

  // Desenhar sol

  fill(255, 223, 0);

  ellipse(80, 80, 80, 80);

  // Desenhar árvores

  drawTree(50, 220);

  drawTree(110, 230);

  // Desenhar cidade

  fill(150);

  rect(580, 260, 100, 120);

  // Janelas da cidade

  fill(255, 255, 180);

  for (let r = 0; r < 5; r++) {

    for (let c = 0; c < 4; c++) {

      rect(540 + c * 20, 210 + r * 20, 15, 15, 3);

    }

  }

  // Mostrar sensores e estado

  for (let i = 0; i < sensors.length; i++) {

    if (sensorsActive[i]) {

      fill('lime');

    } else {

      fill('darkgreen');

    }

    let s = sensors[i];

    rect(s.x, s.y, s.size, s.size, 5);

    fill(0);

    textSize(12);

    text('S', s.x, s.y);

  }

  // Mostrar dados recebidos na cidade

  fill(255);

  rect(580, 70, 140, 60, 10);

  fill(0);

  textSize(16);

  text("Sensores Ativos: " + sensorsActive.filter(a => a).length, 580, 50);

  text("Dados Recebidos: " + cityDataReceived, 580, 90);

  // Atualizar e desenhar pacotes de dados

  for (let i = dataPackets.length - 1; i >= 0; i--) {

    let p = dataPackets[i];

    // mover em direção à cidade (580, 260)

    let dx = 580 - p.x;

    let dy = 260 - p.y;

    let dist = sqrt(dx * dx + dy * dy);

    let speed = 5;

    if (dist > speed) {

      p.x += (dx / dist) * speed;

      p.y += (dy / dist) * speed;

    } else {

      cityDataReceived++;

      dataPackets.splice(i, 1);

    }

    // desenhar pacote

    fill(0, 200, 255);

    noStroke();

    ellipse(p.x, p.y, 12);

  }

  // Mostrar mensagem final se receber 15 ou mais dados

  if (cityDataReceived >= 15) {

    fill(0, 255, 100);

    textSize(32);

    text("Conexão Estabelecida!", width / 2, 30);

  } else if (sensorsActive.some(a => a)) {

    fill(255);

    textSize(24);

    text("Transmissão em andamento...", width / 2, 30);

  } else {

    fill(255);

    textSize(24);

    text("Clique nos sensores para ativar", width / 2, 30);

  }

}

function mousePressed() {

  for (let i = 0; i < sensors.length; i++) {

    let s = sensors[i];

    if (

      mouseX > s.x - s.size / 2 &&

      mouseX < s.x + s.size / 2 &&

      mouseY > s.y - s.size / 2 &&

      mouseY < s.y + s.size / 2

    ) {

      sensorsActive[i] = !sensorsActive[i];

      if (sensorsActive[i]) {

        // adicionar um pacote de dados saindo do sensor

        dataPackets.push({ x: s.x, y: s.y });

      }

      break;

    }

  }

}

function drawTree(x, y) {

  fill(101, 67, 33);

  rect(x, y, 20, 50);

  fill(34, 139, 34);

  ellipse(x + 10, y - 20, 50, 50);

}