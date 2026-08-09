// =====================================================
// RxJS Advanced Subjects: BehaviorSubject, ReplaySubject, AsyncSubject
// =====================================================

import { BehaviorSubject, ReplaySubject, AsyncSubject, Subject } from 'rxjs';

console.log('\n========== PART 1: BehaviorSubject ==========\n');

// =====================================================
// 1. BehaviorSubject
// =====================================================
//
// What is it?
// - A Subject that remembers and emits the latest value to NEW subscribers
// - REQUIRES an initial value
// - Great for: state management, current values
//
// Key Characteristics:
// - New subscribers get the MOST RECENT value immediately
// - Doesn't wait for the next .next() call
// - Always has a "current" value
//

console.log('--- Example 1: User Login Status ---');

const userLoggedIn = new BehaviorSubject<boolean>(false);

// Subscriber A subscribes - receives initial value immediately
userLoggedIn.subscribe(status => {
    console.log('Subscriber A - User logged in:', status);
});

// User logs in
userLoggedIn.next(true);

// Subscriber B subscribes - gets the LATEST value (true) immediately
// without waiting for the next .next() call
console.log('\nSubscriber B joins:');
userLoggedIn.subscribe(status => {
    console.log('Subscriber B - User logged in:', status);
});

// User logs out
userLoggedIn.next(false);

console.log('\n--- Example 2: Theme Selection (Practical) ---');

const currentTheme = new BehaviorSubject<string>('light');

// UI Component 1 subscribes
const uiComponent1 = currentTheme.subscribe(theme => {
    console.log(`[Header] Applying ${theme} theme`);
});

// UI Component 2 subscribes later - gets current theme immediately
const uiComponent2 = currentTheme.subscribe(theme => {
    console.log(`[Sidebar] Applying ${theme} theme`);
});

// User changes theme
currentTheme.next('dark');

// UI Component 3 subscribes - gets dark theme immediately
const uiComponent3 = currentTheme.subscribe(theme => {
    console.log(`[Footer] Applying ${theme} theme (late subscriber)`);
});

// Get current value without subscribing
console.log('\nCurrent theme value:', currentTheme.value);

console.log('\n========== PART 2: ReplaySubject ==========\n');

// =====================================================
// 2. ReplaySubject
// =====================================================
//
// What is it?
// - A Subject that REMEMBERS and REPLAYS a specific number of previous values
// - New subscribers receive all buffered values first, then new ones
// - DOES NOT require an initial value
// - Great for: event history, action replay, command patterns
//
// Key Characteristics:
// - Can buffer multiple past values (you specify the buffer size)
// - New subscribers get ALL buffered values immediately, in order
// - Then new values are emitted like a normal Subject
//

console.log('--- Example 1: Message History (Buffer Size = 2) ---');

// ReplaySubject with buffer size of 2
// Keeps the 2 most recent values
const messageHistory = new ReplaySubject<string>(2);

// Emit 5 messages
messageHistory.next('Message 1');
messageHistory.next('Message 2');
messageHistory.next('Message 3');
messageHistory.next('Message 4');
messageHistory.next('Message 5');

console.log('New subscriber joins:');
// New subscriber gets the LAST 2 messages (3 and 4) immediately
messageHistory.subscribe(msg => {
    console.log('Chat History:', msg);
});

// Then receives new messages in real-time
console.log('\nNew message arrives:');
messageHistory.next('Message 6');

console.log('\n--- Example 2: Recent Click Events (Buffer Size = 3) ---');

interface ClickEvent {
    time: string;
    x: number;
    y: number;
}

const clickEvents = new ReplaySubject<ClickEvent>(3);

// User clicks several times
clickEvents.next({ time: '10:00', x: 100, y: 200 });
clickEvents.next({ time: '10:05', x: 150, y: 250 });
clickEvents.next({ time: '10:10', x: 200, y: 300 });
clickEvents.next({ time: '10:15', x: 250, y: 350 });

console.log('Logger subscribes (gets last 3 clicks):');
clickEvents.subscribe(event => {
    console.log(`Click at (${event.x}, ${event.y}) at ${event.time}`);
});

console.log('\n--- Example 3: API Call Results (Time-based Replay) ---');

interface ApiResult {
    id: number;
    status: string;
    data?: string;
}

// ReplaySubject can also use time window instead of count
// ReplaySubject(bufferSize, windowTime)
// Keeps values emitted in the last 5000ms (5 seconds)
const apiResults = new ReplaySubject<ApiResult>(100, 5000);

apiResults.next({ id: 1, status: 'loading' });
apiResults.next({ id: 1, status: 'success', data: 'User data' });

console.log('New subscriber gets buffered results:');
apiResults.subscribe(result => {
    console.log('API Result:', result);
});

apiResults.next({ id: 2, status: 'pending' });

console.log('\n========== PART 3: AsyncSubject ==========\n');

// =====================================================
// 3. AsyncSubject
// =====================================================
//
// What is it?
// - A Subject that ONLY emits the LAST value when it COMPLETES
// - Does NOT emit values as they arrive
// - Must call .complete() to trigger emission
// - Great for: final results, operation completion, promises
//
// Key Characteristics:
// - Subscribers receive NO values until .complete() is called
// - When complete() is called, ALL subscribers get the LAST value
// - Perfect for wrapping promises or final results
// - Useful for "race conditions" where only final result matters
//

console.log('--- Example 1: Download Progress (Only emit final result) ---');

const downloadProgress = new AsyncSubject<number>();

// Emit progress percentages
downloadProgress.next(10);
downloadProgress.next(20);
downloadProgress.next(30);
downloadProgress.next(50);
downloadProgress.next(75);
downloadProgress.next(100); // Last value

console.log('Subscriber A subscribes:');
downloadProgress.subscribe(
    value => console.log('Download Progress:', value + '%'),
    error => console.log('Error:', error),
    () => console.log('Download Complete!')
);

console.log('Subscriber B subscribes:');
downloadProgress.subscribe(
    value => console.log('Subscriber B - Final Progress:', value + '%'),
    error => console.log('Error:', error),
    () => console.log('Subscriber B - Complete!')
);

// Complete the subject - NOW it emits the last value
console.log('\nCompleting...');
downloadProgress.complete();

console.log('\n--- Example 2: HTTP Request Result ---');

interface HttpResponse {
    status: number | string;
    data?: string;
}

const httpRequest = new AsyncSubject<HttpResponse>();

console.log('Making HTTP request...');

// Simulate HTTP request responses
setTimeout(() => {
    httpRequest.next({ status: 'fetching' });
    console.log('(Internal) Fetching...');
}, 1000);

setTimeout(() => {
    httpRequest.next({ status: 'processing' });
    console.log('(Internal) Processing...');
}, 2000);

setTimeout(() => {
    httpRequest.next({ status: 200, data: 'User found' });
    console.log('(Internal) Success');
}, 3000);

setTimeout(() => {
    httpRequest.complete();
}, 3000);

httpRequest.subscribe(
    result => console.log('HTTP Result received:', result),
    error => console.log('HTTP Error:', error),
    () => console.log('HTTP request completed!')
);

console.log('\n--- Example 3: Form Submission (Async like Promise) ---');

interface FormResult {
    step?: string;
    success?: boolean;
    userId?: number;
}

const formSubmission = new AsyncSubject<FormResult>();

console.log('Form validation steps:');
formSubmission.next({ step: 'validating email' });
formSubmission.next({ step: 'checking database' });
formSubmission.next({ step: 'encrypting password' });
formSubmission.next({ step: 'done', success: true, userId: 42 });

formSubmission.subscribe(
    result => console.log('Form submitted successfully:', result),
    error => console.log('Form submission failed:', error),
    () => console.log('Form complete!')
);

formSubmission.complete();

console.log('\n========== PART 4: Comparison ==========\n');

console.log('COMPARISON TABLE:');
console.log('');
console.log('Subject:');
console.log('  - No initial value');
console.log('  - Subscribers get values AFTER subscription');
console.log('  - No buffering');
console.log('  - Use for: event broadcasting');
console.log('');
console.log('BehaviorSubject:');
console.log('  - REQUIRES initial value');
console.log('  - Subscribers get LATEST value immediately');
console.log('  - Always has current value');
console.log('  - Use for: state management');
console.log('');
console.log('ReplaySubject:');
console.log('  - No initial value');
console.log('  - Subscribers get BUFFERED past values, then new ones');
console.log('  - Buffer size configurable');
console.log('  - Use for: event history, logs');
console.log('');
console.log('AsyncSubject:');
console.log('  - No initial value');
console.log('  - Subscribers only get LAST value on complete()');
console.log('  - Must call complete()');
console.log('  - Use for: final results, promise-like behavior');

console.log('\n========== PART 5: Practical Use Case ==========\n');

// Real-world: Authentication state management
console.log('--- Real-world: Authentication System ---\n');

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
}

interface AuthEvent {
    timestamp: number;
    event: string;
    username?: string;
}

// Use BehaviorSubject for auth state (has initial value: not authenticated)
const authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
});

// Use ReplaySubject to track auth events
const authEvents = new ReplaySubject<AuthEvent>(10); // Keep last 10 events

// Simulate login flow
console.log('1. User attempts login...');
authEvents.next({ timestamp: Date.now(), event: 'login_attempt', username: 'john' });

setTimeout(() => {
    console.log('2. Credentials verified');
    authEvents.next({ timestamp: Date.now(), event: 'credentials_verified' });
    
    authState.next({
        isAuthenticated: true,
        user: 'john',
        token: 'abc123def456'
    });
}, 500);

setTimeout(() => {
    console.log('3. New component subscribes to auth state (gets current state immediately):');
    authState.subscribe(state => {
        console.log('   - Auth state:', state);
    });
}, 1000);

setTimeout(() => {
    console.log('4. Analytics subscribes to event history (gets last events):');
    authEvents.subscribe(event => {
        console.log('   - Event log:', event.event);
    });
}, 1500);
