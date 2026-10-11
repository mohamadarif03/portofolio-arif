export interface Certificate {
  title: string;
  issuer: string;
  image: string;
  category: "Course" | "Achievement";
  date: string;
  credentialId: string;
  skills: string[];
  description: string;
  level: string;
  verificationUrl?: string;
}

export const CERTIFICATES: Certificate[] = [
  // ── COURSES ─────────────────────────────────────────────────────────────
  {
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia",
    image: "/certificate/dicoding-belajar machine learning untuk pemula-D-gNHk9Z.webp",
    category: "Course",
    date: "04 Juni 2025",
    credentialId: "53XED24MKPRN",
    skills: ["Machine Learning", "Python", "Supervised Learning", "Scikit-Learn"],
    description:
      "Mempelajari konsep fundamental machine learning, supervised & unsupervised learning, evaluasi model, serta implementasi praktis menggunakan Python dan Scikit-Learn.",
    level: "Beginner",
    verificationUrl: "https://www.dicoding.com/certificates/53XED24MKPRN",
  },
  {
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    image: "/certificate/dicoding-belajar-dasar-data-science-QLZ96YW1MZ5D.webp",
    category: "Course",
    date: "03 Januari 2026",
    credentialId: "QLZ96YW1MZ5D",
    skills: ["Data Science", "Data Analysis", "Decision Making", "Exploratory Data"],
    description:
      "Mempelajari konsep esensial data science mulai dari types of data, data understanding, eksplorasi data analitik, hingga teknik perumusan keputusan berbasis data.",
    level: "Beginner",
    verificationUrl: "https://www.dicoding.com/certificates/QLZ96YW1MZ5D",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    image: "/certificate/dicoding-belajar-dasar-sql-JMZVV42GRZN9.webp",
    category: "Course",
    date: "10 Oktober 2025",
    credentialId: "JMZVV42GRZN9",
    skills: ["SQL", "Relational Database", "Data Querying", "Database Management"],
    description:
      "Mempelajari fundamental Structured Query Language (SQL), perancangan database relasional, manipulasi data menggunakan DDL & DML, serta query analitik lanjutan.",
    level: "Beginner",
    verificationUrl: "https://www.dicoding.com/certificates/JMZVV42GRZN9",
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    image: "/certificate/dicoding-belajar visualisasi data-BRYqhVab.webp",
    category: "Course",
    date: "10 Oktober 2024",
    credentialId: "53XEQ4E7YXRN",
    skills: ["Data Visualization", "Exploratory Data Analysis", "Dashboard", "Charts"],
    description:
      "Menguasai teknik visualisasi data untuk menyampaikan insight bisnis secara efektif melalui grafik analitis, diagram batang/sebar, dan perancangan dashboard interaktif.",
    level: "Beginner",
    verificationUrl: "https://www.dicoding.com/certificates/53XEQ4E7YXRN",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    image: "/certificate/dicoding-memulai pemrograman dengan python-DuGWBR1e.webp",
    category: "Course",
    date: "29 Oktober 2024",
    credentialId: "0LZ044E2NP65",
    skills: ["Python", "OOP", "Data Structures", "Control Flow"],
    description:
      "Mempelajari fondasi bahasa pemrograman Python, struktur data (list, tuple, dictionary), paradigma Object-Oriented Programming (OOP), function, dan error handling.",
    level: "Beginner",
    verificationUrl: "https://www.dicoding.com/certificates/0LZ044E2NP65",
  },
  {
    title: "Golang Backend Development",
    issuer: "Sanbercode",
    image: "/certificate/golang-sanbercode-BwYqxc-J.webp",
    category: "Course",
    date: "27 Desember 2024",
    credentialId: "46459/697/SNBR/BOOTCAMP/I/2025",
    skills: ["Golang", "REST API", "Goroutines", "Backend Architecture", "PostgreSQL"],
    description:
      "Bootcamp intensif Go Backend Development meliputi arsitektur backend, konkurensi Go (goroutines/channels), pembuatan RESTful API, database ORM, dan deployment.",
    level: "Intermediate",
    verificationUrl: "https://sanbercode.com/certificate/in/5643131c-6d57-4a74-991e-ff3574fbd223",
  },
  {
    title: "Introduction to Deep Learning & Neural Networks with Keras",
    issuer: "IBM (Coursera)",
    image: "/certificate/introduction-to-deep-learning.webp",
    category: "Course",
    date: "24 Juni 2026",
    credentialId: "IBM-DL-KERAS-2026",
    skills: ["Deep Learning", "Neural Networks", "Keras", "Backpropagation", "Computer Vision"],
    description:
      "Fondasi deep learning bersertifikasi IBM yang mencakup artificial neural networks, backpropagation algorithms, activation functions, optimizers, dan implementasi model dengan Keras.",
    level: "Intermediate",
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM (Coursera)",
    image: "/certificate/machine-learning-ibm-DuIUTlc6.webp",
    category: "Course",
    date: "23 Desember 2025",
    credentialId: "IBM-ML-PY-2025",
    skills: ["Machine Learning", "Python", "Classification", "Regression", "Clustering", "SciPy"],
    description:
      "Kursus tersertifikasi IBM yang mendalami algoritma klasifikasi, regresi, clustering k-means, serta recommendation systems dengan implementasi dataset nyata.",
    level: "Intermediate",
  },

  // ── ACHIEVEMENTS & COMPETITIONS ──────────────────────────────────────────
  {
    title: "Juara 1 Web Development Competition - JKB Festival 2026",
    issuer: "HIMATRIS Politeknik Negeri Cilacap",
    image: "/certificate/achivement/jkb_fest.webp",
    category: "Achievement",
    date: "25 Juni 2026",
    credentialId: "0665/PL43.B01/KGT/2026",
    skills: ["Web Development", "UI/UX Design", "Full-Stack", "Problem Solving"],
    description:
      "Meraih Juara 1 dalam Web Development Competition JKB Festival 2026 yang diselenggarakan oleh Himpunan Mahasiswa Jurusan Komputer dan Bisnis di Ruang Auditorium Politeknik Negeri Cilacap.",
    level: "Nasional",
  },
  {
    title: "Juara 1 Software Development Competition - INSPIRE 1.0 2026",
    issuer: "Universitas Bunda Mulia (UBM)",
    image: "/certificate/achivement/softdev_inspire.webp",
    category: "Achievement",
    date: "26 Agustus 2026",
    credentialId: "157/E-CERT.IF.02/08/2026",
    skills: ["Software Engineering", "Full-Stack", "Technology Innovation", "System Architecture"],
    description:
      "Meraih Juara 1 Software Development Competition pada ajang INSPIRE 1.0 bertema 'Innovating Beyond Code: Technology for Meaningful Impact' di The UBM Lecture Hall.",
    level: "Nasional",
  },
  {
    title: "Juara 1 Web Design Online - EMOSTFET 11 2026",
    issuer: "Universitas Bangka Belitung (UBB)",
    image: "/certificate/achivement/8.webp",
    category: "Achievement",
    date: "11 September 2026",
    credentialId: "EMOSTFET-11-2026",
    skills: ["Web Design", "UI/UX", "Creative Layout", "Responsive Design"],
    description:
      "Meraih Juara 1 Web Design Online dalam rangkaian kegiatan Electrical Most Festival (EMOSTFET) 11 yang diselenggarakan oleh Himpunan Mahasiswa Elektro Universitas Bangka Belitung.",
    level: "Nasional",
  },
  {
    title: "1st Winner Web Creation Competition (WCC 2026)",
    issuer: "HMPSSI UNISNU Jepara",
    image: "/certificate/achivement/wcc.webp",
    category: "Achievement",
    date: "19 April 2026",
    credentialId: "119/SICI/HMPSSI/UNISNU/V/2026",
    skills: ["Interactive Web", "Frontend Development", "SMEs Digital Transformation", "Web Innovation"],
    description:
      "Meraih 1st Winner dalam 2026 Web Creation Competition bertema 'Digital Transformation of SMEs through Interactive Website Innovation' oleh Himpunan Mahasiswa Program Studi Sistem Informasi UNISNU Jepara.",
    level: "Nasional",
  },
  {
    title: "Juara 1 Kategori Web Development - IT Competition 8.0 (DINUSFEST 2026)",
    issuer: "Universitas Dian Nuswantoro (UDINUS)",
    image: "/certificate/winner 1st place itc competition.webp",
    category: "Achievement",
    date: "14 Februari 2026",
    credentialId: "013/B23.01/UDN-16/I/2026",
    skills: ["Web Development", "Frontend Innovation", "Teamwork", "Competitive Programming"],
    description:
      "Meraih Juara 1 Kategori Web Development pada IT Competition 8.0 dalam acara DINUSFEST 2026 Tingkat Nasional dengan tema 'Together We Can Achieve The Extraordinary'.",
    level: "Nasional",
  },
  {
    title: "Juara 1 Musabaqah Desain Aplikasi Komputer Al-Qur'an - MTQ UB XIX 2026",
    issuer: "Universitas Brawijaya",
    image: "/certificate/achivement/mtq.webp",
    category: "Achievement",
    date: "07 Mei 2026",
    credentialId: "00046/DST/UN10.A0301/B/DL.07.05/2026",
    skills: ["Application Design", "UI/UX", "Islamic Tech Solution", "Prototyping"],
    description:
      "Meraih Juara 1 Musabaqah Desain Aplikasi Komputer Al-Qur'an pada MTQ Universitas Brawijaya ke-XIX bertema 'Manifestasi Nilai-nilai Al-Qur'an Menuju Brawijaya Berprestasi Gemilang di Kancah Nasional'.",
    level: "Universitas",
  },
  {
    title: "Juara 3 Lomba Personal Website - T-ArtS 3.0",
    issuer: "HIMSI Universitas Atma Jaya Yogyakarta (UAJY)",
    image: "/certificate/achivement/winner_3rd_t-arts.webp",
    category: "Achievement",
    date: "26 Januari 2026",
    credentialId: "1383.94/SF-FTI/2025",
    skills: ["Personal Branding", "Web Performance", "Creative Design", "Modern CSS"],
    description:
      "Meraih Juara 3 Lomba Personal Website dalam rangkaian acara T-ArtS 3.0 bertema 'Unfold Your Digital Potential' yang diselenggarakan oleh HIMSI Fakultas Teknologi Industri UAJY.",
    level: "Nasional",
  },
  {
    title: "Juara 3 Lomba Landing Page - Dies Natalis HIMATIF ke-6",
    issuer: "HIMATIF Universitas Muhammadiyah PKU Surakarta",
    image: "/certificate/achivement/landing_page.webp",
    category: "Achievement",
    date: "25 Mei 2026",
    credentialId: "HIMATIF-UMPKU-LP-2026",
    skills: ["Landing Page Design", "Conversion Rate", "Frontend", "UI/UX"],
    description:
      "Meraih Juara 3 Lomba Landing Page dalam rangkaian acara Dies Natalis HIMATIF ke-6 yang diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika Universitas Muhammadiyah PKU Surakarta.",
    level: "Kompetisi",
  },
  {
    title: "Juara III Web Design Competition - Humanity OS",
    issuer: "HMPSI Universitas Duta Bangsa Surakarta (UDB)",
    image: "/certificate/achivement/web_deisgn_humanity_os.webp",
    category: "Achievement",
    date: "Agustus 2026",
    credentialId: "1037/UDB.D1/A.36-PP/VIII/2026",
    skills: ["Web Design", "Figma", "Design for Good", "Humanity OS"],
    description:
      "Meraih Juara III Tingkat Universitas dalam Web Design Competition bertema 'Humanity OS: Designing Website for a Better Tomorrow' yang diselenggarakan oleh HMPSI UDB Surakarta.",
    level: "Universitas",
  },
  {
    title: "Top 10 Grand Finalist National Data Analyst Case Competition (NDACC)",
    issuer: "HIMSI Universitas Lamappapoleonro (UNIPOL)",
    image: "/certificate/achivement/synapse_finalis.webp",
    category: "Achievement",
    date: "Juli 2026",
    credentialId: "008/PANPEL-NDACC/HIMSI-UNIPOL/VII/2026",
    skills: ["Data Analytics", "Case Study", "Business Intelligence", "Problem Solving"],
    description:
      "Terpilih sebagai Top 10 Grand Finalist pada National Data Analyst Case Competition (NDACC) dalam rangka SYNAPSE 2026 atas dedikasi dan keahlian analisis data.",
    level: "Nasional",
  },
  {
    title: "Sertifikat Penghargaan Magang - Programmer Web Tingkat Intermediate",
    issuer: "PT Hummatech Digital Indonesia",
    image: "/certificate/magang-hummatech.webp",
    category: "Achievement",
    date: "Desember 2023",
    credentialId: "No. 93626000229",
    skills: ["Laravel", "Full-Stack Development", "MISchool", "Mobile & Web"],
    description:
      "Sertifikat penghargaan atas kontribusi dalam pembuatan Management Information For School (Mischool) Berbasis Mobile dan Website selama magang dengan penilaian Programmer Web Tingkat Intermediate predikat 'Sangat Baik'.",
    level: "Professional",
  },
  {
    title: "Sertifikat Apresiasi Peserta Open Recruitment BCC 2026",
    issuer: "Basic Computing Community (BCC) FILKOM UB",
    image: "/certificate/intern-bcc.webp",
    category: "Achievement",
    date: "05 April 2026",
    credentialId: "SRT/OPREC BCC 2026/BCC FILKOM UB/IV/2026/084",
    skills: ["Basic Computing", "Software Engineering", "Teamwork", "FILKOM UB"],
    description:
      "Sertifikat apresiasi atas partisipasi dan kontribusi aktif sebagai peserta dalam mengikuti rangkaian kegiatan Open Recruitment Basic Computing Community (BCC) FILKOM Universitas Brawijaya 2026.",
    level: "Organisasi",
  },
];

export const certificates = CERTIFICATES;
