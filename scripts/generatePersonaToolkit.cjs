const fs = require('fs');
const path = require('path');

const srcPath = 'c:\\Users\\shres\\Downloads\\persona-toolkit (1).md';
let text = fs.readFileSync(srcPath, 'utf8').replace(/\r\n/g, '\n');

// 1. Universal header
const uhIdx = text.indexOf('## UNIVERSAL HEADER');
const uhCodeStart = text.indexOf('```\n', uhIdx);
const uhCodeEnd = text.indexOf('\n```', uhCodeStart + 4);
const universalHeaderPrompt = text.substring(uhCodeStart + 4, uhCodeEnd).trim();

// 2. Metadata mappings
const categoriesByNumber = {
  1: { niche: 'Software Engineering & Scalable Systems', category: 'Engineering & Architecture', shortTitle: 'JS/TS Fullstack Engineer' },
  2: { niche: 'High-Stakes Negotiation & Strategy', category: 'Strategy & Wealth', shortTitle: 'Negotiator' },
  3: { niche: 'Wealth Building & Capital Allocation', category: 'Strategy & Wealth', shortTitle: 'Wealth Builder / Billionaire' },
  4: { niche: 'Distributed Systems & Product Architecture', category: 'Engineering & Architecture', shortTitle: 'System Designer & Architect' },
  5: { niche: 'Clinical Pharmacology & Triage', category: 'Health & Body', shortTitle: 'Clinical Pharmacist' },
  6: { niche: 'Strength, Conditioning & Hypertrophy', category: 'Health & Body', shortTitle: 'Fitness & Combat Coach' },
  7: { niche: 'Practical Psychology & Boundaries', category: 'Mind & Presence', shortTitle: 'Emotional Intelligence' },
  8: { niche: 'Academic Research & Literature Critique', category: 'Academic & Research', shortTitle: 'Research Scholar' },
  9: { niche: 'Interpersonal Dynamics & Magnetism', category: 'Mind & Presence', shortTitle: 'Charisma & Presence' },
  10: { niche: 'Crisis Equanimity & Stoic Composure', category: 'Mind & Presence', shortTitle: 'Stoic & Buddhist Calm' },
  11: { niche: 'AI Engineering & Modern ML Strategy', category: 'Engineering & Architecture', shortTitle: 'AI Prodigy & Strategist' },
  12: { niche: 'Nepal Public Service Commission Exam', category: 'Academic & Research', shortTitle: 'Loksewa Engineer (Nepal)' },
  13: { niche: 'Standardized Exam & Quant Foundations', category: 'Academic & Research', shortTitle: 'GRE Conqueror' },
  14: { niche: 'Prompt Architecture & Meta-Design', category: 'Engineering & Architecture', shortTitle: 'Prompt Engineer' },
  15: { niche: 'Culinary Technique & Kitchen Science', category: 'Everyday Mastery', shortTitle: 'Master Chef' },
  16: { niche: 'Personal Style, Grooming & Tailoring', category: 'Everyday Mastery', shortTitle: 'Master Stylist' },
  17: { niche: 'Time Systems & Output Multiplication', category: 'Everyday Mastery', shortTitle: 'Time Management Master' },
  18: { niche: 'Personal Finance, NEPSE & Compounding', category: 'Strategy & Wealth', shortTitle: 'Investor & Money Manager' },
  19: { niche: 'Spatial Driving & Traffic Confidence', category: 'Everyday Mastery', shortTitle: 'Driving Coach' },
  20: { niche: 'Zero-Cost Nature Conservation', category: 'Everyday Mastery', shortTitle: 'Environment Protector' },
  21: { niche: 'Pathological Myopia & Retina Protection', category: 'Health & Body', shortTitle: 'Eye Health Veteran' },
  22: { niche: 'Contemplative Training & Concentration', category: 'Mind & Presence', shortTitle: 'Meditation Master' },
};

// 3. Personas extraction
const personaRegex = /##\s+(\d+)\.\s+([^\n]+)\s*\n+\*\*Topic:\*\*\s+([^\n]+)\s*\n+\*\*Keywords:\*\*\s+([^\n]+)\s*\n+\*\*Prompt:\*\*\s*\n+```([\s\S]*?)```/g;

let personas = [];
let match;
while ((match = personaRegex.exec(text)) !== null) {
  const num = parseInt(match[1], 10);
  const title = match[2].trim();
  const subject = match[3].trim();
  const rawKeywords = match[4].trim();
  const prompt = match[5].trim();
  const keywords = rawKeywords.split(/,\s*/).map(k => k.trim()).filter(Boolean);
  const meta = categoriesByNumber[num] || { niche: 'Specialist', category: 'General', shortTitle: title };
  
  let defaultTask = '';
  const taskMatch = prompt.match(/(?:MY TASK|MY SITUATION|MY SYMPTOMS \/ QUESTION|MY STATS AND GOAL|MY TOPIC \/ PAPER|MY BACKGROUND AND GOAL|MY REQUEST|MY PROFILE|MY FINANCIAL PICTURE|MY EYE PROFILE|MY PRACTICE AND GOAL|MY GOAL FOR THE PROMPT):\s*\n+([\s\S]*?)$/i);
  if (taskMatch) {
    defaultTask = taskMatch[1].trim();
  }

  personas.push({
    id: num,
    number: num,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title,
    shortTitle: meta.shortTitle,
    niche: meta.niche,
    subject,
    category: meta.category,
    keywords,
    prompt,
    defaultTask,
    part: num >= 15 ? 2 : 1
  });
}

// 4. Quick router extraction
const routerIdx = text.indexOf('## QUICK ROUTER (which persona for what)');
const combiningIdx = text.indexOf('## COMBINING PERSONAS');
const routerSection = text.substring(routerIdx, combiningIdx);

const quickRouter = [];
const rowRegex = /\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|/g;
let rm;
while ((rm = rowRegex.exec(routerSection)) !== null) {
  if (rm[1].toLowerCase().includes('need')) continue;
  const pId = parseInt(rm[2], 10);
  const matchedPersona = personas.find(p => p.id === pId);
  quickRouter.push({
    need: rm[1].trim(),
    personaId: pId,
    personaTitle: matchedPersona ? matchedPersona.title : 'Persona ' + pId
  });
}

// 5. Combining personas extraction
const combiningSection = text.substring(combiningIdx);
const combPromptMatch = combiningSection.match(/```([\s\S]*?)```/);
const combPrompt = combPromptMatch ? combPromptMatch[1].trim() : '';

const usefulPairs = [
  { pair: '1 + 4', label: 'Build & Architect', personaIds: [1, 4] },
  { pair: '2 + 7', label: 'Negotiate & Stay Regulated', personaIds: [2, 7] },
  { pair: '3 + 4', label: 'Venture Design', personaIds: [3, 4] },
  { pair: '8 + 11', label: 'AI Research', personaIds: [8, 11] },
  { pair: '12 + 10', label: 'Exam Performance Under Stress', personaIds: [12, 10] },
  { pair: '3 + 18', label: 'Wealth Strategy + Nepal Execution', personaIds: [3, 18] },
  { pair: '16 + 9', label: 'Style + Social Presence', personaIds: [16, 9] },
  { pair: '16 + 6', label: 'Physique + Wardrobe', personaIds: [16, 6] },
  { pair: '17 + 12', label: 'Exam Schedule', personaIds: [17, 12] },
  { pair: '19 + 10', label: 'Driving Under Fear', personaIds: [19, 10] },
  { pair: '22 + 10', label: 'Formal Practice + Crisis Composure', personaIds: [22, 10] },
  { pair: '21 + 5', label: 'Eye Health + Medication Check', personaIds: [21, 5] },
];

const categories = Array.from(new Set(personas.map(p => p.category)));

const fullData = {
  metadata: {
    title: 'Persona Toolkit & Powerhouse Prompt Engine',
    description: '22 veteran niche personas engineered for high-stakes problem solving, deep domain execution, and zero-fluff output.',
    totalPersonas: personas.length,
    usage: 'Paste the UNIVERSAL HEADER first, then one persona prompt, then your task under MY TASK / MY SITUATION.',
    categories
  },
  universalHeader: {
    title: 'UNIVERSAL HEADER (Paste before every persona)',
    subtitle: 'Global operating rules overriding default assistant behaviors with anti-generic, evidence-first constraints.',
    prompt: universalHeaderPrompt
  },
  categories,
  personas,
  quickRouter,
  combiningPersonas: {
    title: 'COMBINING PERSONAS',
    instructions: 'Paste the UNIVERSAL HEADER, then two persona prompts, then add the combination audit rule:',
    combinationPrompt: combPrompt,
    usefulPairs
  }
};

const outPath = path.join(__dirname, '..', 'src', 'data', 'personaToolkit.json');
fs.writeFileSync(outPath, JSON.stringify(fullData, null, 2), 'utf8');
console.log('Successfully wrote', outPath, 'Bytes:', fs.statSync(outPath).size);
console.log('Total Personas:', personas.length);
console.log('Categories:', categories);
console.log('Quick Router items:', quickRouter.length);
console.log('Useful pairs:', usefulPairs.length);

