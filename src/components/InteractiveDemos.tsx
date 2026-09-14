import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Trash2, DollarSign, PieChart, ShoppingBag, Utensils, Zap, Clock, 
  CheckCircle2, Circle, AlertCircle, Scale, Flame, Pill, Sun, Moon, Sunset, 
  Tv, Wind, Lightbulb, Refrigerator, Copy, Check, Code2, Sparkles, RefreshCw,
  ShoppingCart, Truck, Database, Layers, Globe, Search, Tag, ShieldCheck,
  Server, Cpu, Layers3, Navigation, ArrowRight, Activity, ImageOff,
  Star, StarHalf, Minus, Filter, ArrowUpDown, SlidersHorizontal, ThumbsUp,
  MessageSquare, Calendar, User, X, ExternalLink, Package, Eye, Info,
  CheckCircle, ChevronRight, RotateCcw, Heart
} from 'lucide-react';
import { Language } from '../types';

interface DemoProps {
  lang: Language;
}

// ============================================================================
// 0A. Mini Product Catalog with Live Filter & Shopping Cart (React JS)
// ============================================================================
export interface CatalogProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  thumbnail: string;
  brand?: string;
}

export interface CatalogCartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

const FALLBACK_CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max Titanium',
    description: 'Smartphone flagship dengan chip A17 Pro, bodi titanium, dan kamera 48MP periskop 5x zoom.',
    category: 'smartphones',
    price: 1199,
    discountPercentage: 10,
    rating: 4.9,
    stock: 14,
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    brand: 'Apple',
  },
  {
    id: 2,
    title: 'MacBook Air 15" M3 Chip',
    description: 'Laptop tipis dan bertenaga dengan Liquid Retina Display, baterai hingga 18 jam, dan MagSafe charging.',
    category: 'laptops',
    price: 1299,
    discountPercentage: 8,
    rating: 4.85,
    stock: 8,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    brand: 'Apple',
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5 Wireless ANC',
    description: 'Headphone nirkabel dengan Active Noise Cancellation kelas dunia, LDAC audio, dan baterai 30 jam.',
    category: 'audio',
    price: 348,
    discountPercentage: 15,
    rating: 4.8,
    stock: 22,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    brand: 'Sony',
  },
  {
    id: 4,
    title: 'Mechanical Gaming Keyboard RGB',
    description: 'Keyboard mekanik hot-swappable dengan switch linear, keycap PBT double-shot, dan koneksi tri-mode.',
    category: 'accessories',
    price: 89,
    discountPercentage: 12,
    rating: 4.65,
    stock: 35,
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    brand: 'Keychron',
  },
  {
    id: 5,
    title: 'Ergonomic Mesh Office Chair',
    description: 'Kursi kerja ergonomis dengan penopang lumbar dinamis 3D, sandaran mesh bernapas, dan armrest 4D.',
    category: 'furniture',
    price: 249,
    discountPercentage: 20,
    rating: 4.75,
    stock: 11,
    thumbnail: 'https://images.unsplash.com/photo-1580481077195-c99eb7d169b2?auto=format&fit=crop&w=600&q=80',
    brand: 'ErgoTech',
  },
  {
    id: 6,
    title: 'Eau de Parfum Cedar & Bergamot',
    description: 'Parfum aromatik mewah dengan sentuhan kayu cedar hangat, citrus bergamot segar, dan amber elegan.',
    category: 'fragrances',
    price: 115,
    discountPercentage: 5,
    rating: 4.7,
    stock: 19,
    thumbnail: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    brand: 'Maison Luxe',
  },
  {
    id: 7,
    title: 'Hydrating Peptide Face Serum 50ml',
    description: 'Serum anti-aging dengan 5 jenis multi-peptide, Hyaluronic Acid, dan Niacinamide untuk kulit glowing.',
    category: 'skincare',
    price: 42,
    discountPercentage: 10,
    rating: 4.88,
    stock: 45,
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    brand: 'GlowLab',
  },
  {
    id: 8,
    title: 'Organic Arabica Coffee Beans 500g',
    description: 'Biji kopi single origin Arabika pilihan dengan cita rasa floral, cokelat karamel, dan body lembut seimbang.',
    category: 'groceries',
    price: 18,
    discountPercentage: 0,
    rating: 4.92,
    stock: 60,
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
    brand: 'BeanCraft',
  }
];

export function MiniProductCatalogDemo({ lang }: DemoProps) {
  const [products, setProducts] = useState<CatalogProduct[]>(FALLBACK_CATALOG_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [couponInput, setCouponInput] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  const [detailProduct, setDetailProduct] = useState<CatalogProduct | null>(null);

  // Initialize cart from localStorage
  const [cart, setCart] = useState<CatalogCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mini_product_catalog_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        title: 'iPhone 15 Pro Max Titanium',
        price: 1199,
        thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
        category: 'smartphones',
        quantity: 1,
      },
      {
        id: 3,
        title: 'Sony WH-1000XM5 Wireless ANC',
        price: 348,
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
        category: 'audio',
        quantity: 2,
      }
    ];
  });

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mini_product_catalog_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Fetch real data from DummyJSON API with fallback
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=24');
      if (!res.ok) throw new Error('HTTP status ' + res.status);
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        const mapped: CatalogProduct[] = data.products.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category || 'general',
          price: p.price,
          discountPercentage: p.discountPercentage || 0,
          rating: p.rating || 4.5,
          stock: p.stock || 20,
          thumbnail: p.thumbnail || p.images?.[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
          brand: p.brand || 'Premium Brand',
        }));
        setProducts(mapped);
      } else {
        setProducts(FALLBACK_CATALOG_PRODUCTS);
      }
    } catch (err: any) {
      console.warn('API fetch fallback triggered:', err.message);
      setProducts(FALLBACK_CATALOG_PRODUCTS);
      setError(lang === 'id' ? 'Menggunakan fallback data lokal (API offline).' : 'Using local fallback dataset (API offline).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category.toLowerCase()));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCat;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Cart operations
  const addToCart = (product: CatalogProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          category: product.category,
          quantity: 1,
        }
      ];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CatalogCartItem[]
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const vatTax = taxableAmount * 0.11; // 11% PPN
  const grandTotal = taxableAmount + vatTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'DISKON10' || code === 'HEMAT10') {
      setDiscountPercent(10);
      setCouponMessage({
        text: lang === 'id' ? 'Kupon 10% Diskon Berhasil Diterapkan! 🎉' : '10% Discount Coupon Applied! 🎉',
        success: true
      });
    } else if (code === 'SUPER20' || code === 'ZIVO20') {
      setDiscountPercent(20);
      setCouponMessage({
        text: lang === 'id' ? 'Kupon 20% Mega Diskon Berhasil Diterapkan! 🔥' : '20% Mega Discount Applied! 🔥',
        success: true
      });
    } else {
      setDiscountPercent(0);
      setCouponMessage({
        text: lang === 'id' ? 'Kode voucher tidak valid. Coba "DISKON10" atau "SUPER20"' : 'Invalid coupon code. Try "DISKON10" or "SUPER20"',
        success: false
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setDiscountPercent(0);
      setCouponInput('');
      setCouponMessage(null);
    }, 1500);
  };

  const formatUSD = (val: number) => {
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  const formatIDR = (val: number) => {
    return 'Rp ' + (val * 15500).toLocaleString('id-ID');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-xs sm:text-sm">
      
      {/* Top Banner & Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-teal-600/15 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500 text-white dark:text-slate-950 font-black text-[10px] uppercase tracking-wider">
                React 18 + REST API
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                DummyJSON Integration
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'id' ? 'Mini Product Catalog & Shopping Cart' : 'Mini Product Catalog & Shopping Cart'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {lang === 'id'
                ? 'Live search, dynamic category filter, sort by price & rating, real-time cart quantity with 11% VAT, and LocalStorage persistence.'
                : 'Live search, dynamic category filter, price/rating sorting, real-time shopping cart with 11% VAT, and LocalStorage persistence.'}
            </p>
          </div>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white dark:text-slate-950 font-bold transition-all shadow-lg hover:shadow-teal-500/25 flex items-center gap-2 shrink-0 group"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="font-extrabold">{lang === 'id' ? 'Keranjang' : 'Cart'}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black">
              {totalCartCount}
            </span>
          </button>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-5">
          {/* Search Input */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'id' ? 'Cari produk, merk, atau deskripsi...' : 'Search products, brands, or keywords...'}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-xs text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sm:col-span-4 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label={lang === 'id' ? 'Urutkan Produk' : 'Sort Products'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 shadow-xs text-xs sm:text-sm font-semibold cursor-pointer"
            >
              <option value="default">{lang === 'id' ? '⚡ Urutkan: Rekomendasi' : '⚡ Sort: Recommended'}</option>
              <option value="price-asc">{lang === 'id' ? '📈 Harga: Terendah ke Tertinggi' : '📈 Price: Low to High'}</option>
              <option value="price-desc">{lang === 'id' ? '📉 Harga: Tertinggi ke Terendah' : '📉 Price: High to Low'}</option>
              <option value="rating">{lang === 'id' ? '⭐ Rating Tertinggi' : '⭐ Highest Rated'}</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 custom-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            {lang === 'id' ? 'Kategori:' : 'Category:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 capitalize ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-teal-500 text-white dark:text-slate-950 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat === 'all' ? (lang === 'id' ? 'Semua Produk' : 'All Products') : cat.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* State Banner: Result Count & API Status */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <span>
              {lang === 'id' ? 'Menampilkan ' : 'Showing '}
              <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong>
              {lang === 'id' ? ' produk' : ' products'}
              {searchQuery && ` untuk "${searchQuery}"`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchProducts}
              className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>{lang === 'id' ? 'Refresh API' : 'Refresh API'}</span>
            </button>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 animate-pulse">
                <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="p-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
            <Package className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'id' ? 'Tidak ada produk yang cocok' : 'No products found'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {lang === 'id'
                ? 'Coba ganti kata kunci pencarian atau pilih kategori lain untuk menemukan produk.'
                : 'Try adjusting your search terms or selecting a different category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-teal-500 text-white dark:text-slate-950 font-bold text-xs shadow-md"
            >
              {lang === 'id' ? 'Reset Pencarian' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const inCartItem = cart.find((item) => item.id === product.id);
              const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-teal-500/50 transition-all duration-200 group"
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div
                      onClick={() => setDetailProduct(product)}
                      className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative mb-3 cursor-pointer group-hover:opacity-95"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      {/* Category Badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        {product.category}
                      </span>

                      {/* Discount Badge */}
                      {hasDiscount && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-rose-500 text-white text-[10px] font-extrabold shadow-sm">
                          -{Math.round(product.discountPercentage!)}%
                        </span>
                      )}

                      {/* Stock Hint */}
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] font-mono text-slate-200">
                        {lang === 'id' ? `Stok: ${product.stock}` : `Stock: ${product.stock}`}
                      </span>
                    </div>

                    {/* Product Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">{product.brand || 'Brand'}</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <h4
                        onClick={() => setDetailProduct(product)}
                        className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer"
                        title={product.title}
                      >
                        {product.title}
                      </h4>

                      <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block font-mono">
                        {formatUSD(product.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {formatIDR(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {inCartItem ? (
                        <div className="flex items-center gap-1 bg-teal-50 dark:bg-teal-950/40 p-1 rounded-xl border border-teal-500/30">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="p-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-500 hover:text-white transition-colors"
                            title="Kurang"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold px-1.5 text-xs text-teal-700 dark:text-teal-300 font-mono">
                            {inCartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="p-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-500 hover:text-white transition-colors"
                            title="Tambah"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white dark:text-slate-950 font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{lang === 'id' ? '+ Keranjang' : '+ Add'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* SHOPPING CART DRAWER MODAL OVERLAY */}
      {/* ===================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[1100] flex justify-end bg-slate-950/70 backdrop-blur-xs">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0"
          />

          <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden">
            {/* Cart Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'id' ? 'Keranjang Belanja' : 'Shopping Cart'}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-teal-500 text-white dark:text-slate-950 text-xs font-black">
                  {totalCartCount} item
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Item List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
              {checkoutSuccess ? (
                <div className="p-8 text-center space-y-3 my-auto">
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Pesanan Berhasil Dibuat!' : 'Order Placed Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'id'
                      ? 'Simulasi checkout berhasil dieksekusi. Data pesanan telah diproses dan keranjang belanja telah dikosongkan.'
                      : 'Simulated checkout completed. Order has been processed and cart is cleared.'}
                  </p>
                  <button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setIsCartOpen(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-teal-500 text-white dark:text-slate-950 font-bold text-xs"
                  >
                    {lang === 'id' ? 'Lanjut Belanja' : 'Continue Shopping'}
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="p-8 text-center space-y-3 my-auto text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {lang === 'id' ? 'Keranjang Anda masih kosong.' : 'Your shopping cart is empty.'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'id' ? 'Pilih produk dari katalog untuk menambahkannya ke sini.' : 'Select products from the catalog to add them.'}
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h5>
                      <span className="text-[11px] text-teal-600 dark:text-teal-400 font-mono font-bold block">
                        {formatUSD(item.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatIDR(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-600"
                        title="Kurang"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs px-1 font-mono text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-600"
                        title="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors ml-1"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Summary */}
            {cart.length > 0 && !checkoutSuccess && (
              <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 space-y-3">
                {/* Voucher Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder={lang === 'id' ? 'Kupon (mis: DISKON10)' : 'Coupon (e.g. DISKON10)'}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs uppercase placeholder-slate-400 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
                  >
                    {lang === 'id' ? 'Gunakan' : 'Apply'}
                  </button>
                </form>

                {couponMessage && (
                  <p className={`text-[11px] font-semibold ${couponMessage.success ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                    {couponMessage.text}
                  </p>
                )}

                {/* Calculation Rows */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold">{formatUSD(subtotal)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>Diskon ({discountPercent}%)</span>
                      <span className="font-mono font-bold">-{formatUSD(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>PPN (11%)</span>
                    <span className="font-mono font-semibold">{formatUSD(vatTax)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span>{lang === 'id' ? 'Total Pembayaran' : 'Grand Total'}</span>
                    <div className="text-right">
                      <span className="font-mono text-teal-600 dark:text-teal-400 block">{formatUSD(grandTotal)}</span>
                      <span className="text-[10px] text-slate-400 font-mono block font-normal">{formatIDR(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout & Clear Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={clearCart}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold text-xs transition-colors"
                  >
                    {lang === 'id' ? 'Kosongkan' : 'Clear'}
                  </button>

                  <button
                    onClick={handleCheckout}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'id' ? 'Simulasi Checkout Sekarang' : 'Simulate Checkout Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* QUICK VIEW PRODUCT MODAL */}
      {/* ===================================================================== */}
      {detailProduct && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={detailProduct.thumbnail}
                alt={detailProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase">
                  {detailProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{detailProduct.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {detailProduct.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {detailProduct.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    {formatUSD(detailProduct.price)}
                  </span>
                  <span className="text-xs text-slate-400 block font-mono">
                    {formatIDR(detailProduct.price)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart(detailProduct);
                    setDetailProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-500 text-white dark:text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{lang === 'id' ? 'Tambah & Buka Keranjang' : 'Add & Open Cart'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ============================================================================
// 0B. Interactive Product Review & Rating Component (React JS)
// ============================================================================
export interface ProductReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  userHelpful?: boolean;
}

const INITIAL_PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    name: 'Budi Santoso',
    rating: 5,
    comment: 'Kualitas suaranya luar biasa jernih! Fitur ANC peredam bisingnya sangat efektif ketika bekerja di cafe yang ramai. Desain ringan dan bantalan telinganya sangat nyaman dipakai berjam-jam.',
    date: '3 hari yang lalu',
    verified: true,
    helpfulCount: 14,
  },
  {
    id: 'rev-2',
    name: 'Siti Rahmadani',
    rating: 5,
    comment: 'Pengiriman sangat cepat dan packing aman dengan bubble wrap tebal. Mikrofon jernih saat meeting online Zoom, baterai awet bisa tahan hampir seminggu pemakaian normal.',
    date: '1 minggu yang lalu',
    verified: true,
    helpfulCount: 8,
  },
  {
    id: 'rev-3',
    name: 'Dimas Aditya Pratama',
    rating: 4,
    comment: 'Build quality premium, bass punchy tanpa menutupi vokal. Sedikit kurang di aplikasi pendamping yang agak berat di awal koneksi bluetooth, tapi overall sangat memuaskan.',
    date: '2 minggu yang lalu',
    verified: true,
    helpfulCount: 5,
  },
  {
    id: 'rev-4',
    name: 'Jessica Meliani',
    rating: 5,
    comment: 'Sangat recommended untuk audiophile & daily commuter. Fitur touch sensor di ear cup sangat responsif untuk ganti lagu dan atur volume!',
    date: '1 bulan yang lalu',
    verified: true,
    helpfulCount: 11,
  }
];

export function ProductReviewRatingDemo({ lang }: DemoProps) {
  // LocalStorage state for reviews
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('interactive_product_reviews_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCT_REVIEWS;
  });

  // Form states
  const [nameInput, setNameInput] = useState<string>('');
  const [ratingInput, setRatingInput] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [commentInput, setCommentInput] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ name?: string; rating?: string; comment?: string }>({});
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filter & Sort states
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('interactive_product_reviews_v2', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  // Statistics calculation
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews)
    : 0;

  const starDistribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        counts[r.rating as 1 | 2 | 3 | 4 | 5]++;
      }
    });
    return [5, 4, 3, 2, 1].map((star) => {
      const count = counts[star as 1 | 2 | 3 | 4 | 5];
      const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
      return { star, count, percentage };
    });
  }, [reviews, totalReviews]);

  // Filtered & Sorted Reviews
  const displayedReviews = useMemo(() => {
    let list = reviews.filter((r) => {
      if (starFilter === 'all') return true;
      return r.rating === starFilter;
    });

    if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      list.sort((a, b) => a.rating - b.rating);
    }
    // 'newest' keeps default insertion order (top first)
    return list;
  }, [reviews, starFilter, sortBy]);

  // Form Validation & Submission
  const validateForm = () => {
    const errors: { name?: string; rating?: string; comment?: string } = {};

    if (!nameInput.trim()) {
      errors.name = lang === 'id' ? 'Nama lengkap wajib diisi.' : 'Full name is required.';
    }

    if (ratingInput === 0) {
      errors.rating = lang === 'id' ? 'Silakan pilih rating 1–5 bintang.' : 'Please select a rating between 1–5 stars.';
    }

    if (!commentInput.trim()) {
      errors.comment = lang === 'id' ? 'Komentar ulasan wajib diisi.' : 'Review comment is required.';
    } else if (commentInput.trim().length < 10) {
      errors.comment = lang === 'id' ? 'Komentar ulasan minimal 10 karakter.' : 'Review comment must be at least 10 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: ProductReview = {
        id: 'rev-' + Date.now(),
        name: nameInput.trim(),
        rating: ratingInput,
        comment: commentInput.trim(),
        date: lang === 'id' ? 'Baru saja' : 'Just now',
        verified: true,
        helpfulCount: 0,
      };

      setReviews([newReview, ...reviews]);
      setNameInput('');
      setRatingInput(0);
      setHoverRating(0);
      setCommentInput('');
      setFormErrors({});
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 400);
  };

  const handleToggleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isHelpful = !r.userHelpful;
          return {
            ...r,
            userHelpful: isHelpful,
            helpfulCount: isHelpful ? r.helpfulCount + 1 : Math.max(0, r.helpfulCount - 1),
          };
        }
        return r;
      })
    );
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleResetDefault = () => {
    setReviews(INITIAL_PRODUCT_REVIEWS);
    try {
      localStorage.setItem('interactive_product_reviews_v2', JSON.stringify(INITIAL_PRODUCT_REVIEWS));
    } catch {
      // ignore
    }
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return lang === 'id' ? '⭐⭐⭐⭐⭐ Luar Biasa (5/5)' : '⭐⭐⭐⭐⭐ Excellent (5/5)';
      case 4:
        return lang === 'id' ? '⭐⭐⭐⭐ Sangat Bagus (4/5)' : '⭐⭐⭐⭐ Very Good (4/5)';
      case 3:
        return lang === 'id' ? '⭐⭐⭐ Cukup / Standar (3/5)' : '⭐⭐⭐ Average (3/5)';
      case 2:
        return lang === 'id' ? '⭐⭐ Kurang Memuaskan (2/5)' : '⭐⭐ Poor (2/5)';
      case 1:
        return lang === 'id' ? '⭐ Sangat Kecewa (1/5)' : '⭐ Terrible (1/5)';
      default:
        return lang === 'id' ? 'Pilih rating bintang Anda' : 'Select your star rating';
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-xs sm:text-sm space-y-6 p-5 sm:p-7">
      
      {/* Product Context Showcase Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
            alt="Product"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
          />
          <div>
            <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase">
              Featured Product
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Sony WH-1000XM5 Wireless Headphones
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Noise-Canceling • Hi-Res Audio • 30H Battery • LDAC
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">{lang === 'id' ? 'Harga Resmi:' : 'Official Price:'}</span>
          <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400 font-mono block">$348.00</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Ready Stock</span>
        </div>
      </div>

      {/* Overview Analytics: Average Rating & Distribution Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left: Big Score Card */}
        <div className="md:col-span-5 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-center items-center shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            {lang === 'id' ? 'Rating Keseluruhan' : 'Overall Rating'}
          </span>
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-tight my-1">
            {averageRating.toFixed(1)}
          </div>
          
          {/* Star Icons */}
          <div className="flex items-center gap-1 text-amber-400 my-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'id'
              ? `Berdasarkan ${totalReviews} ulasan terverifikasi`
              : `Based on ${totalReviews} verified reviews`}
          </span>

          <button
            onClick={handleResetDefault}
            className="mt-3 text-[11px] font-semibold text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'id' ? 'Reset Ulasan Default' : 'Reset Default Reviews'}</span>
          </button>
        </div>

        {/* Right: Star Breakdown Progress Bars */}
        <div className="md:col-span-7 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">
            {lang === 'id' ? 'Distribusi Bintang 1–5' : 'Rating Distribution 1–5 Stars'}
          </span>

          {starDistribution.map(({ star, count, percentage }) => (
            <button
              key={star}
              onClick={() => setStarFilter(starFilter === star ? 'all' : star)}
              className={`w-full flex items-center gap-2.5 p-1 rounded-lg text-left transition-colors ${
                starFilter === star ? 'bg-teal-50 dark:bg-teal-950/40 ring-1 ring-teal-500/40' : 'hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              <div className="flex items-center gap-1 w-12 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                <span>{star}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              </div>

              {/* Progress Bar Container */}
              <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="w-16 text-right text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0">
                {count} ({percentage}%)
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* REVIEW SUBMISSION FORM (HTML5 Validation & State Management) */}
      {/* ===================================================================== */}
      <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'id' ? 'Tulis Ulasan & Beri Rating' : 'Write a Review & Rating'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'id'
                ? 'Bagikan pengalaman Anda tentang produk ini kepada pembeli lainnya.'
                : 'Share your genuine experience with other buyers.'}
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[11px] font-bold">
            HTML5 Validation + LocalStorage
          </span>
        </div>

        {submitSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>
              {lang === 'id'
                ? 'Terima kasih! Ulasan Anda berhasil ditambahkan dan disimpan di LocalStorage.'
                : 'Thank you! Your review has been saved to LocalStorage.'}
            </span>
          </div>
        )}

        <form onSubmit={handleReviewSubmit} className="space-y-4" noValidate>
          {/* Dynamic Star Rating Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              {lang === 'id' ? 'Rating Produk (1–5 Bintang) *' : 'Product Rating (1–5 Stars) *'}
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || ratingInput) >= star;
                  return (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => {
                        setRatingInput(star);
                        setFormErrors((prev) => ({ ...prev, rating: undefined }));
                      }}
                      className="p-1 text-slate-300 hover:scale-125 transition-transform focus:outline-none"
                      aria-label={`${star} star rating`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          isFilled
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Rating Feedback Label */}
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {getRatingLabel(hoverRating || ratingInput)}
              </span>
            </div>
            {formErrors.rating && (
              <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.rating}
              </p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {lang === 'id' ? 'Nama Anda *' : 'Your Name *'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  setFormErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder={lang === 'id' ? 'Contoh: Ahmad Rino' : 'e.g. John Doe'}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                  formErrors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 text-xs sm:text-sm`}
              />
            </div>
            {formErrors.name && (
              <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Comment Textarea & Character Counter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {lang === 'id' ? 'Ulasan Lengkap *' : 'Review Comment *'}
              </label>
              <span className={`text-[11px] font-mono ${commentInput.length >= 10 ? 'text-slate-400' : 'text-amber-500 font-semibold'}`}>
                {commentInput.length} / 500 {lang === 'id' ? 'karakter (min. 10)' : 'chars (min. 10)'}
              </span>
            </div>
            <textarea
              rows={3}
              value={commentInput}
              maxLength={500}
              onChange={(e) => {
                setCommentInput(e.target.value);
                setFormErrors((prev) => ({ ...prev, comment: undefined }));
              }}
              placeholder={
                lang === 'id'
                  ? 'Ceritakan tentang kualitas barang, pengiriman, suara, kenyamanan, atau alasan Anda menyukainya...'
                  : 'Tell us about the sound quality, comfort, delivery speed, or why you like it...'
              }
              className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                formErrors.comment ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 text-xs sm:text-sm`}
            />
            {formErrors.comment && (
              <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.comment}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>{lang === 'id' ? 'Kirim Ulasan Produk' : 'Submit Product Review'}</span>
          </button>
        </form>
      </div>

      {/* ===================================================================== */}
      {/* REVIEW LIST SECTION with Filters & Controls */}
      {/* ===================================================================== */}
      <div className="space-y-4">
        {/* Controls Bar: Star Filter & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          {/* Star Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            <button
              onClick={() => setStarFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                starFilter === 'all'
                  ? 'bg-teal-500 text-white dark:text-slate-950 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {lang === 'id' ? `Semua (${totalReviews})` : `All (${totalReviews})`}
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setStarFilter(star)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  starFilter === star
                    ? 'bg-teal-500 text-white dark:text-slate-950 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{star}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label={lang === 'id' ? 'Urutkan Ulasan' : 'Sort Reviews'}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-teal-500 shadow-xs cursor-pointer"
            >
              <option value="newest">{lang === 'id' ? 'Terbaru' : 'Newest'}</option>
              <option value="highest">{lang === 'id' ? 'Rating Tertinggi' : 'Highest Rating'}</option>
              <option value="lowest">{lang === 'id' ? 'Rating Terendah' : 'Lowest Rating'}</option>
            </select>
          </div>
        </div>

        {/* Review Cards */}
        {displayedReviews.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-700 dark:text-slate-300">
              {lang === 'id' ? 'Belum ada ulasan untuk filter ini.' : 'No reviews match this filter.'}
            </p>
            <button
              onClick={() => setStarFilter('all')}
              className="text-xs text-teal-600 dark:text-teal-400 underline font-semibold"
            >
              {lang === 'id' ? 'Lihat Semua Ulasan' : 'Show All Reviews'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                {/* Header Row: User, Rating, Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* User Avatar Initial */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          {rev.name}
                        </h5>
                        {rev.verified && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {lang === 'id' ? 'Pembeli Terverifikasi' : 'Verified Buyer'}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                  {rev.comment}
                </p>

                {/* Review Actions: Helpful count & Delete */}
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-700/60 text-slate-500 dark:text-slate-400">
                  <button
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
                      rev.userHelpful
                        ? 'bg-teal-500/10 border-teal-500/40 text-teal-600 dark:text-teal-400 font-bold'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${rev.userHelpful ? 'fill-teal-500 text-teal-500' : ''}`} />
                    <span>{lang === 'id' ? 'Membantu' : 'Helpful'} ({rev.helpfulCount})</span>
                  </button>

                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1 flex items-center gap-1 text-[11px]"
                    title="Hapus Ulasan"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{lang === 'id' ? 'Hapus' : 'Delete'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ============================================================================
// 1. Expense Tracker Demo (React JS)
// ============================================================================
interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: 'Makanan' | 'Transportasi' | 'Belanja' | 'Tagihan';
  date: string;
}

export function ExpenseTrackerDemo({ lang }: DemoProps) {
  const [budget, setBudget] = useState<number>(3000000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: 'Nasi Goreng & Es Teh', amount: 35000, category: 'Makanan', date: 'Hari Ini' },
    { id: 2, title: 'Bensin Motor', amount: 50000, category: 'Transportasi', date: 'Hari Ini' },
    { id: 3, title: 'Belanja Bulanan Supermarket', amount: 450000, category: 'Belanja', date: 'Kemarin' },
    { id: 4, title: 'Tagihan Internet Wi-Fi', amount: 320000, category: 'Tagihan', date: '3 hari lalu' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<'Makanan' | 'Transportasi' | 'Belanja' | 'Tagihan'>('Makanan');

  const totalExpense = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget - totalExpense;
  const percentageSpent = Math.min(Math.round((totalExpense / budget) * 100), 100);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount || Number(newAmount) <= 0) return;

    const newItem: Transaction = {
      id: Date.now(),
      title: newTitle.trim(),
      amount: Number(newAmount),
      category: newCategory,
      date: lang === 'id' ? 'Baru Saja' : 'Just Now',
    };

    setTransactions([newItem, ...transactions]);
    setNewTitle('');
    setNewAmount('');
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const formatRp = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/20">
            React JS Demo
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {lang === 'id' ? 'Pelacak Pengeluaran Harian' : 'Daily Expense Tracker'}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 block">{lang === 'id' ? 'Batas Anggaran' : 'Budget Limit'}</span>
          <span className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">{formatRp(budget)}</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{lang === 'id' ? 'Total Pengeluaran' : 'Total Expense'}</span>
          <span className="text-base font-bold text-rose-600 dark:text-rose-400">{formatRp(totalExpense)}</span>
        </div>
        <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{lang === 'id' ? 'Sisa Anggaran' : 'Remaining Budget'}</span>
          <span className={`text-base font-bold ${remainingBudget >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-500'}`}>
            {formatRp(remainingBudget)}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{lang === 'id' ? 'Persentase Terpakai' : 'Budget Used'}</span>
          <span className="text-base font-bold text-amber-600 dark:text-amber-400">{percentageSpent}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span>{lang === 'id' ? 'Penggunaan Anggaran' : 'Budget Meter'}</span>
          <span>{percentageSpent}% / 100%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentageSpent > 85
                ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                : 'bg-gradient-to-r from-teal-500 to-emerald-400'
            }`}
            style={{ width: `${percentageSpent}%` }}
          />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAddTransaction} className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-3">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{lang === 'id' ? '+ Tambah Transaksi Harian' : '+ Add Daily Expense'}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder={lang === 'id' ? 'Nama transaksi (misal: Makan Siang)' : 'Title (e.g. Lunch)'}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 col-span-1 sm:col-span-1"
          />
          <input
            type="number"
            placeholder={lang === 'id' ? 'Nominal Rp' : 'Amount Rp'}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
          >
            <option value="Makanan">Makanan</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Belanja">Belanja</option>
            <option value="Tagihan">Tagihan</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white dark:text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'id' ? 'Simpan Transaksi' : 'Save Transaction'}</span>
        </button>
      </form>

      {/* Transaction List */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">{lang === 'id' ? 'Catatan Terbaru' : 'Recent Entries'}</span>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {transactions.length === 0 ? (
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">{lang === 'id' ? 'Belum ada transaksi.' : 'No transactions logged yet.'}</p>
          ) : (
            transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/40 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    {item.category === 'Makanan' && <Utensils className="w-4 h-4" />}
                    {item.category === 'Transportasi' && <Zap className="w-4 h-4" />}
                    {item.category === 'Belanja' && <ShoppingBag className="w-4 h-4" />}
                    {item.category === 'Tagihan' && <DollarSign className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white block">{item.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.category} • {item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">-{formatRp(item.amount)}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                    title={lang === 'id' ? 'Hapus' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. Kitchen Recipe Scaler Demo (React JS)
// ============================================================================
interface Ingredient {
  name: string;
  baseQty: number;
  unit: string;
}

interface Recipe {
  id: string;
  title: string;
  baseServings: number;
  prepTime: string;
  ingredients: Ingredient[];
}

const RECIPES: Recipe[] = [
  {
    id: 'nasgor',
    title: 'Nasi Goreng Spesial 🍳',
    baseServings: 2,
    prepTime: '15 Menit',
    ingredients: [
      { name: 'Nasi Putih Cold/Sisa', baseQty: 400, unit: 'gram' },
      { name: 'Telur Ayam', baseQty: 2, unit: 'butir' },
      { name: 'Bawang Merah', baseQty: 4, unit: 'siung' },
      { name: 'Bawang Putih', baseQty: 2, unit: 'siung' },
      { name: 'Kecap Manis', baseQty: 2, unit: 'sdm' },
      { name: 'Minyak Goreng', baseQty: 2, unit: 'sdm' },
    ],
  },
  {
    id: 'soto',
    title: 'Soto Ayam Kampung 🍲',
    baseServings: 4,
    prepTime: '35 Menit',
    ingredients: [
      { name: 'Daging Ayam', baseQty: 500, unit: 'gram' },
      { name: 'Air Kaldu', baseQty: 1500, unit: 'ml' },
      { name: 'Serai & Lengkuas', baseQty: 2, unit: 'batang' },
      { name: 'Kunyit Halus', baseQty: 1, unit: 'sdt' },
      { name: 'Bihun Seduh', baseQty: 150, unit: 'gram' },
    ],
  },
  {
    id: 'pancake',
    title: 'Pancake Pisang Keju 🥞',
    baseServings: 2,
    prepTime: '20 Menit',
    ingredients: [
      { name: 'Tepung Terigu', baseQty: 150, unit: 'gram' },
      { name: 'Pisang Ambon', baseQty: 2, unit: 'buah' },
      { name: 'Susu Cair', baseQty: 200, unit: 'ml' },
      { name: 'Mentega Cair', baseQty: 30, unit: 'gram' },
      { name: 'Keju Parut', baseQty: 50, unit: 'gram' },
    ],
  },
];

export function RecipeScalerDemo({ lang }: DemoProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);
  const [servings, setServings] = useState<number>(4);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const scaleFactor = servings / selectedRecipe.baseServings;

  const toggleCheck = (name: string) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            React JS Demo
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {lang === 'id' ? 'Kalkulator Resep & Porsi Dapur' : 'Kitchen Recipe Scaler'}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>{selectedRecipe.prepTime}</span>
        </div>
      </div>

      {/* Recipe Selector */}
      <div className="flex flex-wrap gap-2">
        {RECIPES.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setSelectedRecipe(r);
              setServings(r.baseServings * 2);
              setCheckedItems({});
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedRecipe.id === r.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs'
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      {/* Servings Adjuster */}
      <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block">{lang === 'id' ? 'Target Porsi Makan' : 'Target Servings'}</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {lang === 'id' ? `Standar resep asal: ${selectedRecipe.baseServings} porsi` : `Base recipe: ${selectedRecipe.baseServings} servings`}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setServings(Math.max(1, servings - 1))}
            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center transition-colors shadow-xs"
          >
            -
          </button>
          <span className="text-base font-bold font-mono text-slate-900 dark:text-white min-w-[24px] text-center">{servings}</span>
          <button
            onClick={() => setServings(servings + 1)}
            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center transition-colors shadow-xs"
          >
            +
          </button>
        </div>
      </div>

      {/* Ingredient List */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {lang === 'id' ? `Daftar Bahan (${servings} Porsi):` : `Ingredients for ${servings} Servings:`}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Scale Ratio: {scaleFactor.toFixed(1)}x
          </span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
          {selectedRecipe.ingredients.map((ing, idx) => {
            const calculatedQty = (ing.baseQty * scaleFactor).toLocaleString('id-ID', { maximumFractionDigits: 1 });
            const isChecked = !!checkedItems[ing.name];

            return (
              <div
                key={idx}
                onClick={() => toggleCheck(ing.name)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-slate-400 dark:text-slate-500 line-through'
                    : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  )}
                  <span className="text-xs font-semibold">{ing.name}</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  {calculatedQty} {ing.unit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. Medication & Health Reminder Demo (Next.js)
// ============================================================================
interface Medication {
  id: number;
  name: string;
  dosage: string;
  timeSlot: 'Pagi' | 'Siang' | 'Malam';
  taken: boolean;
}

export function MedicationReminderDemo({ lang }: DemoProps) {
  const [meds, setMeds] = useState<Medication[]>([
    { id: 1, name: 'Vitamin C 500mg', dosage: '1 Tablet', timeSlot: 'Pagi', taken: true },
    { id: 2, name: 'Obat Kolesterol / Tensi', dosage: '1 Kapsul sesudah makan', timeSlot: 'Pagi', taken: true },
    { id: 3, name: 'Suplemen D3 & Zinc', dosage: '1 Tablet', timeSlot: 'Siang', taken: false },
    { id: 4, name: 'Omega-3 Fish Oil', dosage: '2 Kapsul lunak', timeSlot: 'Malam', taken: false },
  ]);

  const [nameInput, setNameInput] = useState('');
  const [dosageInput, setDosageInput] = useState('');
  const [timeInput, setTimeInput] = useState<'Pagi' | 'Siang' | 'Malam'>('Pagi');

  const takenCount = meds.filter((m) => m.taken).length;
  const progressPct = meds.length > 0 ? Math.round((takenCount / meds.length) * 100) : 0;

  const toggleMed = (id: number) => {
    setMeds(meds.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setMeds([
      ...meds,
      {
        id: Date.now(),
        name: nameInput.trim(),
        dosage: dosageInput.trim() || '1 Tablet',
        timeSlot: timeInput,
        taken: false,
      },
    ]);

    setNameInput('');
    setDosageInput('');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            Next.js App Router Demo
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {lang === 'id' ? 'Pengingat Minum Obat & Vitamin' : 'Medication & Health Reminder'}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
            Server Component
          </span>
        </div>
      </div>

      {/* Progress Header */}
      <div className="bg-gradient-to-r from-slate-100 to-cyan-50 dark:from-slate-800 dark:to-cyan-950/60 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/40 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-300 block font-semibold">{lang === 'id' ? 'Kepatuhan Harian' : 'Daily Compliance'}</span>
            <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400">
              {takenCount} {lang === 'id' ? 'dari' : 'of'} {meds.length} {lang === 'id' ? 'diminum' : 'completed'}
            </span>
          </div>
        </div>

        <div className="text-right font-mono font-extrabold text-2xl text-cyan-700 dark:text-cyan-300">
          {progressPct}%
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAddMed} className="bg-white dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{lang === 'id' ? '+ Tambah Obat / Suplemen' : '+ Add Medication'}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder={lang === 'id' ? 'Nama Obat/Vitamin' : 'Medication Name'}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            placeholder={lang === 'id' ? 'Dosis (1 Tablet)' : 'Dosage (1 Tablet)'}
            value={dosageInput}
            onChange={(e) => setDosageInput(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <select
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value as any)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Pagi">Pagi (Morning)</option>
            <option value="Siang">Siang (Afternoon)</option>
            <option value="Malam">Malam (Evening)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white dark:text-slate-950 font-bold rounded-lg transition-colors text-xs flex items-center justify-center gap-1 shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'id' ? 'Simpan Jadwal' : 'Save Schedule'}</span>
        </button>
      </form>

      {/* Medication List */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">{lang === 'id' ? 'Jadwal Hari Ini:' : 'Today Schedule:'}</span>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
          {meds.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMed(item.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                item.taken
                  ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800/50 text-slate-400 dark:text-slate-500'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.taken ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                )}
                <div>
                  <span className={`text-xs font-bold block ${item.taken ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.dosage}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {item.timeSlot === 'Pagi' && <Sun className="w-3 h-3 text-amber-500" />}
                {item.timeSlot === 'Siang' && <Sunset className="w-3 h-3 text-orange-500" />}
                {item.timeSlot === 'Malam' && <Moon className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
                <span>{item.timeSlot}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. ZIVO Marketplace — E-Commerce Engine & Architecture Guide (Next.js 15)
// ============================================================================
interface ProductItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  qty: number;
  simulatedError?: boolean;
}

export function ZivoMarketplaceDemo({ lang }: DemoProps) {
  const [activeTab, setActiveTab] = useState<'cart' | 'tracking' | 'redis' | 'architecture'>('cart');

  // 1. Cart State
  const [cartItems, setCartItems] = useState<ProductItem[]>([
    { id: 1, name: 'ZIVO SoundPulse ANC Wireless Headphones', price: 1499000, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', qty: 1 },
    { id: 2, name: 'ZIVO FitPro AMOLED Smartwatch v2', price: 899000, category: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', qty: 1 },
    { id: 3, name: 'ZIVO Urban Leather Backpack 20L', price: 549000, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80', qty: 1 }
  ]);

  const [couponCode, setCouponCode] = useState('ZIVO10');
  const [appliedDiscount, setAppliedDiscount] = useState(0.10); // 10%
  const [couponStatusMsg, setCouponStatusMsg] = useState('Kupon ZIVO10 Aktif (-10%)');

  // Fallback image tester state
  const [brokenImgTest, setBrokenImgTest] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingFee = subtotal > 0 ? 25000 : 0;
  const taxPPN = (subtotal - discountAmount) * 0.11; // 11% PPN
  const grandTotal = subtotal - discountAmount + shippingFee + taxPPN;

  const updateQty = (id: number, delta: number) => {
    setCartItems(cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ZIVO10') {
      setAppliedDiscount(0.10);
      setCouponStatusMsg(lang === 'id' ? 'Kupon ZIVO10 Berhasil! (-10%)' : 'ZIVO10 Coupon Applied! (-10%)');
    } else if (couponCode.trim().toUpperCase() === 'ZIVO20') {
      setAppliedDiscount(0.20);
      setCouponStatusMsg(lang === 'id' ? 'Kupon Super ZIVO20! (-20%)' : 'Super Coupon ZIVO20! (-20%)');
    } else {
      setAppliedDiscount(0);
      setCouponStatusMsg(lang === 'id' ? 'Kode Kupon Tidak Valid' : 'Invalid Coupon Code');
    }
  };

  // 2. Courier Tracking State
  const [trackingStep, setTrackingStep] = useState(3);
  const [refreshingGPS, setRefreshingGPS] = useState(false);

  const simulateGPSRefresh = () => {
    setRefreshingGPS(true);
    setTimeout(() => setRefreshingGPS(false), 800);
  };

  // 3. Redis Cache Simulation State
  const [cacheHitCount, setCacheHitCount] = useState(148);
  const [cacheMissCount, setCacheMissCount] = useState(4);
  const [lastQueryTime, setLastQueryTime] = useState('0.8 ms');
  const [isWarmCache, setIsWarmCache] = useState(true);

  const triggerRedisQuery = (type: 'hit' | 'miss') => {
    if (type === 'hit') {
      setCacheHitCount((prev) => prev + 1);
      setLastQueryTime(`${(Math.random() * 0.5 + 0.5).toFixed(1)} ms (In-Memory Redis)`);
    } else {
      setCacheMissCount((prev) => prev + 1);
      setLastQueryTime(`${(Math.random() * 40 + 90).toFixed(0)} ms (Cold DB Fetch)`);
    }
  };

  const formatRp = (num: number) => 'Rp ' + Math.round(num).toLocaleString('id-ID');

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xl space-y-6 text-sm">
      {/* Brand Header & Tagline */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white dark:text-slate-950 font-black flex items-center justify-center text-lg tracking-wider shadow-lg">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-wide">ZIVO Marketplace</h4>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-[10px] font-bold border border-teal-500/30">
                  Next.js 15.3 Engine
                </span>
              </div>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium italic">
                {lang === 'id' ? '“Belanja lebih cepat. Lebih cerdas. Lebih terpercaya.”' : '“Shop smarter. Faster. Better.”'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{lang === 'id' ? 'Bahasa Indonesia' : 'English (US)'}</span>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
          <button
            onClick={() => setActiveTab('cart')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'cart'
                ? 'bg-teal-500 text-white dark:text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'id' ? 'Cart & Checkout Drawer' : 'Cart & Checkout'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'tracking'
                ? 'bg-emerald-500 text-white dark:text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs'
            }`}
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'id' ? 'Lacak Kurir Real-Time' : 'Live Order Tracking'}</span>
          </button>

          <button
            onClick={() => setActiveTab('redis')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'redis'
                ? 'bg-cyan-500 text-white dark:text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs'
            }`}
          >
            <Server className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'id' ? 'Simulasi Redis Cache' : 'Redis Cache Engine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'architecture'
                ? 'bg-amber-500 text-white dark:text-slate-950 shadow-md font-black'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs'
            }`}
          >
            <Layers3 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'id' ? 'Atomic Design Matrix' : 'Atomic Design'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CART & CHECKOUT DRAWER */}
      {activeTab === 'cart' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{lang === 'id' ? 'Item Dalam Keranjang Belanja' : 'Shopping Cart Items'} ({cartItems.length})</span>
            </span>

            <button
              onClick={() => setBrokenImgTest(!brokenImgTest)}
              className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1"
            >
              <ImageOff className="w-3 h-3" />
              <span>{brokenImgTest ? 'Reset Gambar HD' : 'Uji Fallback Gambar Rusak'}</span>
            </button>
          </div>

          {/* Item List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
            {cartItems.length === 0 ? (
              <p className="text-center text-slate-400 dark:text-slate-500 py-6">{lang === 'id' ? 'Keranjang belanja Anda kosong.' : 'Your cart is currently empty.'}</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={brokenImgTest ? 'https://broken-link-example.com/invalid.jpg' : item.image}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent && !parent.querySelector('.fallback-box')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-box w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-[10px] text-teal-600 dark:text-teal-400 font-bold text-center p-1';
                          fallback.innerText = 'ZIVO HD';
                          parent.appendChild(fallback);
                        }
                      }}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block max-w-[200px] sm:max-w-[260px] truncate">{item.name}</span>
                      <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold">{formatRp(item.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center text-xs shadow-xs">
                        -
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white min-w-[16px] text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 rounded bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center text-xs shadow-xs">
                        +
                      </button>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code Input */}
          <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={lang === 'id' ? 'Masukkan kode kupon (ZIVO10 / ZIVO20)' : 'Coupon code (ZIVO10 / ZIVO20)'}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white uppercase placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-white dark:text-slate-950 font-bold rounded-lg text-xs transition-colors"
              >
                {lang === 'id' ? 'Gunakan Kupon' : 'Apply'}
              </button>
            </div>
            {couponStatusMsg && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">{couponStatusMsg}</span>
            )}
          </div>

          {/* Price Calculation Summary */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Subtotal Produk</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">{formatRp(subtotal)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Diskon Kupon ({(appliedDiscount * 100)}%)</span>
                <span className="font-mono">-{formatRp(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Estimasi Ongkos Kirim (JNE/ZIVO Express)</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">{formatRp(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>PPN 11% (Pajak Pertambahan Nilai)</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">{formatRp(taxPPN)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-bold">
              <span className="text-slate-900 dark:text-white">Grand Total Pembayaran</span>
              <span className="text-teal-600 dark:text-teal-400 font-mono text-base">{formatRp(grandTotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE COURIER ORDER TRACKING */}
      {activeTab === 'tracking' && (
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">{lang === 'id' ? 'Nomor Resi Pengiriman' : 'Tracking Number'}</span>
              <span className="text-sm font-mono font-bold text-teal-600 dark:text-teal-400">ZV-98421049-ID</span>
            </div>
            <button
              onClick={simulateGPSRefresh}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshingGPS ? 'animate-spin' : ''}`} />
              <span>{lang === 'id' ? 'Refresh GPS Kurir' : 'Live GPS Refresh'}</span>
            </button>
          </div>

          {/* Live Courier Details */}
          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-600 dark:text-teal-300 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Kurir: ZIVO Express (Pak Budi S.)</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Armada Motor • Nopol B 4820 ZVO</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/30 animate-pulse">
              ● Live Tracking
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{lang === 'id' ? 'Linimasa Pengiriman' : 'Shipment Timeline'}</span>
            <div className="space-y-2.5">
              {[
                { step: 1, title: 'Pesanan Diterima & Terkonfirmasi', desc: 'Sistem ZIVO memverifikasi pembayaran PPN 11%', time: '10:15 WIB' },
                { step: 2, title: 'Dikemas di Gudang Pusat Jakarta', desc: 'Barang dicek QC dan dilapisi bubble wrap', time: '11:40 WIB' },
                { step: 3, title: 'Kurir Menuju Lokasi Penerima', desc: 'Kurir Budi sedang berkendara (0.8 km lagi)', time: '13:05 WIB (Aktif)' },
                { step: 4, title: 'Tiba di Alamat Tujuan', desc: 'Estimasi penerimaan oleh pelanggan', time: '13:25 WIB' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 text-xs">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold ${
                    item.step <= trackingStep ? 'bg-teal-500 text-white dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                  }`}>
                    {item.step <= trackingStep ? '✓' : item.step}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold block ${item.step === trackingStep ? 'text-teal-600 dark:text-teal-300' : 'text-slate-800 dark:text-slate-300'}`}>{item.title}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{item.desc}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REDIS IN-MEMORY CACHE MONITOR */}
      {activeTab === 'redis' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Redis Cache Hits</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">{cacheHitCount}</span>
            </div>
            <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Redis Cache Misses</span>
              <span className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">{cacheMissCount}</span>
            </div>
            <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Kecepatan Kueri</span>
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300 font-mono">{lastQueryTime}</span>
            </div>
            <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Hit Ratio</span>
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono">
                {((cacheHitCount / (cacheHitCount + cacheMissCount)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerRedisQuery('hit')}
              className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulasi Query Cache HIT (0.8ms)</span>
            </button>
            <button
              onClick={() => triggerRedisQuery('miss')}
              className="flex-1 py-2 bg-rose-500/10 dark:bg-rose-500/20 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Simulasi Cold DB Fetch (110ms)</span>
            </button>
          </div>

          <div className="bg-slate-100 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-800 dark:text-slate-100 shadow-xs">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block font-sans font-semibold">Active Redis Cache Keys:</span>
            <div className="text-emerald-700 dark:text-emerald-400 font-semibold">SET zivo:catalog:featured_v2 TTL 3600 (OK)</div>
            <div className="text-cyan-700 dark:text-cyan-400 font-semibold">GET zivo:cart:session_usr_9842 -&gt; 3 items cached</div>
            <div className="text-amber-700 dark:text-amber-400 font-semibold">RATE_LIMIT zivo:ip:103.28.14.2 -&gt; 24/100 req/min</div>
          </div>
        </div>
      )}

      {/* TAB 4: ATOMIC DESIGN & TECH STACK MATRIX */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-xs">
            <span className="font-bold text-amber-600 dark:text-amber-400 block text-sm">Structure Pattern: Atomic Design System</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-teal-600 dark:text-teal-400 font-bold block mb-1">1. Atoms</span>
                <span className="text-slate-700 dark:text-slate-300">Badge, Button, Input, IconWrapper, Spinner</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">2. Molecules</span>
                <span className="text-slate-700 dark:text-slate-300">LanguageDropdown, Pagination, ProductCard, SearchBar, Toast</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold block mb-1">3. Organisms</span>
                <span className="text-slate-700 dark:text-slate-300">CartDrawer, Navbar, ProductGrid, RedisCacheDrawer, OrderTracker</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-amber-600 dark:text-amber-400 font-bold block mb-1">4. Templates</span>
                <span className="text-slate-700 dark:text-slate-300">HeroBanner, Footer, PageWrapper, LayoutGrid</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2 shadow-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Tech Stack Matrix:</span>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-slate-700">Next.js 15.3</span>
              <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-slate-700">React 19</span>
              <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-700">TypeScript 5.8</span>
              <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700">Zustand State</span>
              <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-rose-700 dark:text-rose-300 border border-slate-200 dark:border-slate-700">Storybook 8.6</span>
              <span className="bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md text-purple-700 dark:text-purple-300 border border-slate-200 dark:border-slate-700">Playwright 1.54 E2E</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Alias ElectricityEstimatorDemo to ZivoMarketplaceDemo for backwards compatibility
export function ElectricityEstimatorDemo(props: DemoProps) {
  return <ZivoMarketplaceDemo {...props} />;
}

// ============================================================================
// Source Code Snippets Provider
// ============================================================================
export const SOURCE_CODES: Record<string, string> = {
  'expense-tracker-react': `// App.jsx - Daily Expense & Budget Tracker (React JS)
import React, { useState, useEffect } from 'react';

export default function ExpenseTracker() {
  const [budget, setBudget] = useState(3000000);
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Nasi Goreng & Es Teh', amount: 35000, category: 'Makanan' },
    { id: 2, title: 'Bensin Motor', amount: 50000, category: 'Transportasi' },
  ]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makanan');

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const remaining = budget - totalSpent;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    setTransactions([{ id: Date.now(), title, amount: Number(amount), category }, ...transactions]);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Pelacak Pengeluaran Harian</h2>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-800 p-3 rounded-xl">
          <span className="text-xs text-slate-400 block">Total Pengeluaran</span>
          <span className="text-lg font-bold text-rose-400">Rp {totalSpent.toLocaleString()}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl">
          <span className="text-xs text-slate-400 block">Sisa Anggaran</span>
          <span className="text-lg font-bold text-emerald-400">Rp {remaining.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Nama transaksi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Nominal Rp"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm"
          />
          <button className="bg-teal-500 font-bold px-4 rounded-lg text-slate-950">
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
}`,

  'recipe-scaler-react': `// RecipeScaler.jsx - Kitchen Recipe & Portion Scaler (React JS)
import React, { useState } from 'react';

const RECIPE = {
  title: 'Nasi Goreng Spesial',
  baseServings: 2,
  ingredients: [
    { name: 'Nasi Putih', qty: 400, unit: 'gram' },
    { name: 'Telur Ayam', qty: 2, unit: 'butir' },
    { name: 'Bawang Merah', qty: 4, unit: 'siung' },
    { name: 'Kecap Manis', qty: 2, unit: 'sdm' },
  ]
};

export default function RecipeScaler() {
  const [servings, setServings] = useState(4);
  const scale = servings / RECIPE.baseServings;

  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl">
      <h3 className="text-xl font-bold mb-2">{RECIPE.title}</h3>
      
      <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl mb-4">
        <span>Target Porsi:</span>
        <button onClick={() => setServings(Math.max(1, servings - 1))} className="px-3 bg-slate-700 rounded">-</button>
        <span className="font-bold font-mono text-lg">{servings}</span>
        <button onClick={() => setServings(servings + 1)} className="px-3 bg-slate-700 rounded">+</button>
      </div>

      <ul className="space-y-2">
        {RECIPE.ingredients.map((ing, i) => (
          <li key={i} className="flex justify-between bg-slate-800/80 p-2.5 rounded-lg text-sm">
            <span>{ing.name}</span>
            <span className="font-bold text-emerald-400">{(ing.qty * scale).toFixed(0)} {ing.unit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,

  'medication-reminder-next': `// app/medication/page.tsx - Daily Medication Reminder (Next.js App Router)
import React from 'react';
import MedicationList from './MedicationList';

export default async function MedicationPage() {
  // Simulasi Server Component fetching jadwal obat harian
  const initialMeds = [
    { id: 1, name: 'Vitamin C 500mg', dosage: '1 Tablet', timeSlot: 'Pagi', taken: true },
    { id: 2, name: 'Suplemen D3 & Zinc', dosage: '1 Tablet', timeSlot: 'Siang', taken: false },
  ];

  return (
    <main className="p-6 bg-slate-900 text-white min-h-screen">
      <header className="mb-6">
        <span className="text-xs text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
          Next.js Server Component
        </span>
        <h1 className="text-2xl font-bold mt-2">Pengingat Minum Obat Harian</h1>
      </header>

      {/* Client Component Interactive Checklist */}
      <MedicationList initialMeds={initialMeds} />
    </main>
  );
}`,

  'mini-product-catalog': `// App.tsx - Mini Product Catalog with Live Filter & Shopping Cart
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Search, Filter, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';

export default function MiniProductCatalogApp() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchQuery = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchQuery && matchCat;
    });
  }, [products, search, selectedCategory]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const vat = subtotal * 0.11; // 11% PPN

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Katalog Produk Interaktif</h1>
        <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl font-bold">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart ({totalItems})</span>
        </button>
      </header>

      {/* Search & Category Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk..."
          className="flex-1 p-3 rounded-xl border border-slate-300"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-xl mb-3" />
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-teal-600 font-bold">\${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-teal-500 text-white py-2 rounded-xl font-bold"
            >
              + Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  'product-review-rating': `// ProductReviewRating.tsx - Reusable Star Rating & Review Component
import React, { useState, useEffect } from 'react';
import { Star, User, CheckCircle2, ThumbsUp, Trash2 } from 'lucide-react';

export default function ProductReviewRating() {
  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('product_reviews')) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || comment.trim().length < 10) {
      setError('Mohon lengkapi nama, pilih rating (1-5 bintang), dan komentar min. 10 karakter.');
      return;
    }
    const newRev = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: 'Baru saja',
      verified: true,
      helpful: 0,
    };
    setReviews([newRev, ...reviews]);
    setName('');
    setRating(0);
    setComment('');
    setError('');
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : '0.0';

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div>
          <h2 className="text-xl font-bold">Ulasan & Rating Pembeli</h2>
          <p className="text-sm text-slate-500">Rata-rata rating: {avgRating} / 5.0 ({reviews.length} ulasan)</p>
        </div>
      </div>

      {/* Review Submission Form with HTML5 Validation */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-bold mb-1">Rating Anda (1–5 Bintang) *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                type="button"
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className="p-1 focus:outline-none"
              >
                <Star className={\`w-6 h-6 \${(hoverRating || rating) >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}\`} />
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda *"
          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
        />

        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis ulasan Anda (minimal 10 karakter) *"
          className="w-full p-3 rounded-xl border border-slate-300 text-sm"
        />

        {error && <p className="text-rose-500 text-xs font-semibold">{error}</p>}

        <button type="submit" className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl shadow-md">
          Kirim Ulasan
        </button>
      </form>
    </div>
  );
}`,

  'zivo-marketplace-next': `// app/page.tsx - ZIVO Marketplace E-Commerce Engine (Next.js 15 & Atomic Design)
import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { HeroBanner } from '@/components/templates/HeroBanner';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { CartDrawer } from '@/components/organisms/CartDrawer';
import { Footer } from '@/components/templates/Footer';

export default function ZivoStorePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Organisms: Top Navigation & Language Switcher */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-8">
        {/* Templates: Promotional Hero Banner */}
        <HeroBanner 
          tagline="Belanja lebih cepat. Lebih cerdas. Lebih terpercaya." 
        />

        {/* Organisms: Product Catalog & Redis In-Memory Search */}
        <ProductGrid />
      </main>

      {/* Organisms: Cart Drawer with 11% PPN calculation & Live Order Tracker */}
      <CartDrawer />

      {/* Templates: Footer */}
      <Footer />
    </div>
  );
}`,

  'electricity-estimator-next': `// app/page.tsx - ZIVO Marketplace E-Commerce Engine (Next.js 15 & Atomic Design)
import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';

export default function ZivoStorePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold">ZIVO Marketplace Engine</h1>
      <p>Belanja lebih cepat. Lebih cerdas. Lebih terpercaya.</p>
    </div>
  );
}`
};

