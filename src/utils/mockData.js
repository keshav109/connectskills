export const mockCustomers = [
  {
    id: '1',
    name: 'Keshav Raj',
    email: 'keshav@gmail.com',
    phone: '+1-555-0123',
    role: 'customer',
    location: 'New York, NY',
    jobsPosted: 12,
    totalSpent: 3500,
    createdAt: '2024-01-15T10:30:00Z'
  }
];

export const mockWorkers = [
  {
    id: '1',
    name: 'Muzahid Hussain',
    email: 'muzahid@gmail.com',
    phone: '+91-9876543265',
    role: 'worker',
    skills: ['Plumbing', 'Pipe Repair', 'Bathroom Installation', 'Maintenance'],
    hourlyRate: 500,
    rating: 4.8,
    completedJobs: 156,
    location: 'Dibrugarh, Assam',
    bio: 'Licensed plumber with 10+ years of experience. Specializing in residential and commercial plumbing repairs and installations.',
    availability: 'available',
    verified: true,
    portfolio: [],
    yearsExperience: 10,
    createdAt: '2023-08-20T14:00:00Z'
  },
  {
    id: '2',
    name: 'Himanshu Kumar',
    email: 'himanshu@gmail.com',
    phone: '+1-555-0125',
    role: 'worker',
    skills: ['Electrical Work', 'Wiring', 'Lighting Installation'],
    hourlyRate: 85,
    rating: 4.9,
    completedJobs: 203,
    location: 'Brooklyn, NY',
    bio: 'Master electrician with expertise in residential and commercial electrical systems. Safety-first approach with quality workmanship.',
    availability: 'available',
    verified: true,
    portfolio: [],
    yearsExperience: 12,
    createdAt: '2023-06-10T09:15:00Z'
  },
  {
    id: '3',
    name: 'Utsav Kumar',
    email: 'utsav@gmail.com',
    phone: '+1-555-0126',
    role: 'worker',
    skills: ['Carpentry', 'Cabinet Making', 'Furniture Repair'],
    hourlyRate: 65,
    rating: 4.7,
    completedJobs: 89,
    location: 'Queens, NY',
    bio: 'Skilled carpenter specializing in custom woodwork and furniture. Attention to detail and craftsmanship is my priority.',
    availability: 'busy',
    verified: true,
    portfolio: [],
    yearsExperience: 8,
    createdAt: '2023-10-05T16:45:00Z'
  }
];

export const mockJobs = [
  {
    id: '1',
    title: 'Kitchen Sink Repair',
    description: 'My kitchen sink is leaking from the faucet and needs immediate repair. The leak has been getting worse over the past week.',
    category: 'Plumbing',
    budget: 200,
    location: 'Manhattan, NY',
    deadline: '2024-02-15T18:00:00Z',
    status: 'open',
    customerId: '1',
    customerName: 'Sarah Johnson',
    createdAt: '2024-02-10T09:30:00Z',
    bids: []
  },
  {
    id: '2',
    title: 'Living Room Light Installation',
    description: 'Need to install 3 ceiling lights in the living room. All wiring is ready, just need installation and connection.',
    category: 'Electrical',
    budget: 300,
    location: 'Brooklyn, NY',
    deadline: '2024-02-20T17:00:00Z',
    status: 'open',
    customerId: '1',
    customerName: 'Sarah Johnson',
    createdAt: '2024-02-08T14:20:00Z',
    bids: []
  }
];

export const mockBids = [
  {
    id: '1',
    jobId: '1',
    workerId: '1',
    workerName: 'Mike Rodriguez',
    workerRating: 4.8,
    price: 175,
    message: 'I can fix your kitchen sink leak quickly and efficiently. I have all the necessary tools and parts.',
    estimatedDuration: '2-3 hours',
    status: 'pending',
    createdAt: '2024-02-10T11:45:00Z'
  }
];

export const mockReviews = [
  {
    id: '1',
    jobId: '1',
    customerId: '1',
    customerName: 'Keshav Raj',
    workerId: '1',
    rating: 5,
    comment: 'Excellent work! Mike was professional, punctual, and fixed the issue perfectly.',
    createdAt: '2024-02-11T16:30:00Z'
  }
];

export const serviceCategories = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'HVAC',
  'Painting',
  'Roofing',
  'Cleaning',
  'Landscaping',
  'Appliance Repair',
  'Handyman'
];