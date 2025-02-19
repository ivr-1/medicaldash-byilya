import arrowDown from "../assets/ArrowDown.svg";
import Image from "next/image";

export enum Rating {
  Above = "above",
  Below = "below",
  Normal = "normal",
}

interface AverageCompProps {
  rating: Rating; 
}

export default function AverageComp({ rating }: AverageCompProps) {
  const style = "flex items-center gap-2 lg:text-sm text-[11px]";

  const arrow = (
    <Image
      src={arrowDown}
      height={5}
      alt="arrow icon"
      className={rating === Rating.Above ? "rotate-180" : ""}
    />
  );
  
  const content = {
    [Rating.Above]: <p className={style}>{arrow} Above Average</p>,
    [Rating.Below]: <p className={style}>{arrow} Below Average</p>,
    [Rating.Normal]: <p className={style}>Normal</p>,
  }[rating];

  return <>{content}</>;
}