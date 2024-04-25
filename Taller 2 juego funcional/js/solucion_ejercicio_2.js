//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
  constructor(name, health, spriteId, healthBarId, x, y) {
    //Atributos
    this.name = name;
    this.health = health;
    this.maxhealth = 100;
    this.sprite = document.getElementById(spriteId);
    this.healthBar = document.getElementById(healthBarId);
    this.x = x;
    this.y = y;
  }

  //Verifica si el personaje esta vivo
  isDefeat() {
    return this.health <= 0;
  }

  //Ataca a otro personaje seleccionado
  attack(target) {
    let damage = this.rapg();
    console.log(`${this.name} deals ${damage} DMG to ${target.name}`);
    target.health -= damage;
  }
  //Random Attack Point Generator
  rapg() {
    return Math.round(Math.random() * 4 + 1);
  }

  //Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }

  updateHealthBar() {
    let healthPercentage = (this.health / 100) * 100;

    if (healthPercentage < 0) {
      healthPercentage = 0;
    }

    this.healthBar.style.width = healthPercentage + "%";
  }

  updatePosition() {
    this.sprite.style.left = this.x + "px";
    this.sprite.style.top = this.y + "px";
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
  if (firstCharacter.isDefeat()) {
    alert(secondCharacter.name + " Win!");
  } else {
    firstCharacter.attack(secondCharacter);
    secondCharacter.updateHealthBar();
    console.log(firstCharacter.status());
    console.log(secondCharacter.status());
  }

  //Segundo personaje ataca si esta vivo
  if (secondCharacter.isDefeat()) {
    alert(firstCharacter.name + " Win!");
  } else {
    secondCharacter.attack(firstCharacter);
    firstCharacter.updateHealthBar();
    console.log(firstCharacter.status());
    console.log(secondCharacter.status());
  }
}

//Creación de personajes

// PLAYER ONE
const hero = new Character(
  "Hero",
  100,
  "player",
  "health-bar-player-one",
  50,
  300
);
// PLAYER TWO
const juglar = new Character(
  "Juglar",
  100,
  "playerTwo",
  "health-bar-player-two",
  1250,
  300
);

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
  console.log(detectarColision(hero, juglar));
  if (detectarColision(hero, juglar)) {
    secuenceFight(hero, juglar);
  }
}

// Variables para mantener el estado de las teclas presionadas para cada jugador
const player1KeysPressed = {};
const player2KeysPressed = {};

document.addEventListener("keydown", (e) => {
  const code = e.code;

  // Marcar la tecla como presionada para el jugador correspondiente
  if (
    code === "ArrowUp" ||
    code === "ArrowDown" ||
    code === "ArrowLeft" ||
    code === "ArrowRight"
  ) {
    player1KeysPressed[code] = true;
  }
  if (
    code === "KeyW" ||
    code === "KeyS" ||
    code === "KeyA" ||
    code === "KeyD"
  ) {
    player2KeysPressed[code] = true;
  }
});

document.addEventListener("keyup", (e) => {
  const code = e.code;

  // Marcar la tecla como liberada para el jugador correspondiente
  if (
    code === "ArrowUp" ||
    code === "ArrowDown" ||
    code === "ArrowLeft" ||
    code === "ArrowRight"
  ) {
    delete player1KeysPressed[code];
  }
  if (
    code === "KeyW" ||
    code === "KeyS" ||
    code === "KeyA" ||
    code === "KeyD"
  ) {
    delete player2KeysPressed[code];
  }
});

// Función para mover a los jugadores
function movePlayers() {
  // Movimientos del jugador 1
  if ("ArrowUp" in player1KeysPressed) {
    hero.y -= 25;
    hero.updatePosition();
  }
  if ("ArrowDown" in player1KeysPressed) {
    hero.y += 25;
    hero.updatePosition();
  }
  if ("ArrowLeft" in player1KeysPressed) {
    hero.x -= 25;
    hero.updatePosition();
  }
  if ("ArrowRight" in player1KeysPressed) {
    hero.x += 25;
    hero.updatePosition();
  }

  // Movimientos del jugador 2
  if ("KeyW" in player2KeysPressed) {
    juglar.y -= 25;
    juglar.updatePosition();
  }
  if ("KeyS" in player2KeysPressed) {
    juglar.y += 25;
    juglar.updatePosition();
  }
  if ("KeyA" in player2KeysPressed) {
    juglar.x -= 25;
    juglar.updatePosition();
  }
  if ("KeyD" in player2KeysPressed) {
    juglar.x += 25;
    juglar.updatePosition();
  }
}

// Sirve para simular un ataque y comprobar si la barra de vida funciona correctamente
function simulateAttack() {
  hero.health -= 99;
  hero.updateHealthBar();
}

// Ventana que muestra El comienzo de la pelea
window.onload = startFight(hero, juglar);

// Llamar a la función movePlayers en un bucle de animación o en un temporizador
setInterval(movePlayers, 1000 / 30);
hero.updateHealthBar();

document.addEventListener("keydown", (e) => {
  const code = e.code;

  if (code === "KeyM") {
    secuenceFight(hero, juglar);
  }
});
