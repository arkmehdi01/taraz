import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/mockData';
import Section from '../components/Section';
import { Clock, User } from 'lucide-react';

const Academy: React.FC = () => {
  return (
    <Section title="آکادمی تخصصی حقوق" subtitle="آموزش‌های کاربردی برای وکلا" className="bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
               <span className="absolute bottom-4 right-4 bg-accent text-slate-900 text-xs font-bold px-3 py-1 rounded">
                 در حال ثبت نام
               </span>
            </div>
            <div className="p-6">
               <h3 className="font-bold text-lg text-slate-900 mb-3 h-14 line-clamp-2">{course.title}</h3>
               <p className="text-gray-500 text-sm mb-6 h-12 line-clamp-2">{course.description}</p>
               
               <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
                 <div className="flex items-center gap-1">
                   <User className="w-4 h-4" /> {course.instructor}
                 </div>
                 <div className="flex items-center gap-1">
                   <Clock className="w-4 h-4" /> {course.duration}
                 </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                 <span className="font-bold text-slate-800">{course.price}</span>
                 <Link to={`/course/${course.id}`} className="text-accent font-medium text-sm hover:text-amber-600 transition-colors">
                   مشاهده جزئیات دوره &larr;
                 </Link>
               </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Academy;