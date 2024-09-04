export const NAVIGATION_OPTIONS = [
  { name: "Home", icon: "home", route: { name: "Home", params: {} } },
  { name: "Explore", icon: "explore", route: { name: "Explore", params: {} } },
  { name: "Library", icon: "bookmark", route: { name: "Library", params: {} } },
  {
    name: "Settings",
    icon: "settings",
    route: { name: "Settings", params: {} },
  },
];

export const THE_MOVIE_DB_HEADER = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.VUE_APP_TMDB_ACCESS_TOKEN}`,
};

export const THE_MOVIE_DB_IMAGE_URL = "https://image.tmdb.org/t/p/";

export const OMDB_API_KEY = process.env.VUE_APP_OMDB_API_KEY;
