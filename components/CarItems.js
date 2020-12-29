import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { priceWithoutVat } from '../src/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 200
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.4
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.7,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`
  },
  imagePrice: {
    position: 'absolute',
    top: theme.spacing(1)
  },
  imageRange: {
    position: 'absolute',
    bottom: theme.spacing(1)
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
}))

const CarItems = props => {
  const classes = useStyles()

  const formatPrice = price =>
    `${Math.round(props.vat ? price : priceWithoutVat(props.vat, price)).toLocaleString()} ${props.priceUnit}`

  return (
    <div className={classes.root}>
      {props.data.map(item => (
        <ButtonBase
          focusRipple
          key={item.id}
          className={classes.image}
          onClick={() => props.onSelect(item)}
          style={{
            width: 'calc(100% / 5)'
          }}>
          <span
            className={classes.imageSrc}
            style={
              item.image
                ? {
                    backgroundImage: `url(${item.image})`
                  }
                : {
                    backgroundColor: 'grey'
                  }
            }
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
              {item.label}
              <span className={classes.imageMarked} />
            </Typography>
            {['back', 'custom'].indexOf(item.id) === -1 && (
              <>
                <Typography component="span" variant="body2" color="inherit" className={classes.imagePrice}>
                  {item.price ? formatPrice(item.price[props.priceId]) : `od ${formatPrice(item.priceFrom)}`}
                </Typography>
                <Typography component="span" variant="body2" color="inherit" className={classes.imageRange}>
                  dojezd{' '}
                  {item.untilRange ? `až ${item.untilRange}` : Math.round((item.usableBattery / item.efficiency) * 100)}{' '}
                  km
                </Typography>
              </>
            )}
          </span>
        </ButtonBase>
      ))}
    </div>
  )
}

CarItems.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  vat: PropTypes.bool.isRequired,
  priceId: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired
}

export default CarItems
