export default function location(loc) {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://freegeoip.app/json/');
    resolve(xhr);
  })
    .then((response) => {
      console.log(response);
      response.onload = () => {
        let arr = JSON.parse(response.response);
        console.log(arr);
        
        let promiseWeather = new Promise((resolve,reject)=>{
        let newXhr = new XMLHttpRequest()
        let url = `https://goweather.herokuapp.com/weather/${arr.country_name}`
        newXhr.open('GET',url)
        newXhr.onload = () =>{
          let array = JSON.parse(newXhr.response)
          console.log(array);
          loc.innerHTML = `<span class="loc">${arr.country_code} | ${arr.country_name}</span> <span class="weather">Weather: ${array.temperature}</span>`
        }
        newXhr.send()
      })
      };
      response.send();
    })
}
