import eeLogo from "./media/eeLogo.png"
import eologo from "./media/eologo.png"
import dodLogo from "./media/dologo.png"

const Track = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full h-40 rounded-xl m-4">
            <div className="text-xl font-bold text-center uppercase">Projects We've Worked on:</div>
        <div className="flex flex-row justify-center items-center w-full rounded-xl p-2 m-2 gap-4">
        <a href="https://ethernalelves.com/" target="_blank">    
        <img src={eeLogo} className="bg-white p-4 h-28" />
        </a>
        <a href="https://etherorcs.com/" target="_blank">
        <img src={eologo} className="bg-gray-400 p-4 h-20 rounded-lg" />
        </a>
        <a href="https://dogewoodnft.com/" target="_blank">
        <img src={dodLogo} className="bg-black p-4 h-20 rounded-lg" />
        </a>
        </div>
        </div>
    )
}

export default Track;
