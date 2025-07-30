export function getUserStats() {
    const stats = localStorage.getItem("userStats");
    return stats ? JSON.parse(stats) : null;
}
