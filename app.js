const BASE_URL = "https://api.frankfurter.app/latest?from=USD&to=INR";

        const dropdowns = document.querySelectorAll(".dropdown select");
        const btn = document.querySelector("form button")
        const fromCurr = document.querySelector(".from select");
        const toCurr = document.querySelector(".to select");
        const msg = document.querySelector(".msg");

    
       for(let select of dropdowns){
        for(currCode in countryList){
           let newOption = document.createElement("option");
           newOption.value = currCode;
           newOption.innerText = currCode;
           if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = true;
           }else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = true;
           }
           select.append(newOption);
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
       }

       const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

        let img = element.parentElement.querySelector('img');
        img.src = newSrc;
       };

       btn.addEventListener("click", async (evt) =>{
        evt.preventDefault();
        let amount = document.querySelector('.amount input');
        let amtVal = amount.value;
        if (amtVal === "" || amtVal < 1){
            amtVal = 1;
            amount.value = "1";
        }

        //console.log(fromCurr.value, toCurr.value);
        const URL = `https://api.frankfurter.app/latest?from=${fromCurr.value}&to=${toCurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.rates[toCurr.value];
        console.log(rate);

        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

       });