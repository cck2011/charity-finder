import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import locationPic from "./location-846b6e1a.svg";
interface Nonprofit {
  name: string;
  description: string;
  logoUrl: string;
  location: string;
  coverImageUrl: string;
  tags: [string];
  matchedTerms: [string];
  ein: string;
  profileUrl: string;
}

function FavoriteCharities() {
  const [storedDataLength, setStoredDataLength] = useState(0);
  const [FavouriteList, setFavouriteList] = useState<Nonprofit[]>([]); // Specify the type of FavouriteList

  const checkLocalStorage = () => {
    const storedItemsJson = localStorage.getItem("items");
    if (storedItemsJson) {
      const parsedItems = JSON.parse(storedItemsJson);
      setStoredDataLength(parsedItems.length);
      fetchDetail(parsedItems);
    }
  };

  const fetchDetail = async (items: string[]) => {
    let detailFavourite: Nonprofit[] = [];
    for (let i = 0; i < items.length; i++) {
      try {
        const response = await axios.get( // Use axios for making the request
          `https://partners.every.org/v0.2/search/${items[i]}?apiKey=pk_live_974553a80624e25e5daac17280b11aa0`
        );
        const nonprofit = response.data.nonprofits[0];
        if (nonprofit) {
          detailFavourite.push(nonprofit);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Page Not Found 404: ${error}`);
        }
      }
    }
    setFavouriteList(detailFavourite);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl pt-10 pl-6 tracking-wide font-semibold text-gray-800">
          Favorite
        </h1>
        <div className="flex items-center my-10">
          <div className="w-full px-4 grid grid-cols-1 gap-10 sm:grid-cols-1 lg:grid-cols-3">
            {storedDataLength > 0 ? (
              FavouriteList.map((data, i) => (
                <Link to={"/charity/"+data.name}
                  className="px-5 py-5 w-full rounded-md bg-white shadow-lg hover:bg-[#FBFBFB]"
                  key={i}
                >
                  <span className="flex items-center text-lg font-semibold">
                    <img
                      className="mr-3 rounded-full"
                      src={data.logoUrl}
                    />
                    {data.name}
                  </span>
                  <div className="w-full my-3 border-b border-gray-300"></div>
                  <span className="flex items-center">
                    <img
                      className="mr-2 w-5 h-5"
                      src={locationPic}
                    />
                    <div>{data.location}</div>
                  </span>
                </Link>
              ))
            ) : (
              <span className="text-xl font-semibold text-gray-400">
                No Favorites Yet
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteCharities;
