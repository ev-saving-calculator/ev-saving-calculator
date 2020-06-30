import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddIcon from '@material-ui/icons/Add'

function SelectCharging(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleSelect = chargingType => () => {
    props.onSelect(chargingType)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleClick} startIcon={<AddIcon/>}>
        Přidat další typ nabíjení
      </Button>
      <Menu id="charging-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleSelect('kwh')}>{props.priceUnit}/kWh</MenuItem>
        <MenuItem onClick={handleSelect('flat')}>Měsíční paušál</MenuItem>
        <MenuItem onClick={handleSelect('free')}>Zdarma</MenuItem>
        <MenuItem onClick={handleSelect('powerStation')}>Vlastní elektrárna</MenuItem>
      </Menu>
    </div>
  )
}

SelectCharging.propTypes = {
  onSelect: PropTypes.func.isRequired,
  priceUnit: PropTypes.string.isRequired
}

export default SelectCharging
