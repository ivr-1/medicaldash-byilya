import Dashboard from "./dashboard";


interface RandomUserResponse {
  results: Array<{
    gender: 'male' | 'female';
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }>;
}

interface BloodPressure {
  systolic: {
      value: number;
      levels: "Higher than Average" | "Normal" | "Lower than Average";
  };
  diastolic: {
      value: number;
      levels: "Higher than Average" | "Normal" | "Lower than Average";
  };
}

interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
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

interface DiagnosticList {
  name: string;
  description: string;
  status: string;
}

export interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: DiagnosticList[];
  lab_results: string[];
}

export interface PatientDataProps {
  patientData: Patient[];
}

async function fetchPatientData(): Promise<Patient[]> {
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;

  if (!username || !password) {
    throw new Error('API credentials are missing');
  }

  const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch patient data');
  const originalData: Patient[] = await response.json();

  const genderGroups: { [key: string]: number[] } = {
    female: [],
    male: []
  };

  originalData.forEach((patient: Patient, index: number) => {
    const gender = patient.gender.toLowerCase();
    if (gender in genderGroups) {
      genderGroups[gender].push(index);
    }
  });

  await Promise.all(
    Object.entries(genderGroups).map(async ([gender, indices]) => {
      if (indices.length === 0) return;
      
      try {
        const res = await fetch(
          `https://randomuser.me/api/?results=${indices.length}&gender=${gender}`
        );
        const data: RandomUserResponse = await res.json();
        
        indices.forEach((patientIndex: number, resultIndex: number) => {
          originalData[patientIndex].profile_picture = 
            data.results[resultIndex].picture.large;
        });
      } catch (error) {
        console.error(`Error fetching ${gender} pictures:`, error);
      }
    })
  );

  return originalData;
}

const patientData: Patient[] = await fetchPatientData();

export default function Home() {
  return (
    <>
      <Dashboard patientData={patientData} />
    </>
  )
}