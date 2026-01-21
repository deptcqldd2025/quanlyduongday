// js/app.js
import { db } from './init-firebase.js';

export async function submitReport(reportData) {
    try {
        await db.collection("daily_reports").add(reportData);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getTodayHistory(userName) {
    const today = new Date().toLocaleDateString('vi-VN');
    return await db.collection("daily_reports")
                 .where("worker", "==", userName)
                 .where("date", "==", today)
                 .orderBy("timestamp", "desc").get();
}
