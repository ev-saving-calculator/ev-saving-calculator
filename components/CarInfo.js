import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { priceWithoutVat } from '../src/utils'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import CardMedia from '@material-ui/core/CardMedia'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: grey[800],
    color: theme.palette.common.white
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 200
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100px'
    }
  },
  playIcon: {
    height: 38,
    width: 38
  },
  changeCarButton: {
    marginTop: theme.spacing(1)
  },
  editButton: {
    marginTop: theme.spacing(1)
  },
  infoButton: {
    marginTop: theme.spacing(1)
  },
  origin: {
    marginTop: theme.spacing(1),
    opacity: 0.8,
    '& a': {
      color: 'white'
    }
  }
}))

function CarInfo(props) {
  const classes = useStyles()
  const { data, onClickSelectCar, onClickEdit, versionConfig, vat } = props

  if (!data) {
    return (
      <div>
        <Button
          className={classes.selectButton}
          onClick={onClickSelectCar}
          variant="outlined"
          size="large"
          color="primary">
          Vybrat vůz
        </Button>
      </div>
    )
  }

  const price = typeof data.price === 'number' ? data.price : data.price[versionConfig.priceId]

  return (
    <>
      <Card className={classes.root}>
        {props.data.image && <CardMedia className={classes.cover} image={props.data.image} title="" />}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="subtitle1" color="initial">
              {props.data.label}
            </Typography>
            <Typography variant="subtitle2" color="initial">
              Cena:{' '}
              <b>
                {(vat ? price : Math.round(priceWithoutVat(versionConfig.vat, price))).toLocaleString()}{' '}
                {versionConfig.priceUnit}
              </b>
            </Typography>
            <Typography variant="subtitle2" color="initial">
              Baterie: <b>{data.battery.toLocaleString()} kWh</b>, Spotřeba:{' '}
              <b>{data.efficiency.toLocaleString()} kWh</b>
            </Typography>
            {!props.custom && (
              <Typography variant="subtitle2" color="initial">
                Dojezd: <b>{Math.round((data.usableBattery / data.efficiency) * 100)} km</b>
              </Typography>
            )}

            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={onClickEdit}
              startIcon={<EditIcon />}
              className={classes.editButton}>
              Upravit parametry
            </Button>
            {!props.custom && (
              <Typography variant="body2" color="initial" className={classes.origin}>
                Zdroj dat{' '}
                <Link target="_blank" href="https://ev-database.org/">
                  https://ev-database.org
                </Link>
              </Typography>
            )}
          </CardContent>
        </div>
      </Card>
      <Button
        className={classes.changeCarButton}
        onClick={onClickSelectCar}
        variant="outlined"
        size="large"
        color="primary">
        Změnit vůz
      </Button>
    </>
  )
}

CarInfo.propTypes = {
  data: PropTypes.object,
  vat: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func,
  onClickSelectCar: PropTypes.func,
  custom: PropTypes.bool,
  versionConfig: PropTypes.object.isRequired
}

export default CarInfo
