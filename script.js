//MEDIA QUERY
const mediaQuery1 = window.matchMedia('(min-width: 760px)');
const mediaQuery2 = window.matchMedia('(min-width: 1040px)');


// GET RANDOM QUOTES
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const refresh = document.querySelector(".refresh");

fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(data => {
          author.innerHTML = data.author;
          quote.innerHTML = data.content;
      })
      .catch(err => console.log(err))
refresh.addEventListener("click", () => {
    fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(data => {
          author.innerHTML = data.author;
          quote.innerHTML = data.content;
      })
      .catch(err => console.log(err))
})


//GET LOCATION & TIMEZONE INFO
const ipApiKey = config.IP_API_KEY;
const city = document.querySelector(".city");
const countryCode = document.querySelector(".cc");
const ipUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipApiKey}`;

const timeZone = document.querySelector(".time-zone");
const dayOfYear = document.querySelector(".day-of-year");
const dayOfWeek = document.querySelector(".day-of-week");
const weekNumber = document.querySelector(".week-number");
const abbr = document.querySelector(".abbr");

fetch(ipUrl)
  .then(res => res.json())
  .then(info => {
    console.log(info);
    city.innerHTML = info.city;
    countryCode.innerHTML = info.country_code2;

    const worldtimeurl = "https://cors-everywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/" + info.continent_name + "/" + info.city;
    fetch(worldtimeurl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        timeZone.innerHTML = data.timezone;
        dayOfYear.innerHTML = data.day_of_year;
        dayOfWeek.innerHTML = data.day_of_week;
        weekNumber.innerHTML = data.week_number;
        abbr.innerHTML = data.abbreviation;
    })
    .catch(err => console.log(err));

  })
  .catch(err => console.log(err));


//CHANGE GREETINGS & DAY AND NIGHT MODE
var hour = new Date().getHours();
var minute = new Date().getMinutes();
const mode = document.querySelector(".mode");
const greeting = document.querySelector(".greeting");
const body = document.body;
const currentTime = document.querySelector(".current-time");

window.onload=time();
function time() {
    currentTime.innerHTML = new Date()
                            .toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                            .replace("AM", "")
                            .replace("PM", "");
    setTimeout(time, 1000);
}


if(hour >= 5 && hour < 12) {
    if(mediaQuery1.matches) {
        greeting.innerHTML = "good morning, it's currently";
    } else {
        greeting.innerHTML = 'good morning'
    }
    mode.classList.remove('moon')
    mode.classList.add('sun')
    body.classList.add('daytime')
    body.classList.remove('nighttime')
}
if(hour >= 12 && hour < 18) {
    if(mediaQuery1.matches) {
        greeting.innerHTML = "good afternoon, it's currently";
    } else {
        greeting.innerHTML = 'good afternoon'
    }
    mode.classList.remove('moon')
    mode.classList.add('sun')
    body.classList.add('daytime')
    body.classList.remove('nighttime')
}
if(hour >= 18 || hour < 5) {
    if(mediaQuery1.matches) {
        greeting.innerHTML = "good evening, it's currently";
    } else {
        greeting.innerHTML = 'good evening'
    }
    mode.classList.remove('sun')
    mode.classList.add('moon')
    body.classList.remove('daytime')
    body.classList.add('nighttime')
}


//MORE OR LESS
const details = document.querySelector('.details');
const toggle = document.querySelector(".toggle");
const info = document.querySelector(".info");
const randomQuotes = document.querySelector(".random-quotes");

details.addEventListener("click", () => {
    if(!details.classList.contains("more")) {
        details.classList.add("more")
        toggle.style.transform = "none";
        document.querySelector(".detail").innerHTML = "Less";
        if(mediaQuery1.matches) {
            info.style.display = 'block';
        } else {
            info.style.display = 'flex';
        }
        randomQuotes.style.display = 'none';
    } else {
        details.classList.remove("more")
        toggle.style.transform = "rotate(180deg)";
        document.querySelector(".detail").innerHTML = "More";
        info.style.display = 'none';
        randomQuotes.style.display = 'flex';
    }
})

