import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  getCarbonFootprintCommon,
  getCarbonFootprintElectricWithBattery,
  getTotalCostCommon,
  getTotalCostElectric,
  getYearRange
} from '../src/utils'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { green, red } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import MoreInformationDialog from './MoreInformationDialog'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import fetch from 'isomorphic-unfetch'
import ShareLinkDialog from './ShareLinkDialog'
import ShareIcon from '@material-ui/icons/Share'
import Title from './Title'

const ContentPriceTooltip = ({ payload, priceUnit }) => {
  if (payload.length === 0) {
    return null
  }
  return (
    <Paper>
      <Box p={1}>
        {payload.map(item => (
          <Box key={item.dataKey} color={item.stroke}>
            <Typography display="block" variant="p">
              {item.dataKey}: {item.value.toLocaleString()} {priceUnit}
            </Typography>
          </Box>
        ))}
        <Box>
          <Typography display="block" variant="p">
            Ušetřeno: {(payload[0].value - payload[1].value).toLocaleString()} {priceUnit}
          </Typography>
        </Box>
        <Box>
          <Typography display="block" variant="p">
            Najeto: {payload[0].payload.range.toLocaleString()} km
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

ContentPriceTooltip.propTypes = {
  payload: PropTypes.array.isRequired,
  priceUnit: PropTypes.string.isRequired
}

const ContentCarbonTooltip = ({ payload }) => {
  if (payload.length === 0) {
    return null
  }
  return (
    <Paper>
      <Box p={1}>
        {payload.map(item => (
          <Box key={item.dataKey} color={item.stroke}>
            <Typography display="block" variant="p">
              {item.dataKey}: {item.value.toLocaleString()} Kg
            </Typography>
          </Box>
        ))}
        <Box>
          <Typography display="block" variant="p">
            Rozdíl: {(payload[0].value - payload[1].value).toLocaleString()} Kg
          </Typography>
        </Box>
        <Box>
          <Typography display="block" variant="p">
            Najeto: {payload[0].payload.range.toLocaleString()} km
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

ContentCarbonTooltip.propTypes = {
  payload: PropTypes.array.isRequired
}

const formatYear = year => {
  if (year === 1) {
    return 'roku'
  } else {
    return 'letech'
  }
}

const useStyles = makeStyles(theme => ({
  moreInfoButton: {
    marginTop: theme.spacing(1),
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  }
}))

const Charts = props => {
  const classes = useStyles()
  const [shareUrl, setShareUrl] = useState(null)
  const [loader, setLoader] = useState(false)
  const CalcInfoDialog = props.infoComponent
  const [operationalCosts, setOperationalCosts] = useState(false)
  const [showMoreInfoDialog, setShowMoreInfoDialog] = useState(false)
  const [showCalcInfoDialog, setShowCalInfoDialog] = useState(false)

  const handleClickShowMore = () => setShowMoreInfoDialog(true)
  const handleCloseShowMore = () => setShowMoreInfoDialog(false)

  const handleClickShowCalc = () => setShowCalInfoDialog(true)
  const handleCloseShowCalc = () => setShowCalInfoDialog(false)

  const handleChangeOperationCosts = e => setOperationalCosts(e.target.checked)

  const handleClickShare = () => {
    setLoader(true)
    fetch('https://us-central1-electripe-746b0.cloudfunctions.net/setData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.values)
    })
      .then(r => {
        return r.text()
      })
      .then(id => {
        console.log(id)
        setShareUrl(`${window.location.origin + window.location.pathname}?s=${id}`)
      })
      .catch(() => {
        alert('Neznámá chyba')
      })
      .finally(() => {
        setLoader(false)
      })
  }
  const data = useMemo(() => {
    const result = []
    for (let i = 0; i <= 30; i++) {
      result.push({
        name: `${i}. rok`,
        'Spalovací automobil': getTotalCostCommon(props.values, operationalCosts, i),
        Elektromobil: getTotalCostElectric(props.versionConfig, props.values, operationalCosts, i),
        range: getYearRange(props.values) * i
      })
    }
    return result
  }, [operationalCosts, props.values])

  const dataCarbonFootprint = useMemo(() => {
    const result = []
    for (let i = 0; i <= 40; i++) {
      const range = getYearRange(props.values) * i
      result.push({
        name: `${i}. rok`,
        'Spalovací automobil': Math.round(getCarbonFootprintCommon(props.values, range)),
        Elektromobil: Math.round(getCarbonFootprintElectricWithBattery(props.versionConfig, props.values, range)),
        range
      })
    }
    return result
  }, [operationalCosts, props.values])

  const middlePoint = data.findIndex(i => i.Elektromobil - i['Spalovací automobil'] < 0)
  const middlePointCarbon = dataCarbonFootprint.findIndex(i => i.Elektromobil - i['Spalovací automobil'] < 0)
  return (
    <div>
      <Title>Náklady</Title>
      <FormControlLabel
        control={<Checkbox checked={operationalCosts} onChange={handleChangeOperationCosts} />}
        label="Zobrazit pouze náklady na provoz"
      />
      <div style={{ height: 240 }}>
        <ResponsiveContainer>
          <LineChart
            width={730}
            height={250}
            data={data.slice(0, 11)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={tick => tick.toLocaleString()} />
            <Tooltip
              content={payload => <ContentPriceTooltip {...payload} priceUnit={props.versionConfig.priceUnit} />}
              formatter={value => `${value.toLocaleString()} Kg`}
            />
            <Legend />
            <Line type="monotone" dataKey="Spalovací automobil" stroke={red[500]} />
            <Line type="monotone" dataKey="Elektromobil" stroke={green[500]} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {middlePoint !== -1 && !operationalCosts && (
        <Box mt={2} mb={2}>
          <Typography variant="body2" gutterBottom>
            {middlePoint === 0 ? (
              'Elektromobil začne hned od začátku vycházet cenově lépe'
            ) : (
              <>
                Elektromobil začne cenově vycházet lépe po{' '}
                <b>
                  {middlePoint} {formatYear(middlePoint)}
                </b>
                .
              </>
            )}
          </Typography>
        </Box>
      )}

      {props.values.compareCarbonFootprint && (
        <>
          <Title>
            Produkce CO<sub>2</sub>
          </Title>

          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <LineChart
                width={730}
                height={250}
                data={dataCarbonFootprint.slice(0, 11)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={tick => tick.toLocaleString()} />
                <Tooltip
                  content={payload => <ContentCarbonTooltip {...payload} />}
                  formatter={value => `${value.toLocaleString()} K`}
                />
                <Legend />
                <Line type="monotone" dataKey="Spalovací automobil" stroke={red[500]} />
                <Line type="monotone" dataKey="Elektromobil" stroke={green[500]} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Box mt={2} mb={2}>
            {middlePointCarbon !== -1 && (
              <Typography variant="body2" gutterBottom>
                Elektromobil začne produkovat menší uhlíkovou stopu po{' '}
                <b>
                  {middlePointCarbon} {formatYear(middlePointCarbon)}
                </b>
                .
              </Typography>
            )}
          </Box>
        </>
      )}
      <Typography variant="body1" gutterBottom>
        Výpočet je orientační a může se lišit{' '}
        <Button size="small" variant="outlined" onClick={handleClickShowCalc}>
          o výpočtu
        </Button>
      </Typography>
      <Typography variant="body1" gutterBottom className={classes.moreInfoButton}>
        <Button size="small" variant="outlined" onClick={handleClickShowMore}>
          Doporučené kanálý pro více informací.
        </Button>
      </Typography>
      <Typography variant="body1">
        <Button
          size="small"
          disabled={loader}
          color="primary"
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleClickShare}>
          {loader ? 'Zpracovávání' : 'Sdílet konfiguraci'}
        </Button>
      </Typography>
      <CalcInfoDialog open={showCalcInfoDialog} onClose={handleCloseShowCalc} values={props.values} renderCo2Info={props.renderCo2Info} />
      <MoreInformationDialog open={showMoreInfoDialog} onClose={handleCloseShowMore} />
      <ShareLinkDialog open={shareUrl} url={shareUrl} onClose={() => setShareUrl(false)} />
    </div>
  )
}

Charts.propTypes = {
  values: PropTypes.object.isRequired,
  versionConfig: PropTypes.object.isRequired,
  infoComponent: PropTypes.any,
  renderCo2Info: PropTypes.func.isRequired
}

export default React.memo(Charts)
