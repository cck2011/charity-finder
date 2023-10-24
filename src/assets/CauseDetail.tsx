import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import locationPic from "./location-846b6e1a.svg"
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
export const CauseDetail = () => {
    const [data, setData] = useState<[jsonOutput]>();
    let parm = useParams();
    const fetchSearch = async () => {
        try {
          const response = await fetch(
            `https://partners.every.org/v0.2/browse/${parm.Searchid}?apiKey=pk_live_974553a80624e25e5daac17280b11aa0`
          );
          const json = await response.json();
          setData(json.nonprofits);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(`Page Not Found 404: ${error}`);
          }
        }
      };
      useEffect(() => {
        fetchSearch();
        
      }, []);
      
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl pt-10 pl-6 tracking-wide font-semibold text-gray-800">
          Search results for: {parm.Searchid}
        </h1>
        <div className="flex items-center my-10 w-full">
          <div className="grid w-full justify-items-center grid-cols-1 gap-10 px-6 sm:grid-cols-1 lg:grid-cols-3">
            {data?.map((charities:jsonOutput,i)=>(
            <Link to={"/charity/"+charities.name}
              className="mt-5 px-5 py-5 w-full rounded-md bg-white shadow-lg hover:bg-[#FBFBFB]"
              key={i}
            >
              <span className="flex items-center text-lg font-semibold">
                <img
                  className="mr-3 rounded-full"
                  src={charities.logoUrl}
                />
                {charities.name}
              </span>
              <div className="w-full my-3 border-b border-gray-300"></div>
              <span className="flex items-center">
                <img
                  className="mr-2 w-5 h-5"
                  src={locationPic}
                />
                <div>
                {charities.location}
                </div>
              </span>
            </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
