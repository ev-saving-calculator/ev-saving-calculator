import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Field, FieldArray } from 'formik'
import { TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  serviceInput: {
    width: 150
  },
  serviceInputSmall: {
    width: 130
  },
  input: {
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0
    }
  },
  removeButton: {
    width: 42,
    height: 42,
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: 30
    }
  },
  checkbox: {
    [theme.breakpoints.down('xs')]: {
      padding: 4
    }
  }
}))

const ServiceItemsForm = ({ values, priceUnit, id }) => {
  const classes = useStyles()
  return (
    <FieldArray
      name={id}
      render={arrayHelpers => (
        <>
          {values[id].map((serviceItem, index) => (
            <Grid container item spacing={1} key={serviceItem.id} direction="row" alignItems="center">
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => {
                    arrayHelpers.remove(index)
                  }}
                  aria-label="delete"
                  className={classes.removeButton}
                  size="small">
                  <ClearIcon />
                </IconButton>
              </Grid>
              <Grid item container sm spacing={1}>
                <Grid item>
                  <Field
                    size="small"
                    disabled={false}
                    className={classes.serviceInput}
                    name={`${id}.${index}.name`}
                    label="Název"
                    variant={'outlined'}
                    component={TextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    size="small"
                    disabled={false}
                    className={classes.serviceInputSmall}
                    name={`${id}.${index}.price`}
                    label="Cena"
                    type="number"
                    variant={'outlined'}
                    component={TextField}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">{priceUnit}</InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    size="small"
                    disabled={false}
                    className={classes.serviceInputSmall}
                    name={`${id}.${index}.distance`}
                    label="Po ujetí"
                    type="number"
                    variant={'outlined'}
                    component={TextField}
                    inputProps={{
                      min: 1
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">km</InputAdornment>,
                      classes: {
                        root: classes.input
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    size="small"
                    disabled={false}
                    className={classes.serviceInput}
                    name={`${id}.${index}.period`}
                    label="Po uplynutí"
                    type="number"
                    variant={'outlined'}
                    component={TextField}
                    inputProps={{
                      min: 1
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">let</InputAdornment>,
                      classes: {
                        root: classes.input
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              size="small"
              variant="outlined"
              onClick={() => arrayHelpers.push({ price: 0, distance: 0, name: 0, time: 0 })}>
              Přidat další položku
            </Button>
          </Grid>
        </>
      )}
    />
  )
}

ServiceItemsForm.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  priceUnit: PropTypes.string.isRequired
}

export default ServiceItemsForm
