import { serviceInputsCommon, serviceInputsElectric } from './serviceItems'

const getServiceDefaultValues = (serviceInputs, priceId) =>
  serviceInputs.map(item => ({
    name: item.label,
    distance: item.defaultDistance,
    price: item.defaultPrice[priceId],
    period: item.defaultPeriod
  }))

export default {
  cz: {
    priceId: 'czk',
    priceUnit: 'Kč',
    vat: 21,
    roadTax: true,
    toll: true,
    grant: true,
    charging: {
      powerStationPrice: 250000,
      energyPrice: 2.5,
      flatPrice: 800,
      co2emission: 437
    },
    pragueParking: [
      { id: 1, label: 'Rezident 1. vozidlo (všechno pásma)', price: 1200 },
      { id: 2, label: 'Rezident 2. vozidlo (všechno pásma)', price: 7000 },
      { id: 3, label: 'Rezident 3. a další vozidlo (pásmo 1)', price: 36000 },
      { id: 4, label: 'Rezident 3. a další vozidlo (pásmo 2)', price: 30000 },
      { id: 5, label: 'Rezident 3. a další vozidlo (pásmo 3)', price: 24000 },
      {
        id: 6,
        label: 'Rezident starší 65 let, rezident-držitel průkazu ZTP, ZTP-P 65 1. vozidlo (všechna pásma)',
        price: 360
      },
      {
        id: 7,
        label: 'Rezident starší 65 let, rezident-držitel průkazu ZTP, ZTP-P 65 2. vozidlo (všechna pásma)',
        price: 7000
      },
      {
        id: 8,
        label: 'Rezident starší 65 let, rezident-držitel průkazu ZTP, ZTP-P 65 3. a další vozidlo (pásmo 1)',
        price: 36000
      },
      {
        id: 9,
        label: 'Rezident starší 65 let, rezident-držitel průkazu ZTP, ZTP-P 65 3. a další vozidlo (pásmo 1)',
        price: 30000
      },
      {
        id: 10,
        label: 'Rezident starší 65 let, rezident-držitel průkazu ZTP, ZTP-P 65 3. a další vozidlo (pásmo 1)',
        price: 24000
      },
      { id: 11, label: 'Podnikatel (abonent), vlastník nemovitosti 1.vozidlo (všechna pásma)', price: 7000 },
      { id: 12, label: 'Podnikatel (abonent), vlastník nemovitosti 2.vozidlo a další (pásmo 1)', price: 36000 },
      { id: 13, label: 'Podnikatel (abonent), vlastník nemovitosti 2.vozidlo a další (pásmo 2)', price: 30000 },
      { id: 14, label: 'Podnikatel (abonent), vlastník nemovitosti 2.vozidlo a další (pásmo 3)', price: 24000 }
    ],
    defaultValues: {
      grant: 30,
      enableGrant: false,
      purchasePrice: 700000,
      fuelPrice: 31,
      additionalRange: 30,
      roadTax: false,
      toll: true,
      engineCapacity: '2000',
      distance: 35000,
      customCar: {
        price: 1200000,
        withVat: false,
        efficiency: 17,
        battery: 50
      },
      chargingItems: [{ type: 'kwh', value: 2.5, part: 50, co2emission: 437 }],
      serviceCommon: getServiceDefaultValues(serviceInputsCommon, 'czk'),
      serviceElectric: getServiceDefaultValues(serviceInputsElectric, 'czk')
    }
  },
  sk: {
    priceId: 'eur',
    priceUnit: '€',
    vat: 20,
    roadTax: false,
    toll: false,
    charging: {
      powerStationPrice: 9000,
      energyPrice: 2.5,
      flatPrice: 20,
      co2emission: 200
    },
    defaultValues: {
      purchasePrice: 30000,
      customCar: {
        price: 44000,
        withVat: false,
        efficiency: 17,
        battery: 50
      },
      fuelPrice: 1.3,
      roadTax: false,
      toll: false,
      chargingItems: [{ type: 'kwh', value: 0.092, part: 50, co2emission: 200 }],
      serviceCommon: getServiceDefaultValues(serviceInputsCommon, 'eur'),
      serviceElectric: getServiceDefaultValues(serviceInputsElectric, 'eur')
    }
  }
}
