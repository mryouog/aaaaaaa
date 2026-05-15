/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Download, 
  Play, 
  Music, 
  TrendingUp, 
  Menu, 
  X, 
  ChevronRight,
  Headphones,
  Calendar,
  Tag
} from 'lucide-react';
import { CATEGORIES, Category, MusicPost } from './types';
import { MOCK_MUSIC } from './mockData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredMusic = useMemo(() => {
    return MOCK_MUSIC.filter(song => {
      const matchesCategory = selectedCategory === 'All' || song.category === selectedCategory;
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredSong = MOCK_MUSIC.find(s => s.isTrending) || MOCK_MUSIC[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-mwanga-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-mwanga-gold rounded-full flex items-center justify-center">
              <span className="text-black font-display text-xl font-bold">M</span>
            </div>
            <h1 className="text-2xl uppercase tracking-widest font-bold">
              MWANGA<span className="text-mwanga-gold">MUSIC</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-mwanga-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Find music..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-mwanga-gold transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {['Home', 'Latest', 'Trending', 'Charts'].map(item => (
              <a key={item} href="#" className="text-sm uppercase tracking-wider font-medium hover-gold">
                {item}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-white/70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-mwanga-black border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                 <input 
                  type="text" 
                  placeholder="Find music..." 
                  className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-mwanga-gold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {['Home', 'Latest', 'Trending', 'Charts'].map(item => (
                  <a key={item} href="#" className="text-lg uppercase font-display border-b border-white/5 pb-2">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Breaking News Marquee */}
      <div className="bg-mwanga-gold text-black py-2 overflow-hidden whitespace-nowrap border-y border-black/10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 font-bold uppercase text-[10px] tracking-widest"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="w-2 h-2 bg-black rounded-full" />
              Breaking: Diamond Platnumz announces new world tour 2024
              <span className="w-2 h-2 bg-black rounded-full" />
              New Release: Harmonize drops "Single Again" Remix
              <span className="w-2 h-2 bg-black rounded-full" />
              Event: Dar Fresh Festival coming this December!
            </span>
          ))}
        </motion.div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Featured Hero */}
        <section className="mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[3/1]">
            <img 
              src={featuredSong.coverUrl} 
              alt={featuredSong.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mwanga-black via-mwanga-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <TrendingUp className="w-5 h-5 text-mwanga-gold" />
                <span className="text-mwanga-gold text-sm uppercase tracking-widest font-bold">Trending Now</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-7xl mb-4 leading-tight"
              >
                {featuredSong.title} — {featuredSong.artist}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <button className="bg-mwanga-gold text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                  <Download className="w-5 h-5" /> Download MP3
                </button>
                <button className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
                  <Play className="w-5 h-5" /> Preview
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-3 min-w-max">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === 'All' 
                  ? 'bg-mwanga-gold border-mwanga-gold text-black' 
                  : 'border-white/10 text-white/60 hover:border-white/30'
              }`}
            >
              All Music
            </button>
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedCategory === category 
                    ? 'bg-mwanga-gold border-mwanga-gold text-black' 
                    : 'border-white/10 text-white/60 hover:border-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Music List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl flex items-center gap-3">
              <Music className="text-mwanga-gold" />
              LATEST <span className="text-mwanga-gold">RELEASES</span>
            </h3>
            <span className="text-white/40 text-sm hidden sm:block">Showing {filteredMusic.length} songs</span>
          </div>

          <div className="music-grid">
            {filteredMusic.map((song, index) => (
              <motion.div 
                key={song.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-mwanga-gold/10 transition-all"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={song.coverUrl} 
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="w-12 h-12 bg-mwanga-gold rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                      <Play fill="currentColor" className="w-6 h-6" />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                      <Download className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-mwanga-gold/90 backdrop-blur-md text-black text-[10px] uppercase font-bold px-2 py-1 rounded">
                      {song.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-mwanga-gold text-xs font-bold uppercase tracking-widest mb-1">{song.artist}</p>
                  <h4 className="text-xl font-bold truncate mb-3">{song.title}</h4>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Calendar className="w-3 h-3" />
                      {song.date}
                    </div>
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Headphones className="w-3 h-3" />
                      1.2k
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMusic.length === 0 && (
            <div className="text-center py-24 opacity-50">
              <Music className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl">No music found in this category.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-mwanga-black border-t border-white/5 mt-24">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-mwanga-gold rounded-full flex items-center justify-center">
                  <span className="text-black font-display text-xl font-bold">M</span>
                </div>
                <h1 className="text-2xl uppercase tracking-widest font-bold">
                  MWANGA<span className="text-mwanga-gold">MUSIC</span>
                </h1>
              </div>
              <p className="text-white/50 max-w-md leading-relaxed">
                Namba moja kwa burudani, nyimbo mpya za Bongo Flava, Singeli, Gospel na habari za wasanii kote duniani. Usipitwe na chochote kwa kutembelea kila siku.
              </p>
          </div>
          
          <div>
            <h5 className="text-mwanga-gold font-bold mb-6 uppercase tracking-widest text-sm font-display underline underline-offset-8">Categories</h5>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat}>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h5 className="text-mwanga-gold font-bold mb-6 uppercase tracking-widest text-sm font-display underline underline-offset-8">Follow Us</h5>
             <div className="flex gap-4">
                {['Instagram', 'Twitter', 'YouTube', 'Facebook'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-mwanga-gold hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ))}
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>© 2024 MWANGA MUSIC BLOG. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">DMCA</a>
          </div>
        </div>
      </footer>

      {/* Floating Action (Audio Indicator) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 right-6 z-50 glass-card p-4 rounded-2xl flex items-center gap-4 shadow-2xl"
      >
        <div className="w-12 h-12 bg-mwanga-gold rounded-xl overflow-hidden relative">
          <img src={featuredSong.coverUrl} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="flex gap-0.5 items-end h-6">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [8, 20, 10, 18, 8] }}
                    transition={{ repeat: Infinity, duration: 1 + i * 0.2 }}
                    className="w-1 bg-black rounded-full"
                  />
                ))}
             </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-mwanga-gold font-bold uppercase tracking-widest">Now Previewing</p>
          <p className="text-sm font-bold truncate max-w-[150px]">{featuredSong.title}</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

