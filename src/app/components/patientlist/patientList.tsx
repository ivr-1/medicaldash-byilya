'use client';

import React, { useState } from 'react';
import Card from "../card";
import PatientCard from "./components/patient";
import { Patient } from "../../page"

interface PatientListProps {
  patientData: Patient[];
  setSelectedPatient: React.Dispatch<React.SetStateAction<number>>;
  setShowPatientList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPatient: number;
}

export default function PatientList({ 
  patientData, 
  setSelectedPatient, 
  selectedPatient, 
  setShowPatientList 
}: PatientListProps) {

    
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patientData.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.age.toString().includes(searchTerm)
    );
  });

  return (
    <Card 
      header="Patients" 
      search 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm}
    >
      <ul>
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => (
            <PatientCard
              key={index}
              photo={patient.profile_picture}
              firstName={patient.name.split(' ')[0]}
              lastName={patient.name.split(' ').slice(1).join(' ')}
              gender={patient.gender}
              age={patient.age}
              selected={selectedPatient} 
              setSelected={() => setSelectedPatient(index)}
              id={index}
              setShowPatientList={setShowPatientList}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p>No patients found</p>
          </div>
        )}
      </ul>
    </Card>

  );
}