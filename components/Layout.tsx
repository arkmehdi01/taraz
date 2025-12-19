import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X, Phone, Mail, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-accent font-bold' : 'text-gray-300 hover:text-white';

  const navLinks = [
    { path: '/', label: 'صفحه اصلی' },
    { path: '/directory', label: 'معرفی وکیل' },
    { path: '/academy', label: 'آکادمی تخصصی' },
    { path: '/corporate', label: 'خدمات سازمانی' },
    { path: '/ai-demo', label: 'هوش مصنوعی' },
    { path: '/contact', label: 'تماس با ما' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-slate-800">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-accent/10 p-2 rounded-lg border border-accent/30 group-hover:bg-accent/20 transition-all">
                <Scale className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">تـراز</h1>
                <p className="text-xs text-gray-400">پلتفرم حقوقی هوشمند</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`text-sm transition-colors duration-200 ${isActive(link.path)}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/directory" className="bg-accent hover:bg-yellow-600 text-slate-900 px-5 py-2 rounded-md font-medium text-sm transition-all shadow-md hover:shadow-lg">
                ورود به پنل کاربری
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-accent transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-visibility duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-primary shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
                <div className="flex items-center gap-2">
                   <Scale className="w-6 h-6 text-accent" />
                   <span className="text-xl font-bold text-white">منوی تراز</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-gray-400 hover:text-white transition p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`text-sm py-3 px-4 rounded-lg transition-colors flex items-center justify-between group ${location.pathname === link.path ? 'bg-accent text-slate-900 font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    {location.pathname === link.path && <div className="w-2 h-2 bg-slate-900 rounded-full"></div>}
                  </Link>
                ))}
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                   <Link 
                     to="/directory" 
                     className="block w-full bg-accent text-slate-900 text-center py-3 rounded-lg font-bold hover:bg-yellow-600 transition shadow-lg" 
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     ورود به پنل کاربری
                   </Link>
                </div>
              </nav>

              <div className="mt-auto pt-10 text-center">
                 <p className="text-xs text-gray-500">تراز؛ پلتفرم حقوقی هوشمند</p>
              </div>
            </div>
          </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-gray-300 pt-16 pb-8 border-t-4 border-accent">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Scale className="w-6 h-6 text-accent" />
                <span className="text-xl font-bold text-white">تراز</span>
              </div>
              <p className="text-sm leading-7 text-gray-400 mb-6 text-justify">
                تراز، اولین پلتفرم جامع حقوقی مبتنی بر هوش مصنوعی در ایران است که با هدف ارتقای عدالت و دسترسی آسان به خدمات حقوقی تراز اول برای سازمان‌ها و افراد توسعه یافته است.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="hover:text-accent transition"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-accent transition"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 inline-block">دسترسی سریع</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/directory" className="hover:text-accent transition">جستجوی وکیل</Link></li>
                <li><Link to="/academy" className="hover:text-accent transition">دروه‌های آموزشی</Link></li>
                <li><Link to="/corporate" className="hover:text-accent transition">خدمات سازمانی</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition">مشاوره رایگان</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 inline-block">خدمات تخصصی</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-accent transition">تحلیل قرارداد با AI</a></li>
                <li><a href="#" className="hover:text-accent transition">داوری بین‌المللی</a></li>
                <li><a href="#" className="hover:text-accent transition">مالکیت فکری</a></li>
                <li><a href="#" className="hover:text-accent transition">دعاوی کیفری</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 border-b border-gray-700 pb-2 inline-block">تماس با ما</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج نگین، طبقه ۱۰</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>۰۲۱-۸۸۸۸۰۰۰۰</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span>info@taraz.law</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            <p>تمامی حقوق مادی و معنوی این وب‌سایت متعلق به پلتفرم حقوقی تراز می‌باشد. © ۱۴۰۳</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;