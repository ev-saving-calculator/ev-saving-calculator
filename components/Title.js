import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import cn from 'classnames'

const useStyles = makeStyles(theme => ({
  title: {
    borderBottom: '1px solid'
  }
}))

const Title = ({ children, className }) => {
  const classes = useStyles()
  return (
    <Typography gutterBottom variant="h6" component="h2" className={cn(classes.title, className)}>
      {children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Title
