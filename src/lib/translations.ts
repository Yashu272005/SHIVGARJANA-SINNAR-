import type { Language } from './types';

type Bi = Record<Language, string>;

// Bilingual translation dictionary for the entire website
export const translations: Record<string, Record<string, Bi>> = {
  // Nav
  nav: {
    home: { mr: 'मुख्यपृष्ठ', en: 'Home' },
    about: { mr: 'आमच्याबद्दल', en: 'About' },
    departments: { mr: 'विभाग', en: 'Departments' },
    events: { mr: 'उत्सव', en: 'Events' },
    social: { mr: 'सामाजिक उपक्रम', en: 'Social Activities' },
    members: { mr: 'सदस्य', en: 'Members' },
    join: { mr: 'सदस्य होण्यासाठी', en: 'Join Member' },
    gallery: { mr: 'गॅलरी', en: 'Gallery' },
    contact: { mr: 'संपर्क', en: 'Contact' },
    admin: { mr: 'ॲडमिन लॉगिन', en: 'Admin Login' },
  },
  // Home stats
  stats: {
    members: { mr: 'एकूण सदस्य', en: 'Total Members' },
    departments: { mr: 'एकूण विभाग', en: 'Total Departments' },
    events: { mr: 'एकूण उत्सव', en: 'Total Events' },
    social: { mr: 'सामाजिक उपक्रम', en: 'Social Activities' },
    today: { mr: 'आजचे सदस्यत्व', en: "Today's Joining" },
  },
  // Hero
  hero: {
    title: { mr: 'शिवगर्जना, सिन्नर', en: 'Shivgarjana, Sinnar' },
    subtitle: { mr: 'सेवा हाच धर्म आहे • सिन्नर तालुक्यातील अभिमानास्पद सामाजिक संस्था', en: 'Service is our religion • A proud social organization in Sinnar taluka' },
    cta1: { mr: 'सदस्य होण्यासाठी', en: 'Join Us' },
    cta2: { mr: 'अधिक जाणून घ्या', en: 'Learn More' },
  },
  // About
  about: {
    title: { mr: 'आमच्याबद्दल', en: 'About Us' },
    intro: {
      mr: '   शिवगर्जना, सिन्नर ही केवळ दहीहंडी आयोजित करणारी संस्था नाही, तर सामाजिक बांधिलकी जपणारी आणि प्रत्येक गरजू व्यक्तीपर्यंत मदतीचा हात पोहोचवणारी युवा चळवळ आहे. आमचा विश्वास आहे की खरी भक्ती म्हणजे समाजसेवा. म्हणूनच आम्ही वर्षभर विविध सामाजिक, शैक्षणिक, आरोग्यविषयक आणि पर्यावरणपूरक उपक्रम राबवतो. युवकांची ताकद समाजाच्या विकासासाठी वापरणे हेच आमचे ध्येय आहे.',
      en: 'Shivgarjana Mitra Mandal Dahi Handi Committee, Sinnar is more than an organization that celebrates the Dahi Handi festival. It is a youth-driven movement committed to social responsibility, dedicated to reaching every person in need with compassion, service, and support.We believe that true devotion is expressed through selfless service to society. With this belief, we organize a wide range of social, educational, healthcare, and environmental initiatives throughout the year. Our mission is to channel the energy, passion, and strength of young people into creating a stronger, healthier, and more compassionate community. Together, we celebrate our culture, preserve our traditions, and work towards building a brighter future for society..'
    },
    mission: { mr: 'आमचे ध्येय', en: 'Our Mission' },
    missionText: {
      mr: 'समाजातील प्रत्येक घटकापर्यंत सेवा पोहोचवणे, सांस्कृतिक वारसा जपणे आणि तरुण पिढीला सकारात्मक दिशा देणे हे आमचे ध्येय आहे.',
      en: 'Our mission is to deliver services to every section of society, preserve cultural heritage, and give positive direction to the younger generation.'
    },
    vision: { mr: 'आमचे ध्येय', en: 'Our Vision' },
    visionText: {
      mr: 'एक सक्षम, सशक्त आणि सबल समाज निर्माण करणे, जिथे प्रत्येक व्यक्तीला आरोग्य, शिक्षण आणि रोजगाराची सोय उपलब्ध असेल.',
      en: 'To build a capable, strong and empowered society where every individual has access to health, education and employment.'
    },
  },
  // Departments
  departments: {
    title: { mr: 'आमचे विभाग', en: 'Our Departments' },
    subtitle: { mr: 'समाजाच्या विविध गरजा भागवण्यासाठी समर्पित विभाग', en: 'Dedicated departments to serve various needs of society' },
    health: { mr: 'आरोग्य विभाग', en: 'Health Department' },
    employment: { mr: 'रोजगार विभाग', en: 'Employment Department' },
    loan: { mr: 'ऋण विभाग', en: 'Loan Department' },
    education: { mr: 'शिक्षण विभाग', en: 'Education Department' },
    introduction: { mr: 'विभाग परिचय', en: 'Department Introduction' },
    objectives: { mr: 'उद्दिष्टे', en: 'Objectives' },
    current: { mr: 'सध्याचे कार्यक्रम', en: 'Current Activities' },
    upcoming: { mr: 'आगामी उपक्रम', en: 'Upcoming Plans' },
    head: { mr: 'विभाग प्रमुख', en: 'Department Head' },
    members: { mr: 'विभाग सदस्य', en: 'Department Members' },
    gallery: { mr: 'गॅलरी', en: 'Gallery' },
    contact: { mr: 'संपर्क व्यक्ती', en: 'Contact Person' },
    back: { mr: 'विभागांकडे परत', en: 'Back to Departments' },
  },
  // Events / Festivals
  events: {
    title: { mr: 'आमचे महोत्सव', en: 'Our Festivals' },
    subtitle: { mr: 'सिन्नर तालुक्यातील अभिमानास्पद सांस्कृतिक उत्सव', en: 'Proud cultural festivals of Sinnar taluka' },
    mahaarti: { mr: 'सिन्नर तालुक्यातील एकमेव महाआरती. श्रीराम नवमी', en: 'The Only Maha-Aarti in Sinnar Taluka. Shri Ram Navami' },
    ramnavami: { mr: 'विश्वगुरू संतश्रेष्ठ श्री निवृत्तीनाथ महाराज पालखी सोहळा ', en: 'Vishwaguru Sant Shrestha Shri Nivruttinath Maharaj Palkhi Ceremony' },
    dahihandi: { mr: 'सिन्नर तालुक्यातील सर्वात मोठा दहीहंडी उत्सव', en: 'The Biggest Dahihandi Festival in Sinnar Taluka' },
    deepotsav: { mr: 'दीपोत्सव', en: 'Deepotsav' },
    shivjayanti: { mr: 'शिवजयंती', en: 'Shivjayanti' },
  },
  // Social Activities
  socialAct: {
    title: { mr: 'सामाजिक उपक्रम', en: 'Social Activities' },
    subtitle: { mr: 'समाजासाठी समर्पित सेवा', en: 'Dedicated service for society' },
    water: { mr: 'जलसेवा', en: 'Water Service' },
    healthcamp: { mr: 'आरोग्य शिबीर', en: 'Health Camp' },
    blood: { mr: 'रक्तदान शिबिर', en: 'Blood Donation Camp' },
    flood: { mr: 'पुरग्रस्तांना मदत', en: 'Flood Relief' },
    cleaning: { mr: 'नागेश्वर महादेव स्वच्छता मोहीम', en: 'Nageshwar Mahadev Cleanliness Campaign' },
    tree: { mr: 'Tree Plantation', en: 'Tree Plantation' },
    education: { mr: 'Education Support', en: 'Education Support' },
    women: { mr: 'Women Empowerment', en: 'Women Empowerment' },
  },
  // Organization
  org: {
    title: { mr: 'संस्थेची संरचना', en: 'Organization Structure' },
    guide: { mr: 'मार्गदर्शक', en: 'Guide' },
    chief: { mr: 'प्रमुख', en: 'Chief' },
    committee: { mr: 'शिष्टमंडळ', en: 'Committee' },
  },
  // Members
  members: {
    title: { mr: 'आमचे सदस्य', en: 'Our Members' },
    subtitle: { mr: 'संस्थेच्या वाट्याला येणारे समर्पित कार्यकर्ते', en: 'Dedicated workers of the organization' },
    search: { mr: 'सदस्य शोधा...', en: 'Search members...' },
    noResults: { mr: 'कोणताही सदस्य सापडला नाही', en: 'No members found' },
  },
  // Join form
  join: {
    title: { mr: 'सदस्य होण्यासाठी', en: 'Join as Member' },
    subtitle: { mr: 'सेवेच्या कार्यात सहभागी होण्यासाठी खालील फॉर्म भरा', en: 'Fill the form below to participate in our service activities' },
    name: { mr: 'संपूर्ण नाव', en: 'Full Name' },
    phone: { mr: 'दूरध्वनी क्रमांक', en: 'Phone Number' },
    namePh: { mr: 'तुमचे संपूर्ण नाव टाका', en: 'Enter your full name' },
    phonePh: { mr: '१० अंकी मोबाईल नंबर', en: '10-digit mobile number' },
    submit: { mr: 'सदस्यत्व घ्या', en: 'Submit' },
    success: { mr: 'धन्यवाद! तुमची सदस्यत्वाची विनंती यशस्वीरित्या नोंदवली गेली आहे. आम्ही लवकरच तुमच्याशी संपर्क साधू.', en: 'Thank you! Your membership request has been successfully registered. We will contact you soon.' },
    errName: { mr: 'कृपया नाव टाका', en: 'Please enter your name' },
    errPhone: { mr: 'कृपया वैध १० अंकी मोबाईल नंबर टाका', en: 'Please enter a valid 10-digit mobile number' },
  },
  // Gallery
  gallery: {
    title: { mr: 'गॅलरी', en: 'Gallery' },
    subtitle: { mr: 'आमच्या उपक्रमांचे दृश्य दर्शन', en: 'A visual journey of our activities' },
    all: { mr: 'सर्व', en: 'All' },
    festival: { mr: 'उत्सव', en: 'Festival' },
    blood: { mr: 'रक्तदान', en: 'Blood Donation' },
    health: { mr: 'आरोग्य शिबीर', en: 'Health Camp' },
    cleaning: { mr: 'स्वच्छता मोहीम', en: 'Cleaning Campaign' },
    events: { mr: 'कार्यक्रम', en: 'Events' },
  },
  // Contact
  contact: {
    title: { mr: 'संपर्क', en: 'Contact Us' },
    subtitle: { mr: 'आमच्याशी संपर्क साधा', en: 'Get in touch with us' },
    name: { mr: 'नाव', en: 'Name' },
    email: { mr: 'ईमेल', en: 'Email' },
    phone: { mr: 'दूरध्वनी', en: 'Phone' },
    subject: { mr: 'विषय', en: 'Subject' },
    message: { mr: 'संदेश', en: 'Message' },
    submit: { mr: 'पाठवा', en: 'Send Message' },
    success: { mr: 'तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे. धन्यवाद!', en: 'Your message has been sent successfully. Thank you!' },
    address: { mr: 'पत्ता', en: 'Address' },
    addressVal: { mr: 'शिवगर्जना मित्र मंडळ, सिन्नर, जि. नाशिक, महाराष्ट्र', en: 'Shivgarjana Mitra Mandal, Sinnar, Dist. Nashik, Maharashtra' },
    emergency: { mr: 'आपत्कालीन संपर्क', en: 'Emergency Contact' },
  },
  // Footer
  footer: {
    about: { mr: 'शिवगर्जना, सिन्नर ही सेवा हाच धर्म या ध्येयाने कार्य करणारी सामाजिक संस्था आहे.', en: 'Shivgarjana Mitra Mandal Dahihandi Samiti, Sinnar is a social organization working with the motto "Service is our religion".' },
    quickLinks: { mr: 'त्वरित लिंक्स', en: 'Quick Links' },
    social: { mr: 'सामाजिक माध्यमे', en: 'Social Media' },
    emergency: { mr: 'आपत्कालीन संपर्क', en: 'Emergency Contact' },
    rights: { mr: 'सर्व हक्क राखीव', en: 'All Rights Reserved' },
    developed: { mr: 'विकसित केले', en: 'Developed by' },
    dev: { mr: 'डेव्हलपमेंट टीम', en: 'Development Team' },
  },
  // Admin
  admin: {
    login: { mr: 'ॲडमिन लॉगिन', en: 'Admin Login' },
    username: { mr: 'वापरकर्ता नाव', en: 'Username' },
    password: { mr: 'संकेतशब्द', en: 'Password' },
    signIn: { mr: 'साइन इन', en: 'Sign In' },
    dashboard: { mr: 'डॅशबोर्ड', en: 'Dashboard' },
    logout: { mr: 'लॉगआउट', en: 'Logout' },
    totalMembers: { mr: 'एकूण सदस्य', en: 'Total Members' },
    todayJoin: { mr: 'आजचे सदस्यत्व', en: "Today's Joining" },
    weeklyJoin: { mr: 'साप्ताहिक सदस्यत्व', en: 'Weekly Joining' },
    monthlyJoin: { mr: 'मासिक सदस्यत्व', en: 'Monthly Joining' },
    memberList: { mr: 'सदस्य यादी', en: 'Member List' },
    searchMember: { mr: 'सदस्य शोधा...', en: 'Search member...' },
    delete: { mr: 'हटवा', en: 'Delete' },
    exportExcel: { mr: 'एक्सेल एक्सपोर्ट', en: 'Export Excel' },
    exportPdf: { mr: 'PDF एक्सपोर्ट', en: 'Export PDF' },
    messages: { mr: 'संदेश', en: 'Messages' },
    galleryMgmt: { mr: 'गॅलरी व्यवस्थापन', en: 'Gallery Management' },
    uploadImage: { mr: 'प्रतिमा अपलोड करा', en: 'Upload Image' },
    imageTitle: { mr: 'प्रतिमा शीर्षक', en: 'Image Title' },
    category: { mr: 'श्रेणी', en: 'Category' },
    addImage: { mr: 'प्रतिमा जोडा', en: 'Add Image' },
    errCreds: { mr: 'चुकीचे वापरकर्ता नाव किंवा संकेतशब्द', en: 'Invalid username or password' },
    name: { mr: 'नाव', en: 'Name' },
    phone: { mr: 'दूरध्वनी', en: 'Phone' },
    date: { mr: 'तारीख', en: 'Date' },
    status: { mr: 'स्थिती', en: 'Status' },
    actions: { mr: 'क्रिया', en: 'Actions' },
    noMembers: { mr: 'कोणतेही सदस्य नाहीत', en: 'No members yet' },
    approve: { mr: 'मंजूर करा', en: 'Approve' },
    reject: { mr: 'नाकारा', en: 'Reject' },
  },
};