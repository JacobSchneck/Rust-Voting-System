import type { NextPage } from 'next'
import { Container, makeStyles } from '@material-ui/core'
import BallotCard from '../components/BallotCard'

const useStyles = makeStyles((theme) => {
  return {
    toolbar: theme.mixins.toolbar,
  }
});

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.toolbar}></div>
      {/* <BallotCard /> */}
      <BallotCard />

    </Container>
  )
}

export default Home
