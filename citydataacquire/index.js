const axios = require("axios")
const fs = require('fs')

let rawdata = fs.readFileSync('citieslist2.json');
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
        let i = 0
        do{
          if (response.data[i].type === "Town") {
            cityCode = response.data[i].urlFragment;
          }
          i++
        } while (!cityCode)
        
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
            resolve()
          }).catch(function (error) {
            completeCityResults[cityQuery] = "error"
            console.log(error)
            resolve()
          })
        }, 1500)


      }).catch(function (error) {
        completeCityResults[cityQuery] = "error"
        console.log(error)
        resolve()
      });
    }, 1500)
  })

}

collectData().then(nada => {
  console.log("WRITING DATA")
  let data = JSON.stringify(completeCityResults, null, 2);
  fs.writeFileSync('results2.json', data);
})