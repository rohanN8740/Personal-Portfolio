"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const directEmail = 'rohann.developer@gmail.com';

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(directEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
    if (!formData.message.trim()) errs.message = 'Please enter your message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrors({});

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '0e99d951-1e56-418f-9911-fb8b9aa8e827';

    try {
      // Primary: Web3Forms Direct Client Submission (CORS enabled, native browser fetch)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Inquiry: ${formData.subject}`,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      // Fallback: Internal API Route
      const apiRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const apiData = await apiRes.json();

      if (apiRes.ok && apiData.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrors({ submit: apiData.message || data.message || 'Failed to send message. Please try again or email directly.' });
        setStatus('idle');
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your internet connection or email directly.' });
      setStatus('idle');
    }
  };

  return (
    <div className="ambient-glow-wrapper">
      <div className="ambient-glow-bg"></div>
      <div className="contact-glass-card">
        {/* Top Header Status & Utility Bar */}
        <div className="glass-card-header">
          <div className="status-badge">
            <span className="status-dot-pulse"></span>
            <span>Open for New Inquiries</span>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className={`copy-email-chip ${copied ? 'copied' : ''}`}
            title="Copy email to clipboard"
            aria-label="Copy email to clipboard"
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>{directEmail}</span>
              </>
            )}
          </button>
        </div>

        {status === 'success' ? (
          <div className="contact-success-glass">
            <div className="success-pulse-circle">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I've received your message and will respond within 24 hours.</p>
            <button
              type="button"
              className="reset-glass-btn"
              onClick={() => setStatus('idle')}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="glass-form-body">
            {errors.submit && (
              <div className="submit-error-banner" style={{ color: '#ff6b6b', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)', fontSize: '0.85rem', marginBottom: '16px' }}>
                ⚠️ {errors.submit}
              </div>
            )}
            {/* 2 Column Row: Name & Email */}
            <div className="form-grid-2col">
              <div className="glass-field-group">
                <div className="field-header">
                  <span className="step-tag">01</span>
                  <label htmlFor="contact-name">YOUR NAME</label>
                </div>
                <div className={`glass-input-wrapper ${errors.name ? 'has-error' : ''}`}>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="John Doe / Company"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                {errors.name && <span className="field-error-mono">{errors.name}</span>}
              </div>

              <div className="glass-field-group">
                <div className="field-header">
                  <span className="step-tag">02</span>
                  <label htmlFor="contact-email">EMAIL ADDRESS</label>
                </div>
                <div className={`glass-input-wrapper ${errors.email ? 'has-error' : ''}`}>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                {errors.email && <span className="field-error-mono">{errors.email}</span>}
              </div>
            </div>

            {/* Subject Field */}
            <div className="glass-field-group">
              <div className="field-header">
                <span className="step-tag">03</span>
                <label htmlFor="contact-subject">SUBJECT</label>
              </div>
              <div className={`glass-input-wrapper ${errors.subject ? 'has-error' : ''}`}>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="Web App Project Inquiry / Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              {errors.subject && <span className="field-error-mono">{errors.subject}</span>}
            </div>

            {/* Message Area */}
            <div className="glass-field-group">
              <div className="field-header">
                <span className="step-tag">04</span>
                <label htmlFor="contact-message">YOUR MESSAGE</label>
                <span className="char-count">{formData.message.length} / 500</span>
              </div>
              <div className={`glass-input-wrapper ${errors.message ? 'has-error' : ''}`}>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Tell me a bit about your project, ideas, or what you'd like to build..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              {errors.message && <span className="field-error-mono">{errors.message}</span>}
            </div>

            {/* Action Bar */}
            <div className="glass-form-footer">
              <div className="guarantee-badge">
                <span className="icon">⚡</span>
                <span>Replies within 24 hours</span>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="submit-glow-btn"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="btn-spinner"></span>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
