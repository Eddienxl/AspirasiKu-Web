import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateCategory, getCategories } from '../../services/api';

const CategoriesTab = ({ 
  categories, 
  setCategories, 
  loading, 
  error 
}) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditCategoryName(category.nama);
  };

  const handleSaveCategory = async (categoryId) => {
    // Validation
    if (!editCategoryName.trim()) {
      toast.error('Nama kategori tidak boleh kosong');
      return;
    }

    try {
      console.log('Updating category:', categoryId, 'with name:', editCategoryName);
      await updateCategory(categoryId, { nama: editCategoryName.trim() });
      toast.success('Kategori berhasil diperbarui');

      // Refresh categories data
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);

      // Reset edit state
      setEditingCategory(null);
      setEditCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`Gagal memperbarui kategori: ${error.message}`);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName('');
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-white">Kelola Kategori</h2>
      {categories.length === 0 ? (
        <p className="text-white text-lg">Tidak ada kategori</p>
      ) : (
        <div className="grid gap-4">
          {categories.map(category => (
            <div key={category.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <div className="flex-1">
                  {editingCategory === category.id ? (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        placeholder="Nama kategori"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveCategory(category.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm sm:text-base"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm sm:text-base"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{category.nama}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">ID: {category.id}</p>
                    </div>
                  )}
                </div>
                {editingCategory !== category.id && (
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
