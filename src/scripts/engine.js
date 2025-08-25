const playerHand = document.querySelectorAll(".player-hand .card.selectable");
const playerSlot = document.querySelector(".player-slot");
const enemySlot = document.querySelector(".enemy-slot");
const winCountEl = document.getElementById("win-count");
const loseCountEl = document.getElementById("lose-count");
const cardPreview = document.getElementById("card-preview");
const cardName = document.getElementById("card-name");
const cardAttr = document.getElementById("card-attr");

const winSound = new Audio("src/assets/audios/win.wav");
const loseSound = new Audio("src/assets/audios/lose.wav");

let winCount = 0;
let loseCount = 0;

const enemyCardsData = [
  { name: "Blue-Eyes White Dragon", attr: "Dragon", img: "src/assets/icons/dragon.png" },
  { name: "Dark Magician", attr: "Spellcaster", img: "src/assets/icons/magician.png" },
  { name: "Exodia", attr: "Divine", img: "src/assets/icons/exodia.png" }
];

function getWinner(player, enemy) {
  if (player.name === enemy.name) return "draw";

  if (
    (player.name.includes("Dragon") && enemy.name.includes("Magician")) ||
    (player.name.includes("Magician") && enemy.name.includes("Exodia")) ||
    (player.name.includes("Exodia") && enemy.name.includes("Dragon"))
  ) {
    return "player";
  }
  return "enemy";
}

function resetSlots() {
  playerSlot.innerHTML = "";
  enemySlot.innerHTML = "";
}

playerHand.forEach(card => {
  card.addEventListener("click", () => {
    resetSlots();

    playerHand.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    const playerCard = {
      name: card.dataset.name,
      attr: card.dataset.attr,
      img: card.src
    };

    const playerImg = document.createElement("img");
    playerImg.src = playerCard.img;
    playerImg.classList.add("card");
    playerSlot.appendChild(playerImg);

    cardPreview.src = playerCard.img;
    cardName.textContent = playerCard.name;
    cardAttr.textContent = "Atributo: " + playerCard.attr;

    const enemyCardData = enemyCardsData[Math.floor(Math.random() * enemyCardsData.length)];
    const enemyImg = document.createElement("img");
    enemyImg.src = enemyCardData.img;
    enemyImg.classList.add("card");
    enemySlot.appendChild(enemyImg);

    const result = getWinner(playerCard, enemyCardData);

    if (result === "player") {
      winCount++;
      winCountEl.textContent = winCount;
      winSound.play();
    } else if (result === "enemy") {
      loseCount++;
      loseCountEl.textContent = loseCount;
      loseSound.play();
    }
  });
});
