import React, { useState, useEffect } from "react";
import MeiliSearch from "meilisearch";
const meiliClient = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "7a2c4c133a8da3c2f98c99933a3641d181df63b6",
});
console.log(meiliClient);
const Search = () => {
  const [searchProompt, setSearchProompt] = useState("");
  const [dropDown, setDropDown] = useState(false);
  function Search() {
    meiliClient
      .index("movie")
      .search(searchProompt)
      .then(
        (res) => console.log(res.hits),
        (err) => console.log(err)
      );
  }
  meiliClient.index("movies").addDocuments([
    {
      id: 1,
      title: "This is pretty useless ",
      category: "masala coffee",
      poster:
        "https://miro.medium.com/v2/resize:fit:1024/0*wATbQ49jziZTyhZH.jpg",
    },
  ]);
  return (
    <>
      {dropDown ? (
        <main>
          hello <button onClick={() => setDropDown(false)}>close</button>
        </main>
      ) : (
        <>
          {" "}
          <div className="pt-2 relative mx-auto text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setSearchProompt(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-5 mr-4"
              onClick={Search}
            >
              go
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
