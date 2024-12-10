const balanceText = document.getElementById("balanceText");
const countBet = document.getElementById("countBet");
const imgDice1 = document.getElementById("dice1");
const imgDice2 = document.getElementById("dice2");
const imgDice3 = document.getElementById("dice3");
const xiuButton = document.getElementById("xiuButton");
const taiButton = document.getElementById("taiButton");
const textResult = document.getElementById("textResult");
const levelText = document.getElementById("levelText");
const historyList = document.getElementById("historyList");
const prizeImg = document.getElementById("prizeImg");

var balance = 2000;
var totalDice = 0;
var rate = 2;
const history = [];

function updateBalance() {
  balanceText.innerHTML = `Số Dư: ${balance} <i class="fa-solid fa-coins"></i>`;
  if (balance >= 0 && balance <= 2000) {
    rate = 2;
    levelText.innerHTML = "Level NGU, Rate " + rate;
    prizeImg.setAttribute("src", "./src/images/prize_lv0.png");
  } else if (balance > 5000 && balance <= 10000) {
    rate = 1.7;
    levelText.innerHTML = "Level NGHEO, Rate " + rate;
    prizeImg.setAttribute("src", "./src/images/prize_lv1.png");
  } else if (balance > 10000 && balance <= 20000) {
    rate = 1.5;
    levelText.innerHTML = "Level VAICALON, Rate " + rate;
    prizeImg.setAttribute("src", "./src/images/prize_lv2.png");
  } else {
    rate = 1.2;
    levelText.innerHTML = "Level DITMEVIPVAILON, Rate " + rate;
  }
  historyList.innerHTML = "";
  if (history.length > 10) {
    for (let i = (history.length - 10); i < history.length; i++) {
      const hisRes = history[i];

      if (hisRes == 0) {
        historyList.innerHTML +=
          "<li class='p-4 bg-white w-2 h-2 rounded-full'></li>";
      } else if (hisRes == 1) {
        historyList.innerHTML +=
          "<li class='p-4 bg-yellow-500 w-2 h-2 rounded-full'></li>";
      } else {
        historyList.innerHTML +=
          "<li class='p-4 bg-black w-2 h-2 rounded-full'></li>";
      }
    }
  } else {
    for (let i = 0; i < history.length; i++) {
      const hisRes = history[i];

      if (hisRes == 0) {
        historyList.innerHTML +=
          "<li class='p-4 bg-white w-2 h-2 rounded-full'></li>";
      } else if (hisRes == 1) {
        historyList.innerHTML +=
          "<li class='p-4 bg-yellow-500 w-2 h-2 rounded-full'></li>";
      } else {
        historyList.innerHTML +=
          "<li class='p-4 bg-black w-2 h-2 rounded-full'></li>";
      }
      if (i == 10) {
        return;
      }
    }
  }
}
function addBetCount(bet) {
  currentBet = countBet.value * 1;
  currentBet += bet;
  countBet.value = currentBet;
  console.log(currentBet);
}
function subBetCount(bet) {
  currentBet = countBet.value * 1;
  currentBet *= bet;
  currentBet = Math.floor(currentBet);
  countBet.value = currentBet;
  console.log(currentBet);
}
function resestBet() {
  countBet.value = 0;
}
function allIn(){
  countBet.value = balance;
}
function runBet(betOn) {
  const bet = countBet.value*1;
  if (!bet || bet > balance) {
    alert("Có tiền thì chơi, không thì cút!");
    return;
  }
  balance -= bet;
  updateBalance();
  console.log("betOn", betOn);
  totalDice = 0;
  var dice1Value = Math.floor(Math.random() * 6 + 1);
  var dice2Value = Math.floor(Math.random() * 6 + 1);
  var dice3Value = Math.floor(Math.random() * 6 + 1);
  totalDice = dice1Value + dice2Value + dice3Value;
  const inputValue = document.getElementById("countBet").value;
  imgDice1.setAttribute("src", "./src/images/dice" + dice1Value + ".png");
  imgDice2.setAttribute("src", "./src/images/dice" + dice2Value + ".png");
  imgDice3.setAttribute("src", "./src/images/dice" + dice3Value + ".png");

  if (totalDice > 10 && totalDice != 18) {
    console.log("tài");
    textResult.innerHTML = "Kết quả :" + totalDice + ", TÀI thắng.";
    if (betOn == 1) {
      balance += bet*rate;
    }
    history.push(1);
  } else if (totalDice <= 10 && totalDice != 3) {
    console.log("Xỉu");
    textResult.innerHTML = "Kết quả :" + totalDice + ", XỈU thắng.";
    if (betOn == 0) {
      balance += bet*rate;
    }
    history.push(0);
  } else {
    console.log("Nhà cái thắng");
    textResult.innerHTML = "Kết quả: " + totalDice + ", Nhà cái thắng.";
    history.push(2);
  }
  updateBalance();
  console.log("History", history);
}

// Xỉu =0, tài =1
xiuButton.addEventListener("click", () => runBet(0));

taiButton.addEventListener("click", () => runBet(1));

updateBalance();
