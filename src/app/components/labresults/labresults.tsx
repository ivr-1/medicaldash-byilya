import Card from "../card";
import Image from "next/image";
import DownloadIcon from "./assets/downloadicon.svg"

interface LabResultsProps {
    labResults: string[];
}

export default function LabResults({ labResults }: LabResultsProps) {
    return (
        <Card header="Lab Results">
            <div className="flex flex-col gap-1">
                {labResults.map((labresult, index) => (
                    <div key={index} className="flex px-6 py-3 w-full hover:bg-active1 active:bg-active2 transition-all gap-10 cursor-pointer">
                        <p>{labresult}</p>
                        <Image 
                            priority
                            src={DownloadIcon}
                            height={15}
                            width={18}
                            alt="Download Icon"
                            className="ml-auto"
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
}