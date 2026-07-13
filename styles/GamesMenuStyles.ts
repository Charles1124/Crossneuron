import { StyleSheet } from "react-native";

export const GamesMenu = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    gamesHeader: {
        paddingTop: 32,
        paddingHorizontal: 20,
        paddingBottom: 28,
    },
    titleHeader: {
        fontSize: 30,
        fontWeight: '800',
        color: 'hsl(222, 47%, 11%)',
        marginBottom: 6,
    },
    textHeader: {
        fontSize: 15,
        fontWeight: '500',
        color: 'hsl(215, 16%, 47%)',
    },
    gamesGrid: {
        paddingHorizontal: 20,
        gap: 20,
    },
    gameCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 5,
    },
    gameCardBanner: {
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    gameCardBannerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    gameCardBody: {
        paddingHorizontal: 18,
        paddingVertical: 14, 
    },
    gameCardDesc: {
        fontSize: 13,
        color: 'hsl(215, 16%, 47%)',
        lineHeight: 20,
        marginBottom: 10, 
        fontWeight: '500',
    },
    gameCardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
    },
    gameCardAction: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
    },

    // Estilos legacy (conservados por si se usan en otro lugar)
    gamesPage: {
        width: '100%',
        flex: 1,
    },
    container: {
        gap: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    textGames: {
        fontSize: 15,
        fontWeight: '600',
        color: 'hsl(222, 47%, 11%)',
    },
});
