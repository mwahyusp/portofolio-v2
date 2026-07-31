import { Project, Skill, LearningJourney, LocalizedText } from '../types';

export const UI_TRANSLATIONS = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang Saya',
      portfolio: 'Portfolio',
      skills: 'Keahlian',
      contact: 'Kontak Saya',
      hireMe: 'Rekrut Saya',
      hireMeLinkedIn: 'Rekrut Saya di LinkedIn',
      lightMode: 'Terang',
      darkMode: 'Gelap',
    },
    hero: {
      availabilityBadge: 'Tersedia untuk Project / Full-time',
      greetingPrefix: 'Hai, Semua 👋, Saya',
      rolePrefix: 'Seorang',
      contactTitle: 'Hubungi:',
      viewPortfolio: 'Lihat Portfolio',
      hireMeBtn: 'Rekrut Saya',
    },
    about: {
      sectionBadge: 'Tentang Saya',
      sectionTitle: 'Hai, Internet! 🚀',
      storyTitle: 'Mengenal Perjalanan Kode Saya',
      statProjects: 'Proyek Web',
      statCerts: 'Sertifikasi',
      statCommitment: 'Komitmen',
      friendTitle: 'Suka ngobrol tentang coding & proyek web?',
      socialHeader: 'Tautan Sosial:',
      journeyHeader: 'Jejak Pelatihan & Program',
      completedBadge: 'Solesai dengan Baik',
    },
    skills: {
      sectionBadge: 'Keahlian & Teknologi',
      sectionTitle: 'Teknologi Yang Saya Kuasai',
      sectionDesc: 'Kombinasi alat, pustaka, dan alur kerja modern yang saya gunakan untuk membangun aplikasi web yang cepat dan responsif.',
      allTab: 'Semua',
      frontendTab: 'Frontend',
      frameworkTab: 'Framework',
      backendTab: 'Backend',
      databaseTab: 'Database & Cloud',
      toolsTab: 'Tools & Utilities',
    },
    portfolio: {
      sectionBadge: 'Portfolio Proyek',
      sectionTitle: 'Proyek Terbaru Saya',
      sectionDesc: 'Koleksi karya dalam pengembangan front-end, dari aplikasi React interaktif hingga aplikasi Next.js sederhana dengan studi kasus kehidupan sehari-hari.',
      featuredBadge: 'Unggulan',
      liveDemo: 'Live Demo',
      detailBtn: 'Detail & Demo',
      seeLiveDemo: 'Live Demo',
      projectDescLabel: 'Deskripsi Proyek',
      techUsedLabel: 'Teknologi Digunakan',
      openLiveDemo: 'Buka Live Demo',
      githubRepo: 'GitHub Repo',
      allTab: 'Semua',
      overviewTab: 'Ringkasan Proyek',
      demoTab: '⚡ Coba Demo Interaktif',
      codeTab: '💻 Kode Sumber (Snippet)',
      interactiveBadge: 'Interaktif di Modal',
      copyCode: 'Salin Kode',
      codeCopied: 'Berhasil Disalin! 📋',
    },
    contact: {
      sectionBadge: 'Kontak Saya',
      sectionTitle: 'Hubungi Saya',
      sectionDesc: 'Mari membangun sesuatu yang luar biasa bersama! Atau sekadar ngobrol. Jangan ragu untuk menghubungi saya melalui formulir di bawah ini atau email langsung.',
      infoTitle: 'Informasi Kontak',
      emailLabel: 'Email Direct',
      locationLabel: 'Lokasi',
      copySuccess: 'Email berhasil disalin ke clipboard! 📋',
      formNameLabel: 'Nama Lengkap',
      formNamePlaceholder: 'Masukkan nama Anda',
      formEmailLabel: 'Email Anda',
      formEmailPlaceholder: 'contoh@email.com',
      formMessageLabel: 'Pesan',
      formMessagePlaceholder: 'Tuliskan pesan atau ide proyek Anda di sini...',
      sendingBtn: 'Mengirim Pesan...',
      sendBtn: 'Kirim Pesan',
      successTitle: 'Pesan Terkirim!',
      successDesc: 'Terima kasih telah menghubungi saya. Saya akan membalas pesan Anda sesegera mungkin!',
    },
    footer: {
      desc: 'Seorang Front-End Web Developer dari Jakarta. Berfokus pada pembuatan pengalaman pengguna yang responsif, cepat, dan modern.',
      navHeader: 'Tautan Navigasi',
      socialHeader: 'Media Sosial',
      rights: 'Semua hak dilindungi.',
      developedWith: 'Dikembangkan dengan',
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      portfolio: 'Portfolio',
      skills: 'Skills',
      contact: 'Contact Me',
      hireMe: 'Hire Me',
      hireMeLinkedIn: 'Hire Me on LinkedIn',
      lightMode: 'Light',
      darkMode: 'Dark',
    },
    hero: {
      availabilityBadge: 'Available for Project / Full-time',
      greetingPrefix: "Hi Everyone 👋, I'm",
      rolePrefix: 'A',
      contactTitle: 'Connect:',
      viewPortfolio: 'View Portfolio',
      hireMeBtn: 'Hire Me',
    },
    about: {
      sectionBadge: 'About Me',
      sectionTitle: 'Hello, World! 🚀',
      storyTitle: 'Discover My Coding Journey',
      statProjects: 'Web Projects',
      statCerts: 'Certifications',
      statCommitment: 'Commitment',
      friendTitle: 'Love talking about coding & web projects?',
      socialHeader: 'Social Links:',
      journeyHeader: 'Learning & Track Milestones',
      completedBadge: 'Completed Successfully',
    },
    skills: {
      sectionBadge: 'Skills & Tech Stack',
      sectionTitle: 'Technologies I Master',
      sectionDesc: 'A combination of modern tools, libraries, and workflows I use to build fast, responsive web applications.',
      allTab: 'All',
      frontendTab: 'Frontend',
      frameworkTab: 'Framework',
      backendTab: 'Backend',
      databaseTab: 'Database & Cloud',
      toolsTab: 'Tools & Utilities',
    },
    portfolio: {
      sectionBadge: 'Project Portfolio',
      sectionTitle: 'My Recent Work',
      sectionDesc: 'A collection of front-end projects, ranging from interactive React applications to simple Next.js apps solving everyday life cases.',
      featuredBadge: 'Featured',
      liveDemo: 'Live Demo',
      detailBtn: 'Details & Demo',
      seeLiveDemo: 'Live Demo',
      projectDescLabel: 'Project Description',
      techUsedLabel: 'Technologies Used',
      openLiveDemo: 'Open Live Demo',
      githubRepo: 'GitHub Repo',
      allTab: 'All',
      overviewTab: 'Project Overview',
      demoTab: '⚡ Try Interactive Demo',
      codeTab: '💻 Source Code (Snippet)',
      interactiveBadge: 'Interactive in Modal',
      copyCode: 'Copy Code',
      codeCopied: 'Copied to Clipboard! 📋',
    },
    contact: {
      sectionBadge: 'Contact Me',
      sectionTitle: 'Get In Touch',
      sectionDesc: "Let's build something extraordinary together! Or just say hello. Feel free to reach out via the form below or directly via email.",
      infoTitle: 'Contact Information',
      emailLabel: 'Direct Email',
      locationLabel: 'Location',
      copySuccess: 'Email successfully copied to clipboard! 📋',
      formNameLabel: 'Full Name',
      formNamePlaceholder: 'Enter your full name',
      formEmailLabel: 'Your Email',
      formEmailPlaceholder: 'example@email.com',
      formMessageLabel: 'Message',
      formMessagePlaceholder: 'Write your message or project ideas here...',
      sendingBtn: 'Sending Message...',
      sendBtn: 'Send Message',
      successTitle: 'Message Sent!',
      successDesc: 'Thank you for contacting me. I will respond to your message as soon as possible!',
    },
    footer: {
      desc: 'A Front-End Web Developer from Jakarta. Focused on crafting responsive, fast, and modern user experiences.',
      navHeader: 'Navigation Links',
      socialHeader: 'Social Media',
      rights: 'All rights reserved.',
      developedWith: 'Built with',
    }
  }
};

export const PERSONAL_INFO = {
  name: 'Mohammad Wahyu Sanusi Putra',
  shortName: 'Wahyu',
  nickname: 'mwahyusp',
  role: 'Front-End Web Developer',
  location: {
    id: 'Jakarta Selatan, Indonesia',
    en: 'South Jakarta, Indonesia'
  },
  email: 'remoteworkwithwahyu@gmail.com',
  address: 'Jakarta Selatan, Indonesia',
  profileImageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757171957/wahyu_mtuylr.webp',
  profileImagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757171957/wahyu_uxpv2d.png',
  logoWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757171950/mwsp-1-green_zqsifx.webp',
  logoPng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757171950/mwsp-1-green_ldqi6l.png',
  bioHeadline: {
    id: 'Belajar dari Console.log, Berkarya untuk Dunia Digital. 😁',
    en: 'Learning from Console.log, Crafting for the Digital World. 😁'
  },
  bioDescription: {
    id: 'Saya bukan programmer jenius. Saya cuma orang biasa yang terus belajar, gagal, coba lagi — dari kursus gratis sampai pelatihan bergengsi. Tapi hari ini, saya bisa bangga bilang: saya developer. Dan perjalanan ini mengajarkan satu hal: konsistensi lebih hebat dari bakat.',
    en: "I'm not a genius programmer. I'm just an ordinary person who keeps learning, failing, and trying again — from free courses to prestigious bootcamps. Today, I'm proud to say: I am a developer. And this journey taught me one thing: consistency beats talent."
  },
  aboutText1: {
    id: 'Saya Wahyu, seorang Front-End Web Developer dari Jakarta yang percaya bahwa teknologi dimulai dari keberanian untuk belajar. Dengan pengalaman di Generasi Gigih (Gojek), OpenClassrooms, dan Dicoding, saya terus tumbuh lewat setiap kode yang ditulis dan setiap tantangan yang dihadapi.',
    en: 'I am Wahyu, a Front-End Web Developer from Jakarta who believes technology starts with the courage to learn. With hands-on experience at Generasi Gigih (Gojek), OpenClassrooms, and Dicoding, I continue to grow with every line of code written and challenge embraced.'
  },
  aboutText2: {
    id: 'Suka ngobrol tentang coding, proyek web, atau tips belajar teknologi? Saya terbuka untuk kolaborasi, diskusi, atau sekadar jadi teman diskusi. Mari saling belajar dan tumbuh bersama!',
    en: 'Enjoy talking about coding, web projects, or tech learning tips? I am open to collaboration, discussions, or just networking. Let’s learn and grow together!'
  },
  socials: {
    github: 'https://github.com/mwahyusp',
    linkedin: 'https://linkedin.com/in/mwahyusp',
    instagram: 'https://instagram.com/mwahyusp',
    twitter: 'https://twitter.com/mwhysp',
  }
};

export const LEARNING_JOURNEY: LearningJourney[] = [
  {
    title: {
      id: 'Front-End Web Development',
      en: 'Front-End Web Development'
    },
    organization: 'Generasi Gigih 2.0 (Gojek / Yayasan Anak Bangsa Bisa)',
    period: '2022',
    description: {
      id: 'Pelatihan intensif bidang Front-End Engineering, pengerjaan proyek tim, serta pengembangan soft skills dan kemampuan memecahkan masalah.',
      en: 'Intensive Front-End Engineering training, team capstone projects, soft skills development, and technical problem-solving.'
    },
    badge: {
      id: 'Jalur Intensif',
      en: 'Intensive Track'
    }
  },
  {
    title: {
      id: 'Front-End Learning Path',
      en: 'Front-End Learning Path'
    },
    organization: 'Dicoding Indonesia',
    period: '2022 - 2023',
    description: {
      id: 'Menyelesaikan modul Dasar Pemrograman Web, Dasar React, dan Pengembangan Aplikasi Front-End Web Tingkat Menengah dengan standar industri.',
      en: 'Completed Web Development Fundamentals, React Basics, and Intermediate Front-End Web Application Development with industry standards.'
    },
    badge: {
      id: 'Tersertifikasi',
      en: 'Certified'
    }
  },
  {
    title: {
      id: 'Web Developer Course',
      en: 'Web Developer Course'
    },
    organization: 'OpenClassrooms',
    period: '2021',
    description: {
      id: 'Mempelajari fondasi HTML5, CSS3, JavaScript modern, serta pembuatan situs web responsif berbasis proyek praktis.',
      en: 'Mastered the foundations of HTML5, CSS3, modern JavaScript, and building practical project-based responsive websites.'
    },
    badge: {
      id: 'Fondasi Utama',
      en: 'Foundational'
    }
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'todo-apps',
    title: {
      id: 'Daftar Todo Modern',
      en: 'Modern Todo List'
    },
    category: 'React',
    description: {
      id: 'Aplikasi Daftar Todo modern yang dibuat dengan React dan Context API, dilengkapi dengan mode terang/gelap, antarmuka pengguna bergaya glassmorphism, dan animasi yang mulus.',
      en: 'A modern Todo List app built with React and Context API, featuring light/dark mode, a stylish glassmorphism UI, and fluid animations.'
    },
    detailedDescription: {
      id: 'Sistem manajemen tugas interaktif yang memanfaatkan React Context API untuk mengelola status global secara efisien. Dilengkapi dengan filter status (semua, aktif, selesai), penyimpanan lokal, tema adaptif glassmorphism, dan animasi transisi halus.',
      en: 'An interactive task management system leveraging React Context API for global state. Features status filtering (all, active, completed), local storage persistence, adaptive glassmorphism styling, and smooth motion effects.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1758187313/todo-apps-react-context-api_m5kxz4.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1758187300/todo-apps-react-context-api_amqtff.png',
    liveDemoUrl: 'https://todo-apps-react-context-api.netlify.app/',
    githubUrl: 'https://github.com/mwahyusp/todo-apps-react-context-api',
    tags: ['React.js', 'Context API', 'Glassmorphism', 'Tailwind CSS', 'Dark Mode'],
    featured: true
  },
  {
    id: 'mental-health-tracker',
    title: {
      id: 'Pelacak Kesehatan Mental',
      en: 'Mental Health Tracker'
    },
    category: 'Interactive Apps',
    description: {
      id: 'Aplikasi React.js untuk melacak suasana hati harian (senang, sedih, cemas) dengan grafik bulanan dan kutipan motivasi acak.',
      en: 'A React.js application to track daily moods (happy, sad, anxious) with monthly trend charts and random motivational quotes.'
    },
    detailedDescription: {
      id: 'Aplikasi kepedulian mental yang memungkinkan pengguna mencatat mood harian mereka, menganalisis grafik visual perkembangan emosional, serta membaca afirmasi positif acak untuk menjaga kesejahteraan emosional.',
      en: 'A mental wellness tracker enabling users to log daily moods, inspect visual emotional analytics charts, and read random positive affirmations to cultivate mindfulness.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1758802772/mental-health-tracker_1_wcqhjk.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1758802735/mental-health-tracker_n4ksia.png',
    liveDemoUrl: 'https://mental-health-tracker-three.vercel.app/',
    githubUrl: 'https://github.com/mwahyusp/mental-health-tracker',
    tags: ['React.js', 'Chart.js', 'Tailwind CSS', 'LocalStorage', 'Wellness'],
    featured: true
  },
  {
    id: 'paws-grooming',
    title: {
      id: 'Proyek Grooming Rumahan (Paws Grooming)',
      en: 'Pet In-Home Grooming (Paws Grooming)'
    },
    category: 'Interactive Apps',
    description: {
      id: 'Landing page layanan grooming hewan peliharaan rumahan profesional dengan desain responsif, layanan lengkap, dan formulir booking.',
      en: 'A professional home pet grooming landing page featuring a responsive layout, detailed service menu, and booking form.'
    },
    detailedDescription: {
      id: 'Landing page interaktif untuk usaha perawatan hewan peliharaan panggilan. Menyajikan katalog paket grooming, estimasi harga, galeri foto hewan, dan akses pemesanan langsung.',
      en: 'An interactive landing page for an on-demand pet care service. Showcases grooming package catalogs, price estimations, pet photo galleries, and instant booking access.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757317696/paws-grooming_dnqeh0.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757317740/paws-grooming_diuoe1.png',
    liveDemoUrl: 'https://paws-grooming-seven.vercel.app/',
    githubUrl: 'https://github.com/mwahyusp/paws-grooming',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Responsive UI'],
    featured: false
  },
  {
    id: 'contact-apps',
    title: {
      id: 'Daftar Kontak (Contact List Apps)',
      en: 'Contact List Application'
    },
    category: 'React',
    description: {
      id: 'Aplikasi Contact List sederhana yang dibuat dengan React.js untuk menyimpan, mencari, serta mengelola daftar kontak dengan cepat.',
      en: 'A simple Contact List application built with React.js to save, search, and manage contact directories seamlessly.'
    },
    detailedDescription: {
      id: 'Aplikasi manajemen kontak yang dilengkapi fitur pencarian nama secara real-time, penambahan kontak baru dengan foto avatar, dan aksi hapus kontak secara dinamis.',
      en: 'A contact management app featuring real-time name searching, avatar picture upload support, and dynamic contact item deletion.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757318159/contact-apps_lyrmyz.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757318147/contact-apps_hzkzc9.png',
    liveDemoUrl: 'https://contacts-app-nine.vercel.app/',
    githubUrl: 'https://github.com/mwahyusp/contacts-app',
    tags: ['React.js', 'State Management', 'Search Filter', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'privy-noter',
    title: {
      id: 'Pencatat Privy (Privy Noter)',
      en: 'Privy Noter App'
    },
    category: 'React',
    description: {
      id: 'Aplikasi catatan pribadi yang memungkinkan pengguna untuk membuat, mengelola, dan menyimpan catatan penting secara aman dan mudah diakses.',
      en: 'A private notes application allowing users to create, organize, and securely store essential notes effortlessly.'
    },
    detailedDescription: {
      id: 'Aplikasi produktivitas berbasis catatan dengan dukungan pencarian catatan, fitur arsip catatan, pembatasan karakter judul, serta persistensi data di sisi klien.',
      en: 'A note-taking productivity application with search capabilities, note archiving, title character limit constraints, and client-side data persistence.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757171923/my-privy-noter_tihfp9.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757171924/my-privy-noter_lvtyif.png',
    liveDemoUrl: 'https://my-privy-noter.netlify.app/',
    githubUrl: 'https://github.com/mwahyusp/my-privy-noter',
    tags: ['React.js', 'Notes System', 'Archive Feature', 'CSS Modules'],
    featured: false
  },
  {
    id: 'simple-blog',
    title: {
      id: 'Blog Sederhana (Simple Blog)',
      en: 'Simple Blog App'
    },
    category: 'React',
    description: {
      id: 'Aplikasi blog sederhana untuk latihan CRUD penuh (Create, Read, Update, Delete) tanpa framework backend, menggunakan React + Vite + Tailwind.',
      en: 'A lightweight blog app built for full CRUD operations (Create, Read, Update, Delete) using React + Vite + Tailwind CSS.'
    },
    detailedDescription: {
      id: 'Aplikasi konten blog modern yang mendukung pembuatan postingan baru, pengeditan teks, pembacaan detail artikel, dan penghapusan artikel dengan umpan balik antarmuka yang cepat.',
      en: 'A modern blogging app supporting article authoring, rich content editing, detailed reading views, and post deletion with instant feedback.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757318159/simple-blog_uvho0d.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757318147/simple-blog_rdhkkj.png',
    liveDemoUrl: 'https://simplee-blog.netlify.app/',
    githubUrl: 'https://github.com/mwahyusp/simple-blog-rvt',
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'Full CRUD'],
    featured: false
  },
  {
    id: 'gif-oasis',
    title: {
      id: 'GIF Oasis : Search App',
      en: 'GIF Oasis : Search App'
    },
    category: 'Interactive Apps',
    description: {
      id: 'Aplikasi pencarian GIF Dark Mode-first dikembangkan menggunakan React.js dan Tailwind CSS dengan estetika minimalis dan animasi transisi halus via Giphy API.',
      en: 'A Dark Mode-first GIF search app built using React.js and Tailwind CSS focusing on clean aesthetics and smooth transitions via Giphy API.'
    },
    detailedDescription: {
      id: 'Mesin pencari GIF yang memanjakan mata dengan layout grid masonry responsif, penyalinan tautan GIF langsung dalam 1-klik, pencarian trending GIF, dan transisi visual halus.',
      en: 'An aesthetically pleasing GIF engine featuring responsive masonry grid layouts, 1-click GIF link copying, trending searches, and fluid visual animations.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1759740765/gif-oasis-search-app_ukrlew.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1759740766/gif-oasis-search-app_hhuor9.png',
    liveDemoUrl: 'https://gif-oasis-search-app.netlify.app/',
    githubUrl: 'https://github.com/mwahyusp/gif-oasis-search-app',
    tags: ['React.js', 'Giphy API', 'Dark Theme', 'Tailwind CSS', 'Smooth Transitions'],
    featured: true
  },
  {
    id: 'contact-form-next',
    title: {
      id: 'Formulir Kontak Next.js',
      en: 'Next.js Contact Form'
    },
    category: 'Next.js',
    description: {
      id: 'Aplikasi Formulir Kontak Sederhana yang dibuat menggunakan Next.js dan Tailwind CSS. Pengguna dapat mengisi nama dan pesan, lalu melihat data yang dikirim.',
      en: 'A sleek Contact Form application built with Next.js and Tailwind CSS. Users submit details and inspect raw form data reactively.'
    },
    detailedDescription: {
      id: 'Praktik implementasi Server/Client Components pada Next.js dengan validasi form tingkat lanjut, pengolahan data state, dan tampilan card respon interaktif.',
      en: 'Implementation of Server/Client Components in Next.js featuring advanced form validation, state management, and interactive response card displays.'
    },
    imageWebp: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757929313/contact-form-next_baslyl.webp',
    imagePng: 'https://res.cloudinary.com/dslkxsifx/image/upload/v1757929350/contact-form-next_hsakcs.png',
    liveDemoUrl: 'https://contact-form-nextjs.netlify.app/',
    githubUrl: 'https://github.com/mwahyusp/contact-form-nextjs',
    tags: ['Next.js', 'Tailwind CSS', 'Form Handling', 'React Hooks'],
    featured: false
  },
  {
    id: 'expense-tracker-react',
    title: {
      id: 'Pelacak Pengeluaran Harian & Anggaran',
      en: 'Daily Expense & Budget Tracker'
    },
    category: 'React',
    description: {
      id: 'Aplikasi React.js harian untuk mencatat pengeluaran harian (makan, transportasi, belanja) dengan perhitungan saldo dan batas anggaran bulanan.',
      en: 'A practical React.js app for logging daily grocery, transport, and meal expenses with real-time balance calculations and budget limit progress.'
    },
    detailedDescription: {
      id: 'Aplikasi manajemen keuangan harian yang intuitif. Pengguna dapat menambah transaksi pemasukan dan pengeluaran, mengelompokkan kategori (makanan, belanja, bensin, tagihan), memantau sisa anggaran bulanan secara visual, dan menyimpan data secara otomatis di browser.',
      en: 'An everyday personal finance tracker built with React.js. Users can add income and expense items, categorize spending (food, transport, bills), visually inspect remaining monthly budget progress bars, and automatically persist data.'
    },
    imageWebp: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    imagePng: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://daily-expense-budget-tracker.vercel.app/',
    githubUrl: 'https://github.com/mwahyusp/Daily-Expense-Budget-Tracker',
    tags: ['React.js', 'State Management', 'Budgeting', 'Tailwind CSS', 'Local Storage'],
    featured: true
  },
  {
    id: 'calculator-portion-recipe',
    title: {
      id: 'Kalkulator Porsi Resep Masakan Dapur',
      en: 'Kitchen Recipe & Portion Scaler'
    },
    category: 'React',
    description: {
      id: 'Aplikasi React.js praktis untuk menyesuaikan takaran bahan masakan sehari-hari secara otomatis berdasarkan jumlah porsi makan keluarga.',
      en: 'An everyday React.js kitchen tool to dynamically scale recipe ingredient measurements based on desired serving sizes for family meals.'
    },
    detailedDescription: {
      id: 'Asisten dapur harian yang mempermudah kegiatan memasak di rumah. Pilih resep favorit (seperti Nasi Goreng, Soto Ayam, atau Pancake), tentukan porsi makan yang diinginkan (misal dari 2 porsi menjadi 6 porsi), dan aplikasi langsung menghitung ulang takaran bahan dalam gram, sendok, atau mililiter.',
      en: 'An essential home cooking helper built with React.js. Select a favorite recipe (e.g. Fried Rice, Chicken Soup, Pancakes), adjust desired servings (e.g. scale from 2 to 6 portions), and the app instantly recalculates precise ingredient weights and measurements.'
    },
    imageWebp: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    imagePng: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://calculator-portion-recipe.vercel.app',
    githubUrl: 'https://github.com/mwahyusp/calculator-portion-recipe',
    tags: ['React.js', 'Interactive UI', 'Meal Prep', 'Dynamic Math', 'Tailwind CSS'],
    featured: true
  },
  {
    id: 'medication-reminder-next',
    title: {
      id: 'Pengingat Minum Obat & Vitamin Harian',
      en: 'Daily Medication & Health Reminder'
    },
    category: 'Next.js',
    description: {
      id: 'Aplikasi Next.js berbasis Client/Server Components untuk mengelola jadwal minum obat & vitamin keluarga dengan centang konfirmasi harian.',
      en: 'A Next.js application built with Server and Client components to organize daily family medication and vitamin schedules with tracking.'
    },
    detailedDescription: {
      id: 'Aplikasi pemantau kesehatan keluarga berbasis Next.js App Router. Pengguna dapat membuat jadwal rutinitas suplemen/obat, menetapkan jam minum (pagi, siang, malam), mengonfirmasi dosis harian dengan checklist interaktif, serta melihat persentase kepatuhan minum obat.',
      en: 'An everyday family healthcare tracker built with Next.js App Router. Users can set up supplement and medication schedules, assign daily intake times (morning, afternoon, night), check off taken doses, and track daily compliance progress.'
    },
    imageWebp: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    imagePng: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://medication-vitamin-reminder.vercel.app/',
    githubUrl: 'https://github.com/mwahyusp/medication-vitamin-reminder',
    tags: ['Next.js', 'React Hooks', 'Health Tracker', 'Tailwind CSS', 'Server Components'],
    featured: true
  },
  {
    id: 'zivo-marketplace-next',
    title: {
      id: 'ZIVO Marketplace — E-Commerce Engine & Architecture Guide',
      en: 'ZIVO Marketplace — E-Commerce Engine & Architecture Guide'
    },
    category: 'Next.js',
    description: {
      id: 'Platform E-Commerce Next.js 15 dengan Atomic Design System, Zustand state, simulasi Redis Cache, dan lacak pengiriman kurir real-time. "Belanja lebih cepat. Lebih cerdas. Lebih terpercaya."',
      en: 'Modern E-Commerce Engine with Next.js 15, Atomic Design, Zustand state, Redis Cache simulation, and live courier order tracking. "Shop smarter. Faster. Better."'
    },
    detailedDescription: {
      id: 'ZIVO Marketplace disandarkan pada arsitektur Atomic Design System yang terstruktur dan modular (atoms, molecules, organisms, templates) menggunakan Next.js 15, React 19, TypeScript, dan Zustand. Dilengkapi dengan simulasi Redis In-Memory Cache Engine (0.8ms query speed), Shopping Cart Drawer dengan PPN 11% & kalkulator diskon, Dukungan Bilingual (ID & EN), Restorasi gambar otomatis, serta Lacak Pengiriman Kurir Real-Time.',
      en: 'ZIVO Marketplace architecture engine built with Next.js 15, React 19, TypeScript, and Zustand using Atomic Design Pattern (atoms, molecules, organisms, templates). Features a simulated Redis In-Memory Cache Engine (0.8ms speed), Shopping Cart Drawer with 11% VAT & coupon calculator, Bilingual support (ID & EN), Image auto-fallback, and Live Courier Tracking.'
    },
    imageWebp: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    imagePng: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    liveDemoUrl: 'https://zivo-marketplace.vercel.app/',
    githubUrl: 'https://github.com/mwahyusp/zivo-marketplace',
    tags: ['Next.js 15', 'React 19', 'Atomic Design', 'Zustand', 'Redis Cache', 'Bilingual'],
    featured: true
  }
];

export const SKILLS: Skill[] = [
  {
    name: 'React.js 18/19',
    category: 'Framework',
    level: 90,
    iconName: 'Code2',
    description: {
      id: 'Pengembangan komponen UI modular, Hooks, Context API, & State Management.',
      en: 'Modular UI component development, Hooks, Context API, & State Management.'
    }
  },
  {
    name: 'Next.js 15',
    category: 'Framework',
    level: 85,
    iconName: 'Layers',
    description: {
      id: 'App Router, Server Components, Routing, SSG/SSR & Atomic Design System.',
      en: 'App Router, Server Components, Routing, SSG/SSR & Atomic Design System.'
    }
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 95,
    iconName: 'Palette',
    description: {
      id: 'Desain responsif utility-first, glassmorphism, animasi kustom & Dark Mode.',
      en: 'Utility-first responsive design, glassmorphism, custom animations & Dark Mode.'
    }
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    level: 88,
    iconName: 'FileCode',
    description: {
      id: 'Async/Await, Promises, DOM Manipulation, Modules & Event Handling.',
      en: 'Async/Await, Promises, DOM Manipulation, Modules & Event Handling.'
    }
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    level: 95,
    iconName: 'Layout',
    description: {
      id: 'Semantik HTML, Flexbox, Grid Layouts, Aksesibilitas & Responsif Desktop/Mobile.',
      en: 'Semantic HTML, Flexbox, Grid Layouts, Accessibility & Responsive Desktop/Mobile.'
    }
  },
  {
    name: 'Node.js & Express API',
    category: 'Backend',
    level: 82,
    iconName: 'Server',
    description: {
      id: 'Pengembangan RESTful API, Middleware server-side, routing & autentikasi dasar.',
      en: 'RESTful API endpoints, server-side middleware, routing & basic auth handling.'
    }
  },
  {
    name: 'REST API & Fetching',
    category: 'Backend',
    level: 88,
    iconName: 'Globe',
    description: {
      id: 'Pengambilan data asynchronous (Fetch/Axios) & penanganan status loading/error.',
      en: 'Asynchronous data fetching (Fetch/Axios) & loading/error handling.'
    }
  },
  {
    name: 'Redis Cache & Cloud Storage',
    category: 'Database & Cloud',
    level: 80,
    iconName: 'Database',
    description: {
      id: 'Simulasi In-Memory Caching (0.8ms), LocalStorage persistence & Firebase Firestore.',
      en: 'In-Memory Caching simulation (0.8ms), LocalStorage persistence & Firebase Firestore.'
    }
  },
  {
    name: 'Git & GitHub',
    category: 'Tools',
    level: 88,
    iconName: 'GitBranch',
    description: {
      id: 'Version Control, Branching, Pull Requests & Pengelolaan Repositori.',
      en: 'Version Control, Branching, Pull Requests & Repository Management.'
    }
  },
  {
    name: 'Vite & Build Tools',
    category: 'Tools',
    level: 85,
    iconName: 'Zap',
    description: {
      id: 'Modul Bundler ultra-cepat untuk proyek React & modern Web Applications.',
      en: 'Ultra-fast module bundler for modern React projects and Web Applications.'
    }
  }
];
