import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Title from './Title'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Field } from 'formik'
import { Checkbox } from 'formik-material-ui'
import CheckboxMaterial from '@material-ui/core/Checkbox'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  regionInfo: {
    marginTop: -theme.spacing(1)
  }
}))

const BasicForm = props => {
  const { values, handleChange, handleBlur } = props
  const classes = useStyles()
  return (
    <>
      <Grid item>
        <p>
          Orientační kalkulačka pro porovnání nákladu na nákup a provoz <b>elektromobilu</b> a auta se <b>spalovacím motorem</b> v podmínkách České republiky.
          Kalkulačka zatím nedokáže počítat s vozy, které mají hybridní pohon.
        </p>
      </Grid>
      <Grid item>
        <Title>Zákadní údaje</Title>
      </Grid>
      <Grid item>
        <div className={classes.regionInfo}>{props.renderRegionInfo()}</div>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Field disabled={false} name="compareCarbonFootprint" color="primary" component={Checkbox} />}
          label="Porovnat uhlíkovou stopu (orientační)"
        />
        <FormControlLabel
          control={<Field disabled={false} name="company" color="primary" component={Checkbox} />}
          label="Nakupuji na firmu"
        />
        {values.company && (
          <FormControlLabel
            control={
              <CheckboxMaterial
                checked={values.vat}
                name="vat"
                color="primary"
                size="large"
                onChange={e => {
                  handleChange(e)
                }}
                onBlur={handleBlur}
              />
            }
            label="Ceny s DPH"
          />
        )}
      </Grid>
    </>
  )
}

BasicForm.propTypes = {
  renderRegionInfo: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired
}

export default BasicForm
