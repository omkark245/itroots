'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Target,
    Eye,
    Users,
    Award,
    Building,
    Calendar,
    ArrowRight,
    CheckCircle
} from 'lucide-react';
import styles from './page.module.css';

const milestones = [
    { year: '2015', title: 'Founded', description: 'ITROOTS was established with a vision to bridge the IT skills gap' },
    { year: '2017', title: 'First 1000 Students', description: 'Reached milestone of training 1000+ students' },
    { year: '2019', title: '50+ Hiring Partners', description: 'Built strong industry partnerships for placements' },
    { year: '2021', title: 'Online Expansion', description: 'Launched hybrid learning programs during pandemic' },
    { year: '2023', title: '5000+ Placements', description: 'Achieved 5000+ successful career transformations' },
    { year: '2024', title: 'AI Integration', description: 'Introduced cutting-edge AI and GenAI programs' }
];

const values = [
    { icon: <Target size={28} />, title: 'Excellence', description: 'We strive for excellence in every aspect of our training programs.' },
    { icon: <Users size={28} />, title: 'Student-Centric', description: 'Our students success is our primary measure of achievement.' },
    { icon: <Award size={28} />, title: 'Industry-Aligned', description: 'Curriculum designed with direct input from industry experts.' },
    { icon: <CheckCircle size={28} />, title: 'Integrity', description: 'We maintain transparency and honesty in all our operations.' }
];

const team = [
    { name: 'Rahul Naik', role: 'Founder & CEO', description: '20+ years in IT education and consulting' },
    { name: 'Priya Naik', role: 'Director of Training', description: 'Former Google engineer, AI specialist' },
    { name: 'Vaibhav Patil', role: 'Head of Placements', description: 'Extensive network in Fortune 500 companies' },
    { name: 'Dhiraj Patil', role: 'Academic Director', description: 'PhD in Computer Science, IIT Hyderabad' }
];

export default function AboutPage() {
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
                        <h1>About ITROOTS</h1>
                        <p>Empowering careers through quality IT education since 2015</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={styles.missionSection}>
                <div className={styles.container}>
                    <div className={styles.missionGrid}>
                        <motion.div
                            className={styles.missionCard}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.missionIcon}>
                                <Target size={32} />
                            </div>
                            <h2>Our Mission</h2>
                            <p>
                                To transform aspiring professionals into industry-ready tech talent through
                                comprehensive training, hands-on experience, and dedicated placement support.
                                We believe everyone deserves access to quality IT education that leads to
                                meaningful career opportunities.
                            </p>
                        </motion.div>
                        <motion.div
                            className={styles.missionCard}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className={styles.missionIcon}>
                                <Eye size={32} />
                            </div>
                            <h2>Our Vision</h2>
                            <p>
                                To be the most trusted IT training institute in India, known for producing
                                job-ready professionals who excel in their careers. We aim to bridge the
                                gap between academic knowledge and industry requirements, creating a
                                skilled workforce for the digital future.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Our Core Values</h2>
                        <p>The principles that guide everything we do</p>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className={styles.valueCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className={styles.valueIcon}>{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className={styles.timelineSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Our Journey</h2>
                        <p>Major milestones in our growth story</p>
                    </div>
                    <div className={styles.timeline}>
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className={styles.timelineItem}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className={styles.timelineYear}>{milestone.year}</div>
                                <div className={styles.timelineContent}>
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className={styles.teamSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2>Leadership Team</h2>
                        <p>Meet the people driving our mission</p>
                    </div>
                    <div className={styles.teamGrid}>
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className={styles.teamCard}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className={styles.teamAvatar}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3>{member.name}</h3>
                                <span className={styles.teamRole}>{member.role}</span>
                                <p>{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
}
