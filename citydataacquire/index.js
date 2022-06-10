const axios = require("axios")
const fs = require('fs')

let rawdata = fs.readFileSync('citieslist.json');
let cities = JSON.parse(rawdata);
let completeCityResults = {}

const collectData = async () => {
  
  const loop = async () => {
    for (city of cities) {
      await getCityDetails(city)
    }
  }
  await loop()

}



const getCityDetails = async cityQuery => {
  console.log("city query", cityQuery.split(',')[0])
  await new Promise(resolve => {
    setTimeout(() => {
      axios.get('https://find-places-to-live.p.rapidapi.com/location', {
        params: { query: cityQuery.split(',')[0] },
        headers: {
          'X-RapidAPI-Key': '988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b',
          'X-RapidAPI-Host': 'find-places-to-live.p.rapidapi.com'
        }
      }).then(response => {
        let cityCode = null;
        console.log(response.data);

        if (response.data[0].type === "Town") {
          cityCode = response.data[0].urlFragment;
        } else {
          if (response.data[1].type === "Town") {

            cityCode = response.data[1].urlFragment;
          } else {

            cityCode = response.data[2].urlFragment;
          }
        }
        return cityCode
      }).then(cityCode => {
        setTimeout(() => {
          axios.get('https://find-places-to-live.p.rapidapi.com/placesToLive', {
            params: { place: cityCode, type: 'Town' },
            headers: {
              'X-RapidAPI-Key': '988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b',
              'X-RapidAPI-Host': 'find-places-to-live.p.rapidapi.com'
            }
          }).then(response => {
            completeCityResults[cityQuery] = response.data;
            console.log(completeCityResults)
            resolve()
          }).catch(function (error) {
            console.log(error)
          })
        }, 1500)


      }).catch(function (error) {
        console.log(error)
      });
    }, 1500)
  })

}

collectData().then(nada => {
  console.log("WRITING DATA")
  let data = JSON.stringify(completeCityResults, null, 2);
  fs.writeFileSync('results.json', data);
})