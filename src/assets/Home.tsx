
import Header from "./Header";
import { useEffect, useState} from 'react';
import CharityList from './CharityList';
import topics from './type'
import backgroundImg from './background-5d85c526.jpg'
function Home() {
    
    const [cause, setCause] = useState("space");
    function getRandomInt(max:number) {
      return Math.floor(Math.random() * max);
    }
  useEffect(() => {
    let randomNum = getRandomInt(66);
    setCause(topics[randomNum])
  },[])
    
  return (
    <div>
      <Header/>
      <div className="pb-4">
        <div style={{ backgroundImage: `url(${backgroundImg})` }}

         className="flex items-center justify-center w-full h-96 bg-cover bg-center bg-[url('.\background-5d85c526.jpg')]">
          <span className="text-center font-prompt tracking-wider text-[#F7F7F7] font-bold text-2xl sm:text-5xl">
            Changing The World Through Kindness
          </span>
        </div>
      </div>
      <div className="mb-14">
        <h1 className="pt-8 text-3xl mt-2 font-semibold flex justify-center text-gray-700">You May Interest</h1>
      </div>
      <CharityList value={cause}/>
    </div>
  );
}

export default Home;
