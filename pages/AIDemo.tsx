import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft, 
  ScanLine, 
  ShieldAlert,
  Gavel,
  History,
  ArrowLeft,
  LucideIcon
} from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active = false }) => (
  <div className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${active ? 'bg-slate-900 text-white shadow-xl font-bold' : 'text-gray-500 hover:bg-gray-100'}`}>
     <Icon size={18} className={active ? 'text-accent' : 'text-gray-400'} />
     <span className="text-xs">{label}</span>
     {active && <ChevronLeft size={16} className="mr-auto text-accent" />}
  </div>
);

const AIDemo: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [progress, setProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('در حال آماده‌سازی...');

  useEffect(() => {
    if (step === 'processing') {
      const intervals = [
        { progress: 10, text: 'استخراج متن از سند...' },
        { progress: 35, text: 'تحلیل NLP و شناسایی بندها...' },
        { progress: 60, text: 'تطبیق با قوانین جاری...' },
        { progress: 85, text: 'شناسایی ریسک‌های قراردادی...' },
        { progress: 100, text: 'تحلیل کامل شد.' }
      ];

      let currentStep = 0;
      const timer = setInterval(() => {
        if (currentStep < intervals.length) {
          setProgress(intervals[currentStep].progress);
          setScanStatus(intervals[currentStep].text);
          currentStep++;
        } else {
          clearInterval(timer);
          setTimeout(() => setStep('results'), 500);
        }
      }, 700);

      return () => clearInterval(timer);
    }
  }, [step]);

  const handleFileUpload = () => setStep('processing');
  const resetDemo = () => { setStep('upload'); setProgress(0); };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 pt-24 animate-fadeIn">
      <div className="bg-slate-900 text-white border-b border-white/10">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-lg border border-accent/30">
               <Bot className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">دستیار هوشمند تراز</h1>
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                موتور: Gemini 3 Pro (Legal Edition)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-3 space-y-4">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <h3 className="font-bold text-slate-800 text-xs text-right">خدمات پردازش هوشمند</h3>
                </div>
                <nav className="p-2 space-y-1">
                  <SidebarItem icon={FileText} label="تحلیل قرارداد" active />
                  <SidebarItem icon={Gavel} label="پیش‌بینی رای" />
                  <SidebarItem icon={ShieldAlert} label="کشف تعارض" />
                  <SidebarItem icon={History} label="سابقه پرونده" />
                </nav>
             </div>
          </div>

          <div className="lg:col-span-9 min-h-[500px]">
            {step === 'upload' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col animate-fadeInUp">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                   <h2 className="text-xl font-black text-slate-900">بارگذاری سند حقوقی</h2>
                   <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold">PDF, DOCX</span>
                 </div>
                 <div className="flex-grow flex flex-col items-center justify-center p-12">
                    <div onClick={handleFileUpload} className="w-full max-w-xl bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center cursor-pointer hover:bg-slate-100 hover:border-accent transition-all group">
                       <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-10 h-10 text-accent" />
                       </div>
                       <h3 className="text-xl font-bold text-slate-800 mb-2">فایل قرارداد را اینجا رها کنید</h3>
                       <p className="text-gray-400 text-sm mb-8">تحلیل هوشمند بلافاصله آغاز می‌شود</p>
                       <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800 transition flex items-center gap-3 mx-auto">
                         انتخاب فایل از سیستم <ArrowLeft className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col items-center justify-center p-12 text-center animate-fadeIn">
                 <div className="relative w-24 h-24 mb-10">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
                    <ScanLine className="absolute inset-0 m-auto text-slate-900 w-10 h-10 animate-pulse" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-3">در حال تحلیل هوشمند</h3>
                 <p className="text-gray-400 text-sm mb-10">{scanStatus}</p>
                 <div className="w-full max-w-md bg-slate-100 rounded-full h-2.5 overflow-hidden mb-3">
                    <div className="bg-slate-900 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                 </div>
                 <span className="text-xs font-black text-slate-400">{progress}%</span>
              </div>
            )}

            {step === 'results' && (
              <div className="space-y-6 animate-fadeInUp">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                       <AlertTriangle className="w-10 h-10 text-red-100 fill-red-500" />
                       <div className="text-right">
                          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">امتیاز ریسک</p>
                          <div className="text-3xl font-black text-red-500">۴۵<span className="text-xs text-gray-300 font-normal">/۱۰۰</span></div>
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                       <FileText className="w-10 h-10 text-blue-100 fill-blue-500" />
                       <div className="text-left">
                          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">بندهای بحرانی</p>
                          <div className="text-3xl font-black text-slate-900">۴</div>
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center">
                       <button onClick={resetDemo} className="w-full bg-slate-100 hover:bg-slate-200 py-3 rounded-xl font-bold text-slate-600 transition text-sm">بارگذاری مجدد</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[550px]">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 overflow-y-auto custom-scrollbar">
                       <h4 className="font-black text-slate-900 mb-6 border-b pb-4 text-sm flex items-center gap-2 text-right" dir="rtl">
                         <FileText className="w-4 h-4 text-accent" /> پیش‌نویس استخراج شده
                       </h4>
                       <div className="text-sm leading-8 text-slate-700 space-y-5 text-right" dir="rtl">
                          <p>ماده ۱: طرفین قرارداد عبارتند از...</p>
                          <div className="bg-red-50 p-4 border-r-4 border-red-500 rounded-xl text-slate-900 font-medium">
                             ماده ۵: حل اختلاف؛ طرفین حق هرگونه مراجعه به مراجع قضایی و دادگستری را از خود سلب و ساقط می‌نمایند.
                          </div>
                          <p>ماده ۶: شرایط فورس ماژور و مسئولیت‌ها...</p>
                          <p className="text-gray-300">... ادامه متن قرارداد استخراج شده ...</p>
                       </div>
                    </div>
                    <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1">
                       <div className="bg-white rounded-2xl shadow-md border-r-4 border-red-500 p-6 text-right" dir="rtl">
                          <div className="flex items-center justify-start gap-2 mb-3">
                            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">ریسک بالا</span>
                            <Sparkles className="w-4 h-4 text-accent" />
                          </div>
                          <h4 className="font-bold text-slate-900 mb-2 text-sm">سلب حق دادخواهی</h4>
                          <p className="text-xs text-gray-500 leading-6 mb-5">این بند مطابق قوانین عمومی باطل است اما می‌تواند فرآیند احقاق حق شما را در آینده با چالش جدی روبرو کند.</p>
                          <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 text-[11px] text-slate-700 leading-6">
                             <span className="font-bold text-accent">پیشنهاد جایگزین:</span> "در صورت عدم حصول توافق، مراجع قضایی صالح به رسیدگی خواهند بود."
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDemo;