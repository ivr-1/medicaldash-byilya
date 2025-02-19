'use client'
import Image, { StaticImageData } from "next/image";
import CogIcon from "./assets/navicons/profile_cog.svg"
import MoreIcon from "./assets/navicons/profile_dots.svg"

interface DocProfileProps {
    photo: StaticImageData;
    firstName: string;
    lastName: string;
    profile: string;
  }

export default function DocProfile ({photo, firstName, lastName, profile}: DocProfileProps) {

    return (
        <article className="flex items-center gap-2">
            <Image 
                src={photo}
                height={44}
                width={44}
                alt="Doctor's photo"
            />
            <article className="text-sm">
                <header className="font-bold">Dr. {firstName + " " + lastName} </header>
                <p className="font-light">{profile}</p>
            </article>
            <div className="bg-[#EDEDED] w-[1px] h-10"></div>
            <nav className="flex gap-3">
                <button className="hover:scale-110 transition-all">
                    <Image 
                        src={CogIcon}
                        alt="Cog"
                        height={20}
                    />
                </button>
                <button>
                    <Image 
                        src={MoreIcon}
                        alt="Three Dots"
                        height={20}
                    />
                </button>
            </nav>

        </article>
    )
}