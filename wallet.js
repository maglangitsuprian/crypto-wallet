
let bitcoin = $(".bitcoin-price")
let ethereum = $(".ethereum-price")
let tether = $(".tether-price")

let btcChange = $(".bitcoin-change")
let ethChange = $(".ethereum-change")
let usdtChange = $(".tether-change")
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
            
        }, 1000)
        

}
cryptoPrices()