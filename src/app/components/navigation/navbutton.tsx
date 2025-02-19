'use client'
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface NavButtonProps {
    item: string;
    icon: StaticImageData;
    path: string;
  }

export default function NavButton ({item, icon, path}: NavButtonProps) {
    const pathname = usePathname()

    return (
        <Link 
            href={path}
            className={`flex items-center gap-2 ${pathname === path && item === "Patients"?  "bg-active1":"hover:bg-active2"} transition-all duration-300 h-[41px] px-3 rounded-full text-sm font-bold`}
        >
            <Image 
                src={icon}
                height={17}
                alt={`${item} icon`}
            />
            {item}
        </Link>
    )
}