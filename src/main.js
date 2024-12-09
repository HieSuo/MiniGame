const balanceText = document.getElementById("balanceText");
const countBet = document.getElementById("countBet");
const imgDice1 = document.getElementById("dice1");
const imgDice2 = document.getElementById("dice2");
const imgDice3 = document.getElementById("dice3");
const xiuButton = document.getElementById("xiuButton");
const taiButton = document.getElementById("taiButton");
const textResult = document.getElementById("textResult");
const levelText = document.getElementById("levelText");
var balance = 2000;
var totalDice = 0;
var rate = 1.5;
function updateBalance(){
    balanceText.innerHTML = `Số dư: ${balance}`
    if(balance>0 && balance<=2000){
    rate= 2;
        levelText.innerHTML = "Level NGU, Rate "+ rate;
    }else if(balance>2000 && balance<=5000){
        rate= 1.7;
        levelText.innerHTML = "Level NGHEO, Rate "+ rate;
    }else if(balance>5000 && balance<=10000){
        rate= 1.5;
        levelText.innerHTML = "Level VAICALON, Rate "+ rate;
    }else{
        rate= 1.2;
        levelText.innerHTML = "Level DITMEVIPVAILON, Rate "+ rate;
    }
}
function runBet(betOn){
    const bet = countBet.value;
    if(!bet || bet> balance){
        alert("Có tiền thì chơi, không thì cút!");
        return;
    }
    balance-= bet;
    updateBalance();
    console.log("betOn", betOn)
    totalDice = 0;
    var dice1Value = Math.floor(Math.random()*6+1);
    var dice2Value = Math.floor(Math.random()*6+1);
    var dice3Value = Math.floor(Math.random()*6+1);
    totalDice = dice1Value+dice2Value+dice3Value;
    const inputValue = document.getElementById('countBet').value;
    imgDice1.setAttribute("src","./src/images/dice"+dice1Value+".png");
    imgDice2.setAttribute("src","./src/images/dice"+dice2Value+".png");
    imgDice3.setAttribute("src","./src/images/dice"+dice3Value+".png");
    console.log("d1: "+ dice1Value);
    console.log("d2: "+ dice2Value);
    console.log("d3: "+ dice3Value);
    console.log("bet:", inputValue);

    if(totalDice>10 && totalDice!=18){
        console.log("tài")
        textResult.innerHTML = "Kết quả :"+totalDice+", TÀI thắng."
        if(betOn==1){
            balance+= bet*1.5;
        }
    }else if(totalDice<=10&& totalDice!=3){
        console.log("Xỉu")
        textResult.innerHTML = "Kết quả :"+totalDice+", XỈU thắng."
        if(betOn==0){
            balance += bet*rate;
        }
    }else{
        console.log("Nhà cái thắng")
        textResult.innerHTML = "Kết quả :"+totalDice+", Nhà cái thắng."
        if(betOn==0){
            balance += bet*rate;
        }
    }
    console.log(balance)
    updateBalance();
}

// Xỉu =0, tài =1
xiuButton.addEventListener("click", ()=>runBet(0));

taiButton.addEventListener("click", ()=>runBet(1));
updateBalance();