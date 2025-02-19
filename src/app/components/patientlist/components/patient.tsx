import Image, { StaticImageData } from "next/image";
import MoreIcon from "../assets/dotsicon.svg"

interface PatientProps {
    photo: string | StaticImageData;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    selected: number;
    id: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    setShowPatientList: React.Dispatch<React.SetStateAction<boolean>>;
  }


export default function Patient({ photo, firstName, lastName, gender, age, selected, setSelected, setShowPatientList, id }: PatientProps) {

    function handleClick({ id }: { id: number }) {
        setSelected(id);
        setShowPatientList(false);
    }

    return (
        <article 
            className={`text-sm flex gap-3 h-[80px] items-center  cursor-pointer p-6 ${selected === id ? 'bg-active2':'hover:bg-active1 hover:scale-105 active:scale-110'} transition-all`}
            onClick={() => handleClick({ id })}
        >
            <Image 
                priority
                src={photo}
                height={44}
                width={44}
                alt="Patient's photo"
                className="rounded-full object-cover" 
            />

            <div>
                <header className="font-bold">{firstName + " " + lastName} </header>
                <p className="font-light capitalize">{gender + ", " + age}</p>
            </div>

            <button className="ml-auto">
                <Image 
                    src={MoreIcon}
                    alt="Three Dots"
                    width={18}
                />
            </button>
        </article>
    )
}