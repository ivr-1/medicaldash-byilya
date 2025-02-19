'use client';

import PatientList from "./components/patientlist/patientList";
import History from "./components/history/history";
import DiagList from "./components/diaglist/diaglist";
import PatientProfile from "./components/patientprofile/patientprofile";
import LabResults from "./components/labresults/labresults";
import DemoFooter from "./components/demofooter";
import { useState } from "react";
import { PatientDataProps } from "./page";


function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function Dashboard({ patientData }: PatientDataProps) {
    const [selectedPatient, setSelectedPatient] = useState<number>(0);
    const [showPatientList, setShowPatientList] = useState<boolean>(false)

    return (

        <>
            <div className="xl:flex hidden h-[80vh] overflow-none p-6 gap-6">

                {/* 3 col layout */}
                <div className="w-[30%]  flex justify-center ">
                    <PatientList patientData={patientData} setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient} setShowPatientList={setShowPatientList}/>
                </div>

                <div className="flex flex-col w-[45%] min-w-[650px] gap-6 h-full">
                    <div className="h-[73%]">
                        <History
                            history={patientData[selectedPatient].diagnosis_history}
                        />
                    </div>

                    <div className="overflow-y-hidden"> 
                        <DiagList
                            diagnostic_list={patientData[selectedPatient].diagnostic_list}
                        />
                    </div>
                </div>

                <div className="w-[25%] space-y-6">
                    <div className="h-[76%]">
                        <PatientProfile
                            firstName={patientData[selectedPatient].name.split(' ')[0]}
                            lastName={patientData[selectedPatient].name.split(' ').slice(1).join(' ')}
                            photo={patientData[selectedPatient].profile_picture}
                            dateOfBirth={formatDate(patientData[selectedPatient].date_of_birth)}
                            gender={patientData[selectedPatient].gender}
                            contactInfo1={patientData[selectedPatient].phone_number}
                            contactInfo2={patientData[selectedPatient].emergency_contact}
                            insuranceProvider={patientData[selectedPatient].insurance_type}
                        />
                    </div>
                    <div className="h-[21%]">
                        <LabResults
                            labResults={patientData[selectedPatient].lab_results}
                        />
                    </div>
                </div>
            </div>
            
            <div className="xl:flex hidden justify-center"> 
                <DemoFooter />
            </div>

        {/* 2 col layout */}
            <div className="xl:hidden lg:flex flex-col hidden overflow-none p-6 gap-6">
                    <button 
                        onClick={() => setShowPatientList(prev => !prev)}
                        className="bg-active2 py-3 rounded-xl font-bold hover:bg-active1"
                    >
                            {`${showPatientList ? 'Hide' : 'Show'} Patient List`}
                    </button>
                    <div className={`justify-center ${showPatientList ? '': 'hidden'}`}>
                        <PatientList patientData={patientData} setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient} setShowPatientList={setShowPatientList}/>
                    </div>

                    <div className="lg:flex w-[100%] gap-6 ">
                        
                        <div className="lg:w-[70%]">
                            <History
                                    history={patientData[selectedPatient].diagnosis_history}
                                />  
                        </div>      
        
                        <div className="lg:w-[30%]">
                            <PatientProfile
                                firstName={patientData[selectedPatient].name.split(' ')[0]}
                                lastName={patientData[selectedPatient].name.split(' ').slice(1).join(' ')}
                                photo={patientData[selectedPatient].profile_picture}
                                dateOfBirth={formatDate(patientData[selectedPatient].date_of_birth)}
                                gender={patientData[selectedPatient].gender}
                                contactInfo1={patientData[selectedPatient].phone_number}
                                contactInfo2={patientData[selectedPatient].emergency_contact}
                                insuranceProvider={patientData[selectedPatient].insurance_type}
                            />
                        </div>
            
                    </div>

                    <div className="w-[100%] space-y-6">
                        <div className="flex flex-col p-0 -mb-6">
                                <DiagList
                                    diagnostic_list={patientData[selectedPatient].diagnostic_list}
                                />
                
                                <LabResults
                                    labResults={patientData[selectedPatient].lab_results}
                                />
                        </div>
    
                    </div>

            
            </div>
            <div className="lg:flex xl:hidden hidden mb-5 justify-center"> 
                <DemoFooter />
            </div>

        {/* 1 col layout */}
            <div className="lg:hidden sm:flex flex-col overflow-none p-6">
                    <button 
                        onClick={() => setShowPatientList(prev => !prev)}
                        className="bg-active2 hover:bg-active1 py-3 rounded-xl font-bold mb-6 w-[100%]"
                    >
                            {`${showPatientList ? 'Hide' : 'Show'} Patient List`}
                    </button>
                    <div className={`justify-center ${showPatientList ? '': 'hidden'}`}>
                        <PatientList patientData={patientData} setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient} setShowPatientList={setShowPatientList}/>
                    </div>


                    <PatientProfile
                        firstName={patientData[selectedPatient].name.split(' ')[0]}
                        lastName={patientData[selectedPatient].name.split(' ').slice(1).join(' ')}
                        photo={patientData[selectedPatient].profile_picture}
                        dateOfBirth={formatDate(patientData[selectedPatient].date_of_birth)}
                        gender={patientData[selectedPatient].gender}
                        contactInfo1={patientData[selectedPatient].phone_number}
                        contactInfo2={patientData[selectedPatient].emergency_contact}
                        insuranceProvider={patientData[selectedPatient].insurance_type}
                    />

                    <History
                            history={patientData[selectedPatient].diagnosis_history}
                        />  

                    <DiagList
                                diagnostic_list={patientData[selectedPatient].diagnostic_list}
                            />

                    <LabResults
                                labResults={patientData[selectedPatient].lab_results}
                            />
                            
                    <div className="flex justify-center">
                        <DemoFooter />
                    </div>
            
            </div>
            
        </>

        


        
    );
}