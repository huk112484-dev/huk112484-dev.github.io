# 阶段性总结

> 更新时间：2026-06-01

本阶段围绕“三维无线电地图辅助的无人机通信感知动态重规划”完成了一套从静态规划到动态重规划的实验链路。当前工作已经不只是单纯比较路径规划算法，而是进一步明确了 radio map、A*、PPO 和 safety supervisor 在整个系统中的分工。

## 1. 本阶段完成内容

| 阶段 | 已完成内容 | 得到的结论 |
|---|---|---|
| 数据与环境 | 基于 PathLoss stack 构建三维 radio map 和起降栅格环境 | 可以支持多高度通信感知路径规划 |
| 静态主对比 | 完成 300 组随机起降任务六个方法对比 | 通信感知约束显著降低弱信号暴露 |
| 安全执行 | 完成 safety supervisor 统一接管实验 | 可以实现 100% safe success，并区分原策略能力 |
| 动态扰动 | 完成局部弱信号扰动下的重规划实验 | PPO dynamic replanning 明显优于传统重规划 |
| 方法解释 | 完成 PPO 模块消融实验 | A* guidance 和 demonstration pretraining 是关键 |
| 稳定性验证 | 完成参数敏感性与多地图实验 | 结果具有一定稳定性和泛化性 |

目前工作已经形成较完整的研究框架：先利用三维无线电地图建模无人机起降过程中的通信风险，再用通信感知 A* 建立可解释的强静态基线，进一步提出 A* 引导的约束 PPO 动态重规划方法，并通过 safety supervisor 保证执行可靠性。

## 2. 六组实验的逻辑链路

| 实验 | 回答的问题 | 当前判断 |
|---|---|---|
| core 静态主对比 | 静态已知 radio map 下，通信感知规划是否有必要？ | shortest A* 路径短但弱信号暴露高，radio-aware / strong A* 能显著降低 weak ratio |
| safe 安全监督 | 原方法失败时，是否能保证最终可靠降落？ | safety supervisor 可将所有方法补到 100% safe success，但不同方法对接管依赖不同 |
| dynamic 动态扰动 | 通信环境变化时，谁的重规划能力更强？ | PPO dynamic replanning 明显降低弱信号暴露，是当前最关键的创新证据 |
| ablation 消融 | PPO 的性能主要来自哪些模块？ | A* guidance 和 demonstration pretraining 是策略稳定学习的关键 |
| sensitivity 敏感性 | 结果是否依赖单一参数？ | 不同通信阈值、landing radius 和起降距离下，通信感知规划趋势基本稳定 |
| multimap 多地图 | 结果是否只对单张 radio map 有效？ | 多张 PathLoss stack 上，radio-aware / strong A* 的改善趋势保持一致 |

这条实验链路可以概括为：

1. **core** 证明 radio map 进入路径规划是必要的；
2. **safe** 证明系统需要安全监督层保障可达性；
3. **dynamic** 证明 PPO 的优势主要体现在动态通信风险变化下；
4. **ablation** 证明 A* guidance 和 demonstration pretraining 是 PPO 稳定学习的关键；
5. **sensitivity / multimap** 证明当前趋势不是单一参数或单一地图下的偶然结果。

## 3. 本阶段主要收获

本阶段最重要的收获是明确了论文的核心定位。

这个项目不能简单写成“无人机路径规划算法对比”，也不能写成“PPO 静态场景全面超过 A*”。从当前实验结果看，更准确的定位应该是：

> 基于三维无线电地图的无人机通信感知动态重规划方法。

在这个定位下，各模块的角色应当区分清楚：

| 模块 | 正确定位 |
|---|---|
| radio map | 通信风险建模基础 |
| A* | 可解释 baseline、专家示范路径、安全 fallback |
| PPO | 学习型动态重规划主方法 |
| safety supervisor | 面向部署可靠性的安全监督执行层 |

因此，论文主线不应强调“PPO 在静态地图中碾压 A*”，而应强调：

> 在静态已知地图中，strong radio-aware A* 是很强的通信感知基线；PPO 的主要价值体现在动态通信扰动下，能够在通信风险变化时实现更稳定的重规划，并显著降低弱信号暴露。


## 4. 当前存在问题

当前工作还需要继续完善以下几个方面：

1. **强化学习稳定性解释还不够充分**  
   目前结果已经证明 PPO 明显优于 DQN，但还需要结合训练日志、失败轨迹和消融实验，说明 PPO 的稳定性主要来自 A* guidance 和 demonstration pretraining，而不是偶然训练结果。

2. **动态扰动实验需要更多可视化支撑**  
   dynamic 实验是当前最能支撑创新点的部分，后续需要补充典型三维轨迹图，展示扰动前后路径如何变化。

3. **路径规划 baseline 还可以补充**  
   当前主要对比 A* 系列、DQN 和 PPO，后续可以加入 RRT* 或 Informed RRT*，增强路径规划对比的完整性。

4. **radio map 不确定性尚未充分考虑**  
   当前实验默认 radio map 较可靠，后续应加入 radio map noise 或 prediction error，模拟真实无线电地图误差。

5. **真实通信指标映射还需加强**  
   当前使用归一化 signal quality 和 weak ratio，后续可以进一步映射到 SINR、outage probability 或 path loss 等通信指标。

## 5. 论文路线判断

当前实验可以拆成两个路线

### 5.1 GLOBECOM workshop版

讲清楚一个主故事：

> 三维 radio map 辅助起降规划 → A* 作为专家规划器和强静态基线 → A*-guided constrained PPO 用于动态通信扰动下的重规划。

重点回答：

1. 为什么无人机起降不能只看几何最短路径？
2. 为什么需要把 radio map 引入路径规划？
3. 为什么 PPO 的价值主要体现在动态通信扰动下？
4. PPO 的稳定性来自哪些关键模块？

因此，会议版建议保留 4 组核心实验：

| 实验 | 这个实验是什么 | 为什么放在会议版 | 主要证明什么 |
|---|---|---|---|
| core 主对比 | 在静态已知三维 radio map 下，对比 shortest A*、radio-aware A*、strong A*、DQN 和 PPO |用来说明通信感知规划是否有必要 | 普通最短路虽然可达，但弱信号暴露高；radio-aware / strong A* 能显著降低通信风险，PPO 静态性能接近 strong A* |
| dynamic 动态扰动 | 飞行途中人为加入局部弱信号空洞，比较动态规划能力 | 对应“动态通信风险”问题 | PPO dynamic replanning 在动态扰动下明显优于传统 replanned A*，说明学习型重规划有价值 |
| ablation 消融 | 去掉 PPO不同的模块，观察性能变化 | 用来解释 PPO 为什么有效| A* guidance 和 demonstration pretraining 是 PPO 稳定学习的关键 |
| safe 安全监督 | 在统一 safety supervisor 下比较各方法的最终可达性和接管率 | 作为可靠执行补充，说明方法不是只在离线实验中有效 | safety supervisor 能提高执行可靠性，同时 PPO 对安全接管的依赖低于 DQN |

### 5.2 TWC 长文版

TWC 长文版的目标是系统回答：

1. 通信感知规划是否必要？
2. 动态通信扰动下学习型重规划是否有效？
3. 方法为什么有效？
4. 系统是否具有可靠执行能力？
5. 结果是否对参数变化稳定？
6. 方法是否能跨不同 radio map 保持趋势？

因此，长文版需要保留完整六组实验：

| 实验 | 这个实验是什么 | 为什么长文版需要保留 | 长文中证明什么 |
|---|---|---|---|
| core 主对比 | 静态 300 组随机起降任务下的多方法对比 | 作为基础有效性实验，建立radio map-aware planning 的必要性 | 通信感知约束能显著降低弱信号暴露 |
| safe 安全监督 | 使用统一 safety supervisor 对所有方法进行安全接管 | 需要考虑真实部署可靠性，不能只看原始策略指标 | safety supervisor 能保证最终可达，并区分原方法能力与安全接管能力 |
| dynamic 动态扰动 | 模拟飞行途中出现局部弱信号扰动，并比较不同重规划方法 | 这是我们的创新实验，体现 PPO 的动态重规划优势 | PPO 在动态通信风险下比传统 A* 重规划更能降低弱信号暴露 |
| ablation 消融 | 去掉 PPO 的关键模块，分析性能变化 | 需要解释方法机理，而不是只给结果 | A* guidance 和 demonstration pretraining 是 PPO 稳定学习的关键 |
| sensitivity 参数敏感性 | 改变通信阈值、landing radius 和起降距离 | 需要证明结果不是某一个参数调出来的 | 通信感知规划优势在不同参数下基本稳定 |
| multimap 多地图泛化 | 在不同 PathLoss stack 上测试方法趋势 | 长文需要证明结果不是单张地图上的偶然现象 | radio-aware / strong A* 的改善趋势在多张 radio map 上保持一致 |

因此，TWC 版本应更强调通信问题本身，而不只是算法比较。重点应放在：

- radio map 如何建模三维通信风险；
- 弱信号暴露如何影响无人机起降路径；
- 动态通信扰动下为什么需要重规划；
- A* 为什么适合作为专家规划器和安全 fallback；
- PPO 为什么适合作为动态重规划策略；
- 方法在参数变化和多地图条件下是否仍然稳定。

TWC 版本应更强调通信问题本身，包括 radio map 风险建模、动态通信扰动、弱信号暴露控制、可靠执行与泛化验证。

## 6. 下一阶段计划

下一阶段重点推进以下内容：

1. 整理 A*、DQN、PPO 的关键实验对比表；
2. 选择 dynamic 和 safe 实验中的典型轨迹，制作三维可视化图；
3. 补充 RRT* / Informed RRT* baseline；
4. 增加 radio map noise / uncertainty 实验；
5. 完善参考文献记录，整理 GLOBECOM 与 TWC 两个版本的论文结构；
6. 将当前实验结果转化为正式论文图表和组会汇报材料。