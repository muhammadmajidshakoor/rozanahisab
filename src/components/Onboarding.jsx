import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Clock, DollarSign, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { updateSettings } from '@/lib/storage';

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    currency: 'PKR',
    timeZone: 'UTC',
    dailyResetTime: '00:00'
  });

  const steps = [
    {
      id: 1,
      title: "Welcome to Rozana Hisab",
      subtitle: "Let's set up your business account",
      icon: Building,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Business Information",
      subtitle: "Tell us about your business",
      icon: Building,
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Currency & Time",
      subtitle: "Set your preferred currency and timezone",
      icon: Clock,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "All Set!",
      subtitle: "Your account is ready to use",
      icon: Check,
      color: "from-emerald-500 to-green-600"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 2 && !formData.businessName.trim()) {
      toast({ title: "Error", description: "Please enter your business name", variant: "destructive" });
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = () => {
    updateSettings(formData);
    toast({ title: "Success", description: "Welcome to Rozana Hisab! Your account is set up." });
    onComplete();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <Building className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Welcome to Rozana Hisab</h2>
              <p className="text-muted-foreground text-lg">
                Your digital ledger for managing sales, customers, and business transactions.
              </p>
            </div>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Track sales and payments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Manage customer accounts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Generate business reports</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Backup and restore data</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Business Information</h2>
              <p className="text-muted-foreground">Let's start with your business details</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your business name"
                  className="mt-1"
                />
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This will appear as "{formData.businessName || 'Your Business'}'s Dashboard" on your main screen.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Currency & Time Settings</h2>
              <p className="text-muted-foreground">Configure your business preferences</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select value={formData.timeZone} onValueChange={(value) => handleInputChange('timeZone', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="Asia/Karachi">Asia/Karachi (PKT)</SelectItem>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="dailyResetTime">Daily Reset Time</Label>
                <Input
                  id="dailyResetTime"
                  type="time"
                  value={formData.dailyResetTime}
                  onChange={(e) => handleInputChange('dailyResetTime', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Daily sales will reset at this time in your selected timezone
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">All Set!</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Your business account is ready to use. You can always change these settings later.
              </p>
            </div>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Business: <strong>{formData.businessName}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Currency: <strong>{formData.currency}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Timezone: <strong>{formData.timeZone}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Daily Reset: <strong>{formData.dailyResetTime}</strong></span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-2 ${
                        currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-secondary'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
            <p className="text-muted-foreground">{steps[currentStep - 1].subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
