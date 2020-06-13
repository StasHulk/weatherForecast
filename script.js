const loc=document.querySelector('.location');
const temperature=document.querySelector('.temperature');
const weather_description=document.querySelector('.weather_description');
const proxy="https://cors-anywhere.herokuapp.com/";
const api_url=proxy+"https://api.darksky.net/forecast/24c44e3824f0d560e568692099bcfc68/";
let location_index=0;
let day={
  icon:0,
  temperature:0,
  summary:0
};
let locations=[{
  name:"Berlin",
  long:52.517,
  lat:13.3889,
  temperature:0,
  summary:0,
  icon:0,
  days:Array(5)

},
{
  name:"Moscaw",
  long:55.7507,
  lat:37.6177,
  temperature:0,
  summary:0,
  icon:0,
  days:Array(5)
},
{
  name:"Toronto",
  long:43.654,
  lat:-79.3872,
  temperature:0,
  summary:0,
  icon:0,
  days:Array(5)
},
{
  name:"London",
  long:51.5073,
  lat:-0.1276,
  temperature:0,
  summary:0,
  icon:0,
  days:Array(5)
},
{
  name:"Paris",
  long:48.8566,
  lat:2.3515,
  temperature:0,
  summary:0,
  icon:0,
  days:Array(5)
}];
window.addEventListener("load",()=>{
  locations.forEach((element)=>{
    let url=api_url+element.long+','+element.lat;
    fetch(url)
      .then(response=>{
        return response.json();
      })
        .then(data=>{
          console.log(data);
          element.temperature=data.currently.apparentTemperature;
          element.summary=data.currently.summary;
          element.icon=data.currently.icon;
            loc.textContent=locations[1].name;
            temperature.textContent=locations[1].temperature;
            weather_description.textContent=locations[1].summary;
            setIcon(locations[1].icon,document.querySelector(".icon1"));
            var today=new Date();
            var date=today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
            document.querySelector('.date').textContent=date;
            locations.forEach(setDays(element,data));
        });
  });
});
function changeLocation(){
  if(location_index<4) location_index++;
  else location_index=0;
  loc.textContent=locations[location_index].name;
  temperature.textContent=locations[location_index].temperature;
  weather_description.textContent=locations[location_index].summary;
  setIcon(locations[location_index].icon,document.querySelector(".icon1"));
}

function setIcon(icon,icon_ID){
  var skycons=new Skycons({color:"white"});
  const currentIcon=icon.replace(/-/g,'_').toUpperCase();
  skycons.play();
  return skycons.set(icon_ID,Skycons[currentIcon]);
}
function setDays(element,api_data){
  var today=new Date();
  for (var i = 0; i < element.days.length; i++) {
    element.days[i]=day;
    element.days[i].icon=api_data.daily.data[i].icon;
    element.days[i].temperature=api_data.daily.data[i].apparentTemperatureHigh;
    element.days[i].summary=api_data.daily.data[i].summary;
    var date=(today.getDate()+1+i)+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
  }
}
