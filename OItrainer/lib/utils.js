/* utils.js - 随机/辅助/名字生成函数 */

// ========== 可种子化的随机数生成器 ==========
// 基于 xorshift128+ 算法的简单伪随机数生成器
class SeededRandom {
  constructor(seed) {
    // 当 seed === -1 时，表示显式要求使用原生 Math.random()
    this.useNative = (seed === -1);
    // 如果未指定种子或为 null/undefined，则使用当前时间
    this.seed = (seed === undefined || seed === null) ? Date.now() : seed;
    // 对于非原生模式，使用种子初始化状态
    if (!this.useNative) {
      this.state0 = this.seed ^ 0x12345678;
      this.state1 = (this.seed * 0x9E3779B9) ^ 0x87654321;
    }
  }
  
  next() {
    // 如果构造时选择了原生随机，则直接返回 Math.random()
    if (this.useNative) return Math.random();

    let s1 = this.state0;
    let s0 = this.state1;
    this.state0 = s0;
    s1 ^= s1 << 23;
    s1 ^= s1 >> 17;
    s1 ^= s0;
    s1 ^= s0 >> 26;
    this.state1 = s1;
    const result = (this.state0 + this.state1) >>> 0;
    return result / 0x100000000;
  }
}

// 全局随机数生成器实例
let _globalRng = null;

// 设置全局种子
function setRandomSeed(seed) {
  if (seed !== null && seed !== undefined) {
    // 允许通过 -1 明确请求使用原生 Math.random()
    _globalRng = new SeededRandom(seed);
    if (seed === -1) {
      console.log('[Random] 已设置为使用原生 Math.random()（种子 -1）');
    } else {
      console.log(`[Random] 随机种子已设置: ${seed}`);
    }
  } else {
    _globalRng = null;
    console.log(`[Random] 使用默认随机数生成器`);
  }
}

// 获取随机数（0-1之间）
function getRandom() {
  if (_globalRng) {
    return _globalRng.next();
  }
  return Math.random();
}

function uniform(min, max){ return min + getRandom()*(max-min); }
function uniformInt(min, max){ return Math.floor(min + getRandom()*(max - min + 1)); }
function normal(mean=0, stddev=1){
  let u=0,v=0;
  while(u===0) u=getRandom();
  while(v===0) v=getRandom();
  let z=Math.sqrt(-2.0*Math.log(u))*Math.cos(2*Math.PI*v);
  return z*stddev + mean;
}
function clamp(val,min,max){ return Math.max(min,Math.min(max,val)); }
function clampInt(v,min,max){ return Math.max(min,Math.min(max,Math.round(v))); }
function sigmoid(x){ return 1.0 / (1.0 + Math.exp(-x)); }

/* 今日挑战：根据日期生成种子和挑战参数 */
function getDailyChallengeParams() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  
  // 使用日期字符串作为种子生成随机数
  function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  
  const seed = parseInt(dateStr);
  
  // 使用种子生成省份（1-33之间）
  const provinceId = Math.floor(seededRandom(seed) * 33) + 1;
  
  // 使用种子生成初始随机种子（用于游戏内RNG）
  const gameSeed = Math.floor(seededRandom(seed + 1) * 1000000);
  
  return {
    date: dateStr,
    provinceId: provinceId,
    difficulty: 2, // 固定普通难度
    seed: gameSeed,
    displayDate: `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`
  };
}

function getLetterGradeAbility(val){
    return getLetterGrade(val / 2);
}

function getLetterGrade(val) {
  // 更细化的字母等级，包含带+的中间值。阈值略微上调以匹配数值显示
  // 等级（从低到高）： E, E+, D, D+, C, C+, B, B+, A, A+, S, S+, SS, SS+, SSS
  if (val < 8) return 'E';
  if (val < 16) return 'E+';
  if (val < 30) return 'D';
  if (val < 40) return 'D+';
  if (val < 50) return 'C';
  if (val < 60) return 'C+';
  if (val < 68) return 'B';
  if (val < 76) return 'B+';
  if (val < 82) return 'A';
  if (val < 88) return 'A+';
  if (val < 92) return 'S';
  if (val < 96) return 'S+';
  if (val < 99) return 'SS';
  if (val < 100) return 'SS+';
  // 保持 100 为 SSS，且在 100 之后扩展为不封顶的 U 级别：U1e ... U1sss, U2e ...
  const n = Math.floor(val);
  if (n === 100) return 'SSS';
  if (n > 100) {
    const subs = ['e','e+','d','d+','c','c+','b','b+','a','a+','s','s+','ss','ss+','sss'];
    const v = Number(val);
    // 保留 101-109 的向后兼容整数步进映射（原有行为）
    if (v > 100 && v < 110) {
      const offset = n - 101; // 0-based offset after 100
      const tier = Math.floor(offset / subs.length) + 1;
      const idx = offset % subs.length;
      return `U${tier}${subs[idx]}`;
    }
    // 从 110 起，每个 100 的区间对应 U1, U2, U3...，区间内按 subs 均匀映射
    if (v >= 110) {
      const tier = Math.floor((v - 110) / 100) + 1; // 110-209.999 -> tier 1, 210-309.999 -> tier 2
      const rangeStart = 110 + (tier - 1) * 100;
      const rel = (v - rangeStart) / 100.0; // [0,1)
      let idx = Math.floor(rel * subs.length);
      if (idx < 0) idx = 0;
      if (idx >= subs.length) idx = subs.length - 1;
      return `U${tier}${subs[idx]}`;
    }
    // 兜底：保留原有按整数步进的映射
    const offset = n - 101;
    const tier = Math.floor(offset / subs.length) + 1;
    const idx = offset % subs.length;
    return `U${tier}${subs[idx]}`;
  }
  return 'SSS';
}

/* 名字生成 */
const surnames = [
  "张","李","王","刘","陈","杨","黄","赵","周","吴",
  "徐","孙","马","朱","胡","郭","何","林","罗","高",
  "梁","宋","郑","谢","韩","唐","冯","于","董","萧","曹",
  "潘","袁","许","曾","蒋","蔡","余","杜","叶","程",
  "苏","魏","吕","丁","任","沈","姚","卢","姜","崔"
];



/* 名字生成 */
const namesPool = [
  "练思远","王泽钧","徐锦东","姚哲瀚","朱致远",
  "周康阳","陈昕阳","戴江齐","朱剑枫","蒋凌宇","钱易","冯施源",
  "周航锐","许庭强","王相文","郭羽冲","许淇文",
  "杜瑜皓","邓明扬","李羿辰","刘海峰","张勤健",
  "李白天","钟子谦","刘恒熙","朱泽木","时庆钰",
  "康一凡","陈靖邦","陈诺","楼宇辰","李铭乐洋",
  "罗恺", "沈吉滪","张恒毅"
];

function generateName(){
  // 向后兼容：如果调用方传入已有名字集合，则优先使用；
  // 否则在浏览器环境中尝试使用 window.game.students 的名字作为已用集合。
  const args = Array.prototype.slice.call(arguments);
  let existing = null;
  if(args.length > 0 && args[0]){
    // 支持传入 Array 或 Set 或 Object
    const v = args[0];
    if(Array.isArray(v)) existing = new Set(v.map(x => String(x)));
    else if(v instanceof Set) existing = new Set(Array.from(v).map(x => String(x)));
    else if(typeof v === 'object') existing = new Set(Object.keys(v).map(x => String(x)));
  } else if(typeof window !== 'undefined' && window.game && Array.isArray(window.game.students)){
    existing = new Set(window.game.students.map(s => s && s.name ? String(s.name) : String(s)));
  } else {
    existing = new Set();
  }

  // 尝试从名字池中随机挑选一个不在 existing 中的名字，最多尝试 namesPool.length 次
  for(let i=0;i<namesPool.length;i++){
    const cand = namesPool[i];
    if(!existing.has(cand)) return cand;
  }

  // 如果名字池所有名字都已被占用，采用带数字后缀的回退策略，确保唯一
  // 选择一个基础名字（随机或取首项）并递增后缀直至不重复
  const base = namesPool[uniformInt(0, namesPool.length-1)] || ('学生');
  let suffix = 1;
  while(true){
    const cand = base + String(suffix);
    if(!existing.has(cand)) return cand;
    suffix++;
    // 防止极端无限循环（理论上不应发生），在 suffix 很大时返回 base+timestamp
    if(suffix > 10000) return base + '-' + Date.now();
  }
}
