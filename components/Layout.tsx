
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X, Phone, Mail, MapPin, Linkedin, Twitter, Instagram, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'صفحه اصلی' },
    { path: '/directory', label: 'جستجوی وکیل' },
    { path: '/academy', label: 'آکادمی' },
    { path: '/corporate', label: 'سازمانی' },
    { path: '/ai-demo', label: 'هوش مصنوعی' },
    { path: '/contact', label: 'تماس' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-slate-900">
      {/* Premium Navigation */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#0f172a]/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 group">
             <div className="bg-accent w-10 h-10 flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <Scale className="w-6 h-6 text-slate-900 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
             </div>
             <span className="text-2xl font-black text-white tracking-tighter">تــــراز</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-[13px] font-bold tracking-widest uppercase transition-all hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-gray-300'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
             <Link to="/contact" className="text-white text-xs font-bold hover:text-accent transition">درخواست مشاوره</Link>
             <Link to="/directory" className="bg-accent text-slate-900 px-6 py-2.5 rounded-sm text-xs font-black hover:bg-white transition-all shadow-lg">پنل وکلا</Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-slate-950 z-[110] transition-all duration-500 flex flex-col p-12 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
         <div className="flex justify-between items-center mb-20">
            <span className="text-2xl font-black text-white">تـــراز</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><X className="w-10 h-10" /></button>
         </div>
         <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-black text-white hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
         </nav>
      </div>

      <main className="flex-grow pt-0">
        {children}
      </main>

      <footer className="bg-[#0f172a] text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
              <div className="md:col-span-2">
                 <div className="flex items-center gap-4 mb-8">
                    <Scale className="w-8 h-8 text-accent" />
                    <span className="text-3xl font-black">تــــراز</span>
                 </div>
                 <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    پلتفرم هوشمند تراز، با هدف حذف فاصله‌های حقوقی و برقراری عدالت در دسترس، طراحی و اجرا شده است. ما صدای شما در محاکم خواهیم بود.
                 </p>
              </div>
              <div>
                 <h4 className="font-bold text-accent mb-8 uppercase tracking-widest text-sm">بخش‌های سایت</h4>
                 <ul className="space-y-4 text-gray-400 font-medium">
                    {navLinks.map(l => <li key={l.path}><Link to={l.path} className="hover:text-white transition">{l.label}</Link></li>)}
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-accent mb-8 uppercase tracking-widest text-sm">تماس</h4>
                 <p className="text-gray-400 mb-4">تهران، جردن، برج آرین</p>
                 <p className="text-gray-200 font-bold text-xl mb-2" dir="ltr">۰۲۱-۸۸۸۸۰۰۰۰</p>
                 <p className="text-gray-400">info@taraz.law</p>
              </div>
           </div>
           <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs">
              <p>© ۱۴۰۳ تراز - کلیه حقوق مادی و معنوی محفوظ است.</p>
              <div className="flex gap-6">
                 <a href="#" className="hover:text-white transition">قوانین و مقررات</a>
                 <a href="#" className="hover:text-white transition">حریم خصوصی</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
