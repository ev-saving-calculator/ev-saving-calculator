import React from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import makeStyles from '@material-ui/core/styles/makeStyles'
import grey from '@material-ui/core/colors/grey'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  tableContainer: {
    backgroundColor: grey[100],
    whiteSpace: 'nowrap'
  }
}))

const PriceTable = props => {
  const classes = useStyles()
  const summary = props.items.reduce((acc, item) => acc + item.price, 0)
  return (
    <TableContainer>
      <Table maxWidth size="small" aria-label="a dense table" className={classes.tableContainer}>
        <TableHead>
          <TableRow>
            <TableCell>Název</TableCell>
            <TableCell align="right">Cena</TableCell>
            <TableCell align="right">Cyklů</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {Math.round(row.price).toLocaleString()} {props.priceUnit}
              </TableCell>
              <TableCell align="right">{row.cycles || '-'}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <b>Celkem</b>
            </TableCell>
            <TableCell align="right">
              <b>
                {Math.round(summary).toLocaleString()} {props.priceUnit}
              </b>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

PriceTable.propTypes = {
  items: PropTypes.bool.isRequired,
  priceUnit: PropTypes.string.isRequired
}

export default PriceTable
