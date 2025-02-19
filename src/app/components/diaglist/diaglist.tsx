'use client'
import Card from "../card";

interface DiagnosticItem {
    name: string;
    description: string;
    status: string;
}

interface DiagListProps {
    diagnostic_list: DiagnosticItem[];
}

export default function DiagList({ diagnostic_list }: DiagListProps) {
    return (
        <Card header="Diagnostic List"> 
            <div className="w-full px-6">

                <header className="sticky top-0 z-10 bg-white">
                    <div className="grid grid-cols-[2fr_3fr_1fr] items-center gap-4 px-6 bg-[#F6F7F8] h-[48px] rounded-full font-bold md:text-sm text-[12px]">
                        <div>Problem/Diagnosis</div>
                        <div>Description</div>
                        <div>Status</div>
                    </div>
                </header>

                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <div className="divide-y divide-gray-100 md:text-sm text-[12px]">
                        {diagnostic_list.map((item, index) => (
                            <div key={index} className="grid grid-cols-[2fr_3fr_1fr] items-center gap-4 px-6 py-5">
                                <div>{item.name}</div>
                                <div>{item.description}</div>
                                <div>{item.status}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Card>
    );
}