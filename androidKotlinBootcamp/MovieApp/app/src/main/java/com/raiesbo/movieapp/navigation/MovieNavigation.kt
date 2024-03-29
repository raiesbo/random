package com.raiesbo.movieapp.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.raiesbo.movieapp.screens.details.DetailsScreen
import com.raiesbo.movieapp.screens.home.HomeScreen

@Composable
fun MovieNavigation() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = MovieScreens.HomeScreen.name) {
        composable(MovieScreens.HomeScreen.name) {
            // Here we pass where this should lead us to
            HomeScreen(navController = navController)
        }
        composable(
            route = MovieScreens.DetailsScreen.name+"/{movieId}",
            arguments = listOf(navArgument(name = "movieId"){type = NavType.StringType})
        ) { backStackEntry ->
            DetailsScreen(
                navController = navController,
                movieId = backStackEntry.arguments?.getString("movieId")
            )
        }
    }
}
