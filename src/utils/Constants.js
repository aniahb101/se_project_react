import dayClear from "../images/day/clear.png";
import dayCloudy from "../images/day/clouds.png";
import dayFog from "../images/day/fog.png";
import dayRain from "../images/day/rain.png";
import daySnow from "../images/day/snow.png";
import dayStorm from "../images/day/storm.png";
import nightClear from "../images/night/clear.png";
import nightCloudy from "../images/night/clouds.png";
import nightFog from "../images/night/fog.png";
import nightRain from "../images/night/rain.png";
import nightSnow from "../images/night/snow.png";
import nightStorm from "../images/night/storm.png";

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: dayClear,
  },
  {
    day: true,
    condition: "clouds",
    url: dayCloudy,
  },
  {
    day: true,
    condition: "fog",
    url: dayFog,
  },
  {
    day: true,
    condition: "rain",
    url: dayRain,
  },
  {
    day: true,
    condition: "snow",
    url: daySnow,
  },
  {
    day: true,
    condition: "storm",
    url: dayStorm,
  },
  {
    day: false,
    condition: "clear",
    url: nightClear,
  },
  {
    day: false,
    condition: "clouds",
    url: nightCloudy,
  },
  {
    day: false,
    condition: "fog",
    url: nightFog,
  },
  {
    day: false,
    condition: "rain",
    url: nightRain,
  },
  {
    day: false,
    condition: "snow",
    url: nightSnow,
  },
  {
    day: false,
    condition: "storm",
    url: nightStorm,
  },
];

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://images.unsplash.com/photo-1592367630397-65872fe016e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://images.unsplash.com/photo-1603787081151-cbebeef20092?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://images.unsplash.com/photo-1618677603544-51162346e165?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const coordinates = {
  latitude: 39.29044,
  longitude: -76.612328,
};

export const APIkey = "0583bd5843c3aa72cd8624ea9d509732";
