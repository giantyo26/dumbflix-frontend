
import { Link } from "react-router-dom"
import ImageWitcher from "../assets/image/hero-witcher.webp"
import TitleWitcher from "../assets/image/title-witcher.png"

export default function Hero() {
    return (
        // Hero section
        <div className='relative'>
            <img src={ImageWitcher} className="object-cover w-full h-[600px]" alt="The Witcher Cover"/>
            <div className='hero-image bg-black'>
            
                <div className="hero-text absolute top-40 left-[100px]">
                <img src={TitleWitcher} alt="The Witcher Title"/>
                    <p className="text-xl mt-4 ml-3 ">Geralt of Rivia, a solitary monster hunter, struggles to find his place in<br></br>
                        a world where people often prove more wicked than beast</p>
                    <div className="hero-text-info flex gap-2 mb-7 mt-4 ml-3">
                        <p className="text-lg ">2019</p>
                        <p className="border border-1 px-2 rounded-md">TV Series</p>
                    </div>
                    <Link to={"series-detail/2"}>
                    <button className="mt-1 bg-darkRed hover:bg-blue-700 text-white font-bold py-4 px-10 ml-3 rounded" href="">WATCH NOW!</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}