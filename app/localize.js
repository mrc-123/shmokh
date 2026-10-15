import { Children, cloneElement, isValidElement } from 'react';

// Translate content and accessible labels without changing behavior or artwork.
const arabic = {
  'Skip to content': 'انتقل إلى المحتوى',
  'YEMM introduction': 'مرحبًا بك في يَمّ', 'YEMM home': 'يَمّ — الرئيسية',
  'YEMM — Technology by Heritage': 'يَمّ — تقنية تنبع من الجذور',
  'Open navigation': 'افتح القائمة', 'Close navigation': 'أغلق القائمة', 'Main navigation': 'التنقل الرئيسي',
  'Menu +': 'القائمة +', 'Close −': 'إغلاق −',
  home: 'الرئيسية', services: 'الخدمات', about: 'عن يَمّ', work: 'أعمالنا', contact: 'تواصل معنا',
  'Start project': 'ابدأ مشروعك', 'Start a project': 'ابدأ مشروعك',
  'TECHNOLOGY BY HERITAGE': 'تقنية تنبع من الجذور',
  'DIGITAL SOLUTIONS': 'حلول رقمية', 'FOR A BRIGHTER TOMORROW': 'لغدٍ أكثر إشراقًا',
  'ROOTED IN HERITAGE.': 'جذور راسخة.', 'DRIVEN BY INNOVATION.': 'وطموح يقوده الابتكار.',
  'DESIGN WITH PURPOSE.': 'تصميم يحمل معنى.', 'BUILD FOR THE FUTURE.': 'وتقنية تصنع المستقبل.',
  'Our services': 'اكتشف خدماتنا', 'Hero messages': 'رسائل يَمّ', 'Previous message': 'الرسالة السابقة', 'Next message': 'الرسالة التالية',
  '01 / What we do': '01 / ما نقدّمه', 'From the first idea to the final detail.': 'من الفكرة الأولى إلى أدقّ التفاصيل.',
  'Good ideas deserve': 'الأفكار الطموحة تستحق', 'exceptional execution.': 'تنفيذًا استثنائيًا.',
  'We bring design, technology and creative thinking together to build digital experiences with clarity and character.': 'نجمع التصميم والتقنية والتفكير الإبداعي لنصنع تجارب رقمية واضحة، تحمل شخصيتها الخاصة.',
  'Digital experiences': 'تجارب رقمية', 'Thoughtful interfaces. Seamless journeys.': 'واجهات مدروسة. تجارب سلسة.',
  'Websites and digital products that connect purposeful design with precise development.': 'مواقع ومنتجات رقمية تجمع بين تصميم هادف وتطوير متقن.',
  'Web development': 'تطوير المواقع', 'UI / UX design': 'تصميم تجربة المستخدم', 'Digital products': 'منتجات رقمية',
  'Brand & identity': 'العلامة والهوية', 'A clear identity. A lasting impression.': 'هوية واضحة. أثر يدوم.',
  'Distinctive visual systems that translate your story into a consistent, memorable presence.': 'أنظمة بصرية متميزة تحوّل قصتك إلى حضور متناسق يبقى في الذاكرة.',
  'Brand strategy': 'استراتيجية العلامة', 'Visual identity': 'هوية بصرية', 'Design systems': 'أنظمة تصميم',
  'Creative technology': 'تقنية إبداعية', 'New possibilities. Meaningful outcomes.': 'إمكانات جديدة. نتائج ذات معنى.',
  'Interactive experiences and practical automation that turn ambitious ideas into useful tools.': 'تجارب تفاعلية وحلول أتمتة عملية تحوّل الأفكار الطموحة إلى أدوات مفيدة.',
  'Interactive experiences': 'تجارب تفاعلية', Prototyping: 'نماذج أولية', Automation: 'أتمتة',
  'Let’s build something': 'لنصنع شيئًا معًا',
  'INTERFACE STUDY': 'دراسة واجهة', 'IDENTITY SYSTEM': 'نظام هوية', 'INTERACTION STUDY': 'دراسة تفاعلية',
  'Y / DIGITAL': 'يَمّ / رقمي', 'Less friction.': 'بساطة أكثر.', 'More possibility.': 'إمكانات أوسع.', 'Explore →': 'اكتشف ←',
  'YEMM / ORIGIN — FUTURE': 'يَمّ / الجذور — المستقبل', 'A meaningful origin.': 'جذور تحمل معنى.', 'An open horizon.': 'وآفاق بلا حدود.',
  '02 / Our story': '02 / قصتنا', 'Rooted in heritage.': 'متجذّرون في الإرث.', 'Driven by innovation.': 'نمضي بروح الابتكار.',
  'YEMM is born at the meeting point of personal roots and future possibilities. Its name carries connections to Yemen and Mohammed — a meaningful part of the founder’s family story.': 'وُلدت يَمّ عند التقاء الجذور الشخصية بإمكانات المستقبل. يجمع اسمها بين اليمن ومحمد، اسم يحمل مكانة خاصة في قصة عائلة المؤسّس.',
  'That origin shapes our perspective: thoughtful, curious and forward-looking. We bring our roots into the future through technology, creativity and design.': 'تمنحنا هذه الجذور رؤية متأمّلة وفضولًا دائمًا وتطلّعًا إلى الغد. نحمل إرثنا إلى المستقبل عبر التقنية والإبداع والتصميم.',
  'Meet your next creative partner': 'لنتحدّث عن فكرتك القادمة',
  '03 / Our philosophy': '03 / فلسفتنا', 'The future is open.': 'المستقبل فضاء مفتوح.', 'Our roots give it meaning.': 'وجذورنا تمنحه المعنى.',
  'Meaning before form.': 'المعنى قبل الشكل.',
  'Every choice starts with a reason. We look for the story, the people and the purpose behind an idea.': 'لكل اختيار غاية. نبحث عن القصة والإنسان والهدف وراء كل فكرة قبل أن نمنحها شكلًا.',
  'Craft in every detail.': 'إتقان في كل تفصيلة.',
  'A clear structure, a thoughtful interaction, a precise finish. Small decisions shape the whole experience.': 'بنية واضحة، وتفاعل مدروس، ولمسة متقنة. التفاصيل الصغيرة تصنع التجربة بأكملها.',
  'Curiosity moves us forward.': 'الفضول يدفعنا للأمام.',
  'We explore technology with an open mind, turning new possibilities into experiences that feel human.': 'نستكشف التقنية بعقل منفتح، ونحوّل إمكاناتها الجديدة إلى تجارب قريبة من الإنسان.',
  '04 / In focus': '04 / تحت المجهر', 'YEMM identity · Studio concept': 'هوية يَمّ · تصوّر إبداعي',
  'One origin.': 'جذور واحدة.', 'A whole new expression.': 'وتعبير يتجدّد.',
  'A closer look at how YEMM’s identity moves from a meaningful name into a digital world.': 'نظرة أقرب إلى رحلة هوية يَمّ، من اسم يحمل معنى إلى عالم رقمي متكامل.',
  'YEMM — BRAND & DIGITAL EXPLORATION': 'يَمّ — استكشاف الهوية والتجربة الرقمية', 'ROOTED / FORWARD': 'من الجذور / إلى الأمام',
  'YEMM Arabic identity': 'شعار يَمّ العربي', 'YEMM English identity': 'شعار يَمّ الإنجليزي',
  'YEMM / DIGITAL CONCEPT': 'يَمّ / تصوّر رقمي', 'DESIGN & TECHNOLOGY': 'تصميم وتقنية',
  'Built on roots.': 'من الجذور نبدأ.', 'Made for tomorrow.': 'وللغد نصنع.', 'EXPLORE THE POSSIBILITIES ↗': 'اكتشف الإمكانات ↖',
  'Brand colors': 'ألوان الهوية', 'TEAL / #168783': 'تركواز / #168783',
  'ORIGIN → POSSIBILITY': 'الجذور ← الإمكانات', 'GEOMETRY → IDENTITY': 'الهندسة ← الهوية', 'IDENTITY → EXPERIENCE': 'الهوية ← التجربة',
  'Explore the concept': 'استكشف التصوّر', 'The thinking behind the concept': 'الفكرة وراء التصوّر',
  'The idea': 'الفكرة', 'The visual language': 'اللغة البصرية', 'The digital experience': 'التجربة الرقمية',
  'Bring heritage and future technology into one visual language. The ambition is a digital identity that feels personal in origin and global in expression.': 'نجمع الإرث وتقنية المستقبل في لغة بصرية واحدة. نطمح إلى هوية رقمية شخصية في جذورها، وعالمية في تعبيرها.',
  'Angular marks, open space and a restrained teal palette create a coherent system. Arabic and English share the same presence without losing their individual character.': 'شعارات هندسية ومساحات رحبة وألوان تركوازية هادئة تصنع نظامًا متناسقًا. يتشارك العربي والإنجليزي الحضور، ويحتفظ كل منهما بشخصيته.',
  'The identity becomes an interface: clear navigation, deliberate typography and gentle depth. Interaction adds character while keeping the content easy to explore.': 'تتحوّل الهوية إلى واجهة: تنقّل واضح، وخطوط مختارة بعناية، وعمق بصري هادئ. يضيف التفاعل شخصية إلى التجربة ويُبقي المحتوى سهل الاستكشاف.',
  'YEMM / A studio concept in identity and digital craft.': 'يَمّ / تصوّر إبداعي للهوية والتجربة الرقمية.',
  '05 / Creative explorations': '05 / استكشافات إبداعية', 'Studio concepts · not client projects': 'تصوّرات إبداعية للاستوديو',
  'A glimpse of': 'لمحة عمّا', 'what’s possible.': 'يمكن أن نصنعه.',
  'Explorations in identity, interaction and digital craft. A space for the ideas shaping our direction.': 'استكشافات في الهوية والتفاعل والإتقان الرقمي. مساحة للأفكار التي ترسم اتجاهنا.',
  'YEMM brand identity concept': 'تصوّر هوية يَمّ', 'The YEMM identity': 'هوية يَمّ', 'Brand exploration / Identity': 'استكشاف العلامة / الهوية',
  'Y / LAB': 'يَمّ / مختبر', 'EXPERIMENT 001': 'تجربة 001', 'Ideas into': 'أفكار تصنع', 'new realities.': 'واقعًا جديدًا.', 'DESIGN × TECHNOLOGY': 'تصميم × تقنية',
  'Future interfaces': 'واجهات المستقبل', 'Digital exploration / Interaction': 'استكشاف رقمي / تفاعل',
  '06 / YEMM Lab': '06 / مختبر يَمّ', 'A space for curiosity': 'مساحة للفضول', 'Don’t just imagine.': 'امنح خيالك مساحة.', 'Experiment.': 'وجرّب بنفسك.',
  'Explore the geometry behind our visual world. Change the form, shift the palette and make the idea your own.': 'استكشف الأشكال التي تبني عالمنا البصري. غيّر التكوين، واختر الألوان، وامنح الفكرة لمستك الخاصة.',
  'EXPERIMENT / 001': 'تجربة / 001', 'GEOMETRIC COMPOSITION': 'تكوين هندسي', 'IDENTITY COMPOSITION': 'تكوين الهوية',
  'FORM × LIGHT × POSSIBILITY': 'شكل × ضوء × إمكانات', 'Your creative playground': 'مساحتك للتجربة', 'A small shift.': 'تغيير بسيط.', 'A new perspective.': 'ورؤية جديدة.',
  'Composition mode': 'نوع التكوين', Form: 'الشكل', Identity: 'الهوية', 'Space between shapes': 'المسافة بين الأشكال', Perspective: 'زاوية التكوين',
  'Color direction': 'الطابع اللوني', 'Heritage teal': 'تركواز الجذور', 'Soft jade': 'يشم هادئ', 'Warm stone': 'حجر دافئ', 'Reset experiment': 'إعادة ضبط التجربة',
  'An interactive studio study. Built to explore, made to play.': 'تجربة من الاستوديو، صُمّمت للاستكشاف والإبداع.',
  '07 / How we think': '07 / منهجنا', 'Purpose first.': 'الغاية أولًا.', 'Possibilities next.': 'ثم نفتح الإمكانات.',
  Discover: 'نكتشف', Define: 'نحدّد', Create: 'نصنع', Evolve: 'نطوّر',
  'Understand the people, the ambition and the real problem to solve.': 'نفهم الإنسان والطموح والتحدّي الحقيقي الذي نريد حلّه.',
  'Give the idea a clear direction, structure and visual language.': 'نمنح الفكرة اتجاهًا واضحًا وبنية ولغة بصرية.',
  'Design, build and refine every detail into a coherent experience.': 'نصمّم ونبني ونصقل التفاصيل لتصبح تجربة متكاملة.',
  'Test, learn and prepare the experience for its next chapter.': 'نختبر ونتعلّم ونهيّئ التجربة لخطوتها القادمة.',
  '08 / Start a conversation': '08 / لنتحدّث', 'What will we': 'ماذا سنصنع', 'create together?': 'معًا؟',
  'Tell us about the idea you have in mind.': 'أخبرنا عن الفكرة التي تشغل بالك.', 'Great things start with a little curiosity.': 'الأشياء الكبيرة تبدأ بقليل من الفضول.',
  'Your name': 'اسمك', 'Full name': 'الاسم الكامل', 'Your email': 'بريدك الإلكتروني', 'What do you have in mind?': 'ما الذي تفكّر فيه؟',
  'Select a service': 'اختر الخدمة', 'Something else': 'فكرة أخرى', 'A little about your project': 'نبذة عن مشروعك',
  'The idea, the ambition, the possibilities…': 'الفكرة، والطموح، والإمكانات…',
  'Save your enquiry as a project brief. Direct enquiry delivery will be available once YEMM’s contact channel is confirmed.': 'احفظ فكرتك في ملف جاهز للمشاركة. سيتاح إرسال الطلب مباشرة عند اعتماد قناة التواصل الخاصة بيَمّ.',
  'Save project brief': 'احفظ ملخّص المشروع',
  'Your project brief has been downloaded. Keep it ready to share with YEMM.': 'تم تنزيل ملخّص مشروعك. احتفظ به لتشاركه مع يَمّ.',
  'An idea worth pursuing.': 'فكرة تستحق أن ترى النور.', 'Let’s make something': 'لنصنع شيئًا', 'worth seeing.': 'يستحق أن يُرى.',
  'ONE ORIGIN. OPEN POSSIBILITIES.': 'جذور واحدة. إمكانات مفتوحة.', 'Back to YEMM home': 'العودة إلى رئيسية يَمّ', 'Back to top ↑': 'إلى الأعلى ↑',
  'Close concept': 'أغلق التصوّر', 'Close ×': 'إغلاق ×', 'Studio concept / 0': 'تصوّر إبداعي / 0',
  'An exploration of a visual language rooted in geometry, purposeful cuts and the meeting of heritage with technology. The supplied English and Arabic marks form the foundation of this direction.': 'استكشاف للغة بصرية تستند إلى الهندسة والخطوط المدروسة والتقاء الإرث بالتقنية. يشكّل الشعاران العربي والإنجليزي أساس هذا الاتجاه.',
  'An interface study exploring spacious layouts, tactile depth and the balance between creative expression and usable digital experiences.': 'دراسة واجهة تستكشف المساحات الرحبة والعمق البصري والتوازن بين التعبير الإبداعي وسهولة الاستخدام.',
  'This is an illustrative studio exploration, not a completed client engagement.': 'هذا تصوّر إبداعي من الاستوديو، وليس مشروعًا منفّذًا لعميل.',
  'Time spent viewing this website': 'الوقت الذي قضيته في الموقع',
  'Your time on YEMM · pauses when this tab is hidden': 'وقتك مع يَمّ · يتوقف عند مغادرة التبويب', 'YOUR TIME / YEMM': 'وقتك / يَمّ',
};

export function translate(text, locale) {
  if (locale !== 'ar' || typeof text !== 'string') return text;
  const trimmed = text.trim();
  return Object.hasOwn(arabic, trimmed) ? text.replace(trimmed, arabic[trimmed]) : text;
}

export function localize(node, locale) {
  if (locale !== 'ar') return node;
  if (typeof node === 'string') return translate(node, locale);
  if (Array.isArray(node)) return Children.map(node, child => localize(child, locale));
  if (!isValidElement(node)) return node;
  const props = {};
  for (const attribute of ['alt', 'title', 'placeholder', 'aria-label']) {
    if (typeof node.props[attribute] === 'string') props[attribute] = translate(node.props[attribute], locale);
  }
  if (node.props.children !== undefined) props.children = localize(node.props.children, locale);
  return cloneElement(node, props);
}
