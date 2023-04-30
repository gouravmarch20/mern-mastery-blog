import React, { useState } from 'react'
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import { getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
import useStyles from './styles'
// ! take all query of url
function useQuery () {
  return new URLSearchParams(useLocation().search)
}
const Home = () => {
  const classes = useStyles()
  const query = useQuery()
  // extract specefic query
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const dispatch = useDispatch()

  const [currentId, setCurrentId] = useState(0)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const history = useHistory()

  const searchPost = () => {
    console.log('without trim : ' + tags + tags)
    if (search.trim() || tags) {
      // tags.join(',') effect -> arr['vbl' , 'dixon' , 'affle'] ----> arr['vbl'  'dixon'  'affle']
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))

      //  without this also our app work : url mai display --> why we need to display -> user send url specefic filter for him
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      )

      // ! NOTE: IF user share give url --> if recevier hit this url --> still he will not able to feat it ==> not added feature to re-read from url .
    } else {
      history.push('/')
    }
  }
  // 2: area action -> btn click or press enter
  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  const handleAddChip = tag => setTags([...tags, tag])

  const handleDeleteChip = chipToDelete =>
    setTags(tags.filter(tag => tag !== chipToDelete))

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          {/* 1: post display area  */}
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* 2:  search by tags or title option  */}
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                onKeyDown={handleKeyPress}
                name='search'
                variant='outlined'
                label='Search Stock'
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={chip => handleAddChip(chip)}
                onDelete={chip => handleDeleteChip(chip)}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant='contained'
                color='primary'
              >
                Search
              </Button>
            </AppBar>

            {/* 3: if login create post option  || else Signin message */}
            <Form currentId={currentId} setCurrentId={setCurrentId} />

            {/*4:  render  this page  only if both true -->  no query given by user` ----> PAGINATION OPTION available for user  */}
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
