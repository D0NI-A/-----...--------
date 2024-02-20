let filterDay = ''


const getCurrentWaether = () => {
fetch('https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=a095c090c00fe96bf2d4e29fded2dca4')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
    console.log(data);
    document.querySelector('.this__text').textContent = data.name;
    document.querySelector('.this__gradus').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    document.querySelector('.this__sun--container').innerHTML = `<img src="https://yastatic.net/weather/i/icons/confident/dark/svg/ovc.svg" aria-hidden="true" width="170" height="170" name="ovc" class="sc-abadb029-0 erMaJR">`;
    document.querySelector('.one__temperature').textContent = `${(data.main.temp - 273).toFixed() }° - ощущается как ${(data.main.feels_like - 273).toFixed()}°`
    document.querySelector('.one__humidity').textContent = `${data.main.pressure} mm ртутного столба - нормальное`
    document.querySelector('.one__wind').textContent = `${data.wind.speed} м/с юго-запад - легкий ветер`
})


}

const getFiveDay = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=berlin&appid=a095c090c00fe96bf2d4e29fded2dca4')
    .then( (resp) => resp.json())
    .then( (resp) => {
        console.log(resp);
        let day = [...new Set(resp.list.map(el => el.dt_txt.slice(0, 10)))]
        day.map(day => {
            document.querySelector('.big__filter').innerHTML += `<button class="btn">${day}</button>`
        
        })
        let filterBtn = document.querySelectorAll('.btn')
    
        Array.from(filterBtn).forEach((item) => {
            item.addEventListener("click", () => {
                filterDay = item.textContent
                console.log(filterDay);
            })
        })
        console.log(day);
        let filterDay = document.querySelector('.big__card')
        resp.list.forEach(item => {
            filterDay.innerHTML += `
            <div class="card__monday" id="card">
                <div class="monday__one" id="one">${item.dt_txt.slice(11,16)}</div>
            <img class="monday__foto" id="foto" src="https://yastatic.net/weather/i/icons/confident/dark/svg/ovc.svg" aria-hidden="true" width="43.78px" height="45.79px" name="ovc" class="sc-abadb029-0 erMaJR">
            <div class="monday__Tyty" id="Tyty">
                        ${(item.main.temp - 273 ).toFixed()}°
                        <span>${(item.main.feels_like - 273).toFixed()}°</span>
            <div>
            <div class="monday__four" id="four">${item.weather[0].description}</div>
            </div>
            `
        }) 
    })
}


getCurrentWaether()

getFiveDay()
