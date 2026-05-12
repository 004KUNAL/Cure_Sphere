// Home Remedies Data - Part 4 (Diabetes, Kidney, Liver, Weight, Wellness)
const remediesPart4 = [
  {
    category: "Diabetes & Blood Sugar",
    icon: "🩸",
    conditions: [
      {
        name: "High Blood Sugar",
        keywords: ["diabetes","blood sugar","sugar high","glucose","diabetic","sugar control","prediabetes","insulin"],
        severity: "serious",
        remedies: [
          { title: "Fenugreek Seeds", desc: "Slows carb absorption and improves insulin function.", ingredients: ["Fenugreek seeds","Water"], steps: ["Soak 2 tbsp seeds in water overnight","Drink water + eat seeds in morning","Do daily"], duration: "4-8 weeks" },
          { title: "Bitter Gourd (Karela) Juice", desc: "Contains charantin which lowers blood glucose.", ingredients: ["Bitter gourd"], steps: ["Juice 1 bitter gourd","Drink on empty stomach","Do 3-4 times weekly"], duration: "4-8 weeks" },
          { title: "Cinnamon", desc: "Improves insulin sensitivity and lowers fasting blood sugar.", ingredients: ["Cinnamon powder"], steps: ["Add 1/2 tsp to warm water or tea","Drink daily with meals"], duration: "4-12 weeks" },
          { title: "Jamun Seeds Powder", desc: "Jamboline in jamun seeds helps control blood sugar.", ingredients: ["Jamun seed powder"], steps: ["Take 1 tsp powder with water twice daily","Take before meals"], duration: "4-8 weeks" },
          { title: "Walking After Meals", desc: "15-min post-meal walks reduce blood sugar spikes by 30%.", ingredients: [], steps: ["Walk for 15 min after each meal","Even slow walking helps","Make it a daily habit"], duration: "Immediate" }
        ]
      }
    ]
  },
  {
    category: "Kidney & Urinary",
    icon: "🫘",
    conditions: [
      {
        name: "Kidney Stones",
        keywords: ["kidney stone","renal stone","kidney pain","stones in kidney","passing stone","kidney gravel"],
        severity: "serious",
        remedies: [
          { title: "Lemon Juice & Water", desc: "Citrate in lemon prevents calcium stone formation.", ingredients: ["Lemon","Water"], steps: ["Squeeze 4-5 lemons in 2L water daily","Drink throughout the day"], duration: "Ongoing" },
          { title: "Apple Cider Vinegar", desc: "Acetic acid dissolves small kidney stones.", ingredients: ["ACV","Water"], steps: ["Mix 2 tbsp ACV in glass of water","Drink 2-3 times daily","Use a straw to protect teeth"], duration: "2-4 weeks" },
          { title: "Pomegranate Juice", desc: "Antioxidants prevent stone formation.", ingredients: ["Pomegranate"], steps: ["Drink 1-2 glasses fresh juice daily","Or eat pomegranate seeds"], duration: "Ongoing" },
          { title: "Hydration", desc: "Drinking enough water is the #1 prevention for stones.", ingredients: ["Water"], steps: ["Drink 3-4 liters of water daily","Urine should be light yellow"], duration: "Ongoing" }
        ]
      },
      {
        name: "Water Retention / Edema",
        keywords: ["water retention","swelling","edema","bloated","puffy","swollen feet","fluid retention"],
        severity: "moderate",
        remedies: [
          { title: "Dandelion Tea", desc: "Natural diuretic that promotes fluid elimination.", ingredients: ["Dandelion tea"], steps: ["Steep in hot water 10 min","Drink 2-3 cups daily"], duration: "3-5 days" },
          { title: "Reduce Sodium", desc: "Excess salt causes the body to retain water.", ingredients: [], steps: ["Limit salt to 1500mg/day","Avoid processed foods","Cook at home with herbs instead"], duration: "1-2 weeks" },
          { title: "Elevate Legs", desc: "Gravity helps drain fluid from swollen limbs.", ingredients: [], steps: ["Lie down with legs elevated above heart","Keep elevated for 20-30 min","Do 3-4 times daily"], duration: "30 min" },
          { title: "Parsley Tea", desc: "Natural diuretic used in traditional medicine.", ingredients: ["Fresh parsley","Water"], steps: ["Boil handful of parsley in water 10 min","Strain and drink 2-3 cups daily"], duration: "3-5 days" }
        ]
      }
    ]
  },
  {
    category: "Liver Health",
    icon: "🫁",
    conditions: [
      {
        name: "Liver Detox / Fatty Liver",
        keywords: ["liver","fatty liver","liver cleanse","liver detox","hepatitis","liver health","jaundice"],
        severity: "serious",
        remedies: [
          { title: "Lemon Water (Morning)", desc: "Stimulates bile production and liver function.", ingredients: ["Lemon","Warm water"], steps: ["Squeeze half lemon in warm water","Drink first thing in morning","Do daily on empty stomach"], duration: "Ongoing" },
          { title: "Milk Thistle", desc: "Silymarin protects liver cells and promotes regeneration.", ingredients: ["Milk thistle supplement or tea"], steps: ["Take as directed on supplement","Or brew tea 2-3 cups daily"], duration: "4-12 weeks" },
          { title: "Turmeric", desc: "Curcumin reduces liver inflammation and fat deposits.", ingredients: ["Turmeric","Black pepper"], steps: ["Add 1 tsp turmeric to meals daily","Always combine with black pepper"], duration: "4-8 weeks" },
          { title: "Green Vegetables", desc: "Chlorophyll aids liver detoxification pathways.", ingredients: ["Spinach","Kale","Broccoli","Bitter gourd"], steps: ["Eat 2-3 servings green vegetables daily","Include in every meal"], duration: "Ongoing" }
        ]
      }
    ]
  },
  {
    category: "Weight Management",
    icon: "⚖️",
    conditions: [
      {
        name: "Weight Loss",
        keywords: ["weight loss","overweight","obesity","fat loss","lose weight","belly fat","reduce weight"],
        severity: "mild",
        remedies: [
          { title: "Warm Lemon-Honey Water", desc: "Boosts metabolism and aids fat burning.", ingredients: ["Lemon","Honey","Warm water"], steps: ["Squeeze lemon in warm water","Add 1 tsp honey","Drink first thing in morning"], duration: "Ongoing" },
          { title: "Green Tea", desc: "EGCG catechins boost metabolism by 4-5%.", ingredients: ["Green tea"], steps: ["Drink 3-4 cups daily","Have between meals, not with food","No sugar"], duration: "4-8 weeks" },
          { title: "Apple Cider Vinegar", desc: "Increases satiety and reduces calorie intake.", ingredients: ["ACV","Water"], steps: ["Mix 1-2 tbsp in water","Drink 30 min before meals"], duration: "4-12 weeks" },
          { title: "Cumin Water (Jeera Water)", desc: "Boosts metabolism and improves fat metabolism.", ingredients: ["Cumin seeds","Water"], steps: ["Soak 2 tsp cumin in water overnight","Strain and drink in morning on empty stomach"], duration: "4-8 weeks" },
          { title: "Intermittent Fasting", desc: "16:8 fasting pattern promotes fat burning.", ingredients: [], steps: ["Eat within 8-hour window daily","Fast for remaining 16 hours","Stay hydrated during fast"], duration: "2-4 weeks" }
        ]
      },
      {
        name: "Weight Gain / Underweight",
        keywords: ["underweight","gain weight","too thin","skinny","weight gain","malnourished","increase weight"],
        severity: "mild",
        remedies: [
          { title: "Banana Milkshake", desc: "Calorie-dense, nutritious shake for healthy weight gain.", ingredients: ["Banana","Milk","Honey","Almonds"], steps: ["Blend 2 bananas + milk + honey + almonds","Drink twice daily","Have after meals"], duration: "4-8 weeks" },
          { title: "Dry Fruits & Nuts", desc: "Nutrient-dense calories from healthy fats.", ingredients: ["Almonds","Cashews","Dates","Raisins","Figs"], steps: ["Eat a handful 2-3 times daily","Soak almonds overnight for better absorption"], duration: "4-8 weeks" },
          { title: "Ashwagandha Milk", desc: "Builds muscle mass and improves appetite.", ingredients: ["Ashwagandha powder","Warm milk","Honey"], steps: ["Mix 1 tsp ashwagandha in warm milk","Add honey","Drink before bed nightly"], duration: "4-8 weeks" },
          { title: "Ghee & Rice", desc: "Traditional calorie-rich combination for weight gain.", ingredients: ["Ghee","Rice","Dal"], steps: ["Add 1-2 tbsp ghee to rice and dal","Eat 2-3 full meals daily"], duration: "4-8 weeks" }
        ]
      }
    ]
  },
  {
    category: "General Wellness",
    icon: "✨",
    conditions: [
      {
        name: "Dehydration",
        keywords: ["dehydration","thirsty","dry mouth","dark urine","dehydrated","water loss"],
        severity: "moderate",
        remedies: [
          { title: "ORS (Oral Rehydration)", desc: "Fastest way to rehydrate with proper electrolyte balance.", ingredients: ["Salt","Sugar","Water","Lemon"], steps: ["Mix 6 tsp sugar + 1/2 tsp salt in 1L water","Add lemon juice","Sip frequently"], duration: "1-2 hours" },
          { title: "Coconut Water", desc: "Nature's electrolyte drink with potassium.", ingredients: ["Fresh coconut water"], steps: ["Drink 2-3 glasses throughout the day"], duration: "1-2 hours" },
          { title: "Watermelon", desc: "92% water content with natural sugars and minerals.", ingredients: ["Watermelon"], steps: ["Eat 2-3 cups of watermelon","Or blend into juice"], duration: "30-60 min" }
        ]
      },
      {
        name: "Motion Sickness",
        keywords: ["motion sickness","car sickness","travel sickness","nausea in car","sea sickness","dizziness in vehicle"],
        severity: "mild",
        remedies: [
          { title: "Ginger", desc: "Most effective natural remedy for motion sickness.", ingredients: ["Fresh ginger or ginger candy"], steps: ["Chew ginger 30 min before travel","Or take ginger tea","Keep ginger candy handy"], duration: "Preventive" },
          { title: "Peppermint", desc: "Calms nausea and settles the stomach.", ingredients: ["Peppermint oil or candy"], steps: ["Inhale peppermint oil during travel","Or suck peppermint candy"], duration: "Immediate" },
          { title: "Acupressure (P6 Point)", desc: "Pressing the inner wrist point reduces nausea.", ingredients: [], steps: ["Find point 3 finger-widths below wrist crease","Press firmly with thumb for 2-3 min","Repeat on both wrists"], duration: "5-10 min" }
        ]
      },
      {
        name: "Hangover",
        keywords: ["hangover","drank too much","alcohol recovery","headache after drinking","nausea after drinking"],
        severity: "mild",
        remedies: [
          { title: "Coconut Water", desc: "Replenishes electrolytes lost from alcohol.", ingredients: ["Coconut water"], steps: ["Drink 2-3 glasses after waking","Continue throughout the day"], duration: "2-4 hours" },
          { title: "Banana & Toast", desc: "Potassium and bland carbs settle the stomach.", ingredients: ["Banana","Toast","Honey"], steps: ["Eat banana with toast and honey","Follow with plenty of water"], duration: "1-2 hours" },
          { title: "Ginger-Lemon Tea", desc: "Settles nausea and aids liver recovery.", ingredients: ["Ginger","Lemon","Honey"], steps: ["Boil ginger, add lemon + honey","Sip slowly"], duration: "30-60 min" }
        ]
      },
      {
        name: "Bad Body Odor",
        keywords: ["body odor","smelly","sweat smell","armpit odor","bo","sweating","perspiration smell"],
        severity: "mild",
        remedies: [
          { title: "Apple Cider Vinegar", desc: "Kills odor-causing bacteria on skin.", ingredients: ["ACV","Water"], steps: ["Mix equal parts ACV and water","Apply to armpits with cotton ball","Let dry before dressing"], duration: "Ongoing" },
          { title: "Baking Soda", desc: "Absorbs moisture and neutralizes odor.", ingredients: ["Baking soda","Cornstarch"], steps: ["Mix equal parts baking soda and cornstarch","Apply to clean dry armpits","Use as natural deodorant"], duration: "Ongoing" },
          { title: "Lemon", desc: "Citric acid lowers skin pH making it inhospitable for bacteria.", ingredients: ["Fresh lemon"], steps: ["Rub lemon slice on armpits after shower","Let dry before dressing"], duration: "Ongoing" }
        ]
      },
      {
        name: "Hiccups",
        keywords: ["hiccups","hic","hiccough","cant stop hiccups","persistent hiccups"],
        severity: "mild",
        remedies: [
          { title: "Hold Your Breath", desc: "CO2 buildup relaxes the diaphragm.", ingredients: [], steps: ["Take a deep breath","Hold for 10-20 seconds","Repeat 2-3 times"], duration: "1-2 min" },
          { title: "Sugar Under Tongue", desc: "Sweetness stimulates the vagus nerve to stop hiccups.", ingredients: ["Sugar"], steps: ["Place 1 tsp sugar under tongue","Let it dissolve slowly"], duration: "1-2 min" },
          { title: "Cold Water", desc: "Shock to the system can reset the diaphragm.", ingredients: ["Cold water"], steps: ["Drink a glass of cold water quickly","Or gargle with cold water"], duration: "Immediate" }
        ]
      }
    ]
  }
];

export default remediesPart4;
