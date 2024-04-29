import MiningInfoCards from "./MiningInfoCards";
import MiningDevices from "./MiningDevices";

const MiningPage = () => {
    return (
      <div id="mining-page" className="flex flex-col grow size-full text-black">
        <div className="size-full p-10 overflow-y-auto">
          <MiningInfoCards />
          <MiningDevices />
        </div>
      </div>
    );
  };
  
  export default MiningPage;