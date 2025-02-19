'use client'
import NavButton from "./navbutton"
import DocProfile from "./docprofile"
import Image, { StaticImageData } from "next/image"
import { useState, useEffect } from "react"

import { Menu } from "lucide-react"
import overviewIcon from "./assets/navicons/overview.svg"
import patientsIcon from "./assets/navicons/patients.svg"
import scheduleIcon from "./assets/navicons/schedule.svg"
import messageIcon from "./assets/navicons/message.svg"
import transactionIcon from "./assets/navicons/transactions.svg"
import johnPhoto from "./assets/photo_john.png"
import navLogo from "./assets/navlogo.svg"



interface NavItems {
    item: string;
    icon: StaticImageData;
    path: string;
  }
  
interface DoctorData {
    photo: StaticImageData;
    firstName: string;
    lastName: string;
    profile: string;
  }

const NavItems: NavItems[] = [
    {
        item: "Overview",
        icon: overviewIcon,
        path: '/'
    },
    {
        item: "Patients",
        icon: patientsIcon,
        path: '/'
    },
    {
        item: "Schedule",
        icon: scheduleIcon,
        path: '/'
    },
    {
        item: "Message",
        icon: messageIcon,
        path: '/'
    },
    {
        item: "Transactions",
        icon: transactionIcon,
        path: '/'
    }
  ];

const DoctorData: DoctorData ={
    photo: johnPhoto,
    firstName: "John",
    lastName: "Burton",
    profile: "General Practitioner"
}

export default function Navigation() {
    const [showMobileMenu, setShowMobileMenu]=useState<boolean>(false)

    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showMobileMenu]);

    const renderNavItems = () => (
        NavItems.map((navItem, index) => (
            <NavButton key={index} item={navItem.item} icon={navItem.icon} path={navItem.path} />
        ))
    );

    return (
        <>
        <nav className="flex justify-between items-center h-[72px] bg-white rounded-full lg:px-10 sm: px-4 m-6 mb-3">
            
            <div className="flex items-center h-12 md:w-[210px] w-12 overflow-hidden">
                <Image
                    priority
                    src={navLogo}
                    height={48}
                    alt="TechCare Logo"
                    className="object-cover w-full h-full object-left"

                />
            </div>


            <ul className="xl:flex gap-5 hidden"> {renderNavItems()} </ul>
        
            <div className="flex items-center md:gap-6 gap-3">
                <DocProfile 
                    photo={DoctorData.photo}
                    firstName={DoctorData.firstName}
                    lastName={DoctorData.lastName}
                    profile={DoctorData.profile}
                />
                <button
                    className="xl:hidden"
                    onClick={() => setShowMobileMenu(true)}
                >
                    <Menu 
                        stroke="gray"
                        aria-label="Mobile menu icon"
                    />
                </button>
            </div>    
        </nav>

        {/* Mobile Menu */}
        <nav className={`bg-white fixed flex top-0 w-[100%] h-[100%] z-[100] items-center align-middle justify-center transition-all duration-500 ${!showMobileMenu && 'translate-x-[100vw] opacity-0'}`} onClick={()=>setShowMobileMenu(false)}> 
            <ul className="flex flex-col scale-[200%] gap-6"> {renderNavItems()} </ul> 
        </nav>
        
        </>
    );
}