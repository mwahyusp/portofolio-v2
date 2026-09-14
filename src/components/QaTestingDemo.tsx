import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Search, 
  ShoppingCart, 
  ArrowRight, 
  RotateCcw, 
  Bug, 
  ClipboardList, 
  Layers, 
  ShieldCheck, 
  Terminal, 
  User, 
  CreditCard, 
  Check, 
  Eye,
  Info,
  ChevronRight,
  Package
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Language } from '../types';

const GithubIcon = (props: { className?: string }) => {
  const Icon = FaGithub as any;
  return <Icon {...props} />;
};

interface QaTestingDemoProps {
  lang: Language;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  gradient: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  { id: 'P001', name: 'Kaos Polos Hitam', price: 75000, stock: 12, category: 'Pakaian', gradient: 'from-slate-700 to-slate-900' },
  { id: 'P002', name: 'Kemeja Flanel', price: 150000, stock: 5, category: 'Pakaian', gradient: 'from-amber-700 to-red-900' },
  { id: 'P003', name: 'Sepatu Sneakers', price: 320000, stock: 0, category: 'Sepatu', gradient: 'from-blue-600 to-indigo-900' },
  { id: 'P004', name: 'Tas Ransel', price: 210000, stock: 7, category: 'Tas', gradient: 'from-emerald-700 to-teal-900' },
  { id: 'P005', name: 'Topi Baseball', price: 45000, stock: 20, category: 'Aksesoris', gradient: 'from-purple-700 to-indigo-900' },
  { id: 'P006', name: 'Jaket Bomber', price: 275000, stock: 3, category: 'Pakaian', gradient: 'from-rose-700 to-pink-900' },
  { id: 'P007', name: 'Celana Chino', price: 180000, stock: 9, category: 'Pakaian', gradient: 'from-stone-600 to-stone-800' },
  { id: 'P008', name: 'Jam Tangan Digital', price: 400000, stock: 0, category: 'Aksesoris', gradient: 'from-cyan-700 to-blue-900' },
];

const TEST_CASES_DATA = [
  // Fase 1: Login (TC-001 - TC-010)
  { id: 'TC-001', phase: 1, module: 'Login', scenario: 'Login dengan kredensial valid', expected: 'Pesan "Login successful!" & redirect ke products.html', priority: 'High', status: 'pass' },
  { id: 'TC-002', phase: 1, module: 'Login', scenario: 'Email tanpa karakter @', expected: 'Muncul pesan error "Invalid email format!"', priority: 'High', status: 'pass' },
  { id: 'TC-003', phase: 1, module: 'Login', scenario: 'Password kurang dari 6 karakter', expected: 'Muncul pesan "Password must be at least 6 characters."', priority: 'High', status: 'pass' },
  { id: 'TC-004', phase: 1, module: 'Login', scenario: 'Email kosong pada submit', expected: 'Muncul pesan "Email is required!"', priority: 'High', status: 'pass' },
  { id: 'TC-005', phase: 1, module: 'Login', scenario: 'Password kosong dengan email valid', expected: 'Muncul "Password required!" (DEFECT: muncul "Invalid email format!")', priority: 'Medium', status: 'fail', defectId: 'DEF-001' },
  { id: 'TC-006', phase: 1, module: 'Login', scenario: 'Email dan password sama-sama kosong', expected: 'Muncul pesan "Email is required!"', priority: 'Medium', status: 'pass' },
  { id: 'TC-007', phase: 1, module: 'Login', scenario: 'Password tepat 6 karakter (Boundary Value)', expected: 'Validasi password lolos (sukses login)', priority: 'Medium', status: 'pass' },
  { id: 'TC-008', phase: 1, module: 'Login', scenario: 'Password 5 karakter (Boundary Value)', expected: 'Muncul pesan "Password must be at least 6 characters."', priority: 'Medium', status: 'pass' },
  { id: 'TC-009', phase: 1, module: 'Login', scenario: 'Kredensial email/password salah', expected: 'Muncul pesan "Invalid email or password!"', priority: 'High', status: 'pass' },
  { id: 'TC-010', phase: 1, module: 'Login', scenario: 'Email dengan leading/trailing spasi', expected: 'Sistem men-trim spasi dan login berhasil', priority: 'Low', status: 'pass' },
  // Fase 1: Catalog (TC-011 - TC-017)
  { id: 'TC-011', phase: 1, module: 'Catalog', scenario: 'Menampilkan seluruh 8 produk katalog', expected: 'Semua kartu produk (8 items) tampil di grid', priority: 'High', status: 'pass' },
  { id: 'TC-012', phase: 1, module: 'Catalog', scenario: 'Format harga mata uang Rupiah', expected: 'Harga tampil dengan format standar (contoh: Rp 75.000)', priority: 'Medium', status: 'pass' },
  { id: 'TC-013', phase: 1, module: 'Catalog', scenario: 'Produk dengan stok 0 menampilkan label khusus', expected: 'Muncul badge merah "Stok habis" pada P003 & P008', priority: 'High', status: 'pass' },
  { id: 'TC-014', phase: 1, module: 'Catalog', scenario: 'Tombol Add to Cart nonaktif saat stok 0', expected: 'Tombol disabled dan label berganti "Stok Habis"', priority: 'High', status: 'pass' },
  { id: 'TC-015', phase: 1, module: 'Catalog', scenario: 'Add to Cart pada produk dengan stok tersedia', expected: 'Item ditambahkan ke cart & feedback tampil', priority: 'High', status: 'pass' },
  { id: 'TC-016', phase: 1, module: 'Catalog', scenario: 'Status search bar pada Fase 1', expected: 'Search bar disabled (Superseded oleh Fase 2)', priority: 'Low', status: 'pass' },
  { id: 'TC-017', phase: 1, module: 'Catalog', scenario: 'Error handling saat products.json gagal load', expected: 'Pesan error anggun muncul pada container katalog', priority: 'Medium', status: 'pass' },
  // Fase 2: Search, Detail, Cart (TC-018 - TC-026)
  { id: 'TC-018', phase: 2, module: 'Search', scenario: 'Cari "kaos" (lowercase)', expected: 'Menemukan "Kaos Polos Hitam" (DEFECT: Case-sensitive search gagal)', priority: 'High', status: 'fail', defectId: 'DEF-002' },
  { id: 'TC-019', phase: 2, module: 'Search', scenario: 'Cari "KAOS" (uppercase)', expected: 'Berhasil menemukan produk yang sesuai', priority: 'Medium', status: 'pass' },
  { id: 'TC-020', phase: 2, module: 'Search', scenario: 'Cari keyword yang tidak ada "xyz"', expected: 'Tampil empty state "Produk tidak ditemukan"', priority: 'Medium', status: 'pass' },
  { id: 'TC-021', phase: 2, module: 'Search', scenario: 'Clear input search', expected: 'Semua 8 produk kembali ditampilkan', priority: 'Medium', status: 'pass' },
  { id: 'TC-022', phase: 2, module: 'Detail', scenario: 'Klik nama/gambar produk untuk membuka modal', expected: 'Modal detail produk terbuka dengan info lengkap', priority: 'Medium', status: 'pass' },
  { id: 'TC-023', phase: 2, module: 'Detail', scenario: 'Tutup modal via tombol × atau backdrop', expected: 'Modal tertutup dan kembali ke katalog', priority: 'Low', status: 'pass' },
  { id: 'TC-024', phase: 2, module: 'Detail', scenario: 'Add to Cart langsung dari dalam modal', expected: 'Item masuk ke cart dan counter header bertambah', priority: 'Medium', status: 'pass' },
  { id: 'TC-025', phase: 2, module: 'Cart', scenario: 'Add to Cart dari katalog memperbarui counter', expected: 'Badge counter Cart(N) bertambah secara akurat', priority: 'High', status: 'pass' },
  { id: 'TC-026', phase: 2, module: 'Cart', scenario: 'Input kuantitas melebihi stok produk (misal: 99)', expected: 'Dibatasi max stok 12 (DEFECT: Qty tidak dibatasi stok)', priority: 'High', status: 'fail', defectId: 'DEF-003' },
  // Fase 3: Checkout & Confirmation (TC-027 - TC-033)
  { id: 'TC-027', phase: 3, module: 'Checkout', scenario: 'Akses checkout dengan keranjang kosong', expected: 'Muncul pesan error dan tombol checkout dinonaktifkan', priority: 'High', status: 'pass' },
  { id: 'TC-028', phase: 3, module: 'Checkout', scenario: 'Submit form dengan Nama Penerima kosong', expected: 'Pesan validasi "Nama penerima wajib diisi."', priority: 'High', status: 'pass' },
  { id: 'TC-029', phase: 3, module: 'Checkout', scenario: 'Input nomor telepon non-numerik / format salah', expected: 'Pesan validasi "Nomor telepon harus 10–13 digit angka."', priority: 'High', status: 'pass' },
  { id: 'TC-030', phase: 3, module: 'Checkout', scenario: 'Mutasi cart via tab lain saat halaman checkout terbuka', expected: 'Subtotal reaktif update (DEFECT: Subtotal statis saat init)', priority: 'High', status: 'fail', defectId: 'DEF-004' },
  { id: 'TC-031', phase: 3, module: 'Checkout', scenario: 'Submit form checkout valid', expected: 'Redirect ke confirmation.html & localStorage cart dikosongkan', priority: 'High', status: 'pass' },
  { id: 'TC-032', phase: 3, module: 'Confirmation', scenario: 'Tampilkan detail ringkasan order lengkap', expected: 'Menampilkan Order ID, data pelanggan, items, dan total', priority: 'High', status: 'pass' },
  { id: 'TC-033', phase: 3, module: 'Confirmation', scenario: '2 order dibuat dalam waktu < 1 detik', expected: 'ID unik tanpa duplikasi (DEFECT: Collision resolusi detik)', priority: 'High', status: 'fail', defectId: 'DEF-005' },
];

const BUG_REPORTS = [
  {
    id: 'DEF-001',
    title: 'Pesan error salah saat password kosong dengan email valid',
    module: 'Login',
    file: 'app/scripts/login.js',
    severity: 'Minor',
    priority: 'Medium',
    testCase: 'TC-005',
    regressionScenario: 'RS-001',
    description: 'Saat email diisi dengan format valid namun password dikosongkan, sistem menampilkan pesan "Invalid email format!" alih-alih "Password required!".',
    rootCause: `// INTENTIONAL DEFECT #1: Salah urutan / copy pesan error
if (!password) {
  showMessage('Invalid email format!', 'error'); // <- Harusnya 'Password required!'
}`,
    suggestedFix: `if (!password) {
  showMessage('Password required!', 'error');
}`,
  },
  {
    id: 'DEF-002',
    title: 'Pencarian katalog produk bersifat case-sensitive',
    module: 'Product Catalog',
    file: 'app/scripts/products.js',
    severity: 'Major',
    priority: 'High',
    testCase: 'TC-018',
    regressionScenario: 'RS-003',
    description: 'Pencarian teks menggunakan perbandingan string langsung tanpa normalisasi toLowerCase(), sehingga keyword lowercase "kaos" gagal menemukan "Kaos Polos Hitam".',
    rootCause: `// INTENTIONAL DEFECT #2: Case-sensitive search
const filtered = products.filter(p => p.name.includes(query)); 
// Query "kaos" tidak cocok dengan "Kaos"`,
    suggestedFix: `const q = query.trim().toLowerCase();
const filtered = products.filter(p => p.name.toLowerCase().includes(q));`,
  },
  {
    id: 'DEF-003',
    title: 'Kuantitas item di keranjang tidak dibatasi oleh stok produk',
    module: 'Shopping Cart',
    file: 'app/scripts/cart.js',
    severity: 'Major',
    priority: 'High',
    testCase: 'TC-026',
    regressionScenario: 'RS-004',
    description: 'User dapat menginput atau menaikkan kuantitas item hingga 99 buah di cart.html meskipun stok produk di database hanya 12 unit, tanpa ada validasi batas stok.',
    rootCause: `// INTENTIONAL DEFECT #3: Qty tidak dibatasi oleh stok produk
function updateQty(id, newQty) {
  const item = cart.find(i => i.id === id);
  if (item && newQty >= 1) {
    item.qty = newQty; // <- Tidak ada pengecekan newQty <= product.stock
  }
}`,
    suggestedFix: `const product = products.find(p => p.id === id);
if (item && newQty >= 1) {
  if (newQty > product.stock) {
    alert(\`Maksimum pembelian adalah \${product.stock} unit.\`);
    item.qty = product.stock;
  } else {
    item.qty = newQty;
  }
}`,
  },
  {
    id: 'DEF-004',
    title: 'Subtotal ringkasan checkout tidak reaktif saat cart bermutasi',
    module: 'Checkout Form',
    file: 'app/scripts/checkout.js',
    severity: 'Major',
    priority: 'High',
    testCase: 'TC-030',
    regressionScenario: 'RS-005',
    description: 'Fungsi renderSummary() hanya dipanggil satu kali saat initial load. Jika item cart berubah (misal melalui sync localStorage atau tab lain), subtotal tidak ter-update.',
    rootCause: `// INTENTIONAL DEFECT #4: renderSummary() hanya dipanggil sekali saat init
document.addEventListener('DOMContentLoaded', () => {
  renderSummary(); // Hanya sekali, tidak listen ke event 'storage'
});`,
    suggestedFix: `window.addEventListener('storage', (e) => {
  if (e.key === 'mini_ecom_cart') {
    cart = JSON.parse(e.newValue || '[]');
    renderSummary();
  }
});`,
  },
  {
    id: 'DEF-005',
    title: 'Order ID duplikat berisiko tabrakan (timestamp detik)',
    module: 'Order Confirmation',
    file: 'app/scripts/checkout.js',
    severity: 'Major',
    priority: 'High',
    testCase: 'TC-033',
    regressionScenario: 'RS-007',
    description: 'generateOrderId() menggunakan Math.floor(Date.now() / 1000) yang memiliki granularitas per detik. Dua transaksi dalam detik yang sama akan menghasilkan Order ID identik.',
    rootCause: `// INTENTIONAL DEFECT #5: Resolusi detik, rawan collision
function generateOrderId() {
  return 'ORD-' + Math.floor(Date.now() / 1000);
}`,
    suggestedFix: `function generateOrderId() {
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return 'ORD-' + Date.now() + '-' + randomSuffix;
}`,
  },
];

const RTM_DATA = [
  { reqId: 'R-01', requirement: 'User dapat login dengan email & password terdaftar', testCases: 'TC-001, TC-009, TC-010', defect: '-' },
  { reqId: 'R-02', requirement: 'Validasi email format & required pada form login', testCases: 'TC-002, TC-004, TC-006', defect: '-' },
  { reqId: 'R-03', requirement: 'Validasi panjang minimum password (6 karakter)', testCases: 'TC-003, TC-007, TC-008', defect: '-' },
  { reqId: 'R-04', requirement: 'Pesan error spesifik saat password kosong', testCases: 'TC-005', defect: 'DEF-001' },
  { reqId: 'R-05', requirement: 'Katalog menampilkan 8 produk dengan harga Rupiah', testCases: 'TC-011, TC-012', defect: '-' },
  { reqId: 'R-06', requirement: 'Indikator stok habis & disable button Add to Cart', testCases: 'TC-013, TC-014', defect: '-' },
  { reqId: 'R-07', requirement: 'Penambahan produk tersedia ke shopping cart', testCases: 'TC-015, TC-024, TC-025', defect: '-' },
  { reqId: 'R-08', requirement: 'Pencarian produk real-time case-insensitive', testCases: 'TC-018, TC-019, TC-020, TC-021', defect: 'DEF-002' },
  { reqId: 'R-09', requirement: 'Modal detail produk interaktif dengan penutup ESC/click', testCases: 'TC-022, TC-023', defect: '-' },
  { reqId: 'R-10', requirement: 'Keranjang belanja membatasi kuantitas <= stok produk', testCases: 'TC-026', defect: 'DEF-003' },
  { reqId: 'R-11', requirement: 'Pencegahan checkout saat keranjang kosong', testCases: 'TC-027', defect: '-' },
  { reqId: 'R-12', requirement: 'Validasi form nama penerima & alamat pengiriman', testCases: 'TC-028', defect: '-' },
  { reqId: 'R-13', requirement: 'Validasi format nomor telepon 10–13 digit angka', testCases: 'TC-029', defect: '-' },
  { reqId: 'R-14', requirement: 'Reaktivitas perhitungan subtotal & total pembayaran', testCases: 'TC-030', defect: 'DEF-004' },
  { reqId: 'R-15', requirement: 'Penyelesaian order & pembersihan keranjang belanja', testCases: 'TC-031', defect: '-' },
  { reqId: 'R-16', requirement: 'Tampilan konfirmasi pesanan lengkap dan jelas', testCases: 'TC-032', defect: '-' },
  { reqId: 'R-17', requirement: 'Keunikan Order ID pada kondisi konkurensi tinggi', testCases: 'TC-033', defect: 'DEF-005' },
  { reqId: 'R-18', requirement: 'Dukungan metode pembayaran Transfer, COD, E-Wallet', testCases: 'TC-031, TC-032', defect: '-' },
  { reqId: 'R-19', requirement: 'Error handling tangguh saat pemuatan data JSON', testCases: 'TC-017', defect: '-' },
];

export const QA_TESTING_SOURCE_CODE = `/* ==========================================================================
   MINI E-COMMERCE QA TESTING PORTFOLIO (VANILLA JS CONTROLLED TEST ENVIRONMENT)
   Contains 5 Intentional Defects for Manual QA Process & Bug Reporting
   Live Demo: https://qa-testing-portofolio.vercel.app/
   ========================================================================== */

// --- 1. app/scripts/login.js ---
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const msgEl = document.getElementById('login-message');

  // Rule 1: Email kosong
  if (!email) {
    return showMessage('Email is required!', 'error');
  }

  // Rule 2: Format email invalid
  if (!email.includes('@') || !email.includes('.')) {
    return showMessage('Invalid email format!', 'error');
  }

  // Rule 3: Password kosong
  // ⚠️ INTENTIONAL DEFECT #1: Pesan error salah alih-alih 'Password required!'
  if (!password) {
    return showMessage('Invalid email format!', 'error');
  }

  // Rule 4: Password < 6 karakter
  if (password.length < 6) {
    return showMessage('Password must be at least 6 characters.', 'error');
  }

  // Rule 5 & 6: Kredensial check
  if (email === 'user@test.com' && password === '123456') {
    showMessage('Login successful!', 'success');
    setTimeout(() => { window.location.href = '/app/products.html'; }, 800);
  } else {
    showMessage('Invalid email or password!', 'error');
  }
});


// --- 2. app/scripts/products.js ---
function filterProducts(query) {
  // ⚠️ INTENTIONAL DEFECT #2: Case-sensitive search
  // 'kaos' tidak menemukan 'Kaos Polos Hitam' karena tidak menggunakan toLowerCase()
  const filtered = allProducts.filter(p => p.name.includes(query));
  renderProductGrid(filtered);
}


// --- 3. app/scripts/cart.js ---
function setItemQuantity(productId, newQty) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  // ⚠️ INTENTIONAL DEFECT #3: Qty tidak dibatasi oleh stok produk
  // User bisa input qty 99 untuk produk dengan stok 12
  if (newQty >= 1) {
    item.qty = parseInt(newQty, 10);
    saveCart();
    renderCart();
  }
}


// --- 4. app/scripts/checkout.js ---
// ⚠️ INTENTIONAL DEFECT #4: renderSummary() hanya dipanggil sekali saat init
// Subtotal tidak reaktif terhadap mutasi storage/cart di background
function initCheckout() {
  renderSummary(); // Hanya dijalankan saat pertama kali halaman di-load
}

// ⚠️ INTENTIONAL DEFECT #5: Resolusi timestamp detik, rawan collision Order ID
function generateOrderId() {
  return 'ORD-' + Math.floor(Date.now() / 1000);
}
`;

export default function QaTestingDemo({ lang }: QaTestingDemoProps) {
  const [activeTab, setActiveTab] = useState<'simulator' | 'testcases' | 'defects' | 'rtm'>('simulator');
  
  // Simulator State
  const [simStep, setSimStep] = useState<'login' | 'catalog' | 'cart' | 'checkout' | 'confirmation'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState<{ text: string; type: 'error' | 'success' | '' }>({ text: '', type: '' });
  const [triggeredDefect, setTriggeredDefect] = useState<string | null>(null);

  // Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([
    { id: 'P001', qty: 1 },
    { id: 'P002', qty: 1 }
  ]);
  const [selectedModalProduct, setSelectedModalProduct] = useState<ProductItem | null>(null);

  // Checkout State
  const [checkoutName, setCheckoutName] = useState('Budi Santoso');
  const [checkoutPhone, setCheckoutPhone] = useState('081234567890');
  const [checkoutAddress, setCheckoutAddress] = useState('Jl. Sudirman No. 45, Jakarta');
  const [checkoutPayment, setCheckoutPayment] = useState<'transfer' | 'cod' | 'ewallet'>('transfer');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Filter for Test Cases
  const [tcPhaseFilter, setTcPhaseFilter] = useState<number | 'all'>('all');
  const [tcStatusFilter, setTcStatusFilter] = useState<'all' | 'pass' | 'fail'>('all');

  // Simulator Actions
  const handleSimLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTriggeredDefect(null);
    setLoginMsg({ text: '', type: '' });

    if (!loginEmail) {
      setLoginMsg({ text: 'Email is required!', type: 'error' });
      return;
    }

    if (!loginEmail.includes('@') || !loginEmail.includes('.')) {
      setLoginMsg({ text: 'Invalid email format!', type: 'error' });
      return;
    }

    // DEFECT #1 TRIGGER: Password kosong padahal email valid
    if (!loginPassword) {
      setTriggeredDefect('DEF-001');
      setLoginMsg({ text: 'Invalid email format!', type: 'error' });
      return;
    }

    if (loginPassword.length < 6) {
      setLoginMsg({ text: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }

    if (loginEmail === 'user@test.com' && loginPassword === '123456') {
      setLoginMsg({ text: 'Login successful!', type: 'success' });
      setTimeout(() => {
        setSimStep('catalog');
        setLoginMsg({ text: '', type: '' });
      }, 700);
    } else {
      setLoginMsg({ text: 'Invalid email or password!', type: 'error' });
    }
  };

  // Case-sensitive search defect simulator
  const filteredProducts = PRODUCTS_DATA.filter(p => {
    if (!searchQuery) return true;
    // INTENTIONAL DEFECT #2: Case-sensitive search!
    return p.name.includes(searchQuery);
  });

  const addToCart = (product: ProductItem) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
  };

  const updateCartQty = (productId: string, newQty: number) => {
    // INTENTIONAL DEFECT #3: No stock validation limit
    if (newQty > 12) {
      setTriggeredDefect('DEF-003');
    }
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, qty: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const removeCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
  const cartSubtotal = cart.reduce((acc, curr) => {
    const p = PRODUCTS_DATA.find(item => item.id === curr.id);
    return acc + (p ? p.price * curr.qty : 0);
  }, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName.trim()) {
      setCheckoutError('Nama penerima wajib diisi.');
      return;
    }
    if (!checkoutPhone.trim() || !/^\d{10,13}$/.test(checkoutPhone.trim())) {
      setCheckoutError('Nomor telepon harus 10–13 digit angka.');
      return;
    }
    if (!checkoutAddress.trim()) {
      setCheckoutError('Alamat wajib diisi.');
      return;
    }

    // INTENTIONAL DEFECT #5: Timestamp in seconds resolution
    const orderId = 'ORD-' + Math.floor(Date.now() / 1000);
    
    setConfirmedOrder({
      orderId,
      name: checkoutName,
      phone: checkoutPhone,
      address: checkoutAddress,
      payment: checkoutPayment,
      items: cart.map(item => {
        const prod = PRODUCTS_DATA.find(p => p.id === item.id)!;
        return { ...prod, qty: item.qty, subtotal: prod.price * item.qty };
      }),
      total: cartSubtotal,
      date: new Date().toLocaleTimeString()
    });

    setCart([]);
    setSimStep('confirmation');
  };

  const filteredTestCases = TEST_CASES_DATA.filter(tc => {
    const matchPhase = tcPhaseFilter === 'all' || tc.phase === tcPhaseFilter;
    const matchStatus = tcStatusFilter === 'all' || tc.status === tcStatusFilter;
    return matchPhase && matchStatus;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
      {/* Top Banner with Direct Live Demo link */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
            <Bug className="w-5 h-5 text-teal-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base sm:text-lg">QA Testing Portfolio — Mini E-Commerce</h4>
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/20 text-white">
                Controlled Testbed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-tight">
              {lang === 'id' 
                ? '5 Intentional Defects • 33 Test Cases • 7 Skenario Regresi • 1 RTM' 
                : '5 Intentional Defects • 33 Test Cases • 7 Regression Scenarios • 1 RTM'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <a
            href="https://qa-testing-portofolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-teal-800 font-bold text-xs hover:bg-teal-50 transition-all shadow-sm hover:shadow"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
            <span>{lang === 'id' ? 'Buka Live Web' : 'Open Live App'}</span>
          </a>
          <a
            href="https://github.com/mwahyusp/qa-testing-portofolio"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 sm:px-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'simulator'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>{lang === 'id' ? 'Simulator Testbed (Flow & Defects)' : 'Testbed Simulator (Flow & Defects)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('defects')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'defects'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Bug className="w-4 h-4 text-rose-500" />
          <span>{lang === 'id' ? '5 Bug Reports (DEF-001 s/d DEF-005)' : '5 Bug Reports (DEF-001 - DEF-005)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('testcases')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'testcases'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'id' ? '33 Test Cases Matrix' : '33 Test Cases Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveTab('rtm')}
          className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'rtm'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-teal-500/5'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-sky-500" />
          <span>{lang === 'id' ? 'RTM (Traceability Matrix)' : 'Traceability Matrix (RTM)'}</span>
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {/* ==================== TAB 1: SIMULATOR TESTBED ==================== */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Defect Alert Trigger Bar */}
            {triggeredDefect && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 flex items-start justify-between gap-3 animate-pulse">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-rose-500 text-white">
                        {triggeredDefect}
                      </span>
                      <h5 className="font-bold text-sm">
                        {lang === 'id' ? 'Intentional Defect Berhasil Ter-trigger!' : 'Intentional Defect Successfully Triggered!'}
                      </h5>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed">
                      {triggeredDefect === 'DEF-001' && 'Pesan error salah saat password kosong dengan email valid: Muncul "Invalid email format!" (seharusnya "Password required!").'}
                      {triggeredDefect === 'DEF-002' && 'Pencarian case-sensitive: Query "kaos" tidak menemukan "Kaos Polos Hitam".'}
                      {triggeredDefect === 'DEF-003' && 'Qty keranjang melebihi batas stok produk tanpa validasi max stock (12).'}
                      {triggeredDefect === 'DEF-005' && 'Risiko timestamp collision: Order ID menggunakan Math.floor(Date.now() / 1000).'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTriggeredDefect(null)}
                  className="p-1 text-rose-400 hover:text-rose-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Step Navigation Ribbon */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-950 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto gap-1">
              {[
                { key: 'login', label: '1. Login (DEF #1)' },
                { key: 'catalog', label: '2. Catalog & Search (DEF #2)' },
                { key: 'cart', label: `3. Cart (${cartTotalItems}) (DEF #3)` },
                { key: 'checkout', label: '4. Checkout (DEF #4)' },
                { key: 'confirmation', label: '5. Confirmation (DEF #5)' },
              ].map(step => (
                <button
                  key={step.key}
                  onClick={() => {
                    setSimStep(step.key as any);
                    setTriggeredDefect(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    simStep === step.key
                      ? 'bg-teal-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{step.label}</span>
                </button>
              ))}
            </div>

            {/* SIMULATOR SCREEN 1: LOGIN */}
            {simStep === 'login' && (
              <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">Mini E-Commerce Login</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kredensial valid: <span className="font-mono font-bold text-teal-600">user@test.com</span> / <span className="font-mono font-bold text-teal-600">123456</span>
                  </p>
                </div>

                {loginMsg.text && (
                  <div className={`p-3 rounded-xl text-xs font-semibold ${
                    loginMsg.type === 'error' 
                      ? 'bg-rose-500/10 text-rose-600 border border-rose-500/30' 
                      : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                  }`}>
                    {loginMsg.text}
                  </div>
                )}

                <form onSubmit={handleSimLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="user@test.com"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="123456"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Login
                  </button>
                </form>

                {/* Preset Test Helpers */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    ⚡ QA Quick Test Actions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setLoginEmail('user@test.com');
                        setLoginPassword('');
                        setTriggeredDefect('DEF-001');
                        setLoginMsg({ text: 'Invalid email format!', type: 'error' });
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-bold border border-rose-500/20 transition-all"
                    >
                      Trigger DEF-001 (Empty Password Bug)
                    </button>
                    <button
                      onClick={() => {
                        setLoginEmail('user@test.com');
                        setLoginPassword('123456');
                        handleSimLogin();
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20 transition-all"
                    >
                      Fill Valid & Login (TC-001)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR SCREEN 2: CATALOG */}
            {simStep === 'catalog' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => {
                        const val = e.target.value;
                        setSearchQuery(val);
                        if (val.toLowerCase() === 'kaos' && val !== 'Kaos') {
                          setTriggeredDefect('DEF-002');
                        }
                      }}
                      placeholder="Cari produk (Coba ketik 'kaos' lowercase vs 'Kaos')..."
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSearchQuery('kaos');
                        setTriggeredDefect('DEF-002');
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20 hover:bg-rose-500/20 whitespace-nowrap"
                    >
                      Test DEF-002 (Cari 'kaos')
                    </button>
                    <button
                      onClick={() => setSimStep('cart')}
                      className="px-4 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-teal-600"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Keranjang ({cartTotalItems})</span>
                    </button>
                  </div>
                </div>

                {searchQuery === 'kaos' && filteredProducts.length === 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      ⚠️ <strong>DEFECT #2 Aktif:</strong> Kata kunci lowercase <code className="bg-amber-500/20 px-1 py-0.5 rounded">kaos</code> menghasilkan 0 produk karena pencarian case-sensitive. Coba ketik <code className="bg-amber-500/20 px-1 py-0.5 rounded">Kaos</code>.
                    </span>
                  </div>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className={`h-24 rounded-xl bg-gradient-to-br ${product.gradient} mb-2.5 flex items-center justify-center text-white/40 text-xs font-mono font-bold`}>
                          {product.id}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          {product.category}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 mb-1">
                          {product.name}
                        </h4>
                        <div className="text-xs font-black text-teal-600 dark:text-teal-400 mb-2">
                          Rp {product.price.toLocaleString('id-ID')}
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">Stok:</span>
                          <span className={`font-bold ${product.stock === 0 ? 'text-rose-500 font-extrabold' : 'text-slate-700 dark:text-slate-300'}`}>
                            {product.stock === 0 ? 'Stok habis' : product.stock}
                          </span>
                        </div>

                        <button
                          disabled={product.stock === 0}
                          onClick={() => addToCart(product)}
                          className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            product.stock === 0
                              ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                              : 'bg-teal-500 hover:bg-teal-600 text-white shadow-xs'
                          }`}
                        >
                          {product.stock === 0 ? 'Stok Habis' : '+ Keranjang'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SIMULATOR SCREEN 3: SHOPPING CART */}
            {simStep === 'cart' && (
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-teal-500" />
                    <span>Keranjang Belanja ({cartTotalItems} item)</span>
                  </h3>
                  <button
                    onClick={() => setSimStep('catalog')}
                    className="text-xs text-teal-600 hover:underline font-semibold"
                  >
                    ← Lanjut Belanja
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 space-y-2">
                    <p className="text-xs">Keranjang belanja kosong</p>
                    <button
                      onClick={() => setSimStep('catalog')}
                      className="px-4 py-2 rounded-xl bg-teal-500 text-white text-xs font-bold"
                    >
                      Buka Katalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => {
                      const product = PRODUCTS_DATA.find(p => p.id === item.id)!;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {product.name}
                            </h4>
                            <div className="text-[11px] text-slate-500">
                              Rp {product.price.toLocaleString('id-ID')} / unit • <span className="font-bold text-teal-600">Stok Asli: {product.stock}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                              <button
                                onClick={() => updateCartQty(item.id, item.qty - 1)}
                                className="px-2 py-1 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={item.qty}
                                onChange={e => updateCartQty(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center text-xs py-1 border-x border-slate-200 dark:border-slate-700 bg-transparent font-mono font-bold"
                              />
                              <button
                                onClick={() => updateCartQty(item.id, item.qty + 1)}
                                className="px-2 py-1 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeCartItem(item.id)}
                              className="p-1 text-rose-500 hover:text-rose-700 text-xs"
                              title="Hapus item"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Defect #3 trigger info */}
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-2">
                      <div className="text-xs text-rose-700 dark:text-rose-300">
                        ⚡ <strong>Uji DEFECT #3:</strong> Tekan tombol untuk bypass batas stok produk (input 99 untuk stok 12).
                      </div>
                      <button
                        onClick={() => {
                          updateCartQty('P001', 99);
                          setTriggeredDefect('DEF-003');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-bold text-[11px] shrink-0"
                      >
                        Set Qty 99 (DEF-003)
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500">Total Pembayaran:</span>
                        <div className="text-base font-black text-slate-900 dark:text-white">
                          Rp {cartSubtotal.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <button
                        onClick={() => setSimStep('checkout')}
                        className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Lanjut ke Checkout</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SIMULATOR SCREEN 4: CHECKOUT */}
            {simStep === 'checkout' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                <div className="md:col-span-7 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-teal-500" />
                    <span>Formulir Checkout</span>
                  </h3>

                  {checkoutError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/30 text-xs font-bold">
                      {checkoutError}
                    </div>
                  )}

                  <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Penerima</label>
                      <input
                        type="text"
                        value={checkoutName}
                        onChange={e => setCheckoutName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor Telepon (10-13 digit)</label>
                      <input
                        type="text"
                        value={checkoutPhone}
                        onChange={e => setCheckoutPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Alamat Pengiriman</label>
                      <textarea
                        rows={2}
                        value={checkoutAddress}
                        onChange={e => setCheckoutAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Metode Pembayaran</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: 'transfer', label: 'Transfer Bank' },
                          { key: 'cod', label: 'COD' },
                          { key: 'ewallet', label: 'E-Wallet' }
                        ].map(m => (
                          <button
                            type="button"
                            key={m.key}
                            onClick={() => setCheckoutPayment(m.key as any)}
                            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                              checkoutPayment === m.key
                                ? 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs transition-colors shadow-sm mt-2"
                    >
                      Konfirmasi & Tempatkan Order
                    </button>
                  </form>
                </div>

                <div className="md:col-span-5 bg-slate-100 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Ringkasan Pesanan</h4>
                  <div className="space-y-2">
                    {cart.map(item => {
                      const prod = PRODUCTS_DATA.find(p => p.id === item.id)!;
                      return (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span className="text-slate-600 dark:text-slate-300">
                            {prod.name} × {item.qty}
                          </span>
                          <span className="font-bold">
                            Rp {(prod.price * item.qty).toLocaleString('id-ID')}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold">Total:</span>
                    <span className="text-sm font-black text-teal-600 dark:text-teal-400">
                      Rp {cartSubtotal.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                    ℹ️ <strong>DEFECT #4 & #5:</strong> Subtotal dihitung statis saat init. ID order di-generate dengan <code>Date.now() / 1000</code> (resolusi detik).
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR SCREEN 5: ORDER CONFIRMATION */}
            {simStep === 'confirmation' && confirmedOrder && (
              <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-mono font-bold">
                    {confirmedOrder.orderId}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order Berhasil!</h3>
                  <p className="text-xs text-slate-500">
                    Terima kasih telah berbelanja di Mini E-Commerce Controlled Testbed.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Penerima:</span>
                    <span className="font-bold">{confirmedOrder.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Telepon:</span>
                    <span className="font-mono">{confirmedOrder.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Metode Bayar:</span>
                    <span className="font-semibold uppercase">{confirmedOrder.payment}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="font-bold">Total Bayar:</span>
                    <span className="font-black text-teal-600 dark:text-teal-400 text-sm">
                      Rp {confirmedOrder.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSimStep('catalog');
                    setCart([{ id: 'P001', qty: 1 }]);
                  }}
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Belanja Lagi / Reset Testbed
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: BUG REPORTS (5 DEF) ==================== */}
        {activeTab === 'defects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-bold text-base">5 Intentional Defects Documentation</h4>
                <p className="text-xs text-slate-500">Daftar bug yang sengaja disematkan untuk pengujian end-to-end QA.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {BUG_REPORTS.map(bug => (
                <div
                  key={bug.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-mono font-black text-xs">
                        {bug.id}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        {bug.module}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {bug.file}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/30">
                        Severity: {bug.severity}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/30">
                        Priority: {bug.priority}
                      </span>
                    </div>
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    {bug.title}
                  </h5>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {bug.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 font-mono">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
                        Root Cause (Current Defect Code):
                      </span>
                      <pre className="text-[11px] text-rose-800 dark:text-rose-300 whitespace-pre-wrap overflow-x-auto">
                        {bug.rootCause}
                      </pre>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 font-mono">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                        Suggested Fix (Expected Fix):
                      </span>
                      <pre className="text-[11px] text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap overflow-x-auto">
                        {bug.suggestedFix}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: 33 TEST CASES MATRIX ==================== */}
        {activeTab === 'testcases' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Filter Fase:</span>
                <div className="flex gap-1">
                  {[
                    { key: 'all', label: 'Semua (33)' },
                    { key: 1, label: 'Fase 1 (17)' },
                    { key: 2, label: 'Fase 2 (9)' },
                    { key: 3, label: 'Fase 3 (7)' }
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setTcPhaseFilter(f.key as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        tcPhaseFilter === f.key
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <div className="flex gap-1">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'pass', label: 'Pass (28)' },
                    { key: 'fail', label: 'Fail / Defect (5)' }
                  ].map(s => (
                    <button
                      key={s.key}
                      onClick={() => setTcStatusFilter(s.key as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        tcStatusFilter === s.key
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                    <th className="p-3 font-bold">ID</th>
                    <th className="p-3 font-bold">Modul</th>
                    <th className="p-3 font-bold">Skenario Pengujian</th>
                    <th className="p-3 font-bold">Hasil yang Diharapkan</th>
                    <th className="p-3 font-bold">Prioritas</th>
                    <th className="p-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredTestCases.map(tc => (
                    <tr key={tc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400 whitespace-nowrap">
                        {tc.id}
                      </td>
                      <td className="p-3 whitespace-nowrap font-medium text-slate-500">
                        {tc.module}
                      </td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                        {tc.scenario}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">
                        {tc.expected}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tc.priority === 'High' ? 'bg-rose-500/10 text-rose-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {tc.priority}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {tc.status === 'pass' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Pass</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Fail ({tc.defectId})</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: TRACEABILITY MATRIX (RTM) ==================== */}
        {activeTab === 'rtm' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/30 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">
                  Requirements Traceability Matrix (RTM)
                </h4>
                <p className="text-xs text-teal-700 dark:text-teal-300">
                  Pemetaan 19 Kebutuhan Sistem terhadap 33 Test Cases & 5 Intentional Defects (100% Coverage).
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs">
                100% Covered
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                    <th className="p-3 font-bold">Req ID</th>
                    <th className="p-3 font-bold">Kebutuhan Fungsional (SRS)</th>
                    <th className="p-3 font-bold">Test Cases Terkait</th>
                    <th className="p-3 font-bold">Defect Terhubung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {RTM_DATA.map(item => (
                    <tr key={item.reqId} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                        {item.reqId}
                      </td>
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                        {item.requirement}
                      </td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-300">
                        {item.testCases}
                      </td>
                      <td className="p-3">
                        {item.defect !== '-' ? (
                          <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono font-bold text-[10px]">
                            {item.defect}
                          </span>
                        ) : (
                          <span className="text-emerald-500 font-bold">None (Pass)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Regression Scenarios Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                7 Regression Scenarios (RS-001 s/d RS-007)
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'RS-001', desc: 'Validasi form login & penanganan kredensial salah' },
                  { id: 'RS-002', desc: 'Rendering katalog produk, format harga & status stok' },
                  { id: 'RS-003', desc: 'Pencarian produk & modal interaktif' },
                  { id: 'RS-004', desc: 'Operasi cart (add, update qty, remove, subtotal)' },
                  { id: 'RS-005', desc: 'Validasi form checkout & pemilihan pembayaran' },
                  { id: 'RS-006', desc: 'Siklus checkout end-to-end hingga konfirmasi order' },
                  { id: 'RS-007', desc: 'Keunikan order ID & pembersihan localStorage cart' },
                ].map(rs => (
                  <div key={rs.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-bold text-[10px]">
                      {rs.id}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {rs.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
