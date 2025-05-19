const Footer = () => {
  return (
    <footer className="bg-primary text-white p-6 animate-fadeIn">
      <div className="container mx-auto text-center space-y-4">
        <p className="text-lg">© 2025 AspirasiKu - UIN Suska Riau</p>
        <p className="text-sm opacity-80">Dibuat untuk mendengar aspirasi mahasiswa</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-accent transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors duration-300">Twitter</a>
          <a href="#" className="hover:text-accent transition-colors duration-300">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;