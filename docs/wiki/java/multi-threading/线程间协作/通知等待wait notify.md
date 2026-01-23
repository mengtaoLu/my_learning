---
sidebar_position: 1
---

>一个线程由于保护条件不满足而被暂停，称为等待（wait）
> 
> 一个线程更新了系统状态，导致另外的线程满足了条件，而被唤醒，称为通知（notify）
> 
> 需要在同一把锁上面


## Object.wait()

模板代码：
```java
synchronized(someObject) {
    while(保护条件不成立)
        Object.wait();
        }
        
    // 执行到此时，说明满足条件
    doAction();
```

- 持有对象的锁才能调用`Object.wait()`

将当前线程加入等待集、暂停当前线程、释放锁以及将唤醒后的等待线程从等待集中移除等，都是在Object.wait()中实现的。

## Object.notify() / Object.notifyAll()

唤醒线程

## 容易遇见的问题

### 过早唤醒

- 说明：保护条件并未成立，却被唤醒，结果仍需等待
- 原因：可能被`Object.notifyAll()`唤醒
- 影响：造成性能的消耗

### 信号丢失

- 说明：错过或者没有接收到唤醒的信号，造成一直等待
- 原因：
  - 可能是唤醒线程提前退出；
  - 在用`notifyAll()`的地方使用`notify()`，导致满足的线程没被唤醒

### 欺骗性唤醒

未知原因导致线程突然被唤醒

### 上下文切换问题

导致多次上下文切换

## Thread.join()

调用`Thread.join()`的当前行代码的线程会进入暂停，直到`Thread`执行完为止。

## 示例代码Demo

[wait/notify使用demo](https://github.com/mengtaoLu/demo/blob/main/src/com/tml/waitNotify/ErrorDemoWaitNotifyDemo1.java)

>此示例代码中遇见的问题包括：
> 
> - 信号丢失：由于线程提早退出，造成信号丢失
> - 死锁：竞态条件造成的死锁，为避免此问题，应该明确线程责任，不要在`wait()`前随意消费数据