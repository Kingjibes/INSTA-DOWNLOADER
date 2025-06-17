import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
    className="max-w-2xl mx-auto p-6 sm:p-8 glass-effect rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/40"
  >
    <div className="flex items-center gap-4 mb-6">
      <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        Contact Our Command Center
      </h1>
    </div>
    <p className="text-gray-300 mb-8 text-sm sm:text-base">
      Have a query, a brilliant idea, or just want to chat about the cosmos? Send us a transmission! We're always excited to hear from fellow space explorers.
    </p>
    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Callsign (Name)</label>
        <Input id="name" type="text" placeholder="e.g., Captain Starbeam" className="w-full bg-black/50 border-purple-500/60 text-white placeholder:text-gray-400/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 rounded-lg py-2.5 px-4" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Starmail (Email)</label>
        <Input id="email" type="email" placeholder="e.g., captain@starfleet.com" className="w-full bg-black/50 border-purple-500/60 text-white placeholder:text-gray-400/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 rounded-lg py-2.5 px-4" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Transmission (Message)</label>
        <Textarea id="message" rows="5" placeholder="Share your thoughts, captain's logs, or alien encounter stories..." className="w-full bg-black/50 border-purple-500/60 text-white placeholder:text-gray-400/70 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 rounded-lg py-2.5 px-4 min-h-[120px]" />
      </div>
      <Button 
        type="button" 
        onClick={() => toast({ 
          title: "🚧 Transmission Blocked!", 
          description: "Our comms array for this channel is under maintenance. Try hailing us on a different frequency (feature request) later! 🚀"
        })} 
        className="w-full cosmic-gradient hover:brightness-110 active:scale-95 transition-all duration-200 py-3 text-md rounded-lg flex items-center justify-center gap-2 group"
      >
        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        Launch Transmission
      </Button>
    </form>
  </motion.div>
);

export default ContactPage;