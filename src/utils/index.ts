import { RootStackParams } from "../navigation";

export enum Screens {
    Home = "HomeScreen",
    Profile = "ProfileScreen",
    Search = "SearchScreen"
}

export const returnIconNameByScreen: Record<Screens, string> = {
    [Screens.Home]: "movie",
    [Screens.Profile]: "account",
    [Screens.Search]: "movie-search",
  };

  export const returnScreenNameByRouteName: Record<Screens, string> = {
    [Screens.Home]: "Movies",
    [Screens.Profile]: "User Profile",
    [Screens.Search]: "Search movies",
  };