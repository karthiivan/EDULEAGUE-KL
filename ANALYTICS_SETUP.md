# Analytics Setup Guide

## 📊 Overview

EduLeague now includes comprehensive analytics with:
- **Google Analytics 4** - User behavior tracking
- **Sentry** - Error monitoring and performance tracking
- **Custom Analytics Dashboard** - Real-time insights for teachers

---

## 🚀 Quick Setup

### 1. Google Analytics 4

#### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Fill in property details:
   - Property name: "EduLeague"
   - Time zone: India
   - Currency: INR
5. Click "Next" and complete setup

#### Step 2: Get Measurement ID
1. In Admin → Data Streams
2. Click "Add stream" → "Web"
3. Enter website URL: `http://localhost:3000` (for development)
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Step 3: Configure in EduLeague
Update `.env` file:
```env
REACT_APP_GA_ID=G-XXXXXXXXXX
```

**That's it!** Google Analytics is now tracking:
- Page views
- User demographics
- Problem solving activity
- Quiz completions
- Room interactions
- And much more!

---

### 2. Sentry Error Tracking

#### Step 1: Create Sentry Account
1. Go to [Sentry.io](https://sentry.io/)
2. Sign up for free account
3. Create new project:
   - Platform: React
   - Project name: "eduleague-frontend"

#### Step 2: Get DSN
1. After creating project, copy the **DSN** (Data Source Name)
2. Format: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

#### Step 3: Configure in EduLeague
Update `.env` file:
```env
REACT_APP_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Sentry will now track:**
- JavaScript errors
- API failures
- Performance issues
- User sessions with errors
- Stack traces

---

## 📈 What's Being Tracked

### Automatic Tracking

#### Page Views
Every page navigation is automatically tracked with:
- Page path
- User role (student/teacher)
- Timestamp

#### User Demographics
When users log in, we track:
- User role
- Year and branch
- XP level
- Current streak

### Custom Events

#### Authentication
- `Login` - Method (email/OAuth)
- `Register` - Role (student/teacher)
- `Logout`

#### Problem Solving
- `View Problem` - Difficulty level
- `Submit Solution` - Status (accepted/wrong)
- `Problem Solved` - Difficulty and XP earned

#### Rooms
- `Create Room` - Room type
- `Join Room`
- `Leave Room`

#### Learning
- `Start Quiz` - Track ID
- `Complete Quiz` - Score
- `View Track` - Track name

#### Projects
- `Create Project` - Category
- `Join Project`

#### Mentorship
- `View Mentor Profile`
- `Schedule Session`

#### Resume
- `Generate Resume` - Template ID
- `Download Resume` - Format
- `ATS Check` - Score

#### Gamification
- `XP Earned` - Amount and source
- `Badge Earned` - Badge ID
- `Streak Update` - Days

#### UI Interactions
- `Dark Mode Toggle`
- `Search Performed`
- `Filter Applied`

---

## 🎯 Analytics Dashboard

### For Teachers Only

Access at: `/analytics`

**Features:**
- 📊 Key metrics overview
- 📈 Daily active users chart
- 🥧 Problem difficulty distribution
- 📊 Branch-wise performance
- 📈 Engagement trends
- 🏆 Top 10 performers
- 📥 Export analytics data

**Metrics Tracked:**
- Total users
- Active users (with streak)
- Total problems
- Total submissions
- Average XP
- Average streak

---

## 🔧 Advanced Configuration

### Custom Event Tracking

To track custom events in your code:

```javascript
import { trackEvent, trackUserAction } from '../utils/analytics';

// Simple event
trackEvent('Category', 'Action', 'Label', value);

// Pre-defined user actions
trackUserAction.problemSolved('prob123', 'Medium');
trackUserAction.xpEarned(25, 'Problem Solved');
trackUserAction.badgeEarned('badge_ninja');
```

### Error Tracking

```javascript
import { captureException, captureMessage } from '../utils/sentry';

try {
  // Your code
} catch (error) {
  captureException(error, {
    extra: {
      problemId: 'prob123',
      userId: currentUser.id
    }
  });
}

// Log important messages
captureMessage('User completed onboarding', 'info');
```

### Performance Monitoring

```javascript
import { startTransaction } from '../utils/sentry';

const transaction = startTransaction('Problem Submission', 'http');
// Your code
transaction.finish();
```

---

## 📊 Viewing Analytics

### Google Analytics Dashboard

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select "EduLeague" property
3. View reports:
   - **Realtime** - Live user activity
   - **Reports** → **Engagement** - Page views, events
   - **Reports** → **User Attributes** - Demographics
   - **Explore** - Custom reports

### Sentry Dashboard

1. Go to [Sentry.io](https://sentry.io/)
2. Select "eduleague-frontend" project
3. View:
   - **Issues** - Errors and exceptions
   - **Performance** - Transaction times
   - **Releases** - Version tracking
   - **User Feedback** - Session replays

### In-App Analytics (Teachers)

1. Login as teacher
2. Navigate to `/analytics`
3. View real-time dashboard
4. Export data as JSON

---

## 🎨 Custom Analytics Dashboard

The teacher analytics dashboard shows:

### Charts
1. **Daily Activity** - Area chart of users and submissions
2. **Problem Distribution** - Pie chart of difficulty levels
3. **Branch Performance** - Bar chart comparing branches
4. **Engagement Trends** - Line chart of weekly activity

### Tables
- **Top 10 Performers** - Leaderboard with XP, problems, streak

### Filters
- Time range selector (24h, 7d, 30d, 90d)
- Refresh button
- Export to JSON

---

## 🔒 Privacy & GDPR Compliance

### Data Collection
- We collect anonymized usage data
- No personally identifiable information (PII) in events
- User IDs are hashed

### User Control
- Users can opt-out of analytics
- Data retention: 26 months (GA4 default)
- Right to deletion available

### Security
- All data transmitted over HTTPS
- Sentry filters sensitive data automatically
- No passwords or tokens logged

---

## 🐛 Troubleshooting

### Analytics Not Working

**Check 1: Environment Variables**
```bash
# Make sure .env has:
REACT_APP_GA_ID=G-XXXXXXXXXX
REACT_APP_SENTRY_DSN=https://...
```

**Check 2: Browser Console**
Look for initialization messages:
```
✅ Google Analytics initialized
✅ Sentry initialized
```

**Check 3: Ad Blockers**
Disable ad blockers that might block analytics

**Check 4: Development Mode**
Sentry doesn't send events in development by default

### Events Not Showing

**Check 1: Real-time Reports**
GA4 real-time reports show events within seconds

**Check 2: Debug Mode**
Enable GA4 debug mode:
```javascript
// In analytics.js
ReactGA.initialize(GA_ID, {
  gaOptions: {
    debug_mode: true
  }
});
```

**Check 3: Event Names**
Ensure event names follow GA4 naming conventions

---

## 📚 Resources

### Documentation
- [Google Analytics 4 Docs](https://developers.google.com/analytics/devguides/collection/ga4)
- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [React GA4 Library](https://github.com/codler/react-ga4)

### Tutorials
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Sentry Error Tracking](https://docs.sentry.io/product/issues/)
- [Custom Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)

---

## 🎯 Best Practices

### Event Naming
- Use clear, descriptive names
- Follow consistent naming convention
- Group related events by category

### Performance
- Don't track too frequently (rate limiting)
- Batch events when possible
- Use sampling for high-volume events

### Privacy
- Never track PII (passwords, emails, etc.)
- Anonymize user IDs
- Respect user privacy preferences

### Testing
- Test events in development
- Verify in GA4 real-time reports
- Check Sentry for errors

---

## 🚀 Next Steps

1. ✅ Set up Google Analytics 4
2. ✅ Configure Sentry error tracking
3. ✅ Test analytics in development
4. ✅ View analytics dashboard
5. ✅ Monitor user behavior
6. ✅ Track errors and fix issues
7. ✅ Optimize based on insights

---

**Analytics is now fully integrated! 📊**

Start tracking user behavior and improving EduLeague based on real data!
