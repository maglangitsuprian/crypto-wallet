const cryptoList = $("#cryptoList")
const buyButton = $("#buyButton")

const buy = ()=>{
    buyButton.on("click", ()=>{
        console.log($("input").val())
    })
}