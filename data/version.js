import { serviceInputsCommon, serviceInputsElectric } from './serviceItems'

const getServiceDefaultValues = (serviceInputs, priceId) => {
  const values = {}
  serviceInputs.forEach(item => {
    values[item.id] = {
      distance: item.defaultDistance,
      price: item.defaultPrice[priceId],
      active: true
    }
  })
  return values
}

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
    defaultValues: {
      grant: 30,
      enableGrant: false,
      purchasePrice: 900000,
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
