import { StyleSheet } from "react-native"; 

export const GamesMenu= StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    gamesPage:{
        width: '100%',
        flex: 1,   
    },
    gamesHeader:{
        paddingTop: 26,
        paddingHorizontal: 20,
        paddingBottom: 32,
        zIndex: 40,
    },
    titleHeader: {
        fontSize: 22, 
        fontWeight: '700',
        color: 'hsl(222, 47%, 11%)',
    },
    textHeader: {
        fontSize: 14, 
        fontWeight: 'bold',
        color: 'hsl(215, 16%, 47%)',
        marginBottom: 2, 
    },
    container: {
        gap: 20,
        paddingHorizontal: 20, 
        width: '100%'
    }, 
    textGames: {
        fontSize: 15, 
        fontWeight: '600',
        color: 'hsl(222, 47%, 11%)',
    },
    gamesGrid:{
        flexDirection: 'row',
        flexWrap: 'wrap', 
        gap: 20, 
    },
})