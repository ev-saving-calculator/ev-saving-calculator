import React, { useCallback, useMemo, useRef, useState } from "react"
import PropTypes from 'prop-types'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Form from '../components/Form'
import Charts from '../components/Charts'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AboutDialog from '../components/AboutDialog'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { useWindowHeight, useWindowWidth } from "@react-hook/window-size"
import useComponentSize from '@rehooks/component-size'
import CalcInfoDialog from './CalcInfoDialog'
import cn from 'classnames'
import MoreInformationDialog from '../components/MoreInformationDialog'
import version from '../data/version'
import { getCar2 } from "../src/utils";

const MAX_WIDTH = 1420

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    // padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    maxWidth: MAX_WIDTH,
    [theme.breakpoints.down(MAX_WIDTH)]: {
      maxWidth: '100%'
    }
  },
  '@global': {
    body: {
      margin: 0
    }
  },
  img: {
    maxWidth: '100%'
  },
  paper: {
    padding: theme.spacing(2)
    // marginBottom: theme.spacing(3),
    // position: 'sticky',
    // top: 20
  },
  paperSticky: {
    position: 'sticky',
    top: theme.spacing(1)
  },
  leftImage: {
    height: '100vh',
    background: 'url(tesla.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  title: {
    flexGrow: 1,
    color: 'white',
    [theme.breakpoints.down(700)]: {
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center'
    }
  },
  aboutButton: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  aboutIcon: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'absolute',
      right: 9,
      top: 0,
      color: 'white'
    }
  },
  moreButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  header: {
    display: 'flex',
    width: '100%',
    maxWidth: MAX_WIDTH,
    [theme.breakpoints.down('xs')]: {
      '& $title': {
        fontSize: '1rem'
      },
      '& $icon': {
        height: 29,
        top: -3,
        marginBottom: -10
      }
    }
  },
  icon: {
    top: 2,
    position: 'relative',
    marginRight: 0,
    height: 31,
    width: 35,
    marginBottom: -6
  }
}))

const Calculator = props => {
  const classes = useStyles()
  const versionConfig = version[props.versionId]

  const defaultValues = useMemo(
    () => ({
      compareCarbonFootprint: false,
      loan: {
        active: true,
        enterPayment: true,
        electricCar: {
          cash: 700000,
          payment: 11975,
          months: 60,
        },
        commonCar: {
          cash: 700000,
          payment: 0,
          months: 60,
        }
      },
      company: false,
      carId: ['enyaq', 'enyaq-60'], // ['model_3', 't3_range_plus'],
      consumption: 7,
      distanceToWork: 50,
      workingDays: 5,
      vat: true,
      additionalRange: 30,
      distance: 35000,
      distanceType: 'static',
      serviceElectricCustom: [],
      serviceCommonCustom: [],
      co2Emission: 120,
      co2EmissionFuelTransport: '19',
      pragueParking: 0,
      ...versionConfig.defaultValues,
      ...props.shareValues
    }),
    []
  )
  const windowHeight = useWindowHeight()
  const windowsWidth = useWindowWidth()
  const ref = useRef(null)
  const { height } = useComponentSize(ref)
  const [values, setValue] = useState(defaultValues)
  const [showMoreInfoDialog, setShowMoreInfoDialog] = useState(false)
  const [showAboutDialog, setShowAboutDialog] = useState(false)
  const handleSubmitForm = useCallback(values => setValue(values), [])

  const handleClickShowMore = () => setShowMoreInfoDialog(true)
  const handleCloseShowMore = () => setShowMoreInfoDialog(false)

  const handleOpenAbout = () => setShowAboutDialog(true)
  const handleCloseAbout = () => setShowAboutDialog(false)

  const enableSticky = windowHeight - 10 > height && height > 0

  const car = getCar2(values, versionConfig)

  return (
    <>
      <Head>
        <title>Vyplatí se mi elektromobil? {(car && car.label) ? car.label : ''}</title>
      </Head>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Container maxWidth={'xl'} classes={{ root: classes.header }}>
            <img alt="charging" src={'charging.svg'} className={classes.icon} />
            <Typography variant="h6" component="h1" className={classes.title}>
              Vyplatí se mi elektromobil?
            </Typography>
            <IconButton className={classes.aboutIcon} onClick={handleOpenAbout}>
              <InfoIcon />
            </IconButton>
            <Button color="inherit" className={classes.moreButton} onClick={handleClickShowMore}>
              Doporučené kanály
            </Button>
            <Button color="inherit" className={classes.aboutButton} onClick={handleOpenAbout}>
              O aplikaci
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'xl'} classes={{ root: classes.root }}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Paper className={classes.paper} square>
              <Form
                co2default={437}
                vat={21}
                onSubmit={handleSubmitForm}
                grant
                defaultValues={defaultValues}
                versionConfig={versionConfig}
                renderRegionInfo={props.renderRegionInfo}
              />
            </Paper>
          </Grid>
          <Grid item md={6} xs={12}>
            <div ref={ref} className={cn(enableSticky && classes.paperSticky)}>
              {values && values.carId && (
                <Paper className={cn(classes.paper)} square>
                  <Charts
                    infoComponent={CalcInfoDialog}
                    renderCo2Info={props.renderCo2Info}
                    vat={21}
                    values={values}
                    versionConfig={versionConfig}
                  />
                </Paper>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
      <AboutDialog open={showAboutDialog} onClose={handleCloseAbout} />
      <MoreInformationDialog open={showMoreInfoDialog} onClose={handleCloseShowMore} />
    </>
  )
}

Calculator.propTypes = {
  versionId: PropTypes.string.isRequired,
  renderRegionInfo: PropTypes.any
}

export default Calculator
