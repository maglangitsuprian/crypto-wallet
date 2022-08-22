let bitcoin = $(".bitcoin-price")
let ethereum = $(".ethereum-price")
let tether = $(".tether-price")

let btcChange = $(".bitcoin-change")
let ethChange = $(".ethereum-change")
let usdtChange = $(".tether-change")

let currentBalance = 0
let totalBalance = $(".total-balance")

let bitcoinQuantity = $(".bitcoin-quantity")
let ethereumQuantity = $(".ethereum-quantity")
let tetherQuantity = $(".tether-quantity")

let bitcoinQuantityNum = 0
let ethereumQuantityNum = 0
let tetherQuantityNum = 0

let bitcoinValue = $(".bitcoin-value")
let ethereumValue = $(".ethereum-value")
let tetherValue = $(".tether-value")

let initialCost = 0

const main = ()=> {
    
    deposit()
    withdraw()
    sell()
    buy()
    cryptoPrices()
    
    
}


const cryptoPrices = ()=>{
        setInterval(async()=>{
            let response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether&vs_currencies=usd&include_24hr_change=true")
            let res = response.data
            let bitcoinPrice = res.bitcoin.usd
            let ethereumPrice = res.ethereum.usd
            let tetherPrice = res.tether.usd
            
            let bitcoinChange = res.bitcoin.usd_24h_change
            let ethereumChange = res.ethereum.usd_24h_change
            let tetherChange = res.tether.usd_24h_change

            bitcoin.html(`$${bitcoinPrice}`)
            ethereum.html(`$${ethereumPrice}`)
            tether.html(`$${tetherPrice.toFixed(2)}`)
            btcChange.html(`${bitcoinChange.toFixed(2)}%`)
            ethChange.html(`${ethereumChange.toFixed(2)}%`)
            usdtChange.html(`${tetherChange.toFixed(2)}%`)
            greenRed()
            cryptoValue()
            overallBalance()
            profitAndLoss()
            
        }, 1000)
}


const deposit = () => {
    $(".deposit-crypto").on("click", ()=>{
    tetherQuantityNum = tetherQuantityNum + parseInt($(".deposit-amount").val()) 
    tetherQuantity.html(`${tetherQuantityNum} USDT`)
    initialCost += parseInt($(".deposit-amount").val())
    $(".deposit-amount").val("")
    })
    
}


const withdraw = () => {
    $(".withdraw-crypto").on("click", ()=>{
        if(tetherQuantityNum>=parseInt($(".withdraw-amount").val())){
          tetherQuantityNum = tetherQuantityNum - parseInt($(".withdraw-amount").val())
          tetherQuantity.html(`${tetherQuantityNum} USDT`)
        } else {
            alert("Not enough balance!")
        }
     $(".withdraw-amount").val("")
    })
}


const buy = ()=> {
    $(".buy-button").on("click", ()=>{
     let value = parseInt($("#buy-sell-input").val())
     let selectedCoin = $("select").val()

     if(currentBalance>=value  && tetherQuantityNum>=value){
        if(selectedCoin === "bitcoin"){
            bitcoinQuantityNum = (bitcoinQuantityNum + (value / bitcoin.html().slice(1))) 
            bitcoinQuantity.html(`${bitcoinQuantityNum.toFixed(5)} BTC`)
            tetherQuantityNum = tetherQuantityNum - value
            tetherQuantity.html(`${tetherQuantityNum} USDT`)

        } else if (selectedCoin === "ethereum"){
            ethereumQuantityNum = (ethereumQuantityNum + (value / ethereum.html().slice(1))) 
            ethereumQuantity.html(`${ethereumQuantityNum.toFixed(5)} ETH`) 
            tetherQuantityNum = tetherQuantityNum - value
            tetherQuantity.html(`${tetherQuantityNum} USDT`)
        } else {
            alert("Select coin")
        }
     } else {
        alert("Sorry, Not enough balance! Please deposit USDT.")
     } $("#buy-sell-input").val("")})
}


const sell = ()=> {
    $(".sell-button").on("click", ()=>{
     let value = parseInt($("#buy-sell-input").val())
     let selectedCoin = $("select").val()
    if((parseInt(bitcoinValue.html().slice(1))>=value) || (parseInt(ethereumValue.html().slice(1))>=value)){
        if(selectedCoin === "bitcoin"){
            bitcoinQuantityNum = (bitcoinQuantityNum - (value / bitcoin.html().slice(1))) 
            bitcoinQuantity.html(`${bitcoinQuantityNum.toFixed(5)} BTC`)
            tetherQuantityNum = tetherQuantityNum + value
            tetherQuantity.html(`${tetherQuantityNum} USDT`)
        } else if (selectedCoin === "ethereum"){
            ethereumQuantityNum = (ethereumQuantityNum - (value / ethereum.html().slice(1))) 
            ethereumQuantity.html(`${ethereumQuantityNum.toFixed(5)} ETH`) 
            tetherQuantityNum = tetherQuantityNum + value
            tetherQuantity.html(`${tetherQuantityNum} USDT`)
        } 
    } else {
        alert("Not enough balance!")
    }
    $("#buy-sell-input").val("")})
}


const cryptoValue = ()=>{
    bitcoinValue.html(`$${(bitcoinQuantityNum * parseInt(bitcoin.html().slice(1))).toFixed(2)}`)
    ethereumValue.html(`$${(ethereumQuantityNum * parseInt(ethereum.html().slice(1))).toFixed(2)}`)
    tetherValue.html(`$${(tetherQuantityNum * parseInt(tether.html().slice(1))).toFixed(2)}`)
}


const overallBalance = ()=>{
    currentBalance = parseInt(bitcoinValue.html().slice(1)) + parseInt(ethereumValue.html().slice(1)) + parseInt(tetherValue.html().slice(1))
    totalBalance.html(`$${currentBalance}`)
}


const transactionHistory = ()=>{
    $(".transaction-button").on("click", (e)=>{
        const transactionBody = $(".transaction-body")
        const type = e.target.value
        const selectedCrypto = $("select").val()
        const cost = parseInt($("#buy-sell-input").val()) 
        let btcQuantity = cost / parseInt(bitcoin.html().slice(1))
        let ethQuantity = cost / parseInt(ethereum.html().slice(1))
        const addTransaction = `
        <tr>
         <td style="${type==='buy'? 'color:green' : 'color:red'}">${type.toUpperCase()}</td>
         <td><img src="img/${selectedCrypto}.png" alt="logo" /></td>
         <td>$${cost}</td>
         <td>${btcQuantity.toFixed(5)}</td>
         <td>${bitcoin.html()}</td>
        </tr>`
        const addTransaction1 = `
        <tr>
        <td style="${type==='buy'? 'color:green' : 'color:red'}">${type.toUpperCase()}</td>
         <td><img src="img/${selectedCrypto}.png" alt="logo" /></td>
         <td>$${cost}</td>
         <td>${ethQuantity.toFixed(5)}</td>
         <td>${ethereum.html()}</td>
        </tr>`

       if(selectedCrypto === "bitcoin"){
        transactionBody.append(addTransaction)
       } else if (selectedCrypto==="ethereum"){
        transactionBody.append(addTransaction1)
       }
    
    })
}


const profitAndLoss = () =>{
    let result = (currentBalance - initialCost).toString().charAt(0) !== "-" && (currentBalance - initialCost).toString().charAt(0) !== "0" ? `+${currentBalance - initialCost}`:`${currentBalance - initialCost}`;
    $(".profit-loss").html(`PnL: ${result}`)   
}


const greenRed = ()=> {
    for (let percentIndex = 0; percentIndex < $(".change").length; percentIndex++) {
        if(($(".change")[percentIndex]).innerText.charAt(0) === "+"){
            ($(".change")[percentIndex]).style.color = "green"
        } else if(($(".change")[percentIndex]).innerText.charAt(0) === "-") {
        ($(".change")[percentIndex]).style.color = "red"  
        } else {
            ($(".change")[percentIndex]).style.color = "black"
        }  
    }
    
}

transactionHistory()
main()
