export interface Technician {
  id: string;
  name: string;
  username: string;
  password: string;
  specialization: string;
  avatar: string;
}

export const technicians: Technician[] = [
  {
    id: '1',
    name: 'Reyhan Tahira',
    username: 'reyhan.tahira',
    password: 'reyhan2025',
    specialization: 'MacBook Specialist',
    avatar: 'RT'
  },
  {
    id: '2',
    name: 'Cheryl Jessica Oktavia',
    username: 'cheryl.jessica',
    password: 'cheryl2025',
    specialization: 'iPhone Expert',
    avatar: 'CJ'
  },
  {
    id: '3',
    name: 'Dinda Aprillianti',
    username: 'dinda.april',
    password: 'dinda2025',
    specialization: 'iMac Technician',
    avatar: 'DA'
  },
  {
    id: '4',
    name: 'Hizkia Imanuel Edho',
    username: 'hizkia.edho',
    password: 'hizkia2025',
    specialization: 'Hardware Specialist',
    avatar: 'HE'
  },
  {
    id: '5',
    name: 'Rizky Al Farid Hafizh',
    username: 'rizky.farid',
    password: 'rizky2025',
    specialization: 'Senior Technician',
    avatar: 'RF'
  },
  {
    id: '6',
    name: 'M. Irsad Assopi',
    username: 'irsad.assopi',
    password: 'irsad2025',
    specialization: 'Software Expert',
    avatar: 'IA'
  },
  {
    id: '7',
    name: 'Muhammad Murfid Nurhadi',
    username: 'murfid.nurhadi',
    password: 'murfid2025',
    specialization: 'Repair Specialist',
    avatar: 'MN'
  }
];

export const authenticateTechnician = (username: string, password: string): Technician | null => {
  const technician = technicians.find(
    tech => tech.username === username && tech.password === password
  );
  return technician || null;
};