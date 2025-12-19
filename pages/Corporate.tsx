import React from 'react';
import Section from '../components/Section';
import { Briefcase, FileText, Shield, TrendingUp } from 'lucide-react';
import { lawyers } from '../data/mockData';

const Corporate: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="bg-slate-900 py-20 text-center text-white">
        <div className="container mx-auto px-6">
           <h1 className="text-4xl font-bold mb-4">خدمات حقوقی ویژه سازمان‌ها</h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             مدیریت ریسک‌های حقوقی کسب‌وکارهای بزرگ با ترکیبی از برترین وکلا و تکنولوژی هوش مصنوعی.
           </p>
        </div>
      </div>

      <Section light>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">چرا سازمان‌های بزرگ تراز را انتخاب می‌کنند؟</h2>
              <p className="text-gray-600 leading-8 mb-8 text-justify">
                در دنیای پیچیده تجارت امروز، داشتن یک تیم حقوقی چابک و متخصص حیاتی است. تراز با ارائه پکیج‌های سازمانی، نه تنها هزینه‌های حقوقی شما را تا ۴۰٪ کاهش می‌دهد، بلکه با استفاده از هوش مصنوعی، قراردادهای شما را قبل از امضا تحلیل کرده و ریسک‌های پنهان را شناسایی می‌کند.
              </p>
              <ul className="space-y-4">
                {[
                  'دسترسی اختصاصی به ۳ وکیل ارشد به صورت همزمان',
                  'بایگانی هوشمند ابری تمامی پرونده‌ها',
                  'داشبورد مدیریتی وضعیت دعاوی',
                  'تنظیم قراردادهای دوزبانه استاندارد'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 bg-slate-900 text-white px-8 py-3 rounded hover:bg-slate-800 transition">
                درخواست دمو سازمانی
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
                 <FileText className="w-10 h-10 text-blue-500 mb-4" />
                 <h4 className="font-bold mb-2">قراردادهای تجاری</h4>
                 <p className="text-xs text-gray-500">تنظیم و بازبینی قراردادهای کلان</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500 mt-8">
                 <Shield className="w-10 h-10 text-red-500 mb-4" />
                 <h4 className="font-bold mb-2">دعاوی حقوقی</h4>
                 <p className="text-xs text-gray-500">دفاع در پرونده‌های مالیاتی و بیمه</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
                 <TrendingUp className="w-10 h-10 text-green-500 mb-4" />
                 <h4 className="font-bold mb-2">مالکیت فکری</h4>
                 <p className="text-xs text-gray-500">ثبت برند و اختراع بین‌المللی</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-amber-500 mt-8">
                 <Briefcase className="w-10 h-10 text-amber-500 mb-4" />
                 <h4 className="font-bold mb-2">مشاوره ادغام</h4>
                 <p className="text-xs text-gray-500">همراهی در فرآیند M&A</p>
              </div>
           </div>
        </div>
      </Section>

      {/* Top Lawyers for Corporate */}
      <Section title="تیم اختصاصی شما" subtitle="وکلای ارشد دپارتمان سازمانی">
         <div className="flex flex-wrap justify-center gap-8">
            {lawyers.slice(0,3).map(l => (
               <div key={l.id} className="text-center w-64">
                  <img src={l.imageUrl} alt={l.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover" />
                  <h3 className="font-bold text-slate-900">{l.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{l.specialties[0]}</p>
               </div>
            ))}
         </div>
      </Section>
    </>
  );
};

export default Corporate;