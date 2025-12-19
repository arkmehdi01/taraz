import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  UploadCloud, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ScanLine, 
  ShieldAlert,
  Gavel,
  History,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const AIDemo: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [progress, setProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('در حال آماده‌سازی...');

  // Simulation of AI Processing Steps
  useEffect(() => {
    if (step === 'processing') {
      const intervals = [
        { progress: 10, text: 'استخراج متن از فایل...' },
        { progress: 30, text: 'تحلیل NLP و شناسایی بندهای حقوقی...' },
        { progress: 55, text: 'تطبیق با قانون مدنی و تجارت...' },
        { progress: 75, text: 'شناسایی ریسک‌های قراردادی...' },
        { progress: 90, text: 'تولید پیشنهادهای اصلاحی...' },
        { progress: 100, text: 'تکمیل تحلیل.' }
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
      }, 800);

      return () => clearInterval(timer);
    }
  }, [step]);

  const handleFileUpload = () => {
    setStep('processing');
  };

  const resetDemo = () => {
    setStep('upload');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Professional Header */}
      <div className="bg-slate-900 text-white border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-lg border border-accent/30">
               <Bot className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">دستیار هوشمند حقوقی تراز</h1>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {/* Updated UI text to Gemini 3 Pro to reflect the latest model standards as per technical guidelines */}
                موتور تحلیلگر: Gemini 3 Pro (Legal Fine-Tuned)
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-300">
             <span className="hover:text-white cursor-pointer transition">راهنما</span>
             <span className="hover:text-white cursor-pointer transition">گزارش‌گیری</span>
             <div className="h-4 w-px bg-white/20"></div>
             <span className="text-accent font-medium">نسخه دمو سرمایه‌گذار</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-4">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <h3 className="font-bold text-slate-800 text-sm">ماژول‌های هوشمند</h3>
                </div>
                <nav className="p-2 space-y-1">
                  <SidebarItem icon={<FileText />} label="تحلیل قرارداد" active />
                  <SidebarItem icon={<Gavel />} label="پیش‌بینی رای دادگاه" />
                  <SidebarItem icon={<ShieldAlert />} label="کشف تعارض منافع" />
                  <SidebarItem icon={<History />} label="سابقه پرونده‌ها" />
                </nav>
             </div>

             <div className="bg-blue-900 text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-2 text-sm">پایگاه دانش حقوقی</h4>
                  <p className="text-xs text-blue-200 leading-5 mb-3">
                    مدل هوشمند ما به بیش از ۵۰,۰۰۰ پرونده قضایی و تمامی قوانین مدنی ایران دسترسی دارد.
                  </p>
                  <div className="flex -space-x-2 space-x-reverse">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border border-blue-900 bg-blue-800 flex items-center justify-center text-[8px]">AI</div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
             </div>
          </div>

          {/* Main Workspace */}
          <div className="lg:col-span-9">
            
            {/* STAGE 1: UPLOAD */}
            {step === 'upload' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col animate-fadeIn">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                   <h2 className="text-lg font-bold text-slate-800">بارگذاری سند حقوقی</h2>
                   <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Supported: PDF, DOCX</span>
                 </div>
                 
                 <div className="flex-grow flex flex-col items-center justify-center p-12">
                    <div 
                      onClick={handleFileUpload}
                      className="w-full max-w-2xl bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center text-center cursor-pointer hover:bg-gray-100 hover:border-accent hover:shadow-lg transition-all group"
                    >
                       <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-10 h-10 text-accent" />
                       </div>
                       <h3 className="text-xl font-bold text-slate-800 mb-2">فایل قرارداد را اینجا رها کنید</h3>
                       <p className="text-gray-500 mb-8">یا برای انتخاب فایل کلیک کنید</p>
                       <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:bg-slate-800 transition flex items-center gap-2">
                         انتخاب فایل از سیستم <ArrowLeft className="w-4 h-4" />
                       </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                       <FeatureBadge icon={<CheckCircle2 className="w-4 h-4 text-green-500" />} text="امنیت رمزنگاری شده" />
                       <FeatureBadge icon={<CheckCircle2 className="w-4 h-4 text-green-500" />} text="حذف خودکار پس از تحلیل" />
                       <FeatureBadge icon={<CheckCircle2 className="w-4 h-4 text-green-500" />} text="رعایت محرمانگی" />
                    </div>
                 </div>
              </div>
            )}

            {/* STAGE 2: PROCESSING */}
            {step === 'processing' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col items-center justify-center p-12 animate-fadeIn relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                 
                 <div className="relative z-10 text-center w-full max-w-md">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                       <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
                       <ScanLine className="absolute inset-0 m-auto text-slate-900 w-8 h-8 animate-pulse" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">در حال تحلیل هوشمند</h3>
                    <p className="text-gray-500 text-sm mb-8 min-h-[1.5rem]">{scanStatus}</p>

                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-2">
                       <div 
                         className="bg-slate-900 h-full rounded-full transition-all duration-300 ease-out relative"
                         style={{ width: `${progress}%` }}
                       >
                         <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                       </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 font-mono">
                       <span>0%</span>
                       <span>{progress}%</span>
                       <span>100%</span>
                    </div>
                 </div>
              </div>
            )}

            {/* STAGE 3: RESULTS DASHBOARD */}
            {step === 'results' && (
              <div className="flex flex-col h-full space-y-6 animate-fadeInUp">
                 
                 {/* Top Summary Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                       <div>
                          <p className="text-gray-500 text-xs font-bold uppercase mb-1">امتیاز ریسک قرارداد</p>
                          <div className="text-3xl font-bold text-red-500">۴۵<span className="text-sm text-gray-400">/۱۰۰</span></div>
                       </div>
                       <div className="w-12 h-12 rounded-full border-4 border-red-500 flex items-center justify-center text-red-500 font-bold bg-red-50">
                         <AlertTriangle className="w-6 h-6" />
                       </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                       <div>
                          <p className="text-gray-500 text-xs font-bold uppercase mb-1">موارد حقوقی شناسایی شده</p>
                          <div className="text-3xl font-bold text-slate-800">۴ <span className="text-sm text-gray-400 font-normal">مورد</span></div>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                         <FileText className="w-6 h-6" />
                       </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                       <div>
                          <p className="text-gray-500 text-xs font-bold uppercase mb-1">وضعیت حقوقی</p>
                          <div className="text-lg font-bold text-orange-500">نیازمند بازبینی</div>
                       </div>
                       <button onClick={resetDemo} className="text-xs text-blue-600 hover:underline">تحلیل مجدد</button>
                    </div>
                 </div>

                 {/* Main Analysis Layout */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    
                    {/* Left: Document Viewer */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
                       <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center rounded-t-xl">
                          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                             <FileText className="w-4 h-4 text-gray-500" /> متن قرارداد (پیش‌نویس)
                          </h3>
                          <div className="flex gap-2">
                             <span className="w-3 h-3 rounded-full bg-red-500"></span>
                             <span className="text-[10px] text-gray-500">ریسک بالا</span>
                             <span className="w-3 h-3 rounded-full bg-yellow-400 ml-2"></span>
                             <span className="text-[10px] text-gray-500">هشدار</span>
                          </div>
                       </div>
                       <div className="p-6 overflow-y-auto text-justify leading-8 text-gray-700 text-sm font-light">
                          <p className="mb-4">
                            ماده ۱: طرفین قرارداد عبارتند از شرکت آلفا به نمایندگی آقای رضایی و شرکت بتا...
                          </p>
                          <p className="mb-4">
                            ماده ۴: مدت این قرارداد از تاریخ امضا به مدت یک سال شمسی تعیین می‌گردد و تمدید آن منوط به توافق کتبی است.
                          </p>
                          
                          {/* Highlighted Risk Block */}
                          <div className="bg-red-50 border-r-4 border-red-500 p-1 my-4 rounded hover:bg-red-100 transition cursor-help relative group">
                            <span className="absolute -right-6 top-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                               <AlertTriangle className="w-4 h-4" />
                            </span>
                            <p className="font-medium text-slate-900">
                               ماده ۵: حل اختلاف؛ در صورت بروز هرگونه اختلاف ناشی از تفسیر یا اجرای این قرارداد، موضوع از طریق داور مرضی‌الطرفین حل و فصل خواهد شد و طرفین حق هرگونه مراجعه به مراجع قضایی و دادگستری را از خود سلب و ساقط می‌نمایند. رای داور قطعی و لازم‌الاجراست.
                            </p>
                          </div>

                          <p className="mb-4">
                             ماده ۶: فورس ماژور؛ در صورت بروز حوادث غیرمترقبه...
                          </p>

                          {/* Warning Block */}
                          <div className="bg-yellow-50 border-r-4 border-yellow-400 p-1 my-4 rounded hover:bg-yellow-100 transition cursor-help">
                             <p className="font-medium text-slate-900">
                                ماده ۸: فسخ قرارداد؛ کارفرما می‌تواند در هر زمان و بدون نیاز به ارائه دلیل موجه، قرارداد را به صورت یک‌جانبه فسخ نماید و پیمانکار حق هیچگونه اعتراضی نخواهد داشت.
                             </p>
                          </div>
                          
                          <p className="mb-4 text-gray-400">... ادامه متن قرارداد ...</p>
                       </div>
                    </div>

                    {/* Right: AI Insights Panel */}
                    <div className="space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                       
                       {/* Critical Issue Card */}
                       <div className="bg-white rounded-xl shadow-md border-r-4 border-red-500 p-5 animate-fadeInRight" style={{ animationDelay: '0.1s' }}>
                          <div className="flex justify-between items-start mb-3">
                             <div className="flex items-center gap-2">
                                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full border border-red-200">ریسک بحرانی</span>
                                <span className="text-gray-400 text-xs">مربوط به ماده ۵</span>
                             </div>
                             <button className="text-gray-400 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
                          </div>
                          <h4 className="font-bold text-slate-800 mb-2">سلب حق دادخواهی (خطر بن‌بست)</h4>
                          <p className="text-sm text-gray-600 leading-6 mb-4">
                             این بند به طور کامل حق مراجعه به دادگاه را سلب کرده است. اگر داور مشخص نشده باشد یا داور انتخابی فوت کند/استعفا دهد، پرونده به بن‌بست حقوقی می‌رسد و هیچ مرجعی صالح به رسیدگی نخواهد بود.
                          </p>
                          
                          <div className="bg-slate-50 rounded-lg p-3 border border-gray-200">
                             <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-3 h-3 text-accent" />
                                <span className="text-xs font-bold text-slate-700">پیشنهاد هوش مصنوعی:</span>
                             </div>
                             <p className="text-xs text-slate-600 font-mono bg-white p-2 rounded border border-gray-100">
                                "...در صورت عدم توافق در انتخاب داور یا عدم امکان داوری، صلاحیت رسیدگی با مراجع قضایی تهران خواهد بود."
                             </p>
                          </div>
                       </div>

                       {/* Warning Card */}
                       <div className="bg-white rounded-xl shadow-sm border-r-4 border-yellow-400 p-5 animate-fadeInRight" style={{ animationDelay: '0.3s' }}>
                          <div className="flex justify-between items-start mb-3">
                             <div className="flex items-center gap-2">
                                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-full border border-yellow-200">هشدار نابرابری</span>
                                <span className="text-gray-400 text-xs">مربوط به ماده ۸</span>
                             </div>
                             <button className="text-gray-400 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
                          </div>
                          <h4 className="font-bold text-slate-800 mb-2">حق فسخ یک‌جانبه</h4>
                          <p className="text-sm text-gray-600 leading-6 mb-4">
                             اعطای حق فسخ بدون دلیل به کارفرما، امنیت شغلی و مالی پیمانکار را به شدت تهدید می‌کند و خلاف اصل لزوم قراردادها است.
                          </p>
                          <div className="flex gap-2 mt-2">
                             <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded hover:bg-slate-700 transition">اصلاح با یک کلیک</button>
                             <button className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-50 transition">مشاهده قوانین مرتبط</button>
                          </div>
                       </div>

                       {/* Call to Action Card */}
                       <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-lg text-center mt-8">
                          <p className="text-sm text-gray-300 mb-3">نیاز به بررسی دقیق‌تر دارید؟</p>
                          <h4 className="font-bold text-lg mb-4">ارجاع این پرونده به وکیل متخصص</h4>
                          <div className="flex items-center justify-center gap-4 mb-4">
                             <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-10 h-10 rounded-full border-2 border-accent" alt="lawyer" />
                             <div className="text-right text-xs">
                                <p className="font-bold text-white">دکتر علیرضا صدر</p>
                                <p className="text-accent">متخصص قراردادها</p>
                             </div>
                          </div>
                          <button className="w-full bg-accent text-slate-900 font-bold py-2 rounded text-sm hover:bg-yellow-500 transition">
                            ارسال برای بررسی وکیل
                          </button>
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

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-white shadow border border-accent/20 text-slate-900 font-bold' : 'text-gray-500 hover:bg-white hover:text-slate-800'}`}>
     {/* Fix: Cast icon to React.ReactElement<any> to avoid Partial<unknown> error during prop injection via cloneElement */}
     <span className={`${active ? 'text-accent' : 'text-gray-400'}`}>{React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}</span>
     <span className="text-sm">{label}</span>
     {active && <span className="mr-auto w-1.5 h-1.5 rounded-full bg-accent"></span>}
  </div>
);

const FeatureBadge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center justify-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm text-xs font-medium text-gray-600">
    {icon}
    <span>{text}</span>
  </div>
);

export default AIDemo;