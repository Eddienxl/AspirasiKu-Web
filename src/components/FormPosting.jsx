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
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <textarea
          className={`form-control ${error ? 'is-invalid' : ''}`}
          rows="4"
          placeholder="Tulis aspirasi kamu di sini..."
          value={isiAspirasi}
          onChange={(e) => setIsiAspirasi(e.target.value)}
          style={{ resize: 'none' }}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Posting Aspirasi
      </button>
    </form>
  );
}
