import AverageComp from "./averagecomp";
import { Rating } from "./averagecomp";

interface PressureFeatureProps {
  label: string;
  value: string | number;
  bgColor: string;
  rating: Rating;
}

const PressureFeature: React.FC<PressureFeatureProps> = ({
  label,
  value,
  bgColor,
  rating,
}) => {
  return (
    <article className="flex flex-col gap-2">
      <h1 className="flex items-center text-sm font-bold gap-1">
        <span
          style={{ backgroundColor: bgColor }}
          className="h-[14px] w-[14px] rounded-full border border-white inline-block"
        ></span>
        {label}
      </h1>
      <p className="text-xl font-bold">{value}</p>
      <AverageComp rating={rating} />
    </article>
  );
};

export default PressureFeature;