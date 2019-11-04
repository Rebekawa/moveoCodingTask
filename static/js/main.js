$(document).ready(function() {

    function changeElements(res){
        if (!(res.location)){
            document.getElementById('info').innerHTML = "Did not found results"
        }
        else {
            document.getElementById('info').innerHTML = ""
            document.getElementById('location').innerHTML = res.location
            document.getElementById('temperature').innerHTML = res.temperature
            document.getElementById('humidity').innerHTML = res.humidity
            document.getElementById('wind').innerHTML = res.wind
            document.getElementById('icon').src = 'https:' + res.icon
        }
    }

    $.get("/location?country=Usa&city=New-York", function(data, status){
        const res = JSON.parse(data)
        changeElements(res)
    });

    $.get("/location?country=Israel&city=Tel-Aviv", function(data, status){
        const res = JSON.parse(data)
        document.getElementById('info').innerHTML = ""
            document.getElementById('location2').innerHTML = res.location
            document.getElementById('temperature2').innerHTML = res.temperature
            document.getElementById('humidity2').innerHTML = res.humidity
            document.getElementById('wind2').innerHTML = res.wind
            document.getElementById('icon2').src = 'https:' + res.icon
    });


    $('#enterButton').click(() => {
        city = document.getElementById('city').value
        country = document.getElementById('country').value
        if (country == 'united kingdom'){
            country = 'uk'
        } else if (country == 'United Kingdom') {
            country = 'uk'
        } else if (country == 'England') {
            country = 'uk'
        } else if (country == 'United kingdom') {
            country = 'uk'
        } else if (country == 'united Kingdom') {
            country = 'uk'
        } else if (country == 'england') {
            country = 'uk'
        } else if (country == 'us') {
            country = 'usa'
        } else if (country == 'united states') {
            country = 'usa'
        } else if (country == 'United States') {
            country = 'usa'
        } else if (country == 'united States') {
            country = 'usa'
        } else if (country == 'United states') {
            country = 'usa'
        }

        city = city.split(' ').join('-')

        $.get("/location?country="+country+"&city="+city, function(data, status){
            const res = JSON.parse(data)
            changeElements(res)
        });
     });
});

