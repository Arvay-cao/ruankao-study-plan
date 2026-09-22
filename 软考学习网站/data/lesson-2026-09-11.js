// 2026-09-11（周五）第3周 · 数据库、网络与安全 | SQL与事务
// 讲义 + 30道选择题（SQL查询、视图、授权、事务与并发控制；含答案与解析，已逐题校验）
window.LESSONS = window.LESSONS || {};

window.LESSONS['2026-09-11'] = {

topic: 'SQL与事务',

lecture: `
<div class="callout info">
<div class="callout-title">本讲说明</div>
<p><b>对应执行表任务：</b>复习连接、子查询、聚合、视图、事务与并发控制；完成30题。<b>当天产出：</b>SQL易错点清单（第4—9节的"陷阱"汇总）。</p>
<p><b>考情提示：</b>SQL 在上午卷稳定考 1—2 题，考法高度固定：<b>读语句选结果、选正确的语句、子句辨析</b>（WHERE vs HAVING、COUNT(*) vs COUNT(列)、内连接 vs 外连接）。事务与并发再考 1 题（ACID、封锁）。这些都是"规则题"——规则记准即满分，失分都在细节。</p>
<p><b>今日时间安排（2小时）：</b>40分钟精读讲义 → 45分钟完成30题 → 35分钟订正并整理易错点清单。</p>
</div>

<h2>1. SQL 概述与语句分类</h2>
<p>SQL 是<b>非过程化</b>语言：只需说明"要什么"（What），不必说明"怎么取"（How）；操作对象和操作结果都是<b>集合</b>（表的集合操作）。</p>
<table>
<tr><th>类别</th><th>语句</th><th>功能</th></tr>
<tr><td><b>DDL</b> 数据定义</td><td>CREATE / ALTER / DROP</td><td>定义、修改、删除表、视图、索引等对象</td></tr>
<tr><td><b>DML</b> 数据操纵</td><td>SELECT / INSERT / UPDATE / DELETE</td><td>查询与增删改数据</td></tr>
<tr><td><b>DCL</b> 数据控制</td><td>GRANT / REVOKE</td><td>授予权限、收回权限</td></tr>
</table>
<div class="callout warn">
<div class="callout-title">分类陷阱</div>
<p>SELECT 属于 DML（查询是操纵数据的一种）；<b>GRANT/REVOKE 属于 DCL</b>，别错放进 DML。DROP 是删表（连结构），DELETE 是删行（留结构）。</p>
</div>

<h2>2. DDL：建表与三类完整性的落地</h2>
<pre>CREATE TABLE SC (
    学号   CHAR(8)   NOT NULL,
    课程号 CHAR(4)   NOT NULL,
    成绩   INT       CHECK (成绩 BETWEEN 0 AND 100),
    PRIMARY KEY (学号, 课程号),
    FOREIGN KEY (学号) REFERENCES Student(学号)
);</pre>
<ul>
<li><b>PRIMARY KEY</b>：主码，取值<b>唯一且不能为空</b>（实体完整性）。</li>
<li><b>FOREIGN KEY ... REFERENCES</b>：外码引用（参照完整性）。</li>
<li><b>CHECK / NOT NULL / UNIQUE</b>：用户自定义完整性（NOT NULL 也可视为实体/域约束的延伸）。</li>
</ul>

<h2>3. 单表查询：子句与书写要点</h2>
<pre>SELECT [DISTINCT] 列名表
FROM 表名
[WHERE 行条件]
[GROUP BY 分组列 [HAVING 组条件]]
[ORDER BY 排序列 [ASC|DESC]];</pre>
<ul>
<li><b>DISTINCT</b>：消除结果中的重复行（投影去重的 SQL 版本）。</li>
<li><b>WHERE</b> 条件：BETWEEN a AND b <b>含两端</b>（等价于 &gt;=a AND &lt;=b）；IN (集合)；LIKE 模式匹配——<b>% 匹配任意多个（含零个）字符，_ 恰好匹配一个字符</b>；<b>NULL 只能用 IS NULL / IS NOT NULL 判断，不能用 = NULL</b>（NULL 与任何值比较结果均为"未知"）。</li>
<li><b>ORDER BY</b>：默认<b>升序 ASC</b>，降序必须写 DESC。</li>
</ul>

<h2>4. 聚集函数与分组 ★★★</h2>
<table>
<tr><th>函数</th><th>含义</th><th>NULL 处理</th></tr>
<tr><td>COUNT(*)</td><td>统计<b>行数</b></td><td>包含 NULL 行</td></tr>
<tr><td>COUNT(列) / COUNT(DISTINCT 列)</td><td>统计该列取值个数 / 去重后个数</td><td><b>跳过 NULL</b></td></tr>
<tr><td>SUM / AVG / MAX / MIN</td><td>求和 / 均值 / 最大 / 最小</td><td><b>跳过 NULL</b>（不当作 0！）</td></tr>
</table>
<p><b>执行顺序</b>：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY。由此推出两条铁律：</p>
<ol>
<li><b>WHERE 里不能用聚集函数</b>（它在分组前执行，还没有"组"）；对组的筛选用 HAVING。</li>
<li><b>SELECT 后的非聚集列必须出现在 GROUP BY 中</b>——SELECT 课程号, COUNT(*) 配 GROUP BY 学号 是错的（课程号与组不对应）。</li>
</ol>
<pre>SELECT 课程号, COUNT(*) AS 人数
FROM SC
WHERE 成绩 &gt;= 60          /* 先按行过滤不及格的 */
GROUP BY 课程号            /* 再按课程分组 */
HAVING COUNT(*) &gt; 5       /* 最后筛"组"：人数超过5 */
ORDER BY 人数 DESC;</pre>

<h2>5. 连接查询：内连接、外连接、自连接 <span class="stars">★★★</span></h2>
<ul>
<li><b>内连接</b>：FROM R JOIN S ON R.B=S.B（或 FROM R, S WHERE R.B=S.B），只返回<b>满足连接条件</b>的元组。</li>
<li><b>左外连接</b> R LEFT OUTER JOIN S：保留<b>左表全部</b>元组，无匹配处填 NULL。右外/全外同理。</li>
<li><b>自连接</b>：一张表与自身连接（起两个别名），用于"同表内两行关联"——查"每个员工的上级姓名"（员工.上级工号 = 经理.工号）。</li>
</ul>
<div class="callout key">
<div class="callout-title">连接选择口诀</div>
<p>只留匹配 → 内连接；<b>保左全 → LEFT JOIN</b>（查"所有学生及其选课（含没选课的）"必用）；同表互查 → 自连接。多表逗号连接（FROM R, S）忘记写 WHERE 条件会变成<b>笛卡尔积</b>——结果是 m×n 行，这是最隐蔽的错。</p>
</div>

<h2>6. 子查询：IN、EXISTS、ANY/ALL <span class="stars">★★★</span></h2>
<ul>
<li><b>IN</b>：外层属性属于子查询结果集合。<code>WHERE 学号 IN (SELECT 学号 FROM SC WHERE 课程号='C1')</code>＝"选修了 C1 的学生"。</li>
<li><b>EXISTS / NOT EXISTS</b>：子查询<b>结果非空</b>即为真（存在量词）。<b>NOT EXISTS 嵌套可表达"全部"语义</b>（关系代数的除法）："不存在一门课，该生没有选"＝选修了全部课程。</li>
<li><b>&gt;ANY / &gt;ALL</b>：大于子查询结果中的<b>任一</b>值（即大于最小值）／大于<b>所有</b>值（即大于最大值）。</li>
</ul>

<h2>7. 视图与授权</h2>
<ul>
<li><b>视图</b>：从基本表（或其他视图）导出的<b>虚表</b>，数据库中<b>只存储其定义</b>，数据仍存在基本表中。优点：简化复杂查询、提供安全性（隐藏行列）、提供一定程度的<b>逻辑数据独立性</b>。</li>
<li><b>授权</b>：<code>GRANT SELECT, UPDATE(成绩) ON SC TO user1 [WITH GRANT OPTION]</code>；<b>WITH GRANT OPTION 允许被授权者把权限再转授他人</b>。收回：<code>REVOKE SELECT ON SC FROM user1</code>。</li>
</ul>

<h2>8. 事务与 ACID ★★★</h2>
<p>事务是数据库环境中<b>不可再分的</b>工作单位（如转账：A 扣款 + B 到账）。转账扣了款没到账，数据库就出事了——ACID 四性保证"不出事"：</p>
<table>
<tr><th>性质</th><th>含义</th><th>转账例子</th></tr>
<tr><td><b>原子性 Atomicity</b></td><td>事务内的操作<b>要么全做、要么全不做</b></td><td>扣款与到账必须同生共死</td></tr>
<tr><td><b>一致性 Consistency</b></td><td>事务执行使数据库从<b>一个一致状态转变到另一个一致状态</b>（总量守恒等业务规则不被破坏）</td><td>转账前后两账户总额不变</td></tr>
<tr><td><b>隔离性 Isolation</b></td><td>并发执行的事务<b>互不干扰</b>，如同串行</td><td>第三者中途看不到"钱已扣未到"的中间态</td></tr>
<tr><td><b>持久性 Durability</b></td><td>事务<b>提交</b>后修改<b>永久保存</b>，故障也不丢失</td><td>转账成功后断电，重启数据仍在</td></tr>
</table>

<h2>9. 并发控制：三类问题与封锁 <span class="stars">★★★</span></h2>
<table>
<tr><th>并发问题</th><th>现象</th></tr>
<tr><td><b>丢失更新</b></td><td>两事务先后读同一数据、各自修改写回，后写覆盖先写——先提交的修改凭空消失</td></tr>
<tr><td><b>脏读</b></td><td>读到别的事务<b>尚未提交</b>、随后又被<b>回滚</b>的数据（脏数据）</td></tr>
<tr><td><b>不可重复读</b></td><td>同一事务内两次读同一数据，值被别的事务修改而不同</td></tr>
</table>
<ul>
<li><b>S 锁（共享锁/读锁）</b>：多个事务可同时持有（读读相容）；<b>X 锁（排他锁/写锁）</b>：独占，与任何锁都不相容（写写、读写都互斥）。<b>读加 S、写加 X</b>。</li>
<li><b>两阶段锁协议（2PL）</b>：事务分<b>加锁扩展</b>与<b>解锁收缩</b>两阶段，一旦开始解锁就不能再加锁。遵守 2PL 的调度<b>可串行化</b>（并发正确），但<b>可能发生死锁</b>。</li>
<li>死锁处理：预防（一次加全所有锁、按序加锁）或检测解除（牺牲一个事务回滚）。</li>
</ul>

<h2>10. 自检清单</h2>
<ol>
<li>DDL/DML/DCL 各包含哪些语句？SELECT、GRANT 分别属于哪类？</li>
<li>BETWEEN 的边界？LIKE 的 % 与 _ 差别？NULL 用什么判断？ORDER BY 默认方向？</li>
<li>COUNT(*) 与 COUNT(列) 的区别？AVG 遇到 NULL 怎么办？</li>
<li>SQL 六个子句的执行顺序？WHERE 与 HAVING 的两大区别？</li>
<li>内连接、左外连接、自连接分别用于什么场景？</li>
<li>NOT EXISTS 如何表达"全部"语义（对应关系代数哪个运算）？&gt;ALL 等价于什么？</li>
<li>视图是虚表意味着什么？三个优点？WITH GRANT OPTION 的作用？</li>
<li>ACID 四性各自含义？丢失更新、脏读、不可重复读的现象？</li>
<li>S 锁与 X 锁的兼容关系？2PL 的内容与两个结论？</li>
</ol>

<div class="callout tip">
<div class="callout-title">完成本日后</div>
<p>明日（9/12 周六，4小时）：<b>数据库设计题（下午题实战）</b>——完整做 2 道数据库下午大题：E-R 图、关系模式转换、主外键与 SQL。今天是理论收官，明天把前三天的关系模型、规范化、SQL 全部串到"15 分大题"上。</p>
</div>
`,

quiz: {
suggestedMinutes: 45,
note: '30 道单项选择题，分四个小节覆盖 SQL 基础与 DDL、查询与分组、连接与子查询、视图/授权/事务。读程序题请逐个子句对照执行顺序。',
questions: [
  { id: 1, section: '一、SQL基础与DDL', question: 'SQL 语言是一种（　）的语言。', options: ['高度过程化', '只能用于查询、不能更新数据', '面向对象', '非过程化、面向集合操作'], answer: 'D', analysis: '【考点：SQL特点】SQL 只需说明"要什么"，无需指明存取路径（非过程化）；操作对象和结果都是表（集合）。这也是它区别于 C 等过程语言的本质。' },
  { id: 2, section: '一、SQL基础与DDL', question: '建表时 PRIMARY KEY 约束的效果是（　）。', options: ['允许该列取空值', '仅要求该列取值唯一', '该列取值唯一且不能为空', '该列只能是数值类型'], answer: 'C', analysis: '【考点：主码约束】PRIMARY KEY = UNIQUE + NOT NULL，对应实体完整性。UNIQUE 约束单独使用时允许空值，这是两者的差别。' },
  { id: 3, section: '一、SQL基础与DDL', question: '建表语句中的 FOREIGN KEY ... REFERENCES 子句实现的是（　）。', options: ['实体完整性', '参照完整性', '用户自定义完整性', '数据原子性'], answer: 'B', analysis: '【考点：外码子句】外码引用实现参照完整性：外码取值必须能在被参照表的主码中找到（或为空）。PRIMARY KEY 对应实体完整性，CHECK 对应用户自定义完整性。' },
  { id: 4, section: '一、SQL基础与DDL', question: 'WHERE 年龄 BETWEEN 18 AND 25 等价于（　）。', options: ['年龄 >= 18 AND 年龄 <= 25', '年龄 > 18 AND 年龄 < 25', '年龄 > 18 OR 年龄 <= 25', '18 <= 年龄 < 25'], answer: 'A', analysis: '【考点：BETWEEN边界】BETWEEN 是闭区间，包含两端。B 是开区间（不含18和25），边界选项是专门设计的陷阱。' },
  { id: 5, section: '一、SQL基础与DDL', question: 'SQL 语句 GRANT 属于（　）。', options: ['DDL（数据定义）', 'DML（数据操纵）', 'DCL（数据控制）', 'DQL（数据查询）'], answer: 'C', analysis: '【考点：语句分类】GRANT/REVOKE 授权与收权属于数据控制语言 DCL。SELECT 属于 DML，CREATE/DROP 属于 DDL——三者归类是常考送分点。' },
  { id: 6, section: '一、SQL基础与DDL', question: 'SQL 中模式匹配 LIKE 的两个通配符，正确的说法是（　）。', options: ['% 匹配单个字符，_ 匹配任意多个字符', '% 匹配任意多个（含零个）字符，_ 恰好匹配单个字符', '两者都只匹配单个字符', '% 只能用于数值型列'], answer: 'B', analysis: '【考点：LIKE通配符】% 是任意长度（含空串），_ 是一个字符。查"第二个字为明的姓名"：LIKE \'_明%\'——开头一个 _ 占住第一字，再"明"，再 % 收尾。' },
  { id: 7, section: '二、查询与分组', question: 'SELECT 子句中使用 DISTINCT 的作用是（　）。', options: ['消除结果集中的重复行', '对结果集排序', '只返回第一行', '消除取值为空的行'], answer: 'A', analysis: '【考点：DISTINCT】DISTINCT 对最终结果去重（关系代数投影去重的 SQL 对应物）。它不处理 NULL（NULL 视为相等参与去重），也不排序。' },
  { id: 8, section: '二、查询与分组', question: '查询成绩为空的学生，正确的条件写法是（　）。', options: ['成绩 IS NULL', '成绩 = NULL', '成绩 NOT NULL', '成绩 == 0'], answer: 'A', analysis: '【考点：NULL判断】NULL 不是值，与任何值（包括 NULL）用 = 比较结果都是"未知"，条件不成立；必须用 IS NULL / IS NOT NULL。这是最高频的语法陷阱。' },
  { id: 9, section: '二、查询与分组', question: 'ORDER BY 子句未指定 ASC 或 DESC 时，默认的排序方式是（　）。', options: ['降序', '按插入先后', '随机顺序', '升序'], answer: 'D', analysis: '【考点：排序默认值】默认升序 ASC；要降序必须显式写 DESC。多列排序按书写次序依次起作用：ORDER BY 系号 ASC, 年龄 DESC。' },
  { id: 10, section: '二、查询与分组', question: '要统计学生总人数（包括成绩为 NULL 的学生），应使用（　）。', options: ['COUNT(成绩)', 'COUNT(*)', 'SUM(成绩)', 'COUNT(DISTINCT 成绩)'], answer: 'B', analysis: '【考点：COUNT两种形态】COUNT(*) 统计所有行（含 NULL 行）；COUNT(成绩) 跳过成绩为 NULL 的行，人数会偏少。SUM 是求和不是计数。' },
  { id: 11, section: '二、查询与分组', question: '查询"选修人数超过 5 人的课程号及人数"，正确的语句是（　）。', options: ['SELECT 课程号, COUNT(*) FROM SC GROUP BY 课程号 HAVING COUNT(*) > 5', 'SELECT 课程号, COUNT(*) FROM SC WHERE COUNT(*) > 5 GROUP BY 课程号', 'SELECT 课程号, COUNT(*) FROM SC GROUP BY 课程号 ORDER BY COUNT(*) > 5', 'SELECT 课程号, COUNT(*) FROM SC HAVING COUNT(*) > 5'], answer: 'A', analysis: '【考点：HAVING用法】对组（每门课）的筛选条件用 HAVING；B 把组条件写进 WHERE（WHERE 在分组前执行、不能用聚集函数）必错；D 缺 GROUP BY 无法按课程分组。' },
  { id: 12, section: '二、查询与分组', question: 'WHERE 与 HAVING 的区别，正确的是（　）。', options: ['二者完全等价，可以互换使用', 'HAVING 先于 WHERE 执行', 'WHERE 在分组前对行筛选（不能使用聚集函数），HAVING 在分组后对组筛选（可以使用聚集函数）', 'WHERE 只能用于视图查询'], answer: 'C', analysis: '【考点：两子句辨析】执行顺序 FROM→WHERE→GROUP BY→HAVING：WHERE 面向"行"、HAVING 面向"组"。"行条件写 WHERE、组条件写 HAVING"。' },
  { id: 13, section: '二、查询与分组', question: '语句 SELECT 课程号, COUNT(*) FROM SC GROUP BY 学号 的错误在于（　）。', options: ['COUNT 不能与 GROUP BY 同用', 'GROUP BY 子句应省略', 'GROUP BY 应改写为 HAVING', 'SELECT 中的课程号未出现在 GROUP BY 子句中'], answer: 'D', analysis: '【考点：分组规则】按学号分组后，SELECT 里只能出现分组列（学号）和聚集函数；课程号既不是分组列也不在聚集函数里，与"组"无对应关系，非法。' },
  { id: 14, section: '二、查询与分组', question: '聚集函数 AVG、SUM 在计算时对列中的 NULL 值的处理方式是（　）。', options: ['把 NULL 当作 0 参与计算', '遇到 NULL 直接报错', '忽略取值为 NULL 的行', '结果必然为 NULL'], answer: 'C', analysis: '【考点：聚集函数与NULL】SUM/AVG/MAX/MIN/COUNT(列) 都跳过 NULL 行（不当作 0）。若把 NULL 当 0，AVG 会被人为拉低——"跳过"与"当0"的差别常被命题利用。' },
  { id: 15, section: '三、连接与子查询', question: 'R LEFT OUTER JOIN S（左外连接）的结果（　）。', options: ['仅包含两表中满足连接条件的元组', '包含左表 R 的全部元组，无匹配处填 NULL', '包含两表的全部元组', '仅包含右表 S 的全部元组'], answer: 'B', analysis: '【考点：左外连接】左外＝内连接结果＋左表未匹配行（右表列补 NULL）。查"所有学生的选课情况（含未选课学生）"必须用左外连接，用内连接会漏掉未选课的学生。' },
  { id: 16, section: '三、连接与子查询', question: '语句 FROM R JOIN S ON R.B = S.B（未带 OUTER）执行的连接类型是（　）。', options: ['交叉连接', '左外连接', '内连接', '自然连接'], answer: 'C', analysis: '【考点：连接类型】JOIN...ON 默认 INNER JOIN（内连接），只保留匹配元组。自然连接是 NATURAL JOIN（自动按同名列、去重复列），与此处的 JOIN...ON 不同。' },
  { id: 17, section: '三、连接与子查询', question: '员工表 Emp(工号, 姓名, 部门, 上级工号)，查询"每个员工及其上级的姓名"，应使用（　）。', options: ['自连接（同一张表起两个别名连接）', '左外连接', '除法运算', '右外连接'], answer: 'A', analysis: '【考点：自连接】上级也是员工，数据在同一张表内：FROM Emp E JOIN Emp M ON E.上级工号 = M.工号。识别信号：需要比较"同一张表里的两行"。' },
  { id: 18, section: '三、连接与子查询', question: 'WHERE 学号 IN (SELECT 学号 FROM SC WHERE 课程号 = \'C1\') 的含义是（　）。', options: ['查询未选修 C1 课程的学生', '学号等于子查询返回的第一个值', '查询只选修了 C1 一门课程的学生', '学号属于"选修了 C1 的学号"集合，即选修了 C1 的学生'], answer: 'D', analysis: '【考点：IN子查询】IN 即"属于集合"。注意它只保证"选了 C1"，不排除同时选了别的课（C 错——那是"仅选C1"）。集合语义与"恰好"语义的差别是命题点。' },
  { id: 19, section: '三、连接与子查询', question: 'EXISTS (子查询) 返回真的条件是（　）。', options: ['子查询返回结果非空（至少一个元组）', '子查询返回空结果', '子查询返回了 NULL 值', '子查询语法正确'], answer: 'A', analysis: '【考点：EXISTS语义】EXISTS 是存在量词：子查询查到至少一行即为真，一行都没有即为假。它只关心"有没有"，不关心子查询选了哪些列。' },
  { id: 20, section: '三、连接与子查询', question: 'SQL 中表达"选修了全部课程的学生"（关系代数除法语义）常用（　）。', options: ['IN', 'NOT EXISTS（不存在一门课程该生没有选）', 'LIKE', 'BETWEEN'], answer: 'B', analysis: '【考点：全称量词】SQL 没有全称量词，用双重否定模拟：NOT EXISTS (SELECT * FROM Course WHERE NOT EXISTS (SELECT * FROM SC WHERE SC.学号=S.学号 AND SC.课程号=Course.课程号))。口诀："不存在一门课他没选"。' },
  { id: 21, section: '三、连接与子查询', question: 'WHERE 工资 > ALL (SELECT 工资 FROM Emp WHERE 部门=\'30\') 表示（　）。', options: ['高于 30 部门任一人的工资', '等于 30 部门某人的工资', '高于 30 部门所有人的工资（即高于其中最高值）', '低于 30 部门最低的工资'], answer: 'C', analysis: '【考点：ANY/ALL】>ALL＝大于集合中每一个＝大于最大值；>ANY＝大于其中某一个＝大于最小值。两者互换是经典干扰项。' },
  { id: 22, section: '四、视图、授权与事务', question: '下列关于视图的说法，正确的是（　）。', options: ['视图是虚表，数据库中只存储其定义，数据仍存在基本表中', '视图的数据独立永久存储在数据库中', '视图不能作为查询对象', '视图必须且只能由一张基本表导出'], answer: 'A', analysis: '【考点：视图本质】视图存"定义"不存"数据"，查询视图时由 DBMS 实时从基本表算出。视图可由一张或多张表/视图导出，也可以再被查询（甚至更新，有限制）。' },
  { id: 23, section: '四、视图、授权与事务', question: '下列不属于视图优点的是（　）。', options: ['能简化用户的复杂查询操作', '可对机密数据提供安全保护（用户只看到部分行、列）', '可提供一定程度的逻辑数据独立性', '能够提高数据库中的数据冗余'], answer: 'D', analysis: '【考点：视图优点】三大优点：简化查询、安全性、逻辑独立性。视图不额外存数据、谈不上增加冗余——"提高冗余"是反规范化的效果，不是视图的。' },
  { id: 24, section: '四、视图、授权与事务', question: 'GRANT SELECT ON Student TO user1 WITH GRANT OPTION 中，WITH GRANT OPTION 的作用是（　）。', options: ['把权限授予所有用户', '允许 user1 将该权限再授予其他用户', '立即收回 user1 的权限', '表示只授予查询权限'], answer: 'B', analysis: '【考点：授权传播】WITH GRANT OPTION 使权限可以"转授"。相应地 REVOKE 有 CASCADE（级联收回转授出去的权限）与 RESTRICT（有限制地收回）两种选择。' },
  { id: 25, section: '四、视图、授权与事务', question: 'REVOKE 语句的作用是（　）。', options: ['授予用户权限', '修改表结构', '收回已授予用户的权限', '提交事务'], answer: 'C', analysis: '【考点：DCL语句】GRANT 授予、REVOKE 收回，二者构成权限管理的闭环。A 是 GRANT，D 是 COMMIT。' },
  { id: 26, section: '四、视图、授权与事务', question: '事务的原子性是指（　）。', options: ['事务一旦提交，修改永久有效', '并发执行的事务互不干扰', '数据库从一个一致状态转变到另一个一致状态', '事务中的全部操作要么都执行、要么都不执行'], answer: 'D', analysis: '【考点：原子性】原子＝不可分割：全做或全不做，不允许做一半。若中途失败必须回滚（ROLLBACK）到事务开始前。A 是持久性、B 是隔离性、C 是一致性。' },
  { id: 27, section: '四、视图、授权与事务', question: '"事务提交后，其对数据库的修改应永久保存，即使系统发生故障也不丢失"，描述的是事务的（　）。', options: ['持久性', '原子性', '隔离性', '一致性'], answer: 'A', analysis: '【考点：持久性】提交＝落盘承诺。持久性由日志（先写日志后写数据）与恢复机制保证。考试常把四性的描述打乱让你对号入座，记场景比记定义快。' },
  { id: 28, section: '四、视图、授权与事务', question: '两个并发事务先后读取同一数据并各自修改写回，后写者覆盖先写者，前一事务的更新如同从未发生。这种并发问题是（　）。', options: ['脏读', '丢失更新', '不可重复读', '幻读'], answer: 'B', analysis: '【考点：丢失更新】"写了被覆盖"是丢失更新。脏读是读未提交数据；不可重复读是同一事务两次读值不同。三者都靠封锁（写加 X 锁）避免。' },
  { id: 29, section: '四、视图、授权与事务', question: '某事务读取了另一事务尚未提交、随后被回滚的数据，这种现象称为（　）。', options: ['丢失更新', '不可重复读', '脏读', '死锁'], answer: 'C', analysis: '【考点：脏读】读到"从未正式存在过"的数据即为脏读。对策：写事务加 X 锁直到提交（别的事务读不到未提交值），即一级封锁协议。' },
  { id: 30, section: '四、视图、授权与事务', question: '关于 S 锁（共享锁）与 X 锁（排他锁），正确的是（　）。', options: ['X 锁与 X 锁之间可以兼容', 'S 锁与 X 锁可以兼容', '任何锁之间都不能兼容', 'S 锁与 S 锁兼容（读读共享），X 锁与任何锁都不兼容（写独占）'], answer: 'D', analysis: '【考点：封锁兼容性】读读可并行（多个 S），读写、写写互斥（X 排他）。一句话："读共享、写排他"。事务读数据加 S 锁、写数据加 X 锁。' }
]
}

};
