var express = require('express');
var router = express.Router();



const getGeocode = require("../utils/getGeocode");
const getForecast = require("../utils/getForecast");
const getTime = require("../utils/getTime")

var moment = require('moment-timezone');
/* GET home page. */

router.get('/', async function (req, res, next) {
  try {
    const { city } = req.query
    console.log(city)
    if (!city) {
      return res.render('index', { title: 'super weather good' });
    }

    //else
    // get the coordinates from the city name
    const location = await getGeocode(city)
    console.log(location)
    // use the location coords to get the forecast
    // get coords from location.geometry.coordinates
    const forecast = await getForecast(location.geometry.coordinates)
    let a = 1592388191
    let b = new Date(a)
    

    console.log(forecast.current.weather)
    return res.render('index', {
      title: 'Suprer thing',
      forecast: forecast.current,
      time: b.toLocaleString(),
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
