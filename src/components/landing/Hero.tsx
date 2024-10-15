import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import shogun from "../../../images/shogun.png";
import cover from "../../../images/cover.png";
import atk from "../../../images/samurai_atk.png";
import def from "../../../images/samurai_def.png";
import coin from "../../../images/samurai_coin.png";
import castle from "../../../images/castle.png";
import help from "../../../images/samurai_help.png";
import rank from "../../../images/samurai_rank.png";
import market from "../../../images/samurai_market.png";
import aptos from "../../../images/aptos.png";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    className: "center",
    centerMode: true,
    centerPadding: "30px",
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    pauseOnFocus: true,
    arrows: false,
  };
  return (
    <div>
      <section className="flex flex-col justify-center items-center mt-8 mb-4">
        <Image src={shogun} width={125} height={50} quality={100} placeholder="blur" alt="Shogun" />
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-4 text-center">
          The Rise of Empires
        </h2>
      </section>
      <Slider {...settings} className="landing-slider">
        <div>
          <Image src={cover} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={atk} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={def} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={coin} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={castle} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={help} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={rank} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
        <div>
          <Image src={market} alt="Slide" width={400} height={200} quality={100} placeholder="blur" />
        </div>
      </Slider>
      <section className="flex flex-col justify-center items-center mt-8">
        <h3 className="text-2xl font-bold text-gray-300 text-center">A Decentralized Game Built On APTOS Blockchain</h3>
        <h3 className="text-lg font-bold text-gray-300 mb-2 text-center">« LIVE ON TESTNET »</h3>
        <Link href="https://aptosfoundation.org/" target="_blank">
          <Image
            src={aptos}
            width={64}
            height={64}
            quality={100}
            placeholder="blur"
            alt="Aptos"
            className="cursor-pointer hover:scale-110 opacity-70 hover:opacity-100"
          />
        </Link>
      </section>
    </div>
  );
}
