import { Link } from "react-router-dom";
import Search from "./Search";
import imageContent1 from './icon-98e2ff09.svg';
import imageContent2 from './heart-9fc34c01.svg';

function Header() {
  const handleChange = () =>{

  }
  return (
    <nav className="py-6 font-ubuntu bg-[#515151]">
      <div className="container mx-auto items-center justify-around md:flex md:flex-wrap">
        <Link to="/">
          <div className="flex justify-center w-full items-center lg:w-14">
            <img
              className="w-10 h-10 mr-3"
              src={imageContent1}
            />
            <span className="self-center text-2xl text-white font-bold whitespace-nowrap">
              Charity Finder
            </span>
          </div>
          </Link>
        <Search  handleChange={handleChange}/>
        <div className="flex mt-6 justify-center md:my-auto">
          <Link to="/favorites">
            <button
              type="button"
              className="space-x-2 items-center border-0 rounded-full p-3 bg-white hover:bg-[#E2E2E2] duration-300"
            >
              <div>
                <img src={imageContent2} className="w-5 h-5" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
