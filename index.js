'use strict';

let userEmail;
let resultsList = [];

//DISPLAY LIST OF SIMILAR SHOWS.
function displayListOfShows(responseJson) {
  let results = responseJson.Similar.Results;
  console.log('results: ', results);
  for(var i = 0; i < results.length; i++) {
    $('.similar-show-list').append(`<li><h3>${results[i].Name}</h3>
      <p>${results[i].wTeaser}</p></li>`);
    resultsList.join(results[i].Name);
    console.log('resultsList is : ', resultsList);
  };
  sendEmail(resultsList, userEmail);

}

function newSearch() {
  $('.new-search').click(function() {
    $('.similar-shows').addClass('hidden');
    $('.enter-show').removeClass('hidden');
    $('.similar-show-list').empty();
    $('.show-name').val('');
  })
}
//Possible future functionality: TAKE THE SHOWNAME VALUE AND WHEN THERE IS A CHANGE IN NUMBER OF SEASONS, SEND USER AN EMAIL.

//HIDE THE SHOW-NAME SCREEN AND SHOW THE RESULTS SCREEN.
//DISPLAY A MESSAGE STATING THE USER WILL RECEIVE AN EMAIL OF THE LIST OF SHOWS
function sendEmail(resultsList, userEmail) {
  //send email to user
  console.log("This is the email :" + userEmail);
  console.log("These are the results: " + resultsList);
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "karinagaulin@gmail.com",
      Password : "3481558e-4642-4d45-b175-344cfb5c3cb6",
      To : userEmail,
      From : "karinagaulin@gmail.com",
      Subject : "Here is your list of similar shows!",
      Body : resultsList,
  })
}

function getListOfShows(showName) {
  $('.enter-show').addClass('hidden');
  $('.similar-shows').removeClass('hidden');
  window.alert('You will be sent an email with this list');
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
     userEmail = $('.email').val();
     console.log(userEmail);

     getNameOfShow();
  })
}

$(function() {
  console.log('App loaded, wating for submit');
  watchEmailForm();
  newSearch();
});
