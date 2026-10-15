import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Download, ChevronRight, Sparkles, Star, Users, Heart, User, BookOpen } from 'lucide-react';

// --- 1. KAMUS DATA & NARASI PSIKOLOGIS MENDALAM ---
const NUMEROLOGY_DICTIONARY = {
  1: { 
    archetype: "The Initiator (Sang Pionir)", 
    traits: "Kepemimpinan, Mandiri, Inovatif, Percaya Diri", 
    shadow: "Keras kepala, Terlalu mendominasi, Takut terlihat lemah", 
    narasi: "Secara psikologis, jiwa Anda menolak keras untuk sekadar menjadi pengikut. Seperti percikan api pertama yang menyalakan peradaban, Anda terlahir dengan dorongan murni untuk mencipta, memimpin, dan membabat alas yang belum pernah dilewati orang lain. Ada kemandirian yang absolut di dalam diri Anda, namun di balik ketegasan itu, sering kali tersembunyi rasa sepi yang mendalam—kesepian dari seseorang yang harus selalu berdiri di depan.\n\nSeringkali Anda merasa memikul beban dunia di pundak Anda sendirian, karena Anda sulit mempercayai orang lain untuk melakukan sesuatu sebaik diri Anda. Tantangan terbesar jiwa Anda bukanlah menaklukkan dunia, melainkan menaklukkan ego Anda sendiri dan belajar bahwa meminta bantuan bukanlah tanda kelemahan, melainkan puncak dari kedewasaan emosional.", 
    pesan: "Dunia menanti gagasan orisinalmu. Berhentilah meminta izin untuk menjadi hebat, dan izinkan dirimu untuk sesekali bersandar." 
  },
  2: { 
    archetype: "The Harmonizer (Sang Penyelaras)", 
    traits: "Diplomasi, Empati, Kerjasama, Intuisi Tajam", 
    shadow: "Terlalu sensitif, Takut konflik, Mengorbankan diri", 
    narasi: "Anda adalah cermin bagi jiwa orang lain. Memiliki kepekaan emosional dan radar empati yang sangat tajam, Anda bisa 'mendengar' apa yang tidak diucapkan orang di ruangan. Bakat psikologis Anda adalah merajut kembali energi yang terpecah menjadi harmoni. Anda adalah pendengar, penyembuh, dan penjaga kedamaian.\n\nNamun, kutukan dari kepekaan ini adalah Anda sering kali menyerap emosi dan racun orang lain bak spons. Ketakutan terbesar Anda adalah konflik dan penolakan, yang membuat Anda sering memakai 'topeng orang baik' hingga mengorbankan batas-batas pribadi Anda. Pelajaran karma Anda adalah menemukan suara Anda sendiri dan berani berkata 'TIDAK' tanpa merasa bersalah.", 
    pesan: "Kedamaian sejati tidak lahir dari penghindaran konflik, melainkan keberanian menghadapinya dengan kasih dan batasan yang tegas." 
  },
  3: { 
    archetype: "The Creator (Sang Pencipta)", 
    traits: "Komunikatif, Ekspresif, Artistik, Optimis", 
    shadow: "Kurang fokus, Cenderung dramatis, Memendam luka di balik tawa", 
    narasi: "Ada kanvas kosmik yang luas di dalam diri Anda. Jiwa Anda bergetar dengan frekuensi kegembiraan, kreativitas, dan pesona kekanak-kanakan yang tak pernah padam. Anda memiliki karunia untuk menerjemahkan emosi menjadi kata-kata, seni, dan tawa yang menghidupkan suasana. Secara psikologis, Anda membutuhkan panggung—bukan untuk arogansi, tetapi karena jiwa Anda mati jika tidak berekspresi.\n\nNamun, di balik senyum dan tawa yang Anda bagikan, sering kali ada kerentanan dan kesedihan yang Anda sembunyikan rapat-rapat. Anda terbiasa menjadi 'cahaya' bagi orang lain sehingga lupa bahwa Anda pun berhak untuk merasa hancur. Jangan biarkan bakat-bakat brilian Anda tercerai-berai karena kurangnya fokus dan kedisiplinan.", 
    pesan: "Ekspresikan semua warnamu, baik terang maupun gelap. Suara dan karyamu adalah obat, tidak hanya bagi dunia, tapi bagi dirimu sendiri." 
  },
  4: { 
    archetype: "The Builder (Sang Pembangun)", 
    traits: "Disiplin, Stabil, Pekerja Keras, Terstruktur", 
    shadow: "Kaku, Terlalu serius, Takut pada perubahan", 
    narasi: "Anda adalah batu karang di tengah badai realitas. Sementara orang lain hanya bermimpi di awan, Anda membumikan ide tersebut menjadi kenyataan dengan keringat dan sistem. Alam semesta mengaruniakan Anda logika, kesetiaan, dan fondasi moral yang sangat kuat. Secara psikologis, Anda mendambakan keamanan dan keteraturan untuk meredam kecemasan eksistensial Anda.\n\nSeringkali orang bersandar pada Anda karena Anda terasa begitu aman. Sayangnya, ini membuat Anda rentan menjadi pekerja keras yang lupa cara menikmati hidup. Anda sering menjebak diri dalam rutinitas yang kaku dan takut pada hal-hal yang tidak bisa dikontrol. Belajarlah melepaskan sedikit kendali; keajaiban sering kali terjadi di luar rencana yang tertulis.", 
    pesan: "Fondasi yang Anda bangun akan bertahan lintas generasi. Namun ingatlah, hidup ini adalah tarian, bukan sekadar barisan baris-berbaris." 
  },
  5: { 
    archetype: "The Seeker (Sang Penjelajah)", 
    traits: "Bebas, Adaptif, Petualang, Karismatik", 
    shadow: "Mudah bosan, Kurang komitmen, Melarikan diri dari masalah", 
    narasi: "Angin kebebasan memanggil jiwa Anda! Secara psikologis, Anda alergi terhadap stagnasi, rutinitas, dan segala bentuk kurungan. Anda ditakdirkan sebagai katalisator perubahan, meruntuhkan tradisi yang sudah usang, dan mencicipi setiap rasa yang ditawarkan kehidupan. Otak Anda bekerja sangat cepat, membuat Anda sangat karismatik, cerdik, dan mudah beradaptasi.\n\nNamun, bayangan gelap dari angka ini adalah kecenderungan untuk melarikan diri (escapism) ketika situasi menuntut komitmen atau ketahanan emosional. Kegelisahan batin sering membuat Anda berpindah-pindah pekerjaan, hubungan, atau tempat tinggal sebelum sesuatu sempat berbuah. Kunci kedewasaan Anda adalah menemukan kebebasan di dalam komitmen.", 
    pesan: "Petualangan terbesarmu bukanlah berkeliling dunia, melainkan berani menyelami dan menetap pada kedalaman dirimu sendiri." 
  },
  6: { 
    archetype: "The Nurturer (Sang Pengasuh)", 
    traits: "Penyayang, Tanggung Jawab, Harmonis, Romantis", 
    shadow: "Sindrom penyelamat (Savior complex), Suka mengontrol, Martir", 
    narasi: "Jantung Anda berdetak dengan frekuensi penyembuhan kosmik. Orang-orang secara naluriah tertarik kepada Anda saat mereka terluka, karena jiwa Anda memancarkan energi 'Rumah'. Anda menjunjung tinggi keadilan, keindahan, dan ikatan keluarga. Anda adalah sosok pelindung yang rela memberikan apa saja untuk melihat orang yang Anda cintai bahagia.\n\nTantangan psikologis terbesar Anda adalah 'Savior Complex'—kebutuhan mendalam untuk memperbaiki atau menyelamatkan orang lain agar Anda merasa berharga. Seringkali Anda ikut campur terlalu jauh dan menjadi kelelahan sendiri, berujung pada rasa tidak dihargai (martyrdom). Pelajaran Anda adalah mencintai tanpa perlu memperbaiki.", 
    pesan: "Sebelum Anda menyelamatkan seluruh dunia, pastikan Anda telah menyelamatkan dan mencintai diri Anda sendiri tanpa syarat." 
  },
  7: { 
    archetype: "The Analyst (Pencari Kebenaran)", 
    traits: "Spiritual, Analitis, Introspektif, Cerdas", 
    shadow: "Menyendiri, Skeptis, Sombong secara intelektual", 
    narasi: "Pikiran Anda adalah labirin perpustakaan kuno yang tak berujung. Anda memiliki mata batin yang tajam, mampu melihat menembus kepalsuan duniawi dan ilusi sosial. Anda tidak pernah puas dengan jawaban dangkal; Anda mengupas realitas hingga ke intinya. Rasa sepi yang kadang Anda alami sebenarnya adalah ruang sakral yang disiapkan semesta agar Anda bisa mengunduh kebijaksanaan kosmik.\n\nNamun, kecerdasan dan kemampuan analitis ini sering membuat Anda terjebak di dalam kepala Anda sendiri. Anda cenderung overthinking, meragukan segalanya, dan membangun tembok es untuk menjaga jarak emosional dari orang lain. Ketakutan terbesar Anda adalah terlihat bodoh atau disakiti jika terlalu membuka diri. Turunlah dari menara gading Anda.", 
    pesan: "Tidak semua hal di dunia ini harus masuk akal. Izinkan hatimu untuk memimpin saat logikamu kehabisan jawaban." 
  },
  8: { 
    archetype: "The Achiever (Sang Alkemis Materi)", 
    traits: "Ambisius, Eksekutif, Berkelimpahan, Kuat", 
    shadow: "Gila kerja, Haus kekuasaan, Takut kemiskinan/kelemahan", 
    narasi: "Anda memegang kunci antara dunia spiritual dan material. Secara psikologis, Anda sangat peka terhadap dinamika kekuasaan dan nilai intrinsik sesuatu. Anda ditakdirkan untuk menguasai alkimia kesuksesan—mengubah visi abstrak menjadi kekayaan dan otoritas nyata. Anda tangguh, berani mengambil risiko besar, dan mampu bangkit dari kebangkrutan atau kejatuhan yang parah.\n\nTantangan utama Anda sering kali berakar pada trauma tentang ketidakberdayaan. Ada dorongan bawah sadar untuk mengontrol segalanya agar tidak terluka. Jika energi ini tidak diselaraskan, Anda bisa berubah menjadi sosok yang materialistis, mengukur nilai manusia dari hartanya, dan bekerja hingga mengorbankan jiwa. Belajarlah bahwa kekuasaan sejati adalah tentang pemberdayaan.", 
    pesan: "Jadilah penguasa atas materimu, bukan hamba baginya. Kelimpahan dan kekuasaanmu adalah alat dari semesta untuk membawa dampak besar." 
  },
  9: { 
    archetype: "The Philanthropist (Sang Jiwa Lama)", 
    traits: "Welas Asih, Kemanusiaan, Bijaksana, Toleran", 
    shadow: "Terikat masa lalu, Kehilangan identitas diri, Merasa jadi korban", 
    narasi: "Anda adalah The Old Soul (Jiwa Lama). Anda lahir membawa memori, luka, dan kebijaksanaan dari banyak masa kehidupan sebelumnya. Hati Anda sangat luas, cukup besar untuk memeluk penderitaan seluruh dunia. Fokus tertinggi hidup Anda bukanlah pencapaian ego pribadi, melainkan pengabdian, humanisme, dan penyelesaian siklus karma.\n\nKarena Anda membawa energi penyelesaian, hidup Anda sering kali diwarnai oleh keharusan untuk merelakan. Orang, situasi, dan tempat akan datang silih berganti. Luka psikologis Anda biasanya berasal dari kesulitan untuk melepaskan genggaman pada apa yang sudah seharusnya berakhir. Anda harus belajar memaafkan—bukan untuk membebaskan orang yang bersalah, tetapi untuk membebaskan jiwa Anda sendiri.", 
    pesan: "Maafkan masa lalu dan lepaskanlah dengan penuh cinta. Misi kosmikmu adalah menjadi teladan welas asih bagi umat manusia." 
  },
  11: { 
    archetype: "The Intuitive (Master Pencerah)", 
    traits: "Intuitif Ekstrem, Visioner, Inspiratif, Peka", 
    shadow: "Kecemasan tinggi, Depresi, Terbebani potensi sendiri", 
    narasi: "Sebagai Master Number, Anda beroperasi pada voltase listrik spiritual yang sangat tinggi. Sistem saraf Anda sangat peka terhadap energi halus di sekeliling Anda. Intuisi Anda bukanlah sekadar firasat, melainkan saluran langsung (channeling) dari kecerdasan kosmik. Anda memiliki aura misterius yang menginspirasi dan membawa pencerahan bagi siapa saja yang bersinggungan dengan Anda.\n\nNamun, hidup dengan antena spiritual yang terbuka lebar adalah beban yang berat. Anda mungkin sering merasa seperti 'alien' yang tidak cocok di bumi. Jika Anda tidak memiliki sistem penyaluran (grounding) yang baik, energi yang berlebih ini bisa meledak menjadi kecemasan yang parah, fobia, atau kebingungan arah. Anda dituntut untuk memiliki keimanan yang radikal.", 
    pesan: "Percayai bisikan batinmu lebih dari hiruk-pikuk dunia. Kamu adalah mercusuar bagi jiwa-jiwa yang tersesat dalam kegelapan." 
  },
  22: { 
    archetype: "The Master Builder (Arsitek Kosmik)", 
    traits: "Manifestasi Skala Besar, Praktis, Kuat, Visioner Realistis", 
    shadow: "Takut gagal, Beban ekspektasi, Merasa tidak cukup", 
    narasi: "Anda mewarisi potensi tertinggi dalam numerologi. Anda diberkati secara ganda: memiliki visi idealis yang menembus langit (seperti angka 11), sekaligus memiliki tangan pekerja keras yang merangkak di bumi (seperti angka 4). Anda dirancang secara mental dan spiritual untuk memimpin institusi, gerakan sosial, atau karya agung berskala internasional yang akan mengubah peradaban.\n\nTantangan psikologis Anda sepadan dengan besarnya potensi Anda. Ketakutan akan kegagalan sering kali membuat Anda lumpuh bahkan sebelum melangkah. Ada beban tak kasat mata bahwa Anda 'harus' mencapai sesuatu yang monumental, yang terkadang membuat Anda justru menolak panggilan jiwa Anda dan memilih hidup aman. Singkirkan rasa tidak pantas itu.", 
    pesan: "Jangan bersembunyi di balik zona nyaman. Semesta meminjamkan tangannya padamu untuk membangun mahakarya; melangkahlah dengan gagah." 
  },
  33: { 
    archetype: "The Teacher (Avatar Kasih Sayang)", 
    traits: "Cinta Kasih Universal, Penyembuh, Guru Spiritual", 
    shadow: "Mengorbankan diri hingga hancur, Memikul penderitaan orang lain", 
    narasi: "Ini adalah getaran dari cinta tanpa syarat. Anda memancarkan aura penyembuhan yang membuat kehadiran Anda saja sudah cukup menenangkan batin orang yang sedang hancur. Anda memiliki potensi untuk menjadi guru spiritual, seniman agung, atau figur yang mengorbankan ego pribadi demi mengangkat penderitaan kelompok yang lebih besar.\n\nTantangan emosional Anda adalah kemampuan menampung rasa sakit dunia yang sering kali membuat jiwa Anda kelelahan. Anda merasa bertanggung jawab atas kesedihan orang lain dan sering kali mengorbankan kesejahteraan fisik maupun mental Anda sendiri hingga tak bersisa. Tugas tersulit Anda di kehidupan ini adalah mempraktikkan kasih sayang itu kepada diri sendiri terlebih dahulu.", 
    pesan: "Cintamu mampu menyembuhkan dunia, tetapi ingatlah: semesta memintamu untuk mencintai dan menyembuhkan dirimu sendiri terlebih dahulu." 
  }
};

const PERSONAL_YEAR_MEANINGS = {
  1: { tema: "Awal Baru & Inisiatif", deskripsi: "Titik nol Anda. Waktu kosmik yang sempurna untuk memulai lembaran baru." },
  2: { tema: "Hubungan & Kesabaran", deskripsi: "Tahun untuk melambat. Fokuslah pada cinta, kemitraan, dan diplomasi." },
  3: { tema: "Ekspresi & Peluang Sosial", deskripsi: "Tahun yang menyenangkan! Energi kreativitas Anda sedang memuncak." },
  4: { tema: "Kerja Keras & Fondasi", deskripsi: "Tahun ini menuntut kedisiplinan dan kerja keras untuk masa depan." },
  5: { tema: "Perubahan & Kebebasan", deskripsi: "Tahun penuh dinamika, perjalanan, dan perubahan tak terduga." },
  6: { tema: "Keluarga & Tanggung Jawab", deskripsi: "Fokus kosmik bergeser ke penyembuhan hubungan keluarga dan rumah." },
  7: { tema: "Spiritualitas & Introspeksi", deskripsi: "Tahun untuk mundur sejenak, evaluasi diri, dan pendalaman spiritual." },
  8: { tema: "Panen Finansial & Kekuasaan", deskripsi: "Kerja keras di tahun sebelumnya membuahkan hasil materi nyata." },
  9: { tema: "Penyelesaian & Pelepasan", deskripsi: "Waktunya melepaskan beban yang tidak lagi melayani pertumbuhan Anda." }
};

const COMPATIBILITY_RULES = {
  1: { natural: [1, 5, 7], comp: [2, 3, 9], challenge: [4, 6, 8] },
  2: { natural: [2, 4, 8], comp: [1, 3, 6], challenge: [5, 7, 9] },
  3: { natural: [3, 6, 9], comp: [1, 2, 5], challenge: [4, 7, 8] },
  4: { natural: [2, 4, 8], comp: [6, 7], challenge: [1, 3, 5, 9] },
  5: { natural: [1, 5, 7], comp: [3, 9], challenge: [2, 4, 6, 8] },
  6: { natural: [2, 3, 6, 9], comp: [4, 8], challenge: [1, 5, 7] },
  7: { natural: [1, 5, 7], comp: [4], challenge: [2, 3, 6, 8, 9] },
  8: { natural: [2, 4, 8], comp: [6], challenge: [1, 3, 5, 7, 9] },
  9: { natural: [3, 6, 9], comp: [1, 2, 5], challenge: [4, 7, 8] },
};

const PYTHAGOREAN_MAP = { A:1, J:1, S:1, B:2, K:2, T:2, C:3, L:3, U:3, D:4, M:4, V:4, E:5, N:5, W:5, F:6, O:6, X:6, G:7, P:7, Y:7, H:8, Q:8, Z:8, I:9, R:9 };
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

// --- 2. LOGIKA KALKULASI & SINTESIS ---
const reduceNumber = (num, keepMaster = true) => {
  let current = num;
  while (current > 9) {
    if (keepMaster && (current === 11 || current === 22 || current === 33)) return current;
    current = current.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return current;
};

const getBaseNumber = (num) => (num === 11 ? 2 : num === 22 ? 4 : num === 33 ? 6 : num);

const checkCompatibility = (pathA, pathB) => {
  const baseA = getBaseNumber(pathA);
  const baseB = getBaseNumber(pathB);
  const rules = COMPATIBILITY_RULES[baseA];
  
  if (rules.natural.includes(baseB)) {
    return { status: "Sangat Selaras (Natural Match)", score: 95, color: "text-emerald-400 border-emerald-500/30", bg: "bg-emerald-500/10", deskripsi: "Kalian memiliki frekuensi jiwa yang sama. Komunikasi berjalan tanpa hambatan, dan kalian saling memahami tanpa perlu banyak menjelaskan." };
  } else if (rules.comp.includes(baseB)) {
    return { status: "Saling Melengkapi (Complementary)", score: 75, color: "text-cyan-400 border-cyan-500/30", bg: "bg-cyan-500/10", deskripsi: "Kalian memiliki karakter yang berbeda, namun justru kekuatan satu pihak menutupi kelemahan pihak lain. Tim yang sangat solid jika ego ditekan." };
  } else {
    return { status: "Penuh Pelajaran (Challenging)", score: 45, color: "text-amber-400 border-amber-500/30", bg: "bg-amber-500/10", deskripsi: "Hubungan ini adalah guru spiritual bagi kalian. Ada banyak perbedaan cara pandang yang mendasar. Kunci suksesnya adalah kompromi ekstra dan memberi ruang privasi." };
  }
};

const calculateCoreNumbers = (memberData) => {
  const [year, month, day] = memberData.dob.split('-');
  const birthNum = reduceNumber(parseInt(day, 10));
  const lifePathNum = reduceNumber(reduceNumber(parseInt(day, 10)) + reduceNumber(parseInt(month, 10)) + reduceNumber(parseInt(year, 10)));
  
  const cleanName = memberData.name.toUpperCase().replace(/[^A-Z]/g, '');
  let destinySum = 0, soulSum = 0, personalitySum = 0;
  
  for (let char of cleanName) {
    const val = PYTHAGOREAN_MAP[char] || 0;
    destinySum += val;
    if (VOWELS.has(char)) soulSum += val;
    else personalitySum += val;
  }
  
  const phoneDigits = memberData.phone.replace(/\D/g, '');
  const currentYear = new Date().getFullYear();
  const personalYearSum = reduceNumber(parseInt(day, 10)) + reduceNumber(parseInt(month, 10)) + reduceNumber(currentYear);

  return { 
    ...memberData,
    birthNum, 
    lifePathNum, 
    destinyNum: reduceNumber(destinySum), 
    soulNum: reduceNumber(soulSum), 
    personalityNum: reduceNumber(personalitySum), 
    phoneNum: phoneDigits ? reduceNumber(phoneDigits.split('').reduce((a, b) => a + parseInt(b, 10), 0)) : null, 
    personalYearNum: reduceNumber(personalYearSum, false), 
    currentYear 
  };
};

// --- FUNGSI SINTESIS PSIKOLOGIS MENDALAM ---
const generateSynthesis = (cores) => {
  const lp = NUMEROLOGY_DICTIONARY[cores.lifePathNum];
  const destiny = NUMEROLOGY_DICTIONARY[cores.destinyNum];
  const soul = NUMEROLOGY_DICTIONARY[cores.soulNum];
  const personality = NUMEROLOGY_DICTIONARY[cores.personalityNum];
  const nama = cores.name.split(' ')[0]; // Panggilan nama depan

  return `*Surat Analisis Psikologis untuk ${nama}...*\n\nSetiap jiwa yang lahir ke bumi membawa cetak biru unik yang membentuk arah takdirnya. Berdasarkan konstelasi angka kelahiran Anda, panggung utama kehidupan yang semesta persiapkan untuk Anda adalah jalur **${lp.archetype}**. Di sepanjang hidup Anda, baik Anda sadari maupun tidak, Anda akan selalu ditarik menuju situasi yang menuntut Anda untuk memancarkan sifat dasar ini.\n\nMenariknya, ada lapisan psikologis yang kompleks di dalam diri Anda. Di mata publik atau orang yang baru mengenal Anda, impresi yang Anda pancarkan (Personality Number) adalah energi dari **${personality.archetype}**. Topeng sosial ini membuat Anda terlihat ${personality.traits.toLowerCase()}. Namun, jauh di lubuk batin Anda yang terdalam—di ruang sunyi tempat segala keinginan emosional bersemayam (Soul Urge)—ada kerinduan otentik untuk hidup sebagai **${soul.archetype}**. \n\nTerkadang, konflik batin yang sering Anda rasakan dalam hidup (seperti rasa cemas, kegelisahan, atau perasaan tidak utuh) berasal dari ketidakselarasan antara tuntutan sosial luar Anda dengan hasrat jiwa sejati Anda. \n\nBeruntungnya, Semesta tidak membiarkan Anda turun ke bumi dengan tangan kosong. Takdir memberkati Anda dengan bakat alami dan senjata rahasia (Destiny Number) dari **${destiny.archetype}**. Inilah keahlian sejati Anda. Jika Anda mampu mengasah intuisi, merangkul kelebihan ini, dan secara sadar mengendalikan bayangan gelap (shadow) Anda—seperti kecenderungan untuk ${lp.shadow.toLowerCase()}—maka Anda akan mekar menjadi versi tertinggi dari diri Anda.\n\n**Refleksi Kesimpulan:**\nPerjalanan takdir Anda bukanlah tentang menemukan diri yang hilang, melainkan melepaskan semua lapisan yang bukan milik Anda. Teruslah berjalan dengan keyakinan, karena ${lp.pesan}`;
};


// --- 3. KOMPONEN VISUAL (DESTINY MATRIX) ---
const DestinyMatrixMap = ({ cores }) => {
  const size = 300, center = size / 2, radius = 100;
  const nodes = [
    { label: "Spiritual", val: cores.soulNum, angle: -90 }, { label: "Future", val: cores.destinyNum, angle: -45 },
    { label: "Social", val: cores.personalityNum, angle: 0 }, { label: "Material", val: cores.birthNum, angle: 45 },
    { label: "Ground", val: cores.lifePathNum, angle: 90 }, { label: "Past", val: cores.soulNum, angle: 135 },
    { label: "Inner", val: cores.personalityNum, angle: 180 }, { label: "Karmic", val: cores.destinyNum, angle: 225 },
  ].map(n => ({ ...n, x: center + radius * Math.cos(n.angle * (Math.PI / 180)), y: center + radius * Math.sin(n.angle * (Math.PI / 180)) }));

  return (
    <div className="relative flex justify-center items-center p-8 bg-slate-900 rounded-3xl border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.1)] print:border-none print:bg-white print:shadow-none">
      <svg width={size} height={size} className="overflow-visible">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" className="print:stroke-slate-300" />
        {nodes.map((n, i) => <line key={`l1-${i}`} x1={center} y1={center} x2={n.x} y2={n.y} stroke="#6366f1" strokeWidth="1.5" opacity="0.5" className="print:stroke-slate-300" />)}
        {nodes.map((n, i) => <line key={`l2-${i}`} x1={n.x} y1={n.y} x2={nodes[(i + 1) % nodes.length].x} y2={nodes[(i + 1) % nodes.length].y} stroke="#38bdf8" strokeWidth="1" opacity="0.3" className="print:stroke-slate-200" />)}
        
        <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx={center} cy={center} r="28" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" className="print:fill-white print:stroke-black" />
        <text x={center} y={center + 6} textAnchor="middle" fill="#f59e0b" fontSize="20" fontWeight="bold" className="print:fill-black">{cores.lifePathNum}</text>
        <text x={center} y={center + 22} textAnchor="middle" fill="#94a3b8" fontSize="9">CORE</text>

        {nodes.map((n, i) => (
          <motion.g key={`n-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <circle cx={n.x} cy={n.y} r="16" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" className="print:fill-white print:stroke-slate-400" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="bold" className="print:fill-black">{n.val}</text>
            <text x={n.x} y={n.y + 28} textAnchor="middle" fill="#64748b" fontSize="10">{n.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

// --- 4. KOMPONEN UTAMA APLIKASI ---
export default function App() {
  const [members, setMembers] = useState([{ id: 'main', role: 'Diri Sendiri', name: '', dob: '', phone: '' }]);
  const [step, setStep] = useState('input'); 
  const [coreData, setCoreData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); 
  const [selectedMemberIdx, setSelectedMemberIdx] = useState(0);
// Deteksi jika pembeli kembali dari halaman Mayar setelah bayar
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      const saved = localStorage.getItem('peta_diri_members');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setMembers(parsed);
          setCoreData(parsed.map(m => calculateCoreNumbers(m)));
          setStep('paidResult'); // Buka akses laporan lengkap secara otomatis
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);
  
  const addMember = (roleType) => setMembers([...members, { id: Date.now().toString(), role: roleType, name: '', dob: '', phone: '' }]);
  const removeMember = (id) => setMembers(members.filter(m => m.id !== id));
  const handleMemberChange = (id, field, value) => setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));

  const handleCalculate = (e) => {
    e.preventDefault();
    if (members.some(m => !m.name || !m.dob)) return;
    setIsProcessing(true);
    setTimeout(() => {
      setCoreData(members.map(m => calculateCoreNumbers(m)));
      setStep('freeResult');
      setIsProcessing(false);
    }, 1200);
  };

  const handlePayment = () => {
  // Simpan data kalkulasi ke penyimpanan browser agar tidak hilang saat dialihkan
  localStorage.setItem('peta_diri_members', JSON.stringify(members));

  // Arahkan pengunjung langsung ke halaman pembayaran Mayar Anda
  window.location.href = "https://digitalbiz.myr.id/pl/laporan-lengkap-peta-diri";
};

  const familyBlueprint = useMemo(() => {
    if (coreData.length < 2) return null;
    const allLifePaths = coreData.map(c => c.lifePathNum);
    const counts = allLifePaths.reduce((acc, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {});
    const dominantNum = parseInt(Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b));
    return { dominantNum, archetype: NUMEROLOGY_DICTIONARY[dominantNum].archetype, traits: NUMEROLOGY_DICTIONARY[dominantNum].traits };
  }, [coreData]);

  const renderCard = (title, number, type = "locked") => {
    const data = NUMEROLOGY_DICTIONARY[number];
    if (type === "locked") return (
      <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
        <Lock className="w-8 h-8 text-slate-500 mb-2" />
        <h4 className="text-slate-400 font-semibold">{title}</h4>
      </div>
    );
    return (
      <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-indigo-900/50 print:border-slate-300 print:bg-white print:text-black shadow-2xl transition-all">
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">{title}</h4>
          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 print:text-black print:bg-none">{number}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 print:text-black">{data?.archetype}</h3>
        
        <div className="space-y-2 mb-6">
          <p className="text-sm text-slate-300 print:text-slate-800"><span className="text-cyan-400 font-bold mr-2 print:text-cyan-700">✓ KEKUATAN:</span> {data?.traits}</p>
          <p className="text-sm text-slate-400 print:text-slate-600"><span className="text-red-400 font-bold mr-2 print:text-red-700">⚠ BAYANGAN:</span> {data?.shadow}</p>
        </div>

        <div className="p-6 bg-slate-950/50 rounded-2xl border-l-4 border-indigo-500 print:bg-slate-50 print:border-indigo-300 shadow-inner">
          <p className="text-indigo-200 text-[15px] leading-relaxed mb-5 print:text-slate-700 text-justify whitespace-pre-line">
            "{data?.narasi}"
          </p>
          <div className="flex items-start space-x-3 pt-4 border-t border-indigo-500/20 print:border-slate-300">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-1 print:text-amber-600" />
            <p className="text-amber-100/90 text-sm font-medium leading-relaxed print:text-slate-800">
              <span className="text-amber-400 font-black block mb-1 uppercase tracking-wider print:text-amber-700">Pesan Semesta:</span>
              {data?.pesan}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const hasPartner = coreData.some(m => m.role === 'Pasangan');
  const mainUser = coreData[selectedMemberIdx] || coreData[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-20">
      <header className="border-b border-white/5 bg-slate-950/80 sticky top-0 z-50 backdrop-blur-md print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-400 w-6 h-6" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">Peta Diri Numerology</h1>
          </div>
          {step === 'paidResult' && (
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-500/30">
              <Download className="w-4 h-4" /> Unduh Laporan (PDF)
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {step === 'input' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto print:hidden">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-white mb-4">Pemetaan Energi & Jiwa</h2>
                <p className="text-slate-400 leading-relaxed text-lg">Masukkan data otentik kelahiran Anda dan keluarga untuk membongkar cetak biru takdir, potensi relasi, dan pelajaran spiritual Anda di dunia.</p>
              </div>
              
              <form onSubmit={handleCalculate} className="space-y-6">
                {members.map((member, index) => (
                  <div key={member.id} className="bg-slate-900/50 p-6 rounded-3xl border border-indigo-500/30 shadow-lg relative backdrop-blur-sm">
                    {index > 0 && <button type="button" onClick={() => removeMember(member.id)} className="absolute top-6 right-6 text-red-400 hover:text-red-300 text-sm font-medium">Hapus</button>}
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">{member.role}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nama Lengkap (Sesuai Akta Lahir)</label>
                        <input required type="text" value={member.name} onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Tanggal Lahir</label>
                          <input required type="date" value={member.dob} onChange={(e) => handleMemberChange(member.id, 'dob', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner [color-scheme:dark]" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">No. HP (Opsional)</label>
                          <input type="tel" value={member.phone} onChange={(e) => handleMemberChange(member.id, 'phone', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner" placeholder="0812..." />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 justify-center">
                  {!members.some(m => m.role === 'Pasangan') && (
                    <button type="button" onClick={() => addMember('Pasangan')} className="px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-pink-400 rounded-full text-sm font-medium border border-pink-500/20 transition-all">+ Tambah Pasangan</button>
                  )}
                  <button type="button" onClick={() => addMember(`Anak ke-${members.filter(m => m.role.includes('Anak')).length + 1}`)} className="px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20 transition-all">+ Tambah Anak</button>
                </div>
                <button type="submit" disabled={isProcessing} className="w-full mt-8 text-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black tracking-wide py-4 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all">
                  {isProcessing ? "Sinkronisasi Kosmik..." : "PETAKAN TAKDIR KAMI"}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'freeResult' && coreData.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto text-center print:hidden">
              <h2 className="text-3xl font-bold text-white mb-10">Sekilas Peta Relasi Anda</h2>
              
              <div className="grid gap-6 md:grid-cols-2 mb-10">
                {coreData.map((c, i) => (
                  <div key={i} className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 to-amber-500"></div>
                    <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-1">{c.role}</p>
                    <h4 className="font-black text-white mb-6 text-2xl">{c.name}</h4>
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 mb-4">{c.lifePathNum}</div>
                    <p className="text-slate-300 font-medium text-lg">{NUMEROLOGY_DICTIONARY[c.lifePathNum]?.archetype}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-indigo-900 to-cyan-900 rounded-3xl p-12 border border-indigo-500/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20"><Lock className="w-32 h-32 text-cyan-300" /></div>
                <Unlock className="w-16 h-16 text-cyan-400 mx-auto mb-6 relative z-10 drop-shadow-md" />
                <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Buka Buku Kehidupan Anda</h3>
                <p className="text-indigo-200 mb-10 max-w-xl mx-auto leading-relaxed relative z-10 text-lg">
                  Ketahui narasi psikologis lengkap Anda, bongkar tingkat kecocokan asmara dengan persentase akurat, dan pelajari cara terbaik membimbing keluarga berdasarkan energi batin mereka.
                </p>
                <button onClick={handlePayment} className="relative z-10 bg-white text-indigo-950 text-lg font-black tracking-wide px-12 py-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
                BUKA AKSES PREMIUM - Rp 99.000
                </button>
              </div>
            </motion.div>
          )}

          {step === 'paidResult' && coreData.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full pb-20 print:pb-0">
              
              <div className="flex flex-wrap justify-center gap-4 mb-16 print:hidden border-b border-slate-800 pb-8">
                <button onClick={() => setActiveTab('personal')} className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all shadow-lg ${activeTab === 'personal' ? 'bg-indigo-600 text-white shadow-indigo-500/30 scale-105' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                  <User className="w-5 h-5"/> Profil Karakter
                </button>
                {hasPartner && (
                  <button onClick={() => setActiveTab('couple')} className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all shadow-lg ${activeTab === 'couple' ? 'bg-pink-600 text-white shadow-pink-500/30 scale-105' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Heart className="w-5 h-5"/> Asmara
                  </button>
                )}
                {coreData.length > 1 && (
                  <button onClick={() => setActiveTab('family')} className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all shadow-lg ${activeTab === 'family' ? 'bg-cyan-600 text-white shadow-cyan-500/30 scale-105' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Users className="w-5 h-5"/> Keluarga
                  </button>
                )}
              </div>

              {/* TAB 1: PROFIL PERSONAL & KESIMPULAN MENDALAM */}
              {activeTab === 'personal' && (
                <div className="animate-in fade-in duration-700">
                  {coreData.length > 1 && (
                    <div className="flex flex-wrap gap-3 justify-center mb-12 print:hidden">
                      {coreData.map((c, idx) => (
                        <button key={idx} onClick={() => setSelectedMemberIdx(idx)} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedMemberIdx === idx ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'}`}>
                          {c.role} ({c.name.split(' ')[0]})
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="text-center mb-16 print:mt-10">
                    <p className="text-cyan-400 font-bold uppercase tracking-widest mb-3">{mainUser.role}</p>
                    <h2 className="text-5xl md:text-6xl font-black text-white uppercase mb-4 print:text-slate-900 drop-shadow-lg">{mainUser.name}</h2>
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                      <Star className="w-4 h-4" /> Siklus Kosmik: Tahun ke-{mainUser.personalYearNum}
                    </div>
                  </div>
                  
                  <div className="mb-20 print:break-before-page flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-white mb-8 print:text-slate-900">Peta Okagram (Destiny Matrix)</h3>
                    <DestinyMatrixMap cores={mainUser} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="md:col-span-2">{renderCard("1. Life Path (Jalur Takdir Utama)", mainUser.lifePathNum, "unlocked")}</div>
                    {renderCard("2. Destiny (Bakat Spiritual)", mainUser.destinyNum, "unlocked")}
                    {renderCard("3. Soul Urge (Hasrat Jiwa Terdalam)", mainUser.soulNum, "unlocked")}
                    {renderCard("4. Personality (Topeng Sosial Luar)", mainUser.personalityNum, "unlocked")}
                    {renderCard("5. Birth (Gaya Bawaan Lahir)", mainUser.birthNum, "unlocked")}
                  </div>

                  {/* KESIMPULAN & SINTESIS KARAKTER (FITUR BARU) */}
                  <div className="mb-20 print:break-before-page bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 border-2 border-indigo-500/30 print:bg-white print:border-slate-300 rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10"><BookOpen className="w-64 h-64 text-indigo-300" /></div>
                    <h3 className="text-3xl md:text-4xl font-black text-white print:text-slate-900 mb-8 flex items-center gap-4 relative z-10">
                      <BookOpen className="w-8 h-8 text-indigo-400" /> Sintesis: Anatomi Jiwa Anda
                    </h3>
                    <div className="prose prose-invert prose-indigo max-w-none relative z-10 print:prose-slate text-justify">
                      <p className="text-slate-300 print:text-slate-700 leading-[2.2] text-lg md:text-[19px] whitespace-pre-line font-medium">
                        {generateSynthesis(mainUser)}
                      </p>
                    </div>
                  </div>

                  {/* Export Media Sosial */}
                  <div className="mb-10 print:hidden flex flex-col items-center mt-20 pt-10 border-t border-slate-800">
                    <h3 className="text-2xl font-bold text-white mb-2">Bagikan Cetak Biru Anda</h3>
                    <p className="text-slate-400 text-base mb-8 text-center max-w-md">Screenshot kartu estetis di bawah ini dan unggah ke Instagram atau TikTok Story Anda.</p>
                    <div className="w-[360px] h-[640px] relative bg-slate-950 rounded-[2.5rem] border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center text-center p-8 justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-950 to-slate-950"></div>
                      <div className="relative z-10 w-full">
                        <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-black text-white mb-10 truncate leading-tight">{mainUser.name}</h2>
                        <div className="w-40 h-40 rounded-full border border-amber-500/50 flex flex-col items-center justify-center mx-auto mb-8 bg-slate-900/80 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                          <span className="text-xs text-amber-400 font-bold tracking-widest mb-1">LIFE PATH</span>
                          <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500">{mainUser.lifePathNum}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{NUMEROLOGY_DICTIONARY[mainUser.lifePathNum]?.archetype}</h3>
                        <p className="text-slate-400 text-sm italic mb-10 px-4 line-clamp-2">"{NUMEROLOGY_DICTIONARY[mainUser.lifePathNum]?.traits}"</p>
                        <div className="text-sm font-bold text-slate-300 bg-slate-900/90 px-6 py-3 rounded-full border border-indigo-500/30 inline-block shadow-lg">
                          Cek takdirmu di <span className="text-cyan-400">petadiri.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: KECOCOKAN PASANGAN */}
              {activeTab === 'couple' && hasPartner && (() => {
                const partner = coreData.find(m => m.role === 'Pasangan');
                const p1 = coreData[0];
                const matchResult = checkCompatibility(p1.lifePathNum, partner.lifePathNum);
                
                return (
                  <div className="max-w-4xl mx-auto text-center animate-in fade-in zoom-in duration-500">
                    <h2 className="text-4xl font-black text-white mb-20">Kecocokan Relasi & Asmara</h2>
                    
                    <div className="flex justify-center items-center h-56 mb-20 relative">
                      <div className="w-56 h-56 rounded-full border-[6px] border-indigo-500/50 bg-indigo-900/40 absolute -ml-28 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(99,102,241,0.2)] backdrop-blur-md z-10">
                         <span className="text-sm font-bold text-indigo-300 tracking-widest uppercase mb-1">{p1.name.split(' ')[0]}</span>
                         <span className="text-7xl font-black text-white drop-shadow-xl">{p1.lifePathNum}</span>
                      </div>
                      <div className="w-56 h-56 rounded-full border-[6px] border-pink-500/50 bg-pink-900/40 absolute ml-28 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(236,72,153,0.2)] backdrop-blur-md z-0">
                         <span className="text-sm font-bold text-pink-300 tracking-widest uppercase mb-1">{partner.name.split(' ')[0]}</span>
                         <span className="text-7xl font-black text-white drop-shadow-xl">{partner.lifePathNum}</span>
                      </div>
                    </div>

                    <div className={`p-12 rounded-[2.5rem] border-2 ${matchResult.color} ${matchResult.bg} shadow-2xl backdrop-blur-md mb-10`}>
                      <div className="text-8xl font-black mb-6 drop-shadow-lg text-white">{matchResult.score}%</div>
                      <h3 className="text-4xl font-black mb-8 uppercase tracking-widest text-white">{matchResult.status}</h3>
                      <p className="text-2xl text-slate-200 leading-relaxed max-w-3xl mx-auto font-medium">{matchResult.deskripsi}</p>
                    </div>
                  </div>
                );
              })()}

              {/* TAB 3: BLUEPRINT KELUARGA */}
              {activeTab === 'family' && familyBlueprint && (
                <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white mb-4">Cetak Biru Energi Keluarga</h2>
                    <p className="text-slate-400 text-lg">Peta interaksi spiritual antara seluruh anggota keluarga Anda.</p>
                  </div>

                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-cyan-500/30 rounded-[2.5rem] p-12 text-center mb-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
                    
                    <p className="text-cyan-400 font-bold tracking-widest uppercase mb-6 relative z-10">Energi Dominan Keluarga</p>
                    <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 to-cyan-600 mb-8 drop-shadow-2xl relative z-10">{familyBlueprint.dominantNum}</div>
                    <h3 className="text-4xl font-black text-white mb-6 relative z-10">Keluarga {familyBlueprint.archetype.split(' ')[1] || familyBlueprint.archetype}</h3>
                    <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed relative z-10">
                      Karakter Inti: <strong>{familyBlueprint.traits}</strong>. Ini adalah getaran energi gabungan yang paling terpancar ketika keluarga Anda berkumpul, berdiskusi, atau menghadapi tantangan bersama.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreData.map((c, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full flex items-start justify-end p-5"><span className="text-3xl font-black text-indigo-400">{c.lifePathNum}</span></div>
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-3">{c.role}</p>
                        <h4 className="text-2xl font-bold text-white mb-3 pr-10">{c.name}</h4>
                        <p className="text-sm font-medium text-slate-300 mb-8">{NUMEROLOGY_DICTIONARY[c.lifePathNum]?.archetype}</p>
                        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                          <p className="text-sm text-slate-400 leading-relaxed">
                            <span className="text-amber-400 font-bold block mb-2 uppercase tracking-wide text-xs">Peran Psikologis:</span>
                            {c.role.includes('Anak') ? `Anak ini memiliki energi yang sangat ${NUMEROLOGY_DICTIONARY[c.lifePathNum]?.traits.toLowerCase()}. Ia membutuhkan ruang dan validasi atas sifat tersebut agar batinnya merasa aman di rumah.` : `Sebagai orang tua, ia menyumbangkan energi ${NUMEROLOGY_DICTIONARY[c.lifePathNum]?.traits.split(',')[0].toLowerCase()} yang berfungsi sebagai jangkar kestabilan bagi anggota lainnya.`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Print Footer */}
              <div className="hidden print:block text-center mt-32 pt-10 border-t border-slate-200 text-slate-500 text-sm">
                <p>Hak Cipta © {new Date().getFullYear()} Peta Diri Numerology.</p>
                <p className="mt-1">Dokumen eksklusif ini adalah hasil kalkulasi algoritma numerologi metafisika. Gunakan sebagai alat panduan psikologis dan spiritual, bukan patokan mutlak.</p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}