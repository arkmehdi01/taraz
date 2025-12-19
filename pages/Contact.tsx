import React from 'react';
import Section from '../components/Section';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <Section title="ارتباط با ما" subtitle="پاسخگویی ۲۴ ساعته">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-xl overflow-hidden">
         {/* Info */}
         <div className="bg-slate-900 text-white p-12 flex flex-col justify-between">
           <div>
             <h3 className="text-2xl font-bold mb-6">اطلاعات تماس</h3>
             <p className="text-gray-400 mb-10 leading-7">
               برای دریافت اطلاعات بیشتر درباره پلتفرم تراز یا درخواست دمو اختصاصی برای سرمایه‌گذاری، لطفاً از طریق راه‌های زیر با ما در ارتباط باشید.
             </p>
             
             <ul className="space-y-6">
               <li className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-lg">
                   <MapPin className="w-6 h-6 text-accent" />
                 </div>
                 <div>
                   <h4 className="font-bold mb-1">دفتر مرکزی</h4>
                   <p className="text-gray-400 text-sm">تهران، خیابان ولیعصر، برج نگین</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-lg">
                   <Phone className="w-6 h-6 text-accent" />
                 </div>
                 <div>
                   <h4 className="font-bold mb-1">تلفن تماس</h4>
                   <p className="text-gray-400 text-sm ltr text-right">۰۲۱ - ۸۸ ۸۸ ۰۰ ۰۰</p>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-lg">
                   <Mail className="w-6 h-6 text-accent" />
                 </div>
                 <div>
                   <h4 className="font-bold mb-1">ایمیل</h4>
                   <p className="text-gray-400 text-sm">invest@taraz.law</p>
                 </div>
               </li>
             </ul>
           </div>
           
           <div className="mt-10">
              <p className="text-xs text-gray-500 mb-2">شبکه‌های اجتماعی:</p>
              <div className="flex gap-4">
                 {/* Social Icons Placeholder */}
                 <div className="w-8 h-8 bg-white/10 rounded hover:bg-accent hover:text-slate-900 transition cursor-pointer"></div>
                 <div className="w-8 h-8 bg-white/10 rounded hover:bg-accent hover:text-slate-900 transition cursor-pointer"></div>
              </div>
           </div>
         </div>

         {/* Form */}
         <div className="p-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">ارسال پیام</h3>
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                   <input type="text" className="w-full border border-gray-300 rounded p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                   <input type="tel" className="w-full border border-gray-300 rounded p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition text-left" dir="ltr" />
                 </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">موضوع پیام</label>
                  <select className="w-full border border-gray-300 rounded p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition bg-white">
                    <option>درخواست جلسه سرمایه‌گذاری</option>
                    <option>پشتیبانی فنی</option>
                    <option>همکاری سازمانی</option>
                  </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">متن پیام</label>
                 <textarea rows={4} className="w-full border border-gray-300 rounded p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition resize-none"></textarea>
               </div>
               <button type="button" className="w-full bg-accent text-slate-900 font-bold py-4 rounded hover:bg-amber-600 transition shadow-lg">
                 ارسال پیام
               </button>
            </form>
         </div>
      </div>
    </Section>
  );
};

export default Contact;