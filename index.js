'use strict';

//DISPLAY LIST OF SIMILAR SHOWS.
function displayListOfShows(responseJson) {
  let results = responseJson.Similar.Results;
  console.log('results ', results);
  for(var i = 0; i < results.length; i++) {
    console.log('each result: ',results[i]);
    $('.similar-show-list').append(`<li>${results[i].Name}</li>`);
  }
  let resultsList = results[i].Name;
  sendEmail(resultsList);
  newSearch();
}

function newSearch() {
  $('.new-search').click(function() {
    $('.similar-shows').addClass('hidden');
    $('.enter-show').removeClass('hidden');
  })
}
//Possible future functionality: TAKE THE SHOWNAME VALUE AND WHEN THERE IS A CHANGE IN NUMBER OF SEASONS, SEND USER AN EMAIL.

//HIDE THE SHOW-NAME SCREEN AND SHOW THE RESULTS SCREEN.
//DISPLAY A MESSAGE STATING THE USER WILL RECEIVE AN EMAIL OF THE LIST OF SHOWS
function sendEmail(resultsList, userEmail) {
  //send email to user
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "karinagaulin@gmail.com",
    Password : "3481558e-4642-4d45-b175-344cfb5c3cb6",
    To : 'them@website.com',
    From : "you@isp.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);
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
       displayListOfShows(responseJson)
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
