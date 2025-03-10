import Image, { StaticImageData } from "next/image";
import AverageComp, { Rating } from "./averagecomp";

interface FeaturedStatProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  background: string;
  title: string;
  value: number;
  unit: string;
  minNormal: number; 
  maxNormal: number;  
}

export default function FeaturedStat({
  imageSrc,
  imageAlt,
  title,
  value,
  unit,
  minNormal, 
  maxNormal, 
  background,
}: FeaturedStatProps) {

  const getRating = (): Rating => {
    if (value < minNormal) return Rating.Below;
    if (value > maxNormal) return Rating.Above;
    return Rating.Normal;  
  };

  return (
      <article 
        style={{ backgroundColor: background }}
        className="flex md:flex-col justify-between items-center w-[100%] h-[100%] rounded-md 2xl:py-4 xl:gap-0 md:gap-1 md:py-0 py-2"
      >
      <div className="flex flex-col items-center md:w-full w-1/3">
        <figure className="md:p-3 p-2 2xl:scale-110 md:scale-100 scale-90">
          <Image
            src={imageSrc}
            height={60}
            width={60}
            alt={imageAlt}
          />
        </figure>
        <h1 className="md:text-lg text-sm px-3">{title}</h1>
      </div>

      <h2 className="md:text-xl text-lg font-extrabold md:w-full  w-1/3 text-center">
        {value + " " + unit}
      </h2>

      <section className=" md:w-full w-1/3 flex md:justify-center justify-end md:pb-4 pr-4">
        <AverageComp rating={getRating()} />
      </section>
    </article>
  )
}