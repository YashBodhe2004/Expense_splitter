import { useState } from 'react';
import { Expense } from '../types';

interface ExpenseFormProps {
  people: string[];
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

function ExpenseForm({ people, expenses, setExpenses }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [date, setDate] = useState('');
  const [splitBetween, setSplitBetween] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description || !amount || !paidBy || !date || splitBetween.length === 0) {
      alert('Please fill all fields');
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount: Number(amount),
      paidBy,
      splitBetween,
      date: new Date(date).toISOString(),
      splitType: 'equal',
    };

    setExpenses([...expenses, newExpense]);

    setDescription('');
    setAmount('');
    setPaidBy('');
    setDate('');
    setSplitBetween([]);
  };

  const togglePerson = (person: string) => {
    setSplitBetween(prev =>
      prev.includes(person)
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h2 className="text-2xl mb-4">💸 Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <select
          value={paidBy}
          onChange={e => setPaidBy(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Paid by</option>
          {people.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <div>
          <p className="font-medium mb-2">Split between:</p>
          {people.map(p => (
            <label key={p} className="block">
              <input
                type="checkbox"
                checked={splitBetween.includes(p)}
                onChange={() => togglePerson(p)}
              />{' '}
              {p}
            </label>
          ))}
        </div>

        <button className="w-full bg-indigo-500 text-white py-2 rounded">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
