  // Character data structure
  let character = {
  priorities: {},
  race: null,
  raceData: null,
  magic: null,
  magicTradition: null,
  attributes: {
  body: 1,
  quickness: 1,
  strength: 1,
  charisma: 1,
  intelligence: 1,
  willpower: 1
},
  skills: {},
  knowledgeSkills: {},
  languageSkills: {},
  equipment: {
  cyberware: [],
  weapons: [],
  armor: [],
  equipment: [],
  vehicles: []
},
  contacts: [],
  edgesFlaws: [],
  name: '',
  streetName: '',
  age: 0,
  gender: '',
  description: '',
  karmaPool: 0,
  essence: 6.0,
  nuyen: 0
};

  // Race data
  // Export character as standalone HTML
  function exportCharacter() {
  const html = generateExportHTML();
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${character.streetName || character.name || 'shadowrun_character'}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

  // Copy character summary to clipboard
  function copyToClipboard() {
  const summary = generateTextSummary();
  navigator.clipboard.writeText(summary).then(() => {
  alert('Character summary copied to clipboard!');
}).catch(err => {
  console.error('Failed to copy:', err);
});
}

  // Generate text summary
  function generateTextSummary() {
  let summary = `SHADOWRUN 3E CHARACTER\n${'='.repeat(50)}\n\n`;
  summary += `Name: ${character.name}\n`;
  summary += `Street Name: ${character.streetName}\n`;
  summary += `Race: ${character.raceData?.name || 'Unknown'}\n`;
  summary += `Age: ${character.age} | Gender: ${character.gender}\n\n`;

  summary += `ATTRIBUTES\n${'-'.repeat(50)}\n`;
  for (const [attr, value] of Object.entries(character.attributes)) {
  summary += `${attr.toUpperCase()}: ${value}\n`;
}

  const reaction = Math.floor((character.attributes.quickness + character.attributes.intelligence) / 2);
  summary += `\nReaction: ${reaction}\n`;
  summary += `Initiative: ${reaction}+1d6\n`;
  summary += `Essence: ${character.essence}\n`;
  summary += `Karma Pool: ${character.karmaPool}\n\n`;

  summary += `SKILLS\n${'-'.repeat(50)}\n`;
  for (const [skill, rating] of Object.entries(character.skills)) {
  if (rating > 0) summary += `${skill}: ${rating}\n`;
}

  return summary;
}

  // Generate standalone HTML export
  function generateExportHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${character.streetName || character.name} - Shadowrun 3E Character</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #0a0e1a;
            color: #e0e6f0;
            padding: 20px;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        header {
            background: linear-gradient(135deg, #1a1f35, #0a0e1a);
            padding: 30px;
            border-bottom: 2px solid #00ff88;
            margin-bottom: 30px;
            border-radius: 10px;
        }
        h1 {
            text-align: center;
            background: linear-gradient(90deg, #00ff88, #00d4ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 2.5em;
        }
        .section {
            background: #1a1f35;
            border: 1px solid #2d3548;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 20px;
        }
        h2 { color: #00ff88; margin-bottom: 15px; }
        h3 { color: #00d4ff; margin: 15px 0 10px 0; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .item {
            background: #252b45;
            padding: 12px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
        }
        .label { color: #9ca3af; }
        .value { color: #00ff88; font-weight: bold; }
        .list { display: grid; gap: 10px; margin-top: 10px; }
        .list-item {
            background: #252b45;
            padding: 12px;
            border-radius: 6px;
        }
        @media print {
            body { background: white; color: black; }
            h1 { color: black; -webkit-text-fill-color: black; }
            h2, h3 { color: black; }
            .section { background: white; border: 1px solid #ddd; }
            .item, .list-item { background: #f5f5f5; }
            .value { color: black; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>⚡ ${character.streetName || character.name} ⚡</h1>
            <p style="text-align: center; color: #9ca3af;">Shadowrun 3rd Edition Character</p>
        </header>

        <div class="section">
            <h2>Personal Information</h2>
            <div class="grid">
                <div class="item"><span class="label">Name:</span><span class="value">${character.name}</span></div>
                <div class="item"><span class="label">Street Name:</span><span class="value">${character.streetName}</span></div>
                <div class="item"><span class="label">Race:</span><span class="value">${character.raceData?.name || 'Unknown'}</span></div>
                <div class="item"><span class="label">Age:</span><span class="value">${character.age}</span></div>
                <div class="item"><span class="label">Gender:</span><span class="value">${character.gender}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>Attributes</h2>
            <div class="grid">
                ${Object.entries(character.attributes).map(([attr, val]) =>
  `<div class="item"><span class="label">${attr.toUpperCase()}:</span><span class="value">${val}</span></div>`
  ).join('')}
            </div>
            <h3>Derived Attributes</h3>
            <div class="grid">
                <div class="item"><span class="label">Reaction:</span><span class="value">${Math.floor((character.attributes.quickness + character.attributes.intelligence) / 2)}</span></div>
                <div class="item"><span class="label">Initiative:</span><span class="value">${Math.floor((character.attributes.quickness + character.attributes.intelligence) / 2)}+1d6</span></div>
                <div class="item"><span class="label">Essence:</span><span class="value">${character.essence.toFixed(1)}</span></div>
                <div class="item"><span class="label">Karma Pool:</span><span class="value">${character.karmaPool}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>Skills</h2>
            <div class="list">
                ${Object.entries(character.skills).filter(([_, rating]) => rating > 0).map(([skill, rating]) =>
  `<div class="list-item">${skill}: ${rating}</div>`
  ).join('') || '<p style="color: #9ca3af;">No skills selected</p>'}
            </div>
        </div>

        <div class="section">
            <h2>Equipment</h2>
            ${character.equipment.weapons.length > 0 ? `<h3>Weapons</h3><div class="list">${character.equipment.weapons.map(w =>
  `<div class="list-item">${w.name} - ${w.cost}¥</div>`
  ).join('')}</div>` : ''}
            ${character.equipment.armor.length > 0 ? `<h3>Armor</h3><div class="list">${character.equipment.armor.map(a =>
  `<div class="list-item">${a.name} - ${a.cost}¥</div>`
  ).join('')}</div>` : ''}
            ${character.equipment.equipment.length > 0 ? `<h3>General Equipment</h3><div class="list">${character.equipment.equipment.map(e =>
  `<div class="list-item">${e.name} - ${e.cost}¥</div>`
  ).join('')}</div>` : ''}
            ${character.equipment.vehicles.length > 0 ? `<h3>Vehicles</h3><div class="list">${character.equipment.vehicles.map(v =>
  `<div class="list-item">${v.name} (${v.type}) - ${v.cost}¥<br><span style="font-size: 0.9em;">Handling: ${v.handling} | Speed: ${v.speed} | Body: ${v.body} | Armor: ${v.armor}</span></div>`
  ).join('')}</div>` : ''}
        </div>

        ${character.edgesFlaws.length > 0 ? `<div class="section">
            <h2>Edges & Flaws</h2>
            <div class="list">
                ${character.edgesFlaws.map(ef =>
  `<div class="list-item">${ef.name} (${ef.cost > 0 ? 'Cost' : 'Grant'}: ${Math.abs(ef.cost)})</div>`
  ).join('')}
            </div>
        </div>` : ''}

        ${character.contacts.length > 0 ? `<div class="section">
            <h2>Contacts</h2>
            <div class="list">
                ${character.contacts.map(c =>
  `<div class="list-item">${c.name} - Level ${c.level}</div>`
  ).join('')}
            </div>
        </div>` : ''}

        ${character.description ? `<div class="section">
            <h2>Description</h2>
            <p style="color: #e0e6f0; line-height: 1.8;">${character.description}</p>
        </div>` : ''}
    </div>
</body>

</html>`;
}
  const races = {
  human: {
  name: 'Human',
  priority: 'E',
  attributes: { body: [0, 6], quickness: [0, 6], strength: [0, 6], charisma: [0, 6], intelligence: [0, 6], willpower: [0, 6] },
  modifiers: { body: 0, quickness: 0, strength: 0, charisma: 0, intelligence: 0, willpower: 0 },
  description: 'Versatile and adaptable, humans are the most common race in the Sixth World. No attribute modifiers.',
  karmaPool: 3
},
  elf: {
  name: 'Elf',
  priority: 'C',
  attributes: { body: [0, 6], quickness: [1, 7], strength: [0, 6], charisma: [2, 8], intelligence: [0, 6], willpower: [0, 6] },
  modifiers: { body: 0, quickness: +1, strength: 0, charisma: +2, intelligence: 0, willpower: 0 },
  description: 'Graceful and charismatic, elves have enhanced agility and presence. +1 Quickness, +2 Charisma.',
  karmaPool: 2
},
  dwarf: {
  name: 'Dwarf',
  priority: 'D',
  attributes: { body: [1, 7], quickness: [0, 6], strength: [2, 8], charisma: [0, 6], intelligence: [0, 6], willpower: [1, 7] },
  modifiers: { body: +1, quickness: 0, strength: +2, charisma: 0, intelligence: 0, willpower: +1 },
  description: 'Tough and resilient, dwarves are known for their durability. +1 Body, +2 Strength, +1 Willpower.',
  karmaPool: 2
},
  ork: {
  name: 'Ork',
  priority: 'D',
  attributes: { body: [3, 9], quickness: [0, 6], strength: [2, 8], charisma: [-1, 5], intelligence: [-1, 5], willpower: [0, 6] },
  modifiers: { body: +3, quickness: 0, strength: +2, charisma: -1, intelligence: -1, willpower: 0 },
  description: 'Powerful and intimidating, orks trade social grace for raw might. +3 Body, +2 Strength, -1 Charisma, -1 Intelligence.',
  karmaPool: 1
},
  troll: {
  name: 'Troll',
  priority: 'C',
  attributes: { body: [5, 11], quickness: [-1, 5], strength: [4, 10], charisma: [-2, 4], intelligence: [-2, 4], willpower: [0, 6] },
  modifiers: { body: +5, quickness: -1, strength: +4, charisma: -2, intelligence: -2, willpower: 0 },
  description: 'Massive and incredibly strong, trolls are living tanks. +5 Body, +4 Strength, -1 Quickness, -2 Charisma, -2 Intelligence.',
  karmaPool: 0
}
};

  // Skills data with linked attributes
  const skillsData = {
  combat: [
{ name: 'Assault Rifles', attr: 'Qui' },
{ name: 'Clubs', attr: 'Str' },
{ name: 'Cyber-Implants Combat', attr: 'Str' },
{ name: 'Edged Weapons', attr: 'Str' },
{ name: 'Gunnery', attr: 'Int' },
{ name: 'Heavy Weapons', attr: 'Str' },
{ name: 'Laser Weapons', attr: 'Qui' },
{ name: 'Launch Weapons', attr: 'Int' },
{ name: 'Pistols', attr: 'Qui' },
{ name: 'Pole Arms/Staves', attr: 'Str' },
{ name: 'Projectile Weapons', attr: 'Str' },
{ name: 'Rifles', attr: 'Qui' },
{ name: 'Shotguns', attr: 'Qui' },
{ name: 'Submachine Guns', attr: 'Qui' },
{ name: 'Throwing Weapons', attr: 'Str' },
{ name: 'Unarmed Combat', attr: 'Str' },
{ name: 'Underwater Combat', attr: 'Str' },
{ name: 'Whips', attr: 'Qui' }
  ],
  buildRepair: [
{ name: 'Assault Rifles B/R', attr: 'Int' },
{ name: 'Clubs  B/R', attr: 'Int' },
{ name: 'Cyber-Implants Combat  B/R', attr: 'Int' },
{ name: 'Diving B/R', attr: 'Int' },
{ name: 'Edged Weapons B/R', attr: 'Int' },
{ name: 'Gunnery B/R', attr: 'Int' },
{ name: 'Heavy Weapons B/R', attr: 'Int' },
{ name: 'Laser Weapons B/R', attr: 'Int' },
{ name: 'Launch Weapons B/R', attr: 'Int' },
{ name: 'Pistols (B/R)', attr: 'Int' },
{ name: 'Pole Arms/Staves B/R', attr: 'Int' },
{ name: 'Projectile Weapons B/R', attr: 'Int' },
{ name: 'Rifles B/R', attr: 'Int' },
{ name: 'Shotguns B/R', attr: 'Int' },
{ name: 'Submachine Guns B/R', attr: 'Int' },
{ name: 'Throwing Weapons B/R', attr: 'Int' },
{ name: 'Whips B/R', attr: 'Int' },
{ name: 'Computer B/R', attr: 'Int' },
{ name: 'Electronics B/R', attr: 'Int' },
{ name: 'Bike B/R', attr: 'Int' },
{ name: 'Car B/R', attr: 'Int' },
{ name: 'Hovercraft B/R', attr: 'Int' },
{ name: 'LTA Aircraft B/R', attr: 'Int' },
{ name: 'Motorboat B/R', attr: 'Int' },
{ name: 'Rotor Aircraft B/R', attr: 'Int' },
{ name: 'Sailboat B/R', attr: 'Int' },
{ name: 'Semiballistic B/R', attr: 'Int' },
{ name: 'Ship B/R', attr: 'Int' },
{ name: 'Submarine B/R', attr: 'Int' },
{ name: 'Suborbital B/R', attr: 'Int' },
{ name: 'Vectored Thrust Aircraft B/R', attr: 'Int' },
{ name: 'Winged Aircraft B/R', attr: 'Int' },
{ name: 'Tracks B/R', attr: 'Int' },
{ name: 'Walkers B/R', attr: 'Int' }
  ],
  vehicle: [
{ name: 'Bike', attr: 'Rea' },
{ name: 'Car', attr: 'Rea' },
{ name: 'Hovercraft', attr: 'Rea' },
{ name: 'LTA Aircraft', attr: 'Rea' },
{ name: 'Mechanical Arm Operation', attr: 'Rea' },
{ name: 'Motorboat', attr: 'Rea' },
{ name: 'Rotor Aircraft', attr: 'Rea' },
{ name: 'Sailboat', attr: 'Rea' },
{ name: 'Semiballistic', attr: 'Rea' },
{ name: 'Ship', attr: 'Rea' },
{ name: 'Submarine', attr: 'Rea' },
{ name: 'Suborbital', attr: 'Rea' },
{ name: 'Vectored Thrust Aircraft', attr: 'Rea' },
{ name: 'Winged Aircraft', attr: 'Rea' },
{ name: 'Tracks', attr: 'Rea' },
{ name: 'Walkers', attr: 'Rea' }
  ],
  social: [
{ name: 'Etiquette', attr: 'Cha' },
{ name: 'Instruction', attr: 'Cha' },
{ name: 'Interrogation', attr: 'Cha' },
{ name: 'Intimidation', attr: 'Cha' },
{ name: 'Leadership', attr: 'Cha' },
{ name: 'Negotiation', attr: 'Cha' }
  ],
  technical: [
{ name: 'Biotech', attr: 'Int' },
{ name: 'Computer', attr: 'Int' },
{ name: 'Demolitions', attr: 'Int' },
{ name: 'Electronics', attr: 'Int' }
  ],
  magical: [
{ name: 'Aura Reading', attr: 'Int' },
{ name: 'Sorcery', attr: 'Wil' },
{ name: 'Conjuring', attr: 'Wil' }
  ],
  physical: [
{ name: 'Athletics', attr: 'Bod' },
{ name: 'Diving', attr: 'Bod' },
{ name: 'Stealth', attr: 'Qui' }
  ]
};

  let currentStep = 0;

  // Priority selection
  function selectPriority(priority, category, element) {
  // If clicking an already selected option, deselect it
  if (element.classList.contains('selected')) {
  element.classList.remove('selected');
  delete character.priorities[priority];

  // Update completion status
  if (Object.keys(character.priorities).length < 5) {
  document.querySelector('.tab-btn[onclick="showStep(0)"]').classList.remove('completed');
}
  return;
}

  // Check if this priority or category is already assigned
  if (character.priorities[priority] && character.priorities[priority] !== category) {
  alert(`Priority ${priority} is already assigned to ${character.priorities[priority]}`);
  return;
}

  // Check if this category already has a priority
  for (let p in character.priorities) {
  if (character.priorities[p] === category && p !== priority) {
  alert(`${category} is already assigned priority ${p}`);
  return;
}
}

  // Deselect all in this priority row
  document.querySelectorAll(`[data-priority="${priority}"]`).forEach(el => {
  el.classList.remove('selected');
});

  // Deselect all in this category column
  document.querySelectorAll(`[data-category="${category}"]`).forEach(el => {
  el.classList.remove('selected');
});

  // Select this option
  element.classList.add('selected');
  character.priorities[priority] = category;

  // Check if all priorities assigned
  if (Object.keys(character.priorities).length === 5) {
  document.querySelector('.tab-btn[onclick="showStep(0)"]').classList.add('completed');
  calculateResources();
}
}

  function calculateResources() {
  // Calculate attribute points
  const attrPriority = Object.keys(character.priorities).find(key => character.priorities[key] === 'attributes');
  const attrPoints = { A: 30, B: 27, C: 24, D: 21, E: 18 };
  character.attributePoints = attrPoints[attrPriority] || 0;

  // Calculate skill points
  const skillPriority = Object.keys(character.priorities).find(key => character.priorities[key] === 'skills');
  const skillPoints = { A: 50, B: 40, C: 34, D: 30, E: 27 };
  character.skillPoints = skillPoints[skillPriority] || 0;

  // Calculate nuyen
  const resourcePriority = Object.keys(character.priorities).find(key => character.priorities[key] === 'resources');
  const nuyen = { A: 1000000, B: 400000, C: 90000, D: 20000, E: 5000 };
  character.nuyen = nuyen[resourcePriority] || 0;

  // Magic priority
  const magicPriority = Object.keys(character.priorities).find(key => character.priorities[key] === 'magic');
  character.magicPriority = magicPriority;
}

  // Navigation
  function showStep(step) {
  document.querySelectorAll('.step-content').forEach(content => {
    content.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.classList.remove('active');
});

  document.getElementById(`step-${step}`).classList.add('active');
  document.querySelectorAll('.tab-btn')[step].classList.add('active');
  currentStep = step;

  // Initialize step content
  if (step === 1) initRaceStep();
  if (step === 2) initMagicStep();
  if (step === 3) initAttributesStep();
  if (step === 4) initSkillsStep();
  if (step === 5) initResourcesStep();
  if (step === 8) generateCharacterSheet();
}

 /* function nextStep() {
  const current = currentStep; // assume you track this globally
  if (!validateStep(current)) {
  return; // block navigation if invalid
}
  showStep(current + 1);
}*/

  function nextStep() {
    if(currentStep < 8) {
      showStep(currentStep + 1);
    }
  }


  function prevStep() {
  if (currentStep > 0) {
  showStep(currentStep - 1);
}
}

  /*function validateStep(stepIndex) {
  switch (stepIndex) {
  case 0: return validatePriorities();          // Step 1: Priority System
  case 1: return validateRace();                // Step 2: Race
  case 2: return validateMagic();               // Step 3: Magic
  case 3: return validateAttributes();          // Step 4: Attributes
  case 4: return validateSkillsAndKnowledge();  // Step 5: Skills
  case 5: return validateResources();           // Step 6: Resources
  case 6: return validateEdgesFlaws();          // Step 7: Edges & Flaws
  case 7: return validateFinalTouches();        // Step 8: Final Touches
  default: return true;
}
}*/

  // Race step
  function initRaceStep() {
  const racePriority = Object.keys(character.priorities).find(key => character.priorities[key] === 'race');
  const availableRaces = [];

  for (let race in races) {
  if ((racePriority === 'C' && (race === 'elf' || race === 'troll')) ||
  (racePriority === 'D' && (race === 'dwarf' || race === 'ork')) ||
  (racePriority === 'E' && race === 'human')) {
  availableRaces.push(race);
}
}

  document.getElementById('available-races').textContent = availableRaces.map(r => races[r].name).join(', ');

  const grid = document.getElementById('race-grid');
  grid.innerHTML = '';

  availableRaces.forEach(raceKey => {
  const race = races[raceKey];
  const card = document.createElement('div');
  card.className = 'selection-card';
  if (character.race === raceKey) card.classList.add('selected');

  const attrMods = [];
  for (let attr in race.modifiers) {
  const mod = race.modifiers[attr];
  if (mod !== 0) {
  const sign = mod > 0 ? '+' : '';
  attrMods.push(`${attr.charAt(0).toUpperCase() + attr.slice(1)} ${sign}${mod}`);
}
}

  card.innerHTML = `
                    <h4>${race.name}</h4>
                    <p class="stats">${race.description}</p>
                    ${attrMods.length > 0 ? `<p class="stats" style="color: var(--accent-primary); margin-top: 10px; font-weight: bold;">${attrMods.join(', ')}</p>` : ''}
                `;
  card.onclick = () => selectRace(raceKey, card);
  grid.appendChild(card);
});

  // Auto-select Human if Race Priority E (only one option)
  if (racePriority === 'E' && availableRaces.length === 1) {
  selectRace('human', grid.querySelector('.selection-card'));
}
}

  function selectRace(raceKey, element) {
  document.querySelectorAll('#race-grid .selection-card').forEach(card => {
    card.classList.remove('selected');
  });
  element.classList.add('selected');
  character.race = raceKey;
  character.raceData = races[raceKey];

  // Set attributes to race minimums (which already include modifiers)
  for (let attr in character.raceData.attributes) {
  character.attributes[attr] = character.raceData.attributes[attr][0];
}

  // Set default karma pool based on race
  character.karmaPool = races[raceKey].karmaPool || 0;
  document.getElementById('karma-pool').value = character.karmaPool;

  document.querySelector('.tab-btn[onclick="showStep(1)"]').classList.add('completed');
}

  // Magic step
  function initMagicStep() {
  const magicPriority = character.magicPriority;
  document.getElementById('magic-priority-display').textContent = `Priority ${magicPriority}`;

  const container = document.getElementById('magic-selection');
  container.innerHTML = '';

  let options = [];
  if (magicPriority === 'A') {
  options = [
{ type: 'full-mage', name: 'Full Magician (Hermetic)', desc: 'Magic 6, Hermetic tradition', tradition: 'Hermetic' },
{ type: 'full-shaman', name: 'Full Magician (Shamanic)', desc: 'Magic 6, Shamanic tradition', tradition: 'Shamanic' }
  ];
} else if (magicPriority === 'B') {
  options = [
{ type: 'adept', name: 'Adept', desc: 'Magic 6, can purchase adept powers' },
{ type: 'aspected-mage', name: 'Aspected Magician (Hermetic)', desc: 'Magic 6, limited to one magical category', tradition: 'Hermetic' },
{ type: 'aspected-shaman', name: 'Aspected Magician (Shamanic)', desc: 'Magic 6, limited to one magical category', tradition: 'Shamanic' }
  ];
} else {
  // C, D or E -> automatically Mundane
  options = [{ type: 'mundane', name: 'Mundane', desc: 'No magical abilities' }];
}

  const grid = document.createElement('div');
  grid.className = 'selection-grid';

  options.forEach(option => {
  const card = document.createElement('div');
  card.className = 'selection-card';
  if (character.magic === option.type && (!option.tradition || character.magicTradition === option.tradition)) {
  card.classList.add('selected');
}

  card.innerHTML = `
            <h4>${option.name}</h4>
            <p class="stats">${option.desc}</p>
        `;

  // Set onclick for all cards - pass the grid directly
  card.onclick = () => {
  // Deselect all cards in this grid
  grid.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
  // Select this card
  card.classList.add('selected');
  // Update character data
  character.magic = option.type;
  character.magicTradition = option.tradition || null;
  // Mark step as completed
  document.querySelector('.tab-btn[onclick="showStep(2)"]').classList.add('completed');
};

  grid.appendChild(card);
});

  container.appendChild(grid);

  // Auto-select Mundane when Magic priority is C, D or E
  if (magicPriority !== 'A' && magicPriority !== 'B') {
  character.magic = 'mundane';
  character.magicTradition = null;
  // Visually mark the only card as selected
  const onlyCard = grid.querySelector('.selection-card');
  if (onlyCard) onlyCard.classList.add('selected');
  document.querySelector('.tab-btn[onclick="showStep(2)"]').classList.add('completed');
}
}

  // You can remove the separate selectMagic function if you have one, or keep it as a backup
  function selectMagic(type, tradition, element, grid) {
  grid.querySelectorAll('.selection-card').forEach(card => {
    card.classList.remove('selected');
  });
  element.classList.add('selected');
  character.magic = type;
  character.magicTradition = tradition;
  document.querySelector('.tab-btn[onclick="showStep(2)"]').classList.add('completed');
}



  // Attributes step
  function initAttributesStep() {
  const grid = document.getElementById('attributes-grid');
  grid.innerHTML = '';

  const attrNames = ['body', 'quickness', 'strength', 'charisma', 'intelligence', 'willpower'];

  attrNames.forEach(attr => {
  const min = character.raceData.attributes[attr][0];
  const max = character.raceData.attributes[attr][1];
  const current = character.attributes[attr];

  const item = document.createElement('div');
  item.className = 'attr-item';
  item.innerHTML = `
                    <label>
                        <span>${attr.charAt(0).toUpperCase() + attr.slice(1)}</span>
                        <span class="attr-value">${current}/${max}</span>
                    </label>
                    <div class="attr-controls">
                        <button onclick="changeAttribute('${attr}', -1)">-</button>
                        <div class="value-display">${current}</div>
                        <button onclick="changeAttribute('${attr}', 1)">+</button>
                    </div>
                `;
  grid.appendChild(item);
});

  updateAttributePoints();
  updateDerivedStats();
}

  function changeAttribute(attr, delta) {
  const min = character.raceData.attributes[attr][0];
  const max = character.raceData.attributes[attr][1];
  const newValue = character.attributes[attr] + delta;

  // Check boundaries
  if (newValue < min || newValue > max) return;

  // Check points
  const pointsUsed = calculateUsedAttributePoints();
  if (delta > 0 && pointsUsed >= character.attributePoints) return;

  character.attributes[attr] = newValue;
  initAttributesStep();
}

  function calculateUsedAttributePoints() {
  let used = 0;
  for (let attr in character.attributes) {
  const min = character.raceData.attributes[attr][0];
  used += character.attributes[attr] - min;
}
  return used;
}

  function updateAttributePoints() {
  const used = calculateUsedAttributePoints();
  const remaining = character.attributePoints - used;
  document.getElementById('attr-points-remaining').textContent = remaining;
  if (used > 0) {
  document.querySelector('.tab-btn[onclick="showStep(3)"]').classList.add('completed');
}
}

  function updateDerivedStats() {
  const reaction = Math.floor((character.attributes.quickness + character.attributes.intelligence) / 2);
  const initiative = reaction + '+1d6';

  document.getElementById('reaction-display').textContent = reaction;
  document.getElementById('initiative-display').textContent = initiative;
  document.getElementById('essence-display').textContent = character.essence.toFixed(1);
}

  // Skills step
  function initSkillsStep() {
  const categories = ['combat', 'magical', 'physical', 'social', 'technical', 'vehicle', 'buildRepair'];

  // Hide magical skills if character is mundane
  const magicalHeader = document.getElementById('magical-skills-header');
  const magicalList = document.getElementById('magical-skills');
  if (character.magic === 'mundane' || !character.magic) {
  if (magicalHeader) magicalHeader.style.display = 'none';
  if (magicalList) magicalList.style.display = 'none';
} else {
  if (magicalHeader) magicalHeader.style.display = '';
  if (magicalList) magicalList.style.display = '';
}

  categories.forEach(category => {
  const container = document.getElementById(`${category}-skills`);
  container.innerHTML = '';

  skillsData[category].forEach(skillObj => {
  const skillKey = skillObj.name;
  const skillData = character.skills[skillKey] || { rating: 0, specialization: '' };
  const rating = skillData.rating || 0;
  const spec = skillData.specialization || '';

  // Calculate cost indicator
  const linkedAttr = getSkillLinkedAttribute(skillKey);
  const attrValue = character.attributes[linkedAttr] || 1;
  const nextCost = ((rating + 1) > attrValue) ? 2 : 1;
  const costIndicator = rating < 6 ? `<span style="font-size: 0.75em; color: var(--text-secondary); margin-left: 5px;">(${nextCost}pt)</span>` : '';

  const item = document.createElement('div');
  item.className = 'skill-item';
  item.innerHTML = `
                        <div style="flex: 1;">
                            <span class="skill-name">${skillObj.name}</span>
                            <span class="skill-attr">(${skillObj.attr})</span>
                            ${spec ? `<span class="skill-spec">[${spec}]</span>` : ''}
                            ${rating > attrValue ? `<span style="font-size: 0.75em; color: var(--warning); margin-left: 8px;">⚠ Above Attribute</span>` : ''}
                        </div>
                        <div class="skill-controls">
                            <button class="btn btn-secondary" onclick="changeSkill('${skillKey}', -1)" ${rating === 0 ? 'disabled' : ''}>-</button>
                            <span style="width: 60px; text-align: center; font-weight: bold; color: var(--accent-primary);">${rating}${costIndicator}</span>
                            <button class="btn btn-secondary" onclick="changeSkill('${skillKey}', 1)" ${rating === 6 ? 'disabled' : ''}>+</button>
                            <button class="btn btn-secondary" onclick="addSpecialization('${skillKey}')" ${rating === 0 ? 'disabled' : ''} title="Add specialization">Spec</button>
                            ${spec ? `<button class="btn btn-secondary" onclick="removeSpecialization('${skillKey}')" title="Remove specialization">✕</button>` : ''}
                        </div>
                    `;
  container.appendChild(item);
});
});

  // Knowledge skills
  const knowledgeContainer = document.getElementById('knowledge-skills');
  knowledgeContainer.innerHTML = '';
  const knowledgeSkills = Object.keys(character.knowledgeSkills);
  if (knowledgeSkills.length === 0) {
  knowledgeContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 15px;">No knowledge skills added yet. Click "+ Add Knowledge Skill" above.</p>';
} else {
  for (let skill in character.knowledgeSkills) {
  const rating = character.knowledgeSkills[skill];
  const item = document.createElement('div');
  item.className = 'skill-item';
  item.innerHTML = `
                        <div style="flex: 1;">
                            <span class="skill-name">${skill}</span>
                            <span class="skill-attr">(Int)</span>
                        </div>
                        <div class="skill-controls">
                            <button class="btn btn-secondary" onclick="changeKnowledgeSkill('${skill}', -1)">-</button>
                            <span style="width: 40px; text-align: center; font-weight: bold; color: var(--accent-primary);">${rating}</span>
                            <button class="btn btn-secondary" onclick="changeKnowledgeSkill('${skill}', 1)" ${rating === 6 ? 'disabled' : ''}>+</button>
                            <button class="btn btn-secondary" onclick="removeKnowledgeSkill('${skill}')" title="Remove skill">✕</button>
                        </div>
                    `;
  knowledgeContainer.appendChild(item);
}
}

  // Update knowledge points display
  const knowledgeUsed = calculateUsedKnowledgePoints();
  const knowledgeMax = character.attributes.intelligence * 5;
  document.getElementById('knowledge-points-display').textContent = `${knowledgeMax - knowledgeUsed}/${knowledgeMax}`;

  // Language skills
  const languageContainer = document.getElementById('language-skills');
  languageContainer.innerHTML = '';
  const languageSkills = Object.keys(character.languageSkills);
  if (languageSkills.length === 0) {
  languageContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 15px;">No languages added yet. Click "+ Add Language Skill" above.</p>';
} else {
  for (let skill in character.languageSkills) {
  const rating = character.languageSkills[skill];
  const item = document.createElement('div');
  item.className = 'skill-item';
  item.innerHTML = `
                        <div style="flex: 1;">
                            <span class="skill-name">${skill}</span>
                            <span class="skill-attr">(Int)</span>
                        </div>
                        <div class="skill-controls">
                            <button class="btn btn-secondary" onclick="changeLanguageSkill('${skill}', -1)">-</button>
                            <span style="width: 40px; text-align: center; font-weight: bold; color: var(--accent-primary);">${rating}</span>
                            <button class="btn btn-secondary" onclick="changeLanguageSkill('${skill}', 1)" ${rating === 6 ? 'disabled' : ''}>+</button>
                            <button class="btn btn-secondary" onclick="removeLanguageSkill('${skill}')" title="Remove language">✕</button>
                        </div>
                    `;
  languageContainer.appendChild(item);
}
}

  // Update language points display
  const languageUsed = calculateUsedLanguagePoints();
  const languageMax = Math.floor(character.attributes.intelligence * 1.5);
  document.getElementById('language-points-display').textContent = `${languageMax - languageUsed}/${languageMax}`;

  updateSkillPoints();
}

  function changeSkill(skill, delta) {
  const skillData = character.skills[skill] || { rating: 0, specialization: '' };
  const current = skillData.rating || 0;
  const newValue = current + delta;

  if (newValue < 0 || newValue > 6) return;

  // Calculate point cost difference
  const pointsUsed = calculateUsedSkillPoints();
  const linkedAttr = getSkillLinkedAttribute(skill);
  const attrValue = character.attributes[linkedAttr] || 1;

  // Calculate cost for the new level
  let costDelta = 0;
  if (delta > 0) {
  // Adding a point
  costDelta = (newValue > attrValue) ? 2 : 1;
  if (pointsUsed + costDelta > character.skillPoints) {
  alert('Not enough skill points remaining!');
  return;
}
} else if (delta < 0) {
  // Removing a point - refund what it cost
  costDelta = -(current > attrValue ? 2 : 1);
}

  if (newValue === 0) {
  delete character.skills[skill];
} else {
  character.skills[skill] = { rating: newValue, specialization: skillData.specialization || '' };
}

  initSkillsStep();
}

  function getSkillLinkedAttribute(skillName) {
  for (let category in skillsData) {
  const skill = skillsData[category].find(s => s.name === skillName);
  if (skill) {
  const attrMap = { 'Str': 'strength', 'Qui': 'quickness', 'Int': 'intelligence', 'Wil': 'willpower', 'Cha': 'charisma', 'Bod': 'body' };
  return attrMap[skill.attr] || 'intelligence';
}
}
  return 'intelligence';
}

  function addSpecialization(skill) {
  const spec = prompt('Enter specialization for ' + skill + ':\n\nSpecializations give +2 dice when applicable.');
  if (spec && spec.trim()) {
  if (!character.skills[skill]) character.skills[skill] = { rating: 0, specialization: '' };
  character.skills[skill].specialization = spec.trim();
  initSkillsStep();
}
}

  function removeSpecialization(skill) {
  if (character.skills[skill]) {
  character.skills[skill].specialization = '';
  initSkillsStep();
}
}

  function addKnowledgeSkill() {
  const name = prompt('Knowledge Skill name:');
  if (name && name.trim()) {
  character.knowledgeSkills[name.trim()] = 1;
  initSkillsStep();
}
}

  function changeKnowledgeSkill(skill, delta) {
  const current = character.knowledgeSkills[skill] || 0;
  const newValue = current + delta;
  const maxPoints = character.attributes.intelligence * 5;

  if (newValue < 0 || newValue > 6) return;

  const pointsUsed = calculateUsedKnowledgePoints();
  if (delta > 0 && pointsUsed >= maxPoints) {
  alert('No knowledge skill points remaining!');
  return;
}

  if (newValue === 0) {
  delete character.knowledgeSkills[skill];
} else {
  character.knowledgeSkills[skill] = newValue;
}

  initSkillsStep();
}

  function removeKnowledgeSkill(skill) {
  delete character.knowledgeSkills[skill];
  initSkillsStep();
}

  function addLanguageSkill() {
  const name = prompt('Language name:');
  if (name && name.trim()) {
  character.languageSkills[name.trim()] = 1;
  initSkillsStep();
}
}

  function changeLanguageSkill(skill, delta) {
  const current = character.languageSkills[skill] || 0;
  const newValue = current + delta;
  const maxPoints = Math.floor(character.attributes.intelligence * 1.5);

  if (newValue < 0 || newValue > 6) return;

  const pointsUsed = calculateUsedLanguagePoints();
  if (delta > 0 && pointsUsed >= maxPoints) {
  alert('No language skill points remaining!');
  return;
}

  if (newValue === 0) {
  delete character.languageSkills[skill];
} else {
  character.languageSkills[skill] = newValue;
}

  initSkillsStep();
}

  function removeLanguageSkill(skill) {
  delete character.languageSkills[skill];
  initSkillsStep();
}

  function calculateUsedSkillPoints() {
  let used = 0;
  for (let skill in character.skills) {
  const skillData = character.skills[skill];
  const rating = skillData.rating || 0;
  const linkedAttr = getSkillLinkedAttribute(skill);
  const attrValue = character.attributes[linkedAttr] || 1;

  // Points cost 1 each until rating exceeds linked attribute, then 2 each
  for (let i = 1; i <= rating; i++) {
  used += (i > attrValue) ? 2 : 1;
}
}
  return used;
}

  function calculateUsedKnowledgePoints() {
  let used = 0;
  for (let skill in character.knowledgeSkills) {
  used += character.knowledgeSkills[skill];
}
  return used;
}

  function calculateUsedLanguagePoints() {
  let used = 0;
  for (let skill in character.languageSkills) {
  used += character.languageSkills[skill];
}
  return used;
}

  function updateSkillPoints() {
  const used = calculateUsedSkillPoints();
  const remaining = character.skillPoints - used;
  const knowledgeUsed = calculateUsedKnowledgePoints();
  const knowledgeMax = character.attributes.intelligence * 5;
  const languageUsed = calculateUsedLanguagePoints();
  const languageMax = Math.floor(character.attributes.intelligence * 1.5);

  const display = document.getElementById('skill-points-remaining');
  display.innerHTML = `${remaining} <span style="font-size: 0.85em; opacity: 0.8;">(Knowledge: ${knowledgeUsed}/${knowledgeMax} | Language: ${languageUsed}/${languageMax})</span>`;

  if (used > 0) {
  document.querySelector('.tab-btn[onclick="showStep(4)"]').classList.add('completed');
}
}

  // Resources step
  function selectLifestyle() {
  const select = document.getElementById('lifestyle-select');
  const value = select.value;
  const descDiv = document.getElementById('lifestyle-description');
  const descText = document.getElementById('lifestyle-desc-text');

  const lifestyles = {
  street: { cost: 0, desc: 'Living on the streets with no permanent shelter. Constant danger and no amenities.' },
  squatter: { cost: 500, desc: 'Abandoned buildings or slums. Basic shelter but unsafe and uncomfortable.' },
  low: { cost: 1000, desc: 'Small apartment in a bad neighborhood. Basic utilities and security.' },
  middle: { cost: 5000, desc: 'Decent apartment or small house in an average area. Comfortable and relatively safe.' },
  high: { cost: 10000, desc: 'Large condo or house in a good neighborhood. Excellent amenities and security.' },
  luxury: { cost: 100000, desc: 'Penthouse, mansion, or estate. Top-tier security, amenities, and location.' }
};

  if (value && lifestyles[value]) {
  character.lifestyle = value;
  character.lifestyleCost = lifestyles[value].cost;
  descText.textContent = lifestyles[value].desc + ` (${lifestyles[value].cost.toLocaleString()}¥/month)`;
  descDiv.style.display = 'block';
} else {
  descDiv.style.display = 'none';
}
}

  function initResourcesStep() {
  updateNuyenDisplay();

  // Restore lifestyle selection if exists
  if (character.lifestyle) {
  document.getElementById('lifestyle-select').value = character.lifestyle;
  selectLifestyle();
}
}

  function updateNuyenDisplay() {
  const spent = calculateSpentNuyen();
  const remaining = character.nuyen - spent;
  document.getElementById('nuyen-remaining').textContent = remaining.toLocaleString();
}

  function calculateSpentNuyen() {
  let total = 0;

  // Sum all equipment costs
  character.equipment.cyberware.forEach(item => total += item.cost);
  character.equipment.weapons.forEach(item => total += item.cost);
  character.equipment.armor.forEach(item => total += item.cost);
  character.equipment.equipment.forEach(item => total += item.cost);

  return total;
}

  function addCyberware() {
  const name = prompt('Cyberware name:');
  const cost = parseInt(prompt('Cost in Nuyen:')) || 0;
  const essence = parseFloat(prompt('Essence cost:')) || 0;

  if (name) {
  character.equipment.cyberware.push({ name, cost, essence });
  character.essence -= essence;
  updateResourcesList();
  document.getElementById('essence-display').textContent = character.essence.toFixed(1);
}
}

  function addQuickCyberware() {
  const cyberwareOptions = [
{ name: 'Smartlink', cost: 3000, essence: 0.2 },
{ name: 'Cybereyes (Basic)', cost: 3000, essence: 0.2 },
{ name: 'Datajack', cost: 1000, essence: 0.2 },
{ name: 'Wired Reflexes Level 1', cost: 38000, essence: 2.0 },
{ name: 'Muscle Replacement Level 1', cost: 35000, essence: 1.0 },
{ name: 'Dermal Plating Level 1', cost: 6000, essence: 0.5 },
{ name: 'Cybernetic Arm', cost: 15000, essence: 1.0 },
{ name: 'Boosted Reflexes Level 1', cost: 15000, essence: 0.6 },
{ name: 'Radio', cost: 2000, essence: 0.1 },
{ name: 'Skillwires Rating 3', cost: 20000, essence: 0.4 }
  ];

  let optionText = 'Select cyberware to add:\n\n';
  cyberwareOptions.forEach((item, i) => {
  optionText += `${i + 1}. ${item.name} - ${item.cost.toLocaleString()}¥ (Essence: ${item.essence})\n`;
});

  const selection = prompt(optionText + '\nEnter number (1-' + cyberwareOptions.length + '):');
  const index = parseInt(selection) - 1;

  if (index >= 0 && index < cyberwareOptions.length) {
  const selected = cyberwareOptions[index];
  character.equipment.cyberware.push({
  name: selected.name,
  cost: selected.cost,
  essence: selected.essence
});
  character.essence -= selected.essence;
  updateResourcesList();
  document.getElementById('essence-display').textContent = character.essence.toFixed(1);

  // Update character sheet essence if visible
  if (document.getElementById('sheet-essence')) {
  document.getElementById('sheet-essence').textContent = character.essence.toFixed(1);
}
}
}

  function addWeapon() {
  const name = prompt('Weapon name:');
  const cost = parseInt(prompt('Cost in Nuyen:')) || 0;
  if (name) {
  character.equipment.weapons.push({ name, cost });
  updateResourcesList();
}
}

  function addQuickWeapon() {
  const weaponOptions = [
{ name: 'Ares Predator (Heavy Pistol)', cost: 450 },
{ name: 'Colt Manhunter (Heavy Pistol)', cost: 350 },
{ name: 'Fichetti Security 500 (Light Pistol)', cost: 200 },
{ name: 'AK-97 (Assault Rifle)', cost: 950 },
{ name: 'HK 227 (SMG)', cost: 750 },
{ name: 'Remington 990 (Shotgun)', cost: 500 },
{ name: 'Uzi III (SMG)', cost: 350 },
{ name: 'Katana', cost: 1000 },
{ name: 'Monofilament Whip', cost: 500 },
{ name: 'Combat Knife', cost: 50 }
  ];

  let optionText = 'Select weapon to add:\n\n';
  weaponOptions.forEach((item, i) => {
  optionText += `${i + 1}. ${item.name} - ${item.cost.toLocaleString()}¥\n`;
});

  const selection = prompt(optionText + '\nEnter number (1-' + weaponOptions.length + '):');
  const index = parseInt(selection) - 1;

  if (index >= 0 && index < weaponOptions.length) {
  const selected = weaponOptions[index];
  character.equipment.weapons.push({
  name: selected.name,
  cost: selected.cost
});
  updateResourcesList();
}
}

  function addArmor() {
  const name = prompt('Armor name:');
  const cost = parseInt(prompt('Cost in Nuyen:')) || 0;
  const rating = parseInt(prompt('Armor rating:')) || 0;
  if (name) {
  character.equipment.armor.push({ name, cost, rating });
  updateResourcesList();
}
}

  function addQuickArmor() {
  const armorOptions = [
{ name: 'Armor Clothing', cost: 500, rating: 4 },
{ name: 'Armor Jacket', cost: 900, rating: 5 },
{ name: 'Armor Vest', cost: 400, rating: 3 },
{ name: 'Full Suit (Light)', cost: 1800, rating: 6 },
{ name: 'Full Suit (Heavy)', cost: 2500, rating: 8 },
{ name: 'Lined Coat', cost: 700, rating: 4 },
{ name: 'Secure Jacket', cost: 1200, rating: 5 },
{ name: 'Urban Explorer Jumpsuit', cost: 650, rating: 3 }
  ];

  let optionText = 'Select armor to add:\n\n';
  armorOptions.forEach((item, i) => {
  optionText += `${i + 1}. ${item.name} (Rating ${item.rating}) - ${item.cost.toLocaleString()}¥\n`;
});

  const selection = prompt(optionText + '\nEnter number (1-' + armorOptions.length + '):');
  const index = parseInt(selection) - 1;

  if (index >= 0 && index < armorOptions.length) {
  const selected = armorOptions[index];
  character.equipment.armor.push({
  name: selected.name,
  cost: selected.cost,
  rating: selected.rating
});
  updateResourcesList();
}
}

  function addEquipment() {
  const name = prompt('Equipment name:');
  const cost = parseInt(prompt('Cost in Nuyen:')) || 0;
  if (name) {
  character.equipment.equipment.push({ name, cost });
  updateResourcesList();
}
}

  function addVehicle() {
  const name = prompt('Vehicle name:');
  const type = prompt('Vehicle type (bike, car, truck, etc.):');
  const cost = parseInt(prompt('Cost in Nuyen:')) || 0;
  const handling = parseInt(prompt('Handling rating:')) || 0;
  const speed = parseInt(prompt('Speed rating:')) || 0;
  const body = parseInt(prompt('Body rating:')) || 0;
  const armor = parseInt(prompt('Armor rating:')) || 0;
  if (name) {
  character.equipment.vehicles.push({ name, type, cost, handling, speed, body, armor });
  updateResourcesList();
}
}

  function addContact() {
  const name = prompt('Contact name:');
  const role = prompt('Contact role/profession:');
  const loyalty = parseInt(prompt('Loyalty (1-6):')) || 1;
  if (name && role) {
  character.contacts.push({ name, role, loyalty });
  updateContactsList();
}
}

  function updateResourcesList() {
  // Cyberware
  const cyberList = document.getElementById('cyberware-list');
  cyberList.innerHTML = character.equipment.cyberware.length > 0
  ? character.equipment.cyberware.map((item, i) => `
                    <div class="list-item">
                        <span>${item.name} (Essence: ${item.essence})</span>
                        <span>${item.cost.toLocaleString()}¥</span>
                        <button class="btn btn-secondary" onclick="removeItem('cyberware', ${i})" style="margin-left: 10px;">✕</button>
                    </div>
                `).join('')
  : '<p style="color: var(--text-secondary); padding: 15px;">No cyberware added yet.</p>';

  // Weapons
  const weaponsList = document.getElementById('weapons-list');
  weaponsList.innerHTML = character.equipment.weapons.length > 0
  ? character.equipment.weapons.map((item, i) => `
                    <div class="list-item">
                        <span>${item.name}</span>
                        <span>${item.cost.toLocaleString()}¥</span>
                        <button class="btn btn-secondary" onclick="removeItem('weapons', ${i})" style="margin-left: 10px;">✕</button>
                    </div>
                `).join('')
  : '<p style="color: var(--text-secondary); padding: 15px;">No weapons added yet.</p>';

  // Armor
  const armorList = document.getElementById('armor-list');
  armorList.innerHTML = character.equipment.armor.length > 0
  ? character.equipment.armor.map((item, i) => `
                    <div class="list-item">
                        <span>${item.name} (Rating: ${item.rating})</span>
                        <span>${item.cost.toLocaleString()}¥</span>
                        <button class="btn btn-secondary" onclick="removeItem('armor', ${i})" style="margin-left: 10px;">✕</button>
                    </div>
                `).join('')
  : '<p style="color: var(--text-secondary); padding: 15px;">No armor added yet.</p>';

  // Equipment
  const equipList = document.getElementById('equipment-list');
  equipList.innerHTML = character.equipment.equipment.length > 0
  ? character.equipment.equipment.map((item, i) => `
                    <div class="list-item">
                        <span>${item.name}</span>
                        <span>${item.cost.toLocaleString()}¥</span>
                        <button class="btn btn-secondary" onclick="removeItem('equipment', ${i})" style="margin-left: 10px;">✕</button>
                    </div>
                `).join('')
  : '<p style="color: var(--text-secondary); padding: 15px;">No equipment added yet.</p>';

  // Vehicles
  const vehiclesList = document.getElementById('vehicles-list');
  vehiclesList.innerHTML = character.equipment.vehicles.length > 0
  ? character.equipment.vehicles.map((item, i) => `
                    <div class="list-item">
                        <span>${item.name} (${item.type}) - Handling: ${item.handling}, Speed: ${item.speed}, Body: ${item.body}, Armor: ${item.armor}</span>
                        <span>${item.cost.toLocaleString()}¥</span>
                        <button class="btn btn-secondary" onclick="removeItem('vehicles', ${i})" style="margin-left: 10px;">✕</button>
                    </div>
                `).join('')
  : '<p style="color: var(--text-secondary); padding: 15px;">No vehicles added yet.</p>';

  updateNuyenDisplay();
}

  function updateContactsList() {
  const contactsList = document.getElementById('contacts-list');
  contactsList.innerHTML = character.contacts.length > 0
  ? character.contacts.map((item, i) => `
                    <div class="contact-item">
                        <div><strong>${item.name}</strong> - ${item.role}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9em; margin-top: 5px;">Loyalty: ${item.loyalty}</div>
                        <button class="btn btn-secondary" onclick="removeContact(${i})" style="margin-top: 10px;">✕ Remove</button>
                    </div>
                `).join('')
  : '<p style="color: var(--text-secondary); padding: 15px;">No contacts added yet.</p>';
}

  function removeItem(category, index) {
  character.equipment[category].splice(index, 1);
  updateResourcesList();
}

  function removeContact(index) {
  character.contacts.splice(index, 1);
  updateContactsList();
}

  // Edges & Flaws
  function addEdge(name, cost) {
  character.edgesFlaws.push({ name, cost, type: 'edge' });
  updateEdgesFlawsList();
}

  function addFlaw(name, benefit) {
  character.edgesFlaws.push({ name, cost: -benefit, type: 'flaw' });
  updateEdgesFlawsList();
}

  function updateEdgesFlawsList() {
  const container = document.getElementById('selected-edges-flaws');
  if (character.edgesFlaws.length === 0) {
  container.innerHTML = '<p style="color: var(--text-secondary);">None selected</p>';
} else {
  container.innerHTML = character.edgesFlaws.map((item, i) => `
                    <div class="list-item">
                        <span>${item.name}</span>
                        <span style="color: ${item.type === 'edge' ? 'var(--error)' : 'var(--accent-primary)'};">
                            ${item.cost > 0 ? '-' : '+'}${Math.abs(item.cost)}
                        </span>
                        <button class="btn btn-secondary" onclick="removeEdgeFlaw(${i})">Remove</button>
                    </div>
                `).join('');
}

  const total = character.edgesFlaws.reduce((sum, item) => sum + item.cost, 0);
  document.getElementById('edge-flaw-points').textContent = -total;

  if (character.edgesFlaws.length > 0) {
  document.querySelector('.tab-btn[onclick="showStep(6)"]').classList.add('completed');
}
}

  function removeEdgeFlaw(index) {
  character.edgesFlaws.splice(index, 1);
  updateEdgesFlawsList();
}

  // Final touches
  function finalizeCharacter() {
  character.name = document.getElementById('char-name').value;
  character.streetName = document.getElementById('street-name').value;
  character.age = document.getElementById('char-age').value;
  character.gender = document.getElementById('char-gender').value;
  character.description = document.getElementById('char-description').value;
  character.karmaPool = parseInt(document.getElementById('karma-pool').value) || 0;

  document.querySelector('.tab-btn[onclick="showStep(7)"]').classList.add('completed');
  showStep(8);
}

  // Generate character sheet
  function generateCharacterSheet() {
  document.getElementById('sheet-name').textContent = character.name || '-';
  document.getElementById('sheet-street-name').textContent = character.streetName || '-';
  document.getElementById('sheet-race').textContent = character.raceData ? character.raceData.name : '-';
  document.getElementById('sheet-age').textContent = character.age || '-';
  document.getElementById('sheet-gender').textContent = character.gender || '-';
  document.getElementById('sheet-description').textContent = character.description || '-';

  // Attributes
  const attrGrid = document.getElementById('sheet-attributes');
  attrGrid.innerHTML = '';
  for (let attr in character.attributes) {
  attrGrid.innerHTML += `
                    <div class="sheet-item">
                        <span class="sheet-label">${attr.charAt(0).toUpperCase() + attr.slice(1)}:</span>
                        <span class="sheet-value">${character.attributes[attr]}</span>
                    </div>
                `;
}

  // Derived attributes
  const reaction = Math.floor((character.attributes.quickness + character.attributes.intelligence) / 2);
  const combatPool = Math.floor((character.attributes.quickness + character.attributes.intelligence + character.attributes.willpower) / 2);

  document.getElementById('sheet-reaction').textContent = reaction;
  document.getElementById('sheet-initiative').textContent = reaction + '+1d6';
  document.getElementById('sheet-essence').textContent = character.essence.toFixed(1);
  document.getElementById('sheet-combat-pool').textContent = combatPool;
  document.getElementById('sheet-karma-pool').textContent = character.karmaPool;

  // Magic
  let magicRating = 0;
  if (character.magic === 'full-mage' || character.magic === 'full-shaman' || character.magic === 'aspected' || character.magic === 'adept') {
  magicRating = 6;
}
  document.getElementById('sheet-magic').textContent = magicRating;

  // Skills
  const skillsContainer = document.getElementById('sheet-skills');
  skillsContainer.innerHTML = '';

  // Active skills
  for (let skill in character.skills) {
  const skillData = character.skills[skill];
  const rating = skillData.rating || 0;
  const spec = skillData.specialization || '';
  skillsContainer.innerHTML += `
                    <div class="list-item">
                        <span>${skill}${spec ? ' [' + spec + ']' : ''}</span>
                        <span class="sheet-value">${rating}</span>
                    </div>
                `;
}

  // Knowledge skills
  if (Object.keys(character.knowledgeSkills).length > 0) {
  skillsContainer.innerHTML += '<div style="margin-top: 15px; font-weight: bold; color: var(--accent-secondary);">Knowledge Skills:</div>';
  for (let skill in character.knowledgeSkills) {
  skillsContainer.innerHTML += `
                        <div class="list-item">
                            <span>${skill}</span>
                            <span class="sheet-value">${character.knowledgeSkills[skill]}</span>
                        </div>
                    `;
}
}

  // Language skills
  if (Object.keys(character.languageSkills).length > 0) {
  skillsContainer.innerHTML += '<div style="margin-top: 15px; font-weight: bold; color: var(--accent-secondary);">Languages:</div>';
  for (let skill in character.languageSkills) {
  skillsContainer.innerHTML += `
                        <div class="list-item">
                            <span>${skill}</span>
                            <span class="sheet-value">${character.languageSkills[skill]}</span>
                        </div>
                    `;
}
}

  // Equipment
  const equipContainer = document.getElementById('sheet-equipment');
  equipContainer.innerHTML = '';

  character.equipment.cyberware.forEach(item => {
  equipContainer.innerHTML += `<div class="list-item"><span>Cyberware: ${item.name}</span></div>`;
});
  character.equipment.weapons.forEach(item => {
  equipContainer.innerHTML += `<div class="list-item"><span>Weapon: ${item.name}</span></div>`;
});
  character.equipment.armor.forEach(item => {
  equipContainer.innerHTML += `<div class="list-item"><span>Armor: ${item.name} (${item.rating})</span></div>`;
});
  character.equipment.equipment.forEach(item => {
  equipContainer.innerHTML += `<div class="list-item"><span>${item.name}</span></div>`;
});
  character.equipment.vehicles.forEach(item => {
  equipContainer.innerHTML += `<div class="list-item"><span>Vehicle: ${item.name} (${item.type}) - H:${item.handling} S:${item.speed} B:${item.body} A:${item.armor}</span></div>`;
});

  // Edges & Flaws
  const edgesContainer = document.getElementById('sheet-edges-flaws');
  edgesContainer.innerHTML = character.edgesFlaws.map(item => `
                <div class="list-item">
                    <span>${item.name}</span>
                    <span style="color: ${item.type === 'edge' ? 'var(--warning)' : 'var(--accent-primary)'};">
                        ${item.type === 'edge' ? 'Edge' : 'Flaw'}
                    </span>
                </div>
            `).join('') || '<p style="color: var(--text-secondary);">None</p>';

  // Contacts
  const contactsContainer = document.getElementById('sheet-contacts');
  contactsContainer.innerHTML = character.contacts.map(contact => `
                <div class="list-item">
                    <span>${contact.name} (${contact.role})</span>
                    <span>Loyalty: ${contact.loyalty}</span>
                </div>
            `).join('') || '<p style="color: var(--text-secondary);">None</p>';

  document.querySelector('.tab-btn[onclick="showStep(8)"]').classList.add('completed');
}

  // Export character
  function exportCharacter() {
  const sheet = document.querySelector('.character-sheet').innerHTML;
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${character.name} - Shadowrun Character</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1a1f35; color: #e0e6f0; padding: 20px; }
        h2, h3 { color: #00ff88; }
        .sheet-section { margin-bottom: 20px; padding: 15px; background: #252b45; border-radius: 8px; }
        .sheet-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
        .sheet-item { display: flex; justify-content: space-between; padding: 8px; background: #1a1f35; border-radius: 4px; }
        .list-item { padding: 8px; background: #1a1f35; border-radius: 4px; margin-bottom: 5px; }
    </style>
</head>
<body>
    ${sheet}
</body>
</html>
            `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${character.name || 'shadowrun-character'}.html`;
  a.click();
}

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
  // Initialize with default values
  if (!character.karmaPool) {
  character.karmaPool = 0;
}
});
