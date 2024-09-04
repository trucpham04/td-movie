import { OMDB_API_KEY } from "@/constants/index-constant";
import axios from "axios";

export function useOMDB() {
  return { fetchOMDB };
}

async function fetchOMDB(imdbID) {
  let result;

  try {
    const baseURL =
      process.env.NODE_ENV === "production"
        ? "https://www.omdbapi.com/"
        : "/omdbAPI/";

    const response = await axios.get(baseURL, {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbID,
      },
    });

    // console.log(response);

    result = response.data;

    return result;
  } catch (err) {
    console.log(err);
  }

  return result;
}
