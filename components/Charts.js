import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
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
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import PriceDetailDialog from './PriceDetailDialog'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import AreaChart from 'recharts/lib/chart/AreaChart'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'
import Area from 'recharts/lib/cartesian/Area'
import Line from 'recharts/lib/cartesian/Line'
import LineChart from 'recharts/lib/chart/LineChart'

const ContentPriceTooltipClassic = props => {
  const { payload, priceUnit } = props
  if (!payload || payload.length === 0) {
    return null
  }
  return (
    <Paper>
      <Box p={1}>
        {payload.map(item => (
          <Box key={item.dataKey} color={item.stroke}>
            <Typography display="block" variant="p">
              {item.name}: {item.value.toLocaleString()} {priceUnit}
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

ContentPriceTooltipClassic.propTypes = {
  payload: PropTypes.array.isRequired,
  priceUnit: PropTypes.string.isRequired
}

const ContentPriceTooltipLayer = props => {
  const { payload, priceUnit } = props
  if (!payload || payload.length === 0) {
    return null
  }
  return (
    <Paper>
      <Box p={1}>
        {payload.map(item => (
          <Box key={item.dataKey} color={item.stroke}>
            <Typography display="block" variant="p">
              {item.name}: {(item.value[1] - item.value[0]).toLocaleString()} {priceUnit}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

ContentPriceTooltipLayer.propTypes = {
  payload: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
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
  },
  chartTypeSelect: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1)
    }
  }
}))

const Charts = props => {
  const classes = useStyles()
  const [shareUrl, setShareUrl] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loader, setLoader] = useState(false)
  const CalcInfoDialog = props.infoComponent
  const [operationalCosts, setOperationalCosts] = useState(false)
  const [chartType, setChartType] = useState('classic')
  const [showMoreInfoDialog, setShowMoreInfoDialog] = useState(false)
  const [showCalcInfoDialog, setShowCalInfoDialog] = useState(false)

  const handleClickShowMore = () => setShowMoreInfoDialog(true)
  const handleCloseShowMore = () => setShowMoreInfoDialog(false)

  const handleClickShowCalc = () => setShowCalInfoDialog(true)
  const handleCloseShowCalc = () => setShowCalInfoDialog(false)

  const handleChangeOperationCosts = e => setOperationalCosts(e.target.checked)
  const handleChangeChartType = e => setChartType(e.target.value)

  const handleClosePriceDialog = () => setDetail(false)

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
      const commonCar = getTotalCostCommon(props.versionConfig, props.values, operationalCosts, i)
      const electricCar = getTotalCostElectric(props.versionConfig, props.values, operationalCosts, i)
      result.push({
        name: `${i}. rok`,
        commonCar,
        electricCar,
        commonCarComplete: commonCar.complete,
        electricCarComplete: electricCar.complete,
        range: getYearRange(props.values) * i,
        commonCarPrice: [0, commonCar.carPrice],
        commonCarFuel: [commonCar.carPrice, commonCar.carPrice + commonCar.fuel],
        commonCarService: [
          commonCar.carPrice + commonCar.fuel,
          commonCar.carPrice + commonCar.fuel + commonCar.service
        ],
        commonCarOthers: [
          commonCar.carPrice + commonCar.fuel + commonCar.service,
          commonCar.carPrice + commonCar.fuel + commonCar.service + commonCar.others
        ],
        electricCarPrice: [0, electricCar.carPrice],
        electricCarElectric: [electricCar.carPrice, electricCar.carPrice + electricCar.electric],
        electricCarService: [
          electricCar.carPrice + electricCar.electric,
          electricCar.carPrice + electricCar.electric + electricCar.service
        ],
        allItemsElectric: electricCar.allItems,
        allItemsCommon: commonCar.allItems
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
        commonCar: Math.round(getCarbonFootprintCommon(props.values, range)),
        electricCar: Math.round(getCarbonFootprintElectricWithBattery(props.versionConfig, props.values, range)),
        range
      })
    }
    return result
  }, [operationalCosts, props.values])

  const middlePoint = data.findIndex(i => i.electricCarComplete - i.commonCarComplete < 0)
  const middlePointCarbon = dataCarbonFootprint.findIndex(i => i.electricCar - i.commonCar < 0)

  const handleOpenPriceDialog = () => {
    setDetail(data[10].allItemsElectric)
  }

  const chartParams = {
    width: 730,
    height: 250,
    data: data.slice(0, 11),
    margin: { top: 5, right: 30, left: 20, bottom: 5 }
  }

  return (
    <div>
      <Title>Náklady</Title>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={operationalCosts} color="primary" onChange={handleChangeOperationCosts} />}
            label="Pouze náklady na provoz"
          />
        </Grid>
        <Grid item xs>
          <Select value={chartType} onChange={handleChangeChartType} className={classes.chartTypeSelect}>
            <MenuItem value="classic">Porovnání</MenuItem>
            <MenuItem value="layersElectric">Detail - Elektrický vůz (EV)</MenuItem>
            <MenuItem value="layersCommon">Detail - Spalovací vůz (ICE)</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button variant="outlined" size="small" onClick={handleOpenPriceDialog}>
            Detail
          </Button>
        </Grid>
      </Grid>

      <div style={{ height: 240 }}>
        {chartType === 'classic' && (
          <ResponsiveContainer>
            <LineChart {...chartParams}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={tick => tick.toLocaleString()} />
              <Tooltip
                content={payload => (
                  <ContentPriceTooltipClassic {...payload} priceUnit={props.versionConfig.priceUnit} />
                )}
              />
              <Legend />
              <Line type="monotone" dataKey="commonCarComplete" name="Spalovací automobil" stroke={red[500]} />
              <Line type="monotone" dataKey="electricCarComplete" name="Elektromobil" stroke={green[500]} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'layersElectric' && (
          <ResponsiveContainer>
            <AreaChart {...chartParams}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={tick => tick.toLocaleString()} />
              <Tooltip
                content={payload => (
                  <ContentPriceTooltipLayer {...payload} type="electric" priceUnit={props.versionConfig.priceUnit} />
                )}
              />
              <Legend />
              <Area type="monotone" dataKey="electricCarService" name="Servis" stroke="#c51162" fill="#c51162" />
              <Area type="monotone" dataKey="electricCarElectric" name="Nabíjení" stroke="#4527a0" fill="#4527a0" />
              {!operationalCosts && (
                <Area
                  type="monotone"
                  dataKey="electricCarPrice"
                  name="Pořizovací cena"
                  stroke="#006064"
                  fill="#006064"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
        {chartType === 'layersCommon' && (
          <ResponsiveContainer>
            <AreaChart {...chartParams}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={tick => tick.toLocaleString()} />
              <Tooltip
                content={payload => (
                  <ContentPriceTooltipLayer {...payload} type="common" priceUnit={props.versionConfig.priceUnit} />
                )}
              />
              <Legend />

              <Area
                type="monotone"
                dataKey="commonCarOthers"
                name="Silniční daň, dálniční známka, parkování"
                stroke="#ff9100"
                fill="#ff9100"
              />
              <Area type="monotone" dataKey="commonCarService" name="Servis" stroke="#c51162" fill="#c51162" />
              <Area type="monotone" dataKey="commonCarFuel" name="Palivo" stroke="#4527a0" fill="#4527a0" />
              {!operationalCosts && (
                <Area type="monotone" dataKey="commonCarPrice" name="Pořizovací cena" stroke="#006064" fill="#006064" />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
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
                <Tooltip content={payload => <ContentCarbonTooltip {...payload} />} />
                <Legend />
                <Line type="monotone" dataKey="commonCar" name="Spalovací automobil" stroke={red[500]} />
                <Line type="monotone" dataKey="electricCar" name="Elektromobil" stroke={green[500]} />
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
      <CalcInfoDialog
        open={showCalcInfoDialog}
        onClose={handleCloseShowCalc}
        values={props.values}
        renderCo2Info={props.renderCo2Info}
      />
      <MoreInformationDialog open={showMoreInfoDialog} onClose={handleCloseShowMore} />
      <ShareLinkDialog open={shareUrl} url={shareUrl} onClose={() => setShareUrl(false)} />
      <PriceDetailDialog
        data={data}
        onClose={handleClosePriceDialog}
        open={detail}
        priceUnit={props.versionConfig.priceUnit}
      />
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
