let searchButton = document.getElementById("search-button");
let userIP = document.getElementById("user-ip-address");
let ipAddressShown = document.querySelector(".ip-address");
let ipLocationShown = document.querySelector(".ip-location");
let ipTimezoneShown = document.querySelector(".ip-timezone");
let ipISPShown = document.querySelector(".ip-isp");


window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");
})

var locationIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize:     [45, 50], 
  iconAnchor:   [26.47, 54], 
});

const mymap = L.map('map', { zoomControl: false }).setView([-33.92584, 18.42322], 13);
const marker = L.marker([-33.92584, 18.42322], {icon: locationIcon}).addTo(mymap);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);


searchButton.addEventListener("click", function(){
  console.log("Button pressed");
  validateInput();
})

async function validateInput(){

  let ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  let domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

  let ipAddress = '';
  let domain = '';
  const apiKey = 'at_b0PPwg0Tikk15soMbSFHav21QUcqs';
  const apiURL = 'https://geo.ipify.org/api/v2/country,city?';
  

  if (ipRegex.test(userIP.value)) {
    userIP.style.border = "none";
    userIP.style.color = "black";
    console.log(`The IP Address ${userIP.value} is valid`);
    ipAddress = userIP.value;
    let validURL = await `${apiURL}apiKey=${apiKey}&ipAddress=${ipAddress}`;

    //go to fetchData with valid URL
    fetchData(validURL);

  } else if (domainRegex.test(userIP.value)){
    userIP.style.border = "none";
    userIP.style.color = "black";
    console.log(`The domain name ${domain} is valid`);
    domain = userIP.value;
    let validURL = await `${apiURL}apiKey=${apiKey}&ipAddress=${ipAddress}&domain=${domain}`;

    //go to fetchData with valid URL
    fetchData(validURL);

  } else {
    userIP.style.border = "3px solid red";
    userIP.style.color = "red";
    alert("Please enter a valid IP Address or Domain Name");
  }

}

async function fetchData(url){

  console.log("We've entered our fetch data async function");

  let response = await fetch(url);
  let data = await response.json();
  console.log(data);

  const latitude = data.location.lat;
  const longitude = data.location.lng;

  mymap.setView([latitude, longitude], 13);
  marker.setLatLng([latitude, longitude]);

  console.log(`Our latitude is ${latitude} and our longitude is ${longitude}`);

  ipAddressShown.textContent = data.ip;
  ipLocationShown.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  ipTimezoneShown.textContent = `UTC${data.location.timezone}`;
  ipISPShown.textContent = data.isp;

  console.log("async function done");

}

/* async function fetchDataExample(url){
  
  console.log("We are now fetching the data from our API");
  console.log(`Our current url is ${url}`);

  const littleTokyo = {
    "ip": "142.250.188.238",
    "location": {
        "country": "US",
        "region": "California",
        "city": "Little Tokyo",
        "lat": 34.04779,
        "lng": -118.24118,
        "postalCode": "",
        "timezone": "-07:00",
        "geonameId": 5367260
    },
    "domains": [
        "7signs4.com",
        "cafebots.info",
        "chromecast.de",
        "crr.com",
        "damonday.me"
    ],
    "as": {
        "asn": 15169,
        "name": "GOOGLE",
        "route": "142.250.188.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC"
}

  const mountainView = {
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "Ohio",
        "city": "Glenmont",
        "lat": 40.52006,
        "lng": -82.09737,
        "postalCode": "44628",
        "timezone": "-04:00",
        "geonameId": 4833344
    },
    "domains": [
        "0735.tk",
        "07capital.com",
        "0x77.us",
        "15wtmdhgf.tk",
        "181yt.com"
    ],
    "as": {
        "asn": 15169,
        "name": "GOOGLE",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC"
}

  const capeTown = {
    "ip": "102.218.217.240",
    "location": {
        "country": "ZA",
        "region": "Western Cape",
        "city": "Cape Town",
        "lat": -33.92584,
        "lng": 18.42322,
        "postalCode": "7945",
        "timezone": "+02:00",
        "geonameId": 3369157
    },
    "as": {
        "asn": 37621,
        "name": "CipherWave",
        "route": "102.218.217.0/24",
        "domain": "cipherwave.co.za",
        "type": "Cable/DSL/ISP"
    },
    "isp": "Cipherwave"
  }

  // San Gabriel California Data
  
  const data = {
    "ip": "192.212.174.101",
    "location": {
        "country": "US",
        "region": "California",
        "city": "South San Gabriel",
        "lat": 34.04915,
        "lng": -118.09462,
        "postalCode": "",
        "timezone": "-07:00",
        "geonameId": 5397771
    },
    "as": {
        "asn": 7127,
        "name": "SCE",
        "route": "192.212.0.0/15",
        "domain": "",
        "type": ""
    },
    "isp": "Southern California Edison"
  }

  const latitude = data.location.lat;
  const longitude = data.location.lng;

  mymap.setView([latitude, longitude], 13);
  marker.setLatLng([latitude, longitude]);

  console.log(`Our latitude is ${latitude} and our longitude is ${longitude}`);

  ipAddressShown.textContent = data.ip;
  ipLocationShown.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  ipTimezoneShown.textContent = `UTC${data.location.timezone}`;
  ipISPShown.textContent = data.isp;

} */

// Code example to validate IPv4 Address

/* function isValidIPv4(ip) {
  const octets = ip.split(".");

  console.log(octets.length);

  if (octets.length !== 4) {
    return false;
  } 

  for (const octet of octets){
    
    const digit = Number(octet);
    
    if (isNaN(digit) || digit < 0 || digit > 255 || octet !== String(digit)){
      return false
    }
  }

  return true

}

// Example usage:
console.log(isValidIPv4("192.168.1.00")); // true
console.log(isValidIPv4("256.168.0.1")); // false */
