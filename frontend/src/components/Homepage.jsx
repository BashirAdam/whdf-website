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
        بنا كقومية لنا لغتنا وهويتنا الشمال إفريقية.
      </p>
    </div>
    {/* Our Story - NOW INSIDE the max-w-5xl container */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
          {siteContent.about?.story?.title || "قصتنا"}
        </h2>
        <div className="text-lg text-gray-800 leading-relaxed mb-6 text-justify" style={{ direction: 'rtl' }}>
          {siteContent.about?.story?.content || `تأسست جبهة وادي هور الديمقراطية في 12 أبريل 2021م بهدف واضح: "إقامة إقليم دار زغاوة (إقليم بيربي) كمركزية ثقافية وسياسية لشعب الزغاوة في السودان، مستندة على الإرث الحضاري لممالك الزغاوة قبل الميلاد ومملكة كانم بعد الميلاد، والعمل على تمكين المجتمع للحفاظ على هويته الشمال إفريقية وحقوقه الثقافية والسياسية."`}
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
    



      {/* الرؤية السياسية */}
<div className="bg-gray-50 rounded-xl p-6 mb-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    الرؤية السياسية
  </h2>
  <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
    اننا نسعي لقيام اقليم بيربي في اطار اتحاد الاقاليم السودانية الفدرالية، اقليم مستقل سياسياً وهوياتياً وله خصوصية لغتنا وهويتنا الشمال إفريقية. ونرفض تماماً سلب هويتنا الشمال افريقية ووضعنا في هوية دولة عربية تتبع للجزيرة العربية. هذه الرؤية تعكس صرخة شعب مدرك لواقعه... وعانى ولا يزال يعاني ويلات العنصرية من دولة الأحادية العرقية العربية والثقافية.
  </p>
  <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
    مورس ضده كل صنوف الاقصاء وحرمان حقوق المواطنة، فانسان البيربي ظل منذ خروج الانجليز يعيش واقعاً استعمارياً بغيضاً آخر يقطع مئات الكيلومترات متجهاً الي الفاشر فقط لاستخراج بطاقة جنسية، ونساءنا الحُمل والمرضي يموتون في الطريق متجهين الي الفاشر والخرطوم لأبسط اسباب مرضية كالنزيف وغيرها بحثاً عن مستشفي تخصصي.
  </p>
  <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
    وفوق هذا تعرضنا لأسوأ الجرائم في التاريخ البشري شهد له العالم من تطهير اثني وإبادة جماعية واغتصابات للنساء وتعذيب المثقفين في المعتقلات ومطاردة التجار في محاوله للقضاء علينا بشكل نهائي. لذلك نحن الآن لن نعترف بالدستور السوداني ولا أي من الوثائق الدستورية التي تصدر من السلطات الإنتقالية للسودان والقوي الحزبية الخرطومية ولا بالمؤتمرات الدستورية، ونعتبر كلها مجرد أساليب واجراءات لاستمرار السيطرة وبنية الدولة الاستعمارية.
  </p>
</div>

{/* الرؤية الثقافية */}
<div className="bg-gray-50 rounded-xl p-6 mb-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    الرؤية الثقافية
  </h2>
  <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
    قبل تحرير الأرض، أول خطوة هي التحرر والاستقلال من الإستعمار الثقافي العربي. وهذا يتطلب المعرفة الجيدة بأحدي أهم أدوات الدولة السودانية المستعربة في تسويق التعريب وهي الأحزاب الأيديولوجية التي تتخفي أحياناً باسم الاسلام وأخرى باليسارية. هؤلاء هم الأخوان المسلمون والسلفيون (بمسمياتهم المختلفة: وطنيين، شعبيين، طائفيين، وسطيين...) ونظراؤهم من اليسار العربي (الشيوعيين، البعثيين، الناصريين...).
  </p>
  <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
    هذا الاستعمار أخطر حتي من الاستعمار الغربي لأنه استعمار ذهني هوياتي وفكري ولغوي وأيديولوجي، حيث عن طريقه يتحول انسان وادي هور من انسان شمال إفريقي جنسياً الي انسان عربي آسيوي، وتتغير هويته ولغته وتفكيره وطموحه ليصبح انساناً مهزوماً داخلياً جراء هذا الاستعمار العروبي، فيكون لديه قابلية كبيرة للتبعية، بل أحياناً يكون مهووساً بهوية استعمارية تعمل ضد وجوده الهوياتي والمادي.
  </p>
  <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
    إنّ مجهوداتنا الأساسية ينبغي أن تركز علي وحدة شعب البري لأجل تحرير انسان وتراب البيربي من دنس الدولة السودانية الاستعمارية، وإعادة هويتنا الشمال إفريقية استناداً علي الموروث الحضاري العريق لمملكة كانم، وتنظيم تراثنا ولغتنا، وتطوير ثراءنا الفني وهو الأجمل في كل بلاد السودان.
  </p>
  <p className="text-gray-700 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
    إنَّ صورة الدولة السودانية في نظر البري ملطَّخة بالضغينة والسلبية. فهي من أجل طمس موروثهم الحضاري وإلغاء لغتهم ومحاربة فنونهم وثقافتهم، تمهيداً لمشروع الاستيطان التوسعي لجامعة الدول العربية في افريقيا. تم شطب تاريخ الزغاوة وممالكهم التاريخية (كانم) من المناهج التعليمية، ومنعت تراثهم وفنونهم من المشاركة في المؤسسات الإعلامية. بل لم تكتفِ بذلك، فقسمت الأدوار لوضع حد نهائي لهم. فتولت مؤسسات الخدمة الوطنية مسألة الاقصاء من الوظائف ونشر الكراهية عن البري في اوساط الشعوب السودانية، فأصبح المزاج العام للدولة يبغض الزغاوة لدرجة أن أبناء البري يتعرضون باستمرار للتنمر في المؤسسات العامة، ويتم عرقلة استخراج شهادات الجنسية، وكثيراً ما يطلق عليهم "التشاديين". أما المؤسسات السياسية والأمنية فرسمت الخطط الحربية، فانتهت بحملة وحشية ضدهم بدأت في ثمانينات القرن الماضي وتوجت بعملية تطهير عرقي وإبادة واسعة في ألفينيات القرن الحالي. هذه الحملة الوحشية الواسعة خلفت الآلاف من الضحايا ومئات حالات اغتصاب النساء، وأكثر من مئة وخمسين ألف لاجئ ونازح في جمهورية تشاد وداخل السودان. تلك هي حصيلة مشروع الاستعمار العروبي التوسعي في السودان والذي لا يزال مستمراً.
  </p>
</div>


{/* Who are the Zaghawa People - Full Section */}
<div className="mb-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4 text-right border-r-4 border-[#d78525] pr-4" style={{ direction: 'rtl' }}>
    من هم شعب الزغاوة
  </h2>
  <p className="text-gray-800 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
    الزغاوة هم أحد الشعوب الإفريقية العريقة التي تعيش في منطقة الساحل الإفريقي، ويُعتبرون من أقدم المجموعات الإثنية في إقليم دارفور بغرب السودان وشمال تشاد. عُرفوا تاريخيًا بأنهم شعب محارب، تاجر، ومبدع في الزراعة والرعي، ولهم نظام اجتماعي وسياسي متماسك.
  </p>
</div>

{/* Details in two columns */}
<div className="grid md:grid-cols-2 gap-6 mb-8">
  <div className="bg-gray-50 rounded-xl p-5">
    <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
      <Compass className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
      أين يقطن الزغاوة
    </h3>
    <ul className="space-y-2 text-gray-800" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
      <li className="text-right">شمال وغرب دارفور (كُتُم، كُرنوي، أم برو، الطينة، كُبكابية، مليط)</li>
      <li className="text-right">شمال ووسط تشاد (انجمينا، ابيشي، وادي فِرا، أُمّ جرس)</li>
      <li className="text-right">جاليات في ليبيا والنيجر والمدن السودانية الكبرى</li>
    </ul>
  </div>
  <div className="bg-gray-50 rounded-xl p-5">
    <h3 className="font-bold text-gray-800 mb-3 text-right" style={{ direction: 'rtl' }}>
      <Languages className="h-5 w-5 inline-block ml-2 text-[#d78525]" />
      لغة الزغاوة
    </h3>
    <p className="text-gray-800 leading-relaxed text-justify" style={{ direction: 'rtl' }}>
      يتحدث الزغاوة لغة تُعرف باسم "لغة برّيا" (Beri)، وهي لغة من فصيلة اللغات النيلية الصحراوية، ولها عدة لهجات محلية. كما يتحدث كثير من الزغاوة العربية كلغة ثانية، خاصة في السودان والفرنسية في تشاد.
    </p>
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
      <img src="/images/gyk0k.jpg" alt="إقليم دار زغاوة" className="w-full h-full object-cover" />
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
 

{/* Wadi Hur Civilization Section - Image Left, Text Right */}
<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
  <div className="grid md:grid-cols-2 gap-0">
    <div className="h-64 md:h-auto bg-gray-200">
      <img src="/images/kamel.jpg" alt="وادي هور" className="w-full h-full object-cover" />
    </div>
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>حضارة وادي هور</h3>
      <p className="text-gray-700 leading-relaxed text-justify mb-4" style={{ direction: 'rtl' }}>
        يُعتبر وادي هور أحد أقدم المراكز الحضارية في إفريقيا، وكان في العصور القديمة نهرًا عظيمًا يتدفق من شمال دارفور حتى النيل.
        حول هذا الوادي قامت حضارات قديمة جدا رى بعض الباحثين أن حضارة وادي هور كانت الجسر الذي وصل بين حضارة النوبة والنيل وبين ممالك إفريقيا الداخلية مثل كانم.
      </p>
      <ul className="space-y-2 text-gray-700 pr-5" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
        <li className="text-right">الزراعة والرعي</li>
        <li className="text-right">التجارة بين الصحراء الكبرى ووادي النيل</li>
        <li className="text-right">بناء المدن والقرى والممالك المحلية</li>
      </ul>
    </div>
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
        العلم الثقافي للزغاوة يُستخدم كرمز للهوية التاريخية والوحدة المجتمعية لشعب الزغاوة. يتكون العلم من:
      </p>
      <ul className="space-y-2 text-gray-700" style={{ direction: 'rtl', listStyleType: 'disc', listStylePosition: 'inside' }}>
        <li className="text-right">اللون البني الداكن: الإقليم محمي بدماء شهدائه</li>
        <li className="text-right">أصفر خردلي: يرمز للصحراء</li>
        <li className="text-right">اللون الأخضر: يرمز لوادي حور والثراء الزراعي</li>
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