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
    let damage = this.rgpa()
    mostrarMensaje(`${this.name} deals ${damage} DMG to ${target.name}`);
    target.health -= damage;
  }

  rgpa(){
    return Math.round(Math.random() * 6 + 5);
  }

  //Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }

  updateHealthBar(){
    const healthPercentage= (this.health / 100) * 100;
    const healthBarCharacter= document.getElementById('health-bar-character')
    healthBarCharacter.style.width = healthPercentage + '%';
  }
}

//Función para combatir
function startFight(firstCharacter, secondCharacter) {
  alert("Empieza el combate!"+'\n'+
        firstCharacter.status()+'\n'+
        secondCharacter.status());
}

function secuenceFight(firstCharacter,secondCharacter){
  //Primer personaje ataca si esta vivo
  if (firstCharacter.isAlive()) {
    firstCharacter.attack(secondCharacter);
    showMessage(hero.status());
    showMessage(juglar.status());
  } else {
    showMessage(`${firstCharacter.name} died!`); 
  }

  //Segundo personaje ataca si esta vivo
  if (secondCharacter.isAlive()) {
    secondCharacter.attack(firstCharacter);
    showMessage(hero.status());
    showMessage(juglar.status());
  } else {
    showMessage(`${secondCharacter.name} died!`);
  }
}

//Creación de personajes
const hero = new Character("Heroe", Math.round(Math.random()*100)+1);
const juglar = new Character("Juglar", Math.round(Math.random()*100)+1);

function showMessage(mensaje){
  const mensajeH4 = document.createElement('h4');
  mensajeH4.className= 'txt-combat';
  mensajeH4.textContent = mensaje;
  document.body.appendChild(mensajeH4);
}

document.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es la tecla 'Enter' (código de tecla 13)
  if (event.key === 'j') {
      // Lógica a ejecutar cuando se presiona la tecla 'Enter'
      
  }
});

window.onload = startFight(hero,juglar);
