/* Global Variables */
const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');

// Walaa 2021 OpenWeatherMap API Base URL Key  
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=cac84dd1db6bcc856bfc62479ddb51e4';

// Walaa 2021 Get date
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//  Walaa 2021 add function the  HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Walaa 2021 Function called by event listener */
function performAction(e) {
  e.preventDefault();
  //  Walaa 2021 get  values from user
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      //  Walaa 2021 POST request add data  
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      //  Walaa 2021 update browser content
      updateUI()
    })
  // reset form
  form.reset();
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // show icons on the page //Walaa 2021
    icons.forEach(icon => icon.style.opacity = '1');
    // update new entry values //Walaa 2021
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
