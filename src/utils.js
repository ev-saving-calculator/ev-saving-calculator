import payments from '../data/paymentsCz.js'
import { serviceInputsCommon, serviceInputsElectric } from '../data/serviceItems'
import carItems from '../data/cars.js'

const WEEKS_IN_YEAR = 52
const MONTHS_IN_YEAR = 12

const getSum = (total, num) => {
  return total + num
}

const sum = array => array.reduce(getSum, 0)

const getRangePrice = ({ car, range, price }) => {
  const consumption = car.efficiency / 100 // kWh/km 0.181 - Tesla Model 3
  return range * consumption * price
}

export const priceWithoutVat = (vat, price) => price / (1 + vat / 100)

export const priceWithVat = (vat, price) => price * (1 + vat / 100)

export const getYearRange = ({ distanceToWork, workingDays, additionalRange, distanceType, distance }) => {
  if (distanceType === 'static') {
    return distance
  } else {
    return (distanceToWork * 2 * workingDays + additionalRange) * WEEKS_IN_YEAR
  }
}

export const recalculateCustomCarPrice = (vat, values) => ({
  ...values,
  price: values.withVat ? values.price : priceWithVat(vat, values.price)
})

const getChargingPrice = (car, values) => {
  const { distanceToWork, workingDays, additionalRange, routeTypeWork, distanceType, distance, chargingItems } = values
  const kwhPriceItems = chargingItems
    .filter(i => i.type === 'kwh')
    .map(i => (chargingItems.length === 1 ? { ...i, part: 100 } : i))
    .map(i =>
      getRangePrice({
        car,
        range: getYearRange({ distanceToWork, workingDays, additionalRange, distanceType, distance }) * (i.part / 100),
        price: i.value,
        routeType: routeTypeWork
      })
    )

  const flatPriceItems = chargingItems.filter(i => i.type === 'flat').map(i => MONTHS_IN_YEAR * i.value)

  const powerStationPrice = chargingItems
    .filter(i => i.type === 'powerStation')
    .map(i => i.value)
    .reduce(getSum, 0)

  return {
    electricPrice: [...kwhPriceItems, ...flatPriceItems].reduce(getSum, 0),
    powerStationPrice
  }
}

export const getTotalCostElectric = (versionConfig, values, operationalCosts, years) => {
  const { grant, enableGrant, company, vat, serviceElectric } = values
  const car = getCar2(values, versionConfig)

  const { electricPrice, powerStationPrice } = getChargingPrice(car, values)

  const distancePerYear = getYearRange(values)

  const rawCarPrice = typeof car.price === 'number' ? car.price : car.price[versionConfig.priceId]

  const carPrice = operationalCosts
    ? 0
    : enableGrant && company && !grantOverflow(versionConfig, values) && !grantTooSmall(versionConfig, values)
    ? getCarPriceWithGrant(rawCarPrice, grant, vat && company, versionConfig.vat)
    : vat
    ? rawCarPrice
    : priceWithoutVat(versionConfig.vat, rawCarPrice)

  const servicePrice = serviceInputsElectric
    .filter(i => serviceElectric[i.id].active)
    .map(
      serviceItem =>
        Math.floor((distancePerYear * years) / serviceElectric[serviceItem.id].distance) *
        serviceElectric[serviceItem.id].price
    )

  const serviceCustomPrice = values.serviceElectricCustom
    .filter(i => i.distance > 0 && i.price > 0)
    .map(serviceItem => Math.floor((distancePerYear * years) / serviceItem.distance) * serviceItem.price)

  const complete = carPrice + years * electricPrice + powerStationPrice + sum(servicePrice) + sum(serviceCustomPrice)

  return {
    complete,
    carPrice: carPrice,
    electric: years * electricPrice + powerStationPrice,
    service: sum(servicePrice) + sum(serviceCustomPrice)
  }
}

export const getCarPriceWithGrant = (price, grant, vat, vatValue) => {
  const save = priceWithoutVat(vatValue, price) * (grant / 100)
  return (vat ? price : priceWithoutVat(vatValue, price)) - save
}

export const getRoadTax = (engineCapacity, years) => {
  let sum = 0
  for (let i = 0; i <= years; i++) {
    sum += payments.roadTax[engineCapacity] * (1 - payments.roadTaxSales[i])
  }
  return sum
}

const getpragueParkingPrice = (versionConfig, value, vat, years) => {
  const item = versionConfig.pragueParking.find(i => i.id === value)
  if (item) {
    return item.price * (years + 1)
    // return vat ? item.price : priceWithoutVat(item.price)
  } else {
    return 0
  }
}

export const getTotalCostCommon = (versionConfig, values, operationalCosts, years) => {
  const {
    purchasePrice,
    fuelPrice,
    consumption,
    distanceToWork,
    workingDays,
    additionalRange,
    toll,
    engineCapacity,
    roadTax,
    company,
    distanceType,
    distance,
    pragueParking,
    serviceCommon,
    vat
  } = values
  const distancePerYear = getYearRange({
    additionalRange,
    workingDays,
    distanceToWork,
    distanceType,
    distance
  })
  const fuelPricePerYear = (fuelPrice * distancePerYear * consumption) / 100
  const tollPrice = toll ? payments.toll * (years + 1) : 0
  const roadTaxPrice = roadTax && company ? getRoadTax(engineCapacity, years) : 0
  const pragueParkingPrice = pragueParking ? getpragueParkingPrice(versionConfig, pragueParking, vat, years) : 0
  const pricePerYear = fuelPricePerYear
  const carPrice = operationalCosts ? 0 : purchasePrice

  const servicePrice = serviceInputsCommon
    .filter(i => serviceCommon[i.id].active)
    .map(
      serviceItem =>
        Math.floor((distancePerYear * years) / serviceCommon[serviceItem.id].distance) *
        serviceCommon[serviceItem.id].price
    )

  const serviceCustomPrice = values.serviceCommonCustom
    .filter(i => i.distance > 0 && i.price > 0)
    .map(serviceItem => Math.floor((distancePerYear * years) / serviceItem.distance) * serviceItem.price)

  const price =
    carPrice +
    pricePerYear * years +
    sum(servicePrice) +
    sum(serviceCustomPrice) +
    roadTaxPrice +
    pragueParkingPrice +
    tollPrice

  return {
    complete: price,
    carPrice,
    fuel: pricePerYear * years,
    others: roadTaxPrice + pragueParkingPrice + tollPrice,
    service: sum(servicePrice) + sum(serviceCustomPrice)
  }
}

export const getPricePerKmCommon = values => {
  const { fuelPrice, consumption, serviceCommon } = values

  const servicePrice = serviceInputsCommon
    .filter(i => serviceCommon[i.id].active)
    .map(serviceItem => serviceCommon[serviceItem.id].price / serviceCommon[serviceItem.id].distance)

  const serviceCustomPrice = values.serviceCommonCustom
    .filter(i => i.distance > 0 && i.price > 0)
    .map(serviceItem => serviceItem.price / serviceItem.distance)

  return sum(servicePrice) + sum(serviceCustomPrice) + (fuelPrice * consumption) / 100
}

export const getPricePerKmElectric = (values, versionConfig) => {
  const { serviceElectric } = values

  const car = getCar2(values, versionConfig)
  const yearRange = getYearRange(values)

  const { electricPrice } = getChargingPrice(car, values)

  const servicePrice = serviceInputsElectric
    .filter(i => serviceElectric[i.id].active)
    .map(serviceItem => serviceElectric[serviceItem.id].price / serviceElectric[serviceItem.id].distance)

  const serviceCustomPrice = values.serviceElectricCustom
    .filter(i => i.distance > 0 && i.price > 0)
    .map(serviceItem => serviceItem.price / serviceItem.distance)

  return sum(servicePrice) + sum(serviceCustomPrice) + electricPrice / yearRange
}

export const getCarByIds2 = data => {
  if (!Array.isArray(data)) {
    return null
  }
  const category = carItems.find(i => i.id === data[0])
  if (data.length === 1) {
    return category
  } else {
    return { ...category, ...category.items.find(k => k.id === data[1]) }
  }
}

export const maxGrantCarPrice = 1250000
export const minGrantPrice = 250000

export const getCar2 = (values, versionConfig) => {
  return !values.carId
    ? 0
    : getCarByIds2(values.carId) || recalculateCustomCarPrice(versionConfig.vat, values.customCar)
}

export const grantOverflow = (versionConfig, values) => {
  const car = getCar2(values, versionConfig)
  if (car) {
    return (
      priceWithoutVat(versionConfig.vat, typeof car.price === 'number' ? car.price : car.price[versionConfig.priceId]) >
      maxGrantCarPrice
    )
  } else {
    return false
  }
}

export const grantTooSmall = (versionConfig, values) => {
  const car = getCar2(values, versionConfig)
  if (car) {
    return getGrantPrice(versionConfig, values, values.grant) <= minGrantPrice
  } else {
    return false
  }
}

export const getGrantPrice = (versionConfig, values, grant) => {
  const car = getCar2(values, versionConfig)
  if (car) {
    return (
      priceWithoutVat(versionConfig.vat, typeof car.price === 'number' ? car.price : car.price[versionConfig.priceId]) *
      (grant / 100)
    )
  } else {
    return 0
  }
}

const carbonPerKWHBuild = 100

export const getCarbonFootprintElectric = (versionConfig, values, range) => {
  const { chargingItems } = values
  const car = getCar2(values, versionConfig)

  const carbonPerKWHPowerStation = chargingItems
    .map(i => (chargingItems.length === 1 ? { ...i, part: 100 } : i))
    .map(i => (i.part / 100) * i.co2emission)
    .reduce(getSum, 0)

  return (((car.efficiency / 100) * carbonPerKWHPowerStation) / 1000) * range
}

export const getCarbonFootprintElectricWithBattery = (versionConfig, values, range) => {
  const car = getCar2(values, versionConfig)
  return car.battery * carbonPerKWHBuild + getCarbonFootprintElectric(versionConfig, values, range)
}

export const getCarbonFootprintCommon = ({ co2Emission, co2EmissionFuelTransport }, range) => {
  return (co2Emission / 1000) * range * (1 + parseInt(co2EmissionFuelTransport) / 100)
}
