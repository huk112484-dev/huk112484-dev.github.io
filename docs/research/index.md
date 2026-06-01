# 科研成长

这里记录我的科研项目推进过程。每个项目单独成档，重点记录项目背景、研究场景、核心问题、解决方法、参考资料和阶段性总结。

## 项目列表

<div class="project-grid">

<a class="project-card" href="/research/uav-radio-map/">
  <h3>无人机无线电地图与路径规划</h3>
  <p>围绕无人机起降阶段通信感知、无线电地图建模、路径规划与强化学习重规划展开。</p>
  <span>进入项目 →</span>
</a>

<a class="project-card" href="#">
  <h3>项目二：待补充</h3>
  <p>后续用于记录新的科研项目、课程项目或实验项目。</p>
  <span>待补充</span>
</a>

<a class="project-card" href="#">
  <h3>项目三：待补充</h3>
  <p>后续用于记录新的研究方向、实习项目或技术实践。</p>
  <span>待补充</span>
</a>

</div>

<style>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.project-card {
  display: block;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: all 0.2s ease;
}

.project-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
}

.project-card h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.project-card p {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.project-card span {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>