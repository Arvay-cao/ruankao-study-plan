// 2026-10-05（周一）第6周 · 算法、模式与首次连考 | Java选做题
// 讲义 + 3道Java代码/设计模式大题（试题五题型，含答案与解析，已逐题校验）
window.LESSONS = window.LESSONS || {};

window.LESSONS['2026-10-05'] = {

topic: 'Java选做题',

lecture: `
<div class="callout info">
<div class="callout-title">本讲说明</div>
<p><b>对应执行表任务：</b>完成3道Java代码/设计模式题；复习继承、多态、接口和集合。<b>考情提示：</b>下午卷试题五（约15分）是 Java 与 C++ 二选一——按本计划固定选 Java。它考的是<b>模式骨架 + 面向对象语法</b>，题型极其稳定：给一段"接口+实现类+上下文"的代码挖 4—6 个空。这 15 分是下午卷<b>最稳定、最适合抢</b>的一块。</p>
<p><b>今日时间安排（2小时）：</b>40分钟精读讲义（重点第2—5节语法+第6节套路）→ 60分钟限时完成3道大题（每题20分钟）→ 20分钟订正。</p>
</div>

<h2>1. 试题五的固定长相（先认结构再读代码）</h2>
<table>
<tr><th>组成部分</th><th>说明</th></tr>
<tr><td>类说明段</td><td>文字描述每个类的职责——<b>答案的字典</b>（"Order 类持有折扣对象并委托计算"已经告诉你空里填什么）</td></tr>
<tr><td>代码</td><td>100—200 行 Java：接口 / 抽象类 + 2—4 个实现类 / 子类 + 上下文或 main 类</td></tr>
<tr><td>挖空</td><td>4—6 空，套路见第6节；另常问 1 问"该代码采用了哪种设计模式"</td></tr>
</table>

<h2>2. 继承（extends）要点 <span class="stars">★★★</span></h2>
<ul>
<li>Java <b>单继承</b>（一个类只能 extends 一个父类），所有类的根是 Object。</li>
<li><b>构造顺序</b>：子类构造执行前必先执行父类构造（默认调 super() 无参；父类只有带参构造时，子类构造<b>必须显式 super(参数)</b>，且 super(...) 必须是第一条语句）。</li>
<li><b>方法重写（Override）规则</b>：方法名、参数列表相同；返回类型相同（或子类型）；访问权限<b>不能比父类更小</b>；不能抛出更宽的受检异常。</li>
<li>重写 vs 重载（Overload）：重载是<b>同类中参数列表不同</b>，与继承无关——下午题选项常混这两个词。</li>
<li>final 类不能被继承，final 方法不能被重写。</li>
</ul>

<h2>3. 多态（下午题的灵魂）<span class="stars">★★★</span></h2>
<ul>
<li><b>向上转型</b>：Employee e = new Manager(...); ——父类引用指向子类对象，<b>天然合法、无需强转</b>。</li>
<li><b>动态绑定</b>：通过 e 调用<b>重写的方法</b>时，执行的是<b>实际对象</b>（Manager）的版本。口诀：<b>编译看左边（Employee 有没有这个方法），运行看右边（实际对象是谁就执行谁的版本）</b>。</li>
<li>父类引用不能直接调用子类特有方法，需要强转并用 instanceof 判断。</li>
<li>静态方法、私有方法、final 方法不参与动态绑定。</li>
</ul>

<h2>4. 抽象类与接口 <span class="stars">★★★</span></h2>
<table>
<tr><th>对比项</th><th>抽象类（abstract class）</th><th>接口（interface）</th></tr>
<tr><td>关键字</td><td>extends 继承</td><td>implements 实现</td></tr>
<tr><td>数量</td><td>单继承</td><td><b>一个类可实现多个接口</b></td></tr>
<tr><td>成员变量</td><td>任意</td><td>默认 public static final 常量</td></tr>
<tr><td>方法</td><td>可含具体方法与抽象方法</td><td>传统上全是抽象方法（JDK8 后可有 default/static 方法，了解即可）</td></tr>
<tr><td>构造方法</td><td>有（供子类 super 调用）</td><td><b>没有</b></td></tr>
<tr><td>实例化</td><td>都不能直接 new；抽象方法在具体子类中必须全部实现</td><td>同左</td></tr>
</table>
<div class="callout key">
<div class="callout-title">挖空高频</div>
<p>interface 里的方法声明本身就是挖空对象：接口方法默认 public abstract，实现类的实现方法<b>必须写 public</b>。看到"class A 【空】 B"先问：B 是接口（填 implements）还是类（填 extends）。</p>
</div>

<h2>5. 集合框架（够用版）</h2>
<table>
<tr><th>接口</th><th>常用实现</th><th>特点</th><th>高频方法</th></tr>
<tr><td>List</td><td>ArrayList、LinkedList</td><td>有序、可重复、有下标</td><td>add(e)、get(i)、remove(i)、size()</td></tr>
<tr><td>Set</td><td>HashSet</td><td>不重复</td><td>add(e)、contains(e)</td></tr>
<tr><td>Map</td><td>HashMap</td><td>键值对、键不重复</td><td>put(k,v)、get(k)、keySet()、values()</td></tr>
</table>
<pre>List&lt;Employee&gt; emps = new ArrayList&lt;Employee&gt;();   // 泛型：列表里只能放Employee及其子类
emps.add(new Manager("王五", 10000));            // 向上转型：Manager 存入 List&lt;Employee&gt;
for (Employee e : emps) { total += e.pay(); }    // for-each遍历 + 动态绑定</pre>
<p>这套"<b>声明父类型集合 + 存入子类对象 + 遍历时调重写方法</b>"是试题五 main 函数的标准三连，今天的题3就是完整版本。</p>

<h2>6. 试题五挖空五大套路（对着套路填）</h2>
<table>
<tr><th>套路</th><th>典型空缺</th><th>判断线索</th></tr>
<tr><td>① 接口实现/继承声明</td><td>class A <b>implements</b> Discount / <b>extends</b> Employee</td><td>被实现的叫 interface → implements；被继承的是 class → extends</td></tr>
<tr><td>② 子类构造调父类</td><td><b>super(name);</b></td><td>父类只有带参构造；super(...) 必须是第一条语句</td></tr>
<tr><td>③ 方法重写签名</td><td>public double <b>calc(double price)</b> {…}</td><td>照抄接口/父类的方法名与参数，记得写 public</td></tr>
<tr><td>④ 委托调用</td><td>return d.<b>calc(p)</b>; / o.<b>update(msg)</b>;</td><td>上下文持有接口引用，方法体里调用接口方法</td></tr>
<tr><td>⑤ 集合操作</td><td>list.<b>add(s)</b>; / <b>e.pay()</b>（遍历体）</td><td>订阅→add；通知→for里调update；统计→调重写方法</td></tr>
</table>

<h2>7. 答题三步法</h2>
<ol>
<li><b>读类说明段</b>，在每个类旁边用铅笔标注角色名（策略类/上下文/观察者/子类）——角色一标，空缺的语义自动浮现。</li>
<li><b>认设计模式骨架</b>（昨天第5节的三信号）：接口+多实现→策略/状态/观察者；attach/notify/update→观察者；固定流程父类→模板方法。</li>
<li><b>按套路对号填空</b>：每个空先归类到第6节的五种套路之一，再从候选代码中选；填完通读一遍检查语法。</li>
</ol>

<h2>8. 自检清单</h2>
<ol>
<li>子类构造中 super(...) 的位置规则？什么情况下必须显式写？</li>
<li>重写与重载的区别？重写的三条限制？</li>
<li>"编译看左边，运行看右边"指什么？</li>
<li>接口方法默认的访问修饰？实现类实现方法的修饰符要求？</li>
<li>抽象类与接口的五点区别？</li>
<li>List、Set、Map 各自特点与高频方法？</li>
<li>试题五五大挖空套路分别怎么判断？</li>
</ol>

<div class="callout tip">
<div class="callout-title">完成本日后</div>
<p>明日（10/6 周二）<b>上午查漏日</b>：针对 10/4 锁定的弱项 Top3 各完成 15 题（共45题）。网站提供"计算类/概念辨析类/软件工程与法规类"三组各 15 题的全覆盖混合卷——若你的 Top3 与之不同，优先做对应组，其余明天补。</p>
</div>
`,

quiz: {
  kind: 'afternoon',
  suggestedMinutes: 60,
  note: '下午试题五题型：3 道 Java 大题（策略模式、观察者模式、继承多态+集合）。每题限时 20 分钟。先读类说明认模式骨架，再按五大套路填空；填空作答题为选择题，运行结果与模式名为填空。',
  scenario: `
  <h2 style="margin-top:0">题1 · 订单折扣（策略模式，限时20分钟）</h2>
  <p><b>【说明】</b>某订单系统支持多种折扣算法（打折、满减），运营可随时切换。系统将每种折扣封装为独立类实现统一接口，订单类（Order）持有当前折扣对象并在结算时<b>委托</b>其计算。</p>
  <pre>interface Discount {
    double calc(double price);                       // 抽象策略：计算折扣后价格
}
class RateDiscount implements Discount {             // 具体策略：打折
    private double rate;
    public RateDiscount(double rate) { this.rate = rate; }
    public double calc(double price) { return price * rate; }
}
class FullReduceDiscount implements Discount {       // 具体策略：满300减50
    public double calc(double price) {
        if (price &gt;= 300) return price - 50;
        return price;
    }
}
class Order {                                        // 上下文
    private Discount discount;
    public void setDiscount(Discount d) {
        【空1】;
    }
    public double pay(double price) {
        return 【空2】;
    }
}
public class Main {
    public static void main(String[] args) {
        Order o = new Order();
        o.setDiscount(new RateDiscount(0.8));
        System.out.println(o.pay(100));
    }
}</pre>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">题2 · 公众号推送（观察者模式，限时20分钟）</h2>
  <p><b>【说明】</b>读者（Reader）订阅公众号（WeChatAccount）；公众号发布新文章时，<b>自动通知所有订阅者</b>。订阅者只需实现统一接口，公众号不依赖任何具体订阅者类。</p>
  <pre>import java.util.*;
interface Subscriber {
    void update(String article);                     // 抽象观察者
}
class WeChatAccount {                                // 目标（Subject）
    private List&lt;Subscriber&gt; list = new ArrayList&lt;Subscriber&gt;();
    public void subscribe(Subscriber s) {
        【空3】;
    }
    public void unsubscribe(Subscriber s) { list.remove(s); }
    public void publish(String article) {
        for (Subscriber s : list) {
            【空4】;
        }
    }
}
class Reader implements Subscriber {
    private String name;
    public Reader(String name) { this.name = name; }
    public void update(String article) {
        System.out.println(name + " 收到推送：" + article);
    }
}
public class Main {
    public static void main(String[] args) {
        WeChatAccount acc = new WeChatAccount();
        acc.subscribe(new Reader("张三"));
        acc.subscribe(new Reader("李四"));
        acc.publish("新文章上线");
    }
}</pre>
  <hr style="border:none;border-top:1px dashed #d9dee7;margin:18px 0">
  <h2 style="margin-top:0">题3 · 工资统计（继承+多态+集合，限时20分钟）</h2>
  <p><b>【说明】</b>员工（Employee）为抽象类，声明抽象方法 pay() 计算月薪；经理（Manager）按固定薪水发薪，销售员（Salesman）月薪=底薪+提成。main 方法将各类员工<b>统一存入员工列表</b>并累计工资总额。</p>
  <pre>import java.util.*;
abstract class Employee {
    private String name;
    public Employee(String name) { this.name = name; }
    public String getName() { return name; }
    public abstract double pay();                    // 抽象方法：由子类实现
}
class Manager extends Employee {
    private double salary;
    public Manager(String name, double salary) {
        【空5】;
        this.salary = salary;
    }
    public double pay() { return salary; }
}
class Salesman extends Employee {
    private double base, bonus;
    public Salesman(String name, double base, double bonus) {
        super(name); this.base = base; this.bonus = bonus;
    }
    public double pay() { return base + bonus; }
}
public class Main {
    public static void main(String[] args) {
        List&lt;Employee&gt; emps = new ArrayList&lt;Employee&gt;();
        emps.add(new Manager("王五", 10000));
        emps.add(new Salesman("赵六", 4000, 2000));
        double total = 0;
        for (Employee e : emps) {
            total += 【空6】;
        }
        System.out.println(total);
    }
}</pre>
  `,
  questions: [
    { id: 1, section: '一、订单折扣（策略模式）', question: '空1 处应填（　）。', options: ['d.discount = discount;', 'this.discount = d;', 'discount = new Discount();', 'return d;'], answer: 'B', analysis: '【考点：setter赋值】setDiscount 的职责是把传入的策略对象存入成员变量：this.discount = d;。成员名与方法参数同名时必须用 this 区分（A 方向反了且成员名不符；接口不能 new（C）；setter 不返回值（D））。' },
    { id: 2, section: '一、订单折扣（策略模式）', question: '空2 处应填（　）。', options: ['price * 0.8', 'discount.calc(price);', 'RateDiscount.calc(price)', 'setDiscount(price)'], answer: 'B', analysis: '【考点：委托调用】说明原句"结算时委托其计算"——上下文不自己算折扣，而是调用所持策略对象的 calc 方法：discount.calc(price)。A 把具体算法写死在上下文里，策略模式就废了（客户端切换策略毫无意义）；静态调用（C）与 setter 误用（D）均不合语义。' },
    { id: 3, section: '一、订单折扣（策略模式）', type: 'blank', hint: '输入运行结果，如：80.0', question: 'main 方法输出的结果是____。', answer: '80.0', accept: ['80'], analysis: '【考点：跟踪执行】o.setDiscount(new RateDiscount(0.8)) → discount 指向打折策略；o.pay(100) → 100×0.8 = 80.0。注意 Java 中 100*0.8 是 double 运算，输出 80.0。' },
    { id: 4, section: '一、订单折扣（策略模式）', type: 'blank', hint: '输入模式名，如：策略模式', question: '该代码采用的设计模式是____。', answer: '策略模式', accept: ['策略', 'strategy', 'strategy模式', '策略(strategy)模式'], analysis: '【考点：模式识别】接口+多个可互换实现+上下文持有引用并委托调用=策略模式。若要新增"直减10元"算法，只需再写一个类实现 Discount 接口——不修改任何现有类，符合开闭原则。' },
    { id: 5, section: '一、订单折扣（策略模式）', question: '若系统需新增"直减10元"的折扣算法，符合开闭原则的做法是（　）。', options: ['修改 Order 类，在其中增加 if 分支', '修改 RateDiscount 类增加新算法', '新增一个类实现 Discount 接口，Order 与各现有类均不修改', '修改接口 Discount，增加新方法'], answer: 'C', analysis: '【考点：开闭原则+策略模式扩展】策略模式的价值正在于此：新增算法=新增具体策略类，对扩展开放、对修改关闭。在上下文加 if 分支（A）正是策略模式要消灭的写法；修改现有类（B/D）违反开闭原则。' },
    { id: 6, section: '二、公众号推送（观察者模式）', question: '空3 处应填（　）。', options: ['list.add(s);', 'list.remove(s);', 's.update(list);', 'list = s;'], answer: 'A', analysis: '【考点：集合操作】subscribe（订阅）的语义=把订阅者加入列表：list.add(s)。remove 是退订（unsubscribe 已给出）；整个观察者模式的结构就建立在"列表的增删"与"遍历通知"两个集合操作上。' },
    { id: 7, section: '二、公众号推送（观察者模式）', question: '空4 处应填（　）。', options: ['list.add(article);', 's.update(article);', 'article.update(s);', 'System.out.println(s);'], answer: 'B', analysis: '【考点：遍历通知】publish 遍历订阅者列表，逐个调用其 update 方法把文章推给它：s.update(article)。这是观察者模式 notify 的标准实现，与昨日讲义"认骨架三信号"中的 for+update 完全对应。' },
    { id: 8, section: '二、公众号推送（观察者模式）', type: 'blank', hint: '输入数字，如：2', question: 'main 方法执行后，控制台输出____行。', answer: '2', analysis: '【考点：跟踪执行】两个 Reader 都订阅了公众号，publish 遍历列表对每个订阅者调 update → 张三、李四各输出一行，共 2 行。跟踪法：数列表里 add 了几次就有几行输出。' },
    { id: 9, section: '二、公众号推送（观察者模式）', question: '类 Reader 与接口 Subscriber 之间的关系是（　）。', options: ['继承关系（extends）', '实现关系（implements）', '聚合关系', '依赖关系'], answer: 'B', analysis: '【考点：类间关系】Java 中类与接口之间是 implements 实现关系（代码第1行就有体现）。extends 用于类继承类或接口继承接口。UML 中实现关系用虚线三角箭头表示——若试题三考类图，此处虚实线是必考鉴别点。' },
    { id: 10, section: '二、公众号推送（观察者模式）', question: '关于 WeChatAccount 类的设计，正确的说法是（　）。', options: ['它必须依赖 Reader 具体类才能完成推送', '它只依赖 Subscriber 接口，新增其他订阅者类型（如"企业号订阅者"）无需修改它的代码', '它必须为每种订阅者编写一个 publish 重载', 'list 中只能存放 Reader 对象'], answer: 'B', analysis: '【考点：面向接口编程】list 的类型是 List&lt;Subscriber&gt;（泛型约束为接口），publish 调用的也是接口方法——目标类对具体观察者一无所知，这就是"针对接口编程"与依赖倒置的体现。D 错：任何实现 Subscriber 的对象都能存入。' },
    { id: 11, section: '三、工资统计（继承+多态+集合）', question: '空5 处应填（　）。', options: ['name = this.name;', 'super(name);', 'this(name);', 'Employee.name = name;'], answer: 'B', analysis: '【考点：子类构造】父类 Employee 只提供带参构造 Employee(String name)，没有无参构造；子类构造必须显式调用 super(name) 完成父类部分初始化，且 super(...) 必须是第一条语句（此处恰好也是第一条）。this(name) 是调用本类其他构造（C 错）。' },
    { id: 12, section: '三、工资统计（继承+多态+集合）', question: '空6 处应填（　）。', options: ['e.salary', 'Employee.pay()', 'e.pay();', 'emps.get(e)'], answer: 'C', analysis: '【考点：动态绑定】遍历列表用统一引用 e 调用重写方法 pay()：编译期检查 Employee 有 pay（抽象方法已声明），运行期按实际对象执行 Manager 或 Salesman 的版本——"编译看左边，运行看右边"。salary 是 Manager 私有成员（A 编译不过）；静态方式调用（B）没有动态绑定。' },
    { id: 13, section: '三、工资统计（继承+多态+集合）', type: 'blank', hint: '输入运行结果，如：16000.0', question: 'main 方法输出的 total 是____。', answer: '16000.0', accept: ['16000'], analysis: '【考点：跟踪执行】Manager("王五",10000).pay()=10000；Salesman("赵六",4000,2000).pay()=4000+2000=6000；total=10000+6000=16000.0（double 运算带小数点）。' },
    { id: 14, section: '三、工资统计（继承+多态+集合）', question: '第一次循环 total += e.pay() 时，执行的是（　）。', options: ['Employee 类的 pay() 方法', 'Manager 类的 pay() 方法', 'Salesman 类的 pay() 方法', 'Object 类的 pay() 方法'], answer: 'B', analysis: '【考点：动态绑定】列表第 1 个元素是 new Manager(...)，通过 Employee 引用调用重写方法时执行实际对象 Manager 的版本。第 2 轮才执行 Salesman 的 pay。这是多态的核心机制，也是试题五最常设问的知识点。' },
    { id: 15, section: '三、工资统计（继承+多态+集合）', question: 'Employee 类声明为 abstract 的原因与效果是（　）。', options: ['它含有抽象方法 pay()，因此不能被实例化，必须由子类实现全部抽象方法后才能创建子类对象', 'abstract 类不能被继承', '它必须实现接口', 'abstract 类中不能有具体方法'], answer: 'A', analysis: '【考点：抽象类】"每种员工的发薪方式不同"→ pay 无法在父类给出统一实现→声明为抽象方法；含抽象方法的类必须声明为 abstract，不能 new。抽象类完全可以被继承（B，这正是它的用途）且可以包含具体方法如 getName（D 反例就在代码里）；它与接口无关（C）。' }
  ]
}

};
