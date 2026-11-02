'use strict';
const profile = window.PROFILE;
document.querySelectorAll('[data-profile]').forEach(node => {
  const value = profile[node.dataset.profile];
  if (value) node.textContent = value;
});
document.querySelectorAll('[data-email]').forEach(node => {
  node.href = `mailto:${profile.email}`;
  node.replaceChildren(document.createTextNode(`${profile.email} `));
  const arrow = document.createElement('span');
  arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); node.append(arrow);
});
document.querySelectorAll('[data-github]').forEach(node => {
  node.href = `https://github.com/${encodeURIComponent(profile.github)}`;
  node.textContent = `GitHub / ${profile.github} ↗`;
});
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(profile.email);
    status.textContent = '邮箱已复制，期待与你交流。';
  } catch {
    status.textContent = `请手动复制：${profile.email}`;
  }
});
const projects = {
  nao: {
    kicker: '2026 / 队长 / 国家一等奖', title: 'NAO V6 仿人机器人短跑',
    html: `<p>中国机器人及人工智能大赛仿人短跑项目。基于 NAO V6 实现赛道自主识别与高速稳定行走，采用 LoLA + HTWKMotion 底层运动框架，完成视觉感知与实时运动控制系统开发。</p><div class="dialog-metrics"><div><strong>12 ms</strong><span>约实时步态控制周期</span></div><div><strong>国家一等奖</strong><span>2026 年竞赛成绩</span></div></div><h3>我的工作</h3><ul><li>在 Ubuntu 下搭建 NAO V6 交叉编译环境，完成 HTWKMotion、LolaConnector 的集成及机器人端部署。</li><li>使用 C++ 集成 WalkingEngine、AnkleBalancer、Odometry 等模块，结合 IMU 与脚底压力信息实现步态控制。</li><li>调用底部摄像头，设计 ROI、自适应阈值与白线识别算法，实现赛道边界自主修正。</li><li>通过连续帧去抖与步态参数优化，提升高速行走稳定性。</li></ul>`
  },
  wheel: {
    kicker: '2026 / 嵌入式控制与实车调试', title: '两轮轮腿平衡车运动控制与越障',
    html: `<p>面向动态平衡、转向、跳跃与复杂路面越障，构建基于 IMU 与轮速编码器反馈的控制系统，采用角速度环、姿态角环、速度环与转向环组成的多环控制结构。</p><div class="dialog-metrics"><div><strong>&lt; 1°</strong><span>yaw 角五分钟偏差</span></div><div><strong>≤ 1%</strong><span>十米路径复现误差</span></div></div><h3>我的工作</h3><ul><li>使用 C 语言实现多环 PID 控制，设计收腿、起跳、缓冲与平衡恢复状态机。</li><li>通过控制增益切换、积分清零与转向控制调整，改善动态起跳后的落地稳定性。</li><li>使用 Mahony 四元数算法进行姿态解算，并利用惯性导航实现路径复现。</li><li>使用快速 FOC 算法控制无刷电机，采用 PI 控制闭环电机转速，排查电机失转、三相输出异常等问题。</li></ul>`
  },
  mcm: {
    kicker: '2026 / 核心成员 / MCM Finalist', title: 'RHIRM 电池寿命预测与功耗优化',
    html: `<p>针对智能手机复杂使用环境下的续航预测与功耗优化，团队构建 RHIRM 电池寿命预测框架。以 Thevenin 等效电路为基础，引入温度、SOC 与老化因素，采用 RK4 求解连续时间 SOC 动态模型。</p><div class="dialog-metrics"><div><strong>1.83%</strong><span>NASA Battery Dataset 验证 RMSE</span></div><div><strong>2.15%</strong><span>验证 MAPE</span></div><div><strong>1,000 次</strong><span>Monte Carlo 仿真</span></div></div><h3>我的工作</h3><ul><li>主要承担论文撰写与结构统筹，将建模思路、数学模型、数值求解及仿真结果组织为完整英文论文。</li><li>参与模型逻辑与结果分析，重点完成模型假设、数学公式与 RK4 数值求解部分的文字组织。</li><li>组织 OAT 敏感性分析及 Monte Carlo 仿真等内容的英文表达。</li></ul><h3>团队方法</h3><p>通过 OAT 敏感性分析与 Monte Carlo 仿真检验模型鲁棒性，并提出 ARG 多目标功耗优化策略。</p>`
  }
};
const dialog = document.getElementById('project-dialog');
let returnFocus;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  returnFocus = button;
  document.getElementById('dialog-kicker').textContent = project.kicker;
  document.getElementById('dialog-title').textContent = project.title;
  // Only trusted, locally authored project markup is used here.
  document.getElementById('dialog-body').innerHTML = project.html;
  dialog.showModal(); dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus(); });
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  document.getElementById('navigation').classList.toggle('is-open', !expanded);
});
