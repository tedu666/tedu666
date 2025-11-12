/* models.js - Student / Facilities / GameState / competitions 构建 */
// 依赖：constants.js, utils.js

class Student {
  constructor(name,thinking,coding,mental){
    this.name=name; 
    this.thinking=thinking; 
    this.coding=coding; 
    this.mental=mental;
    
    // talents: 特质/技能列表（Set of strings）
    // 预留接口：TalentManager 可以注册具体特质的触发逻辑，游戏事件/比赛等可调用 student.triggerTalents(eventName, ctx)
    this.talents = new Set();
    
    // 知识点初始化：以 KNOWLEDGE_ABLILTY_START 为均值，100 为标准差的正态分布
    const knowledgeStddev = 50;
    
    let knowledgeMean = KNOWLEDGE_ABLILTY_START;

    let knowledgeMathMean = knowledgeMean;
    let knowledgeDpMean = knowledgeMean;
    let knowledgeStringMean = knowledgeMean;
    let knowledgeGraphMean = knowledgeMean;
    let knowledgeDsMean = knowledgeMean;

    this.knowledge_ds = Math.max(0, Math.round(normal(knowledgeDsMean, knowledgeStddev)));
    this.knowledge_graph = Math.max(0, Math.round(normal(knowledgeGraphMean, knowledgeStddev)));
    this.knowledge_string = Math.max(0, Math.round(normal(knowledgeStringMean, knowledgeStddev)));
    this.knowledge_math = Math.max(0, Math.round(normal(knowledgeMathMean, knowledgeStddev)));
    this.knowledge_dp = Math.max(0, Math.round(normal(knowledgeDpMean, knowledgeStddev)));

    console.log(normal(knowledgeDpMean, knowledgeStddev))

    this.pressure = 20; 
    this.comfort = 30;
    
    this.burnout_weeks=0; this.depression_count=0; this.high_pressure_weeks=0;
    this.active=true; this.sick_weeks=0;
  }
  getAbilityAvg(){ return (this.thinking + this.coding + this.mental)/3.0; }
  getKnowledgeTotal(){ return (this.knowledge_ds + this.knowledge_graph + this.knowledge_string + this.knowledge_math + this.knowledge_dp)/5.0; }
  getComprehensiveAbility(){
    // 更明确地把思维/编码/心理分开加权：思维和编码对解题能力贡献更大，心理为稳定性维度
    const thinking = Number(this.thinking || 0);
    const coding = Number(this.coding || 0);
    const mental = Number(this.mental || 0);
    // weights: thinking 55% of ability part, coding 35%, mental 10%
    const abilityPart = thinking * 0.55 + coding * 0.35 + mental * 0.10;
    const knowledge_total = this.getKnowledgeTotal();
    return ABILITY_WEIGHT * abilityPart + KNOWLEDGE_WEIGHT * knowledge_total;
  }
  getMentalIndex(){
    let noise = normal(0,3.0);
    // 如果存在 per-contest 的临时心理值（由 TalentManager 的天赋在比赛中修改），优先使用它
    const mentalBase = (this._talent_state && typeof this._talent_state.constmental === 'number') ? Number(this._talent_state.constmental) : Number(this.mental || 0);
    const maxPressure = (typeof MAX_PRESSURE !== 'undefined' ? MAX_PRESSURE : 100);
    const maxComfort = (typeof MAX_COMFORT !== 'undefined' ? MAX_COMFORT : 100);
    const maxMental = (typeof MAX_MENTAL !== 'undefined' ? MAX_MENTAL : 100);
    let result = mentalBase - ALPHA1*(this.pressure/maxPressure)*(1 - this.comfort/maxComfort) + noise;
    return clamp(result,0,maxMental);
  }
  getPerformanceScore(difficulty,maxScore,knowledge_value){
    let comprehensive = this.getComprehensiveAbility();
    let mental_idx = this.getMentalIndex();
    
    // 知识点门槛机制（与新比赛引擎保持一致）
    const knowledgeRequirement = Math.max(15, difficulty * 0.35);
    let knowledgePenalty = 1.0;
    if(knowledge_value < knowledgeRequirement){
      const knowledgeGap = knowledgeRequirement - knowledge_value;
      knowledgePenalty = Math.exp(-knowledgeGap / 15.0);
      knowledgePenalty = Math.max(0.05, knowledgePenalty);
    }
    
    // 降低知识点直接加成（从2.0降至0.5，与新引擎保持一致）
    let knowledge_bonus = knowledge_value * 0.5;
    let effective_ability = comprehensive + knowledge_bonus;
    let performance_ratio = sigmoid((effective_ability - difficulty)/10.0);
    
    // 应用知识点门槛惩罚（乘性效果）
    performance_ratio = performance_ratio * knowledgePenalty;
    
    const maxMental = (typeof MAX_MENTAL !== 'undefined' ? MAX_MENTAL : 100);
    let stability_factor = mental_idx/maxMental;
    let base_noise = 0.05;
    let sigma_performance = (maxMental - mental_idx)/(maxMental * 2.0) + base_noise;
    let random_factor = normal(0, sigma_performance);
    let final_ratio = performance_ratio * stability_factor * (1 + random_factor);
    final_ratio = clamp(final_ratio,0,1);
    return Math.max(0, final_ratio * maxScore);
  }
  calculateKnowledgeGain(base_gain, facility_bonus, sick_penalty){
    const maxThinking = (typeof MAX_THINKING !== 'undefined' ? MAX_THINKING : 100);
    let learning_efficiency = (0.6*(this.thinking/maxThinking) + 0.4)*(1.0 - this.pressure / FATIGUE_FROM_PRESSURE);
    return Math.floor(base_gain * learning_efficiency * facility_bonus * sick_penalty);
  }
  getKnowledgeByType(type){
    if(type==='数据结构') return this.knowledge_ds;
    if(type==='图论') return this.knowledge_graph;
    if(type==='字符串') return this.knowledge_string;
    if(type==='数学') return this.knowledge_math;
    if(type==='DP' || type==='动态规划') return this.knowledge_dp;
    return 0;
  }
  addKnowledge(type,amount){
    // 安全检查：单次增幅上限100点（防止异常值导致的爆炸性增长）
    const safeAmount = Math.min(Math.max(0, amount), 100);
    
    if(safeAmount !== amount && Math.abs(amount) > 0.01){
      console.warn(`[addKnowledge] 学生${this.name} 知识点增幅异常: type=${type}, 原值=${amount}, 限制后=${safeAmount}`);
    }
    
    if(type==='数据结构') this.knowledge_ds += safeAmount;
    else if(type==='图论') this.knowledge_graph += safeAmount;
    else if(type==='字符串') this.knowledge_string += safeAmount;
    else if(type==='数学') this.knowledge_math += safeAmount;
    else if(type==='DP' || type==='动态规划') this.knowledge_dp += safeAmount;
  }
  // 统一接口：为思维/代码提供受控增幅方法
  // 规则：当目标属性（thinking 或 coding）大于阈值（400）时，对增幅进行衰减。
  // 衰减函数使用简单比例：mult = Math.min(1, 400 / currentValue)
  // 这样 current=400 时 mult=1（无衰减），current越大衰减越明显。保证不会出现负增幅。
  addThinking(amount){
    if(typeof amount !== 'number' || Math.abs(amount) < 1e-9) return;
    const cur = Number(this.thinking || 0);
    let mult = 1.0;
    
    // 特殊处理：李羿辰（超能力者）上限是普通人的2倍
    const maxThinking = (typeof MAX_THINKING !== 'undefined' ? MAX_THINKING : 100);
    const isLiYiChen = (this.name === '李羿辰' || this.name === '李羿辰（黑化）' || this._isBlackened);
    const personalMax = isLiYiChen ? maxThinking * 2 : maxThinking;
    
    if(isLiYiChen){
      // 李羿辰：上限2倍，但超过1倍上限后有衰减
      if(cur > maxThinking){ 
        mult = Math.min(1.0, (personalMax - cur) / maxThinking); // 渐进衰减
        if(mult < 0) mult = 0; // 已达上限
      }
    } else {
      // 普通学生：超过阈值后衰减
      if(typeof ABILITY_DECAY_THRESHOLD !== 'undefined' && cur > ABILITY_DECAY_THRESHOLD){ 
        mult = Math.min(1.0, ABILITY_DECAY_THRESHOLD / cur); 
      } else if(typeof ABILITY_DECAY_THRESHOLD === 'undefined' && cur > 400){ 
        mult = Math.min(1.0, 400.0 / cur); 
      }
    }
    
    const applied = amount * mult;
    this.thinking = Math.min(personalMax, cur + applied);
  }
  addCoding(amount){
    if(typeof amount !== 'number' || Math.abs(amount) < 1e-9) return;
    const cur = Number(this.coding || 0);
    let mult = 1.0;
    
    // 特殊处理：李羿辰（超能力者）上限是普通人的2倍
    const maxCoding = (typeof MAX_CODING !== 'undefined' ? MAX_CODING : 100);
    const isLiYiChen = (this.name === '李羿辰' || this.name === '李羿辰（黑化）' || this._isBlackened);
    const personalMax = isLiYiChen ? maxCoding * 2 : maxCoding;
    
    if(isLiYiChen){
      // 李羿辰：上限2倍，但超过1倍上限后有衰减
      if(cur > maxCoding){ 
        mult = Math.min(1.0, (personalMax - cur) / maxCoding); // 渐进衰减
        if(mult < 0) mult = 0; // 已达上限
      }
    } else {
      // 普通学生：超过阈值后衰减
      if(typeof ABILITY_DECAY_THRESHOLD !== 'undefined' && cur > ABILITY_DECAY_THRESHOLD){ 
        mult = Math.min(1.0, ABILITY_DECAY_THRESHOLD / cur); 
      } else if(typeof ABILITY_DECAY_THRESHOLD === 'undefined' && cur > 400){ 
        mult = Math.min(1.0, 400.0 / cur); 
      }
    }
    
    const applied = amount * mult;
    this.coding = Math.min(personalMax, cur + applied);
  }
  /* ---------- Talent 接口 ---------- */
  addTalent(talentName){ this.talents.add(talentName); }
  removeTalent(talentName){ this.talents.delete(talentName); }
  hasTalent(talentName){ return this.talents.has(talentName); }
  // 触发学生的特质（由外部事件/比赛调用）
  // eventName: 字符串标识事件类型；ctx: 可选上下文对象
  // 返回：天赋触发结果数组 [{talent: '天赋名', result: '描述'}]
  triggerTalents(eventName, ctx){
    // 若存在全局 TalentManager，交由其处理；否则简单遍历并尝试调用全局注册的处理器
    try{
      // debug hook (set window.__OI_DEBUG_TALENTS = true to enable)
      try{ if(typeof window !== 'undefined' && window.__OI_DEBUG_TALENTS) console.debug(`[TALENT DEBUG] triggerTalents called for ${this.name} event=${eventName} ctx=`, ctx); }catch(e){}
      if(typeof window !== 'undefined' && window.TalentManager && typeof window.TalentManager.handleStudentEvent === 'function'){
        const results = window.TalentManager.handleStudentEvent(this, eventName, ctx);
        try{ if(typeof window !== 'undefined' && window.__OI_DEBUG_TALENTS) console.debug(`[TALENT DEBUG] TalentManager returned for ${this.name}:`, results); }catch(e){}
        return results || []; // 返回天赋触发结果
      }
      // fallback: 如果没有 TalentManager，则查找 window._talentHandlers（保留兼容）
      if(typeof window !== 'undefined' && window._talentHandlers){
        const results = [];
        for(const t of this.talents){
          const h = window._talentHandlers[t];
          if(typeof h === 'function'){
            try{ 
              const res = h(this, eventName, ctx); 
              try{ if(typeof window !== 'undefined' && window.__OI_DEBUG_TALENTS) console.debug(`[TALENT DEBUG] handler ${t} returned for ${this.name}:`, res); }catch(e){}
              if(res) results.push({talent: t, result: res});
            }catch(e){ console.error('talent handler error', e); }
          }
        }
        try{ if(typeof window !== 'undefined' && window.__OI_DEBUG_TALENTS) console.debug(`[TALENT DEBUG] aggregated results for ${this.name}:`, results); }catch(e){}
        return results;
      }
    }catch(e){ console.error('triggerTalents error', e); }
    return [];
  }
}

class Facilities {
  constructor(){ this.computer=1; this.ac=1; this.dorm=1; this.library=1; this.canteen=1; }
  getComputerEfficiency(){ return 1.0 + COMPUTER_EFFICIENCY_PER_LEVEL * (this.computer - 1); }
  getLibraryEfficiency(){ return 1.0 + LIBRARY_EFFICIENCY_PER_LEVEL * (this.library - 1); }
  getCanteenPressureReduction(){ return 1.0 - CANTEEN_PRESSURE_REDUCTION_PER_LEVEL * (this.canteen - 1); }
  getDormComfortBonus(){ return DORM_COMFORT_BONUS_PER_LEVEL * (this.dorm - 1); }
  getUpgradeCost(fac){
    let it = FACILITY_UPGRADE_COSTS[fac];
    if(!it) return 0;
    let level = this.getCurrentLevel(fac);
    return Math.floor(it.base * Math.pow(it.grow, level - 1));
  }
  getMaxLevel(fac){
    if(fac==='computer'||fac==='library') return MAX_COMPUTER_LEVEL;
    return MAX_OTHER_FACILITY_LEVEL;
  }
  getCurrentLevel(fac){
    if(fac==='computer') return this.computer;
    if(fac==='library') return this.library;
    if(fac==='ac') return this.ac;
    if(fac==='dorm') return this.dorm;
    if(fac==='canteen') return this.canteen;
    return 0;
  }
  upgrade(fac){
    if(fac==='computer') this.computer++;
    else if(fac==='library') this.library++;
    else if(fac==='ac') this.ac++;
    else if(fac==='dorm') this.dorm++;
    else if(fac==='canteen') this.canteen++;
  }
  getMaintenanceCost(){
    let total = this.computer + this.ac + this.dorm + this.library + this.canteen;
    return Math.floor(100 * Math.pow(total,1.2));
  }
}

class GameState {
  constructor(){
    this.students=[];
    this.facilities=new Facilities();
    this.budget=100000;
    this.week=1;
    this.reputation=50;
    this.temperature=20;
    this.weather="晴";
    this.province_name="";
    this.province_type="";
    this.is_north=false;
    this.difficulty=2;
    this.base_comfort=50;
    this.initial_students=0;
    this.quit_students=0;
    this.had_good_result_recently=false;
    this.weeks_since_entertainment=0;
    this.weeks_since_good_result=0;
    this.noi_rankings=[];
    this.qualification = [ {}, {} ];
    for(let name of COMPETITION_ORDER){ this.qualification[0][name] = new Set(); this.qualification[1][name] = new Set(); }
    this.seasonEndTriggered = false;
    this.completedCompetitions = new Set();
    this.careerCompetitions = [];
    // 累计消费金额跟踪
    this.totalExpenses = 0;
  // teaching_points 已弃用，保留向后兼容性字段已移除
  }
  getWeatherFactor(){
    let factor=1.0;
    let extreme_temp = (this.temperature < EXTREME_COLD_THRESHOLD || this.temperature > EXTREME_HOT_THRESHOLD);
    if(extreme_temp){
      if(this.facilities.ac===1) factor = 1.5;
      if(this.facilities.ac===1 && this.facilities.dorm===1) factor = 2.0;
    }
    return factor;
  }
  getComfort(){
    let comfort = this.base_comfort;
    comfort += this.facilities.getDormComfortBonus();
    comfort += AC_COMFORT_BONUS_PER_LEVEL * (this.facilities.ac - 1);
    comfort += 3 * (this.facilities.canteen - 1);
    let weather_penalty = 0;
    if(this.temperature < EXTREME_COLD_THRESHOLD || this.temperature > EXTREME_HOT_THRESHOLD){
      weather_penalty = WEATHER_PENALTY_WITH_AC;
      if(this.facilities.ac === 1) weather_penalty = WEATHER_PENALTY_NO_AC;
    }
    return clamp(comfort - weather_penalty, 0, (typeof MAX_COMFORT !== 'undefined' ? MAX_COMFORT : 100));
  }
  getWeeklyCost(){
    // treat student as active unless explicitly set to false (backwards compatible)
    let active_count = Array.isArray(this.students) ? this.students.filter(s => s && s.active !== false).length : 0;
    return 4000 + 500*active_count + this.facilities.getMaintenanceCost();
  }
  getDifficultyModifier(){ if(this.difficulty===1) return 0.9; if(this.difficulty===3) return 1.1; return 1.0; }
  getNextCompetition(){ if(Array.isArray(competitions) && competitions.length > 0){ const sorted = competitions.slice().sort((a, b) => a.week - b.week); const next = sorted.find(c => c.week > this.week); if(next){ let weeks_left = next.week - this.week; return next.name + ` (还有${weeks_left}周)`; } } return "无"; }
  updateWeather(){
    // New weather model:
    // - Determine current month from week (approximate: SEASON_WEEKS maps to 12 months)
    // - Map month to one of four seasons: spring/summer/autumn/winter
    // - Look up province-specific seasonal mean temperature and precipitation probability
    // - Apply a small random perturbation to temperature and decide precipitation based on probability
    try{
      const weeksPerYear = SEASON_WEEKS || 28;
      // map week to month index (1-12)
      let month = Math.floor(((this.week - 1) / Math.max(1, weeksPerYear)) * 12) + 1;
      if(month < 1) month = 1; if(month > 12) month = 12;
      // map month to season
      let season = 'spring';
      if([3,4,5].includes(month)) season = 'spring';
      else if([6,7,8].includes(month)) season = 'summer';
      else if([9,10,11].includes(month)) season = 'autumn';
      else season = 'winter';

      // default climate fallback
      let climate = this.province_climate || (this.is_north ? { seasonalTemps:{spring:10,summer:22,autumn:8,winter:-8}, precipProb:{spring:0.25,summer:0.35,autumn:0.2,winter:0.1}} : { seasonalTemps:{spring:15,summer:28,autumn:20,winter:8}, precipProb:{spring:0.3,summer:0.45,autumn:0.3,winter:0.1}});

      // seasonal base temp
      let baseSeasonTemp = (climate.seasonalTemps && typeof climate.seasonalTemps[season] === 'number') ? climate.seasonalTemps[season] : 15;
      // Random perturbation: normal around 0 with sd depending on season (summer/spring more stable)
      const sd = (season === 'summer' || season === 'spring') ? 3.5 : 5.0;
      // use uniform small jitter for simplicity
      this.temperature = Math.round((baseSeasonTemp + normal(0, sd)) * 10) / 10;

      // precipitation decision by precipProb for that season
      let precipProb = (climate.precipProb && typeof climate.precipProb[season] === 'number') ? climate.precipProb[season] : 0.2;
      const precipRoll = getRandom();
      if(precipRoll < precipProb){
        // will precipitate: decide rain or snow by temperature (<=0 => snow)
        if(this.temperature <= 0) this.weather = '雪';
        else this.weather = '雨';
      } else {
        // no precipitation: sunny or cloudy
        const skyRoll = getRandom();
        if(skyRoll < 0.7) this.weather = '晴';
        else this.weather = '阴';
      }

      // small local tweak: if province is northern high-latitude and currently winter, increase snow chance
      if(season === 'winter' && (this.is_north || (this.province_climate && this.province_climate.isPlateau))){
        if(this.weather === '雨' && this.temperature <= 2 && getRandom() < 0.5) this.weather = '雪';
      }
    }catch(e){
      // fallback to previous simpler model on error
      if(this.week >=1 && this.week <= 13){ if(this.is_north) this.temperature = uniform(15,28); else this.temperature = uniform(22,36); }
      else if(this.week >=14 && this.week <= 26){ if(this.is_north) this.temperature = uniform(-5,10); else this.temperature = uniform(8,20); }
      else if(this.week >=27 && this.week <= 39){ if(this.is_north) this.temperature = uniform(-10,5); else this.temperature = uniform(5,18); }
      else { if(this.is_north) this.temperature = uniform(8,25); else this.temperature = uniform(15,30); }
      let roll = getRandom();
      if(roll < 0.65) this.weather="晴";
      else if(roll < 0.80) this.weather="阴";
      else if(roll < 0.93) this.weather="雨";
      else this.weather="雪";
    }
  }
  getFutureExpense(){ const weekly = this.getWeeklyCost(); const activeCount = Array.isArray(this.students) ? this.students.filter(s => s && s.active !== false).length : 0; const mult = activeCount * 0.3; return Math.round(weekly * 4 * mult); }
  getExpenseMultiplier(){ try{ const activeCount = Array.isArray(this.students) ? this.students.filter(s => s && s.active !== false).length : 0; return Math.max(0, activeCount * 0.3); }catch(e){ return 1.0; } }
  getWeatherDescription(){
    try{
      let desc = this.weather;
      if(this.weather==="雪") desc += " ❄️";
      else if(this.weather==="雨") desc += " 🌧️";
      else if(this.weather==="晴") desc += " ☀️";
      else desc += " ☁️";
      if(typeof this.temperature === 'number'){
        if(this.temperature < 0) desc += " (寒)";
        else if(this.temperature < 10) desc += " (寒冷)";
        else if(this.temperature < 20) desc += " (凉爽)";
        else if(this.temperature < 30) desc += " (温暖)";
        else desc += " (炎热)";
      }
      return desc;
    }catch(e){ return `${this.weather || '晴'} ${this.temperature || 0}\u00b0C`; }
  }
  
  // 记录消费并更新累计金额
  recordExpense(amount, description = '') {
    // 应用全局经费消耗增幅
    const costMult = (typeof COST_MULTIPLIER !== 'undefined' ? COST_MULTIPLIER : 1.0);
    const expense = Math.max(0, amount * costMult);
    const actualDeduction = Math.min(expense, this.budget); // 实际扣除金额（不超过现有预算）
    this.budget = Math.max(0, this.budget - expense);
    this.totalExpenses = (this.totalExpenses || 0) + expense;
    
    // 可选：记录消费日志（但不重复推送事件）
    // if (description && typeof window !== 'undefined' && window.pushEvent) {
    //   try {
    //     window.pushEvent({
    //       name: '消费记录',
    //       description: `${description}: -¥${expense}`,
    //       week: this.week
    //     });
    //   } catch(e) {
    //     console.error('Failed to log expense:', e);
    //   }
    // }
    
    return expense; // 返回应扣除的金额（应用了COST_MULTIPLIER）
  }
}

/* =========== 比赛数据复刻（两赛季） =========== */
const WEEKS_PER_HALF = Math.floor(SEASON_WEEKS / 2);
let competitions = [];
if(Array.isArray(COMPETITION_SCHEDULE)){
  const totalOrig = ORIGINAL_SEASON_WEEKS;
  const firstHalfSize = WEEKS_PER_HALF;
  const secondHalfSize = SEASON_WEEKS - WEEKS_PER_HALF;
  for (let name of COMPETITION_ORDER) {
    const src = COMPETITION_SCHEDULE.find(c => c.name === name);
    if (!src) continue;
    const p = (src.week - 1) / Math.max(1, (totalOrig - 1));
    let newWeek = 1 + Math.round(p * Math.max(0, firstHalfSize - 1));
    if (newWeek < 1) newWeek = 1;
    if (newWeek > firstHalfSize) newWeek = firstHalfSize;
    let copy = Object.assign({}, src);
    // ensure numProblems and maxScore consistency: default each problem worth 100
    // 如果有 problemScores，使用其总和作为 maxScore
    if(copy.problemScores && Array.isArray(copy.problemScores)){
      const sumScores = copy.problemScores.reduce((sum, score) => sum + Number(score || 0), 0);
      copy.maxScore = sumScores;
      if(!copy.numProblems) copy.numProblems = copy.problemScores.length;
    } else {
      if(!copy.numProblems) copy.numProblems = Math.max(1, Math.round((copy.maxScore||400)/100));
      if(!copy.maxScore) copy.maxScore = copy.numProblems * 100;
    }
    copy.week = newWeek;
    competitions.push(copy);
  }
  for (let name of COMPETITION_ORDER) {
    const src = COMPETITION_SCHEDULE.find(c => c.name === name);
    if (!src) continue;
    const p = (src.week - 1) / Math.max(1, (totalOrig - 1));
    let newWeek2 = WEEKS_PER_HALF + 1 + Math.round(p * Math.max(0, secondHalfSize - 1));
    if (newWeek2 < WEEKS_PER_HALF + 1) newWeek2 = WEEKS_PER_HALF + 1;
    if (newWeek2 > SEASON_WEEKS) newWeek2 = SEASON_WEEKS;
    let copy = Object.assign({}, src);
    // 如果有 problemScores，使用其总和作为 maxScore
    if(copy.problemScores && Array.isArray(copy.problemScores)){
      const sumScores = copy.problemScores.reduce((sum, score) => sum + Number(score || 0), 0);
      copy.maxScore = sumScores;
      if(!copy.numProblems) copy.numProblems = copy.problemScores.length;
    } else {
      if(!copy.numProblems) copy.numProblems = Math.max(1, Math.round((copy.maxScore||400)/100));
      if(!copy.maxScore) copy.maxScore = copy.numProblems * 100;
    }
    copy.week = newWeek2;
    competitions.push(copy);
  }
} else { competitions = []; }

/* 全局导出（保持与旧代码兼容的全局变量） */
window.Student = Student;
window.Facilities = Facilities;
window.GameState = GameState;
window.competitions = competitions;
window.WEEKS_PER_HALF = WEEKS_PER_HALF;

