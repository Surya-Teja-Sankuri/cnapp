import { useState } from "react";
import Post from "../components/Postpart";

import Header from "../components/headerPart";

export default function Explorescreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    setSearchFilter(text);
  };

  return (
    <>
      <Header onSearch={handleSearch} setSearchFilter={setSearchFilter} />
      <Post navigation={navigation} searchFilter={searchFilter} />
    </>
  );
}