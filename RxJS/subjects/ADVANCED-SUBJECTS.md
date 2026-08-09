# RxJS Advanced Subjects: BehaviorSubject, ReplaySubject, AsyncSubject

## Overview

RxJS provides multiple Subject types for different use cases. Here's a comprehensive guide to three of the most important ones.

---

## 1. BehaviorSubject 🎯

### What is it?
A `BehaviorSubject` is a Subject that:
- **Requires an initial value** (unlike regular Subject)
- **Emits the latest value immediately** to new subscribers
- **Always maintains a current value** that can be accessed anytime

### Key Characteristics
```
Before Subscription: BehaviorSubject has initial value "OFF"
                        │
                        ├──> Subscriber A joins → receives "OFF" immediately
                        │
                        ├──> .next("ON") sent
                        │
                        ├──> Subscriber B joins → receives "ON" immediately
                        │
                        └──> Both see future changes
```

### When to Use
- ✅ **State management** (current user, theme, app settings)
- ✅ **Current values** that components need immediately
- ✅ **Cached state** that new components joining late should know about
- ✅ **Configuration** that changes over time

### Example Use Cases
1. **User Authentication State** - New page loads should know if user is logged in
2. **Theme Selection** - New UI components should apply current theme immediately
3. **Cart Contents** - New components should see current cart items
4. **Network Status** - Components should know if offline/online

### Real Example: Theme Management
```javascript
const currentTheme = new BehaviorSubject('light');

// Component 1 joins
currentTheme.subscribe(theme => updateUI(theme)); // Gets 'light' immediately

// Theme changes
currentTheme.next('dark');

// Component 2 joins (late)
currentTheme.subscribe(theme => updateUI(theme)); // Gets 'dark' immediately!

// Access current value
const theme = currentTheme.value; // 'dark'
```

### Important Properties
```javascript
const subject = new BehaviorSubject(initialValue);
subject.value;           // Get current value anytime
subject.next(newValue);  // Emit new value
subject.subscribe(...);  // Subscribe to changes
```

---

## 2. ReplaySubject 📼

### What is it?
A `ReplaySubject` is a Subject that:
- **Does NOT require an initial value**
- **Buffers and replays** a specified number of past values
- **New subscribers get all buffered values** immediately, then future values
- **Great for replaying history**

### Key Characteristics
```
Timeline: .next(1) → .next(2) → .next(3) → .next(4) → Subscriber joins
                                              ↑          ↓
                                         Buffer keeps   New subscriber
                                        last 2 values   gets 3 & 4
                                                       then 5, 6, ...
```

### When to Use
- ✅ **Message/Chat history** - Show last N messages when user joins
- ✅ **Event logs** - New logger should see recent events
- ✅ **Command history** - Recent user actions
- ✅ **Undo/Redo stacks** - Keep recent operations
- ✅ **Analytics** - Record events for later analysis

### Constructor Options
```javascript
// Buffer by count: keep last 3 values
new ReplaySubject(3);

// Buffer by time: keep values emitted in last 5 seconds
new ReplaySubject(100, 5000);

// Buffer by count and time combined
new ReplaySubject(10, 10000);
```

### Real Example: Chat Messages
```javascript
const messages = new ReplaySubject(5); // Keep last 5 messages

// Messages sent
messages.next('Hello');
messages.next('How are you?');
messages.next('I am fine');
messages.next('Thanks!');
messages.next('Bye!');

// New subscriber joins chat
messages.subscribe(msg => console.log(msg));
// Outputs:
// "I am fine"
// "Thanks!"
// "Bye!"
// Then any new messages...
```

### Real Example: Click Event Tracking
```javascript
const clicks = new ReplaySubject(3); // Last 3 clicks

// Record clicks
clicks.next({ x: 100, y: 200, time: '10:00' });
clicks.next({ x: 150, y: 250, time: '10:05' });
clicks.next({ x: 200, y: 300, time: '10:10' });
clicks.next({ x: 250, y: 350, time: '10:15' });

// Analytics subscribes - gets last 3 clicks
clicks.subscribe(click => console.log(`Click at (${click.x}, ${click.y})`));
```

---

## 3. AsyncSubject ⏳

### What is it?
An `AsyncSubject` is a Subject that:
- **Does NOT require an initial value**
- **Only emits the LAST value** when `.complete()` is called
- **Ignores all intermediate values**
- **All subscribers get the same final value**

### Key Characteristics
```
Timeline: .next(1) → .next(2) → .next(3) → .complete()
           ❌           ❌           ✅            ↓
                                  Final       All subscribers
                                  value       get this value only
```

### When to Use
- ✅ **Final results only** - Operations where only the end result matters
- ✅ **Promise-like behavior** - Similar to Promise (ignores intermediate values)
- ✅ **HTTP requests** - Only the final response matters
- ✅ **File operations** - Only the completion result matters
- ✅ **Form submissions** - Only the final form data matters
- ✅ **Race conditions** - Only the last participant matters

### Real Example: Download Progress
```javascript
const download = new AsyncSubject();

// Progress updates (all ignored until complete)
download.next(10);   // ❌ Ignored
download.next(25);   // ❌ Ignored
download.next(50);   // ❌ Ignored
download.next(100);  // ✅ This will be emitted

download.subscribe(progress => {
    console.log(progress); // Only outputs: 100
});

download.complete(); // Triggers emission
```

### Real Example: HTTP Request
```javascript
const request = new AsyncSubject();

// Simulating HTTP states (all intermediate states ignored)
setTimeout(() => request.next({ state: 'connecting' }), 100);   // ❌
setTimeout(() => request.next({ state: 'sending' }), 200);      // ❌
setTimeout(() => request.next({ state: 'waiting' }), 300);      // ❌
setTimeout(() => {
    request.next({ status: 200, data: 'Success' });  // ✅ Final result
    request.complete();
}, 400);

request.subscribe(result => {
    console.log(result); // Only gets final result
});
```

### Real Example: Form Submission
```javascript
const formSubmission = new AsyncSubject();

// Validation steps
formSubmission.next({ step: 'validating email' });        // ❌
formSubmission.next({ step: 'checking database' });       // ❌
formSubmission.next({ step: 'encrypting password' });     // ❌
formSubmission.next({ userId: 42, success: true });       // ✅

formSubmission.subscribe(result => {
    console.log(`User ${result.userId} created!`);
});

formSubmission.complete();
```

---

## Comparison Chart

| Feature | Subject | BehaviorSubject | ReplaySubject | AsyncSubject |
|---------|---------|-----------------|---------------|--------------|
| **Requires Initial Value** | ❌ No | ✅ Yes | ❌ No | ❌ No |
| **Emits Last Value on Subscribe** | ❌ No | ✅ Yes | Buffered | ❌ No |
| **Buffers Past Values** | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **Emits on Complete** | N/A | N/A | N/A | ✅ Only |
| **Current Value Access** | ❌ No | ✅ Yes | ❌ No | ❌ No |
| **Best For** | Events | State | History | Final Results |

---

## Very easy comparison

| Type | Remembers? | New subscriber receives |
|------|------------|-------------------------|
| `Subject` | ❌ | Future values only |
| `BehaviorSubject` | ✅ 1 latest value | The current latest value immediately |
| `ReplaySubject(2)` | ✅ Last 2 values | The last 2 buffered values immediately |
| `AsyncSubject` | ✅ Final value | The final value after `complete()` |

---

## Visual Flowcharts

### Subject Flow
```
┌──────────────────────┐
│  Emit Value          │
│ .next(value)         │
└──────────┬───────────┘
           │
      ┌────▼────┐
      │ Subject │
      └────┬────┘
           │
        ┌──┴─────────────────┐
        │                    │
        ▼                    ▼
   Subscriber A         Subscriber B
  (Gets value)         (Gets value)
```

### BehaviorSubject Flow
```
┌──────────────────────┐
│ Initial Value        │
│ 'ONLINE'             │
└──────────┬───────────┘
           │
    ┌──────▼────────┐
    │BehaviorSubject│
    └──────┬────────┘
           │
        ┌──┴──────────────────────┐
        │                         │
        ▼                         ▼
   Subscriber A          Subscriber B (late)
  (Gets 'ONLINE')      (Also gets 'ONLINE'!)
  immediately          immediately!
```

### ReplaySubject Flow
```
.next(1) → .next(2) → .next(3) → .next(4) → [BUFFER: 3, 4]
                                  ↓
                           Subscriber joins
                                  ↓
                      Gets: 3, 4, then 5, 6...
```

### AsyncSubject Flow
```
.next(1) → .next(2) → .next(3) → .complete()
  ❌         ❌         ✅           ↓
                              All subscribers
                              get value 3
```

---

## Practical Scenarios

### Scenario 1: E-commerce App
- **BehaviorSubject**: Current shopping cart (always has items or is empty)
- **ReplaySubject**: Order history (show last 5 orders)
- **AsyncSubject**: Checkout completion (only care about final success/failure)

### Scenario 2: Real-time Chat App
- **BehaviorSubject**: Online status (users should know current status immediately)
- **ReplaySubject**: Message history (new users see last 50 messages)
- **AsyncSubject**: File upload progress (only care when 100% done)

### Scenario 3: Dashboard
- **BehaviorSubject**: Theme selection (new widgets use current theme)
- **ReplaySubject**: Dashboard events (audit log of recent actions)
- **AsyncSubject**: API call completion (process data only when all calls done)

---

## Key Takeaways

### When to Choose Which Subject

**Use BehaviorSubject when:**
- Your data has a "current" or "default" state
- New subscribers MUST know the current value immediately
- Examples: auth state, theme, user profile

**Use ReplaySubject when:**
- You need to maintain a history of values
- New subscribers should see recent past values before new ones
- Examples: chat messages, event logs, command history

**Use AsyncSubject when:**
- You only care about the final result
- You must call `.complete()` to trigger emission
- Intermediate values are irrelevant
- Examples: HTTP responses, downloads, form submissions

---

## Run the Examples

```bash
# Run JavaScript examples
node advanced-subjects.js
node examples/subject-memory-example.js

# Run TypeScript examples
npx ts-node advanced-subjects.ts
```

The examples demonstrate practical use cases for each Subject type!
