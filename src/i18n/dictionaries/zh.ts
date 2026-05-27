import type { DeepPartial, Dictionary } from "../types";

// Partial translation — any missing key falls back to English.
const zh: DeepPartial<Dictionary> = {
  meta: {
    title: "IQCDL — 国际量子计算驾驶执照",
    description:
      "由人工智能支持的国际认证，帮助个人和组织从对量子的好奇走向量子就绪。",
  },
  common: {
    startAssessment: "开始评估",
    login: "登录",
    logout: "退出",
    dashboard: "仪表板",
    learnMore: "了解更多",
    enroll: "立即报名",
  },
  nav: {
    program: "课程",
    assessment: "就绪度",
    roadmap: "路线图",
    training: "培训",
    standards: "标准",
    pricing: "价格",
    portal: "门户",
  },
  hero: {
    badge: "符合 NIST · ISO/IEC · IEEE · 欧盟 PQC 路线图",
    titleLine1: "引领量子时代的",
    titleLine2: "通行执照",
    subtitle:
      "IQCDL 是由人工智能支持的国际认证，将量子的不确定性转化为可衡量的计划。评估、培训并自信地迁移。",
    ctaPrimary: "评估我的量子就绪度",
    ctaSecondary: "探索课程",
    trustedBy: "受到全球安全领导者、教育者和创新者的信赖",
  },
  cta: {
    title: "后量子时代从第一步开始",
    subtitle: "完成免费评估，两分钟内获得人工智能定制的计划。",
    primary: "开始免费评估",
    secondary: "咨询量子向导",
  },
};

export default zh;
