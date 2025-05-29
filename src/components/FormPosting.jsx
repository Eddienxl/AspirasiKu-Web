import { useState } from 'react';

export default function FormPosting({ onSubmit }) {
  const [isiAspirasi, setIsiAspirasi] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isiAspirasi.trim()) {
      setError('Isi aspirasi tidak boleh kosong');
      return;
    }
    setError('');
    onSubmit(isiAspirasi);
    setIsiAspirasi('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <textarea
          className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-300 ${error ? 'border-red-500' : 'border-gray-300'}`}
          rows="4"
          placeholder="Tulis aspirasi kamu di sini..."
          value={isiAspirasi}
          onChange={(e) => setIsiAspirasi(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-primary-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-primary-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105">
        🚀 Posting Aspirasi
      </button>
    </form>
  );
}
