// 2026-09-02（周三）第2周 · 数据结构与算法 | 线性结构
// 讲义 + 30道单项选择题（已逐题校验答案与解析）
window.LESSONS = window.LESSONS || {};

window.LESSONS['2026-09-02'] = {

topic: '线性结构',

lecture: `
<div class="callout info">
<div class="callout-title">本讲说明</div>
<p><b>对应执行表任务：</b>复习线性表、栈、队列、串；完成30道选择题并写出核心操作复杂度。<b>当天产出：</b>复杂度速查表（见第8节，抄进错题本）。</p>
<p><b>考情提示：</b>线性结构是数据结构的地基：上午卷直接考 2—4 分（出栈序列、循环队列计算、链表指针操作），下午卷算法题几乎都建立在对数组/链表/栈的熟练操作上。<b>指针操作题（单链表插入删除）是历年必考</b>。</p>
<p><b>今日时间安排（2小时）：</b>40分钟精读讲义 → 45分钟完成30题 → 35分钟订正＋默写复杂度速查表。</p>
</div>

<h2>1. 线性表：顺序存储</h2>
<p>顺序表用一段<b>地址连续</b>的存储单元依次存放元素，逻辑相邻则物理相邻。</p>
<h3>1.1 插入与删除的移动次数 <span class="stars">★★★</span></h3>
<table>
<tr><th>操作</th><th>位置i（1≤i≤n+1 / 1≤i≤n）</th><th>移动个数</th><th>等概率平均</th></tr>
<tr><td>插入（插到第i个位置前）</td><td>需把 a<sub>i</sub>…a<sub>n</sub> 后移</td><td>n-i+1</td><td><b>n/2</b></td></tr>
<tr><td>删除（删第i个元素）</td><td>需把 a<sub>i+1</sub>…a<sub>n</sub> 前移</td><td>n-i</td><td><b>(n-1)/2</b></td></tr>
</table>
<p>记忆：插入平均动一半多（n/2），删除平均动一半少（(n-1)/2）；插入最好情况（表尾）移动0次，最坏（表头）移动n次。</p>
<h3>1.2 顺序表的特点</h3>
<ul>
<li>优点：<b>随机访问</b>——按位存取 O(1)；存储密度高（=1，无指针开销）。</li>
<li>缺点：插入删除要移动大量元素 O(n)；需连续空间，容量不易扩展。</li>
</ul>

<h2>2. 线性表：链式存储</h2>
<h3>2.1 单链表核心操作 <span class="stars">★★★</span></h3>
<pre>// 在 p 所指结点之后插入 s（两步，顺序不能反）
s-&gt;next = p-&gt;next;
p-&gt;next = s;

// 删除 p 的直接后继 q（先摘链，再释放）
p-&gt;next = q-&gt;next;
free(q);</pre>
<div class="callout warn">
<div class="callout-title">指针操作铁律</div>
<p><b>先接后断</b>：先把新结点的指针接好，再改原链上的指针。若先执行 p-&gt;next = s，则 p 原来的后继就找不到了（内存泄漏＋断链）。找"p 的后继"永远用 p-&gt;next，找前驱必须从头遍历（单链表无前驱指针）。</p>
</div>
<h3>2.2 头指针、头结点、空表</h3>
<ul>
<li><b>头指针</b>：指向链表第一个结点，是访问链表的入口，必须有。</li>
<li><b>头结点</b>：数据域不存元素的附加结点。作用：<b>统一第一个数据结点与其余结点的操作</b>（插删不必特判位置1），空表与非空表判断也统一。</li>
<li>带头结点单链表空表条件：<b>L-&gt;next == NULL</b>；不带头结点：<b>L == NULL</b>。</li>
</ul>
<h3>2.3 循环链表与双向链表</h3>
<ul>
<li>循环单链表：尾结点指回头结点。仅设<b>尾指针 rear</b> 时，表头是 rear-&gt;next，<b>头尾插入删除都是 O(1)</b>。</li>
<li>双向链表：结点含 prior 与 next。在 p 后插入 s 的顺序（<b>先新后旧、p-&gt;next 最后改</b>）：</li>
</ul>
<pre>s-&gt;prior = p;
s-&gt;next = p-&gt;next;
p-&gt;next-&gt;prior = s;
p-&gt;next = s;</pre>
<h3>2.4 顺序表 vs 链表对比</h3>
<table>
<tr><th>对比项</th><th>顺序表</th><th>链表</th></tr>
<tr><td>存取方式</td><td>随机访问 O(1)</td><td>顺序访问 O(n)</td></tr>
<tr><td>插入/删除</td><td>移动元素，平均 O(n)</td><td><b>已定位前提下</b>改指针 O(1)</td></tr>
<tr><td>存储密度</td><td>高（=1）</td><td>低（含指针域）</td></tr>
<tr><td>空间分配</td><td>静态/需连续大块</td><td>动态、按需申请</td></tr>
</table>

<h2>3. 栈 <span class="stars">★★★</span></h2>
<p><b>后进先出（LIFO）</b>，只允许在栈顶操作。</p>
<h3>3.1 出栈序列问题（高频！）</h3>
<p>n 个元素按 1,2,…,n 顺序入栈（可交错进出），出栈序列数 = 卡特兰数：<b>C(2n,n)/(n+1)</b>（n=3→5，n=4→14）。判定某序列是否合法：拿序列逐个看，若下一个要出栈的元素还压在栈中比它后进元素之下 → 非法。口诀：<b>后进的必须先出</b>。</p>
<h3>3.2 顺序栈与共享栈</h3>
<ul>
<li>顺序栈：约定 top 指向栈顶元素时，栈空 top==0，入栈 S[++top]=x，出栈 x=S[top--]；栈满 top==MaxSize。</li>
<li><b>共享栈</b>：两个栈共享一维数组，一个从低端、一个从高端向中间生长；<b>栈满条件：top1+1 == top2</b>。</li>
</ul>
<h3>3.3 栈的应用（必背清单）</h3>
<ol>
<li><b>表达式求值</b>：操作数栈＋运算符栈（中缀求值）；后缀求值只需操作数栈。</li>
<li><b>递归</b>：递归工作栈保存参数、局部变量、返回地址；递归转非递归也用栈。</li>
<li><b>括号匹配</b>、<b>进制转换</b>（余数逆序输出）、<b>深度优先搜索 DFS</b>、迷宫求解。</li>
</ol>

<h2>4. 队列 <span class="stars">★★★</span></h2>
<p><b>先进先出（FIFO）</b>，队尾入、队头出。</p>
<h3>4.1 循环队列（高频计算题）</h3>
<table>
<tr><th>约定（front 指队头，rear 指队尾的下一空位）</th><th>公式</th></tr>
<tr><td>元素个数</td><td><b>(rear - front + m) % m</b></td></tr>
<tr><td>入队</td><td>Q[rear]=x; rear=(rear+1)%m</td></tr>
<tr><td>出队</td><td>x=Q[front]; front=(front+1)%m</td></tr>
<tr><td>牺牲一个单元判满</td><td><b>(rear+1)%m == front</b>（此时最多存 m-1 个）</td></tr>
<tr><td>队空</td><td>front == rear</td></tr>
</table>
<div class="callout key">
<div class="callout-title">考点提示</div>
<p>若题目说"设置计数器 count"则可存满 m 个，判满 count==m；若"设置 tag 标志"区分空满也可存 m 个。<b>只有牺牲单元法容量是 m-1</b>——题目问"该队列最多能存多少元素"时看清约定。</p>
</div>
<h3>4.2 链队列与队列应用</h3>
<p>链队列 front 指队头、rear 指队尾，入队尾插、出队头删，均 O(1)。应用：<b>广度优先搜索 BFS、操作系统作业调度（先来先服务）、打印队列、缓冲区</b>。</p>

<h2>5. 串</h2>
<ul>
<li>串是<b>内容受限的线性表</b>：数据元素是字符。空串长度为 0，<b>空串 ≠ 空格串</b>（空格串由空格字符组成，长度≥1）。</li>
<li><b>BF（朴素）模式匹配</b>：主串每个位置重试模式串，最坏比较 (n-m+1)×m 次，<b>O(n×m)</b>。</li>
<li><b>KMP</b>：失配时主串指针不回退，模式串按 next 数组滑动，<b>O(n+m)</b>；next 数组只与<b>模式串自身</b>有关，与主串无关。</li>
</ul>

<h2>6. 栈与队列的配合：中缀转后缀</h2>
<p>扫描中缀式：操作数直接输出；运算符与栈顶比较优先级，<b>栈顶优先级不低于当前</b>则弹栈输出，再入栈；左括号入栈，右括号弹出至左括号为止。整个扫描结束后清栈。</p>

<h2>7. 高频考点清单</h2>
<ol>
<li>插入平均移动 n/2、删除平均移动 (n-1)/2；两者最好0、最坏 n（插）/ n-1（删）。</li>
<li>单链表"先接后断"；双向链表"先新后旧"。</li>
<li>带头结点空表：L-&gt;next==NULL。</li>
<li>出栈序列合法性判定；n=4 时共14种。</li>
<li>循环队列三公式：个数、判满、判空。</li>
<li>栈应用（递归/表达式/DFS）vs 队列应用（调度/BFS）。</li>
<li>KMP 的 O(n+m) 与"next 只看模式串"。</li>
</ol>

<h2>8. 复杂度速查表（当天产出，抄一遍）</h2>
<table>
<tr><th>操作</th><th>顺序表</th><th>链表</th></tr>
<tr><td>按位查找</td><td>O(1)</td><td>O(n)</td></tr>
<tr><td>按值查找</td><td>O(n)</td><td>O(n)</td></tr>
<tr><td>插入/删除（已定位）</td><td>O(n) 移动</td><td>O(1) 改指针</td></tr>
<tr><td>建表</td><td>O(n) 尾插</td><td>头插O(n)逆序 / 尾插带尾指针O(n)</td></tr>
<tr><td colspan="3">栈/队列（顺序、链式）：入、出均 O(1)；BF匹配 O(nm)；KMP匹配 O(n+m)</td></tr>
</table>

<h2>9. 自检清单</h2>
<ol>
<li>顺序表插入、删除的平均移动次数各是多少？最坏情况呢？</li>
<li>单链表在 p 后插入 s、删除 p 的后继，语句顺序分别是什么？为什么不能颠倒？</li>
<li>共享栈的栈满条件？循环队列牺牲单元法的判满条件和容量？</li>
<li>入栈序列 1,2,3,4,5，如何快速判断出栈序列 4,3,1,2,5 是否合法？</li>
<li>(A+B)*C-D/E 求后缀式求值时操作数栈的最大深度是多少？</li>
</ol>

<div class="callout tip">
<div class="callout-title">完成本日后</div>
<p>明日（9/3 周四）：<b>树与二叉树</b>——性质计算、四种遍历、哈夫曼树、二叉排序树，30题。树是数据结构的分值重心，先睡好。</p>
</div>
`,

quiz: {
  suggestedMinutes: 60,
  note: '30 道单项选择题，分四个小节覆盖线性表、栈、队列与串。指针操作题先画图再选；移动次数与循环队列计算题务必列式。',
  questions: [
    { id: 1, section: '一、线性表', question: '长度为 n 的顺序表，在等概率条件下，插入一个元素平均需要移动的元素个数约为（　）。', options: ['n/2', '(n-1)/2', '(n+1)/2', 'n-1'], answer: 'A', analysis: '【考点：顺序表插入】插入位置 i 的移动次数为 n-i+1，对 n+1 个位置等概率求平均：(n+0)/2 = n/2。删除才是 (n-1)/2。' },
    { id: 2, section: '一、线性表', question: '长度为 n 的顺序表，在等概率条件下，删除一个元素平均需要移动的元素个数约为（　）。', options: ['n/2', '(n-1)/2', '(n+1)/2', 'n'], answer: 'B', analysis: '【考点：顺序表删除】删除位置 i 需移动 n-i 个，对 n 个位置等概率平均：(n-1)/2。与插入对照记忆：插入 n/2，删除 (n-1)/2。' },
    { id: 3, section: '一、线性表', question: '与顺序存储相比，链式存储的主要优点是（　）。', options: ['支持随机访问，按位存取时间为 O(1)', '存储密度高，空间利用率高', '插入、删除元素时（已定位前提下）只需修改指针，无需移动元素', '逻辑相邻的元素物理位置必然相邻'], answer: 'C', analysis: '【考点：顺序表vs链表】链表插删 O(1)（定位后）；A、B、D 都是顺序表的特点。链表存储密度低（有指针开销）、不能随机访问。' },
    { id: 4, section: '一、线性表', question: '在单链表中，若 p 所指结点不是尾结点，在 p 之后插入 s 所指结点的正确操作是（　）。', options: ['p-&gt;next = s; s-&gt;next = p-&gt;next;', 's-&gt;next = p-&gt;next; p-&gt;next = s;', 's-&gt;next = p; p-&gt;next = s;', 'p-&gt;next = s; s-&gt;next = p;'], answer: 'B', analysis: '【考点：单链表插入】先把 s 接到 p 的后继（s-&gt;next = p-&gt;next），再让 p 指向 s。若先执行 p-&gt;next = s，p 原后继地址丢失，s-&gt;next 无法正确赋值。"先接后断"是铁律。' },
    { id: 5, section: '一、线性表', question: '在单链表中，删除 p 所指结点的直接后继 q 的操作是（　）。', options: ['p-&gt;next = q-&gt;next; free(q);', 'q-&gt;next = p-&gt;next; free(p);', 'p = q-&gt;next; free(q);', 'q = p-&gt;next; p-&gt;next = q;'], answer: 'A', analysis: '【考点：单链表删除】先摘链（p-&gt;next = q-&gt;next）再释放 q。B 方向反了删的是 p；C 只移动了局部指针变量 p，链没变；D 把 q 指向了自己导致断链。' },
    { id: 6, section: '一、线性表', question: '带头结点的单链表 L 为空的判断条件是（　）。', options: ['L == NULL', 'L-&gt;next == NULL', 'L-&gt;next == L', 'L-&gt;next-&gt;next == NULL'], answer: 'B', analysis: '【考点：空表判断】带头结点时 L 永远指向头结点，链表空 ⇔ 头结点的 next 为空。L==NULL 是"不带头结点"的空表条件；L-&gt;next==L 是（带头结点）循环单链表的空表条件。' },
    { id: 7, section: '一、线性表', question: '在链表中设置头结点的主要作用是（　）。', options: ['节省存储空间', '使第一个数据结点的插入删除与其他结点的操作统一起来', '加快按位查找速度', '使链表必须带头结点才能遍历'], answer: 'B', analysis: '【考点：头结点作用】没有头结点时，在位置1插入/删除需修改头指针（特判）；有了头结点，任何位置的插删都是修改某个结点的 next，逻辑统一，空表与非空表的处理也统一。' },
    { id: 8, section: '一、线性表', question: '在双向链表中，在 p 所指结点之后插入 s 所指结点，下列操作序列正确的是（　）。', options: ['s-&gt;prior = p; s-&gt;next = p-&gt;next; p-&gt;next-&gt;prior = s; p-&gt;next = s;', 'p-&gt;next = s; s-&gt;prior = p; p-&gt;next-&gt;prior = s; s-&gt;next = p-&gt;next;', 's-&gt;next = p-&gt;next; p-&gt;next = s; s-&gt;prior = p; p-&gt;next-&gt;prior = s;', 's-&gt;prior = p; p-&gt;next = s; s-&gt;next = p-&gt;next; p-&gt;next-&gt;prior = s;'], answer: 'A', analysis: '【考点：双向链表插入】原则"先新后旧"：先把 s 的 prior/next 指好（用未修改的 p 和 p-&gt;next），再改原链两个方向（p-&gt;next-&gt;prior = s、p-&gt;next = s），其中 p-&gt;next 的修改必须放在用完 p-&gt;next 之后。B、C、D 都在用 p-&gt;next 之前就改掉了它，导致 s-&gt;next 或 p-&gt;next-&gt;prior 指错。' },
    { id: 9, section: '一、线性表', question: '设 rear 是指向非空循环单链表尾结点的指针（无头指针），在表尾插入一个新结点的时间复杂度为（　）。', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], answer: 'A', analysis: '【考点：循环链表】表尾即 rear 所指结点，新结点 s 插在 rear 后：s-&gt;next = rear-&gt;next; rear-&gt;next = s; rear = s; 三步 O(1)。这正是"只设尾指针"的设计动机（若只设头指针，找尾要 O(n)）。' },
    { id: 10, section: '二、栈', question: '入栈序列为 1,2,3,4,5，则下列不可能的出栈序列是（　）。', options: ['4,3,2,1,5', '2,1,3,5,4', '4,3,1,2,5', '3,2,1,4,5'], answer: 'C', analysis: '【考点：出栈序列判定】4先出须先压1,2,3,4；出4,3后栈内剩1,2（2在栈顶）。下一个要出1，但1在2之下，必须先出2——矛盾，故 C 非法。A：压到4后依次弹出4,3,2,1再压5弹5；B、D 均可手工模拟通过。' },
    { id: 11, section: '二、栈', question: '4 个不同元素按 1,2,3,4 顺序入栈（允许交错出栈），可能的出栈序列共有（　）种。', options: ['16', '24', '14', '15'], answer: 'C', analysis: '【考点：卡特兰数】n 个元素的出栈序列数 = C(2n,n)/(n+1)。n=4：C(8,4)/5 = 70/5 = 14。记住小值：n=1→1，n=2→2，n=3→5，n=4→14，n=5→42。' },
    { id: 12, section: '二、栈', question: '下列应用中，最适合使用栈而不是队列的是（　）。', options: ['操作系统的作业调度（先来先服务）', '打印任务排队', '函数递归调用时保存返回地址和局部信息', '图的广度优先搜索'], answer: 'C', analysis: '【考点：栈与队列的应用对比】递归"最后调用、最先返回"正是 LIFO，用递归工作栈。A、B、D 都是先来先服务的 FIFO 场景。栈的其他应用：表达式求值、括号匹配、进制转换、DFS。' },
    { id: 13, section: '二、栈', question: '两个栈共享一个数组空间 S[1..m]，栈1的栈底在 S[1] 向上增长（top1 初值0），栈2的栈底在 S[m] 向下增长（top2 初值 m+1），则栈满的条件是（　）。', options: ['top1 == top2', 'top1 + 1 == top2', 'top1 + top2 == m', 'top2 - top1 == 0 且 top1 &gt; 0'], answer: 'B', analysis: '【考点：共享栈】两栈迎面生长，中间相遇即满：top1+1 == top2。A 少了+1（那是二者相邻但各自还有1个空位的状态）。共享栈的优点：两个栈互补使用空间，只有整体满才会溢出。' },
    { id: 14, section: '二、栈', question: '用不带头结点的链表实现栈（top 指向栈顶结点），入栈操作（s 为新结点）的正确语句是（　）。', options: ['top-&gt;next = s; top = s;', 's-&gt;next = top; top = s;', 's-&gt;next = top-&gt;next; top-&gt;next = s;', 'top = s; s-&gt;next = top;'], answer: 'B', analysis: '【考点：链栈】链栈入栈=单链表头插：s-&gt;next = top; top = s。出栈=头删：取 top 后 top = top-&gt;next。链栈一般不会满（除非内存耗尽），空栈条件 top==NULL。' },
    { id: 15, section: '二、栈', question: '顺序栈用 S[1..m] 存储，top 指向栈顶元素（初值为0表示空），则入栈操作应执行（　）。', options: ['S[top] = x; top = top + 1;', 'top = top + 1; S[top] = x;', 'S[top] = x; top = top - 1;', 'top = top - 1; S[top] = x;'], answer: 'B', analysis: '【考点：顺序栈约定】top 指向栈顶元素时：入栈先移指针再存数（++top 后写入）；出栈先取数再移指针（x=S[top--]）。对照另一种约定（top 指向空位）：入栈 S[top++]=x，两者别混。' },
    { id: 16, section: '二、栈', question: '将递归算法转换为非递归算法，通常需要借助的数据结构是（　）。', options: ['队列', '栈', '二叉树', '哈希表'], answer: 'B', analysis: '【考点：递归与栈】递归调用由系统用"递归工作栈"实现（保存实参、返回地址）；手工消除递归即显式使用一个栈模拟这一过程。函数调用本身也是栈机制（栈帧）。' },
    { id: 17, section: '二、栈', question: '对中缀表达式 (A+B)*C-D/E 求值，转换成后缀式 AB+C*DE/- 后，用操作数栈对后缀式求值时，栈中元素的最大个数是（　）。', options: ['2', '3', '4', '5'], answer: 'B', analysis: '【考点：后缀式求值】模拟：A入(1)、B入(2)，+得T1(1)，C入(2)，*得T2(1)，D入(2)、E入(3)——此时栈最深为3，/得T3(1)，-得结果(1)。最大3个。' },
    { id: 18, section: '二、栈', question: '中缀转后缀过程中，设当前扫描到运算符 op、运算符栈栈顶为 t，则应将 op 入栈的条件是（　）。', options: ['t 的优先级高于 op', 't 的优先级低于 op，或 t 是左括号', 't 的优先级不低于 op 且 t 不是左括号时先弹栈，直到不满足该条件', '无论何种情况都直接入栈'], answer: 'B', analysis: '【考点：中缀转后缀】当 op 优先级高于栈顶（或栈顶是左括号、栈空）时 op 入栈；否则不断弹栈输出，直到栈顶优先级更低（或左括号/空）再入栈。左括号无条件入栈；遇右括号弹到左括号为止。' },
    { id: 19, section: '二、栈', question: '表达式求值采用"操作数栈+运算符栈"的典型算法，其整体思路属于（　）。', options: ['分治法', '贪心法', '动态规划法', '基于栈的扫描法（逐字符处理，按优先级即时计算）'], answer: 'D', analysis: '【考点：表达式求值机制】逐字符扫描：操作数进操作数栈；运算符按优先级与栈顶比较，能算则弹出两个操作数计算回压。左括号入栈、右括号触发连续计算。此题重在记住流程本身。' },
    { id: 20, section: '三、队列', question: '循环队列存于 Q[0..m-1]，front 指向队头元素、rear 指向队尾元素的下一位置，则队列中元素个数为（　）。', options: ['rear - front', 'rear - front + 1', '(rear - front + m) % m', '(rear - front + 1) % m'], answer: 'C', analysis: '【考点：循环队列计算】rear 可能小于 front（回绕），必须加 m 再模 m。例：m=6，front=4，rear=1：元素为 (1-4+6)%6=3 个。B 选项不模会在回绕时算错。' },
    { id: 21, section: '三、队列', question: '循环队列 Q[0..m-1] 采用"牺牲一个存储单元"的方式判断队满，其判满条件和实际容量分别是（　）。', options: ['front == rear，容量 m', '(rear+1)%m == front，容量 m-1', '(rear+1)%m == front，容量 m', 'rear == (front+1)%m，容量 m-1'], answer: 'B', analysis: '【考点：牺牲单元法】留一个空位区分空满：rear 追上 front 前一格即满，(rear+1)%m==front，最多存 m-1 个元素。若用计数器或 tag 标志法，判满可用 rear==front 且容量为 m。' },
    { id: 22, section: '三、队列', question: '循环队列（约定同第20题）的入队操作是（　）。', options: ['Q[rear] = x; rear = (rear+1)%m;', 'rear = (rear+1)%m; Q[rear] = x;', 'Q[front] = x; front = (front+1)%m;', 'Q[rear] = x; rear = rear + 1;'], answer: 'A', analysis: '【考点：入队操作】rear 指向"队尾的下一空位"：先存 Q[rear]=x 再后移取模。D 不取模会数组越界（回绕错误）。出队对称：x=Q[front]; front=(front+1)%m。' },
    { id: 23, section: '三、队列', question: '下列应用中，最适合使用队列的是（　）。', options: ['表达式求值中运算符的处理', '括号匹配检验', '操作系统的进程就绪队列管理', '函数调用的返回地址保存'], answer: 'C', analysis: '【考点：队列应用】就绪进程按"先来先服务"排队调度，FIFO。A、B、D 都是典型的栈应用。队列另两用：BFS、打印队列/缓冲区。' },
    { id: 24, section: '三、队列', question: '用带头结点的链表表示队列，front 指向头结点、rear 指向尾结点，则出队操作（队列非空）应执行（　）。', options: ['front = front-&gt;next; 释放原首元结点', 'rear = rear-&gt;next; 释放原尾结点', '释放头结点 front', '删除头结点并令 front 指向新的头结点'], answer: 'A', analysis: '【考点：链队出队】出队在队头：记下 p=front-&gt;next（首元结点），front-&gt;next = p-&gt;next，若删的是最后一个结点还需 rear=front，最后 free(p)。头结点不动。入队在 rear 之后尾插。' },
    { id: 25, section: '三、队列', question: '容量 m=6 的循环队列（front 指队头、rear 指队尾下一位置，初值均为0），依次执行：入队a,b,c,d → 出队2次 → 入队e,f。此时队列中的元素从队头到队尾依次是（　）。', options: ['c, d, e, f', 'a, b, c, d', 'e, f, c, d', 'c, d'], answer: 'A', analysis: '【考点：循环队列模拟】入a,b,c,d：rear=4，队列为a,b,c,d；出队2次：front=2（弹出a,b）；再入e,f：Q[4]=e,Q[5]=f，rear=(5+1)%6=0。队列剩 c,d,e,f。元素个数 (0-2+6)%6=4。' },
    { id: 26, section: '三、队列', question: '栈和队列都具有的特性是（　）。', options: ['只能在一端进行插入和删除', '插入删除都限制在端点进行，且操作时间复杂度均为 O(1)', '先进先出', '后进先出'], answer: 'B', analysis: '【考点：共同点】栈在一端（栈顶）插删，队列在两端（队尾入队头出）——都是端点操作且 O(1)；C 只属于队列，D 只属于栈。' },
    { id: 27, section: '四、串', question: '下列关于空串与空格串的说法，正确的是（　）。', options: ['空串就是空格串', '空串的长度为0，空格串由空格字符组成、长度不为0', '空串与空格串长度都为0', '空串只能用双引号表示'], answer: 'B', analysis: '【考点：串的基本概念】空串 ε 不含任何字符，长度0；空格串（如" "）内容是空格字符，长度为其空格个数。两者是不同考点中的高频陷阱。' },
    { id: 28, section: '四、串', question: '串是一种特殊的线性表，其特殊性体现在（　）。', options: ['可以顺序存储', '数据元素仅限字符类型', '可以用链式存储', '插入删除受限'], answer: 'B', analysis: '【考点：串的定义】串=元素内容受限（只能是字符）的线性表。存储上顺序、链式皆可。插入删除受限的是栈和队列。' },
    { id: 29, section: '四、串', question: '设主串长度为 n、模式串长度为 m（m≤n），朴素模式匹配（BF）算法在最坏情况下的时间复杂度是（　）。', options: ['O(n)', 'O(m)', 'O(n+m)', 'O(n×m)'], answer: 'D', analysis: '【考点：BF复杂度】最坏情况（如主串"aaaa…ab"、模式"aaab"）：每个起点都要比较到模式串末尾才失配，比较次数约 (n-m+1)×m，即 O(n×m)。' },
    { id: 30, section: '四、串', question: '关于 KMP 模式匹配算法，下列说法正确的是（　）。', options: ['失配时主串指针需要回溯到起点重新比较', 'next 数组的值由主串和模式串共同决定', '失配时模式串指针按 next 数组回退而主串指针不动，总时间复杂度为 O(n+m)', 'KMP 算法在任何情况下都比 BF 快一个数量级'], answer: 'C', analysis: '【考点：KMP】KMP 的核心：失配时主串 i 不回退，模式串 j 移动到 next[j] 继续；next 只由模式串自身的前后缀结构决定（与主串无关）；总复杂度 O(n+m)。D 错在最好情况下 BF 也只需 O(n)。' }
  ]
}

};
