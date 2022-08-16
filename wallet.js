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


const main = ()=> {
    
    deposit()
    withdraw()
    buy()
    sell()
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
            cryptoValue()
            overallBalance()
        }, 1000)
}


const deposit = () => {
    $(".deposit-crypto").on("click", ()=>{
    tetherQuantityNum = tetherQuantityNum + parseInt($(".deposit-amount").val()) 
    tetherQuantity.html(`${tetherQuantityNum} USDT`)
    })
    
}


const withdraw = () => {
    $(".withdraw-crypto").on("click", ()=>{
     currentBalance = currentBalance -  parseInt($(".withdraw-amount").val())
    })
}


const buy = ()=> {
    $(".buy-button").on("click", ()=>{
     let value = parseInt($("#amount").val())
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
     }})
}


const sell = ()=> {
    $(".sell-button").on("click", ()=>{
     let value = parseInt($("#amount").val())
     let selectedCoin = $("select").val()
    if((currentBalance>=value) && (tetherQuantityNum<=value)){
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
    })
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


main()
