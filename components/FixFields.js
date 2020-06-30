import { useEffect, useRef } from 'react'
import { priceWithoutVat, priceWithVat } from '../src/utils'
import { serviceInputsCommon, serviceInputsElectric } from '../data/serviceItems'

const priceItems = ['fuelPrice', 'purchasePrice']

const FixFields = props => {
  const { setFieldValue, values } = props

  const recalculatePrice = (price, round = true) => {
    const nextPrice = values.vat ? priceWithVat(props.vat, price) : priceWithoutVat(props.vat, price)
    return round ? Math.round(nextPrice) : nextPrice
  }

  useEffect(() => {
    if (!values.company) {
      setFieldValue('vat', true)
    }
  }, [values.company])

  const isFirstRun = useRef(true)

  // recalculate price with/without vat
  useEffect(() => {
    if (!isFirstRun.current) {
      // charging
      values.chargingItems.forEach((item, index) => {
        setFieldValue(
          `chargingItems.${index}.value`,
          recalculatePrice(item.value, false).toFixed(item.type === 'kwh' ? 2 : 0)
        )
      })
      // service
      serviceInputsCommon.forEach(serviceInput => {
        const value = values.serviceCommon[serviceInput.id].price
        setFieldValue(`serviceCommon.${serviceInput.id}.price`, recalculatePrice(value))
      })
      serviceInputsElectric.forEach(serviceInput => {
        const value = values.serviceCommon[serviceInput.id].price
        setFieldValue(`serviceElectric.${serviceInput.id}.price`, recalculatePrice(value))
      })
      // custom service
      values.serviceElectricCustom.forEach((serviceInput, index) => {
        setFieldValue(`serviceElectricCustom.${index}.price`, recalculatePrice(serviceInput.price))
      })
      values.serviceCommonCustom.forEach((serviceInput, index) => {
        setFieldValue(`serviceCommonCustom.${index}.price`, recalculatePrice(serviceInput.price))
      })
      // payments
      priceItems.forEach(name => {
        const newValue = recalculatePrice(values[name], false)
        if (name === 'fuelPrice') {
          setFieldValue(name, newValue.toFixed(2))
        } else {
          setFieldValue(name, Math.round(newValue))
        }
      })
    } else {
      isFirstRun.current = false
    }
  }, [values.vat])
  return null
}

export default FixFields
