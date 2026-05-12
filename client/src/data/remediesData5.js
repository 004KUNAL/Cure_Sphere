// Home Remedies Data - Part 5 (Bone, Thyroid, Pregnancy, Memory, Addiction, Sports)
const remediesPart5 = [
  {
    category: "Bone & Joint Health",
    icon: "🦴",
    conditions: [
      {
        name: "Osteoporosis / Weak Bones",
        keywords: ["weak bones","osteoporosis","bone density","brittle bones","calcium deficiency","bone loss"],
        severity: "serious",
        remedies: [
          { title: "Sesame Seeds", desc: "Richest plant source of calcium for bone strength.", ingredients: ["Sesame seeds"], steps: ["Eat 1-2 tbsp daily","Add to salads or eat roasted","Soak overnight for better absorption"], duration: "Ongoing" },
          { title: "Moringa Leaves", desc: "Moringa has 17x more calcium than milk.", ingredients: ["Moringa powder or leaves"], steps: ["Add 1 tsp moringa powder to smoothies","Or eat fresh leaves in salad daily"], duration: "4-8 weeks" },
          { title: "Sunlight / Vitamin D", desc: "Vitamin D is essential for calcium absorption.", ingredients: [], steps: ["Get 15-20 min morning sunlight daily","Expose arms and legs","Between 7-10 AM is ideal"], duration: "Ongoing" },
          { title: "Weight-Bearing Exercise", desc: "Walking and resistance training build bone density.", ingredients: [], steps: ["Walk 30 min daily","Add light resistance training","Avoid high-impact if already weak"], duration: "Ongoing" }
        ]
      },
      {
        name: "Gout",
        keywords: ["gout","uric acid","swollen toe","gout attack","joint crystals","uric acid high"],
        severity: "moderate",
        remedies: [
          { title: "Cherry Juice", desc: "Anthocyanins lower uric acid and reduce inflammation.", ingredients: ["Tart cherry juice"], steps: ["Drink 1-2 glasses tart cherry juice daily","Or eat 10-12 fresh cherries"], duration: "2-4 weeks" },
          { title: "Apple Cider Vinegar", desc: "Alkalizes the body and helps flush uric acid.", ingredients: ["ACV","Water"], steps: ["Mix 1 tbsp ACV in water","Drink 2-3 times daily with meals"], duration: "2-4 weeks" },
          { title: "Hydration", desc: "Water flushes excess uric acid through kidneys.", ingredients: ["Water"], steps: ["Drink 3-4 liters water daily","Avoid alcohol and sugary drinks"], duration: "Ongoing" }
        ]
      },
      {
        name: "Sciatica",
        keywords: ["sciatica","sciatic nerve","leg pain","shooting pain","buttock pain","nerve pain leg"],
        severity: "moderate",
        remedies: [
          { title: "Turmeric Milk", desc: "Curcumin reduces nerve inflammation.", ingredients: ["Turmeric","Milk","Black pepper"], steps: ["Mix 1 tsp turmeric in warm milk","Add pinch of pepper","Drink twice daily"], duration: "2-4 weeks" },
          { title: "Hot/Cold Alternating Packs", desc: "Cold reduces inflammation, heat relaxes muscles.", ingredients: ["Ice pack","Heating pad"], steps: ["Apply ice for 20 min","Then heat for 20 min","Repeat 2-3 times daily"], duration: "Ongoing" },
          { title: "Pigeon Pose Stretch", desc: "Stretches the piriformis muscle pressing on sciatic nerve.", ingredients: [], steps: ["Get on all fours","Bring one knee forward between hands","Extend other leg back","Hold 30-60 seconds each side"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Thyroid Health",
    icon: "🦋",
    conditions: [
      {
        name: "Hypothyroidism (Underactive)",
        keywords: ["hypothyroidism","slow thyroid","underactive thyroid","thyroid low","weight gain thyroid","fatigue thyroid"],
        severity: "serious",
        remedies: [
          { title: "Selenium-Rich Foods", desc: "Selenium activates thyroid hormones.", ingredients: ["Brazil nuts","Sunflower seeds","Eggs"], steps: ["Eat 2-3 Brazil nuts daily","Add sunflower seeds to diet","Eat eggs 4-5 times weekly"], duration: "4-8 weeks" },
          { title: "Coconut Oil", desc: "Medium-chain fatty acids support thyroid metabolism.", ingredients: ["Virgin coconut oil"], steps: ["Add 1-2 tbsp to cooking daily","Or take 1 tbsp directly"], duration: "4-8 weeks" },
          { title: "Ashwagandha", desc: "Adaptogen that helps regulate thyroid hormones.", ingredients: ["Ashwagandha powder","Warm milk"], steps: ["Mix 1 tsp in warm milk","Drink before bed daily"], duration: "4-12 weeks" }
        ]
      },
      {
        name: "Hyperthyroidism (Overactive)",
        keywords: ["hyperthyroidism","overactive thyroid","thyroid high","racing heart thyroid","graves disease"],
        severity: "serious",
        remedies: [
          { title: "Bugleweed Tea", desc: "Traditional herb that reduces thyroid hormone levels.", ingredients: ["Bugleweed herb","Water"], steps: ["Steep 1 tsp in hot water 10 min","Drink 1-2 cups daily","Do not use during pregnancy"], duration: "4-8 weeks" },
          { title: "Lemon Balm Tea", desc: "Blocks TSH receptors and calms thyroid activity.", ingredients: ["Lemon balm leaves","Water"], steps: ["Steep 2 tsp in hot water 10 min","Drink 2-3 cups daily"], duration: "4-8 weeks" },
          { title: "Anti-inflammatory Diet", desc: "Reduces autoimmune triggers for Graves disease.", ingredients: ["Leafy greens","Berries","Turmeric","Omega-3 foods"], steps: ["Eliminate gluten and dairy for 4 weeks","Eat anti-inflammatory foods daily","Avoid iodine-rich foods temporarily"], duration: "4-12 weeks" }
        ]
      }
    ]
  },
  {
    category: "Pregnancy & Postpartum",
    icon: "🤰",
    conditions: [
      {
        name: "Morning Sickness",
        keywords: ["morning sickness","pregnancy nausea","nausea pregnancy","vomiting pregnancy","first trimester sick"],
        severity: "mild",
        remedies: [
          { title: "Ginger Tea / Candy", desc: "Most studied remedy for pregnancy nausea — safe and effective.", ingredients: ["Fresh ginger or ginger candy"], steps: ["Sip ginger tea slowly in morning","Keep ginger candies by bedside","Eat small amount before getting up"], duration: "Ongoing" },
          { title: "Lemon", desc: "Lemon scent and flavor settle nausea quickly.", ingredients: ["Fresh lemon"], steps: ["Smell freshly cut lemon","Sip cold lemon water","Add lemon to ice cubes and suck"], duration: "Immediate" },
          { title: "Small Frequent Meals", desc: "Empty stomach worsens nausea; small meals help.", ingredients: [], steps: ["Eat every 2 hours instead of 3 big meals","Keep crackers by bed to eat before rising","Avoid spicy and fatty foods"], duration: "Ongoing" }
        ]
      },
      {
        name: "Postpartum Recovery",
        keywords: ["postpartum","after delivery","c section recovery","new mom","postnatal","after birth","breastfeeding support"],
        severity: "moderate",
        remedies: [
          { title: "Turmeric Milk", desc: "Anti-inflammatory that speeds up internal healing.", ingredients: ["Turmeric","Milk","Ghee","Black pepper"], steps: ["Heat milk with turmeric + pepper + 1 tsp ghee","Drink twice daily"], duration: "4-6 weeks" },
          { title: "Fenugreek for Milk Production", desc: "Galactagogue that boosts breast milk supply.", ingredients: ["Fenugreek seeds"], steps: ["Soak 2 tsp seeds overnight","Eat seeds with warm water in morning","Or drink fenugreek tea"], duration: "2-4 weeks" },
          { title: "Sitz Bath", desc: "Warm sitz bath relieves perineal discomfort.", ingredients: ["Warm water","Epsom salt"], steps: ["Fill sitz bath with warm water","Add 1 cup epsom salt","Soak for 15-20 min, 2-3 times daily"], duration: "1-2 weeks" }
        ]
      }
    ]
  },
  {
    category: "Memory & Brain",
    icon: "🧠",
    conditions: [
      {
        name: "Poor Memory / Brain Fog",
        keywords: ["memory loss","forgetful","brain fog","cant concentrate","poor focus","mental clarity","forgetting things"],
        severity: "mild",
        remedies: [
          { title: "Brahmi (Bacopa)", desc: "Clinically proven to improve memory and cognitive function.", ingredients: ["Brahmi powder","Warm milk or water"], steps: ["Mix 1 tsp brahmi powder in warm milk","Drink daily in morning","Takes 4-6 weeks to show effect"], duration: "4-8 weeks" },
          { title: "Walnuts", desc: "DHA omega-3 supports brain cell structure and function.", ingredients: ["Walnuts"], steps: ["Eat 7-8 walnuts daily","Soak overnight for better absorption","Add to breakfast or snack"], duration: "4-6 weeks" },
          { title: "Rosemary Aromatherapy", desc: "1,8-cineole in rosemary improves memory and alertness.", ingredients: ["Rosemary essential oil"], steps: ["Inhale rosemary oil before study/work","Or add to diffuser","Or rub diluted on wrists"], duration: "Immediate" },
          { title: "Meditation", desc: "Regular meditation increases gray matter in memory areas.", ingredients: [], steps: ["Meditate for 10-20 min daily","Focus on breath counting","Use guided meditation app if needed"], duration: "4-8 weeks" }
        ]
      },
      {
        name: "Migraine",
        keywords: ["migraine","severe headache","aura headache","throbbing head","vomiting headache","light sensitivity","migraine attack"],
        severity: "moderate",
        remedies: [
          { title: "Magnesium Supplement", desc: "Deficiency is a major migraine trigger; magnesium prevents attacks.", ingredients: ["Magnesium-rich foods or supplement"], steps: ["Eat pumpkin seeds, spinach, dark chocolate daily","Or take 400mg magnesium glycinate supplement"], duration: "4-8 weeks" },
          { title: "Feverfew Herb", desc: "Reduces frequency and intensity of migraines.", ingredients: ["Feverfew supplement or tea"], steps: ["Take feverfew supplement daily as preventive","Or drink feverfew tea once daily"], duration: "4-6 weeks" },
          { title: "Cold Compress on Neck", desc: "Numbs pain signals from the occipital nerve.", ingredients: ["Ice pack","Cloth"], steps: ["Wrap ice in cloth","Apply to back of neck and temples","Keep 15-20 min at onset"], duration: "30-60 min" },
          { title: "Dark, Quiet Room + Sleep", desc: "Removing sensory triggers is essential during migraine.", ingredients: [], steps: ["Go to a dark, quiet room immediately","Use blackout curtains","Sleep if possible","Avoid screens completely"], duration: "2-8 hours" }
        ]
      }
    ]
  },
  {
    category: "Sports & Fitness",
    icon: "💪",
    conditions: [
      {
        name: "Muscle Soreness (DOMS)",
        keywords: ["muscle soreness","sore muscles","doms","muscle pain after workout","post workout pain","stiff muscles"],
        severity: "mild",
        remedies: [
          { title: "Tart Cherry Juice", desc: "Anthocyanins reduce inflammation-related muscle soreness.", ingredients: ["Tart cherry juice"], steps: ["Drink 250ml before and after intense exercise"], duration: "1-2 days" },
          { title: "Epsom Salt Bath", desc: "Magnesium absorption reduces muscle inflammation.", ingredients: ["Epsom salt","Warm bath"], steps: ["Add 2 cups epsom salt to warm bath","Soak for 20-30 min after workout"], duration: "30-60 min" },
          { title: "Turmeric Milk (Post Workout)", desc: "Anti-inflammatory golden milk speeds recovery.", ingredients: ["Turmeric","Milk","Honey"], steps: ["Drink within 30 min of workout","Add 1 tsp turmeric + 1 tbsp honey"], duration: "1-2 days" },
          { title: "Active Recovery Walk", desc: "Light movement flushes lactic acid faster.", ingredients: [], steps: ["Walk or cycle lightly for 20-30 min","Day after intense workout","Avoid intense training"], duration: "1-2 days" }
        ]
      },
      {
        name: "Sprain & Strain",
        keywords: ["sprain","strain","twisted ankle","sprained wrist","pulled muscle","ligament injury","sports injury"],
        severity: "moderate",
        remedies: [
          { title: "RICE Method", desc: "Rest, Ice, Compression, Elevation — gold standard first aid.", ingredients: ["Ice pack","Elastic bandage"], steps: ["REST the injured area immediately","ICE for 20 min every 2 hours","COMPRESS with elastic bandage","ELEVATE above heart level"], duration: "48-72 hours" },
          { title: "Turmeric Paste", desc: "Anti-inflammatory paste reduces swelling.", ingredients: ["Turmeric","Coconut oil"], steps: ["Mix turmeric and coconut oil into paste","Apply to affected area","Leave 30 min, rinse","Repeat 2-3 times daily"], duration: "3-5 days" },
          { title: "Arnica Cream", desc: "Natural homeopathic remedy for bruises and sprains.", ingredients: ["Arnica cream or gel"], steps: ["Apply to affected area gently","Do not use on broken skin","Apply 2-3 times daily"], duration: "5-7 days" }
        ]
      },
      {
        name: "Energy Before Workout",
        keywords: ["pre workout","energy boost","workout energy","exercise motivation","tired before gym","stamina"],
        severity: "mild",
        remedies: [
          { title: "Banana + Peanut Butter", desc: "Simple carbs + protein + healthy fats for sustained energy.", ingredients: ["Banana","Peanut butter"], steps: ["Eat 30-45 min before workout","Provides fast and slow energy release"], duration: "30-90 min" },
          { title: "Beetroot Juice", desc: "Nitrates increase oxygen efficiency by 2-3%.", ingredients: ["Fresh beetroot"], steps: ["Drink 250ml beetroot juice 2 hours before exercise"], duration: "2-3 hours" },
          { title: "Black Coffee", desc: "Caffeine increases strength, endurance, and fat burning.", ingredients: ["Black coffee"], steps: ["Drink 1 cup 30-45 min before workout","Avoid sugar for best effect"], duration: "2-4 hours" }
        ]
      }
    ]
  },
  {
    category: "Addiction & Withdrawal",
    icon: "🚭",
    conditions: [
      {
        name: "Quit Smoking Support",
        keywords: ["quit smoking","nicotine","smoking withdrawal","cigarette craving","stop smoking","tobacco"],
        severity: "moderate",
        remedies: [
          { title: "Oats Decoction", desc: "Avena sativa reduces nicotine craving significantly.", ingredients: ["Oats","Water"], steps: ["Boil 2 tbsp oats in water 15 min","Strain and drink twice daily","Do for at least 4 weeks"], duration: "4-8 weeks" },
          { title: "Licorice Root Stick", desc: "Chewing gives oral satisfaction to replace cigarettes.", ingredients: ["Licorice root stick"], steps: ["Chew on licorice stick when craving hits","Keeps hands and mouth busy"], duration: "Ongoing" },
          { title: "Deep Breathing During Cravings", desc: "4-7-8 breathing kills a craving in under 5 min.", ingredients: [], steps: ["When craving hits, inhale 4 counts","Hold 7 counts","Exhale 8 counts","Repeat 5 times"], duration: "5 min" }
        ]
      },
      {
        name: "Alcohol Reduction Support",
        keywords: ["alcohol","quit drinking","alcohol craving","liver damage alcohol","reduce alcohol","drinking problem"],
        severity: "serious",
        remedies: [
          { title: "Kudzu Root", desc: "Reduces alcohol cravings and protects the liver.", ingredients: ["Kudzu root extract"], steps: ["Take as directed on supplement","Has been studied in Harvard clinical trials"], duration: "4-8 weeks" },
          { title: "Milk Thistle", desc: "Protects and regenerates liver cells damaged by alcohol.", ingredients: ["Milk thistle supplement"], steps: ["Take 200-400mg silymarin daily","Take with food"], duration: "Ongoing" },
          { title: "B-Vitamin Rich Foods", desc: "Alcohol depletes B vitamins; replenishing aids recovery.", ingredients: ["Eggs","Leafy greens","Legumes","Nutritional yeast"], steps: ["Include B-vitamin foods in every meal","Consider B-complex supplement"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Eye Health",
    icon: "👁️",
    conditions: [
      {
        name: "Conjunctivitis (Pink Eye)",
        keywords: ["pink eye","conjunctivitis","red eye","eye infection","itchy eyes","eye discharge"],
        severity: "moderate",
        remedies: [
          { title: "Warm Compress", desc: "Loosens crusty discharge and soothes inflammation.", ingredients: ["Warm clean cloth"], steps: ["Soak cloth in warm clean water","Wring out and apply to closed eye","Hold 5-10 min","Use fresh cloth each time"], duration: "1-3 days" },
          { title: "Honey Eye Drops", desc: "Raw honey has antimicrobial properties for eye infections.", ingredients: ["Raw Manuka honey","Distilled water"], steps: ["Mix 1 part honey with 10 parts distilled water","Put 1-2 drops in eye","Use only Manuka honey grade 10+"], duration: "3-5 days" },
          { title: "Colloidal Silver Drops", desc: "Natural antimicrobial often used for eye infections.", ingredients: ["Colloidal silver (10ppm)"], steps: ["Put 1-2 drops in infected eye","Use 3 times daily","Use fresh dropper each time"], duration: "3-5 days" }
        ]
      },
      {
        name: "Cataract (Early Stage)",
        keywords: ["cataract","cloudy vision","blurry vision","eye lens","vision loss"],
        severity: "serious",
        remedies: [
          { title: "Castor Oil Eye Drops", desc: "Ricinoleic acid may slow oxidative damage in lenses.", ingredients: ["Food-grade castor oil"], steps: ["Use sterile dropper","Put 1 drop in each eye at bedtime","Vision may blur temporarily"], duration: "3-6 months" },
          { title: "Bilberry", desc: "Anthocyanins protect eye tissue from oxidative stress.", ingredients: ["Bilberry supplement or berries"], steps: ["Take bilberry extract supplement daily","Or eat fresh bilberries/blueberries daily"], duration: "3-6 months" },
          { title: "Antioxidant-Rich Diet", desc: "Vitamins C, E and lutein protect lens cells.", ingredients: ["Kale","Eggs","Citrus","Nuts","Berries"], steps: ["Eat leafy greens and colorful vegetables daily","Avoid smoking which accelerates cataracts"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Sexual Health",
    icon: "💊",
    conditions: [
      {
        name: "Low Libido",
        keywords: ["low libido","low sex drive","no desire","sexual weakness","low testosterone","decreased libido"],
        severity: "mild",
        remedies: [
          { title: "Ashwagandha", desc: "Boosts testosterone, reduces cortisol, improves sexual function.", ingredients: ["Ashwagandha powder","Warm milk"], steps: ["Mix 1 tsp in warm milk","Drink before bed daily"], duration: "4-8 weeks" },
          { title: "Saffron (Kesar)", desc: "Natural aphrodisiac that improves mood and desire.", ingredients: ["Saffron strands","Warm milk"], steps: ["Add 4-5 saffron strands to warm milk","Drink nightly"], duration: "4-6 weeks" },
          { title: "Fenugreek", desc: "Contains furostanolic saponins that boost testosterone.", ingredients: ["Fenugreek seeds"], steps: ["Soak 1 tsp seeds overnight","Eat in morning with warm water"], duration: "4-8 weeks" }
        ]
      },
      {
        name: "Erectile Dysfunction (Mild)",
        keywords: ["erectile dysfunction","ed","weak erection","impotence","sexual weakness men","performance issues"],
        severity: "moderate",
        remedies: [
          { title: "Pomegranate Juice", desc: "Improves blood flow and reduces oxidative stress.", ingredients: ["Fresh pomegranate juice"], steps: ["Drink 1-2 glasses daily","Consistent daily use required"], duration: "4-8 weeks" },
          { title: "Watermelon Juice", desc: "Citrulline converts to arginine, relaxing blood vessels.", ingredients: ["Watermelon"], steps: ["Eat 2-3 cups watermelon daily","Or juice with rind for extra citrulline"], duration: "2-4 weeks" },
          { title: "Kegel Exercises", desc: "Strengthens pelvic floor muscles that control erection.", ingredients: [], steps: ["Squeeze muscles you'd use to stop urination","Hold 3 seconds, release 3 seconds","Repeat 10-15 times, 3 sets daily"], duration: "4-8 weeks" }
        ]
      }
    ]
  },
  {
    category: "Immune Boosters",
    icon: "⚡",
    conditions: [
      {
        name: "Post-COVID Recovery",
        keywords: ["post covid","long covid","covid recovery","weakness after covid","fatigue post covid","brain fog covid"],
        severity: "moderate",
        remedies: [
          { title: "Chyawanprash + Ashwagandha", desc: "Ancient immunity formula for full-body recovery.", ingredients: ["Chyawanprash","Ashwagandha"], steps: ["Take 1 tbsp chyawanprash morning","Add ashwagandha in warm milk at night"], duration: "4-8 weeks" },
          { title: "Breathing Exercises (Pranayama)", desc: "Rebuilds lung capacity damaged by COVID.", ingredients: [], steps: ["Anulom-Vilom: alternate nostril 10 min daily","Bhramari: humming breath 5 min","Kapalbhati: 50 strokes, work up slowly"], duration: "4-8 weeks" },
          { title: "Zinc-Rich Foods", desc: "Zinc is essential for immune cell production and recovery.", ingredients: ["Pumpkin seeds","Chickpeas","Cashews","Meat"], steps: ["Eat zinc-rich foods at every meal","Sunflower seeds make easy snack"], duration: "Ongoing" }
        ]
      },
      {
        name: "Chronic Inflammation",
        keywords: ["inflammation","chronic pain","autoimmune","inflammatory","body inflammation","systemic inflammation"],
        severity: "moderate",
        remedies: [
          { title: "Anti-Inflammatory Diet", desc: "Diet is the most powerful tool against chronic inflammation.", ingredients: ["Olive oil","Berries","Fatty fish","Leafy greens","Nuts"], steps: ["Follow Mediterranean diet principles","Eliminate processed foods, sugar, refined carbs","Cook with olive oil and turmeric"], duration: "4-12 weeks" },
          { title: "Omega-3 Fatty Acids", desc: "EPA and DHA directly reduce inflammatory markers.", ingredients: ["Flaxseeds","Walnuts","Fish oil"], steps: ["Take fish oil supplement daily","Or eat salmon/sardines 3x weekly","Add flaxseeds to daily diet"], duration: "4-8 weeks" },
          { title: "Turmeric + Boswellia", desc: "Powerful combination blocking inflammatory pathways.", ingredients: ["Turmeric","Boswellia supplement"], steps: ["Take 500mg turmeric + 300mg boswellia daily","Always take with food and black pepper"], duration: "4-8 weeks" }
        ]
      }
    ]
  }
];

export default remediesPart5;
