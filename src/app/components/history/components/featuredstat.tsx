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
      className="flex flex-col items-center justify-center w-[100%] h-[100%] rounded-md xl:gap-0 gap-1 md:mb-0 mb-4"
    >
      <figure className="p-3 md:scale-100 scale-90">
        <Image
          src={imageSrc}
          height={60}
          width={60}
          alt={imageAlt}
        />
      </figure>
      <h1 className="md:text-lg text-sm px-3">{title}</h1>
      <h2 className="md:text-xl text-sm font-extrabold">{value + " " + unit}</h2>
      <section className=" pb-4">
        <AverageComp rating={getRating()} />
      </section>
    </article>
  );
}