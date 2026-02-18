import { StyleSheet } from "react-native"


export const BallPatternComponents = StyleSheet.create({

    //Estilos para las pelotas. 

    ball: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    random: {
        backgroundColor: '#4F46E5'
    },
    ballPattern: {
        backgroundColor: '#E11D48',
    },

    //Estilos GameArena
    arena: {
        width: '100%',
        height: 400,
        backgroundColor: '#c7c4c4',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    grid: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.05,
    },

    //Estilos fases de juego 

    gameControls: {
        padding: 16,
        alignItems: 'center',
        gap: 12,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        gap: 8,
    },
    buttonStart: {
        backgroundColor: "#7c3aed",
    },
    buttonCheck: {
        backgroundColor: "#059669",
        marginTop: 12,
    },
    buttonReset: {
        backgroundColor: "#7c3aed",
        marginTop: 12,
    },
    buttonDisabled: {
        backgroundColor: "#374151",
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    buttonIcon: {
        marginRight: 4,
    },

    observing: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(167,139,250,0.1)",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(167,139,250,0.3)",
    },
    observingText: {
        color: "#a78bfa",
        fontSize: 16,
        fontWeight: "500",
    },
    selectingPhase: {
        alignItems: "center",
        width: "100%",
    },
    selectingQuestion: {
        color: "#e5e7eb",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    patternOptions: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "center",
    },
    patternOption: {
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#374151",
        backgroundColor: "#ffffff",
        gap: 8,
        minWidth: 90,
    },
    patternOptionSelected: {
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167,139,250,0.15)",
    },
    patternLabel: {
        color: "#6b7280",
        fontSize: 13,
        fontWeight: "500",
    },
    patternLabelSelected: {
        color: "#a78bfa",
    },

    result: {
        alignItems: "center",
        gap: 12,
    },
    resultMessage: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        borderWidth: 1,
    },
    resultCorrect: {
        backgroundColor: "rgba(5, 150, 104, 0.62)",
        borderColor: "#059669",
    },
    resultIncorrect: {
        backgroundColor: "rgba(220, 38, 38, 0.52)",
        borderColor: "#dc2626",
    },
    resultText: {
        color: "#ccc",
        fontSize: 20,
        fontWeight: "700",
    }, 

    //Estilos para el indicador del patrón 
    patternIndicator: {
        backgroundColor: ' hsla(0, 0%, 100%, 0.8)',
        padding: 8, 
        paddingHorizontal: 16, 
        borderRadius: 13, 
        alignItems: 'center', 
        gap: 8, 
    }, 
    textIndicator: {
        fontSize: 14, 
        fontWeight: '500', 
        color: 'hsl(215, 16%, 47%)',
    },
})