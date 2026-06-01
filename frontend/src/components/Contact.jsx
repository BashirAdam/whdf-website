import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Heart, Users, HandHeart, UserPlus } from 'lucide-react';
import { api } from '../api';

import { getPublicSiteContent } from '../api';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const { toast } = useToast();
  // Site content state
  const [siteContent, setSiteContent] = useState({});

  // Load site content on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from public API first
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
    
    loadData();
  }, []);

  // Form states
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    skills: '',
    availability: '',
    interests: [],
    experience: '',
    motivation: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Interest options for volunteers
  const interestOptions = [
    { id: 'youth', label: 'Youth Skilling Programs' },
    { id: 'seniors', label: 'Senior Citizen Care' },
    { id: 'events', label: 'Events & Activities' },
    { id: 'fundraising', label: 'Fundraising' },
    { id: 'admin', label: 'Administrative Support' }
  ];

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitContact(contactForm);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // Handle volunteer form submission
  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitVolunteer(volunteerForm);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll contact you soon.",
      });
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        age: '',
        occupation: '',
        skills: '',
        availability: '',
        interests: [],
        experience: '',
        motivation: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setLoading(true);
    try {
      await api.subscribeNewsletter({ email: newsletterEmail });
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setNewsletterEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // Handle volunteer interest changes
  const handleInterestChange = (interestId, checked) => {
    setVolunteerForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      


{/* Forms Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-black flex items-center justify-end">
            أرسل لنا رسالة
            
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الاسم *</label>
                <Input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">البريد الإلكتروني *</label>
                <Input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الهاتف</label>
                <Input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الموضوع *</label>
                <Input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الرسالة *</label>
              <Textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows={5}
                required
                className="text-right"
                style={{ direction: 'rtl' }}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#d78525] hover:bg-[#b8681a] text-white"
              disabled={loading}
            >
              {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Volunteer Application Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-black flex items-center justify-end">
            تطوع معنا
            
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الاسم الكامل *</label>
                <Input
                  type="text"
                  value={volunteerForm.name}
                  onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">البريد الإلكتروني *</label>
                <Input
                  type="email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الهاتف *</label>
                <Input
                  type="tel"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">العمر *</label>
                <Input
                  type="number"
                  value={volunteerForm.age}
                  onChange={(e) => setVolunteerForm({...volunteerForm, age: e.target.value})}
                  required
                  className="text-right"
                  style={{ direction: 'rtl' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المهنة</label>
              <Input
                type="text"
                value={volunteerForm.occupation}
                onChange={(e) => setVolunteerForm({...volunteerForm, occupation: e.target.value})}
                className="text-right"
                style={{ direction: 'rtl' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المهارات والخبرات</label>
              <Textarea
                value={volunteerForm.skills}
                onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                rows={3}
                placeholder="مثال: مهارات التواصل، التنظيم، الخبرة في العمل التطوعي، إلخ."
                className="text-right"
                style={{ direction: 'rtl' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الاهتمامات *</label>
              <div className="space-y-2">
                {interestOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-end space-x-2">
                    <label htmlFor={option.id} className="text-sm text-gray-700">
                      {option.label}
                    </label>
                    <Checkbox
                      id={option.id}
                      checked={volunteerForm.interests.includes(option.id)}
                      onCheckedChange={(checked) => handleInterestChange(option.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">التوفر *</label>
              <Select value={volunteerForm.availability} onValueChange={(value) => setVolunteerForm({...volunteerForm, availability: value})}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر توفرك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekdays">أيام الأسبوع</SelectItem>
                  <SelectItem value="weekends">عطلات نهاية الأسبوع</SelectItem>
                  <SelectItem value="flexible">مرن</SelectItem>
                  <SelectItem value="monthly">مرة في الشهر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">لماذا تريد التطوع؟ *</label>
              <Textarea
                value={volunteerForm.motivation}
                onChange={(e) => setVolunteerForm({...volunteerForm, motivation: e.target.value})}
                rows={3}
                required
                placeholder="شاركنا سبب اهتمامك بالتطوع مع الجبهة"
                className="text-right"
                style={{ direction: 'rtl' }}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#d78525] hover:bg-[#b8681a] text-white"
              disabled={loading}
            >
              {loading ? 'جاري الإرسال...' : 'تقديم الطلب'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

      {/* Newsletter Subscription */}
<section className="py-20 bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">اشترك معنا</h2>
    <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
      اشترك في نشرتنا البريدية ليصلك كل جديد عن برامجنا وأخبارنا
    </p>
    
    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
      <div className="flex gap-4">
        <Input
          type="email"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 border-2 border-gray-400 focus:border-[#d78525] focus:ring-[#d78525]"
          required
        />
        <Button 
          type="submit"
          className="bg-[#d78525] hover:bg-[#b8681a] text-white"
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  </div>
</section>
      <Footer />
    </div>
  );
};

export default Contact;
