import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  title: {
    borderBottom: '1px solid'
  }
}))

const Title = ({ children }) => {
  const classes = useStyles()
  return (
    <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
      {children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}

export default Title
