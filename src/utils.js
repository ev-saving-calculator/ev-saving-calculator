import payments from '../data/paymentsCz.js'
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

export const getServicePrice = (items, distancePerYear, years) => {
  const servicePrice = items
    .filter(i => (i.distance || i.period) && i.price > 0)
    .map(serviceItem => {
      const cyclesDistance = serviceItem.distance ? Math.floor((distancePerYear * years) / serviceItem.distance) : 0
      const cyclesPeriod = serviceItem.period ? Math.floor(years / serviceItem.period) : 0
      const cycles = Math.max(cyclesPeriod, cyclesDistance)
      return {
        name: serviceItem.name,
        cycles,
        price: cycles * serviceItem.price
      }
    })

  return {
    complete: sum(servicePrice.map(i => i.price)),
    items: servicePrice
  }
}

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
  const { grant, enableGrant, company, vat } = values
  const loan = values.loan.active ? values.loan.electricCar : null
  const car = getCar2(values, versionConfig)
  const loanPayments = loan ? loan.payment * (Math.min(12 * years, loan.months)) : 0
  const { electricPrice, powerStationPrice } = getChargingPrice(car, values)

  const distancePerYear = getYearRange(values)

  const rawCarPrice = typeof car.price === 'number' ? car.price : car.price[versionConfig.priceId]

  const calcWithGrant =
    enableGrant && company && !grantOverflow(versionConfig, values) && !grantTooSmall(versionConfig, values)

  const carPriceWithoutGrant = vat ? rawCarPrice : priceWithoutVat(versionConfig.vat, rawCarPrice)
  console.log(carPriceWithoutGrant)
  /*const carPrice = operationalCosts
    ? 0
    : calcWithGrant
    ? getCarPriceWithGrant(rawCarPrice, grant, vat && company, versionConfig.vat)
    : carPriceWithoutGrant*/

  const carPrice = operationalCosts ? 0 : loan.cash

  const servicePrice = getServicePrice(values.serviceElectric, distancePerYear, years)
  const complete = carPrice + years * electricPrice + powerStationPrice + servicePrice.complete + loanPayments

  const allItems = [
    { name: 'Pořizovací cena', price: vat ? rawCarPrice : priceWithoutVat(versionConfig.vat, rawCarPrice) },
    ...servicePrice.items,
    { name: 'Nabíjení', price: years * electricPrice }
  ]

  if (powerStationPrice) {
    allItems.push({ name: 'Elektrárny', price: powerStationPrice })
  }

  if (calcWithGrant) {
    const priceWithGrant = getCarPriceWithGrant(rawCarPrice, grant, vat && company, versionConfig.vat)
    const priceWithoutGrant = vat ? rawCarPrice : priceWithoutVat(versionConfig.vat, rawCarPrice)
    allItems.push({
      name: 'Dotace na EV',
      price: priceWithGrant - priceWithoutGrant
    })
  }

  return {
    complete: complete - getSalePrice(carPriceWithoutGrant, years),
    carPrice: carPrice,
    electric: years * electricPrice + powerStationPrice,
    service: servicePrice.complete,
    allItems
  }
}

export const getCarPriceWithGrant = (price, grant, vat, vatValue) => {
  const save = priceWithoutVat(vatValue, price) * (grant / 100)
  return (vat ? price : priceWithoutVat(vatValue, price)) - save
}

export const getRoadTax = (engineCapacity, years) => {
  let sum = 0
  for (let i = 0; i < years; i++) {
    sum += payments.roadTax[engineCapacity] * (1 - payments.roadTaxSales[i] || 0)
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
    vat,
  } = values
  const distancePerYear = getYearRange({
    additionalRange,
    workingDays,
    distanceToWork,
    distanceType,
    distance
  })
  const loan = values.loan.active ? values.loan.commonCar : null
  const fuelPricePerYear = (fuelPrice * distancePerYear * consumption) / 100
  const tollPrice = toll ? payments.toll * (years + 1) : 0
  const roadTaxPrice = roadTax && company ? getRoadTax(engineCapacity, years) : 0
  const pragueParkingPrice = pragueParking ? getpragueParkingPrice(versionConfig, pragueParking, vat, years) : 0
  const pricePerYear = fuelPricePerYear
  const carPrice = operationalCosts ? 0 : (loan ? loan.cash : purchasePrice)
  const servicePrice = getServicePrice(serviceCommon, distancePerYear, years)
  const loanPayments = loan ? years * loan.payment * 12 : 0
  const price =
    carPrice +
    pricePerYear * years +
    servicePrice.complete +
    roadTaxPrice +
    pragueParkingPrice +
    tollPrice +
    loanPayments

  const allItems = [
    { name: 'Pořizovací cena', price: purchasePrice },
    ...servicePrice.items,
    { name: 'Palivo', price: years * fuelPricePerYear },
    { name: 'Dálniční známka', price: tollPrice }
  ]

  if (roadTaxPrice) {
    allItems.push({ name: 'Silniční daň', price: roadTaxPrice, cycles: years })
  }
  if (pragueParkingPrice) {
    allItems.push({ name: 'Parkování v Praze', price: pragueParkingPrice })
  }

  return {
    complete: price - getSalePrice(purchasePrice, years),
    carPrice,
    fuel: pricePerYear * years,
    others: roadTaxPrice + pragueParkingPrice + tollPrice,
    loan: loanPayments,
    service: servicePrice.complete,
    allItems
  }
}

export const getPricePerKmCommon = values => {
  const { fuelPrice, consumption, serviceCommon } = values
  const distancePerYear = getYearRange(values)
  const servicePrice = getServicePrice(serviceCommon, distancePerYear, 1000).complete / (distancePerYear * 1000)
  return servicePrice + (fuelPrice * consumption) / 100
}

export const getPricePerKmElectric = (values, versionConfig) => {
  const { serviceElectric } = values
  const car = getCar2(values, versionConfig)
  const distancePerYear = getYearRange(values)
  const { electricPrice } = getChargingPrice(car, values)
  const servicePrice = getServicePrice(serviceElectric, distancePerYear, 1000).complete / (distancePerYear * 1000)
  return servicePrice + electricPrice / distancePerYear
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

export const getSalePrice = (price, year) => {
  return 0
  const deprectaion = [0, 11.07, 22.42, 34.12, 40.65, 47.32, 54.17, 59.17, 64.3, 69.58, 73.37, 77.27, 81.3, 84.9, 88.68, 92.73]
  /*if (year === 5) {
    console.log (price) 
  }*/
  return -(price * deprectaion[year] / 100)
}

/*
export const getMonthlyPaymentFromInterest = (principal, _interest, payments) => {
  var interest = _interest / 100 / 12;

  // Now compute the monthly payment figure, using esoteric math.
  var x = Math.pow(1 + interest, payments);
  var monthly = (principal * x * interest) / (x - 1);

  // Check that the result is a finite number. If so, display the results.
  if (!isNaN(monthly) &&
    (monthly != Number.POSITIVE_INFINITY) &&
    (monthly != Number.NEGATIVE_INFINITY)) {
    return round(monthly)
  } else {
    return 0
  }
}*/