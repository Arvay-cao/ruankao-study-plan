// 2026-09-06（周六）第2周 · 数据结构与算法 | 算法下午题①
// 讲义 + 2道算法大题（代码填空，含答案与解析，已逐题校验）
window.LESSONS = window.LESSONS || {};

window.LESSONS['2026-09-06'] = {

topic: '算法下午题①',

lecture: `
<div class="callout info">
<div class="callout-title">本讲说明</div>
<p><b>对应执行表任务：</b>完成2道算法填空题；先手工跟踪变量，再核对答案并重写。<b>当天产出：</b>2道完整算法题（含订正后的完整代码）。</p>
<p><b>考情提示：</b>下午卷<b>试题四（约15分）</b>是算法题：题干给"算法说明＋C代码"，代码挖 4—6 个空让你填。<b>按空给分</b>，写对一半也有分。今天是本计划第一次专项训练下午题，目标是建立"手工代入"的做题习惯。</p>
<p><b>今日时间安排（4小时）：</b>60分钟精读讲义 → 100分钟完成2道大题（每题50分钟）→ 80分钟订正、重写完整代码、整理错因。</p>
</div>

<h2>1. 算法下午题的评分方式</h2>
<table>
<tr><th>给分点</th><th>说明</th><th>建议</th></tr>
<tr><td>代码填空（每空2分左右）</td><td>填"初始化、边界、递推、指针移动、返回值"</td><td>写与标准答案等价的代码即可得分，不必逐字相同</td></tr>
<tr><td>策略/复杂度问答（2—4分）</td><td>"采用了什么算法策略？时间复杂度？"</td><td>用规范术语：动态规划、贪心、O(nlogn)</td></tr>
<tr><td>过程描述（少数年份）</td><td>"说明某语句的作用"</td><td>答"防止断链/保存后继指针"这类功能表述</td></tr>
</table>

<h2>2. 答题三步法（今天开始固定使用）</h2>
<ol>
<li><b>先读算法说明</b>：说明是自然语言版的代码，每句话对应一段代码，答案 70% 藏在说明里。</li>
<li><b>样例手工代入</b>：用题目给的小例子（或自造 3—5 个元素）在草稿纸上<b>逐行执行</b>，变量列成表格。</li>
<li><b>对空分类作答</b>：每个空先判断属于"初始化 / 循环边界 / 递推逻辑 / 指针移动 / 返回值"哪一类，再套对应模板。</li>
</ol>

<h2>3. 变量跟踪表（下午题第一神技）</h2>
<div class="callout key">
<div class="callout-title">跟踪表画法</div>
<p>每行 = 一轮循环；列 = 所有关键变量（i、j、left、right、p、q、a[]的当前状态）。例：序列 (1,2,3,4,5)，双指针逆置过程：</p>
<pre>轮次  left  right  操作             数组状态
 1     0     4     交换a[0],a[4]    (5,2,3,4,1)
 2     1     3     交换a[1],a[3]    (5,4,3,2,1)
 3     2     2     left&lt;right不成立  结束</pre>
<p>画完表，循环条件、指针推进、交换对象三个空自动浮出。</p>
</div>

<h2>4. 数组类题的三大考点（今日题1）</h2>
<table>
<tr><th>考点</th><th>要领</th></tr>
<tr><td>双指针</td><td>逆置、对撞扫描：left 从头、right 从尾，left&lt;right 时交换并相向推进；相遇/交错即止</td></tr>
<tr><td>区间划分</td><td>"左移 p 位" = 前段 [0, p-1] 与后段 [p, n-1] 两段交换位置</td></tr>
<tr><td>下标边界</td><td>n 个元素下标 0..n-1；p 个元素是 [0, p-1] 不是 [0, p]——代入首轮和末轮各验一次</td></tr>
</table>
<h3>4.1 循环左移的三次逆置法（经典必会）</h3>
<p>把 (a₀…a<sub>p-1</sub> | a<sub>p</sub>…a<sub>n-1</sub>) 变为 (a<sub>p</sub>…a<sub>n-1</sub> | a₀…a<sub>p-1</sub>)：①逆置前段；②逆置后段；③整体逆置。数学本质：设前段为 X、后段为 Y，(X<sup>R</sup>Y<sup>R</sup>)<sup>R</sup> = YX。</p>
<pre>例：a=(1,2,3,4,5,6,7)，p=3
① 逆置前3个 → (3,2,1,4,5,6,7)
② 逆置后4个 → (3,2,1,7,6,5,4)
③ 整体逆置 → (4,5,6,7,1,2,3)  ✓</pre>
<p>总代价 = p/2 + (n-p)/2 + n/2 ≈ n 次交换，<b>O(n) 时间、O(1) 空间</b>，优于"逐个左移 n 次×p 个元素"的朴素 O(n×p)。</p>

<h2>5. 链表类题的两大考点（今日题2）</h2>
<table>
<tr><th>考点</th><th>要领</th></tr>
<tr><td>头插法逆置</td><td>摘下一个结点，插到头结点之后；原顺序遍历摘、逆序插回 → 整表逆置</td></tr>
<tr><td>暂存后继</td><td>改动 p-&gt;next 之前先把 q = p-&gt;next 存好——<b>防断链</b>是链表题第一守则</td></tr>
</table>
<h3>5.1 单链表逆置过程图解</h3>
<pre>原链:  H → 1 → 2 → 3 → NULL        （H为头结点）

步骤: p=1;  H→NULL（空表）
第1轮: q=2; 1接入H后 → H → 1 → NULL;      p=q=2
第2轮: q=3; 2接入H后 → H → 2 → 1 → NULL;  p=q=3
第3轮: q=NULL; 3接入H后 → H → 3 → 2 → 1 → NULL; p=NULL 结束</pre>
<p>每轮只做四件事：<b>存后继(q) → 头插(p) → 推进(p=q)</b>。空就藏在这三处。</p>

<h2>6. 链表题的画图纪律</h2>
<ol>
<li>每个结点画成方块 [data|next]，头结点单独画 H，指针用箭头。</li>
<li>每执行一条语句，<b>重画一遍当前链</b>（不要在原图上改，会乱）。</li>
<li>凡是把赋值给 p-&gt;next 的语句，先确认"p-&gt;next 原来的值是否已保存在别处"。</li>
<li>循环结束后，从 H 出发走一遍验证结果。</li>
</ol>

<h2>7. 今日做题流程（严格执行）</h2>
<table>
<tr><th>阶段</th><th>动作</th><th>时间</th></tr>
<tr><td>读题</td><td>通读算法说明两遍，圈出"输入、输出、约束"</td><td>5分钟</td></tr>
<tr><td>代入</td><td>用自造样例画变量跟踪表，先不看选项</td><td>15分钟</td></tr>
<tr><td>作答</td><td>每个空分类（初始化/边界/递推/指针/返回）后选答案</td><td>20分钟</td></tr>
<tr><td>核对</td><td>看解析，逐空确认；错的空重读对应代码段</td><td>10分钟</td></tr>
<tr><td>重写</td><td>合上答案，把完整代码在纸上默写一遍</td><td>20分钟</td></tr>
</table>

<h2>8. 自检清单</h2>
<ol>
<li>三次逆置法循环左移 p 位的数学原理是什么？三次调用的区间分别是什么？</li>
<li>双指针逆置的循环条件为什么是 left &lt; right 而不是 left &lt;= right？</li>
<li>链表逆置中 q = p-&gt;next 这条语句删掉会发生什么？</li>
<li>头插法为什么能把链表逆过来？</li>
<li>两道题的时间、空间复杂度分别是什么？</li>
</ol>

<div class="callout tip">
<div class="callout-title">完成本日后</div>
<p>明日（9/7 周一）：<b>算法下午题②</b>——换两类题型：递归（辗转相除）与贪心（活动安排），重点训练<b>递归出口</b>与<b>循环边界</b>两个最易失分的空型。</p>
</div>
`,

quiz: {
  kind: 'afternoon',
  suggestedMinutes: 100,
  note: '下午试题四题型：2 道算法大题。代码空缺按选择题作答（从候选代码中挑）。每题建议 50 分钟：先手工代入样例、画变量跟踪表，再作答。',
  scenario: `
  <h2 style="margin-top:0">题1 · 数组循环左移（限时50分钟）</h2>
  <p><b>【算法说明】</b>给定 n 个整数存于数组 a[0..n-1]，将其<b>循环左移 p 位</b>（0 &lt; p &lt; n）：原第 p 位起的元素移到最前面。例如 (1,2,3,4,5,6,7) 循环左移 3 位后为 (4,5,6,7,1,2,3)。</p>
  <p>算法思想（三次逆置法）：记前段 X = a[0..p-1]，后段 Y = a[p..n-1]。先将 X 逆置，再将 Y 逆置，最后将整个数组逆置，即得 YX。每次逆置用双指针 left、right 从两端向中间交换：只要 left 与 right 未相遇，就交换 a[left] 与 a[right]，随后 left 右移一位、right 左移一位。</p>
  <p><b>【C 代码】</b></p>
  <pre>void reverse(int a[], int left, int right)
{
    int t;
    while (【空1】) {
        t = a[left];
        a[left] = a[right];
        a[right] = t;
        【空2】;
        【空3】;
    }
}

void leftRotate(int a[], int n, int p)
{
    reverse(a, 0, p - 1);        /* 第一步：逆置前段 */
    【空4】;                     /* 第二步：逆置后段 */
    【空5】;                     /* 第三步：整体逆置 */
}</pre>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">题2 · 单链表就地逆置（限时50分钟）</h2>
  <p><b>【算法说明】</b>带头结点的单链表 L 存放一个整数序列，要求<b>就地逆置</b>：不申请任何新结点，仅修改指针，使原序列 (a₁, a₂, …, a<sub>n</sub>) 变为 (a<sub>n</sub>, …, a₂, a₁)。</p>
  <p>算法思想（头插法）：先把头结点 L 与原链断开（L 后面暂无结点）；p 从原链第一个结点出发依次扫描：摘下 p 所指结点前先保存其后继 q，然后将 p 所指结头插入到头结点之后；最后处理下一个结点（让 p 指向 q），直至 p 为空。</p>
  <p><b>【C 代码】</b></p>
  <pre>typedef struct node {
    int data;
    struct node *next;
} Node, *LinkList;

void reverseList(LinkList L)
{
    Node *p, *q;
    【空1】;                 /* p 指向原链第一个数据结点 */
    【空2】;                 /* 断开：头结点先成为空表 */
    while (p != NULL) {
        【空3】;             /* 暂存 p 的后继，防止断链 */
        p-&gt;next = L-&gt;next;   /* 头插第一步 */
        【空4】;             /* 头插第二步 */
        【空5】;             /* 继续处理下一个结点 */
    }
}</pre>
  `,
  questions: [
    { id: 1, section: '一、数组循环左移', question: '空1 处应填（　）。', options: ['left &lt; right', 'left &lt;= right', 'left != 0', 'right &gt; 0'], answer: 'A', analysis: '【考点：双指针循环条件】两指针相向而行，相遇（left==right，奇数个元素的正中）或交错（left&gt;right，已越过中线）时全部元素已交换完毕，应结束。写成 left&lt;=right 时，相遇那一轮会让元素与自身交换一次——结果仍正确但属于多余动作；left&lt;right 是规范写法，也是标准答案。' },
    { id: 2, section: '一、数组循环左移', question: '空2 处应填（　）。', options: ['left = left + 1', 'left = left - 1', 'right = right + 1', 'left = right'], answer: 'A', analysis: '【考点：指针推进】left 是左端指针，只能向右移动（+1）；若误填 left-1 或 left=right，指针不再相向推进，循环无法收敛。同理空3 中 right 必须 -1。' },
    { id: 3, section: '一、数组循环左移', question: '空3 处应填（　）。', options: ['right = right - 1', 'right = right + 1', 'right = left', 'right = 0'], answer: 'A', analysis: '【考点：指针推进】right 从右端向左移动。代入验证：逆置 (1,2,3,4,5)：left=0,right=4 交换后 → left=1,right=3 → 交换 → left=2,right=2 结束，结果 (5,4,3,2,1) 正确。两个指针一升一降，方向不能写反。' },
    { id: 4, section: '一、数组循环左移', question: '空4 处（逆置后段）应填（　）。', options: ['reverse(a, p, n - 1)', 'reverse(a, p + 1, n)', 'reverse(a, p, n)', 'reverse(a, 0, n - p)'], answer: 'A', analysis: '【考点：区间边界】后段是下标 p 到 n-1 共 n-p 个元素。B 的 [p+1, n] 两头都错（漏掉 a[p]、越界 a[n]）；C 的右端 n 越界。口诀：n 个元素下标最大是 n-1；p 个元素区间右端是 p-1。' },
    { id: 5, section: '一、数组循环左移', question: '空5 处（整体逆置）应填（　）。', options: ['reverse(a, 0, n - 1)', 'reverse(a, 0, n)', 'reverse(a, 1, n - 1)', 'reverse(a, p, p - 1)'], answer: 'A', analysis: '【考点：区间边界】整体逆置覆盖 [0, n-1] 全部 n 个元素。三次区间连起来记："前段 [0,p-1] → 后段 [p,n-1] → 整体 [0,n-1]"，正好首尾相接无遗漏无重叠。' },
    { id: 6, section: '一、数组循环左移', question: '对 a = (1,2,3,4,5,6,7)、p = 3 执行第一步 reverse(a, 0, p-1) 后，数组为（　）。', options: ['(3,2,1,4,5,6,7)', '(1,2,3,4,5,6,7)', '(7,6,5,4,3,2,1)', '(3,2,1,7,6,5,4)'], answer: 'A', analysis: '【考点：过程跟踪】第一步只逆置前段 [0,2] 即 (1,2,3) → (3,2,1)，后段 (4,5,6,7) 未动。跟踪表：轮1 交换a[0],a[2] 得 (3,2,1,4,5,6,7)，轮2 left=1,right=1 不满足条件结束。D 是两步之后的状态。' },
    { id: 7, section: '一、数组循环左移', question: '三步全部执行完毕后，数组为（　）。', options: ['(4,5,6,7,1,2,3)', '(3,2,1,4,5,6,7)', '(7,6,5,4,3,2,1)', '(1,2,3,4,5,6,7)'], answer: 'A', analysis: '【考点：过程跟踪】②在①基础上逆置后段 [3,6]：(3,2,1,7,6,5,4)；③整体逆置 [0,6]：(4,5,6,7,1,2,3) ✓。原理：设前段X后段Y，(XᴿYᴿ)ᴿ=YX——先各自倒、再整体倒，等于两段换位。' },
    { id: 8, section: '一、数组循环左移', question: '该算法的时间复杂度与空间复杂度分别为（　）。', options: ['O(n) 和 O(1)', 'O(n×p) 和 O(n)', 'O(nlogn) 和 O(1)', 'O(n²) 和 O(1)'], answer: 'A', analysis: '【考点：复杂度分析】三次逆置的交换次数为 p/2 + (n-p)/2 + n/2 ≈ n，线性时间；只用了常数个变量 t、left、right，就地完成。对比朴素法"整体左移一格、重复p次"需 O(n×p)——三次逆置法正是为消除这个乘积而生。' },
    { id: 9, section: '二、单链表逆置', question: '空1 处应填（　）。', options: ['p = L-&gt;next', 'p = L', 'p = NULL', 'q = L-&gt;next'], answer: 'A', analysis: '【考点：初始化】p 要扫描原链的数据结点，从第一个数据结点（头结点之后）出发，即 p = L-&gt;next。p = L 会让头结点也被当作数据结点插入；p = NULL 则循环体一次都不执行。' },
    { id: 10, section: '二、单链表逆置', question: '空2 处（L-&gt;next = NULL）的作用是（　）。', options: ['释放原链所有结点', '使头结点先成为空表，保证第一个被头插的结点最终成为链表末结点', '防止内存泄漏', '使循环条件不成立'], answer: 'B', analysis: '【考点：断链的目的】逆置后原第一个结点应是末结点（next 为 NULL）。头插法把结点插到 L 之后时，会接上 L-&gt;next 原有的值——所以必须先把 L-&gt;next 置空，这样第一个插入的结点的 next 为 NULL，恰成为尾部。空表从零开始重建，头插自然是逆序。' },
    { id: 11, section: '二、单链表逆置', question: '空3 处应填（　）。', options: ['q = p-&gt;next', 'q = L-&gt;next', 'p = q', 'q = p'], answer: 'A', analysis: '【考点：防断链】下一句就要执行 p-&gt;next = L-&gt;next，这会覆盖 p 的后继指针——覆盖前必须把后继地址存入 q，否则原链剩余部分再也找不到（经典丢链事故）。这是链表题出现频率最高的空。' },
    { id: 12, section: '二、单链表逆置', question: '空4 处（头插第二步）应填（　）。', options: ['L-&gt;next = p', 'p = L-&gt;next', 'q-&gt;next = p', 'p = p-&gt;next'], answer: 'A', analysis: '【考点：头插两步】头插 = 单链表"在头结点后插入p"：① p-&gt;next = L-&gt;next（先接后继）；② L-&gt;next = p（再改头指针）。顺序不能反——若先执行 L-&gt;next = p，则第①步的 L-&gt;next 已经是 p 自己，p-&gt;next = p 形成自环。' },
    { id: 13, section: '二、单链表逆置', question: '空5 处应填（　）。', options: ['p = q', 'q = p', 'p = p-&gt;next', 'p = L'], answer: 'A', analysis: '【考点：指针推进】当前结点处理完后，应处理"事先保存好的后继"q。注意不能写 p = p-&gt;next——此时 p-&gt;next 已被头插改写为指向新链，沿它走会回到已处理的结点造成死循环；这正是空3 暂存 q 的原因。' },
    { id: 14, section: '二、单链表逆置', question: '原链为 H→1→2→3→NULL（H 为头结点），逆置完成后从 H 开始遍历，依次输出的数据是（　）。', options: ['3, 2, 1', '1, 2, 3', '2, 1, 3', '3, 1, 2'], answer: 'A', analysis: '【考点：过程跟踪】轮1：摘1插头 → H→1；轮2：摘2插头 → H→2→1；轮3：摘3插头 → H→3→2→1。每个新摘的结点都插在最前面，所以处理顺序1,2,3，最终排列3,2,1——头插法逆序的本质。' },
    { id: 15, section: '二、单链表逆置', question: '该算法的时间复杂度与空间复杂度分别为（　）。', options: ['O(n) 和 O(1)', 'O(n) 和 O(n)', 'O(n²) 和 O(1)', 'O(nlogn) 和 O(1)'], answer: 'A', analysis: '【考点：复杂度分析】每个结点被摘下并插入一次，共 n 轮，每轮常数条语句 → O(n)；全程只用 p、q 两个辅助指针，不申请新结点、不用数组 → "就地"即 O(1) 空间。若允许开新数组存元素再倒着建表也能 O(n)，但空间 O(n) 不满足"就地"要求。' }
  ]
}

};
