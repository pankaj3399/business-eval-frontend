import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBusinessStore from '../../store/buisnessSrore';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Business {
  _id?: string;
  business_name: string;
  business_location?: string;
  business_notes?: string;
  business_url?: string;
  current_cashflow?: { value?: number; notes?: string[] };
  asking_price?: { value?: number; notes?: string[] };
}

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const { fetchAllBusiness, addBusiness, deleteBusiness } = useBusinessStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [newBusiness, setNewBusiness] = useState<Business>({
    business_name: '',
    business_location: '',
    business_url: '',
    business_notes: '',
    current_cashflow: { value: 0, notes: [] },
    asking_price: { value: 0, notes: [] },
  });
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    setIsPageLoading(true);
    const fetchData = async () => {
      try {
        const allBusinesses = await fetchAllBusiness();
        setBusinesses(allBusinesses.businesses);
        if(localStorage.getItem('business_payload')){
          const business = JSON.parse(localStorage.getItem('business_payload') || '');
          setBusinesses(prev => [...prev,business]);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setIsPageLoading(false);
      }
    };
    if (userId){
      fetchData();
      
    }else{
      if(localStorage.getItem('business')){
        const business = JSON.parse(localStorage.getItem('business') || '');
        setBusinesses([business]);
      }
    };
    setIsPageLoading(false);
  }, [fetchAllBusiness, userId]);

  const handleAddBusiness = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewBusiness({
      business_name: '',
      business_location: '',
      business_url: '',
      business_notes: '',
      current_cashflow: { value: 0, notes: [] },
      asking_price: { value: 0, notes: [] },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'current_cashflow' || name === 'asking_price') {
      const numericValue = value.replace(/,/g, ''); // Remove existing commas
      if (!isNaN(Number(numericValue))) {
        setNewBusiness((prev) => ({
          ...prev,
          [name]: { ...(prev[name as keyof Business] as { value?: number; notes?: string[] }), value: parseFloat(numericValue) },
        }));
      }
    } else {
      setNewBusiness((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const formatNumberWithCommas = (number: number | undefined) => {
    if (isNaN(number!)) return '';
    return number?.toLocaleString() || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userId) {
        const addedBusiness = await addBusiness(newBusiness);
        setBusinesses([...businesses, addedBusiness.newBusiness]);
      } else {
        const id = crypto.randomUUID().replace(/-/g, '').substring(0, 24);
        setBusinesses([...businesses, { ...newBusiness, _id: id }]);
        localStorage.setItem('business', JSON.stringify({ ...newBusiness, _id: id }));
      }
      handleClosePopup();
    } catch (error) {
      toast.error("Business already exists, use another name.");
      console.error('Error adding business:', error);
    }
  };

  const handleDeleteBusiness = async (id: string) => {
    try {
      if (userId) {
        await deleteBusiness(id);
        setBusinesses(businesses.filter((business) => business._id !== id));
      } else {
        localStorage.removeItem('business');
        setBusinesses(businesses.filter((business) => business._id !== id));
      }
    } catch (error) {
      console.error('Error deleting business:', error);
    }
  };

  const handleBusinessClick = (id: string) => {
    navigate(`/dashboard/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6  min-h-screen relative">
      <ToastContainer />
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 p-4  flex justify-between items-center z-10"
      >
        <h1 className="text-black text-2xl font-bold">Saved Businesses</h1>
        <div className="flex items-center space-x-4">
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white rounded-full p-2 flex items-center justify-center"
            onClick={handleAddBusiness}
          >
            <Plus size={24} />
          </motion.button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center flex items-center">Add New Business</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {['business_name', 'business_location', 'business_url', 'current_cashflow', 'asking_price'].map((field) => (
                  <div className="grid items-center gap-4" key={field}>
                    <Label htmlFor={field} className="capitalize">
                      {field.replace('_', ' ')}
                    </Label>
                    <Input
                      id={field}
                      name={field}
                      type="text"
                      value={
                        (field === 'current_cashflow' || field === 'asking_price')
                          ? formatNumberWithCommas((newBusiness[field] as { value?: number })?.value)
                          : (newBusiness[field as keyof Business] as string | number | undefined)
                      }
                      onChange={handleInputChange}
                      placeholder={'Enter ' + field.replace('_', ' ')}
                      className="col-span-3"
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white rounded-full p-2 flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <motion.div
            key={business._id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <Card>
              <CardHeader>
                <CardTitle>{business.business_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">
                  <span className="font-medium">Cashflow:</span> ${formatNumberWithCommas(business.current_cashflow?.value)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Asking Price:</span> ${formatNumberWithCommas(business.asking_price?.value)}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleBusinessClick(business._id!)}>
                  View Details
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteBusiness(business._id!)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
