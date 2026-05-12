// Home Remedies Data - Part 6 (First Aid, Men's Health, Travel, Seasonal)
const remediesPart6 = [
  {
    category: "First Aid & Minor Injuries",
    icon: "🩹",
    conditions: [
      {
        name: "Minor Burns",
        keywords: ["burn","burnt","scalded","hot water burn","kitchen burn","stove burn"],
        severity: "moderate",
        remedies: [
          { title: "Cool Running Water", desc: "Instantly stops the burning process and cools the tissue.", ingredients: ["Cool tap water"], steps: ["Run cool (not cold) water over burn for 20 min","Do not use ice","Do not apply butter or oil immediately"], duration: "20 min" },
          { title: "Honey Bandage", desc: "Honey is antibacterial and prevents the bandage from sticking.", ingredients: ["Raw honey","Gauze"], steps: ["Apply a layer of honey to the burn","Cover loosely with sterile gauze","Change once daily"], duration: "3-5 days" },
          { title: "Aloe Vera", desc: "The natural healer for skin tissue repair.", ingredients: ["Fresh aloe vera gel"], steps: ["Apply fresh gel after the area has cooled","Reapply 3-4 times daily"], duration: "3-5 days" }
        ]
      },
      {
        name: "Minor Cuts & Scrapes",
        keywords: ["cut","scrape","scratch","bleeding","wound","minor injury"],
        severity: "mild",
        remedies: [
          { title: "Honey / Turmeric Paste", desc: "Both are powerful natural antiseptics.", ingredients: ["Turmeric","Honey"], steps: ["Clean the wound with water","Apply a mix of turmeric and honey","Cover with a clean bandage"], duration: "2-3 days" },
          { title: "Coconut Oil", desc: "Creates a thin barrier against bacteria.", ingredients: ["Virgin coconut oil"], steps: ["Apply to cleaned wound","Helps prevent scarring"], duration: "Ongoing" },
          { title: "Tea Tree Oil", desc: "Kills germs instantly.", ingredients: ["Tea tree oil","Water"], steps: ["Dilute 1 drop in water","Clean the area around the cut"], duration: "Immediate" }
        ]
      },
      {
        name: "Bee / Insect Stings",
        keywords: ["bee sting","wasp sting","insect bite","bug bite","itchy bite","stung"],
        severity: "moderate",
        remedies: [
          { title: "Baking Soda Paste", desc: "Neutralizes the acidic venom of bee stings.", ingredients: ["Baking soda","Water"], steps: ["Make a thick paste","Apply to the sting area","Leave for 15 min"], duration: "15-30 min" },
          { title: "Apple Cider Vinegar", desc: "Neutralizes wasp stings (which are alkaline).", ingredients: ["ACV"], steps: ["Soak a cotton ball in ACV","Press onto the sting for 10 min"], duration: "10-20 min" },
          { title: "Ice Pack", desc: "Reduces swelling and slows venom absorption.", ingredients: ["Ice","Cloth"], steps: ["Apply ice wrapped in cloth for 15 min","Repeat every hour"], duration: "1-2 hours" }
        ]
      }
    ]
  },
  {
    category: "Men's Health",
    icon: "🤵",
    conditions: [
      {
        name: "Prostate Health (Early Support)",
        keywords: ["prostate","frequent urination men","weak stream","bph","prostate health"],
        severity: "serious",
        remedies: [
          { title: "Pumpkin Seeds", desc: "Rich in zinc and phytosterols which support prostate health.", ingredients: ["Pumpkin seeds"], steps: ["Eat a handful of raw pumpkin seeds daily","Adds healthy fats and minerals"], duration: "Ongoing" },
          { title: "Lycopene (Cooked Tomatoes)", desc: "Lycopene is clinically linked to lower prostate risks.", ingredients: ["Tomatoes","Olive oil"], steps: ["Cook tomatoes with a little oil to release lycopene","Eat cooked tomato products 3-4 times weekly"], duration: "Ongoing" },
          { title: "Pygeum / Saw Palmetto", desc: "Herbal extracts often used for urinary flow.", ingredients: ["Saw Palmetto supplement"], steps: ["Take as directed by a healthcare professional","Often taken in 320mg daily doses"], duration: "4-12 weeks" }
        ]
      }
    ]
  },
  {
    category: "Travel & Altitude",
    icon: "✈️",
    conditions: [
      {
        name: "Jet Lag",
        keywords: ["jet lag","travel fatigue","time zone change","insomnia travel","tired after flight"],
        severity: "mild",
        remedies: [
          { title: "Sunlight Exposure", desc: "Resets your internal circadian clock to the local time.", ingredients: ["Natural sunlight"], steps: ["Get 30 min of sunlight in the morning of your destination","Avoid screens before bedtime"], duration: "1-2 days" },
          { title: "Melatonin-Rich Foods", desc: "Naturally helps induce sleep at the right time.", ingredients: ["Cherries","Walnuts","Bananas"], steps: ["Eat these 1 hour before you want to sleep in the new time zone"], duration: "1-2 days" },
          { title: "Hydration", desc: "Flying dehydrates you, making jet lag symptoms worse.", ingredients: ["Water"], steps: ["Drink 1 glass of water for every hour in the air","Avoid alcohol and caffeine"], duration: "Travel duration" }
        ]
      },
      {
        name: "Altitude Sickness",
        keywords: ["altitude sickness","mountain sickness","dizziness mountains","headache altitude","short of breath mountains"],
        severity: "serious",
        remedies: [
          { title: "Slow Ascent", desc: "The only real cure is allowing the body to adjust.", ingredients: [], steps: ["Do not climb more than 1000ft/300m per day above 8000ft","Rest for 24 hours if symptoms appear"], duration: "1-3 days" },
          { title: "Coca Leaves / Tea (where legal)", desc: "Traditional Andean remedy for oxygen absorption.", ingredients: ["Coca tea"], steps: ["Sip warm tea throughout the day while at altitude"], duration: "Ongoing" },
          { title: "Hydration & Carbs", desc: "Your body needs more water and sugar at high altitudes.", ingredients: ["Water","Complex carbs"], steps: ["Drink 4-5 liters of water daily","Eat small, carb-rich meals"], duration: "Stay duration" }
        ]
      }
    ]
  },
  {
    category: "Seasonal & Environmental",
    icon: "❄️",
    conditions: [
      {
        name: "Cracked Heels",
        keywords: ["cracked heels","dry feet","heel fissures","rough feet","foot cracks"],
        severity: "mild",
        remedies: [
          { title: "Coconut Oil & Socks", desc: "Intense overnight moisturizing treatment.", ingredients: ["Virgin coconut oil","Cotton socks"], steps: ["Wash and dry feet","Apply thick layer of coconut oil","Wear cotton socks overnight"], duration: "3-7 days" },
          { title: "Banana Foot Mask", desc: "Enzymes in banana soften hard skin.", ingredients: ["Overripe banana"], steps: ["Mash banana, apply to heels","Leave for 20 min, rinse","Do daily"], duration: "1-2 weeks" },
          { title: "Honey & Warm Water Soak", desc: "Honey is a natural humectant that attracts moisture.", ingredients: ["Honey","Warm water"], steps: ["Mix 1 cup honey in a tub of warm water","Soak feet for 20 min","Scrub gently with pumice stone"], duration: "2-3 times weekly" }
        ]
      },
      {
        name: "Chapped Lips",
        keywords: ["chapped lips","dry lips","cracked lips","peeling lips","lip irritation"],
        severity: "mild",
        remedies: [
          { title: "Honey & Sugar Scrub", desc: "Exfoliates dead skin and moisturizes.", ingredients: ["Honey","Sugar"], steps: ["Mix equal parts to make a scrub","Gently rub on lips for 1 min","Rinse and apply lip balm"], duration: "Immediate" },
          { title: "Cucumber Slice", desc: "Hydrates and reduces inflammation.", ingredients: ["Cold cucumber"], steps: ["Rub a slice on lips for 2-3 min daily"], duration: "2-3 days" },
          { title: "Ghee / Clarified Butter", desc: "Traditional intense moisturizer for lips.", ingredients: ["Ghee"], steps: ["Apply a drop to lips before bed","Leave overnight"], duration: "Overnight" }
        ]
      }
    ]
  }
];

export default remediesPart6;
