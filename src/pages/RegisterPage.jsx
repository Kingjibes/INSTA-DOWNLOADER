import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { UserPlus, Eye, EyeOff } from 'lucide-react';

    const RegisterPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast({ title: "Registration Failed", description: "Passwords do not match.", variant: "destructive" });
          return;
        }
        if (localStorage.getItem('user')) {
          toast({ title: "Registration Failed", description: "An admin account already exists. Only one admin account is allowed.", variant: "destructive" });
          return;
        }
        
        localStorage.setItem('user', JSON.stringify({ email, password }));
        toast({ title: "Registration Successful", description: "You can now log in.", className: "bg-green-500 text-white" });
        navigate('/login');
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-purple-500/30"
          >
            <motion.h1 
              className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Create Admin Account
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-purple-300 text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  required
                  className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="relative">
                <Label htmlFor="password" className="text-purple-300 text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                />
                 <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-purple-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <Label htmlFor="confirmPassword" className="text-purple-300 text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="mt-1 bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500"
                />
                 <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-purple-300"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                <UserPlus size={20} className="mr-2" /> Register
              </Button>
            </form>
             <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login here</a>
            </p>
          </motion.div>
        </div>
      );
    };

    export default RegisterPage;