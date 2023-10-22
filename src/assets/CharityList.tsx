import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import locationPic from "./location-846b6e1a.svg";
interface SearchBarInputProps {
  value: string;
}

interface jsonOutput {
  name: string;
  description: string;
  logoUrl: string;
  location: string;
  coverImageUrl: string;
  tags: [string];
  matchedTerms: [string];
  ein:string;
}

function CharityList(cause: SearchBarInputProps) {
  const [data, setData] = useState([]);
  const fetchSearch = async () => {
    // console.log("fetchCause", cause.value);

    try {
        
      const response = await fetch(
        `https://partners.every.org/v0.2/search/${cause.value}?apiKey=pk_live_974553a80624e25e5daac17280b11aa0`
      );
      const json = await response.json();
      // console.log(json.nonprofits);
      setData(json.nonprofits);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Page Not Found 404: ${error}`);
      }
    }
  };
  
  useEffect(() => {
    
    fetchSearch();
  },[cause]);
  return (
    <>
      <div className="px-4 mt-5 grid justify-items-center grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-3 md:px-20">
        {data.map((data: jsonOutput,i) => {
          return (
            
              <Link to={"/charity/" + data.name}key={i} className="mt-5 px-5 py-5 w-full rounded-md bg-white shadow-lg hover:bg-[#FBFBFB]">
                  <span className="flex items-center text-lg font-semibold">
                    <img className="mr-3 rounded-full" src={data.logoUrl} />
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
            
          );
        })}
      </div>
    </>
  );
}

export default CharityList;
