import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Heart, Users, GraduationCap, Award, Phone, Mail, MapPin, ArrowRight, CheckCircle, Clock ,Flag ,ArrowLeft} from 'lucide-react';
import { api, getPublicSiteContent } from '../api';

import Header from './Header';
import Footer from './Footer';
import TestimonialsSection from './TestimonialsSection';
import ImpactHighlightsSection from './ImpactHighlightsSection';
import { 
  Target, 
  BookOpen,
  Languages,
  HeartHandshake,
  Compass
} from 'lucide-react';


const Homepage = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [impactStats, setImpactStats] = useState({});

  

  // Site content state
  const [siteContent, setSiteContent] = useState({});

  // Load site content and impact statistics on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load impact statistics
        const stats = await api.getImpactStats();
        setImpactStats(stats);
        
        // Load site content from database API
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
      } catch (error) {
        console.error('Failed to load homepage data:', error);
      }
    };
    
    loadData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.submitContactForm(contactForm);
      toast({
        title: "Success",
        description: response.message,
      });
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '', inquiryType: 'general' });
    } catch (error) {
      // Handle FastAPI validation errors properly
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
            const validationErrors = error.response.data.detail.map(err => {
              const field = err.loc?.join(' ') || 'field';
              return `${field}: ${err.msg}`;
            }).join(', ');
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof error.response.data.detail === 'string') {
            errorMessage = error.response.data.detail;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    try {
      const response = await api.subscribeNewsletter(newsletterEmail);
      toast({
        title: "Success",
        description: response.message,
      });
      setNewsletterEmail('');
    } catch (error) {
      // Handle FastAPI validation errors properly
      let errorMessage = "Failed to subscribe. Please try again.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
            const validationErrors = error.response.data.detail.map(err => {
              const field = err.loc?.join(' ') || 'field';
              return `${field}: ${err.msg}`;
            }).join(', ');
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof error.response.data.detail === 'string') {
            errorMessage = error.response.data.detail;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
  <>
  

  

  
{/* YOUR CLEAN CONTENT */}
<main className="flex-grow p-4 md:p-8">
  <div className="max-w-5xl mx-auto">
    
    <div className="bg-gray-50 rounded-2xl p-8 mb-12 shadow-md border-t-4 border-t-[#d78525] border border-gray-100">
      <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-justify" style={{ direction: 'rtl' }}>
        هي حركة ثقافية ثورية سياسية سلمية تهدف لإقامة إقليم دار زغاوة (إقليم بيربي) 
        كمركزية ثقافية وسياسية لشعب الزغاوة في السودان، مستندة على الإرث الحضاري لممالك 
        الزغاوة قبل الميلاد ومملكة كانم بعد الميلاد، وتتبنى هويتنا الثقافية الخاصة 
        بنا كقومية لنا لغتنا وهويتنا إلافريقية.
      </p>
    </div>
    {/* Our Story - NOW INSIDE the max-w-5xl container */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
          {siteContent.about?.story?.title || "البداية"}
        </h2>
        <div className="text-lg text-gray-800 leading-relaxed mb-6 text-justify" style={{ direction: 'rtl' }}>
          {siteContent.about?.story?.content || `تأسست جبهة وادي هور الديمقراطية في 12 أبريل 2021م بهدف واضح: "إقامة إقليم دار زغاوة (إقليم بيربي) كمركزية ثقافية وسياسية لشعب الزغاوة في السودان، مستندة على الإرث الحضاري لممالك الزغاوة قبل الميلاد ومملكة كانم بعد الميلاد، والعمل على تمكين المجتمع للحفاظ على هويته إلافريقية وحقوقه الثقافية والسياسية."`}
        </div>
      </div>
      <div className="relative">
        <img 
          src="/images/logo-preview.png"
          alt="جبهة وادي هور الديمقراطية"
          className="rounded-lg shadow-lg w-full"
        />
        <div className="absolute -bottom-6 -left-6 bg-[#d78525] text-white p-5 rounded-lg min-w-[130px] text-center" style={{ direction: 'rtl' }}>
          <div className="text-xl font-bold">
            {siteContent.about?.story?.highlightBox?.text || "5+ سنوات"}
          </div>
          <div className="text-xs">
            {siteContent.about?.story?.highlightBox?.subtext || "منذ التأسيس في العام 2021"}
          </div>
        </div>
      </div>
    </div>
    



      {/* الرؤية الثقافية والسياسية */}
<div className="bg-gray-50 rounded-xl p-6 mb-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    الرؤية الثقافية والسياسية
  </h2>
  
  <div className="space-y-6">
    {/* النص الرئيسي */}
    <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      يُعد الزغاوة من الشعوب الأصيلة في السودان، وهو ما تؤكده العديد من الوثائق والكتب التاريخية التي دوّنها مؤرخون يونانيون وعرب ومسلمون، إضافة إلى الباحثين والأكاديميين المعاصرين. ولعل الزغاوة من أكثر المكونات السودانية التي ورد ذكرها وتوثيق تاريخها في منطقة وادي النيل، الأمر الذي يفسر جانبًا من الاستهداف الذي تعرضوا له عبر التاريخ الحديث، في محاولة لتهميش مكانتهم التاريخية والحضارية المتميزة في المنطقة.
    </p>
    
    <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      لقد تولّت النخب والتنظيمات السياسية التي حكمت السودان بعد الاستقلال مهمة بناء الدولة الوطنية، إلا أنها لم تكتفِ بفرض العروبة باعتبارها الهوية الوحيدة للدولة السودانية، بل اتجهت كذلك إلى تبني سياسات هدفت إلى إقصاء الهويات الثقافية للمجموعات والقبائل الأفريقية، بغرض إضعاف أو إنهاء أي حضور ثقافي مغاير. وكان من الممكن اختيار مسار مختلف يقوم على الاعتراف بالتنوع واحترام التعدد الثقافي، كما فعلت دول متعددة القوميات والثقافات مثل الهند وماليزيا.
    </p>
    
    <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      وعلى مدى سبعين عامًا، استمرت الدولة السودانية والنخب السياسية في احتكار تعريف الثقافة الوطنية وصياغتها وفق رؤية أحادية، مع إقصاء الثقافات واللغات الأفريقية من المناهج الدراسية ومؤسسات الدولة، وإهمال تاريخ الزغاوة بشكل شبه كامل في العملية التعليمية. كما تعرض إقليم وادي هور (دار الزغاوة التاريخية) إلى تهميش تنموي ممنهج، تجلى في غياب المؤسسات الخدمية الأساسية، حيث لا يوجد حتى اليوم مستشفى تخصصي متكامل أو مركز رئيسي لاستخراج الوثائق الثبوتية يخدم المنطقة بصورة كافية.
    </p>
    
    <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      ويُعد هذا الإقصاء التنموي من أكثر مظاهر التهميش وضوحًا، ليس فقط على مستوى دارفور، بل على مستوى السودان عمومًا. فالكثير من المدن الأصغر حجمًا، مثل مليط وكبكابية وزالنجي وبرام، تتفوق على دار الزغاوة بعقود من الزمن من حيث البنية التحتية والخدمات والمؤسسات الحكومية.
    </p>
    
    <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      ورغم أن أبناء المنطقة من السياسيين ورجال الأعمال أتيحت لهم فرص عديدة للمساهمة في تطوير دار الزغاوة، فإن ذلك لم يتحقق بالمستوى المطلوب لأسباب متعددة، من بينها تأثير المركزية الثقافية وما يمكن وصفه بحالة الاستلاب الثقافي، حيث أسهمت المناهج التعليمية والأطر السياسية السائدة في تشكيل وعي يدفع كثيرًا من الأفراد إلى الابتعاد عن جذورهم الثقافية والاجتماعية، وتبني تصورات وهويات بديلة، الأمر الذي أضعف ارتباط بعض النخب بمجتمعاتها المحلية وقضاياها التنموية.
    </p>
    
    <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      وإذا كانت الأحزاب التقليدية وبعض التيارات السياسية قد مارست سياسات التعريب والإقصاء الثقافي، فإن فترة حكم الإسلاميين شهدت، وفق رؤية العديد من أبناء دارفور، تصاعدًا في الانتهاكات المرتبطة بالصراع المسلح، وما صاحبه من أعمال عنف واسعة النطاق خلفت آثارًا إنسانية عميقة ما زالت تداعياتها مستمرة حتى اليوم. ويرى أصحاب هذه الرؤية أن تلك الأحداث كانت امتدادًا للأزمة البنيوية التي صاحبت مشروع الدولة السودانية منذ الاستقلال.
    </p>

    {/* الأهداف */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>
        الأهداف
      </h3>
      
      {/* أولاً: الحقوق الثقافية والهوية */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2 text-right" style={{ direction: 'rtl' }}>
          أولًا: الحقوق الثقافية والهوية
        </h4>
        <ul className="list-disc pr-6 space-y-2 text-gray-700" style={{ direction: 'rtl' }}>
          <li>السعي إلى انتزاع الاعتراف الرسمي بالهوية الثقافية واللغوية والتاريخية لمجتمعات الزغاوة باعتبارها جزءًا أصيلًا من التنوع السوداني.</li>
          <li>حماية الإرث الحضاري والتاريخي المرتبط بمملكة الزغاوة التاريخية في السودان.</li>
          <li>تعزيز حضور الثقافة الزغاوية في المؤسسات التعليمية والثقافية والإعلامية.</li>
        </ul>
      </div>

      {/* ثانيًا: المركزية الثقافية والسياسية */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2 text-right" style={{ direction: 'rtl' }}>
          ثانيًا: المركزية الثقافية والسياسية
        </h4>
        <ul className="list-disc pr-6 space-y-2 text-gray-700" style={{ direction: 'rtl' }}>
          <li>العمل على إنشاء مركزية ثقافية وسياسية لمجتمعات الزغاوة ووادي هور، بما يمثل إطارًا للتعبير عن الهوية والمصالح التنموية والسياسية داخل دولة سودانية موحدة تقوم على الفيدرالية والتعدد الثقافي واللغوي.</li>
          <li>تعزيز المشاركة السياسية العادلة لمجتمعات وادي هور في مؤسسات الحكم وصناعة القرار.</li>
        </ul>
      </div>

      {/* ثالثًا: الحقوق اللغوية */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-2 text-right" style={{ direction: 'rtl' }}>
          ثالثًا: الحقوق اللغوية
        </h4>
        <ul className="list-disc pr-6 space-y-2 text-gray-700" style={{ direction: 'rtl' }}>
          <li>السعي إلى الاعتراف بلغة الزغاوة كلغة وطنية ورسمية ضمن اللغات السودانية المعترف بها دستوريًا.</li>
          <li>اعتماد اللغة الزغاوية لغةً للتعليم والثقافة في إقليم وادي هور إلى جانب اللغات الأخرى المعتمدة.</li>
        </ul>
      </div>

      {/* رابعًا: التنمية المستدامة */}
      <div>
        <h4 className="font-medium text-gray-800 mb-2 text-right" style={{ direction: 'rtl' }}>
          رابعًا: التنمية المستدامة وإعادة بناء المؤسسات
        </h4>
        <p className="text-gray-700 leading-relaxed text-justify mb-3" style={{ direction: 'rtl' }}>
          العمل على ترسيخ صلاحيات إدارية وتنموية تمكّن الإقليم من وضع وتنفيذ استراتيجياته التنموية وفق احتياجاته المحلية، ومن أبرز المشروعات المقترحة:
        </p>
        <ul className="list-disc pr-6 space-y-2 text-gray-700" style={{ direction: 'rtl' }}>
          <li>إنشاء مستشفى تخصصي عام يخدم سكان دار الزغاوة ووادي هور.</li>
          <li>تأسيس بنوك ومؤسسات تمويل تنموي تدعم الأنشطة الاقتصادية المحلية.</li>
          <li>إنشاء بورصات وأسواق حديثة للماشية والإبل والمنتجات المحلية.</li>
          <li>تطوير مؤسسات الشرطة والخدمات المدنية لاستخراج الوثائق الثبوتية وتقديم الخدمات الحكومية.</li>
          <li>إنشاء مؤسسة إقليمية للسجل التجاري والضريبي لتسهيل الأعمال والاستثمارات المحلية.</li>
          <li>تأسيس جامعة وادي هور للعلوم والتكنولوجيا لتكون مركزًا للتعليم العالي والبحث العلمي والتنمية البشرية.</li>
        </ul>
      </div>
    </div>

    {/* الخاتمة */}
    <div className="pt-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        إن مشروع استرداد الحقوق الثقافية لمجتمعات وادي هور لا يهدف إلى الانعزال أو التقويض من وحدة السودان، بل يسعى إلى بناء دولة قائمة على العدالة والمواطنة المتساوية والاعتراف بالتنوع الثقافي واللغوي. فالسودان، بتاريخه وتعدده، لا يمكن أن يستقر أو يحقق التنمية المستدامة إلا من خلال الاعتراف المتبادل بين مكوناته المختلفة، وضمان الحقوق الثقافية والسياسية والتنموية لجميع شعوبه دون تمييز أو إقصاء.
      </p>
    </div>
  </div>
</div>




{/* Main Content Container */}
<div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        
        {/* Who are the Zaghawa People - Full Section */}
        <div className="mb-8 mt-7">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            من هم شعب الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            الزغاوة هم أحد الشعوب الإفريقية العريقة التي تعيش في منطقة الساحل الإفريقي، ويُعتبرون من أقدم المجموعات الإثنية في إقليم دارفور بغرب السودان وشمال تشاد. عُرفوا تاريخيًا بأنهم شعب محارب، تاجر، ومبدع في الزراعة والرعي، ولهم نظام اجتماعي وسياسي متماسك.
          </p>
        </div>






         {/* Who are the Zaghawa People - Full Section */}
         <div className="mb-8 mt-7">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
          لغة الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            يتحدث الزغاوة لغة تعرف باسم البريا او بيرا، وهي لغة من فصيلة اللغات النيلية الصحراوية، ولها عدة لهجات محلية. كما يتحدث كثير من الزغاوة العربية كلغة ثانية ، خاصة في السودان والفرنسية في تشاد. ولغة الزغاوة مكتوبة وتتكون من ثمانية وعشرون حرفآ وله كيبورد خاص به ويتم تدريسه في جامعة كولن بجمهورية المالنيا لطلاب الدراسات العليا . كما يوجد العديد من الكتب عن تعليم لغة الزغاوة . وتم صياغة حروف اللغة من اوشام الابل لدي قومية الزغاوة عن طريق بحث قام الاستاذ ادم تاجر في نهاية القرن الماضي . وتم وضع القواعد وتقنين الحروف بواسطة الطبيب البيطري صديق ادم عيسى خريج جامعة الخرطوم، وكما ساهمت البروفسيرة انجيلا جاكوبي من معهد كولن الالمانية في صياغة القواعد النحوية للغة الزغاوة.
          </p>
        </div>

        {/* Details in two columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
              <Compass className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
              مطورو لغة الزغاو
            </h3>
            <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
              <li className="text-right"> 'الأستاذ ادم محمد عبدالله عيسى 'ادم تاجر </li>
              <li className="text-right">الدكتور صديق ادم عيسي</li>
              <li className="text-right">الدكتور محمود ابكر الطيناوي</li>
              <li className="text-right"> الاستاذ الصادق صديق  </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
              <Languages className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
              أين يقطن الزغاوة
              </h3>
            <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
              <li className="text-right">شمال وغرب دارفور (كُتُم، كُرنوي، أم برو، الطينة، كُبكابية، مليط)</li>
              <li className="text-right">شمال ووسط تشاد (انجمينا، ابيشي، وادي فِرا، أُمّ جرس)</li>
              <li className="text-right">جاليات في ليبيا والنيجر والمدن السودانية الكبرى</li>
            </ul>
          </div>
        </div>
</div>

{/* Culture & Heritage Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
            ثقافة وتراث الزغاوة
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
            ثقافة الزغاوة غنية بالعناصر التي تمزج بين الأفريقية والعربية، وبين البدوية والحضرية، وتُعتبر من أعمق الثقافات في المنطقة. تقوم الحياة الاجتماعية على الاحترام المتبادل والترابط القبلي، وتُعد الأسرة النواة الأساسية في بناء المجتمع، بينما تلعب المرأة دورًا محوريًا في الحياة الاجتماعية والسياسية والاقتصادية، حيث تشارك في الزراعة والتجارة والأمور السياسية.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mt-3" style={{ direction: 'rtl' }}>
            يتميّز الزغاوة بلباسهم التقليدي الذي يجمع بين الأصالة والجمال، مثل الثوب والعمامة أو الكدمول التي تُعد رمزًا للهوية والوقار. كما تشتهر مناسباتهم الاجتماعية، خاصة الزواج والحصاد، بالرقصات والأغاني الشعبية التي تعبّر عن الشجاعة، الكرم، والحب والبطولة، وتُؤدى بإيقاعات الطبول والصفير الجماعي.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mt-3" style={{ direction: 'rtl' }}>
            ومن أبرز سمات المجتمع الزغاوي نظام "التكافل القبلي" المعروف، وهو شكل من أشكال التعاون الجماعي الذي يعزز روح التضامن. وتُزين أدواتهم المنزلية والأسلحة التقليدية بالنقوش والزخارف التي تحمل رموزًا تشير إلى القوة، الشجاعة، والانتماء القبلي.
          </p>
        </div>

{/* Dar Zaghawa Region - Card Style */}
<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
  <div className="grid md:grid-cols-2 gap-0">
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>إقليم دار زغاوة</h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        هو تصور ثقافي وسياسي يهدف إلى إحياء الهوية التاريخية والجغرافية لشعب الزغاوة في السودان وتشاد، وجعله إقليمًا إداريًا وتنمويًا يُعرف بـ "إقليم دار زغاوة (إقليم بيربي)".
        يستند هذا التصور إلى الإرث الحضاري العريق لوادي هور وممالك الزغاوة القديمة، وإلى رغبة الشعب في حماية اللغة والتراث من الاندثار.  تعتبر "حاكورة" تاريخية وموطناً رئيسياً لقبائل الزغاوة الأفريقية، وتتميز بخصائص جغرافية وسياسية وثقافي
      </p>
    </div>
    <div className="h-64 md:h-auto bg-gray-200">
      <img src="/images/gyk0k.png" alt="إقليم دار زغاوة" className="w-full h-full object-cover" />
    </div>
  </div>
</div>


{/* Kingdom Section */}
<div className="mb-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    مملكة الزغاوة التاريخية
  </h2>
  <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
    ظهرت مملكة الزغاوة ما بين القرن السابع والعاشر الميلادي، وكانت تُعرف بـ مملكة كانم. وتميزت بازدهارها الاقتصادي حيث كانت غنية بالذهب والملح والماشية، واشتهرت بالتجارة مع شمال إفريقيا عبر القوافل العابرة للصحراء الكبرى. كان ملوكها يُلقبون بـ "كوي" أو "دِرِّي"، وقد عُرفوا بالحكمة والشجاعة والقدرة على التنظيم السياسي.
  </p>
</div>
 

{/* وادي هور */}
<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
  <div className="grid md:grid-cols-2 gap-0">
    <div className="h-64 md:h-auto bg-gray-200">
      <img src="/images/wa.jpg" alt="وادي هور" className="w-full h-full object-cover" />
    </div>
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>وادي هور  </h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
      يُعد وادي هور واحداً من أكبر الأودية الجافة في الصحراء الكبرى. وكان في العصور القديمة نهراً حيوياً يربط بين تشاد ونهر النيل في السودان. يمتد الوادي على مسافة تزيد عن ١٢٠٠ كلم، وينحدر من مرتفعات إنيدي شرق تشاد مروراً بدار زغاوة حتى المصب بنهر النيل عند منطقة الدبة. كان الوادي يُعرف قديماً بـ "النهر الأصفر" لكونه الرافد الرئيسي لنهر النيل من الصحراء الشرقية، وشرياناً مائياً غنياً وفر بيئة خصبة للاستقرار البشري والحياة البرية قبل أن يجف تماماً.
      </p>

    </div>
  </div>
</div>

{/* Wadi Hur Civilization Section - Text Only */}
<div className="mb-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    حضارة وادي هور
  </h2>

  <div className="space-y-6">
    {/* الفقرة الرئيسية */}
    <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      حضارة وادي هور ازدهرت على ضفاف وادي هور العريقة منذ الألفية الرابعة قبل الميلاد، تاركة إرثاً أثرياً ضخماً من المستوطنات و الفخار والنقوش الصخرية التي تؤكد استيطان مجموعات بشرية رعوية وزراعية متطورة.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      يُعتبر وادي هور أحد أقدم المراكز الحضارية في إفريقيا، وكان في العصور القديمة نهرًا عظيمًا يتدفق من شمال دارفور حتى النيل. حول هذا الوادي قامت حضارات قديمة جداً، ويرى بعض الباحثين أن حضارة وادي هور كانت الجسر الذي وصل بين حضارة النوبة والنيل وبين ممالك إفريقيا الداخلية مثل كانم.
    </p>

    {/* الأهمية التاريخية والأثرية */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الأهمية التاريخية والأثرية والاستيطان البشري
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
        تؤكد الاكتشافات الأثرية (مثل أبحاث متحف بوزنان للآثار وجامعة كولن بجمهورية ألمانيا) أن المنطقة كانت مأهولة بالسكان منذ العصر الحجري، حيث ازدهرت حضارة متأثرة بالممالك الكوشية.
      </p>
    </div>

    {/* الاقتصاد والمجتمع */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الاقتصاد والمجتمع
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        اعتمد سكان الوادي الأوائل على الرعي والزراعة واستئناس الحيوانات، وصناعة الفخار المتميز، وتركوا العديد من النقوش الصخرية التي توثق حياتهم اليومية وعلاقتهم بالبيئة النهرية.
      </p>
    </div>

    {/* الربط الحضاري */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الربط الحضاري
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        لعب الوادي دوراً مهماً كممر تجاري وحلقة وصل استراتيجية بين وسط إفريقيا ووادي النيل، مما ساهم في ازدهار الحضارات النوبية القديمة.
      </p>
    </div>

    {/* الوضع الحالي */}
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
        الوضع الحالي للوادي
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
        يمثل وادي هور اليوم واحداً من أكبر المنتزهات الوطنية في العالم، ورغم جفافه السطحي إلا أنه لا يزال يشكل مورداً حيوياً للرعاة الرحل والمواشي خلال مواسم الأمطار. يحتضن الوادي مواقع أثرية بالغة الأهمية مسجلة في الخريطة الأثرية السودانية، وقد تم إعلان وادي هور محمية طبيعية عالمية من منظمة اليونسكو التابعة للأمم المتحدة.
      </p>
    </div>

    {/* النقاط الرئيسية (محدثة) */}
    <ul className="space-y-2 text-gray-700 pr-5 list-disc" style={{ direction: 'rtl', listStylePosition: 'inside' }}>
      <li>الزراعة والرعي</li>
      <li>التجارة بين الصحراء الكبرى ووادي النيل</li>
      <li>بناء المدن والقرى والممالك المحلية</li>
      <li>النقوش الصخرية والفخار كشواهد حضارية</li>
      <li>دور استراتيجي كممر تجاري بين إفريقيا الوسطى ووادي النيل</li>
    </ul>
  </div>
</div>



     {/* Flag Section */}
<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
  <div className="grid md:grid-cols-2 gap-0">
    <div className="p-6 md:p-8 order-2 md:order-1">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>
        <Flag className="h-6 w-6 inline-block ml-2 text-yellow-400" />
        علم الزغاوة الثقافي
      </h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
         تستخدم كرمز للهوية التاريخية والوحدة المجتمعية لشعب الزغاوة. فكرة انشاء العلم وتصميمه وتنفيذه من قبل جبهة وادي هور الديمقراطية و يتكون العلم من:
      </p>
      <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
        <li className="text-right">اللون البني الداكن: الإقليم محمي بدماء شهدائه</li>
        <li className="text-right">أصفر خردلي: يرمز للصحراء</li>
        <li className="text-right">اللون الأخضر: يرمز لوادي هور والثراء الزراعي</li>
        <li className="text-right">النجمة: ترمز للحرية والمستقبل</li>
        <li className="text-right">الأربعة حروف: تعني كلمة باريا (لغة الزغاوى)</li>
      </ul>
    </div>
    <div className="h-64 md:h-auto bg-gray-100 order-1 md:order-2 flex items-center justify-center p-4">
      <img src="/images/Flag.jpeg" alt="علم الزغاوة الثقافي" className="max-h-full object-contain rounded-lg shadow-lg" />
    </div>
  </div>
</div>





{/* Map Section - Dar Zaghawa Region */}
<div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
  {/* Map Header */}
  <div className="bg-[#d78525] px-6 py-4">
    <p className="text-white text-right text-sm" style={{ direction: 'rtl' }}>خريطة توضح موقع إقليم دار زغاوة (إقليم بيربي) في السودان</p>
  </div>
  
  {/* Map Content */}
  <div className="p-6">
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Map Image - Sharp corners (no rounded) */}
      <div className="overflow-hidden bg-gray-100 flex items-center justify-center min-h-[400px]">
        <img 
          src="/images/map.jpg" 
          alt="خريطة إقليم دار زغاوة" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Map Information */}
      <div className="space-y-6" style={{ direction: 'rtl' }}>
        {/* Geographical Information */}
        <div className="bg-gray-50 p-5 rounded-lg">
          <h4 className="text-lg font-bold text-[#d78525] mb-3 text-right border-b border-gray-200 pb-2">المعلومات الجغرافية</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">الموقع:</span>
              <span className="text-gray-600">شمال وغرب دارفور، السودان</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">الإحداثيات:</span>
              <span className="text-gray-600 ltr inline-block">13.5°N, 25.5°E</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">المساحة التقريبية:</span>
              <span className="text-gray-600 ltr inline-block">~50,000 كم²</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">الحدود:</span>
              <span className="text-gray-600">تشاد، ليبيا، مصر، السودان</span>
            </div>
          </div>
        </div>

        {/* Population Information */}
        <div className="bg-gray-50 p-5 rounded-lg">
          <h4 className="text-lg font-bold text-[#d78525] mb-3 text-right border-b border-gray-200 pb-2">المعلومات السكانية</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">الشعب الرئيسي:</span>
              <span className="text-gray-600">الزغاوة</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">اللغة:</span>
              <span className="text-gray-600">البريا (Beri)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">التبعية:</span>
              <span className="text-gray-600">السودان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Map Disclaimer - Moved outside the grid, full width */}
  <div className="px-6 pb-6">
    <div className="text-center">
      <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200" style={{ direction: 'rtl' }}>
        <strong>ملاحظة:</strong> هذه خريطة توضيحية تعتمد على المصادر المتاحة ولا تمثل الحدود الرسمية المعترف بها دولياً.
      </p>
    </div>
  </div>
</div>
      
        
        {/* ========== NEW WADI HUR CULTURE SECTIONS END HERE ========== */}
        
      </div>
    </main>


{/* EXISTING GITHUB HERO SECTION - As a Card */}
<section className="relative bg-white py-12">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 text-center">
      
      <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed" style={{ direction: 'rtl' }}>
        {siteContent?.homepage?.hero?.description || "يمكنك التطوع معنا أو دعم رسالتنا للمساهمة في تحقيق أهداف جبهة وادي هور الديمقراطية"}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild
          size="lg" 
          className="bg-[#d78525] hover:bg-[#b8681a] text-white px-6 py-2 text-base"
        >
          <Link to="/donate">
            {siteContent?.homepage?.hero?.primaryButton || "دعم رسالتنا"}
          </Link>
        </Button>
        <Button 
          asChild
          variant="outline" 
          size="lg" 
          className="border-[#d78525] text-[#d78525] bg-white hover:bg-[#d78525] hover:text-white px-6 py-2 text-base"
        >
          <Link to="/contact">
            {siteContent?.homepage?.hero?.secondaryButton || "تطوع معنا"}
          </Link>
        </Button>
      </div>
    </div>
  </div>
</section>
  </>



      {/* Impact Highlights Section */}
      <div className="bg-white">
        <ImpactHighlightsSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#f6ecd9]">
        <TestimonialsSection />
      </div>

      {/* Divider Line - Added between sections */}
    <div className="border-t border-gray-300 my-8"></div>
{/* Contact Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12">
      
      {/* Contact Form */}
<div>
  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right" style={{ direction: 'rtl' }}>تواصل معنا</h2>
  <form onSubmit={handleContactSubmit} className="space-y-6">
    <div>
      <Input
        placeholder="الاسم"
        value={contactForm.name}
        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
        required
        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#d78525] focus:ring-[#d78525] text-right"
        style={{ direction: 'rtl' }}
      />
    </div>
    <div>
      <Input
        type="email"
        placeholder="البريد الإلكتروني"
        value={contactForm.email}
        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
        required
        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#d78525] focus:ring-[#d78525] text-right"
        style={{ direction: 'rtl' }}
      />
    </div>
    <div>
      <Input
        placeholder="الموضوع"
        value={contactForm.subject}
        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
        required
        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#d78525] focus:ring-[#d78525] text-right"
        style={{ direction: 'rtl' }}
      />
    </div>
    <div>
      <Textarea
        placeholder="رسالتك"
        value={contactForm.message}
        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
        required
        rows={4}
        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#d78525] focus:ring-[#d78525] text-right"
        style={{ direction: 'rtl' }}
      />
    </div>
    <Button
      type="submit"
      disabled={loading}
      className="w-full bg-[#d78525] hover:bg-[#b8681a] text-white"
    >
      {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
    </Button>
  </form>
</div>
      {/* Right Column - Contact Information and Newsletter */}
<div>
  {/* Contact Information Card */}
  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right" style={{ direction: 'rtl' }}>معلومات الاتصال</h2>
  <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-8">
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="text-right">
          <p className="font-semibold text-gray-900" style={{ direction: 'rtl' }}>البريد الإلكتروني</p>
          <p className="text-gray-600" style={{ direction: 'rtl' }}>{siteContent?.contact?.contactInfo?.email || "info@example.com"}</p>
        </div>
        <Mail className="h-6 w-6 text-[#d78525] ml-4 mt-1" />
      </div>
      <div className="flex items-center justify-end">
        <div className="text-right">
          <p className="font-semibold text-gray-900" style={{ direction: 'rtl' }}>الهاتف</p>
          <p className="text-gray-600" style={{ direction: 'rtl' }}>{siteContent?.contact?.contactInfo?.phone || "+249 XXX XXX XXX"}</p>
        </div>
        <Phone className="h-6 w-6 text-[#d78525] ml-4 mt-1" />
      </div>
      <div className="flex items-center justify-end">
        <div className="text-right">
          <p className="font-semibold text-gray-900" style={{ direction: 'rtl' }}>العنوان</p>
          <p className="text-gray-600" style={{ direction: 'rtl' }}>{siteContent?.contact?.contactInfo?.address || "السودان"}</p>
        </div>
        <MapPin className="h-6 w-6 text-[#d78525] ml-4 mt-1" />
      </div>
      <div className="flex items-center justify-end">
        <div className="text-right">
          <p className="font-semibold text-gray-900" style={{ direction: 'rtl' }}>ساعات العمل</p>
          <p className="text-gray-600" style={{ direction: 'rtl' }}>{siteContent?.contact?.contactInfo?.office_hours || "السبت - الخميس: 9ص - 5م"}</p>
        </div>
        <Clock className="h-6 w-6 text-[#d78525] ml-4 mt-1" />
      </div>
    </div>
  </div>


        {/* Newsletter Signup - Separate Card (no divider line) */}
<div className="mt-8">
  <h3 className="text-xl font-bold text-gray-900 mb-4 text-right" style={{ direction: 'rtl' }}>اشترك في النشرة البريدية</h3>
  <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-8">
    <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
      <Input
        type="email"
        placeholder="بريدك الإلكتروني"
        value={newsletterEmail}
        onChange={(e) => setNewsletterEmail(e.target.value)}
        required
        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 flex-1 text-right"
        style={{ direction: 'rtl' }}
      />
      <Button
        type="submit"
        className="bg-[#d78525] hover:bg-[#b8681a] text-white whitespace-nowrap"
      >
        اشتراك
      </Button>
    </form>
  </div>
</div>
      </div>
      
    </div>
  </div>
</section>

<Footer />
    </div>
  );
};

export default Homepage;