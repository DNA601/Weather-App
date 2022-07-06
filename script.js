var apikey = "954c644fba0f209e01b1e8c05e53de98"



document.querySelector('.btn').addEventListener('click', function() {
    var cityName = document.querySelector('.grab').value
    console.log(cityName)

    var url2 = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apikey
    fetch(url2)
        .then(function(res) {
            return res.json()
        })
        .then(function(res) {
            console.log(res)
            var lat = res[0].lat
            var lon = res[0].lon

            var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apikey
            fetch(url)
                .then(function(res) {
                    return res.json()
                })
                .then(function(data) {
                    console.log(data)

                })

        })
})