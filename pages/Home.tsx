import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, ChevronLeft, Award, Globe, Scale } from 'lucide-react';
import Section from '../components/Section';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-primary min-h-[85vh] flex items-center overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-right space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-gray-300 text-sm font-medium">نسخه نمایشی سرمایه‌گذار</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              آینده <span className="text-accent">عدالت</span> را <br />
              هوشمند تجربه کنید
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              تراز؛ نخستین اکوسیستم یکپارچه حقوقی کشور. ترکیب تجربه برترین وکلای پایه یک دادگستری با دقت بی‌نظیر هوش مصنوعی برای کاهش ریسک‌های حقوقی سازمان شما.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/directory" className="bg-accent hover:bg-yellow-500 text-slate-900 px-8 py-4 rounded-md font-bold text-lg text-center transition-all shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center gap-2">
                معرفی وکیل
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <Link to="/ai-demo" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-md font-medium text-lg text-center transition-all flex items-center justify-center gap-2">
                دموی هوش مصنوعی
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" 
                  alt="Contract Analysis" 
                  className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
                <div className="absolute bottom-10 right-10 left-10 text-white">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="bg-accent p-3 rounded-lg">
                       <Scale className="text-slate-900 w-6 h-6" />
                     </div>
                     <div>
                       <p className="font-bold text-lg">تحلیل قراردادها</p>
                       <p className="text-sm text-gray-300">با دقت ۹۹.۸٪</p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Intro Section - 3 Pillars */}
      <Section light className="relative -mt-20 z-20 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">معرفی نخبگان حقوقی</h3>
              <p className="text-gray-600 text-sm leading-6 mb-4">
                دسترسی به پروفایل تایید شده ۵۰۰ وکیل برتر کشور با تفکیک تخصص و سابقه درخشان.
              </p>
              <Link to="/directory" className="text-accent text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                جستجوی وکیل <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-slate-700 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">آکادمی تخصصی وکالت</h3>
              <p className="text-gray-600 text-sm leading-6 mb-4">
                دوره‌های فوق‌تخصصی برای وکلا و مدیران حقوقی با ارائه گواهینامه معتبر.
              </p>
              <Link to="/academy" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                مشاهده دوره‌ها <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-accent hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">خدمات حقوقی سازمانی</h3>
              <p className="text-gray-600 text-sm leading-6 mb-4">
                تیم‌های حقوقی اختصاصی برای شرکت‌های بزرگ جهت مدیریت قراردادها و دعاوی تجاری.
              </p>
              <Link to="/corporate" className="text-accent text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                درخواست مشاوره <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
        </div>
      </Section>

      {/* Advantages */}
      <Section title="چرا تراز؟" subtitle="مزیت‌های رقابتی">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Award />, title: "تضمین تخصص", desc: "احراز صلاحیت علمی تمامی وکلا" },
            { icon: <Globe />, title: "استاندارد جهانی", desc: "رعایت استانداردهای بین‌المللی حقوقی" },
            { icon: <Shield />, title: "امنیت اطلاعات", desc: "حفاظت کامل از اسرار موکلین" },
            { icon: <Users />, title: "پشتیبانی ۲۴/۷", desc: "همراهی تیم پشتیبانی در تمام مراحل" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:bg-accent group-hover:text-slate-900 transition-colors duration-300 text-slate-700">
                {/* Fix: Cast icon to React.ReactElement<any> to avoid Partial<unknown> error during prop injection via cloneElement */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
              </div>
              <h4 className="font-bold text-lg mb-2 text-slate-800">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Home;