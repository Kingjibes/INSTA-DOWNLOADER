import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQItem = ({ question, answer }) => (
  <details className="p-4 glass-effect rounded-lg border border-green-500/30 hover:border-green-500/50 transition-all group">
    <summary className="font-semibold text-green-300 cursor-pointer flex justify-between items-center group-hover:text-green-200">
      {question}
      <ChevronDown className="w-5 h-5 transform transition-transform duration-200 group-open:rotate-180" />
    </summary>
    <p className="text-gray-300 mt-3 text-sm sm:text-base">{answer}</p>
  </details>
);

const SupportPage = () => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl mx-auto p-6 sm:p-8 glass-effect rounded-xl shadow-2xl shadow-green-500/20 border border-green-500/40"
  >
    <div className="flex items-center gap-4 mb-6">
      <Users className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        Galactic Support Hub
      </h1>
    </div>
    <p className="text-gray-300 mb-8 text-sm sm:text-base">
      Welcome to the Support Nebula! Our dedicated crew is here to assist you. Find answers to common questions or chart a course to direct contact.
    </p>
    
    <div className="space-y-6 mb-10">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-green-300" />
        <h2 className="text-2xl font-semibold text-white">Frequently Navigated Questions (FNQs)</h2>
      </div>
      <FAQItem 
        question="How do I initiate a download from Instagram?" 
        answer="Simply copy the Instagram post URL, paste it into the portal on our homepage, and hit 'Initiate Download'. Our cosmic engines will handle the rest!" 
      />
      <FAQItem 
        question="Is this intergalactic service free of charge?" 
        answer="Affirmative, Captain! Our Instagram Downloader is completely free. Explore the vast universe of downloads without spending a single credit." 
      />
      <FAQItem 
        question="What if my download encounters a wormhole (fails)?" 
        answer="Ensure your URL is correct and the post is public. If cosmic interference persists, try again after a brief stellar cycle, or contact our support fleet via the Contact page." 
      />
      <FAQItem
        question="Can I download private media?"
        answer="Negative. Due to privacy shields and intergalactic law, we can only access publicly available media. Ensure the profile or post is not set to private."
      />
    </div>

    <Button 
      asChild 
      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:brightness-110 active:scale-95 transition-all duration-200 text-white font-semibold py-3 text-md rounded-lg flex items-center justify-center gap-2 group"
    >
      <Link to="/contact">
        <MessageSquare className="w-5 h-5 group-hover:animate-ping" />
        Still Lost in Space? Contact Support Fleet
      </Link>
    </Button>
  </motion.div>
);

export default SupportPage;