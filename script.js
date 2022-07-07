var townName = document.getElementById('town')
var citySearchName = document.getElementById('')
var searchBtn = document.getElementById('searchBtn')
var searchInput = document.getElementById('searchInput')
var apikey = "954c644fba0f209e01b1e8c05e53de98"
    //api key
var temp = document.getElementById('temp')
var humidity = document.getElementById('humidity')
var wind = document.getElementById('wind')
var uvi = document.getElementById('uvi')
var bar = document.getElementById('bar')
var forecastSection = document.getElementById('forecast-section')

var searchHistory = []

//ids from the html
var today = moment();
console.log("today", today);

$("#currentDay").text(today.format('MMMM Do YYYY, h:mm a'));

searchBtn.addEventListener('click', function() {
    var cityName = searchInput.value
    console.log(cityName)
        //Search button works when clicked

    var url2 = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apikey
    fetch(url2)
        .then(function(res) {
            return res.json()
        })
        .then(function(res) {
            console.log(res)
            var lat = res[0].lat
            var lon = res[0].lon

            searchHistory.push(res[0].name)
            renderHistory()


            var url = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apikey
                //where i grab my data from. 
            fetch(url)
                .then(function(res) {
                    return res.json()
                })
                .then(function(data) {
                    console.log(data)
                    renderForecast(data.daily)
                    townName.innerHTML = cityName
                    temp.innerHTML = "Temp: " + data.current.temp + "°F"
                    humidity.innerHTML = " Humidity " + data.current.humidity + " % "
                    wind.innerHTML = " Wind: " + data.current.wind_speed + "mph"
                    uvi.innerHTML = "UVI: " + data.current.uvi
                    if (data.current.uvi <= 2) {
                        uvi.classList.add('green')

                    } else if (data.current.uvi <= 5) {
                        uvi.classList.add('yellow')
                    } else if (data.current.uvi <= 7) {
                        uvi.classList.add('orange')
                    } else if (data.current.uvi <= 10) {
                        uvi.classList.add('red')
                    } else {
                        uvi.classList.add('pink')
                    }




                    //Api data displays

                })
        })

})

function renderHistory() {
    bar.innerHTML = ''
    for (var i = 0; i < searchHistory.length; i++) {
        var listItem = document.createElement('li')
        listItem.textContent = searchHistory[i]
        bar.appendChild(listItem)

    }

}
renderHistory()

function renderForecast(daily) {
    //function to display daily forecast. 
    forecastSection.innerHTML = ``
    for (let i = 1; i <= 5; i++) {
        console.log(daily[i])
        const forecastCard = document.createElement('div')
        forecastCard.innerHTML = `
            <h3>${new Date(daily[i].dt * 1000)}</h3>
            <p>Temperature: ${daily[i].temp.day}°F</p>
        `
            //inner html work shortcut
        forecastSection.appendChild(forecastCard)
    }
}