const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send email
const sendEmail = async (to, subject, html) => {
  try {
    if (process.env.ENABLE_EMAIL_NOTIFICATIONS !== 'true') {
      console.log('Email notifications disabled');
      return { success: false, message: 'Email notifications disabled' };
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Welcome email
exports.sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to EduLeague!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #667eea;">Welcome to EduLeague, ${user.name}!</h1>
      <p>Thank you for joining KL University's premier learning platform.</p>
      <p>Get started by:</p>
      <ul>
        <li>Solving coding problems</li>
        <li>Joining study rooms</li>
        <li>Connecting with mentors</li>
        <li>Building your profile</li>
      </ul>
      <a href="${process.env.FRONTEND_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
        Go to Dashboard
      </a>
      <p style="margin-top: 30px; color: #666;">Happy Learning!<br>The EduLeague Team</p>
    </div>
  `;
  
  return await sendEmail(user.email, subject, html);
};

// Problem solved notification
exports.sendProblemSolvedEmail = async (user, problem) => {
  const subject = `Congratulations! You solved "${problem.title}"`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10b981;">🎉 Problem Solved!</h1>
      <p>Great job, ${user.name}!</p>
      <p>You successfully solved <strong>${problem.title}</strong> (${problem.difficulty})</p>
      <p>You earned <strong>${problem.xpReward} XP</strong></p>
      <p>Your total XP: <strong>${user.xp}</strong></p>
      <a href="${process.env.FRONTEND_URL}/coding-practice" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
        Solve More Problems
      </a>
    </div>
  `;
  
  return await sendEmail(user.email, subject, html);
};

// Badge earned notification
exports.sendBadgeEarnedEmail = async (user, badge) => {
  const subject = `New Badge Earned: ${badge.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #f59e0b;">🏆 Badge Earned!</h1>
      <p>Congratulations, ${user.name}!</p>
      <div style="text-align: center; font-size: 48px; margin: 20px 0;">${badge.icon}</div>
      <h2 style="text-align: center;">${badge.name}</h2>
      <p style="text-align: center; color: #666;">${badge.description}</p>
      <a href="${process.env.FRONTEND_URL}/profile" style="display: inline-block; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
        View Your Profile
      </a>
    </div>
  `;
  
  return await sendEmail(user.email, subject, html);
};

// Streak reminder
exports.sendStreakReminderEmail = async (user) => {
  const subject = `Don't break your ${user.streak}-day streak!`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ef4444;">🔥 Streak Alert!</h1>
      <p>Hi ${user.name},</p>
      <p>You have a <strong>${user.streak}-day coding streak</strong>!</p>
      <p>Don't let it break - solve at least one problem today to keep it going.</p>
      <a href="${process.env.FRONTEND_URL}/coding-practice" style="display: inline-block; padding: 12px 24px; background: #ef4444; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
        Solve a Problem Now
      </a>
    </div>
  `;
  
  return await sendEmail(user.email, subject, html);
};

// Password reset email
exports.sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = 'Password Reset Request';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Password Reset</h1>
      <p>Hi ${user.name},</p>
      <p>You requested to reset your password. Click the button below to reset it:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
        Reset Password
      </a>
      <p style="margin-top: 20px; color: #666;">This link will expire in 1 hour.</p>
      <p style="color: #666;">If you didn't request this, please ignore this email.</p>
    </div>
  `;
  
  return await sendEmail(user.email, subject, html);
};

// Mentorship session reminder
exports.sendMentorshipReminderEmail = async (user, session) => {
  const subject = `Upcoming Mentorship Session`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #667eea;">📅 Session Reminder</h1>
      <p>Hi ${user.name},</p>
      <p>You have an upcoming mentorship session:</p>
      <ul>
        <li><strong>Topic:</strong> ${session.topic}</li>
        <li><strong>Date:</strong> ${new Date(session.date).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${session.time}</li>
      </ul>
      <a href="${process.env.FRONTEND_URL}/peer-learning" style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">
        View Details
      </a>
    </div>
  `;
  
  return await sendEmail(user.email, subject, html);
};

module.exports = exports;
