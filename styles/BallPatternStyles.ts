import { StyleSheet } from "react-native"

export const BallPatternStyles = StyleSheet.create({
    gameActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginBottom: 20, 
        paddingHorizontal: 16,
        paddingTop: 8, 
    },
    actionButton: {
        backgroundColor: '#c4c4c4',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    settingButton: {
        backgroundColor: '#000',
    },
    leaveButton: {
        backgroundColor: '#EF4444',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },
    titleText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 7,
    },
    textSubtitle: {
        color: "#6b7280",
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    scorePanel: {
        backgroundColor: "rgba(255,255,255,0.05)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },
    scoreLabel: {
        color: "#6b7280",
        fontSize: 16,
        fontWeight: '500',
    },
    scoreValue: {
        color: "#817e7e",
        fontWeight: "700",
        paddingHorizontal: 38,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        gap: 20,
    },
    scrollView: {
        flex: 1
    },
    instructions: {
        alignItems: 'center',
        gap: 8,
    },
    centered: {
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pauseCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        minWidth: 280,
    },
    settingsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        minWidth: 300,
        maxWidth: 400,
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
        justifyContent: 'center',
    },
    pauseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    settingsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '50%',
        borderWidth: 2,
        borderRadius: 8,
        padding: 12,
        borderColor: '#ccc ',
    },
    settingsLabel: {
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.8,
    },
    resumeButton: {
        backgroundColor: '#2283C4',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    resumeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})