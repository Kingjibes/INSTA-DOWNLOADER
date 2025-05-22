import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Send, MessageSquare, Users, ExternalLink, Mail } from 'lucide-react';

    const contactLinks = [
      {
        name: 'WhatsApp Direct',
        href: 'https://wa.me/+233557488116',
        icon: <MessageSquare className="h-8 w-8 text-green-400" />,
        description: 'Chat with me directly for quick queries.',
        cta: 'Message on WhatsApp'
      },
      {
        name: 'Telegram Contact',
        href: 'https://t.me/HACK_ERPRO',
        icon: <Send className="h-8 w-8 text-sky-400" />,
        description: 'Reach out via Telegram for collaborations.',
        cta: 'Connect on Telegram'
      },
      {
        name: 'WhatsApp Channel',
        href: 'https://whatsapp.com/channel/0029Vb3wqli8V0tfOrWXwk2K',
        icon: <Users className="h-8 w-8 text-green-500" />,
        description: 'Join my WhatsApp community for updates.',
        cta: 'Join Channel'
      },
      {
        name: 'Telegram Channel',
        href: 'https://t.me/ciphertech2',
        icon: <Users className="h-8 w-8 text-sky-500" />,
        description: 'Follow my Telegram channel for tech insights.',
        cta: 'Follow Channel'
      },
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
      }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    const ContactPage = () => {
      return (
        <div className="min-h-[calc(100vh-120px)] py-12 sm:py-16 px-4 md:px-8 selection:bg-pink-500 selection:text-white">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'circOut' }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
              className="inline-block p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4 shadow-lg"
            >
              <Mail size={36} className="text-white" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400">
              Let's Connect
            </h1>
            <p className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto">
              Have a question, project idea, or just want to say hi? I'd love to hear from you!
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            {contactLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={cardVariants}
              >
                <Card className="bg-slate-800/70 backdrop-blur-md border-purple-500/40 hover:border-pink-400/70 transition-all duration-300 shadow-xl hover:shadow-pink-500/20 transform hover:-translate-y-1.5 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                    <span className="p-2 bg-slate-700/50 rounded-lg">{link.icon}</span>
                    <CardTitle className="text-xl sm:text-2xl font-semibold text-pink-300">{link.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-gray-400/90 mb-5 text-sm sm:text-base">{link.description}</p>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
                      <Button variant="outline" className="w-full border-pink-400/80 text-pink-300 hover:bg-pink-500/90 hover:text-slate-900 font-medium transition-all duration-300 group py-2.5 text-base">
                        {link.cta} <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      );
    };

    export default ContactPage;