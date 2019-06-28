'use strict';

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }

//DISPLAY LIST OF SIMILAR SHOWS.


function displayListOfShows(responseJson, url) {
  console.log('this one', responseJson);
  // $('.similar-show-list').append(`<li>`)
}

//TAKE THE SHOWNAME VALUE AND WHEN THERE IS A CHANGE IN NUMBER OF SEASONS, SEND USER AN EMAIL.

//HIDE THE SHOW-NAME SCREEN AND SHOW THE RESULTS SCREEN.
//DISPLAY A MESSAGE STATING THE USER WILL RECEIVE AN EMAIL OF THE LIST OF SHOWS
function sendEmail(showName) {
  //send email to user
  window.alert('You will be sent an email with this list of shows');
}

function getListOfShows(showName) {
  $('.enter-show').addClass('hidden');
  $('.similar-shows').removeClass('hidden');

  //get list of similar shows from api
  const options = {
    headers: {
        "x-requested-with": "xhr"
      }
  }
  const url = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${showName}&type=shows&info=1&limit=8&k=266210-Similars-D2TGC2V3`;
  console.log('url is: ', url);

  fetch(url, options)
    .then(response => {
      console.log('response is: ', response);
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson =>{
      console.log('responseJson: ', responseJson)
       displayListofShows(responseJson)
     })
     .catch(err => {
       $('#js-error-message').text(`Something went wrong: ${err.message}`);
     });
   }
//HIDE THE SIGNUP SECTION AND SHOW THE ENTER SHOW SECTION, STORE THE USER VALUE OF SHOW NAME AS A VARIABLE
function getNameOfShow() {
  $('.sign-up').addClass('hidden');
  $('.enter-show').removeClass('hidden');
  $('.show-name-form').submit(event => {
    event.preventDefault();
    let showName = $('.show-name').val();
    console.log('showName: ', showName);
    getListOfShows(showName);
  })
}

//ON SUBMIT OF EMAIL FORM, GET VALUE OF ENTERED EMAIL ADDRESS AND STORE IN VARIABLE
function watchEmailForm() {
  $('.email-form').submit(event => {
    event.preventDefault();
     const userEmail = $('.email').val();
     console.log(userEmail);
     getNameOfShow();
  })
}

$(function() {
  console.log('App loaded, wating for submit');
  watchEmailForm();
});
