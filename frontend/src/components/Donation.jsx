import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { Heart, DollarSign, CreditCard, Building2, User } from 'lucide-react';
import { api } from '../api';
import { getPublicSiteContent } from '../api';
import Header from './Header';
import Footer from './Footer';

const Donation = () => {
  const { toast } = useToast();
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(false);
  
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    currency: 'INR',
    payment_method: 'online',
    message: '',
    anonymous: false,
    recurring: false,
    frequency: ''
  });

  useEffect(() => {
    const loadSiteContent = async () => {
      try {
        const backendContent = await getPublicSiteContent();
        if (backendContent.content && Object.keys(backendContent.content).length > 0) {
          setSiteContent(backendContent.content);
        } else {
          setSiteContent({});
        }
      } catch (error) {
        console.log('Using empty site content');
        setSiteContent({});
      }
    };
    loadSiteContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!donationForm.name.trim() || !donationForm.email.trim() || !donationForm.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(donationForm.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const donationData = {
        ...donationForm,
        amount: amount,
        frequency: donationForm.recurring ? donationForm.frequency : null
      };
      
      await api.submitDonation(donationData);
      toast({
        title: "Thank You!",
        description: "Your donation has been received. We will process it shortly.",
      });
      
      // Reset form
      setDonationForm({
        name: '',
        email: '',
        phone: '',
        amount: '',
        currency: 'INR',
        payment_method: 'online',
        message: '',
        anonymous: false,
        recurring: false,
        frequency: ''
      });
    } catch (error) {
      let errorMessage = "Failed to submit donation. Please try again.";
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      

      {/* Donation Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Donation Form */}
            <div className="md:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                    معلومات المتبرع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        مبلغ التبرع <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {presetAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={donationForm.amount === amount.toString() ? "default" : "outline"}
                            onClick={() => setDonationForm({...donationForm, amount: amount.toString()})}
                            className="w-full"
                          >
                            {amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <Input
                        type="number"
                        placeholder="Or enter custom amount"
                        value={donationForm.amount}
                        onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                        min="1"
                        step="1"
                        required
                      />
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <Select
                        value={donationForm.currency}
                        onValueChange={(value) => setDonationForm({...donationForm, currency: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">جنيه</SelectItem>
                          <SelectItem value="USD">دولار ($)</SelectItem>
                          <SelectItem value="EUR">يورو (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع</label>
                      <Select
                        value={donationForm.payment_method}
                        onValueChange={(value) => setDonationForm({...donationForm, payment_method: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">اونلاين</SelectItem>
                          <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="cash">كاش</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Recurring Donation */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recurring"
                        checked={donationForm.recurring}
                        onCheckedChange={(checked) => setDonationForm({...donationForm, recurring: checked})}
                      />
                      <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                      اجعل هذا تبرعًا دوريًا
                      </label>
                    </div>

                    {donationForm.recurring && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تكرار</label>
                        <Select
                          value={donationForm.frequency}
                          onValueChange={(value) => setDonationForm({...donationForm, frequency: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">شهريا</SelectItem>
                            <SelectItem value="quarterly">ربع سنوية</SelectItem>
                            <SelectItem value="yearly">سنوي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Donor Information */}
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        معلومات المانح
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                          الاسم الكامل <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            value={donationForm.name}
                            onChange={(e) => setDonationForm({...donationForm, name: e.target.value})}
                            placeholder="Your full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            البريد <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="email"
                            value={donationForm.email}
                            onChange={(e) => setDonationForm({...donationForm, email: e.target.value})}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">هاتف (Optional)</label>
                          <Input
                            type="tel"
                            value={donationForm.phone}
                            onChange={(e) => setDonationForm({...donationForm, phone: e.target.value})}
                            placeholder="Your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">رسالة (اختياري)</label>
                          <Textarea
                            value={donationForm.message}
                            onChange={(e) => setDonationForm({...donationForm, message: e.target.value})}
                            placeholder="Any message you'd like to include..."
                            rows={3}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="anonymous"
                            checked={donationForm.anonymous}
                            onCheckedChange={(checked) => setDonationForm({...donationForm, anonymous: checked})}
                          />
                          <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                          التبرع بشكل مجهول
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-[#d78525]  text-white py-6 text-lg"
                    >
                      {loading ? 'Processing...' : 'Proceed to Donate'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Why Donate */}
            <div className="md:col-span-1">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">لماذا التبرع؟</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Heart className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Transform Lives</h4>
                      <p className="text-sm text-gray-600">تساهم تبرعاتكم بشكل مباشر في دعم برامج تنمية مهارات الشباب</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Build Communities</h4>
                      <p className="text-sm text-gray-600">ساعدونا في إحداث تأثير مستدام في المجتمعات </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure & Transparent</h4>
                      <p className="text-sm text-gray-600">تتم معالجة جميع التبرعات بشكل آمن وتستخدم بشفافية.</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
  <h4 className="font-semibold mb-2">طرق أخرى للمساعدة</h4>
  <p className="text-sm text-gray-600 mb-3">
    لا تستطيع التبرع الآن؟ فكر في التطوع أو نشر كلمة عن مهمتنا.
  </p>
  <Button variant="outline" className="w-full" asChild>
    <a href="/contact">اتصل بنا</a>
  </Button>
</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donation;

