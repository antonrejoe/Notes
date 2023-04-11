import { MeiliSearch } from "meilisearch";
import { useEffect, useState } from "react";

const client = new MeiliSearch({
  host: "https://ms-1b476e5207e5-3106.sfo.meilisearch.io",
  headers: {
    Authorization: "Bearer 7a2c4c133a8da3c2f98c99933a3641d181df63b6",
    "Content-Type": "application/json",
  },
});

client.index("movies").addDocuments({});
const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //search movie index based on search value
    client
      .index("movies")
      .search(search)
      .then((results) => {
        setMovies(results.hits);
      });
  }, [search]);

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="movies">
        {movies?.map((movie) => (
          <div className="movie" key={movie.id}>
            <div className="movie-info">
              <p>{movie.id}</p>
              <h2>{movie.name}</h2>
              <p>{movie.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
