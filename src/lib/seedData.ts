import type { Language } from './types';

type Bi = Record<Language, string>;
type BiArr = Record<Language, string[]>;

// Seed data representing the organization structure & static content
export interface Member {
  name: Bi;
  photo?: string; // path under /images/members/, leave empty to show initials avatar
  info: {
    mr: string;
    en: string;
  };
}

// Guide / मार्गदर्शक
export const guide: Member = {
  name: {
    mr: 'डॉ. प्रदीपचंद्र पवार',
    en: 'Dr. Pradeepchandra Pawar'
  },
  photo: '/images/member/Pradeep sir.jpg',
  info: {
    mr: 'मंडळाचे मार्गदर्शक  ',
    en: 'Guide & Mentor of the Mandal',
  },
};


// Committee members / कार्यकारिणी सदस्य
// Add remaining members below in the same format.
export const committee: Member[] = [
  {
    name: {
      mr: 'विकास संतोष लोंढे',
      en: 'Vikas Santosh Londhe'
    },
    photo: '/images/member/vikas londhe.jpg',
    info: {
      mr: 'मंडळाचे प्रमुख',
      en: 'President of the Mandal',
    },
  },
  {
    name: { mr: 'विनायक लोंढे', en: 'Vinayak Londhe' },
    photo: '/images/member/vinayak.png',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: ' अजय मिठे', en: 'Ajay Mithe' },
    photo: '/images/member/ajay.png',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'अक्षय गोळेसर', en: 'Akshay Golesar' },
    photo: '/images/member/akshay.png',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: 'भूषण झगडे', en: 'Bhushan zagade' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: 'तेजस वायचळे', en: 'Tejas Vayachale' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: {
      mr: 'संपत वाजे', en: 'Sampat Waje'
    },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: 'गणेश खर्जे', en: 'Ganesh Kharje' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },


  {
    name: { mr: 'सागर बेनके', en: 'Sagar Benke' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: 'रुपेश मुठे', en: 'Rupesh Muthe' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: 'सचिन लोणारे', en: 'Sachin Lonare' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

  {
    name: { mr: 'मयूर नाईक', en: 'Mayur Naik' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },


  {
    name: { mr: 'किरण खर्जे', en: 'Kiran Kharje' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'सौरभ आहेर', en: 'Saurabh Aher' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'किशोर राऊत', en: 'Kishor Raut' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'सुशांत गोळेसर', en: 'Sushant Golesar' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'श्रीधर झगडे', en: 'Shridhar Jhagade' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'सिद्धेश थोरात ', en: 'Siddhesh Thorat' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'कृष्णा लोंढे', en: 'Krishna Londhe' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'सुमित पाचोरे', en: 'Sumit Pachore' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'समाधान आव्हाड,', en: 'Samadhan Awhad' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'तुषार झगडे', en: 'Tejas Vayachale' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'गणेश डहाळे', en: 'Ganesh Dhape' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'शिवम वाघ', en: 'Shivam Vagh' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'ज्ञानेश्वर वरंधळ', en: 'Jnaneshwar Varnad' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'प्रशांत सोनवणे,', en: 'Prashant Sonavane' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },
  {
    name: { mr: 'प्रतीश सोनवणे', en: 'Pratik Kurane' },
    photo: '/images/members/example.jpg',
    info: { mr: 'सदस्य', en: 'Member' },
  },

];



export interface DepartmentSeed {
  id: string;
  icon: string; // lucide icon name
  head: string;
  members: string[];
  contactPerson: string;
  contactPhone: string;
  image: string;
  introduction: Bi;
  objectives: BiArr;
  current: BiArr;
  upcoming: BiArr;
}

export const departments: DepartmentSeed[] = [
  {
    id: 'health',
    icon: 'HeartPulse',
    head: 'Dr. Pradipchandra Pawar',
    members: ['Sampat Waje', 'Mayur Naik', 'Saurabh Aher'],
    contactPerson: 'Sampat Waje',
    contactPhone: '+91 98765 43210',
    image: '/images/social-health.jpg',
    introduction: {
      mr: 'आरोग्य विभागाचे मुख्य उद्दिष्ट सिन्नर परिसरातील नागरिकांना आरोग्य सेवा पोहोचवणे आहे. नियमित आरोग्य तपासणी, आरोग्य शिबीरे आणि जागरूकता मोहीम यांच्या माध्यमातून हा विभाग कार्यरत आहे.',
      en: 'The Health Department aims to provide health services to citizens in the Sinnar area. This department works through regular health check-ups, health camps and awareness campaigns.'
    },
    objectives: {
      mr: ['प्रत्येक नागरिकापर्यंत आरोग्य सेवा पोहोचवणे', 'नियमित आरोग्य शिबीरे आयोजित करणे', 'आरोग्य जागरूकता मोहीम राबवणे', 'गरिबांना मोफत वैद्यकीय मदत'],
      en: ['Provide health services to every citizen', 'Organize regular health camps', 'Run health awareness campaigns', 'Free medical aid to the poor']
    },
    current: {
      mr: ['मासिक आरोग्य तपासणी शिबीर', 'मधुमेह व रक्तदाब तपासणी', 'महिला आरोग्य जागरूकता कार्यक्रम'],
      en: ['Monthly health check-up camp', 'Diabetes & blood pressure screening', "Women's health awareness program"]
    },
    upcoming: {
      mr: ['मोफत नेत्र तपासणी शिबीर', 'बाल आरोग्य मोहीम', 'व्यसनमुक्ती मोहीम'],
      en: ['Free eye check-up camp', 'Child health campaign', 'De-addiction campaign']
    }
  },
  {
    id: 'employment',
    icon: 'Briefcase',
    head: 'Vikas Santosh Londhe',
    members: ['Kiran Kharje', 'Pratik Kurane', 'Sachin Lonare'],
    contactPerson: 'Kiran Kharje',
    contactPhone: '+91 98765 43211',
    image: '/images/about-community.jpg',
    introduction: {
      mr: 'रोजगार विभाग तरुणांना रोजगाराच्या संधी उपलब्ध करून देण्यासाठी कार्यरत आहे. कौशल्य विकास, व्यावसायिक मार्गदर्शन आणि रोजगार मेळावे यांच्या माध्यमातून तरुणांना सक्षम बनवणे हे या विभागाचे ध्येय आहे.',
      en: 'The Employment Department works to provide employment opportunities to youth. It aims to empower youth through skill development, career guidance and job fairs.'
    },
    objectives: {
      mr: ['तरुणांना रोजगार संधी उपलब्ध करणे', 'कौशल्य विकास प्रशिक्षण देणे', 'स्वयंरोजगारासाठी मार्गदर्शन', 'व्यावसायिक सेवा वर्ग आयोजित करणे'],
      en: ['Provide employment opportunities to youth', 'Provide skill development training', 'Guidance for self-employment', 'Organize professional service classes']
    },
    current: {
      mr: ['कौशल्य विकास कार्यशाळा', 'स्वयंरोजगार मार्गदर्शन', 'रोजगार माहिती केंद्र'],
      en: ['Skill development workshop', 'Self-employment guidance', 'Employment information center']
    },
    upcoming: {
      mr: ['मोठा रोजगार मेळावा', 'डिजिटल साक्षरता प्रशिक्षण', 'उद्योजकता विकास कार्यक्रम'],
      en: ['Large job fair', 'Digital literacy training', 'Entrepreneurship development program']
    }
  },
  {
    id: 'loan',
    icon: 'Landmark',
    head: 'Vinayak Londhe',
    members: ['Kishor Raut', 'Sushant Golesar', 'Shridhar Jhagade'],
    contactPerson: 'Kishor Raut',
    contactPhone: '+91 98765 43212',
    image: '/images/decoration.jpg',
    introduction: {
      mr: 'ऋण विभाग आर्थिकदृष्ट्या दुर्बळ घटकांना कमी व्याजदरावर आर्थिक मदत पुरवतो. व्यवसाय ऋण, शैक्षणिक ऋण आणि आपत्कालीन आर्थिक मदत यांच्या माध्यमातून समाजाच्या आर्थिक सबलीकरणासाठी हा विभाग कार्यरत आहे.',
      en: 'The Loan Department provides financial assistance at low interest rates to economically weaker sections. It works for the economic empowerment of society through business loans, educational loans and emergency financial aid.'
    },
    objectives: {
      mr: ['गरिबांना कमी व्याजावर ऋण उपलब्ध करणे', 'स्वयंरोजगारासाठी आर्थिक मदत', 'शैक्षणिक ऋण सुविधा', 'आपत्कालीन आर्थिक सहाय्य'],
      en: ['Provide low-interest loans to the poor', 'Financial aid for self-employment', 'Educational loan facility', 'Emergency financial assistance']
    },
    current: {
      mr: ['व्यवसाय ऋण वितरण', 'शैक्षणिक ऋण मार्गदर्शन', 'आर्थिक साक्षरता कार्यशाळा'],
      en: ['Business loan distribution', 'Educational loan guidance', 'Financial literacy workshop']
    },
    upcoming: {
      mr: ['महिला स्वयंरोजगार ऋण योजना', 'कृषी ऋण मोहीम', 'विमा सेवा केंद्र'],
      en: ['Women self-employment loan scheme', 'Agricultural loan campaign', 'Insurance service center']
    }
  },
  {
    id: 'education',
    icon: 'GraduationCap',
    head: 'Ajay Mithe',
    members: ['Siddhesh Thorat', 'Krishna Londhe', 'Sumit Pachore'],
    contactPerson: 'Siddhesh Thorat',
    contactPhone: '+91 98765 43213',
    image: '/images/social-education.jpg',
    introduction: {
      mr: 'शिक्षण विभाग गरिब व गरजू विद्यार्थ्यांना शिक्षणाच्या माध्यमातून सक्षम बनवण्यासाठी कार्यरत आहे. मोफत अभ्यास साहित्य, शिष्यवृत्ती मार्गदर्शन आणि विशेष कोचिंग क्लासेस यांच्या माध्यमातून हा विभाग विद्यार्थ्यांच्या उज्ज्वल भविष्यासाठी योगदान देत आहे.',
      en: 'The Education Department works to empower poor and needy students through education. It contributes to a bright future for students through free study material, scholarship guidance and special coaching classes.'
    },
    objectives: {
      mr: ['गरिब विद्यार्थ्यांना शिक्षण मदत', 'मोफत अभ्यास साहित्य वितरण', 'शिष्यवृत्ती मार्गदर्शन', 'डिजिटल शिक्षण प्रोत्साहन'],
      en: ['Educational aid to poor students', 'Free study material distribution', 'Scholarship guidance', 'Digital education promotion']
    },
    current: {
      mr: ['मोफत ट्यूशन क्लासेस', 'नोट्स व साहित्य वितरण', 'ऑनलाईन अभ्यास सत्रे'],
      en: ['Free tuition classes', 'Notes and material distribution', 'Online study sessions']
    },
    upcoming: {
      mr: ['विज्ञान विभाग स्थापन', 'स्पर्धा परीक्षा मार्गदर्शन', 'वाचनालय उभारणा'],
      en: ['Establish science lab', 'Competitive exam guidance', 'Library setup']
    }
  }
];

export interface FestivalSeed {
  id: string;
  image: string;
  description: Bi;
}

export const festivals: FestivalSeed[] = [
  {
    id: 'mahaarti',
    image: '/images/festival-aarti.png',
    description: {
      mr: 'सिन्नर तालुक्यातील एकमेव महाआरती हा आमचा अभिमानाचा उपक्रम आहे. हजारो भाविकांच्या उपस्थितीत दिव्य वातावरणात ही महाआरती साजरी केली जाते.',
      en: 'The only Maha-Aarti in Sinnar taluka is our proud initiative. This Maha-Aarti is celebrated in a divine atmosphere in the presence of thousands of devotees.'
    }
  },
  {
    id: 'ramnavami',
    image: '/images/festival-ramnavami.png',
    description: {
      mr: 'श्रीराम नवमी निमित्त भव्य उत्सव आयोजित केला जातो. पालखी, भजन आणि प्रसाद वितरणाच्या माध्यमातून हा कार्यक्रम साजरा केला जातो.',
      en: 'A grand celebration is organized on the occasion of Shri Ram Navami. This event is celebrated through palanquin, bhajan and prasad distribution.'
    }
  },
  {
    id: 'dahihandi',
    image: '/images/festival-dahihandi.png',
    description: {
      mr: 'सिन्नर तालुक्यातील सर्वात मोठा दहीहंडी उत्सव आम्ही आयोजित करतो. अनेक गोविंदा मंडळांचा सहभाग आणि भव्य आयोजन यामुळे हा उत्सव अवघ्या सिन्नर तालुक्यात अजोड आहे.',
      en: 'We organize the biggest Dahihandi festival in Sinnar taluka. With the participation of many Govinda groups and grand arrangements, this festival is unique in the entire Sinnar taluka.'
    }
  },
  {
    id: 'deepotsav',
    image: '/images/festival-deepotsav.jpg',
    description: {
      mr: 'दीपोत्सवाच्या निमित्ताने हजारो दिवे पेटवून संपूर्ण सिन्नर शहराला प्रकाशित केले जाते. हा अंधकारावर प्रकाशाचा विजय दर्शवणारा उत्सव आहे.',
      en: 'On the occasion of Deepotsav, thousands of lamps are lit to illuminate the entire city of Sinnar. This festival symbolizes the victory of light over darkness.'
    }
  },
  {
    id: 'shivjayanti',
    image: '/images/festival-shivjayanti.jpg',
    description: {
      mr: 'छत्रपती शिवाजी महाराजांची जयंती थाटामाटात साजरी केली जाते. पोवाडा, शौर्यगाथा आणि विविध सांस्कृतिक कार्यक्रमांच्या माध्यमातून महाराजांच्या तेजस्वी पराक्रमाची स्मरणे केली जाते.',
      en: 'The birth anniversary of Chhatrapati Shivaji Maharaj is celebrated with great enthusiasm. Through powada, tales of valor and various cultural programs, the glorious valor of Maharaj is remembered.'
    }
  }
];

export interface SocialActivitySeed {
  id: string;
  image: string;
  date: string;
  description: Bi;
}

export const socialActivities: SocialActivitySeed[] = [
  {
    id: 'water',
    image: '/images/social-water.jpg',
    date: '2024-04-15',
    description: {
      mr: 'उन्हाळ्यात वाहनचालक व प्रवाशांना मोफत जलसेवा दिली जाते. शहरातील विविध ठिकाणी जलसेवा केंद्रे स्थापन करून शीतल पाणी वितरित केले जाते.',
      en: 'Free water service is provided to drivers and passengers during summer. Water service centers are set up at various places in the city to distribute cold water.'
    }
  },
  {
    id: 'healthcamp',
    image: '/images/social-health.jpg',
    date: '2024-05-20',
    description: {
      mr: 'नियमित आरोग्य शिबीरे आयोजित करून गरिबांना मोफत वैद्यकीय तपासणी व औषधे वितरित केली जातात. तज्ज्ञ डॉक्टरांच्या मार्गदर्शनाखाली ही शिबीरे घेतली जातात.',
      en: 'Regular health camps are organized to provide free medical check-ups and medicines to the poor. These camps are conducted under the guidance of expert doctors.'
    }
  },
  {
    id: 'blood',
    image: '/images/social-blood.jpg',
    date: '2024-06-14',
    description: {
      mr: 'वर्षातून दोनदा रक्तदान शिबिर आयोजित केले जाते. स्थानिक रुग्णालयांच्या सहकार्याने हे शिबिर घेतले जाते आणि शेकडो रक्तदाते यात सहभागी होतात.',
      en: 'Blood donation camps are organized twice a year. These camps are conducted in collaboration with local hospitals and hundreds of blood donors participate.'
    }
  },
  {
    id: 'flood',
    image: '/images/social-flood.jpg',
    date: '2023-07-25',
    description: {
      mr: 'पुरग्रस्त भागातील नागरिकांना अन्न, कपडे आणि आश्रय उपलब्ध करून दिला. बचाव व दुरुस्तीच्या कार्यात सक्रिय सहभाग घेतला.',
      en: 'Food, clothing and shelter were provided to citizens in flood-affected areas. Active participation was taken in rescue and rehabilitation work.'
    }
  },
  {
    id: 'cleaning',
    image: '/images/social-cleaning.jpg',
    date: '2024-08-10',
    description: {
      mr: 'नागेश्वर महादेव मंदिर परिसरात स्वच्छता मोहीम राबवली गेली. तरुणांच्या मोठ्या प्रमाणावर सहभागाने ही मोहीम यशस्वी झाली.',
      en: 'A cleanliness campaign was conducted in the Nageshwar Mahadev temple area. With large-scale participation of youth, this campaign was successful.'
    }
  },
  {
    id: 'tree',
    image: '/images/social-tree.jpg',
    date: '2024-07-01',
    description: {
      mr: 'पर्यावरण संतुलन राखण्यासाठी वृक्षारोपण मोहीम राबवली जाते. शहरातील विविध ठिकाणी रुंद फुलणारी झाडे लावून त्यांची देखभाल केली जाते.',
      en: 'Tree plantation campaigns are conducted to maintain environmental balance. Broad-canopy trees are planted at various places in the city and are maintained.'
    }
  },
  {
    id: 'education',
    image: '/images/social-education.jpg',
    date: '2024-06-05',
    description: {
      mr: 'गरिब विद्यार्थ्यांना मोफत अभ्यास साहित्य, वह्या आणि पुस्तके वितरित केली जातात. तसेच मोफत ट्यूशन क्लासेस चालवले जातात.',
      en: 'Free study material, notebooks and books are distributed to poor students. Also, free tuition classes are run.'
    }
  },
  {
    id: 'women',
    image: '/images/social-women.jpg',
    date: '2024-03-08',
    description: {
      mr: 'महिला सक्षमीकरणासाठी विविध कौशल्य विकास कार्यक्रम आणि मार्गदर्शन शिबीरे आयोजित केली जातात. स्वयंरोजगारासाठी महिलांना प्रोत्साहन दिले जाते.',
      en: 'Various skill development programs and guidance camps are organized for women empowerment. Women are encouraged for self-employment.'
    }
  }
];

// Seed gallery images
export const seedGallery = [
  { url: '/images/festival-aarti.jpg', title: { mr: 'महाआरती', en: 'Maha-Aarti' }, category: 'festival' as const },
  { url: '/images/festival-dahihandi.png', title: { mr: 'दहीहंडी उत्सव', en: 'Dahihandi Festival' }, category: 'festival' as const },
  { url: '/images/festival-deepotsav.jpg', title: { mr: 'दीपोत्सव', en: 'Deepotsav' }, category: 'festival' as const },
  { url: '/images/social-blood.jpg', title: { mr: 'रक्तदान शिबिर', en: 'Blood Donation Camp' }, category: 'blood' as const },
  { url: '/images/social-health.jpg', title: { mr: 'आरोग्य शिबीर', en: 'Health Camp' }, category: 'health' as const },
  { url: '/images/social-cleaning.jpg', title: { mr: 'स्वच्छता मोहीम', en: 'Cleaning Campaign' }, category: 'cleaning' as const },
  { url: '/images/social-tree.jpg', title: { mr: 'वृक्षारोपण', en: 'Tree Plantation' }, category: 'events' as const },
  { url: '/images/festival-ramnavami.jpg', title: { mr: 'श्रीराम नवमी', en: 'Ram Navami' }, category: 'events' as const },
];

// Seed members
export const seedMembers = [
  { name: 'Vinayak Londhe', phone: '9876543210' },
  { name: 'Ajay Mithe', phone: '9876543211' },
  { name: 'Akshay Golesar', phone: '9876543212' },
  { name: 'Bhushan Jhagade', phone: '9876543213' },
  { name: 'Tejas Vayachale', phone: '9876543214' },
  { name: 'Sampat Waje', phone: '9876543215' },
  { name: 'Ganesh Kharje', phone: '9876543216' },
  { name: 'Sagar Benke', phone: '9876543217' },
  { name: 'Rupesh Muthe', phone: '9876543218' },
  { name: 'Sachin Lonare', phone: '9876543219' },
];
