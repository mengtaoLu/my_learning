---
title: 学习指南
---

# 《Java多线程编程实战指南（核心篇）》学习与自测指南

## 一、 基础概念与线程生命周期
* [ ] **进程与线程：** 进程和线程的根本区别是什么？在Java中，多线程编程的主要优势和潜在风险（安全性、活跃性、性能）分别是什么？
* [ ] **线程创建：** Java创建线程有哪几种方式？`Thread` 类、`Runnable` 接口以及 `Callable` 接口的区别是什么？为什么通常推荐使用接口方式？
* [ ] **线程属性：** `Priority`（优先级）和 `Daemon`（守护线程）的实际意义是什么？在什么场景下需要用到守护线程？
* [ ] **生命周期转换：** Java线程的 6 种状态（NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED）是如何定义的？请描述各状态之间的转换触发条件。

* [ ] **核心方法：** * `start()` 和 `run()` 的本质区别是什么？
    * `sleep()` 和 `yield()` 对 CPU 执行权和锁的处理有何不同？
    * `join()` 的底层原理是什么？它如何保证线程间的执行顺序？

## 二、 内存模型与并发原理（底层核心）
* [ ] **Java内存模型 (JMM)：** 什么是主内存？什么是工作内存？JMM 存在的意义是为了解决什么问题？
* [ ] **原子性、可见性、有序性：** * 请解释多线程环境下这三大特性的含义。
    * 哪些操作在 Java 中是原子性的？哪些不是（如 `long/double` 的非原子性协定）？
* [ ] **重排序：** 什么是指令重排序？编译器和处理器为什么要进行重排序？它在什么情况下会破坏代码逻辑？
* [ ] **Happens-Before原则：** 什么是 Happens-Before 关系？请列举至少 5 条常见的 Happens-Before 规则。

## 三、 同步机制：锁与原子变量
* [ ] **synchronized 关键字：** * 它的实现原理（Monitor/管程）是什么？
    * 什么是“锁的升级”过程（偏向锁 -> 轻量级锁 -> 重量级锁）？
    * 什么是锁消除（Lock Elision）和锁粗化（Lock Coarsening）？
* [ ] **volatile 关键字：** * 它如何保证可见性？（内存屏障/Memory Barrier 的作用）
    * 它如何禁止指令重排序？
    * 为什么它不能保证 `i++` 这种操作的原子性？
* [ ] **CAS (Compare and Swap)：** * CAS 的工作原理是什么？它的硬件基础是什么？
    * 什么是 ABA 问题？如何利用版本号（`AtomicStampedReference`）解决？
* [ ] **显式锁 Lock：** * `ReentrantLock` 的公平锁与非公平锁在实现和性能上有何区别？
    * `tryLock()` 在处理死锁预防时有什么优势？
    * `ReentrantReadWriteLock`（读写锁）的实现原理及“锁降级”过程是怎样的？

## 四、 线程间协作与通信
* [ ] **等待/通知机制：** * `wait/notify/notifyAll` 为什么必须在 `synchronized` 代码块内调用？
    * 为什么调用 `wait` 时推荐放在 `while` 循环中而不是 `if` 中？
* [ ] **Condition 对象：** * `Condition` 的 `await/signal` 相比于 `Object` 的等待通知有什么高级特性？
    * 如何利用多个 `Condition` 实现精准的生产者-消费者模型？
* [ ] **同步工具类：** * `CountDownLatch`（倒计时门栓）的工作原理及其不可重用性。
    * `CyclicBarrier`（循环栅栏）与 `CountDownLatch` 的异同点。
    * `Semaphore`（信号量）如何实现流量控制和资源池限制？

## 五、 线程池与执行框架
* [ ] **ThreadPoolExecutor 核心参数：** 请详细说明：`corePoolSize`、`maximumPoolSize`、`keepAliveTime`、`workQueue`、`handler`（拒绝策略）的作用。

* [ ] **任务执行流程：** 当一个新任务提交时，线程池内部的判断逻辑顺序是怎样的？
* [ ] **阻塞队列：** `ArrayBlockingQueue`、`LinkedBlockingQueue`、`SynchronousQueue` 各自的特点是什么？对线程池压力有何影响？
* [ ] **拒绝策略：** 默认的四种拒绝策略（Abort, CallerRuns, Discard, DiscardOldest）分别适用于什么场景？

## 六、 并发集合与安全设计
* [ ] **ConcurrentHashMap：** * Java 7（Segment 分段锁）与 Java 8（CAS + synchronized + 红黑树）在实现上有何区别？
    * 为什么它不允许 Key 或 Value 为 null？
* [ ] **CopyOnWriteArrayList：** 它的“写时复制”机制是如何保证一致性的？其适用场景和代价是什么？
* [ ] **ThreadLocal：** * 它的内部实现结构（ThreadLocalMap）是怎样的？
    * 为什么容易产生内存泄漏？为什么 Key 要设计成弱引用（WeakReference）？
* [ ] **安全策略：** * 什么是不可变对象（Immutable Object）？
    * 什么是线程封闭（Thread Confinement）？

---

## 终极自测：如何判断自己完全掌握了？

1.  **逻辑闭环：** 提到 `volatile` 时，你是否能立刻联想到 JMM、内存屏障、禁用重排序以及 DCL 单例模式？
2.  **异常诊断：** 如果线上程序 CPU 飙升或响应极慢，你是否知道如何使用 `jstack` 查看线程快照并识别死锁或等待状态？
3.  **选型权衡：** 面对一个具体场景，你能否准确说出为什么选 `ReentrantLock` 而不选 `synchronized`？或者为什么选 `LongAdder` 而不选 `AtomicLong`？
4.  **手绘模型：** 你能否在不看书的情况下，画出线程池的任务调度图或 Java 内存模型简图？