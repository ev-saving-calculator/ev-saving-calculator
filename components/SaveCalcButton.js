import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 380
  },
  media: {
    height: 140
  }
})

export default function SaveCalcButton() {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => (location.href = 'kalkulacka-uspor')}>
        <CardMedia className={classes.media} image="calc_preview.png" title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Kalkulačka úspor elektromobilu
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Porovnání nákladu na elektromobil ve srovnání s automobilem se spalovacím motorem
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
