import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Initialize Sentry
export const initSentry = () => {
  const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
  
  if (SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [
        new BrowserTracing(),
        new Sentry.Replay({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
      
      // Session Replay
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      
      // Environment
      environment: process.env.NODE_ENV || 'development',
      
      // Release tracking
      release: `eduleague@${process.env.REACT_APP_VERSION || '1.0.0'}`,
      
      // Before send hook - filter sensitive data
      beforeSend(event, hint) {
        // Don't send events in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Sentry Event (not sent in dev):', event);
          return null;
        }
        
        // Filter out sensitive data
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers;
        }
        
        return event;
      },
    });
    
    console.log('✅ Sentry initialized');
  }
};

// Set user context
export const setSentryUser = (user) => {
  if (user) {
    Sentry.setUser({
      id: user._id,
      email: user.email,
      username: user.name,
      role: user.role,
      year: user.year,
      branch: user.branch
    });
  } else {
    Sentry.setUser(null);
  }
};

// Set custom context
export const setSentryContext = (key, data) => {
  Sentry.setContext(key, data);
};

// Capture exception
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    contexts: context
  });
};

// Capture message
export const captureMessage = (message, level = 'info') => {
  Sentry.captureMessage(message, level);
};

// Add breadcrumb
export const addBreadcrumb = (category, message, data = {}) => {
  Sentry.addBreadcrumb({
    category,
    message,
    data,
    level: 'info'
  });
};

// Performance monitoring
export const startTransaction = (name, op) => {
  return Sentry.startTransaction({
    name,
    op
  });
};

// Custom error boundary
export const ErrorBoundary = Sentry.ErrorBoundary;

// Profiler for performance tracking
export const Profiler = Sentry.Profiler;
