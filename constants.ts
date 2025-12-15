import { Currency, InvoiceStatus, TransactionStatus, User, UserRole, VendorProfile, AffiliateStat } from './types';

export const MOCK_USER_CONSUMER: User = {
  id: 'u_123',
  name: 'Chioma Adebayo',
  email: 'chioma.a@gmail.com',
  role: UserRole.CONSUMER,
  avatarUrl: 'https://picsum.photos/200',
  kycVerified: true,
  walletBalance: {
    [Currency.CAD]: 4250.50,
    [Currency.NGN]: 0,
    [Currency.USD]: 120.00,
    [Currency.GBP]: 0,
    [Currency.EUR]: 0,
  }
};

export const MOCK_USER_BUSINESS: User = {
  id: 'b_999',
  name: 'Lagos Logistics Hub',
  email: 'dispatch@lagoslogistics.ng',
  role: UserRole.BUSINESS,
  avatarUrl: 'https://picsum.photos/201',
  kycVerified: true,
  walletBalance: {
    [Currency.NGN]: 8500000.00,
    [Currency.USD]: 0,
    [Currency.GBP]: 0,
    [Currency.CAD]: 1500.00, // Small buffer in CAD
    [Currency.EUR]: 0,
  },
  affiliateCode: 'LAGOS_LOG_VIP',
  affiliateEarnings: 450.00
};

export const MOCK_VENDORS: VendorProfile[] = [
  {
    id: 'v_1',
    businessName: 'Eko Grand Events',
    tagline: 'Luxury weddings in Lagos & Abuja',
    description: 'We specialize in creating unforgettable experiences for the Nigerian diaspora. From traditional engagement ceremonies to white weddings.',
    services: ['Event Planning', 'Catering', 'Decor', 'Photography'],
    rating: 4.9,
    location: 'Victoria Island, Lagos',
    coverImage: 'https://picsum.photos/800/400',
    hourlyRate: { min: 50000, max: 200000, currency: Currency.NGN },
    images: ['https://picsum.photos/400/300', 'https://picsum.photos/401/300', 'https://picsum.photos/402/300']
  },
  {
    id: 'v_2',
    businessName: 'Naija Cargo Express',
    tagline: 'Reliable shipping from Toronto/Calgary to Lagos',
    services: ['Air Freight', 'Sea Cargo', 'Door-to-Door'],
    rating: 4.7,
    location: 'Ikeja, Lagos',
    coverImage: 'https://picsum.photos/800/401',
    hourlyRate: { min: 20000, max: 150000, currency: Currency.NGN }
  },
  {
    id: 'v_3',
    businessName: 'Ankara & Aso Ebi World',
    tagline: 'Authentic fabrics for traditional wear',
    services: ['Fabrics', 'Tailoring', 'Bulk Sales'],
    rating: 4.8,
    location: 'Balogun Market, Lagos',
    coverImage: 'https://picsum.photos/800/402',
    hourlyRate: { min: 10000, max: 50000, currency: Currency.NGN }
  }
];

export const MOCK_TRANSACTIONS = [
  {
    id: 't_1',
    date: '2023-10-24',
    amount: 350.00,
    currency: Currency.CAD,
    type: 'PAYMENT',
    status: TransactionStatus.COMPLETED,
    recipientName: 'Eko Grand Events',
    recipientAvatar: 'https://picsum.photos/50',
    fee: 2.50
  },
  {
    id: 't_2',
    date: '2023-10-22',
    amount: 150.00,
    currency: Currency.CAD,
    type: 'TRANSFER',
    status: TransactionStatus.COMPLETED,
    recipientName: 'Tunde Bakare',
    recipientAvatar: 'https://picsum.photos/51',
    fee: 1.50
  },
  {
    id: 't_3',
    date: '2023-10-20',
    amount: 1200.00,
    currency: Currency.CAD,
    type: 'PAYMENT',
    status: TransactionStatus.PENDING,
    recipientName: 'Naija Cargo',
    recipientAvatar: 'https://picsum.photos/52',
    fee: 5.00
  }
] as const;

export const MOCK_INVOICES = [
  {
    id: 'inv_001',
    vendorName: 'Lagos Logistics Hub',
    clientName: 'Chioma Adebayo',
    amount: 250000,
    currency: Currency.NGN,
    dueDate: '2023-11-01',
    status: InvoiceStatus.SENT,
    milestones: [
      { description: 'Shipping Deposit', amount: 100000, isPaid: true },
      { description: 'Clearance Fee', amount: 150000, isPaid: false }
    ]
  },
  {
    id: 'inv_002',
    vendorName: 'Lagos Logistics Hub',
    clientName: 'Emeka Okafor',
    amount: 120000,
    currency: Currency.NGN,
    dueDate: '2023-10-15',
    status: InvoiceStatus.OVERDUE,
    milestones: [
      { description: 'Container Fee', amount: 120000, isPaid: false }
    ]
  }
];

export const AFFILIATE_DATA: AffiliateStat[] = [
  { period: 'Mon', clicks: 12, signups: 1, earnings: 10 },
  { period: 'Tue', clicks: 18, signups: 3, earnings: 45 },
  { period: 'Wed', clicks: 25, signups: 5, earnings: 85 },
  { period: 'Thu', clicks: 15, signups: 2, earnings: 25 },
  { period: 'Fri', clicks: 35, signups: 8, earnings: 120 },
  { period: 'Sat', clicks: 42, signups: 10, earnings: 150 },
  { period: 'Sun', clicks: 38, signups: 7, earnings: 95 },
];