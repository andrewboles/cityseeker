import axios from 'axios'


axios.get('https://find-places-to-live.p.rapidapi.com/location',{params: {query: 'dallas'},
headers: {
  'X-RapidAPI-Key': '988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b',
  'X-RapidAPI-Host': 'find-places-to-live.p.rapidapi.com'
}}).then(response => {
    
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});