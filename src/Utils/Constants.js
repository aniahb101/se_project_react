export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../Images/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../Images/day/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../Images/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../Images/night/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../Images/day/fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../Images/day/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../Images/night/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../Images/night/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../Images/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../Images/day/storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../Images/night/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../Images/night/storm.png", import.meta.url).href,
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
