import Image from "next/image";
import { StaticImageData } from "next/image";

interface PatientItemProps {
  h2: string;
  icon: StaticImageData;
  p: string;
}

export default function PatientItem({ h2, icon, p }: PatientItemProps) {
  return (
    <div className="flex items-center gap-2 px-6">
      <Image src={icon} height={42} width={42} alt={h2} />
      <section className="text-sm">
        <h2>{h2}</h2>
        <p className="font-bold">{p}</p>
      </section>
    </div>
  );
}