import { Link } from "react-router-dom";
import topics from "./type";
import { useState } from "react";
import imageContent1 from "./search-0775f889.svg";

interface SearchBarInputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ handleChange }: SearchBarInputProps) {
  const [filterData, setfilterData] = useState(Array<string>);
  const [isFocus, setIsFocused] = useState(false);
  function serchBarDropType(evt: React.ChangeEvent<HTMLInputElement>) {
    const matchingTopics = topics.filter((topic) =>
      topic.startsWith(evt.target.value)
    );
    setfilterData(matchingTopics);
  }
  const hideDropDown = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };
  console.log(filterData.length);
  return (
    <div className="drop-shadow-md mt-4 px-4 md:my-auto ">
      <div
        className="relative"
        onBlur={() => {
          hideDropDown();
        }}
      >
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3.5"
        >
          <img src={imageContent1} className="w-5 h-5" />
        </button>
        <input
          type="text"
          className="px-4 py-3 border border-gray-300 rounded-md w-full
                                lg:w-[28rem]
                                hover:outline outline-1 
                                outline-[#32C8BB] focus:outline outline-offset-0"
          placeholder="Find a charity"
          onChange={(evt) => {
            handleChange(evt);
            serchBarDropType(evt);
            setIsFocused(true);
          }}
          name="searchBar"
        />

        {filterData.length === 0 || !isFocus ? (
          <></>
        ) : (
          <div className="flex flex-wrap absolute w-full h-fit bg-white border mx-auto rounded-b-lg p-2 lg:w-[28rem]">
            {filterData.slice(0, 10).map((type, i) => (
              <Link
                to={"/search/" + type}
                key={i}
                className="px-3 py-4 rounded-3xl hover:bg-slate-200 duration-300"
              >
                {type}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
