import axios from "axios";
import { API_PATH } from "constants";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: API_PATH,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers["x-access-token"] = token ? `${token}` : "";
    return config;
  });

  return instance;
};

export const client = fetchClient();

export const generateArrayOfYears = () => {
  var max = new Date().getFullYear();
  var min = max - 2;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const timer = (start, end) => {
  console.log('start',start, end)
  // Update the count down every 1 second
  // var x = setInterval(function () {
  // Get start date and time
  var now = start.getTime();
console.log('object')
  // Find the distance between now and the end date
  var distance = end.getTime() - now;
console.log('distance',distance)
  // Time calculations for days, hours, minutes and seconds
  // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  // ctrl.innerHTML =
  //   // days + "d " +
  //   hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    // clearInterval(x);
    // ctrl.innerHTML = "EXPIRED";
    return { status: false, message: "Expired" };
  }
  return { hours, minutes, seconds, status: true, message: "Time left" };
  // }, 1000);
};

// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
