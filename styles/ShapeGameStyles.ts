import { StyleSheet } from "react-native";

export const ShapeGameStyles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 20,
    },
    gameActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginBottom: 20,
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
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    statsBar: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    feedbackToast: {
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 12,
        zIndex: 100,
    },
    feedbackSuccess: {
        backgroundColor: '#10B981',
    },
    feedbackError: {
        backgroundColor: '#EF4444',
    },
    feedbackText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
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
    startScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: '#2283C4',
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 12,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    gameOver: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        minWidth: 280,
    },
    gameOverTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    gameOverScore: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#2283C4',
        marginBottom: 8,
    },
    gameOverLabel: {
        fontSize: 18,
        color: '#6B7280',
        marginBottom: 24,
    },
    restartButton: {
        backgroundColor: '#2283C4',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    restartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    playingArea: {
        flex: 1,
        gap: 15,
    },
    choiceSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    shapesGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    shapeChoice: {
        width: '33.33%',
        alignItems: 'center',
        paddingVertical: 12,
    },
    targetSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
    },
    targetWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
})