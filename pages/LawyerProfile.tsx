
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lawyers } from '../data/mockData';
import { 
  Star, MapPin, GraduationCap, Award, 
  CheckCircle2, Building2, Calendar, 
  ChevronLeft, BarChart3, ShieldCheck, Download, Share2,
  MessageSquare, X, Send, Paperclip, FileText, Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

const LawyerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lawyer = lawyers.find(l => l.id === id) || lawyers[0];

  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Messaging Modal State
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');

  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      weekday: d.toLocaleDateString('fa-IR', { weekday: 'long' }),
      day: d.toLocaleDateString('fa-IR', { day: 'numeric' }),
      month: d.toLocaleDateString('fa-IR', { month: 'short' }),
    };
  });

  const timeSlots = ['۱۰:۰۰', '۱۱:۳۰', '۱۴:۰۰', '۱۵:۳۰', '۱۷:۰۰'];

  const messageTemplates = [
    "درخواست مشاوره فوری",
    "سوال در مورد پرونده جاری",
    "هماهنگی جهت جلسه حضوری",
    "ارسال مدارک تکمیلی"
  ];

  return (
    <div className="bg-[#f3f2ef] min-h-screen pb-12 font-sans relative">
      
      {/* Message Modal */}
      {showMsgModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowMsgModal(false)}
          ></div>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col animate-fadeInUp">
             {/* Modal Header */}
             <div className="bg-slate-50 p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                     <MessageSquare className="w-5 h-5 text-accent" />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800 text-sm">ارسال پیام جدید</h3>
                     <p className="text-xs text-gray-500">به: {lawyer.name}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setShowMsgModal(false)} 
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             {/* Modal Body */}
             <div className="p-6 space-y-4">
                {/* Subject Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">موضوع پیام</label>
                  <select 
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white transition"
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                  >
                    <option value="">انتخاب موضوع...</option>
                    <option value="consultation">درخواست مشاوره حقوقی</option>
                    <option value="case_inquiry">پیگیری پرونده</option>
                    <option value="contract_review">بررسی قرارداد</option>
                    <option value="urgent">موضوع فوری</option>
                    <option value="other">سایر موارد</option>
                  </select>
                </div>

                {/* Quick Templates */}
                <div>
                   <label className="block text-xs font-bold text-gray-700 mb-2">دسترسی سریع</label>
                   <div className="flex flex-wrap gap-2">
                     {messageTemplates.map((temp, idx) => (
                       <button 
                         key={idx}
                         onClick={() => setMsgBody(temp)}
                         className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-white hover:border-accent hover:text-slate-900 transition"
                       >
                         {temp}
                       </button>
                     ))}
                   </div>
                </div>

                {/* Message Body */}
                <div className="relative">
                  <textarea 
                    rows={6} 
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none transition bg-gray-50 focus:bg-white placeholder-gray-400"
                    placeholder="متن پیام خود را اینجا بنویسید..."
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                  ></textarea>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                     <button className="text-gray-400 hover:text-slate-600 transition" title="پیوست تصویر">
                       <ImageIcon className="w-4 h-4" />
                     </button>
                     <button className="text-gray-400 hover:text-slate-600 transition" title="پیوست سند">
                       <Paperclip className="w-4 h-4" />
                     </button>
                  </div>
                </div>

                {/* Warning / Info */}
                <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-lg flex items-start gap-2">
                   <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                   <p>
                     پیام‌های شما در بستر امن و رمزنگاری شده تراز ارسال می‌شود. میانگین زمان پاسخگویی این وکیل ۲ ساعت است.
                   </p>
                </div>
             </div>

             {/* Modal Footer */}
             <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button 
                  onClick={() => setShowMsgModal(false)}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-200 transition"
                >
                  انصراف
                </button>
                <button 
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-slate-900 hover:bg-accent hover:text-slate-900 transition flex items-center gap-2 shadow-lg"
                  onClick={() => {
                    alert('پیام شما با موفقیت ارسال شد.');
                    setShowMsgModal(false);
                  }}
                >
                  <Send className="w-4 h-4" />
                  ارسال پیام
                </button>
             </div>
          </div>
        </div>
      )}
      
      {/* 1. Header Card */}
      <div className="container mx-auto px-4 pt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden relative mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 relative">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 mb-6">
               <div className="relative">
                 <img 
                   src={lawyer.imageUrl} 
                   alt={lawyer.name} 
                   className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover" 
                 />
                 <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center" title="آنلاین">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                 </div>
               </div>
               
               <div className="flex gap-3 mt-4 md:mt-0">
                  <button className="px-6 py-2 rounded-full border border-gray-600 text-gray-600 font-bold hover:bg-gray-50 transition flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> اشتراک‌گذاری
                  </button>
                  <button 
                    onClick={() => setShowMsgModal(true)}
                    className="px-6 py-2 rounded-full bg-accent text-slate-900 font-bold hover:bg-yellow-500 transition shadow-sm flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    ارسال پیام
                  </button>
               </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
               <div>
                  <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    {lawyer.name}
                    <ShieldCheck className="w-6 h-6 text-blue-600" title="تایید شده توسط تراز" />
                  </h1>
                  <p className="text-lg text-slate-700 mt-1 font-medium">{lawyer.title}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
                     <span className="flex items-center gap-1">
                       <MapPin className="w-4 h-4" /> {lawyer.location.address}
                     </span>
                     <span className="flex items-center gap-1 text-accent font-bold">
                       <Star className="w-4 h-4 fill-accent" /> {lawyer.rating} امتیاز
                     </span>
                     <span className="text-blue-600 font-bold hover:underline cursor-pointer">
                       ۵۰۰+ ارتباط
                     </span>
                  </div>
               </div>
               
               <div className="flex gap-8 text-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div>
                     <div className="text-xl font-bold text-slate-900">{lawyer.performance.totalCases}</div>
                     <div className="text-xs text-gray-500">پرونده موفق</div>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div>
                     <div className="text-xl font-bold text-slate-900">{lawyer.performance.winRate}٪</div>
                     <div className="text-xs text-gray-500">نرخ پیروزی</div>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div>
                     <div className="text-xl font-bold text-slate-900">۱۵</div>
                     <div className="text-xs text-gray-500">سال تجربه</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Left Column (Main Content) */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* 2. About Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8">
                 <h2 className="text-xl font-bold text-slate-900 mb-4">درباره</h2>
                 <p className="text-gray-700 leading-8 text-justify whitespace-pre-line">
                   {lawyer.description}
                   {'\n\n'}
                   اینجانب با تکیه بر دانش حقوقی و تجربه چندین ساله در محاکم قضایی، متعهد به دفاع تمام قد از حقوق موکلین هستم. رویکرد من مبتنی بر صداقت، شفافیت و پیگیری مستمر تا حصول نتیجه مطلوب است.
                 </p>
              </div>

              {/* 3. Performance Chart (New Section) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">نمودار عملکرد</h2>
                    <span className="text-xs text-gray-500">بروزرسانی: ۱ ساعت پیش</span>
                 </div>
                 
                 <div className="flex items-end justify-between h-40 gap-2 px-4 border-b border-gray-200 pb-2 relative">
                    {/* Y Axis Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                       <div className="border-t border-gray-400 w-full h-0"></div>
                       <div className="border-t border-gray-400 w-full h-0"></div>
                       <div className="border-t border-gray-400 w-full h-0"></div>
                       <div className="border-t border-gray-400 w-full h-0"></div>
                    </div>
                    
                    {/* Bars */}
                    {lawyer.performance.monthlyActivity.map((val, idx) => (
                      <div key={idx} className="w-full bg-blue-50 rounded-t-sm relative group hover:bg-blue-100 transition-colors cursor-pointer flex flex-col justify-end">
                         <div 
                           className="bg-slate-900 w-4/5 mx-auto rounded-t-sm transition-all duration-500 group-hover:bg-accent"
                           style={{ height: `${(val / 30) * 100}%` }}
                         ></div>
                         {/* Tooltip */}
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {val} پرونده
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-2 text-xs text-gray-400 px-2">
                    <span>فروردین</span>
                    <span>تیر</span>
                    <span>مهر</span>
                    <span>اسفند</span>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">{lawyer.performance.winRate}٪</p>
                          <p className="text-xs text-gray-500">موفقیت در پرونده‌ها</p>
                       </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">۹۸٪</p>
                          <p className="text-xs text-gray-500">رضایت موکلین</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* 4. Experience Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">تجربیات شغلی</h2>
                 <div className="space-y-8 relative before:absolute before:right-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
                    {lawyer.experienceList?.map((exp, idx) => (
                      <div key={idx} className="relative pr-12">
                         <div className="absolute right-3 top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-400 ring-4 ring-gray-50"></div>
                         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                            <h3 className="font-bold text-slate-800 text-lg">{exp.title}</h3>
                            <span className="text-sm text-gray-500">{exp.period}</span>
                         </div>
                         <div className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-1">
                            <Building2 className="w-4 h-4" /> {exp.company}
                         </div>
                         <p className="text-gray-600 text-sm leading-6">
                            {exp.description}
                         </p>
                      </div>
                    )) || (
                      <div className="text-gray-500 text-sm">اطلاعات روزمه بارگذاری نشده است.</div>
                    )}
                 </div>
              </div>

              {/* 5. Education Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">تحصیلات</h2>
                 <div className="space-y-6">
                    {lawyer.education.map((edu, idx) => (
                      <div key={idx} className="flex gap-4">
                         <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6 text-gray-600" />
                         </div>
                         <div>
                            <h3 className="font-bold text-slate-900">{edu.split('-')[0]}</h3>
                            <p className="text-sm text-gray-500 mt-1">{edu.split('-')[1] || ''}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* 6. Courses & Certifications */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">دوره‌ها و گواهینامه‌ها</h2>
                 <ul className="space-y-4">
                    {lawyer.certifications?.map((cert, idx) => (
                      <li key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0 flex items-start justify-between">
                         <div className="flex gap-3">
                            <Award className="w-5 h-5 text-accent shrink-0 mt-1" />
                            <div>
                               <h4 className="font-bold text-slate-800 text-sm">{cert.title}</h4>
                               <p className="text-xs text-gray-500 mt-1">صادرکننده: {cert.issuer}</p>
                            </div>
                         </div>
                         <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{cert.year}</span>
                      </li>
                    ))}
                 </ul>
                 <button className="mt-4 w-full py-2 border border-dashed border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> دانلود رزومه کامل (PDF)
                 </button>
              </div>

           </div>

           {/* Right Column (Sidebar) */}
           <div className="space-y-6">
              
              {/* Booking Widget (Compact) */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 sticky top-24">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-slate-900" />
                   رزرو وقت مشاوره
                 </h3>
                 
                 <div className="mb-4">
                   <label className="text-xs font-bold text-gray-500 block mb-2">تاریخ</label>
                   <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {dates.map((date, idx) => (
                        <button 
                          key={idx}
                          onClick={() => { setSelectedDateIndex(idx); setSelectedTime(null); }}
                          className={`flex-shrink-0 w-12 h-14 rounded border flex flex-col items-center justify-center transition-all ${selectedDateIndex === idx ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-gray-200 text-gray-400'}`}
                        >
                          <span className="text-[10px]">{date.weekday.substring(0,1)}</span>
                          <span className="text-sm font-bold">{date.day}</span>
                        </button>
                      ))}
                   </div>
                 </div>

                 <div className="mb-6">
                    <label className="text-xs font-bold text-gray-500 block mb-2">ساعت</label>
                    <div className="grid grid-cols-3 gap-2">
                       {timeSlots.map((time, idx) => (
                         <button
                           key={idx}
                           onClick={() => setSelectedTime(time)}
                           className={`py-1.5 text-xs rounded border transition-all ${selectedTime === time ? 'bg-accent text-slate-900 border-accent font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
                         >
                           {time}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition shadow-lg">
                    {selectedTime ? `تایید نوبت ساعت ${selectedTime}` : 'انتخاب ساعت'}
                 </button>
              </div>

              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
                 <h3 className="font-bold text-slate-900 mb-4">تخصص‌ها و مهارت‌ها</h3>
                 <div className="flex flex-wrap gap-2">
                    {lawyer.specialties.map((spec, idx) => (
                      <span key={idx} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-default">
                         {spec}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Similar Profiles */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
                 <h3 className="font-bold text-slate-900 mb-4 text-sm">وکلای مشابه</h3>
                 <div className="space-y-4">
                    {lawyers.filter(l => l.id !== lawyer.id).slice(0, 3).map(other => (
                      <div key={other.id} className="flex items-center gap-3">
                         <img src={other.imageUrl} className="w-10 h-10 rounded-full object-cover" alt={other.name} />
                         <div className="overflow-hidden">
                            <h4 className="font-bold text-sm text-slate-800 truncate">{other.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{other.title.split('|')[0]}</p>
                         </div>
                         <button 
                           onClick={() => {
                             navigate(`/lawyer/${other.id}`);
                             window.scrollTo(0, 0);
                           }}
                           className="mr-auto border border-gray-300 text-gray-500 p-1.5 rounded-full hover:bg-accent hover:text-slate-900 hover:border-accent transition"
                         >
                            <ChevronLeft className="w-4 h-4" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
