
const theURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const theKey = '&appid=';

let dt = new Date();
let newDate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

document.getElementById('generate').addEventListener('click', action);

function action(e) {
  e.preventDefault();
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  weather(theURL, newZip, theKey)
    .then(function (userData) {
      console.log(userData);
      try {
        postWeatherData('/add', { date: newDate, temp: userData.main.temp, content })
      } catch(error) {  
        console.log(userData);
        console.log("error", error);
      }
    }).then(function (newData) {
      updateUI()
    })
}


const weather = async (theURL, newZip, theKey) => {

  const res = await fetch(theURL + newZip + theKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
   }
}


const postWeatherData = async (url = '', data = {}) => {
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

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  try {
    const request = await fetch('/all');
    const allData = await request.json()

    document.getElementById('date').innerHTML = 'Date is :'+ allData.date;
    document.getElementById('temp').innerHTML = 'Temp is '+ allData.temp;
    document.getElementById('content').innerHTML = 'And this is how I feel '+allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
