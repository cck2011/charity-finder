import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import locationPic from "./location-846b6e1a.svg";

interface jsonOutput {
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

function CharityDetail({}) {
  const [data, setData] = useState<[jsonOutput]>();
  const [favourite, setFavourite] = useState(false);
  let id = useParams();

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (data?.[0]) {
      let storedData = localStorage.getItem("items");
      let localArray: string[] = storedData ? JSON.parse(storedData) : [];
      let index = localArray.indexOf(data[0].name);
      if (favourite) {
        setFavourite(false);
        console.log("localArray", localArray);
        localArray.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(localArray));
      } else {
        if (index === -1) {
          localArray.push(data[0].name);
          localStorage.setItem("items", JSON.stringify(localArray));
          setFavourite(true);
        }
      }
    } else {
      // Handle the case where data is undefined
      console.error("Data is undefined");
    }
  };

  const fetchSearch = async () => {
    try {
      const response = await fetch(
        `https://partners.every.org/v0.2/search/${id.id}?apiKey=pk_live_974553a80624e25e5daac17280b11aa0`
      );
      const json = await response.json();
      console.log(json.nonprofits);
      setData(json.nonprofits);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Page Not Found 404: ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchSearch();
    let storedData = localStorage.getItem("items");
    let localArray: string[] = storedData ? JSON.parse(storedData) : [];
    console.log('id.id',id.id);
    if (id.id) {

      let index = localArray.indexOf(id.id);
      console.log('index=',index);
      if(index >= 0){
        
        setFavourite(true);
      }
    }
  }, [favourite]);
  return (
    <>
      <Header />
      {data && data.length > 0 ? (
        <div className="container justify-center mb-8 px-4 grid grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3 mt-10">
          <div className="col-span-2 rounded-md shadow-md">
            <div>
              <img className="rounded-t-lg" src={data[0].coverImageUrl} />
            </div>
            <div className="p-8">
              <h1 className="flex flex-wrap justify-center items-center text-3xl tracking-wide font-semibold text-gray-800 md:justify-normal">
                <img
                  className="mr-3 mb-3 rounded-full md:mb-0"
                  src={data[0].logoUrl}
                />
                {data[0].name}
              </h1>
              <div className="flex items-center my-6">
                <img className="mr-2 w-5 h-5" src={locationPic} />
                <div>{data[0].location}</div>
              </div>
              <div className="w-full">
                <p className="text-fit">{data[0].description}</p>
              </div>
            </div>
          </div>
          <div className="p-6 col-span-2 h-fit rounded-md shadow-md md:col-span-1">
            {favourite ? (
              <div>
                <div className="flex mb-6 justify-center font-bold ">
                  This Charity Added To Your Favorite !
                </div>
                <a>
                  <button
                    className="w-full bg-[#2D59AF] rounded-sm py-4 text-white font-bold hover:bg-[#0F3D97] duration-300"
                    onClick={buttonHandler}
                  >
                    Remove from favorites
                  </button>
                </a>
              </div>
            ) : (
              <div>
                <a>
                  <button
                    className="w-full bg-[#F14040] rounded-sm py-4 text-white font-bold hover:bg-[#D31616] duration-300"
                    onClick={buttonHandler}
                  >
                    Add to favorites
                  </button>
                </a>
              </div>
            )}
            <div className="mt-4">
              <a href={data[0].profileUrl} target="_blank">
                <button className="w-full bg-emerald-800 rounded-sm py-4 text-white font-bold hover:bg-emerald-950 duration-300">
                  Check it in Every.org
                </button>
              </a>
            </div>
            <div className="mt-2 flex flex-wrap">
              <div className="mt-6">
                <span className="font-semibold text-lg">Tag:</span>
                <div className="flex flex-wrap mt-1">
                  {data[0].tags.map((tag, i) => (
                    <a
                      className="bg-slate-500 text-white px-3 py-2 m-2 rounded-3xl shadow-md hover:bg-slate-600 duration-300"
                      href="/search/culture"
                      key={i}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default CharityDetail;
