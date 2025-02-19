import Card from "../card"
import PatientItem from "./components/patientitem"
import Image from "next/image"

import BirthIcon from "./assets/BirthIcon.svg"
import FemaleIcon from "./assets/FemaleIcon.svg"
import MaleIcon from "./assets/MaleIcon.svg"
import InsuranceIcon from "./assets/InsuranceIcon.svg"
import PhoneIcon from "./assets/PhoneIcon.svg"

interface PatientProfileProps {
  firstName: string
  lastName: string
  photo: string  // Changed to string type
  dateOfBirth: string
  gender: string
  contactInfo1: string
  contactInfo2: string
  insuranceProvider: string
}

export default function PatientProfile({
  firstName,
  lastName,
  photo,
  dateOfBirth,
  gender,
  contactInfo1,
  contactInfo2,
  insuranceProvider,
}: PatientProfileProps) {

  return (
    <Card header="">
      <div className="flex flex-col h-full items-center justify-center gap-6 mx-4 lg:my-0 my-8">
        <section className="flex flex-col w-full items-center gap-6">
          <Image
            src={photo}
            alt="patient's photo"
            height={150}
            width={150}
            className="rounded-full"
          />
          <h1 className="text-2xl font-extrabold">{firstName + " " + lastName}</h1>
        </section>

        <section className="w-full flex flex-col gap-4">
          <PatientItem
            icon={BirthIcon}
            h2="Date of Birth"
            p={dateOfBirth}
          />
          <PatientItem
            icon={gender === "Female" ? FemaleIcon : MaleIcon}
            h2="Gender"
            p={gender}
          />
          <PatientItem
            icon={PhoneIcon}
            h2="Contact Info"
            p={contactInfo1}
          />
          <PatientItem
            icon={PhoneIcon}
            h2="Emergency Contact"
            p={contactInfo2}
          />
          <PatientItem
            icon={InsuranceIcon}
            h2="Insurance Provider"
            p={insuranceProvider}
          />
        </section>

        <button className="flex items-center justify-center text-sm self-center font-bold bg-active2 hover:bg-active1 w-[190px] h-[35px]  rounded-full cursor-pointer active:scale-105 transition-all">
          Show All Information
        </button>
      </div>
    </Card>
  )
}