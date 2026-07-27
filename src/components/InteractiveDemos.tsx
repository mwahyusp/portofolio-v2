import React, { useState } from 'react';
import { 
  Plus, Trash2, DollarSign, PieChart, ShoppingBag, Utensils, Zap, Clock, 
  CheckCircle2, Circle, AlertCircle, Scale, Flame, Pill, Sun, Moon, Sunset, 
  Tv, Wind, Lightbulb, Refrigerator, Copy, Check, Code2, Sparkles, RefreshCw
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
// 4. Home Electricity Bill Estimator Demo (Next.js)
// ============================================================================
interface Appliance {
  id: string;
  name: string;
  icon: any;
  defaultWatt: number;
  defaultHours: number;
  active: boolean;
}

export function ElectricityEstimatorDemo({ lang }: DemoProps) {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: 'ac', name: 'AC 1/2 PK', icon: Wind, defaultWatt: 350, defaultHours: 8, active: true },
    { id: 'kulkas', name: 'Kulkas 2 Pintu', icon: Refrigerator, defaultWatt: 110, defaultHours: 24, active: true },
    { id: 'tv', name: 'TV LED 43 Inch', icon: Tv, defaultWatt: 60, defaultHours: 6, active: true },
    { id: 'lampu', name: 'Lampu LED (5 titik)', icon: Lightbulb, defaultWatt: 40, defaultHours: 12, active: true },
  ]);

  const [tariffRate, setTariffRate] = useState<number>(1444.7); // PLN R-1/TR 1.300 VA

  const toggleAppliance = (id: string) => {
    setAppliances(appliances.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const updateHours = (id: string, hours: number) => {
    setAppliances(appliances.map((a) => (a.id === id ? { ...a, defaultHours: hours } : a)));
  };

  // Calculate daily kWh
  const totalDailyKwh = appliances.reduce((acc, curr) => {
    if (!curr.active) return acc;
    return acc + (curr.defaultWatt * curr.defaultHours) / 1000;
  }, 0);

  const totalMonthlyKwh = totalDailyKwh * 30;
  const monthlyEstRp = totalMonthlyKwh * tariffRate;

  const formatRp = (num: number) => 'Rp ' + Math.round(num).toLocaleString('id-ID');

  return (
    <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            Next.js App Router Demo
          </span>
          <h4 className="text-lg font-bold text-white mt-1">
            {lang === 'id' ? 'Kalkulator Tagihan Listrik PLN' : 'Electricity Bill Estimator'}
          </h4>
        </div>
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
          <Zap className="w-5 h-5" />
        </div>
      </div>

      {/* Bill Result Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 to-slate-800 p-4 rounded-xl border border-amber-800/40 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-300 block">{lang === 'id' ? 'Estimasi Tagihan Bulanan' : 'Estimated Monthly Bill'}</span>
          <span className="text-2xl font-extrabold text-amber-400 font-mono">{formatRp(monthlyEstRp)}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">{lang === 'id' ? 'Konsumsi kWh/Bulan' : 'Monthly Consumption'}</span>
          <span className="text-sm font-bold text-slate-200 font-mono">{totalMonthlyKwh.toFixed(1)} kWh</span>
        </div>
      </div>

      {/* Tariff Select */}
      <div className="flex items-center justify-between text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
        <span className="text-slate-300">{lang === 'id' ? 'Tarif Listrik PLN (Golongan):' : 'PLN Rate Tariff:'}</span>
        <select
          value={tariffRate}
          onChange={(e) => setTariffRate(Number(e.target.value))}
          className="bg-slate-900 border border-slate-700 text-amber-300 font-bold px-3 py-1 rounded-lg focus:outline-none"
        >
          <option value={1352}>R-1/ 900 VA (Rp 1.352/kWh)</option>
          <option value={1444.7}>R-1/ 1.300 VA (Rp 1.444/kWh)</option>
          <option value={1699.53}>R-1/ 2.200 VA (Rp 1.699/kWh)</option>
        </select>
      </div>

      {/* Appliance Toggles */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-slate-300 block">
          {lang === 'id' ? 'Peralatan Elektronik Rumah:' : 'Household Appliances:'}
        </span>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
          {appliances.map((app) => {
            const Icon = app.icon;
            const dailyKwh = (app.defaultWatt * app.defaultHours) / 1000;
            const monthlyCost = dailyKwh * 30 * tariffRate;

            return (
              <div
                key={app.id}
                className={`p-3 rounded-xl border transition-all ${
                  app.active
                    ? 'bg-slate-800/90 border-slate-700 text-white'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleAppliance(app.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        app.active ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-xs font-bold block">{app.name}</span>
                      <span className="text-[10px] text-slate-400">{app.defaultWatt} Watt</span>
                    </div>
                  </div>

                  {app.active && (
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {formatRp(monthlyCost)} /bln
                    </span>
                  )}
                </div>

                {app.active && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-700/40 text-xs">
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {lang === 'id' ? 'Pemakaian:' : 'Usage:'} {app.defaultHours} {lang === 'id' ? 'jam/hari' : 'hrs/day'}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      value={app.defaultHours}
                      onChange={(e) => updateHours(app.id, Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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

  'electricity-estimator-next': `// app/electricity/page.tsx - Home Electricity Estimator (Next.js)
'use client';
import React, { useState } from 'react';

export default function ElectricityCalculator() {
  const [appliances, setAppliances] = useState([
    { name: 'AC 1/2 PK', watt: 350, hours: 8 },
    { name: 'Kulkas 2 Pintu', watt: 110, hours: 24 },
  ]);

  const tariffPLN = 1444.7; // Rp/kWh untuk 1.300 VA

  const totalDailyKwh = appliances.reduce((sum, a) => sum + (a.watt * a.hours) / 1000, 0);
  const monthlyCost = totalDailyKwh * 30 * tariffPLN;

  return (
    <div className="p-6 bg-slate-900 text-white rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Kalkulator Tagihan Listrik PLN</h2>
      
      <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-800 mb-6">
        <span className="text-xs text-slate-300 block">Estimasi Tagihan Bulanan</span>
        <span className="text-2xl font-bold text-amber-400 font-mono">
          Rp {Math.round(monthlyCost).toLocaleString('id-ID')}
        </span>
      </div>

      <div className="space-y-3">
        {appliances.map((app, idx) => (
          <div key={idx} className="bg-slate-800 p-3 rounded-xl flex justify-between items-center text-sm">
            <div>
              <span className="font-bold block">{app.name}</span>
              <span className="text-xs text-slate-400">{app.watt}W • {app.hours} jam/hari</span>
            </div>
            <span className="font-mono text-amber-400 font-bold">
              Rp {Math.round(((app.watt * app.hours) / 1000) * 30 * tariffPLN).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`
};
