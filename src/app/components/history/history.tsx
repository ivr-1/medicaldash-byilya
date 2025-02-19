import Card from "../card"
import FeaturedStat from "./components/featuredstat"
import PressureChart from "./components/pressurechart"

import heartImg from "./assets/heartImg.png"
import respImg from "./assets/respImg.png"
import tempImg from "./assets/tempImg.png"



interface HealthHistory {
    month: string;
    year: number;
    blood_pressure: {
        systolic: {
            value: number;
            levels: "Higher than Average" | "Normal" | "Lower than Average";
        };
        diastolic: {
            value: number;
            levels: "Higher than Average" | "Normal" | "Lower than Average";
        };
    };
    heart_rate: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
    respiratory_rate: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
    temperature: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
}

interface HistoryProps {
    history: HealthHistory[];
}



export default function History ({history}:HistoryProps) {
    
    return(
        <Card
            header="Diagnosis History"
        >
            <div className="flex flex-col gap-3 h-full xl:justify-normal justify-center">
                <section className="flex items-center">
                    <PressureChart data={history}/>
                </section>

                <section className="flex gap-3 mx-6 items-center">
                    <FeaturedStat 
                        imageSrc={respImg}
                        imageAlt="lungs"
                        background="#E0F3FA"
                        title="Resp. Rate"
                        value={history[0].respiratory_rate.value}
                        unit='bpm'
                        minNormal={11}
                        maxNormal ={21}
                    />

                    <FeaturedStat 
                        imageSrc={tempImg}
                        imageAlt="thermometer"
                        background="#FFE6E9"
                        title="Temperature"
                        value={history[0].temperature.value}
                        unit="°F"
                        minNormal={97.8}
                        maxNormal ={99.1}
                    />

                    <FeaturedStat 
                        imageSrc={heartImg}
                        imageAlt="heart"
                        background="#FFE6F1"
                        title="Heart Rate"
                        value={history[0].heart_rate.value}
                        unit='bpm'
                        minNormal={80}
                        maxNormal ={90}
                    />

                </section>
            </div>

            
        </Card>
    )
}