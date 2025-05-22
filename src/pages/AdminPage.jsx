import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { PlusCircle, Edit, Trash2, LogOut, Eye, Briefcase } from 'lucide-react';
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


    const AdminPage = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const [projects, setProjects] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentProject, setCurrentProject] = useState(null);
      const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '', projectUrl: '', repoUrl: '' });

      useEffect(() => {
        if (localStorage.getItem('isAuthenticated') !== 'true') {
          navigate('/login');
          toast({ title: "Unauthorized", description: "Please log in to access this page.", variant: "destructive" });
        } else {
          loadProjects();
        }
      }, [navigate, toast]);

      const loadProjects = () => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let updatedProjects;
        if (currentProject) {
          updatedProjects = projects.map(p => p.id === currentProject.id ? { ...formData, id: currentProject.id } : p);
          toast({ title: "Project Updated", description: `${formData.name} has been successfully updated.`, className: "bg-blue-500 text-white" });
        } else {
          updatedProjects = [...projects, { ...formData, id: Date.now().toString() }];
          toast({ title: "Project Added", description: `${formData.name} has been successfully added.`, className: "bg-green-500 text-white" });
        }
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
        closeModal();
      };

      const openModal = (project = null) => {
        setCurrentProject(project);
        setFormData(project ? { ...project } : { name: '', description: '', imageUrl: '', projectUrl: '', repoUrl: '' });
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProject(null);
        setFormData({ name: '', description: '', imageUrl: '', projectUrl: '', repoUrl: '' });
      };

      const deleteProject = (id) => {
        const updatedProjects = projects.filter(p => p.id !== id);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
        toast({ title: "Project Deleted", description: "The project has been removed.", variant: "destructive" });
      };

      const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
        navigate('/login');
      };
      
      const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 200 } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
      };

      const projectCardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
      };

      return (
        <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-800 via-purple-800 to-blue-800">
          <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-purple-600/50">
            <motion.h1 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Admin Dashboard
            </motion.h1>
            <div className="flex space-x-3">
              <Button onClick={() => openModal()} className="bg-green-500 hover:bg-green-600 text-white flex items-center">
                <PlusCircle size={20} className="mr-2" /> Add Project
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white flex items-center">
                <LogOut size={20} className="mr-2" /> Logout
              </Button>
            </div>
          </header>

          {projects.length === 0 ? (
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-400 py-16"
            >
              <Briefcase size={64} className="mx-auto mb-6 text-purple-400" />
              <h2 className="text-2xl font-semibold mb-2">No Projects Yet</h2>
              <p className="text-lg">Click "Add Project" to get started.</p>
            </motion.div>
          ) : (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
              <AnimatePresence>
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    variants={projectCardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                  >
                    <Card className="bg-gray-700/50 border-gray-600 text-gray-200 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 flex flex-col h-full">
                      <CardHeader>
                        {project.imageUrl && (
                          <div className="aspect-video rounded-t-md overflow-hidden mb-3">
                            <img  src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                          </div>
                        )}
                        <CardTitle className="text-xl font-semibold text-purple-300">{project.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="text-gray-400 line-clamp-3">{project.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2 pt-4 border-t border-gray-600/50">
                        <Button variant="outline" size="sm" onClick={() => openModal(project)} className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white">
                              <Trash2 size={16} className="mr-1" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-800 border-purple-500 text-gray-200">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-purple-300">Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                This action cannot be undone. This will permanently delete the project "{project.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-gray-300 border-gray-500 hover:bg-gray-700">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteProject(project.id)} className="bg-red-500 hover:bg-red-600 text-white">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg border border-purple-600/70 max-h-[90vh] overflow-y-auto"
                >
                  <h2 className="text-2xl font-semibold mb-6 text-purple-300">{currentProject ? 'Edit Project' : 'Add New Project'}</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-purple-400">Project Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-purple-400">Description</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={4} className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl" className="text-purple-400">Image URL</Label>
                      <Input id="imageUrl" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div>
                      <Label htmlFor="projectUrl" className="text-purple-400">Project URL</Label>
                      <Input id="projectUrl" name="projectUrl" type="url" value={formData.projectUrl} onChange={handleInputChange} placeholder="https://example.com/project" required className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                     <div>
                      <Label htmlFor="repoUrl" className="text-purple-400">Repository URL (Optional)</Label>
                      <Input id="repoUrl" name="repoUrl" type="url" value={formData.repoUrl} onChange={handleInputChange} placeholder="https://github.com/user/repo" className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button type="button" variant="outline" onClick={closeModal} className="text-gray-300 border-gray-500 hover:bg-gray-700">Cancel</Button>
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">{currentProject ? 'Save Changes' : 'Add Project'}</Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    export default AdminPage;