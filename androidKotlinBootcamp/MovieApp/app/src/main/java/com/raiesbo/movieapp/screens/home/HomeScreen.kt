package com.raiesbo.movieapp.screens.home

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.raiesbo.movieapp.model.Movie
import com.raiesbo.movieapp.model.getMovies
import com.raiesbo.movieapp.navigation.MovieScreens
import com.raiesbo.movieapp.widgets.MovieRow

@Composable
fun HomeScreen(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(backgroundColor = Color.LightGray, elevation = 5.dp) {
                Text(text = "Movies")
            }
        }
    ) {
        MainContent(navController = navController)
    }
}

@Composable
fun MainContent(
    navController: NavController,
    movieList: List<Movie> = getMovies()
) {
    Column(modifier = Modifier.padding(12.dp)) {
        LazyColumn(content = {
            items(items = movieList) {
                MovieRow(movie = it) { movieId ->
                    navController.navigate(route = "${MovieScreens.DetailsScreen.name}/${movieId}")
                    // Log.d("movie", "MainContent: $movie")
                }
            }
        })
    }
}

