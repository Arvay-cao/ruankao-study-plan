// 2026-09-20（周日）第4周 · 软件工程 | 计时下午卷（全真模拟·在线试卷）
// 考试流程讲义 + 5道大题全真模拟（试题一至试题五，共31小题，含答案与解析，已逐题校验）
window.LESSONS = window.LESSONS || {};

window.LESSONS['2026-09-20'] = {

topic: '计时下午卷',

lecture: `
<div class="callout info">
<div class="callout-title">本讲说明</div>
<p><b>对应执行表任务：</b>120分钟完成一套下午卷；按题型分配时间；目标42分。<b>本日目的</b>：第一次完整体验下午题节奏，找到自己"卡壳"的题型，为第5周下午题专项提供靶子。</p>
<p><b>组卷说明：</b>下方在线试卷已按<b>真实下午卷结构</b>组卷：试题一（数据流图）、试题二（数据库设计）、试题三（UML）、试题四（算法·C代码填空）、试题五（Java 程序设计），每题 15 分，满分 75，全部为本站新题。名称类小题按填空作答（输入规范名称即可），其余按选择作答；做完先自评再提交批改。若你更希望手写训练，可先在草稿纸写出全部答案，再上机提交对照。</p>
<p><b>今日时间安排（4小时）：</b>120分钟做题 → 30分钟对照答案自评 → 60分钟逐题订正（重点：术语是否规范）→ 30分钟登记。</p>
</div>

<h2>1. 下午卷结构与各题时间预算</h2>
<p>下午应用技术：共 5 道大题（试题一至试题五），一般为：数据流图（试题一，必答）、数据库设计（含SQL）、UML/面向对象分析、算法（代码填空）、面向对象程序设计（Java）。总分 75 分，真实考试 150 分钟（本计划 120 分钟强化）。</p>
<table>
<tr><th>顺序</th><th>题型</th><th>建议用时</th><th>常见分值</th></tr>
<tr><td>试题一</td><td>数据流图（外部实体/数据存储/数据流补充、找错误）</td><td>25 分钟</td><td>15 分左右</td></tr>
<tr><td>试题二</td><td>数据库设计（ER图、关系模式、主外键、SQL）</td><td>25 分钟</td><td>15 分左右</td></tr>
<tr><td>试题三</td><td>UML（用例图/类图/顺序图/状态图填空）</td><td>25 分钟</td><td>15 分左右</td></tr>
<tr><td>试题四</td><td>算法（代码填空 + 算法策略/复杂度说明）</td><td>25 分钟</td><td>15 分左右</td></tr>
<tr><td>试题五</td><td>Java 程序设计（本计划固定 Java）</td><td>20 分钟</td><td>15 分左右</td></tr>
</table>
<div class="callout key">
<div class="callout-title">时间纪律</div>
<p>任何一题超过 30 分钟立即跳下一题并标记；全部过完一遍再回头。宁可每题都拿到"结构分"（填上确定的部分空），不要在某题追求满分而让后面整题空白——<b>下午题是按空给分的，写一部分得一部分</b>。</p>
</div>

<h2>2. 各题型作答要点速览（详细模板第5周展开）</h2>
<h3>2.1 数据流图题</h3>
<ul>
<li>外部实体：与系统交互的<b>人或组织/外部系统</b>（矩形），不是系统内部的东西。</li>
<li>数据存储：系统保存的数据（双横线），名字常是"××表/××档案/××文件"。</li>
<li>常见错误类型：黑洞（加工只有入没有出）、奇迹（只有出没有入）、数据流未经加工直连外部实体与数据存储、父子图不平衡。</li>
</ul>
<h3>2.2 数据库设计题</h3>
<ul>
<li>先在草稿上画 ER：实体→关系→联系类型（1:1 / 1:n / m:n）。</li>
<li>m:n 联系必须独立成关系模式（两端主键 + 联系自身属性）；1:n 联系并入 n 端关系（加入 1 端主键作外键）。</li>
<li>写关系模式时<b>主键下划线</b>，别漏外键说明。</li>
</ul>
<h3>2.3 UML 题</h3>
<ul>
<li>类图空缺：先看与已给类的关联数量关系（多重性 1、0..1、*），再从题干名词找类名/属性名。</li>
<li>用例图：参与者（人形）在系统边界外；include（必然发生）/ extend（有条件才发生）方向别搞反。</li>
</ul>
<h3>2.4 算法题</h3>
<ul>
<li>先读题干算法说明再读代码，用题目样例<b>手工代入</b>一遍代码。</li>
<li>空缺常见于：初始化、循环边界、递推/递归核心、返回值。</li>
<li>策略题（"该算法采用什么策略？复杂度？"）直接写：分治/动态规划/贪心/回溯 + O(×)。</li>
</ul>
<h3>2.5 Java 题</h3>
<ul>
<li>固定选 Java，不换语言（与备考计划一致）。</li>
<li>空缺常见于：implements/extends、方法签名（返回类型、参数）、多态调用、集合遍历。识别设计模式骨架（接口+实现类）。</li>
</ul>

<h2>3. 自评标准（下午题没有"客观对错"的全部，但给分点客观）</h2>
<ul>
<li>在线卷：填空类按精确比对批改（多写"表/文件"等后缀一般已列入可接受答案）；选择类自动判分。每空对照解析给分。</li>
<li>手写模式：完全一致得分；意思接近但不规范（如把"外部实体"写成"用户对象"）按一半或零分从严扣，提醒自己用规范术语。</li>
<li>统计各题得分与用时，找出<b>得分率最低</b>和<b>用时最长</b>的题型，作为第5周专项训练的优先级依据。</li>
</ul>

<h2>4. 今日登记模板</h2>
<table>
<tr><th>试题</th><th>题型</th><th>用时</th><th>得分/满分</th><th>主要卡点</th></tr>
<tr><td>一</td><td>数据流图</td><td>___</td><td>___ / 15</td><td>　</td></tr>
<tr><td>二</td><td>数据库设计</td><td>___</td><td>___ / 15</td><td>　</td></tr>
<tr><td>三</td><td>UML</td><td>___</td><td>___ / 15</td><td>　</td></tr>
<tr><td>四</td><td>算法</td><td>___</td><td>___ / 15</td><td>　</td></tr>
<tr><td>五</td><td>Java</td><td>___</td><td>___ / 15</td><td>　</td></tr>
<tr><td colspan="3">合计</td><td colspan="2">___ / 75（目标 42）</td></tr>
</table>

<div class="callout tip">
<div class="callout-title">完成本日后</div>
<p>明日（9/21 周一）回归上午题知识：<b>知识产权与标准化</b>，25 题纯记忆型考点，完成一周最后一个知识日。9/22（周二）将进行第4周计时卷总复盘。</p>
</div>
`,

quiz: {
  kind: 'afternoon',
  suggestedMinutes: 120,
  note: '第4周计时下午卷·全真模拟：试题一至试题五共 5 道大题（每题 15 分，满分 75，目标 42），建议一次性连续作答并计时。名称类小题按填空输入规范名称，代码/判断类小题按选择作答；先在草稿纸模拟手写作答，再上机提交批改效果最佳。',
  scenario: `
  <h2 style="margin-top:0">试题一 · 某高校教材征订管理系统（数据流图，15分）</h2>
  <p><b>【说明】</b>某高校开发教材征订管理系统，功能如下：</p>
  <p>(1) 教师提交教材申报单，系统查询教材信息表核对教材基本信息后，将申报信息写入征订汇总表，并向教师返回申报结果。</p>
  <p>(2) 教材科管理员对征订汇总表中的申报信息进行审核并提交审核意见；系统将审核通过的申报汇总生成教材订单，发送给供应商。</p>
  <p>(3) 供应商向系统提交到货通知，系统在到货记录表中登记到货记录、更新征订汇总表中的征订状态，并向教材科管理员发送到货通报。</p>
  <p>(4) 学期末，系统根据征订汇总表生成本学期教材结算单，发送给财务处。</p>
  <p><b>【顶层图数据流】</b></p>
  <table>
  <tr><th>起点</th><th>终点</th><th>数据流名称</th></tr>
  <tr><td>E1</td><td>系统</td><td>教材申报单</td></tr>
  <tr><td>系统</td><td>E1</td><td>申报结果</td></tr>
  <tr><td>E2</td><td>系统</td><td>审核意见</td></tr>
  <tr><td>系统</td><td>E2</td><td>到货通报</td></tr>
  <tr><td>系统</td><td>E3</td><td>教材订单</td></tr>
  <tr><td>E3</td><td>系统</td><td>到货通知</td></tr>
  <tr><td>系统</td><td>E4</td><td>教材结算单</td></tr>
  </table>
  <p><b>【0层图加工与数据流（部分）】</b>加工：P1 申报处理、P2 审核处理、P3 到货处理、P4 结算处理；数据存储：D1 教材信息表、D2 征订汇总表、D3 到货记录表。</p>
  <table>
  <tr><th>加工</th><th>输入数据流（来源）</th><th>输出数据流（去向）</th></tr>
  <tr><td>P1 申报处理</td><td>教材申报单（E1）；教材信息（D1）</td><td>申报信息（D2）；申报结果（E1）</td></tr>
  <tr><td>P2 审核处理</td><td>审核意见（E2）；申报信息（D2）</td><td>教材订单（E3）</td></tr>
  <tr><td>P3 到货处理</td><td>到货通知（E3）</td><td>到货记录（D3）；征订状态更新（D2）；到货通报（E2）</td></tr>
  <tr><td>P4 结算处理</td><td><b>（未画出）</b></td><td>教材结算单（E4）</td></tr>
  </table>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">试题二 · 某快递订单管理系统（数据库设计，15分）</h2>
  <p><b>【说明】</b>某快递公司开发订单管理系统。经需求分析得到：</p>
  <p>(1) 一个寄件人可以寄出多件快件（对应多张订单），一张订单只属于一个寄件人；</p>
  <p>(2) 一张订单由一名快递员负责揽收，一名快递员可揽收多张订单。</p>
  <p><b>【初步关系模式】</b>（下划线暂未标注）：</p>
  <pre>寄件人（寄件人编号, 姓名, 电话, 地址）
订单（订单号, 寄件人编号, 快递员工号, 重量, 费用, 状态）
快递员（工号, 姓名, 电话, 服务区域）</pre>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">试题三 · 某在线考试系统（UML，15分）</h2>
  <p><b>【说明】</b>某在线考试系统部分需求如下：</p>
  <p>(1) 考生登录后开始考试；考试过程中进行答题，每次作答后系统都要执行"保存答案"；考试时间到时，系统才自动执行"超时自动交卷"（仅在超时情况下发生）。</p>
  <p>(2) 一份试卷（Exam）由多道试题（Question）组成，每份试卷至少含一道试题，试题一旦离开试卷便无意义；单选题（SingleChoice）是试题的一种。</p>
  <p>(3) 交互过程：考生向"考试控制"对象发送"提交答案"消息后，"考试控制"对象再调用"试卷"对象的"判分"方法。</p>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">试题四 · 折半查找算法（C 代码填空，15分）</h2>
  <p><b>【说明】</b>下列 C 程序在<b>升序</b>数组 a[0..n-1] 中查找关键字 key，找到时返回其数组下标，找不到返回 -1。</p>
  <pre>int bSearch(int a[], int n, int key)
{
    int low = 0, high = n - 1;
    while ( __(1)__ ) {
        int mid = low + (high - low) / 2;
        if (a[mid] == key)
            return __(2)__;
        else if (a[mid] &gt; key)
            __(3)__;
        else
            __(4)__;
    }
    return __(5)__;
}</pre>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">试题五 · Java 程序设计（课程通知系统，15分）</h2>
  <p><b>【说明】</b>某课程通知系统采用经典设计模式实现：课程（Course）是被观察目标，学生（Student）是观察者。课程发布通知时，所有已注册的学生都会收到消息。</p>
  <pre>import java.util.*;

interface Observer {
    __(1)__      // 声明回调方法：接收通知消息
}

class Student __(2)__ Observer {
    private String name;
    public Student(String name) { this.name = name; }
    public void update(String message) {
        System.out.println(name + " 收到：" + message);
    }
}

class Course {
    private List&lt;Observer&gt; observers = new ArrayList&lt;Observer&gt;();
    public void attach(Observer o) { observers.add(o); }
    public void notifyAll(String message) {
        for (Observer o : __(3)__)
            __(4)__;
    }
}

public class Main {
    public static void main(String[] args) {
        Course c = new Course();
        c.attach(new Student("张三"));
        c.attach(new Student("李四"));
        __(5)__
    }
}</pre>
  `,
  questions: [
    { id: 1, section: '一、试题一·教材征订系统（数据流图）', type: 'blank', hint: '输入名称，如：教师', question: '外部实体 <b>E1</b> 的名称是____。', answer: '教师', accept: ['老师'], analysis: '【考点：外部实体识别】顶层图中向系统提交"教材申报单"、接收"申报结果"的角色是教师（说明(1)）。外部实体是系统外与系统交互的人或组织。' },
    { id: 2, section: '一、试题一·教材征订系统（数据流图）', type: 'blank', hint: '输入名称，如：财务处', question: '外部实体 <b>E4</b> 的名称是____。', answer: '财务处', accept: ['财务'], analysis: '【考点：外部实体识别】系统仅向 E4 发送"教材结算单"（说明(4)），接收方为财务处。单向接收数据的外部实体同样合法——判断依据是数据流方向与说明的对应。' },
    { id: 3, section: '一、试题一·教材征订系统（数据流图）', type: 'blank', hint: '输入名称，如：到货记录表', question: '数据存储 <b>D3</b> 的名称是____。', answer: '到货记录表', accept: ['到货记录', '到货记录文件', '到货记录档案'], analysis: '【考点：数据存储识别】P3 到货处理将"到货记录"写入 D3（说明(3)"在到货记录表中登记到货记录"）。存储名常以"表/文件/档案"结尾，从加工的写入对象反推。' },
    { id: 4, section: '一、试题一·教材征订系统（数据流图）', type: 'blank', hint: '输入数据流名称（名词），如：征订汇总信息', question: '0层图中加工 P4"结算处理"的输入数据流未画出。根据说明(4)，这条缺失数据流的名称是____（起点 D2，终点 P4）。', answer: '征订汇总信息', accept: ['征订信息', '征订汇总', '申报信息', '征订汇总表数据', '征订数据', '汇总征订信息'], analysis: '【考点：补充数据流】说明(4)"系统根据征订汇总表生成教材结算单"表明存在 D2→P4 的数据流，名称规范用名词，如"征订汇总信息"。补数据流三件套：名称+起点（D2）+终点（P4）。' },
    { id: 5, section: '一、试题一·教材征订系统（数据流图）', question: '若图中将"供应商提交的到货通知"画成从 E3 直接写入 D3（不经过任何加工），该画法违反的规则是（　）。', options: ['加工只有输入没有输出（黑洞）', '加工只有输出没有输入（奇迹）', '数据流未经加工直接连接外部实体与数据存储', '父图与子图数据流不平衡'], answer: 'C', analysis: '【考点：直连错误】外部实体与数据存储之间不能直接连数据流：数据必须经过加工才能从实体进入存储（应画为 E3→P3 到货处理→D3）。判定口诀：每条数据流至少一端必须是加工。' },
    { id: 6, section: '一、试题一·教材征订系统（数据流图）', question: '按 0 层图原样（P4 未画任何输入），加工 P4"结算处理"存在的错误类型是（　）。', options: ['黑洞（只有输入）', '奇迹/白洞（只有输出）', '数据流直连', '父子图不平衡'], answer: 'B', analysis: '【考点：错误类型判定】P4 只有输出"教材结算单"而无任何输入，数据"无中生有"，属奇迹（白洞）。修复即补充 D2→P4 的输入数据流（第4小题）。' },
    { id: 7, section: '二、试题二·快递订单系统（数据库设计）', question: '"寄件人"与"订单"之间联系的类型是（　）。', options: ['1:1（一对一）', 'm:n（多对多）', 'n:1（多对一）', '1:n（一对多）'], answer: 'D', analysis: '【考点：联系类型】一个寄件人寄多张订单（寄件人端1→订单端多），一张订单只属于一个寄件人（订单端1→寄件人端1）→ 1:n。两个方向各问一遍"一个X对应几个Y"。' },
    { id: 8, section: '二、试题二·快递订单系统（数据库设计）', question: '"订单"关系模式的主键是（　）。', options: ['订单号', '（寄件人编号, 订单号）', '快递员工号', '（订单号, 状态）'], answer: 'A', analysis: '【考点：主键判定】订单号能唯一标识一张订单且不含多余属性。寄件人编号、快递员工号都不是订单的候选键（同一寄件人/快递员有多张订单）。' },
    { id: 9, section: '二、试题二·快递订单系统（数据库设计）', question: '"订单"关系模式的外键是（　）。', options: ['仅寄件人编号', '仅快递员工号', '寄件人编号和快递员工号', '订单关系没有外键'], answer: 'C', analysis: '【考点：外键判定】订单表中的寄件人编号、快递员工号分别参照寄件人表和快递员表的主键，两个都是外键。两个 1:n 联系各贡献一个外键。' },
    { id: 10, section: '二、试题二·快递订单系统（数据库设计）', question: '将"寄件人与订单的 1:n 联系"转换为关系模式的正确做法是（　）。', options: ['在"订单"（n端）关系中加入"寄件人编号"作为外键', '单独建立一个关系模式，主键为两端主键的组合', '在"寄件人"（1端）关系中加入"订单号"', '两端都不处理，由应用程序保证对应关系'], answer: 'A', analysis: '【考点：ER转换规则】1:n 联系并入 n 端关系：在 n 端（订单）加入 1 端（寄件人）的主键作外键。单独建表只用于 m:n 联系（组合主键是 m:n 的做法）。' },
    { id: 11, section: '二、试题二·快递订单系统（数据库设计）', question: '查询"费用大于 50 元的订单号及其寄件人姓名"，正确的 SQL 语句是（　）。', options: ['SELECT 订单号, 姓名 FROM 订单, 寄件人 WHERE 费用 > 50', 'SELECT o.订单号, s.姓名 FROM 订单 o JOIN 寄件人 s ON o.寄件人编号 = s.寄件人编号 WHERE o.费用 > 50', 'SELECT o.订单号, s.姓名 FROM 订单 o JOIN 寄件人 s ON o.费用 > 50', 'SELECT o.订单号, s.姓名 FROM 订单 o JOIN 寄件人 s ON o.寄件人编号 = s.寄件人编号 WHERE s.姓名 = 50'], answer: 'B', analysis: '【考点：连接查询】两表连接必须写连接条件（ON o.寄件人编号=s.寄件人编号），过滤条件放 WHERE。A 缺连接条件会产生笛卡尔积；C 把过滤条件写进了 ON；D 的 WHERE 条件语义错误。' },
    { id: 12, section: '二、试题二·快递订单系统（数据库设计）', question: '若在"订单"关系模式中再增加"寄件人姓名"列（该姓名可由寄件人编号推出），则"订单"关系（　）。', options: ['仍满足 BCNF', '存在部分函数依赖，最高属于 1NF', '存在传递函数依赖，最高属于 2NF', '连 1NF 都不满足'], answer: 'C', analysis: '【考点：范式判定】订单号→寄件人编号→寄件人姓名，非主属性"寄件人姓名"传递函数依赖于主键，不满足 3NF；不存在部分依赖（主键是单个属性订单号），故最高属于 2NF。' },
    { id: 13, section: '三、试题三·在线考试系统（UML）', question: '用例图中，"答题"与"保存答案"两个用例之间的关系是（　）。', options: ['include（《包含》）', 'extend（《扩展》）', '泛化（继承）', '关联'], answer: 'A', analysis: '【考点：include/extend】每次答题后必然执行保存答案——必然发生、无条件 → include（答题包含保存答案）。判别：必然发生用 include，有条件才发生用 extend。' },
    { id: 14, section: '三、试题三·在线考试系统（UML）', question: '"超时自动交卷"仅在考试时间到的条件下才发生，它与"交卷"用例之间的关系是（　）。', options: ['include（《包含》）', 'extend（《扩展》）', '依赖', '实现'], answer: 'B', analysis: '【考点：include/extend】"仅在超时情况下发生"是 extend 的典型信号：扩展用例在特定条件下对基础用例（交卷）进行扩展。方向：扩展用例指向基础用例。' },
    { id: 15, section: '三、试题三·在线考试系统（UML）', question: '"一份试卷由多道试题组成，每份试卷至少含一道试题"，则类图中"试题"端的多重度应标注为（　）。', options: ['0..*', '0..1', '1..1', '1..*'], answer: 'D', analysis: '【考点：多重度】"至少一道、可多"→ 1..*。0..* 表示可以没有试题，与"至少含一道"矛盾。' },
    { id: 16, section: '三、试题三·在线考试系统（UML）', question: '"试题一旦离开试卷便无意义"，则试卷（Exam）与试题（Question）之间最合适的关系是（　）。', options: ['聚合', '组合', '依赖', '泛化'], answer: 'B', analysis: '【考点：聚合vs组合】部分不能脱离整体独立存在 → 组合（实心菱形）；部分可独立存在（如班级与学生毕业仍存在）→ 聚合（空心菱形）。' },
    { id: 17, section: '三、试题三·在线考试系统（UML）', question: '在顺序图中，消息（交互）的先后时间顺序是按（　）表示的。', options: ['从左到右', '从下到上', '从上到下', '与位置无关'], answer: 'C', analysis: '【考点：顺序图】纵轴（生命线）自上而下表示时间推进，消息按发生顺序从上往下排列；横轴表示参与交互的对象。' },
    { id: 18, section: '四、试题四·折半查找（算法填空）', question: '空（1）处应填入的循环条件是（　）。', options: ['low &lt; high', 'low = high', 'high - low &gt; 1', 'low &lt;= high'], answer: 'D', analysis: '【考点：折半查找边界】low==high 时区间仍有一个元素待检查，条件必须取 low&lt;=high，否则漏判最后一个元素（最常见边界错误）。' },
    { id: 19, section: '四、试题四·折半查找（算法填空）', question: '空（2）处应填入的语句是（　）。', options: ['mid', 'low', 'high', '0'], answer: 'A', analysis: '【考点：返回位置】a[mid]==key 时查找成功，返回当前下标 mid。返回 low/high 都只在恰好收敛到边界时碰巧正确。' },
    { id: 20, section: '四、试题四·折半查找（算法填空）', question: '空（3）处应填入的语句是（　）。', options: ['high = mid', 'low = mid + 1', 'high = mid - 1', 'high = low'], answer: 'C', analysis: '【考点：区间收缩】数组升序且 a[mid]&gt;key，说明 key 在左半区，丢弃 mid 及其右侧：high = mid-1。填 high=mid 会死循环（区间不再缩小）。' },
    { id: 21, section: '四、试题四·折半查找（算法填空）', question: '空（4）处应填入的语句是（　）。', options: ['low = mid + 1', 'low = mid', 'high = mid - 1', 'low = high'], answer: 'A', analysis: '【考点：区间收缩】a[mid]&lt;key 时 key 在右半区：low = mid+1。与空(3)对称——"大往左、小往右"，且必须越过 mid。' },
    { id: 22, section: '四、试题四·折半查找（算法填空）', question: '空（5）处应填入的返回值是（　）。', options: ['1', '-1', 'mid', 'n'], answer: 'B', analysis: '【考点：查找失败返回】循环结束仍未找到（low&gt;high），按题干约定返回 -1 表示失败。返回 n 或 0 会与合法下标混淆。' },
    { id: 23, section: '四、试题四·折半查找（算法填空）', question: '该算法能够正确工作的前提条件是（　）。', options: ['数组元素已按关键字有序（如升序）排列', '数组元素互不相同', '数组元素均为正整数', 'n 恰好为 2 的整数次幂'], answer: 'A', analysis: '【考点：折半查找前提】依赖"中点元素与 key 比较后能排除一半区间"的逻辑，只有序列有序才成立。元素重复或非整数都不影响正确性。' },
    { id: 24, section: '四、试题四·折半查找（算法填空）', question: '该算法的平均/最坏时间复杂度是（　）。', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log₂n)'], answer: 'D', analysis: '【考点：复杂度】每轮比较后区间减半：n → n/2 → … → 1，共约 log₂n 轮，复杂度 O(log₂n)。这是它与顺序查找 O(n) 的本质差别。' },
    { id: 25, section: '五、试题五·Java 课程通知系统', question: '空（1）处应填入的接口方法声明是（　）。', options: ['void update(String message);', 'String update();', 'void notify(String message);', 'int update(String message, int flag);'], answer: 'A', analysis: '【考点：接口方法】Student 实现的方法签名是 public void update(String message)，接口中方法声明须与其一致（访问修饰符可省略，public 为默认）：void update(String message);。' },
    { id: 26, section: '五、试题五·Java 课程通知系统', question: '空（2）处应填入的关键字是（　）。', options: ['extends', 'implements', 'imports', 'instanceof'], answer: 'B', analysis: '【考点：接口实现】类实现接口用 implements；extends 用于继承类（或接口继承接口）。Student 通过 implements Observer 成为观察者。' },
    { id: 27, section: '五、试题五·Java 课程通知系统', question: '空（3）处应填入的循环遍历对象是（　）。', options: ['message', 'students', 'observers', 'args'], answer: 'C', analysis: '【考点：集合遍历】notifyAll 要通知所有已注册观察者，遍历的正是成员变量 List&lt;Observer&gt; observers。students 变量并不存在。' },
    { id: 28, section: '五、试题五·Java 课程通知系统', question: '空（4）处应填入的语句是（　）。', options: ['o.notifyAll(message);', 'observers.update(message);', 'System.out.println(message);', 'o.update(message);'], answer: 'D', analysis: '【考点：多态调用】对每个观察者 o 调用其 update(message) 接收回调——这正是观察者模式的核心：目标不关心观察者具体类型，统一通过接口方法通知。' },
    { id: 29, section: '五、试题五·Java 课程通知系统', question: '空（5）处应填入的语句是（　）。', options: ['c.notifyAll("明天上午9点直播课");', 'new Course().update("明天上午9点直播课");', 'Observer.update("明天上午9点直播课");', 'Student.update("明天上午9点直播课");'], answer: 'A', analysis: '【考点：主流程】演示效果：对已注册两个学生的课程对象 c 调用 notifyAll 发布通知。接口不能直接调用静态方法、Course 没有 update 方法，B、C、D 均编译或语义错误。' },
    { id: 30, section: '五、试题五·Java 课程通知系统', question: '该程序采用的设计模式及其类别是（　）。', options: ['观察者模式（行为型）', '单例模式（创建型）', '适配器模式（结构型）', '工厂方法模式（创建型）'], answer: 'A', analysis: '【考点：模式识别】"目标—观察者接口—注册列表—统一通知"是观察者模式的标准骨架，属于行为型模式。识别信号：attach/注册 + 遍历调用统一接口方法。' },
    { id: 31, section: '五、试题五·Java 课程通知系统', question: '该设计模式的主要意图是（　）。', options: ['将对象组合成树形结构，以表示"整体—部分"的层次结构', '为子系统中的一组接口提供一个统一的高层接口', '定义对象间一对多的依赖关系，当一个对象状态改变时自动通知所有依赖它的对象', '动态地给一个对象添加额外的职责'], answer: 'C', analysis: '【考点：模式意图】一对多依赖＋状态变化自动通知，即"发布—订阅"机制。A 是组合模式、B 是外观模式、D 是装饰模式——四种意图必须能对号入座。' }
  ]
}

};
