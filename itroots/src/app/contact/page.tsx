'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    CheckCircle
} from 'lucide-react';
import CustomSelect from '@/components/ui/CustomSelect/CustomSelect';
import { courses } from '@/data/courses';
import { ENDPOINTS } from '@/config/api';
import styles from './page.module.css';

const courseOptions = courses.map((course) => ({
    value: course.slug,
    label: course.shortTitle,
}));

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            course: formData.get('course'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch(ENDPOINTS.PUBLIC.CONTACT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                e.currentTarget.reset();
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Check if the server is running.');
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1>Contact Us</h1>
                        <p>Have questions? We&apos;d love to hear from you. Get in touch with our team.</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <motion.div
                            className={styles.contactInfo}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2>Get In Touch</h2>
                            <p>
                                Whether you have a question about our courses, placements, or anything else,
                                our team is ready to answer all your queries.
                            </p>

                            <div className={styles.infoItems}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <MapPin size={24} />
                                    </div>
                                    <div className={styles.infoText}>
                                        <h3>Visit Us</h3>
                                        <p>ITROOTS Pvt Ltd, Office No. 205 & 206, 2nd floor, Rainbow Plaza, Jangali Maharaj Road, opposite Modern High School, Deccan, Shivajinagar, Pune, Mh. 411005</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <Phone size={24} />
                                    </div>
                                    <div className={styles.infoText}>
                                        <h3>Call Us</h3>
                                        <p>+91 40 1234 5678</p>
                                        <p>+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <Mail size={24} />
                                    </div>
                                    <div className={styles.infoText}>
                                        <h3>Email Us</h3>
                                        <p>admissions@itroots.in</p>
                                        <p>career@itroots.in</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>
                                        <Clock size={24} />
                                    </div>
                                    <div className={styles.infoText}>
                                        <h3>Working Hours</h3>
                                        <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.socialInfo}>
                                <h3>Follow Us</h3>
                                <div className={styles.socialLinks}>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                        <Youtube size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className={styles.formWrapper}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {isSubmitted ? (
                                <div className={styles.successWrapper}>
                                    <CheckCircle size={60} color="#10b981" />
                                    <h2>Message Sent!</h2>
                                    <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                                    <button onClick={() => setIsSubmitted(false)} className={styles.submitBtn}>Send Another Message</button>
                                </div>
                            ) : (
                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <h2>Send us a Message</h2>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="name">Full Name *</label>
                                            <input type="text" id="name" name="name" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="email">Email Address *</label>
                                            <input type="email" id="email" name="email" required />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input type="tel" id="phone" name="phone" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Course Interested In</label>
                                            <CustomSelect
                                                options={courseOptions}
                                                name="course"
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" id="subject" name="subject" />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                        ></textarea>
                                    </div>

                                    <button type="submit" className={styles.submitBtn}>
                                        Send Message
                                        <ArrowRight size={20} />
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <section className={styles.mapSection}>
                <iframe
                    src="https://www.google.com/maps?q=Office+No.+205+206,+Rainbow+Plaza,+Jangali+Maharaj+Road,+opposite+Modern+High+School,+Deccan,+Shivajinagar,+Pune,+Maharashtra+411005&output=embed"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="ITRoots Location"
                ></iframe>
            </section>
        </>
    );
}
