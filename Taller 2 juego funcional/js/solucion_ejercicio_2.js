//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
  constructor(name, health) {
    //Atributos
    this.name = name;
    this.health = health;
    this.maxhealth = health;
  }
  //Verifica si el personaje esta vivo
  isAlive() {
    return this.health > 0;
  }

  //Ataca a otro personaje seleccionado
  attack(target) {
    let damage = this.rgpa();
    console.log(`${this.name} deals ${damage} DMG to ${target.name}`);
    target.health -= damage;
  }

  rgpa() {
    return Math.round(Math.random() * 6 + 5);
  }

  //Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }

  updateHealthBar() {
    const healthPercentage = (this.health / 100) * 100;
    const healthBarCharacter = document.getElementById("health-bar-character");
    healthBarCharacter.style.width = healthPercentage + "%";
  }
}

//Función para combatir
function startFight(firstCharacter, secondCharacter) {
  alert(
    "Empieza el combate!" +
      "\n" +
      firstCharacter.status() +
      "\n" +
      secondCharacter.status()
  );
}

function secuenceFight(firstCharacter, secondCharacter) {
  //Primer personaje ataca si esta vivo
  if (firstCharacter.isAlive()) {
    firstCharacter.attack(secondCharacter);
    console.log(hero.status());
    console.log(juglar.status());
  } else {
    console.log(`${firstCharacter.name} died!`);
  }

  //Segundo personaje ataca si esta vivo
  if (secondCharacter.isAlive()) {
    secondCharacter.attack(firstCharacter);
    console.log(hero.status());
    console.log(juglar.status());
  } else {
    console.log(`${secondCharacter.name} died!`);
  }
}

//Creación de personajes
const hero = new Character("Heroe", Math.round(Math.random() * 100) + 1);
const juglar = new Character("Juglar", Math.round(Math.random() * 100) + 1);

// Función para detectar colisiones entre los personajes
function detectarColision(heroe, juglar) {
  return (
    heroe.x < juglar.x + juglar.ancho &&
    heroe.x + heroe.ancho > juglar.x &&
    heroe.y < juglar.y + juglar.alto &&
    heroe.y + heroe.alto > juglar.y
  );
}

// Función para manejar la colisión y comenzar la pelea
function handleCollision() {
  if (detectarColision(hero, juglar)) {
    secuenceFight(hero, juglar);
  }
}

window.onload = startFight(hero, juglar);

// PLAYER ONE

const $player = document.getElementById("player");
let x = 0;
let y = -250;

document.addEventListener("keydown", (e) => {
  console.log(e.code);
  //Flecha hacia Arriba
  if (e.code === "ArrowUp") {
    y = y + 50;
    $player.style.top = -y + "px";
  }

  //Flecha hacia Abajo
  if (e.code === "ArrowDown") {
    y = y - 50;
    $player.style.top = -y + "px";
  }

  //Flecha hacia la Izquierda
  if (e.code === "ArrowLeft") {
    x = x - 50;
    $player.style.left = x + "px";
  }

  //Flecha hacia la Derecha
  if (e.code === "ArrowRight") {
    x = x + 50;
    $player.style.left = x + "px";
  }
});

// PLAYER TWO

const $playerTwo = document.getElementById("playerTwo");
let x2 = 900;
let y2 = -250;

document.addEventListener("keydown", (k) => {
  console.log(k.code);
  //Tecla W
  if (k.code === "KeyW") {
    y2 = y2 + 50;
    $playerTwo.style.top = -y2 + "px";
  }

  //Tecla S
  if (k.code === "KeyS") {
    y2 = y2 - 50;
    $playerTwo.style.top = -y2 + "px";
  }

  //Tecla A
  if (k.code === "KeyA") {
    x2 = x2 - 50;
    $playerTwo.style.left = x2 + "px";
  }

  //Tecla D
  if (k.code === "KeyD") {
    x2 = x2 + 50;
    $playerTwo.style.left = x2 + "px";
  }
});
