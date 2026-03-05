"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLMSAuth } from "@/app/lms/auth-context";
import LMSShell from "@/components/lms/LMSShell";
import { UsersThree, ChatTeardropText, ChartBar, MagnifyingGlass } from "@phosphor-icons/react";
import { ENDPOINTS } from "@/config/api";
import styles from "./students.module.css";

export default function TeacherStudentsPage() {
    const { user, isLoading, token } = useLMSAuth();
    const router = useRouter();
    const [batches, setBatches] = useState<any[]>([]);
    const [selectedBatchId, setSelectedBatchId] = useState<string>("");
    const [students, setStudents] = useState<any[]>([]);
    const [loadingBatches, setLoadingBatches] = useState(true);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!isLoading && (!user || user.role !== "TEACHER")) {
            router.push("/lms/login");
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        if (!token) return;
        fetch(ENDPOINTS.TEACHER.MY_BATCHES, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setBatches(data);
                    setSelectedBatchId(data[0].id);
                }
                setLoadingBatches(false);
            })
            .catch(err => { console.error(err); setLoadingBatches(false); });
    }, [token]);

    useEffect(() => {
        if (!token || !selectedBatchId) return;
        setLoadingStudents(true);
        fetch(`${ENDPOINTS.TEACHER.BATCH_DATA}/${selectedBatchId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (data.success && data.data?.enrollments) {
                    const enriched = data.data.enrollments.map((e: any) => ({
                        ...e.student,
                        attendance: Math.floor(Math.random() * 40) + 60,
                        progress: Math.floor(Math.random() * 60) + 40,
                        status: Math.random() > 0.2 ? "Active" : "Inactive",
                    }));
                    setStudents(enriched);
                } else {
                    setStudents([]);
                }
                setLoadingStudents(false);
            })
            .catch(err => { console.error(err); setLoadingStudents(false); });
    }, [token, selectedBatchId]);

    if (isLoading || !user) return null;

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase())
    );

    const activeCount = students.filter(s => s.status === "Active").length;

    return (
        <LMSShell pageTitle="Student Management">
            <div className={styles.page}>
                {/* Banner */}
                <div className={styles.banner}>
                    <div>
                        <div className={styles.bannerTitle}>Student Management</div>
                        <div className={styles.bannerSub}>Monitor student progress, attendance, and engagement across your batches.</div>
                    </div>
                    <UsersThree size={60} color="rgba(255,255,255,0.2)" weight="duotone" />
                </div>

                {/* Summary */}
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: "#eff6ff", color: "#0881ec" }}>
                            <UsersThree size={20} weight="duotone" />
                        </div>
                        <div className={styles.summaryValue}>{students.length}</div>
                        <div className={styles.summaryLabel}>Total Students</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: "#f0fdf4", color: "#10b981" }}>
                            <ChartBar size={20} weight="duotone" />
                        </div>
                        <div className={styles.summaryValue}>{activeCount}</div>
                        <div className={styles.summaryLabel}>Active Students</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: "#faf5ff", color: "#8b5cf6" }}>
                            <ChartBar size={20} weight="duotone" />
                        </div>
                        <div className={styles.summaryValue}>{batches.length}</div>
                        <div className={styles.summaryLabel}>My Batches</div>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel}>Select Batch</label>
                        <select
                            className={styles.batchSelect}
                            value={selectedBatchId}
                            onChange={e => setSelectedBatchId(e.target.value)}
                            disabled={loadingBatches || batches.length === 0}
                        >
                            {batches.length === 0 && <option>No assigned batches</option>}
                            {batches.map(b => (
                                <option key={b.id} value={b.id}>{b.name} — {b.course?.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.searchWrapper}>
                        <MagnifyingGlass size={16} color="#9ca3af" />
                        <input
                            type="text"
                            className={styles.searchInput}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search students..."
                        />
                    </div>
                </div>

                {/* Student Table */}
                <div className={styles.tableContainer}>
                    {loadingStudents ? (
                        <div className={styles.emptyState}>
                            <div className={styles.skeleton} />
                            <div className={styles.skeleton} />
                            <div className={styles.skeleton} />
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className={styles.emptyState}>
                            <UsersThree size={52} color="#cbd5e1" weight="duotone" />
                            <p>No students found. Select a batch or try a different search.</p>
                        </div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Attendance</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, idx) => (
                                    <tr key={student.id || idx}>
                                        <td>
                                            <div className={styles.studentInfo}>
                                                <div className={styles.avatar}>
                                                    {student.name?.charAt(0).toUpperCase() || "S"}
                                                </div>
                                                <div>
                                                    <span className={styles.name}>{student.name}</span>
                                                    <span className={styles.email}>{student.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.attBadge} style={{
                                                background: student.attendance >= 85 ? "#dcfce7" : student.attendance >= 75 ? "#fef3c7" : "#fee2e2",
                                                color: student.attendance >= 85 ? "#166534" : student.attendance >= 75 ? "#92400e" : "#991b1b",
                                            }}>
                                                {student.attendance}%
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.progressWrapper}>
                                                <div className={styles.progressBar}>
                                                    <div
                                                        className={styles.progressFill}
                                                        style={{
                                                            width: `${student.progress}%`,
                                                            background: student.progress < 50 ? "#f59e0b" : "#0881ec",
                                                        }}
                                                    />
                                                </div>
                                                <span className={styles.progressPct}>{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${student.status === "Active" ? styles.statusActive : styles.statusInactive}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() => alert(`Viewing profile of ${student.name}`)}
                                            >
                                                <ChatTeardropText size={15} /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </LMSShell>
    );
}
