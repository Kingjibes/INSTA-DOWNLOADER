import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Eye, Github, Briefcase } from 'lucide-react';

    const HomePage = () => {
      const [projects, setProjects] = useState([]);

      useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
      }, []);

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      };

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 100 },
        },
      };

      return (
        <div className="container mx-auto py-12 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              HACKERPRO'S PROJECTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Welcome to my personal showcase. Explore the projects I've passionately built and crafted.
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-400 text-xl py-10"
            >
              <Briefcase size={48} className="mx-auto mb-4 text-purple-400" />
              No projects available yet. Check back soon!
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="bg-gray-800/60 border-gray-700 hover:shadow-purple-500/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                    <CardHeader>
                      {project.imageUrl && (
                        <div className="aspect-video rounded-t-lg overflow-hidden mb-4">
                           <img  src={project.imageUrl} alt={project.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                      )}
                      <CardTitle className="text-2xl font-bold text-purple-300">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-400 line-clamp-3">{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                       <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="text-purple-300 border-purple-400 hover:bg-purple-400 hover:text-gray-900">
                          <Eye size={18} className="mr-2" /> View Project
                        </Button>
                      </a>
                      {project.repoUrl && (
                         <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" className="text-gray-400 hover:text-purple-300">
                            <Github size={18} className="mr-2" /> Source
                          </Button>
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      );
    };

    export default HomePage;