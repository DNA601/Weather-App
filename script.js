var townName = document.getElementById('town')
var citySearchName = document.getElementById('')
var searchBtn = document.getElementById('searchBtn')
var searchInput = document.getElementById('searchInput')
var apikey = "954c644fba0f209e01b1e8c05e53de98"
    //api key
var temp = document.getElementById('temp')
var humidity = document.getElementById('humidity')
var wind = document.getElementById('wind')

//ids from the html


searchBtn.addEventListener('click', function() {
    var cityName = searchInput.value
    console.log(cityName)
        //Search button works when clicked

    var url2 = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apikey
    fetch(url2)
        .then(function(res) {
            return res.json()
        })
        .then(function(res) {
            console.log(res)
            var lat = res[0].lat
            var lon = res[0].lon

            var url = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apikey
            fetch(url)
                .then(function(res) {
                    return res.json()
                })
                .then(function(data) {
                    console.log(data)
                    townName.innerHTML = cityName
                    temp.innerHTML = "Temp: " + data.current.temp + "°F"
                    humidity.innerHTML = " Humidity " + data.current.humidity + " % "
                    wind.innerHTML = " Wind: " + data.current.wind_speed + "mph"
                        //Api data displays

                })
        })

})