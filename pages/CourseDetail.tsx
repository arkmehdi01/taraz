import React from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/mockData';
import { CheckCircle, PlayCircle, Lock } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id) || courses[0];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-2/3">
              <span className="text-accent font-medium mb-4 block">دوره تخصصی پیشرفته</span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                 <span>مدرس: <span className="text-white">{course.instructor}</span></span>
                 <span>مدت زمان: <span className="text-white">{course.duration}</span></span>
                 <span>وضعیت: <span className="text-green-400">تکمیل ظرفیت</span></span>
              </div>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="bg-white p-6 rounded-lg shadow-2xl text-slate-900">
                 <div className="aspect-video bg-gray-200 rounded mb-4 relative flex items-center justify-center overflow-hidden group cursor-pointer">
                    <img src={course.image} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                 </div>
                 <div className="text-3xl font-bold text-center mb-6">{course.price}</div>
                 <button className="w-full bg-accent hover:bg-amber-600 text-slate-900 font-bold py-3 rounded shadow-lg transition mb-3">
                   ثبت‌نام در دوره
                 </button>
                 <p className="text-xs text-center text-gray-500">دسترسی مادام‌العمر به فایل‌های دوره</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
               <h3 className="text-2xl font-bold text-slate-900 mb-6">سرفصل‌های آموزشی</h3>
               <div className="space-y-4">
                  {course.topics.map((topic, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-accent transition">
                       <div className="flex items-center gap-3">
                         <span className="bg-slate-100 text-slate-600 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">{idx + 1}</span>
                         <span className="font-medium text-slate-800">{topic}</span>
                       </div>
                       <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                  <div className="bg-gray-50 p-4 rounded text-center text-gray-500 text-sm">
                    + ۱۵ سرفصل تخصصی دیگر
                  </div>
               </div>

               <div className="mt-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">این دوره برای چه کسانی مناسب است؟</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {['وکلای پایه یک دادگستری', 'کارآموزان وکالت', 'مدیران حقوقی شرکت‌ها', 'مشاوران قراردادها'].map((item, i) => (
                       <div key={i} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          {item}
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

export default CourseDetail;