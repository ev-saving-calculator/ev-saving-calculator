import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1.2rem'
  }
}))

const SubTitle = ({ children }) => {
  const classes = useStyles()
  return (
    <Typography display={'block'} variant="subtitle1" component="h2" className={classes.title}>
      {children}
    </Typography>
  )
}

SubTitle.propTypes = {
  children: PropTypes.string.isRequired
}

export default SubTitle
