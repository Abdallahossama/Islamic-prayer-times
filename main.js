let list = ["القاهره", "الاسكندريه", "new jersey city", "مكة المكرمة"];
document.getElementById("cities").innerHTML = ``;
for (city of list) {
  document.getElementById(
    "cities"
  ).innerHTML += `<option value="${city}">${city}</option>`;
}

if (!localStorage.getItem("location")) {
  getPrayerTimes(
    "http://api.aladhan.com/v1/timingsByCity/:date?country=EG&city=ALX"
  );
  console.log("no");
}else {
    document.getElementById("cities").value = JSON.parse(localStorage.getItem("location")).city;
    getPrayerTimes(JSON.parse(localStorage.getItem("location")).link);
}

// change city and get prayer times
document.getElementById("cities").addEventListener("change", () => {
      if (document.getElementById("cities").value == "القاهره") {
        getPrayerTimes(
          "http://api.aladhan.com/v1/timingsByCity/:date?country=EG&city=cairo"
        );
      } else if (document.getElementById("cities").value == "الاسكندريه") {
        getPrayerTimes(
          "http://api.aladhan.com/v1/timingsByCity/:date?country=EG&city=ALX"
        );
      } else if (document.getElementById("cities").value == "new jersey city") {
        getPrayerTimes(
          "http://api.aladhan.com/v1/timingsByCity/:date?country=US&city=NJ"
        );
      } else if (document.getElementById("cities").value == "مكة المكرمة") {
        getPrayerTimes(
          "http://api.aladhan.com/v1/timingsByCity/:date?country=KS&city=02"
        );
      }
});

// axios get request to get prayer times
function getPrayerTimes(location) {
  axios
    .get(location)
    .then(function (response) {
      const timings = response.data.data.timings;
      document.getElementById("Fajr").innerHTML = timings.Fajr;
      document.getElementById("Sunrise").innerHTML = timings.Sunrise;
      document.getElementById("Dhuhr").innerHTML = timings.Dhuhr;
      document.getElementById("Asr").innerHTML = timings.Asr;
      document.getElementById("Maghrib").innerHTML = timings.Maghrib;
      document.getElementById("Isha").innerHTML = timings.Isha;
      document.getElementById("date"
).innerHTML =
        response.data.data.date.readable;
      document.getElementById("day").innerHTML =response.data.data.date.hijri.weekday.ar;
      document.getElementById("location").innerHTML =document.getElementById("cities").value;
      let  x = {
        "city" : document.getElementById("cities").value,
        "link" : location
      }
      localStorage.setItem("location", JSON.stringify(x));
    })
    .catch(function (error) {
      console.log(error);
    });
}
