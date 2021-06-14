const THRESHOLD = 1;


//updater();


setInterval(() => {
    updater();
}, 1000)


function updater() {
    var holdingPageVisible = document.querySelector(".holdings");
    if (!holdingPageVisible) {
        return;
    }
    var tableElement = document.querySelector('table')
    if (!tableElement) {
        return;
    }
    // inject header
    // check if sayer exists
    let sayer = tableElement.querySelector(".sayer-head");
    console.log(sayer)
    if (sayer) {
        let dataElems = tableElement.querySelector('tbody').children;
        for (var i = 0; i < dataElems.length; i++) {
            let dataElemNode = dataElems[i];
            let children = dataElemNode.children;

            //2,3
            let costBought = children[2].textContent
            let currentCost = children[3].textContent;



            let profitMargin = getNetProfitForEquity(currentCost,costBought) 

            let dataElem = dataElemNode.querySelector(".holding-state")
            let span = dataElem.querySelector('span');
            span.textContent = profitMargin 

            if (profitMargin > THRESHOLD) {
                dataElemNode.classList.add("sell")
            } else {
                dataElemNode.classList.remove("sell")
            }

        }

        return false;
    } else {
        var elemToAppend = document.createElement('th');
        elemToAppend.classList.add("sayer-head")
        elemToAppend.textContent = 'Sayer';
        var elemToAppendTo = tableElement.querySelector('.day-change-percent').parentNode;
        elemToAppendTo.appendChild(elemToAppend)
        let dataElems = tableElement.querySelector('tbody').children;
        for (var i = 0; i < dataElems.length; i++) {
            let dataElemNode = dataElems[i];
            let children = dataElemNode.children;

            //2,3
            let costBought = children[2].textContent
            let currentCost = children[3].textContent


            let profitMargin = getNetProfitForEquity(currentCost,costBought) 

            // customize data element
            let dataElem = document.createElement("td")
            dataElem.classList.add("holding-state")
            let span = document.createElement('span');
            span.textContent = profitMargin 

            if (profitMargin > THRESHOLD) {
                span.classList.add("sell")

            } else {
                span.classList.remove("sell")
            }

            dataElem.appendChild(span);

            //
            dataElemNode.appendChild(dataElem)

        }
    }

}


function getNetProfitForEquity(sellPrice,buyPrice,quantity){
    let diff = sellPrice - buyPrice
    let STAMP_CHARGE_RATE = 13.5;

    let stampCharges = STAMP_CHARGE_RATE + (18/100)*STAMP_CHARGE_RATE;




    return diff.toFixed(2)
}