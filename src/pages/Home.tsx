/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, ArrowRight, BookOpen, Award, Sparkles, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import HeaderInfo from '../components/HeaderInfo';

const categories = [
  {
    titleLine1: 'Chương trình',
    titleLine2: 'Tiêu chuẩn',
    path: '/e-library?program=tieuchuan',
    icon: BookOpen,
    color: 'bg-blue-900',
  },
  {
    titleLine1: 'Chương trình',
    titleLine2: 'Chất lượng cao',
    path: '/e-library?program=clc',
    icon: Award,
    color: 'bg-orange-600',
  },
  {
    titleLine1: 'Chương trình',
    titleLine2: 'tiên tiến',
    path: '/e-library?program=tientien',
    icon: Sparkles,
    color: 'bg-emerald-700',
  },
  {
    titleLine1: 'Quản trị',
    titleLine2: 'Khách sạn',
    path: '/e-library?program=khachsan',
    icon: Hotel,
    color: 'bg-violet-700',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000")' }}
        >
          <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <HeaderInfo isHome />
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 uppercase tracking-[0.15em]"
          >
            Elite Library
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Khám phá kho tàng tri thức vô tận. Nơi hội tụ của những đầu sách, khóa học và tạp chí hàng đầu.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border border-white/10 overflow-hidden w-full">
              <input
                type="text"
                placeholder="Tìm tên tài liệu, sách, kỹ năng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 md:px-6 py-3.5 md:py-5 pr-12 md:pr-16 text-charcoal focus:outline-none bg-transparent transition-all text-xs sm:text-sm md:text-lg"
              />
              <button className="absolute right-1.5 p-2 md:p-3 bg-accent text-white rounded-full hover:bg-orange-600 transition-colors shadow-lg active:scale-95 transition-transform shrink-0">
                <Search className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories / Featured Sections */}
      <section className="py-20 px-4 bg-background-cream/40 backdrop-blur-sm dark:bg-primary/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center text-[#ff6600] uppercase tracking-tighter mb-16">
            Chương trình học của bạn
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.20, zIndex: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col justify-between bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] transition-all border border-gray-100 dark:border-white/5 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.03] -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700`}
                  ></div>

                  <div className="flex flex-col items-center text-center">
                    <div className={`inline-flex p-5 rounded-2xl ${cat.color} text-white mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-[25px] font-black text-primary dark:text-white mb-8 leading-snug drop-shadow-sm min-h-[56px] flex flex-col items-center justify-center">
                      <span>{cat.titleLine1}</span>
                      <span className="mt-1">{cat.titleLine2}</span>
                    </h3>
                  </div>

                  <div className="w-full">
                    <Link
                      to={cat.path}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-black text-[15px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-md hover:shadow-accent/40 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Khám phá ngay</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-widest">Bạn cần trợ giúp?</h2>
          <p className="text-gray-300 mb-10 text-lg">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc về cách sử dụng hệ thống và quyền truy cập học liệu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/guide"
              className="px-8 py-4 bg-accent text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg uppercase tracking-widest"
            >
              Xem hướng dẫn
            </Link>
            <Link
              to="/about-us"
              className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all uppercase tracking-widest"
            >
              Về chúng tôi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
