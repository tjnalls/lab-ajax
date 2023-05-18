'use strict';

// PART 1: SHOW A FORTUNE
const varText = document.querySelector("#fortune-text");

function showFortune(evt) {
  // console.log(evt);
  fetch('/fortune')
    .then((response)=> { return response.text()})
    .then((responseText) => {varText.innerHTML = responseText;});
}

// """This is the button not the text""".addEventListener('click', showFortune);

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  
  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;

  const weatherText = document.querySelector("#weather-info")

  fetch(url)
    .then( (response) => {return response.json()})
    .then( (responseJSON) => {
      console.log(responseJSON);
      // responseJSON is a dictionary
      weatherText.innerHTML = responseJSON.forecast;  
      //responseJSON['forecast'];
    });

}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function updateMelons(results) {
  if (results.code === 'OK') {
    document.querySelector('#order-status').classList.remove('order-error');
    document.querySelector('#order-status').innerHTML = `<p>${results.msg}</p>`;
  } else {
    document.querySelector('#order-status').classList.add('order-error');
    document.querySelector('#order-status').innerHTML = `<p><b>${results.msg}</b></p>`;
  }
}

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
    };

  const params = {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {'Content-Type': 'application/json',
    },
  };

  fetch('/order-melons.json', params)
    .then((response) => { return response.json()})
    .then(updateMelons);
  

    // .then((responseJSON) => {alert(responseJSON.msg)});
    /*
    {
      "code": "OK", 
      "msg": "You have bought 8 Watermelon melons"
    }
    */
    // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  
  }

document.querySelector('#order-form').addEventListener('submit', orderMelons);
