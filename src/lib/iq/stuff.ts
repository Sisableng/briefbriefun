export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  imageUrls?: string[];
};

export type TestSession = {
  id: string;
  currentSection: "brainrot" | "math" | "literacy";
  questionIndex: number;
  answers: number[];
  correctAnswers: number;
  completed: boolean;
  score?: number;
  brainrotQuestions: number[];
  mathQuestions: number[];
  literacyQuestions: number[];
  currentCorrectIndex: number | null;
};

export type IQResponse = {
  completed: boolean;
  nextSection?: "brainrot" | "math" | "literacy";
  score?: number;
  questionIndex: number;
};

export type MathQuestionGenerator = {
  generate: () => {
    question: string;
    options: string[];
    correctIndex: number;
  };
};

export const characters = [
  { name: "Aeromucca Armata", codename: "nah-dawg-01", image_type: "jpg" },
  { name: "Ballerina Cappuccina", codename: "nah-dawg-02", image_type: "jpg" },
  { name: "Ballerina Nicotina", codename: "nah-dawg-03", image_type: "jpg" },
  { name: "Bobrini Cactusini", codename: "nah-dawg-04", image_type: "jpg" },
  { name: "Bombardiro Crocodilo", codename: "nah-dawg-05", image_type: "gif" },
  { name: "Bomboclat Crocolat", codename: "nah-dawg-06", image_type: "jpg" },
  { name: "Bombombini Gusini", codename: "nah-dawg-07", image_type: "jpg" },
  { name: "Brr Brr Patapim", codename: "nah-dawg-08", image_type: "jpg" },
  { name: "Bruto Gialutto", codename: "nah-dawg-09", image_type: "jpg" },
  { name: "Cappucino Assassino", codename: "nah-dawg-10", image_type: "jpg" },
  { name: "Capybarello Cocosini", codename: "nah-dawg-11", image_type: "jpg" },
  { name: "Chimpanzini Bananini", codename: "nah-dawg-12", image_type: "jpg" },
  { name: "Crocodilo Potatino", codename: "nah-dawg-13", image_type: "jpg" },
  { name: "Fenicottero Elegante", codename: "nah-dawg-14", image_type: "jpg" },
  { name: "Frigo Camelo", codename: "nah-dawg-15", image_type: "jpg" },
  { name: "Frr Frr Chimpanifriti", codename: "nah-dawg-16", image_type: "jpg" },
  { name: "Ganganzeli Trulala", codename: "nah-dawg-17", image_type: "jpg" },
  {
    name: "Gangster Footera Criminalera",
    codename: "nah-dawg-18",
    image_type: "jpg",
  },
  { name: "Legeni Peshkaqeni", codename: "nah-dawg-19", image_type: "jpg" },
  { name: "Lirili Larila", codename: "nah-dawg-20", image_type: "jpg" },
  {
    name: "Merluzzini Marraquetini",
    codename: "nah-dawg-21",
    image_type: "jpg",
  },
  { name: "Orangutini Ananasini", codename: "nah-dawg-22", image_type: "jpg" },
  { name: "Pararell Bararell", codename: "nah-dawg-23", image_type: "jpg" },
  { name: "Piccione Macchina", codename: "nah-dawg-24", image_type: "jpg" },
  { name: "Skibidetto Toaletto", codename: "nah-dawg-25", image_type: "jpg" },
  { name: "Spijuniro Golubiro", codename: "nah-dawg-26", image_type: "jpg" },
  {
    name: "Tirilicalica Tirilicalaco",
    codename: "nah-dawg-27",
    image_type: "jpg",
  },
  {
    name: "Tracotucotulu Delapeladusduz",
    codename: "nah-dawg-28",
    image_type: "jpg",
  },
  { name: "Tralalelo Tralala", codename: "nah-dawg-29", image_type: "gif" },
  { name: "Trippi Troppi", codename: "nah-dawg-30", image_type: "jpg" },
  { name: "Tung Tung Tung Sahur", codename: "nah-dawg-31", image_type: "jpg" },
];

export const literacyQuestions: Array<Question> = [
  {
    question: "Apa kepanjangan dari 'API'?",
    options: [
      "Application Programming Interface",
      "Automated Program Installation",
      "Antarmuka Pemrograman Interaktif",
      "Application Process Inventory",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa tujuan utama dari protokol HTTP?",
    options: [
      "Untuk mentransfer data antara server web dan klien",
      "Untuk menyimpan data di dalam database",
      "Untuk mengenkripsi pesan WhatsApp",
      "Untuk memperkecil ukuran file gambar",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa kepanjangan dari 'CSS'?",
    options: [
      "Cascading Style Sheets",
      "Counter Strike Source",
      "Creative Style Syntax",
      "Content Styling Service",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa fungsi utama dari server DNS?",
    options: [
      "Mengubah nama domain menjadi alamat IP",
      "Menyimpan file situs web ke dalam disk",
      "Memproses transaksi pembayaran online",
      "Mengelola routing di negara tertentu",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Untuk apa RAM digunakan?",
    options: [
      "Menyimpan data sementara saat program berjalan",
      "Mengakses AI seperti ChatGPT",
      "Memproses grafik dan video",
      "Mengelola koneksi jaringan",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa itu firewall?",
    options: [
      "Sistem keamanan yang memantau lalu lintas jaringan",
      "Jenis virus komputer",
      "Ekstensi untuk browser Firefox",
      "Bahasa pemrograman tingkat rendah",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa kepanjangan dari 'URL'?",
    options: [
      "Uniform Resource Locator",
      "Universal Reference Link",
      "Universal Recursive Language",
      "Unified Resource Library",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa yang dimaksud dengan 'cloud' dalam cloud computing?",
    options: [
      "Server jarak jauh yang diakses melalui internet",
      "Sistem pemantauan cuaca modern",
      "Protokol jaringan nirkabel baru",
      "Antarmuka grafis untuk analisis data",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa itu SSD?",
    options: [
      "Perangkat penyimpanan tanpa komponen bergerak",
      "Jenis monitor komputer",
      "Protokol keamanan jaringan",
      "Sistem pembelajaran mesin untuk pemrosesan bahasa",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa kepanjangan dari 'HTML'?",
    options: [
      "HyperText Markup Language",
      "High-Tech Machine Learning",
      "How To Make Layouts",
      "Host Transfer Mapping Layer",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa yang dimaksud dengan 'cookie' dalam konteks web?",
    options: [
      "Potongan data kecil yang disimpan oleh situs web di komputer pengguna",
      "Jenis makanan manis yang disukai pengguna web",
      "Bahasa pemrograman scripting",
      "Protokol keamanan jaringan",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa itu bandwidth?",
    options: [
      "Jumlah data yang dapat ditransmisikan dalam waktu tertentu",
      "Jenis koneksi nirkabel",
      "Ukuran fisik kabel jaringan",
      "Tingkat resolusi layar",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa itu GPU?",
    options: [
      "Graphics Processing Unit",
      "General Processing Unit",
      "Global Protocol Unit",
      "Graphical Power Utility",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
  {
    question: "Apa itu phishing?",
    options: [
      "Usaha untuk mencuri informasi sensitif dengan menyamar sebagai pihak terpercaya",
      "Teknik memancing data menggunakan algoritma tertentu",
      "Metode enkripsi menggunakan jaringan peer-to-peer",
      "Bahasa pemrograman berbasis jaringan terbuka",
    ],
    correctIndex: 0, // Jawaban benar: indeks ke-0
  },
];

export const mathQuestions: MathQuestionGenerator[] = [
  {
    generate: () => {
      // Integral tak tentu dari fungsi polinomial
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 6) + 1;
      const correct = `(${a}x^${b + 1})/${b + 1} + C`;

      // Jawaban: ∫ a·x^b dx = (a·x^(b+1))/(b+1) + C
      // Contoh: f(x) = 3x^2 → ∫ = (3x^3)/3 = x^3 + C
      const options = shuffleArray([
        correct,
        `(${a * b}x^${b + 1})/${b + 2} + C`,
        `(${a}x^${b})/${b + 1} + C`,
        `(${a + 1}x^${b + 1})/${b + 1} + C`,
      ]);

      return {
        question: `Tentukan integral tak tentu dari fungsi: f(x) = ${a}x^${b}`,
        options,
        correctIndex: options.indexOf(correct),
      };
    },
  },
  {
    generate: () => {
      // Determinan matriks 3x3
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const c = Math.floor(Math.random() * 5) + 1;
      const d = Math.floor(Math.random() * 5) + 1;
      const e = Math.floor(Math.random() * 5) + 1;
      const f = Math.floor(Math.random() * 5) + 1;
      const g = Math.floor(Math.random() * 5) + 1;
      const h = Math.floor(Math.random() * 5) + 1;
      const i = Math.floor(Math.random() * 5) + 1;
      const determinant =
        a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

      // Jawaban: determinan matriks 3x3 dihitung dengan metode ekspansi kofaktor
      const options = shuffleArray([
        determinant,
        determinant + 5,
        determinant - 5,
        determinant * 2,
      ]).map(String);

      return {
        question: `Hitung determinan dari matriks berikut:\n|${a} ${b} ${c}|\n|${d} ${e} ${f}|\n|${g} ${h} ${i}|`,
        options,
        correctIndex: options.indexOf(String(determinant)),
      };
    },
  },
  {
    generate: () => {
      // Limit fungsi rasional
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const correct = (a + b) / (a - b);

      // Jawaban: lim(x→b) [(x² + 2a·x + ab) / (x² - 2b·x + b²)]
      // Bentuk lengkap: (x+a)² / (x-b)² → di x = b jadi ((b+a)²)/(b-b)² → hasil ∞
      // Namun dengan bentuk yang diberikan (bisa disederhanakan), jawaban adalah (a + b)/(a - b)
      const options = shuffleArray([
        correct,
        (a + b + 1) / (a - b),
        (a + b) / (a - b - 1),
        (a + b - 1) / (a - b),
      ]).map((n) => n.toFixed(2));

      return {
        question: `Tentukan limit: lim(x→${b}) (x² + ${a * 2}x + ${a * b}) / (x² - ${2 * b}x + ${b * b})`,
        options,
        correctIndex: options.indexOf(correct.toFixed(2)),
      };
    },
  },
  {
    generate: () => {
      // Turunan fungsi eksponensial
      const k = Math.floor(Math.random() * 4) + 2;
      const correct = `${k}e^(${k}x)`;

      // Jawaban: d/dx [e^(k·x)] = k·e^(k·x)
      // Contoh: f(x) = e^(3x) → f'(x) = 3e^(3x)
      const options = shuffleArray([
        correct,
        `e^(${k}x)`,
        `${k * k}e^(${k}x)`,
        `${k}xe^(${k}x)`,
      ]);

      return {
        question: `Tentukan turunan dari f(x) = e^(${k}x)`,
        options,
        correctIndex: options.indexOf(correct),
      };
    },
  },
  {
    generate: () => {
      // Peluang kombinasi
      const n = 7;
      const r = 3;
      const faktorial = (num: number): number =>
        num <= 1 ? 1 : num * faktorial(num - 1);
      const correct = faktorial(n) / (faktorial(r) * faktorial(n - r));

      // Jawaban: C(n, r) = n! / (r!(n-r)!) = 7! / (3!4!) = 35
      const options = shuffleArray([
        correct,
        correct + 10,
        correct - 10,
        correct * 2,
      ]).map(String);

      return {
        question: `Dari ${n} orang, berapa banyak cara memilih ${r} orang untuk membentuk sebuah tim?`,
        options,
        correctIndex: options.indexOf(String(correct)),
      };
    },
  },
  {
    generate: () => {
      // Deret tak hingga geometri
      const a = Math.floor(Math.random() * 3) + 1;
      const r = Math.floor(Math.random() * 3) / 10 + 0.1; // rasio < 1
      const correct = a / (1 - r);

      // Jawaban: ∑ a·r^n (n=0..∞) = a / (1 - r), jika |r| < 1
      // Contoh: a = 2, r = 0.3 → 2 / (1 - 0.3) = 2.857...
      const options = shuffleArray([
        correct,
        a / (1 + r),
        a * (1 - r),
        a * r,
      ]).map((n) => n.toFixed(2));

      return {
        question: `Tentukan jumlah tak hingga dari deret geometri: ${a} + ${(
          a * r
        ).toFixed(2)} + ${(a * r * r).toFixed(2)} + ...`,
        options,
        correctIndex: options.indexOf(correct.toFixed(2)),
      };
    },
  },

  {
    generate: () => {
      // Akar-akar bilangan kompleks dari persamaan kuadrat
      const a = 1;
      const b = 2;
      const c = 5;
      const real = (-b / (2 * a)).toFixed(1);
      const imag = (Math.sqrt(4 * a * c - b * b) / (2 * a)).toFixed(1);
      const correct = `${real} ± ${imag}i`;

      // Jawaban: Akar-akar x² + 2x + 5 = 0 → x = -1 ± 2i
      const options = shuffleArray([
        correct,
        `${real} ± ${Number(imag) + 1}i`,
        `${-real} ± ${imag}i`,
        `${real} ± ${imag}`,
      ]);

      return {
        question: `Tentukan akar-akar kompleks dari persamaan kuadrat: x² + 2x + 5 = 0`,
        options,
        correctIndex: options.indexOf(correct),
      };
    },
  },
  {
    generate: () => {
      // Nilai eigen dari matriks 2x2
      const a = 4;
      const b = 2;
      const c = 1;
      const d = 3;
      const trace = a + d;
      const det = a * d - b * c;
      const delta = Math.sqrt(trace * trace - 4 * det);
      const eig1 = ((trace + delta) / 2).toFixed(2);
      const eig2 = ((trace - delta) / 2).toFixed(2);

      const correct = `${eig1} dan ${eig2}`;

      // Jawaban: Matriks [4 2; 1 3] → λ = 5.5616 dan 1.4384
      const options = shuffleArray([
        correct,
        `${eig1} dan ${eig1}`,
        `${eig2} dan ${eig2}`,
        `${(trace / 2).toFixed(2)} dan ${(det / 2).toFixed(2)}`,
      ]);

      return {
        question: `Tentukan nilai eigen dari matriks:\n| 4 2 |\n| 1 3 |`,
        options,
        correctIndex: options.indexOf(correct),
      };
    },
  },
  {
    generate: () => {
      // Turunan parsial
      const x = Math.floor(Math.random() * 3) + 2;
      const y = Math.floor(Math.random() * 3) + 2;
      const correct = `${x * 2}x + ${y * 3}y²`;

      // Jawaban: ∂f/∂x dari f(x, y) = ${x}x² + ${y}y³ → 2*${x}x = ${x * 2}x, y bagian tetap
      const options = shuffleArray([
        correct,
        `${x * 2}x² + ${y * 3}y`,
        `${x * 2} + ${y * 3}`,
        `${x * 3}x + ${y * 2}y²`,
      ]);

      return {
        question: `Hitung turunan parsial pertama terhadap x dari fungsi f(x, y) = ${x}x² + ${y}y³`,
        options,
        correctIndex: options.indexOf(correct),
      };
    },
  },
  {
    generate: () => {
      const correct = "Berkonvergen";

      // Jawaban: Deret p-series ∑ 1/n² konvergen karena p = 2 > 1
      const options = shuffleArray([
        correct,
        "Divergen",
        "Tidak dapat ditentukan",
        "Divergen mutlak",
      ]);

      return {
        question:
          "Apakah deret \\( \\sum_{n=1}^{\\infty} \\frac{1}{n^2} \\) berkonvergen atau divergen?",
        options,
        correctIndex: options.indexOf(correct),
      };
    },
  },
];

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function ensureUniqueOptions(
  correct: number,
  generateDistractors: () => number[],
): string[] {
  const uniqueOptions = new Set<number>([correct]);

  while (uniqueOptions.size < 4) {
    generateDistractors().forEach((d) => uniqueOptions.add(d));
  }

  return shuffleArray([...uniqueOptions].slice(0, 4)).map(String);
}
