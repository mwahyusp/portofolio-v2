import React, { useState } from 'react';
import { 
  Plus, Trash2, DollarSign, PieChart, ShoppingBag, Utensils, Zap, Clock, 
  CheckCircle2, Circle, AlertCircle, Scale, Flame, Pill, Sun, Moon, Sunset, 
  Tv, Wind, Lightbulb, Refrigerator, Copy, Check, Code2, Sparkles, RefreshCw,
  ShoppingCart, Truck, Database, Layers, Globe, Search, Tag, ShieldCheck,
  Server, Cpu, Layers3, Navigation, ArrowRight, Activity, ImageOff
} from 'lucide-react';
import { Language } from '../types';

interface DemoProps {
  lang: Language;
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
    <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            React JS Demo
          </span>
          <h4 className="text-lg font-bold text-white mt-1">
            {lang === 'id' ? 'Pelacak Pengeluaran Harian' : 'Daily Expense Tracker'}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">{lang === 'id' ? 'Batas Anggaran' : 'Budget Limit'}</span>
          <span className="font-mono font-bold text-teal-400 text-base">{formatRp(budget)}</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">{lang === 'id' ? 'Total Pengeluaran' : 'Total Expense'}</span>
          <span className="text-base font-bold text-rose-400">{formatRp(totalExpense)}</span>
        </div>
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">{lang === 'id' ? 'Sisa Anggaran' : 'Remaining Budget'}</span>
          <span className={`text-base font-bold ${remainingBudget >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
            {formatRp(remainingBudget)}
          </span>
        </div>
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50">
          <span className="text-xs text-slate-400 block mb-1">{lang === 'id' ? 'Persentase Terpakai' : 'Budget Used'}</span>
          <span className="text-base font-bold text-amber-400">{percentageSpent}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>{lang === 'id' ? 'Penggunaan Anggaran' : 'Budget Meter'}</span>
          <span>{percentageSpent}% / 100%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
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
      <form onSubmit={handleAddTransaction} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
        <span className="text-xs font-bold text-slate-300 block">{lang === 'id' ? '+ Tambah Transaksi Harian' : '+ Add Daily Expense'}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder={lang === 'id' ? 'Nama transaksi (misal: Makan Siang)' : 'Title (e.g. Lunch)'}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 col-span-1 sm:col-span-1"
          />
          <input
            type="number"
            placeholder={lang === 'id' ? 'Nominal Rp' : 'Amount Rp'}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          >
            <option value="Makanan">Makanan</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Belanja">Belanja</option>
            <option value="Tagihan">Tagihan</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'id' ? 'Simpan Transaksi' : 'Save Transaction'}</span>
        </button>
      </form>

      {/* Transaction List */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 block">{lang === 'id' ? 'Catatan Terbaru' : 'Recent Entries'}</span>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {transactions.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">{lang === 'id' ? 'Belum ada transaksi.' : 'No transactions logged yet.'}</p>
          ) : (
            transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/90 border border-slate-700/40 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-md bg-teal-500/10 text-teal-400">
                    {item.category === 'Makanan' && <Utensils className="w-4 h-4" />}
                    {item.category === 'Transportasi' && <Zap className="w-4 h-4" />}
                    {item.category === 'Belanja' && <ShoppingBag className="w-4 h-4" />}
                    {item.category === 'Tagihan' && <DollarSign className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.category} • {item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-rose-400">-{formatRp(item.amount)}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
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
    <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            React JS Demo
          </span>
          <h4 className="text-lg font-bold text-white mt-1">
            {lang === 'id' ? 'Kalkulator Resep & Porsi Dapur' : 'Kitchen Recipe Scaler'}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
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
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      {/* Servings Adjuster */}
      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">{lang === 'id' ? 'Target Porsi Makan' : 'Target Servings'}</span>
          <span className="text-xs font-semibold text-emerald-400">
            {lang === 'id' ? `Standar resep asal: ${selectedRecipe.baseServings} porsi` : `Base recipe: ${selectedRecipe.baseServings} servings`}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setServings(Math.max(1, servings - 1))}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors"
          >
            -
          </button>
          <span className="text-base font-bold font-mono text-white min-w-[24px] text-center">{servings}</span>
          <button
            onClick={() => setServings(servings + 1)}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Ingredient List */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-300">
            {lang === 'id' ? `Daftar Bahan (${servings} Porsi):` : `Ingredients for ${servings} Servings:`}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
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
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-slate-400 line-through'
                    : 'bg-slate-800/90 border-slate-700/60 text-slate-100 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="text-xs font-semibold">{ing.name}</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
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
    <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            Next.js App Router Demo
          </span>
          <h4 className="text-lg font-bold text-white mt-1">
            {lang === 'id' ? 'Pengingat Minum Obat & Vitamin' : 'Medication & Health Reminder'}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
            Server Component
          </span>
        </div>
      </div>

      {/* Progress Header */}
      <div className="bg-gradient-to-r from-slate-800 to-cyan-950/60 p-4 rounded-xl border border-cyan-800/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-300 block font-semibold">{lang === 'id' ? 'Kepatuhan Harian' : 'Daily Compliance'}</span>
            <span className="text-sm font-bold text-cyan-400">
              {takenCount} {lang === 'id' ? 'dari' : 'of'} {meds.length} {lang === 'id' ? 'diminum' : 'completed'}
            </span>
          </div>
        </div>

        <div className="text-right font-mono font-extrabold text-2xl text-cyan-300">
          {progressPct}%
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAddMed} className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
        <span className="text-xs font-bold text-slate-300 block">{lang === 'id' ? '+ Tambah Obat / Suplemen' : '+ Add Medication'}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder={lang === 'id' ? 'Nama Obat/Vitamin' : 'Medication Name'}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="text"
            placeholder={lang === 'id' ? 'Dosis (1 Tablet)' : 'Dosage (1 Tablet)'}
            value={dosageInput}
            onChange={(e) => setDosageInput(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <select
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value as any)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Pagi">Pagi (Morning)</option>
            <option value="Siang">Siang (Afternoon)</option>
            <option value="Malam">Malam (Evening)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-1.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-lg transition-colors text-xs flex items-center justify-center gap-1 shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'id' ? 'Simpan Jadwal' : 'Save Schedule'}</span>
        </button>
      </form>

      {/* Medication List */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 block">{lang === 'id' ? 'Jadwal Hari Ini:' : 'Today Schedule:'}</span>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
          {meds.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMed(item.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                item.taken
                  ? 'bg-cyan-950/30 border-cyan-800/50 text-slate-400'
                  : 'bg-slate-800/90 border-slate-700/60 text-slate-100 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.taken ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <div>
                  <span className={`text-xs font-bold block ${item.taken ? 'line-through text-slate-400' : 'text-white'}`}>
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.dosage}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {item.timeSlot === 'Pagi' && <Sun className="w-3 h-3 text-amber-400" />}
                {item.timeSlot === 'Siang' && <Sunset className="w-3 h-3 text-orange-400" />}
                {item.timeSlot === 'Malam' && <Moon className="w-3 h-3 text-cyan-400" />}
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
    <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6 text-sm">
      {/* Brand Header & Tagline */}
      <div className="pb-4 border-b border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-black flex items-center justify-center text-lg tracking-wider shadow-lg">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-extrabold text-white tracking-wide">ZIVO Marketplace</h4>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
                  Next.js 15.3 Engine
                </span>
              </div>
              <p className="text-xs text-teal-400 font-medium italic">
                {lang === 'id' ? '“Belanja lebih cepat. Lebih cerdas. Lebih terpercaya.”' : '“Shop smarter. Faster. Better.”'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'id' ? 'Bahasa Indonesia' : 'English (US)'}</span>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('cart')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cart'
                ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Cart & Checkout Drawer' : 'Cart & Checkout'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tracking'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Lacak Kurir Real-Time' : 'Live Order Tracking'}</span>
          </button>

          <button
            onClick={() => setActiveTab('redis')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'redis'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Simulasi Redis Cache' : 'Redis Cache Engine'}</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Layers3 className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Atomic Design Matrix' : 'Atomic Design'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CART & CHECKOUT DRAWER */}
      {activeTab === 'cart' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-teal-400" />
              <span>{lang === 'id' ? 'Item Dalam Keranjang Belanja' : 'Shopping Cart Items'} ({cartItems.length})</span>
            </span>

            <button
              onClick={() => setBrokenImgTest(!brokenImgTest)}
              className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1"
            >
              <ImageOff className="w-3 h-3" />
              <span>{brokenImgTest ? 'Reset Gambar HD' : 'Uji Fallback Gambar Rusak'}</span>
            </button>
          </div>

          {/* Item List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
            {cartItems.length === 0 ? (
              <p className="text-center text-slate-500 py-6">{lang === 'id' ? 'Keranjang belanja Anda kosong.' : 'Your cart is currently empty.'}</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={brokenImgTest ? 'https://broken-link-example.com/invalid.jpg' : item.image}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent && !parent.querySelector('.fallback-box')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-box w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-[10px] text-teal-400 font-bold text-center p-1';
                          fallback.innerText = 'ZIVO HD';
                          parent.appendChild(fallback);
                        }
                      }}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block max-w-[200px] sm:max-w-[260px] truncate">{item.name}</span>
                      <span className="text-[11px] font-mono text-teal-400 font-bold">{formatRp(item.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                      <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                        -
                      </button>
                      <span className="font-mono text-xs font-bold text-white min-w-[16px] text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                        +
                      </button>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-rose-400 p-1" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code Input */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={lang === 'id' ? 'Masukkan kode kupon (ZIVO10 / ZIVO20)' : 'Coupon code (ZIVO10 / ZIVO20)'}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
              >
                {lang === 'id' ? 'Gunakan Kupon' : 'Apply'}
              </button>
            </div>
            {couponStatusMsg && (
              <span className="text-[11px] font-semibold text-emerald-400 block">{couponStatusMsg}</span>
            )}
          </div>

          {/* Price Calculation Summary */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal Produk</span>
              <span className="font-mono text-slate-200">{formatRp(subtotal)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Diskon Kupon ({(appliedDiscount * 100)}%)</span>
                <span className="font-mono">-{formatRp(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Estimasi Ongkos Kirim (JNE/ZIVO Express)</span>
              <span className="font-mono text-slate-200">{formatRp(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>PPN 11% (Pajak Pertambahan Nilai)</span>
              <span className="font-mono text-slate-200">{formatRp(taxPPN)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
              <span className="text-white">Grand Total Pembayaran</span>
              <span className="text-teal-400 font-mono text-base">{formatRp(grandTotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE COURIER ORDER TRACKING */}
      {activeTab === 'tracking' && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">{lang === 'id' ? 'Nomor Resi Pengiriman' : 'Tracking Number'}</span>
              <span className="text-sm font-mono font-bold text-teal-400">ZV-98421049-ID</span>
            </div>
            <button
              onClick={simulateGPSRefresh}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshingGPS ? 'animate-spin' : ''}`} />
              <span>{lang === 'id' ? 'Refresh GPS Kurir' : 'Live GPS Refresh'}</span>
            </button>
          </div>

          {/* Live Courier Details */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Kurir: ZIVO Express (Pak Budi S.)</span>
                <span className="text-[11px] text-slate-400">Armada Motor • Nopol B 4820 ZVO</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 animate-pulse">
              ● Live Tracking
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-300 block">{lang === 'id' ? 'Linimasa Pengiriman' : 'Shipment Timeline'}</span>
            <div className="space-y-2.5">
              {[
                { step: 1, title: 'Pesanan Diterima & Terkonfirmasi', desc: 'Sistem ZIVO memverifikasi pembayaran PPN 11%', time: '10:15 WIB' },
                { step: 2, title: 'Dikemas di Gudang Pusat Jakarta', desc: 'Barang dicek QC dan dilapisi bubble wrap', time: '11:40 WIB' },
                { step: 3, title: 'Kurir Menuju Lokasi Penerima', desc: 'Kurir Budi sedang berkendara (0.8 km lagi)', time: '13:05 WIB (Aktif)' },
                { step: 4, title: 'Tiba di Alamat Tujuan', desc: 'Estimasi penerimaan oleh pelanggan', time: '13:25 WIB' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 text-xs">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold ${
                    item.step <= trackingStep ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                    {item.step <= trackingStep ? '✓' : item.step}
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold block ${item.step === trackingStep ? 'text-teal-300' : 'text-slate-300'}`}>{item.title}</span>
                    <span className="text-[11px] text-slate-400 block">{item.desc}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{item.time}</span>
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
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">Redis Cache Hits</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{cacheHitCount}</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">Redis Cache Misses</span>
              <span className="text-lg font-bold text-rose-400 font-mono">{cacheMissCount}</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">Kecepatan Kueri</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">{lastQueryTime}</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block mb-0.5">Hit Ratio</span>
              <span className="text-lg font-bold text-amber-400 font-mono">
                {((cacheHitCount / (cacheHitCount + cacheMissCount)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerRedisQuery('hit')}
              className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulasi Query Cache HIT (0.8ms)</span>
            </button>
            <button
              onClick={() => triggerRedisQuery('miss')}
              className="flex-1 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Simulasi Cold DB Fetch (110ms)</span>
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1.5">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-sans">Active Redis Cache Keys:</span>
            <div className="text-emerald-400">SET zivo:catalog:featured_v2 TTL 3600 (OK)</div>
            <div className="text-cyan-400">GET zivo:cart:session_usr_9842 -&gt; 3 items cached</div>
            <div className="text-amber-400">RATE_LIMIT zivo:ip:103.28.14.2 -&gt; 24/100 req/min</div>
          </div>
        </div>
      )}

      {/* TAB 4: ATOMIC DESIGN & TECH STACK MATRIX */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <span className="font-bold text-amber-400 block text-sm">Structure Pattern: Atomic Design System</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-teal-400 font-bold block mb-1">1. Atoms</span>
                <span className="text-slate-300">Badge, Button, Input, IconWrapper, Spinner</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">2. Molecules</span>
                <span className="text-slate-300">LanguageDropdown, Pagination, ProductCard, SearchBar, Toast</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">3. Organisms</span>
                <span className="text-slate-300">CartDrawer, Navbar, ProductGrid, RedisCacheDrawer, OrderTracker</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">4. Templates</span>
                <span className="text-slate-300">HeroBanner, Footer, PageWrapper, LayoutGrid</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-xs space-y-2">
            <span className="font-bold text-slate-200 block">Tech Stack Matrix:</span>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-slate-900 px-2.5 py-1 rounded-md text-teal-300 border border-slate-700">Next.js 15.3</span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-md text-emerald-300 border border-slate-700">React 19</span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-md text-cyan-300 border border-slate-700">TypeScript 5.8</span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-md text-amber-300 border border-slate-700">Zustand State</span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-md text-rose-300 border border-slate-700">Storybook 8.6</span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-md text-purple-300 border border-slate-700">Playwright 1.54 E2E</span>
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

