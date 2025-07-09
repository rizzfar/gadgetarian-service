export interface ServiceData {
  id: string;
  code: string;
  deviceName: string;
  category: string;
  categoryType: 'MacBook' | 'iPhone' | 'iMac';
  status: 'BELUM DIKERJAKAN' | 'SUDAH SELESAI' | 'Proses';
  entryDate: string;
  problem: string;
  technician?: string;
  replacedComponent?: string;
  notes?: string;
}

export const mockServices: ServiceData[] = [
  {
    id: '1',
    code: 'SVC-20250621-001',
    deviceName: 'MacBook Air M2 2020',
    category: 'MacBook',
    categoryType: 'MacBook',
    status: 'BELUM DIKERJAKAN',
    entryDate: '18 Juni 2025',
    problem: 'Layar tidak menyala setelah terkena air',
    technician: 'Reyhan Tahira',
    replacedComponent: 'Casing',
    notes: 'Mohon jangan hapus folder tugas, ada file bernama jangan_dihapus_bang.zip'
  },
  {
    id: '2',
    code: 'SVC-20250621-002',
    deviceName: 'iPhone 13 Pro',
    category: 'iPhone',
    categoryType: 'iPhone',
    status: 'SUDAH SELESAI',
    entryDate: '19 Juni 2025',
    problem: 'Baterai cepat habis dan overheating saat charging',
    technician: 'Cheryl Jessica Oktavia',
    replacedComponent: 'Battery',
    notes: 'Baterai sudah diganti dengan yang original, disarankan menggunakan charger resmi'
  },
  {
    id: '3',
    code: 'SVC-20250621-003',
    deviceName: 'iMac 2021',
    category: 'iMac',
    categoryType: 'iMac',
    status: 'Proses',
    entryDate: '20 Juni 2025',
    problem: 'Komputer restart sendiri secara random',
    technician: 'Dinda Aprillianti',
    replacedComponent: 'RAM',
    notes: 'Sedang dalam proses diagnosis lebih lanjut, kemungkinan masalah pada RAM'
  },
  {
    id: '4',
    code: 'SVC-20250621-004',
    deviceName: 'MacBook Pro 16\" 2021',
    category: 'MacBook',
    categoryType: 'MacBook',
    status: 'BELUM DIKERJAKAN',
    entryDate: '21 Juni 2025',
    problem: 'Keyboard beberapa tombol tidak berfungsi',
    technician: 'Hizkia Imanuel Edho',
    replacedComponent: '-',
    notes: 'Menunggu spare part keyboard dari supplier'
  },
  {
    id: '5',
    code: 'SVC-20250621-005',
    deviceName: 'iPhone 14 Pro Max',
    category: 'iPhone',
    categoryType: 'iPhone',
    status: 'Proses',
    entryDate: '22 Juni 2025',
    problem: 'Kamera belakang tidak fokus dan buram',
    technician: 'Rizky Al Farid Hafizh',
    replacedComponent: 'Camera Module',
    notes: 'Sedang menunggu konfirmasi dari customer untuk penggantian camera module'
  },
  {
    id: '6',
    code: 'SVC-20250621-006',
    deviceName: 'MacBook Pro M3 2023',
    category: 'MacBook',
    categoryType: 'MacBook',
    status: 'BELUM DIKERJAKAN',
    entryDate: '23 Juni 2025',
    problem: 'Trackpad tidak berfungsi',
    technician: 'M. Irsad Assopi',
    replacedComponent: 'Trackpad Unit',
    notes: 'Akan dilakukan penggantian trackpad dan uji ulang setelah pemasangan'
  },
  {
    id: '7',
    code: 'SVC-20250621-007',
    deviceName: 'iMac M1 2021',
    category: 'iMac',
    categoryType: 'iMac',
    status: 'SUDAH SELESAI',
    entryDate: '24 Juni 2025',
    problem: 'Suara kipas sangat bising',
    technician: 'Muhammad Murfid Nurhadi',
    replacedComponent: 'Cooling Fan',
    notes: 'Kipas sudah diganti, suara kembali normal'
  }
];
