
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, ChevronLeft, Award, Globe, Scale, Zap, CheckCircle } from 'lucide-react';
import Section from '../components/Section';

const Home: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Premium Hero Section */}
      <div className="relative bg-[#0f172a] min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-right space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
              <Zap className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">پیشرو در عدالت دیجیتال</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.2]">
              اقتدار حقوقی در <br />
              عصر <span className="text-accent underline decoration-accent/30 underline-offset-8">هوش مصنوعی</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl font-light">
              تراز؛ تلاقی دانش وکلای تراز اول و قدرت تحلیل داده‌ها. ما پیچیدگی‌های حقوقی شما را به مسیرهای شفاف موفقیت تبدیل می‌کنیم.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link to="/directory" className="bg-accent hover:bg-[#b8962d] text-slate-900 px-10 py-5 rounded-sm font-bold text-lg text-center transition-all shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3">
                انتخاب وکیل متخصص
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <Link to="/ai-demo" className="bg-transparent border border-white/20 hover:border-accent hover:text-accent text-white px-10 py-5 rounded-sm font-bold text-lg text-center transition-all flex items-center justify-center gap-3">
                مشاوره هوشمند (Demo)
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
               <div>
                 <p className="text-3xl font-bold text-white">۵۰۰+</p>
                 <p className="text-gray-500 text-xs mt-1">وکیل پایه یک</p>
               </div>
               <div>
                 <p className="text-3xl font-bold text-white">۹۸٪</p>
                 <p className="text-gray-500 text-xs mt-1">رضایت سازمان‌ها</p>
               </div>
               <div>
                 <p className="text-3xl font-bold text-white">۲۴/۷</p>
                 <p className="text-gray-500 text-xs mt-1">پشتیبانی فعال</p>
               </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative group">
             <div className="relative z-20 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80" 
                  alt="Legal Excellence" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
             </div>
             {/* Floating UI Element */}
             <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-2xl z-30 animate-fadeInUp">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <Scale className="text-accent w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-slate-900 font-bold text-sm">تحلیل هوشمند پرونده</p>
                      <p className="text-slate-400 text-[10px]">آماده برای شروع...</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <Section className="bg-white" title="ارزش‌های تراز" subtitle="چرا ما متفاوت هستیم؟">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <FeatureCard 
             icon={<Users className="w-10 h-10" />}
             title="نخبگان حقوقی"
             desc="تنها ۵٪ از وکلای متقاضی پس از آزمون‌های سخت‌گیرانه تراز پذیرفته می‌شوند."
           />
           <FeatureCard 
             icon={<Shield className="w-10 h-10" />}
             title="امنیت مطلق"
             desc="تمامی تبادلات مالی و اسناد شما در پلتفرم تراز به صورت نظامی رمزنگاری می‌شود."
           />
           <FeatureCard 
             icon={<Zap className="w-10 h-10" />}
             title="سرعت در اقدام"
             desc="پاسخگویی به درخواست‌های مشاوره در کمتر از ۱۵ دقیقه توسط وکلای کشیک."
           />
        </div>
      </Section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-10 rounded-sm border border-gray-100 hover:border-accent hover:shadow-2xl transition-all group">
     <div className="text-slate-400 group-hover:text-accent transition-colors mb-6">{icon}</div>
     <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
     <p className="text-gray-500 text-sm leading-7">{desc}</p>
  </div>
);

export default Home;
