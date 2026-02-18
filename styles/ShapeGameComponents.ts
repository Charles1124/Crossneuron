import { StyleSheet } from "react-native"

export const ShapeGameComponents = StyleSheet.create({
    //Estilos Timer 
    container: {
        borderRadius: 16, 
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    variantGame: {
        backgroundColor: '#fff',
    },
    variantRound: {
        backgroundColor: 'rgba(34, 131, 196, 0.1)',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 8,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    time: {
        fontSize: 26,
        fontWeight: 'bold',
        fontVariant: ['tabular-nums'],
    },
    unit: {
        fontSize: 18,
        color: '#6B7280',
    },
    progressBar: {
        marginTop: 12,
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 9999,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 9999,
    },

    //Score display. 
    scoreContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    scoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    scoreLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#1F2937',  // foreground
        fontVariant: ['tabular-nums'],
    },
})