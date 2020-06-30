import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Field, FieldArray } from 'formik'
import { Checkbox, TextField } from 'formik-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  serviceInput: {
    width: 150,
    [theme.breakpoints.down('xs')]: {
      width: 130
    }
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

const ServiceItemsForm = ({ values, priceUnit, items, id, customId }) => {
  const classes = useStyles()
  return (
    <>
      {items
        .filter(i => !i.show || i.show(values))
        .map(serviceItem => (
          <Grid container item spacing={1} key={serviceItem.id}>
            <Grid item>
              <Field
                disabled={false}
                name={`${id}.${serviceItem.id}.active`}
                color="primary"
                component={Checkbox}
                className={classes.checkbox}
              />
            </Grid>
            <Grid item>
              <Field
                size="small"
                disabled={false}
                className={classes.serviceInput}
                name={`${id}.${serviceItem.id}.distance`}
                label={serviceItem.label}
                type="number"
                variant={'outlined'}
                component={TextField}
                inputProps={{
                  min: 1,
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
                name={`${id}.${serviceItem.id}.price`}
                label="Cena"
                type="number"
                variant={'outlined'}
                component={TextField}
                InputProps={{
                  endAdornment: <InputAdornment position="start">{priceUnit}</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        ))}
      <>
        <FieldArray
          name={customId}
          render={arrayHelpers => (
            <>
              {values[customId].map((serviceItem, index) => (
                <Grid container item spacing={1} key={serviceItem.id}>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        arrayHelpers.remove(index)
                      }}
                      aria-label="delete"
                      className={classes.removeButton}
                      size="small">
                      <ClearIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Field
                      size="small"
                      disabled={false}
                      className={classes.serviceInput}
                      name={`${customId}.${index}.distance`}
                      label="Po ujetí"
                      type="number"
                      variant={'outlined'}
                      component={TextField}
                      inputProps={{
                        min: 1
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">km</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      size="small"
                      disabled={false}
                      className={classes.serviceInput}
                      name={`${customId}.${index}.price`}
                      label="Cena"
                      type="number"
                      variant={'outlined'}
                      component={TextField}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">{priceUnit}</InputAdornment>
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item>
                <Button startIcon={<AddIcon/>} size="small" variant="outlined" onClick={() => arrayHelpers.push({ price: 0, distance: 0 })}>
                  Přidat další položku
                </Button>
              </Grid>
            </>
          )}
        />
      </>
    </>
  )
}

ServiceItemsForm.propTypes = {
  id: PropTypes.string.isRequired,
  customId: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  priceUnit: PropTypes.string.isRequired
}

export default ServiceItemsForm
