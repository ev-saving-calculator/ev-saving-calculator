import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CarItems from './CarItems'
import cars from '../data/cars.js'

const useStyles = makeStyles(theme => ({
  dialog: {
    background: '#484848'
  }
}))

const SelectElectricCarDialog = props => {
  const { versionConfig } = props
  const classes = useStyles()
  const [category, setCategory] = useState(null)

  useEffect(() => {
    if (!props.open) {
      setCategory(null)
    }
  }, [props.open])

  const handleSelectCategory = item => {
    if (item.id === 'custom') {
      props.onSelect('custom')
    } else if (item.items) {
      setCategory(item)
    } else {
      props.onSelect([item.id])
    }
  }

  const handleSelectItem = item => {
    if (item.id === 'back') {
      setCategory(null)
    } else {
      props.onSelect([category.id, item.id])
    }
  }

  const categoryWithPriceFrom = cars
    .filter(i => !i.price || i.price[versionConfig.priceId])
    .map(i => {
      if (i.items) {
        const lowPrice = i.items.sort((a, b) => a.price - b.price)
        const untilRange = i.items.map(i => Math.round((i.usableBattery / i.efficiency) * 100)).sort((a, b) => b - a)
        return {
          ...i,
          priceFrom: lowPrice[0].price[versionConfig.priceId],
          untilRange: untilRange[0],
          items: i.items.filter(k => k.price[versionConfig.priceId])
        }
      } else {
        return i
      }
    })

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      scroll="body"
      onClose={props.onClose}
      open={props.open}
      maxWidth="lg"
      fullWidth>
      {!category ? (
        <CarItems
          data={[...categoryWithPriceFrom, { id: 'custom', label: 'Vlastní paremetry' }]}
          onSelect={handleSelectCategory}
          vat={props.vat}
          priceUnit={versionConfig.priceUnit}
          priceId={versionConfig.priceId}
        />
      ) : (
        <CarItems
          vat={props.vat}
          data={[{ id: 'back', label: 'Zpět' }, ...category.items.map(i => ({ ...i, image: category.image }))]}
          onSelect={handleSelectItem}
          priceUnit={versionConfig.priceUnit}
          priceId={versionConfig.priceId}
        />
      )}
    </Dialog>
  )
}

SelectElectricCarDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  vat: PropTypes.bool.isRequired,
  versionConfig: PropTypes.object.isRequired
}

export default SelectElectricCarDialog
