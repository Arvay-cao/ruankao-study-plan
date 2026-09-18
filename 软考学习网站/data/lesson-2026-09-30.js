// 2026-09-30（周三）第6周 · 算法、模式与首次连考 | 算法强化
// 讲义 + 2道算法大题（代码填空+策略复杂度，含答案与解析，已逐题校验）
window.LESSONS = window.LESSONS || {};

window.LESSONS['2026-09-30'] = {

topic: '算法强化',

lecture: `
<div class="callout info">
<div class="callout-title">本讲说明</div>
<p><b>对应执行表任务：</b>完成2道算法题，标注关键循环、递归出口和复杂度。<b>当天产出：</b>算法解题检查表（见第7节）。</p>
<p><b>考情提示：</b>下午卷<b>试题四（约15分）</b>为算法题：题干给"算法说明+流程描述+代码"，代码中挖 4—6 个空让你填，再问 1—2 问算法策略与复杂度。代码语言为 C/C++（第5题才是 Java 选做）。<b>给分特点：按空给分，写对一半也有分</b>——策略题（分治/DP/贪心）与复杂度题（O(n)、O(nlogn)）是必须拿满的送分空。</p>
<p><b>今日时间安排（2小时）：</b>40分钟精读讲义 → 60分钟限时完成2道算法题（每题30分钟）→ 20分钟订正并整理检查表。</p>
</div>

<h2>1. 试题四的结构与出题套路</h2>
<table>
<tr><th>组成部分</th><th>说明</th></tr>
<tr><td>算法说明</td><td>用自然语言描述算法功能与思路（如"求最大子段和：依次考察每个元素…"），<b>答案 70% 藏在说明里</b></td></tr>
<tr><td>代码</td><td>150—300 行 C 代码，挖 4—6 个空；空的位置有固定套路（见第3节）</td></tr>
<tr><td>附加问题</td><td>"该算法采用了什么策略？""时间复杂度是多少？""空缺处应填什么？"——策略+复杂度各 1—2 分</td></tr>
</table>
<p><b>常考算法类型</b>（近十年统计）：排序与查找（折半、快排思想）、字符串处理（匹配、统计）、数组/矩阵运算、链表操作、递归（汉诺塔、阶乘、斐波那契）、经典 DP（最大子段和、背包、最长公共子序列）、贪心（活动选择、找零）、树遍历。</p>

<h2>2. 答题三步法（顺序不能乱）</h2>
<ol>
<li><b>先读算法说明</b>，画出"输入→处理→输出"。说明中每个句子都对应代码的一段。</li>
<li><b>用题目样例手工代入代码</b>：拿样例数据在草稿纸上逐行执行，变量列成表格。80% 的空可以在代入过程中自然得出。</li>
<li><b>定位空缺类型再作答</b>：先判断这个空是"初始化/边界/递推/出口/返回"中的哪一类（见下节），按类型套模板。</li>
</ol>
<div class="callout key">
<div class="callout-title">手工代入法（下午题第一神技）</div>
<p>列一张变量跟踪表：每行=一次循环，列=关键变量（i、sum、max…）。代入 2—3 轮后，代码意图自然浮出水面——"哦，sum 在累计，max 在记录最大值"。这一招对 DP、递归、链表题全部有效，比盯着代码空想快 5 倍。今天两道题都要用表格代入法做。</p>
</div>

<h2>3. 空缺的五大高频位置（对着套路填） <span class="stars">★★★</span></h2>
<table>
<tr><th>空缺类型</th><th>典型位置</th><th>作答要领</th></tr>
<tr><td><b>① 初始化</b></td><td>函数开头：sum=0、max=0、low=0、high=n-1、p=L-&gt;next</td><td>看"空子段返回什么""边界从哪开始"</td></tr>
<tr><td><b>② 循环边界</b></td><td>for(i=0; i&lt;n; i++)、while(low&lt;=high)、i&lt;=n vs i&lt;n</td><td>数元素个数：n 个元素下标 0..n-1；代入首末轮验证</td></tr>
<tr><td><b>③ 递推/核心逻辑</b></td><td>sum=sum+a[i]、low=mid+1、p=p-&gt;next</td><td>从说明句翻译；看上下文两行一般能推出</td></tr>
<tr><td><b>④ 递归出口</b></td><td>if(n==0) return 1; if(n&lt;=1) return a[low];</td><td>最小规模的返回值；出口错了整个递归崩</td></tr>
<tr><td><b>⑤ 返回值</b></td><td>return max; return -1; return mid;</td><td>看题目要"位置"还是"值"，找不到返回什么</td></tr>
</table>

<h2>4. 必会算法模板（考试直接套）</h2>
<h3>4.1 折半查找（二分）</h3>
<pre>low=0; high=n-1;
while (low &lt;= high) {
    mid = (low + high) / 2;
    if (a[mid] == key) return mid;
    else if (a[mid] &gt; key) high = mid - 1;   // 往左半区
    else low = mid + 1;                       // 往右半区
}
return -1;                                     // low &gt; high 即不存在</pre>
<p>前提：<b>数组有序</b>。复杂度 O(log<sub>2</sub>n)。n 个元素最多比较 ⌈log<sub>2</sub>(n+1)⌉ 次。</p>
<h3>4.2 最大子段和（DP 经典）</h3>
<pre>sum = 0; max = 0;
for (i = 0; i &lt; n; i++) {
    if (sum &gt; 0) sum = sum + a[i];   // 前缀有正贡献才继续累计
    else         sum = a[i];          // 负前缀拖后腿，从当前元素重新开始
    if (sum &gt; max) max = sum;        // 更新最大值
}</pre>
<p>含义：sum 记录"以 a[i] 结尾的最大子段和"，max 记录全局最大。负前缀果断舍弃——这是 DP "最优子结构"的体现。</p>
<h3>4.3 递归三件套（以阶乘为例）</h3>
<pre>long fact(int n) {
    if (n == 0) return 1;           // ① 出口：最小规模
    return n * fact(n - 1);         // ② 递推：缩小规模 + ③ 自身调用
}</pre>
<p>写递归填空先找<b>出口</b>（什么情况直接返回），再找<b>规模缩小</b>（参数怎么变：n-1 / low,high 收缩 / p-&gt;next）。</p>

<h2>5. 复杂度速查表（策略题必背）</h2>
<table>
<tr><th>复杂度</th><th>典型算法</th></tr>
<tr><td>O(1)</td><td>直接计算、哈希查找（理想）</td></tr>
<tr><td>O(logn)</td><td>折半查找、平衡二叉树查找</td></tr>
<tr><td>O(n)</td><td>顺序查找、一趟扫描（最大子段和DP、快排划分一趟）</td></tr>
<tr><td>O(nlogn)</td><td>归并排序、堆排序、快排（平均）、折半插入</td></tr>
<tr><td>O(n²)</td><td>简单选择、冒泡、直接插入、快排（最坏）</td></tr>
<tr><td>O(n³)</td><td>矩阵相乘（朴素）、Floyd 最短路</td></tr>
<tr><td>O(2ⁿ)</td><td>汉诺塔、子集枚举</td></tr>
</table>

<h2>6. 算法策略识别表（第1问专用） <span class="stars">★★★</span></h2>
<table>
<tr><th>策略</th><th>核心特征</th><th>识别信号</th><th>代表题</th></tr>
<tr><td><b>分治法</b></td><td>分解→求解子问题→合并；子问题<b>独立</b></td><td>"分成两半""递归解决再合并"</td><td>归并排序、快排、折半、二分</td></tr>
<tr><td><b>动态规划</b></td><td>子问题<b>重叠</b>，自底向上填表，保存子问题解</td><td>"最优子结构""dp表/记录中间结果""不重复计算"</td><td>最大子段和、背包、LCS、Floyd</td></tr>
<tr><td><b>贪心法</b></td><td>每步取<b>局部最优</b>，不回头</td><td>"每次选取最大/最小的…""排序后依次选取"</td><td>活动选择、找零钱、部分背包、Dijkstra、Prim、Kruskal</td></tr>
<tr><td><b>回溯法</b></td><td>深度优先搜索解空间，走不通就<b>回退</b>（剪枝）</td><td>"尝试—失败—撤销选择""所有可能组合"</td><td>N皇后、迷宫、子集和、图着色</td></tr>
</table>
<div class="callout warn">
<div class="callout-title">分治 vs 动态规划（最爱考的辨析）</div>
<p>两者都"分解为子问题"。区别：分治的子问题<b>互不重叠</b>（快排左右两半互不相干）；DP 的子问题<b>反复出现</b>（fib(n-1) 与 fib(n-2) 都要算 fib(n-3)），所以要把算过的结果<b>存表</b>避免重复计算。题干出现"保存/记录子问题的解"→DP；出现"分成两半各自递归再合并"→分治。</p>
</div>

<h2>7. 当天产出：算法解题检查表（抄一遍）</h2>
<table>
<tr><th>#</th><th>检查项</th><th>口诀</th></tr>
<tr><td>1</td><td>读完算法说明再碰代码</td><td>说明即伪代码</td></tr>
<tr><td>2</td><td>样例手工代入 2—3 轮</td><td>变量列成表</td></tr>
<tr><td>3</td><td>每个空先分类：初始化/边界/递推/出口/返回</td><td>五类套模板</td></tr>
<tr><td>4</td><td>循环边界代入首轮和末轮验证</td><td>查 0 和 n-1</td></tr>
<tr><td>5</td><td>递归必须有出口，出口返回最小规模结果</td><td>无出口死循环</td></tr>
<tr><td>6</td><td>策略题按第6节信号词识别</td><td>重叠→DP；独立→分治</td></tr>
<tr><td>7</td><td>复杂度按循环嵌套层数+第5节表写</td><td>一层n、两层n²、每次减半logn</td></tr>
<tr><td>8</td><td>交卷前把填的空连起来通读一遍</td><td>语法与逻辑双查</td></tr>
</table>

<h2>8. 自检清单</h2>
<ol>
<li>五大空缺类型各自的作答要领？</li>
<li>折半查找的三个关键空（循环条件、两个边界更新）分别是什么？为什么是 low&lt;=high 而不是 low&lt;high？</li>
<li>最大子段和中"sum&gt;0"这个判断的含义？</li>
<li>分治、DP、贪心、回溯的识别信号词各是什么？</li>
<li>O(nlogn) 的排序有哪些？快排最坏是什么？</li>
</ol>

<div class="callout tip">
<div class="callout-title">完成本日后</div>
<p>明日（10/1 周四）开始<b>设计模式两连讲</b>：先创建型与结构型（单例、工厂、适配器、装饰器等12个模式），25题。设计模式是上午题常客、也是 10/5 Java 选做题的骨架，一次学透。</p>
</div>
`,

quiz: {
  kind: 'afternoon',
  suggestedMinutes: 60,
  note: '下午试题四题型：2 道算法大题。代码空缺按选择题作答（从候选代码中挑）；策略名与复杂度按填空作答（如：动态规划、O(n)）。每题建议 30 分钟，务必先在草稿纸上手工代入样例。',
  scenario: `
  <h2 style="margin-top:0">题1 · 最大子段和（限时30分钟）</h2>
  <p><b>【算法说明】</b>给定 n 个整数组成的序列 a[0..n-1]，求该序列中<b>连续子段</b>之和的最大值（规定空子段和为 0，即结果非负）。例如序列 (-2, 11, -4, 13, -5, -2) 的最大子段和为 20（子段 11, -4, 13）。</p>
  <p>算法思想：用 sum 保存"以当前元素 a[i] 结尾的最大子段和"，用 max 保存全局最大值。若之前累计的 sum 大于 0（对后续有正贡献），则继续累加当前元素；否则舍弃之前的累计，从当前元素重新开始累计。</p>
  <p><b>【C 代码】</b></p>
  <pre>int maxSum(int a[], int n)
{
    int i, sum, max;
    sum = 0;
    max = 0;
    for (i = 0; i &lt; n; i++) {
        if (【空1】)
            sum = sum + a[i];
        else
            sum = a[i];
        if (【空2】)
            max = sum;
    }
    return max;
}</pre>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">题2 · 折半查找（限时30分钟）</h2>
  <p><b>【算法说明】</b>在<b>升序</b>数组 a[0..n-1] 中查找 key，找到返回其下标，找不到返回 -1。设 low、high 为当前查找区间的下界与上界，mid 为区间中点：若 a[mid] 等于 key 则查找成功；若 a[mid] 大于 key，则 key 只可能在左半区间，收缩上界；否则收缩下界；区间为空即查找失败。</p>
  <p><b>【C 代码】</b></p>
  <pre>int bsearch(int a[], int n, int key)
{
    int low = 0, high = n - 1, mid;
    while (【空3】) {
        mid = (low + high) / 2;
        if (a[mid] == key)
            return mid;
        else if (a[mid] &gt; key)
            【空4】;
        else
            【空5】;
    }
    return -1;
}</pre>
  `,
  questions: [
    { id: 1, section: '一、最大子段和', question: '空1 处应填（　）。', options: ['sum &gt; 0', 'sum &lt; 0', 'a[i] &gt; 0', 'max &gt; 0'], answer: 'A', analysis: '【考点：递推核心】说明原句"若之前累计的 sum 大于 0（对后续有正贡献），则继续累加"→条件是 sum &gt; 0。手工代入验证：i=0 时 sum=0 不大于 0，走 else 分支 sum=a[0]=-2，正确（-2 开头的负前缀应舍弃）。' },
    { id: 2, section: '一、最大子段和', question: '空2 处应填（　）。', options: ['sum &lt; max', 'sum &gt; max', 'a[i] &gt; max', 'sum &gt; 0'], answer: 'B', analysis: '【考点：更新最优值】max 保存全局最大，每轮累计后若当前 sum 更大则更新：if (sum &gt; max) max = sum。这是"打擂台"模板：最优值更新永远是"当前值 &gt; 记录值 才更新"。' },
    { id: 3, section: '一、最大子段和', type: 'blank', hint: '输入算法策略名，如：动态规划', question: '该算法采用的算法策略是____。', answer: '动态规划', accept: ['DP', 'dynamicprogramming', '动态规划法'], analysis: '【考点：策略识别】"以 a[i] 结尾的最大子段和"由"以 a[i-1] 结尾的最大子段和"推出（最优子结构），子问题重叠、自底向上一次扫描求解→动态规划。识别信号：说明中"保存以当前元素结尾的…最大值"就是 dp 状态定义。' },
    { id: 4, section: '一、最大子段和', type: 'blank', hint: '输入复杂度，如：O(n)', question: '该算法的时间复杂度是____。', answer: 'O(n)', accept: ['O(n)', 'n', 'O(N)', 'ON'], analysis: '【考点：复杂度】单层循环、每次迭代常数操作→O(n)。复杂度按循环嵌套数：一层 O(n)、两层 O(n²)、每轮区间减半 O(logn)。' },
    { id: 5, section: '一、最大子段和', type: 'blank', hint: '输入数字，如：20', question: '手工代入：调用 maxSum(a, 6)，其中 a = (-2, 11, -4, 13, -5, -2)，函数返回值是____。', answer: '20', analysis: '【考点：手工代入】跟踪：i=0: sum=-2,max=0；i=1: sum=11,max=11；i=2: sum=7,max=11；i=3: sum=20,max=20；i=4: sum=15；i=5: sum=13。返回 20（子段 11,-4,13）。代入法是算法题第一技能，本题务必自己动笔走一遍。' },
    { id: 6, section: '一、最大子段和', question: '代码中"else 分支 sum = a[i]"的作用是（　）。', options: ['把累计和清零', '当前缀和为负（无正贡献）时舍弃它，从当前元素重新开始累计子段', '跳过当前元素', '把负数元素过滤掉'], answer: 'B', analysis: '【考点：DP 语义】sum≤0 意味着之前的子段对后续只有拖累，接上它不如从 a[i] 重新开始——所以直接 sum=a[i]。注意不是清零（A，sum=0 会在 a[i] 为负时得出错误子段），也没有跳过或过滤元素（C/D，子段是连续的，元素一个都不能跳）。' },
    { id: 7, section: '二、折半查找', question: '空3 处应填（　）。', options: ['low &lt; high', 'low &lt;= high', 'low != high', 'mid &lt;= high'], answer: 'B', analysis: '【考点：循环边界】区间[low, high]非空的条件是 low&lt;=high。若写 low&lt;high，当区间收缩到只剩一个元素（low==high）时循环提前退出，会漏判该元素。代入验证：n=1 时 low=0,high=0，必须能进循环比较一次。' },
    { id: 8, section: '二、折半查找', question: '空4 处应填（　）。', options: ['high = mid', 'high = mid - 1', 'low = mid + 1', 'high = low'], answer: 'B', analysis: '【考点：边界收缩】a[mid]&gt;key → key 在左半区，上界收缩到 mid-1（mid 已比较过，必须排除）。写 high=mid 会把已比较的 mid 留在区间里，可能死循环（low==mid 时区间不再缩小）。折半两个空就是 mid±1，方向由"往哪半边找"决定。' },
    { id: 9, section: '二、折半查找', question: '空5 处应填（　）。', options: ['low = mid', 'low = mid + 1', 'high = mid - 1', 'mid = low + high'], answer: 'B', analysis: '【考点：边界收缩】a[mid]&lt;key → key 在右半区，下界收缩到 mid+1。空4空5合起来记：大于key→high=mid-1（往左）；小于key→low=mid+1（往右）。方向反了程序"越找越偏"，代入一轮即可发现。' },
    { id: 10, section: '二、折半查找', type: 'blank', hint: '输入前提条件，如：有序', question: '使用折半查找的前提条件是数组必须____。', answer: '有序', accept: ['已排序', '按升序排序', '递增有序', '升序'], analysis: '【考点：前提条件】折半查找依赖"中点元素与key的大小关系能判断目标在哪半区"，这只在数组有序时成立。无序数组必须先排序或改用顺序查找。这是填空/选择题双料高频考点。' },
    { id: 11, section: '二、折半查找', type: 'blank', hint: '输入复杂度，如：O(logn)', question: '该算法的时间复杂度是____。', answer: 'O(logn)', accept: ['O(logn)', 'O(log₂n)', 'O(log2n)', 'O(lgn)', 'logn', 'O(logn)以2为底'], analysis: '【考点：复杂度】每轮区间缩小一半，n→n/2→…→1 共 log₂n 轮→O(log₂n)。所有"每次问题规模减半"的算法都是对数复杂度。注意n个元素的折半查找最多比较⌈log₂(n+1)⌉次。' },
    { id: 12, section: '二、折半查找', type: 'blank', hint: '输入数字，如：3', question: '手工代入：a = (5, 13, 19, 21, 37, 56, 64, 75, 80, 88, 92)（共11个元素），查找 key = 21，算法需要比较 a[mid] 与 key 的次数是____次。', answer: '3', analysis: '【考点：手工代入】第1轮：low=0,high=10,mid=5,a[5]=56&gt;21→high=4；第2轮：low=0,high=4,mid=2,a[2]=19&lt;21→low=3；第3轮：low=3,high=4,mid=3,a[3]=21→命中返回3。共比较3次。' },
    { id: 13, section: '二、折半查找', question: '当循环结束（执行到 return -1）时，说明（　）。', options: ['low &gt; high，查找区间为空，key 不存在', 'low &lt; high，还有元素未比较', 'a[mid] == key，查找成功', '数组无序'], answer: 'A', analysis: '【考点：失败判定】循环条件是 low&lt;=high，退出即 low&gt;high——区间为空，所有可能位置都已排除→不存在。"循环条件取反"是判断循环结束语义的通用方法。' },
    { id: 14, section: '三、策略与复杂度综合', question: '归并排序将序列分成两半分别排序再合并，其子问题互不重叠。它采用的策略与平均时间复杂度是（　）。', options: ['动态规划，O(n²)', '分治法，O(nlogn)', '贪心法，O(nlogn)', '回溯法，O(nlogn)'], answer: 'B', analysis: '【考点：策略识别+复杂度】"分成两半各自解决再合并"且左右两半互不重叠→分治法；归并排序任何情况下都是 O(nlogn)。对比：若说明写"保存子问题的解避免重复计算"→动态规划。' },
    { id: 15, section: '三、策略与复杂度综合', question: '"求解N皇后问题：逐行放置皇后，若当前位置冲突则回退到上一行重新选择"，该算法属于（　）。', options: ['贪心法', '动态规划', '回溯法（深度优先搜索+剪枝）', '分治法'], answer: 'C', analysis: '【考点：策略识别】"冲突则回退、重新选择"=试探失败后撤销并回溯→回溯法，实质是对解空间的深度优先搜索加剪枝。识别信号：尝试—失败—撤销。' },
    { id: 16, section: '三、策略与复杂度综合', question: '下列关于算法策略的说法，错误的是（　）。', options: ['动态规划适用于具有最优子结构和子问题重叠性质的问题', '贪心法每步选择局部最优解，不保证全局最优', '分治法的子问题之间相互独立、互不重叠', '回溯法一定能在线性时间内找到最优解'], answer: 'D', analysis: '【考点：策略对比】回溯法最坏要遍历整个解空间，复杂度通常是指数级（如N皇后O(n!)），不可能保证线性时间。A/B/C均为正确表述：最优子结构+重叠子问题→DP；贪心只保证局部最优；分治子问题独立。' }
  ]
}

};
