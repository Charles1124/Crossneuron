import { StyleSheet } from 'react-native'

export const stylesHome = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    homePage: { 
        width: '100%',  
        flex: 1,  
    },
    homeHeader: {
        paddingTop: 16,
        paddingHorizontal: 20,
        paddingBottom: 12,
        zIndex: 40,
    },
    textHeader: {
        fontSize: 14,
        color: 'hsl(215, 16%, 47%)',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: 'hsl(222, 47%, 11%)',
    },
    container: {
        gap: 20,
        paddingHorizontal: 20,
    },
    dailyGoal: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        //Sombra iOS
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,

        // sombra Android
        elevation: 3
    },
    dailyGoalHeader: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    textGoal: {
        fontSize: 15,
        fontWeight: '600',
        color: 'hsl(222, 47%, 11%)',
    },
    textProgression: {
        fontSize: 13,
        fontWeight: '500',
        color: 'hsl(222, 47%, 11%)',
    },
    dailyGoalBar: {
        width: '100%',
        backgroundColor: 'hsl(210, 40%, 96%)',
        borderRadius: 9999,
        height: 10,
        overflow: 'hidden',
    },
    dailyGoalFill: {
        height: '100%',
        borderRadius: 9999,
    },
    textP1: {
        fontSize: 12, 
        color: "hsl(215, 16%, 47%)", 
        marginTop: 8,
    },
    section: {
        alignItems: 'center', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    categories: {
        fontSize: 16, 
        fontWeight: '700', 
        color: ' hsl(222, 47%, 11%)',
    },
    seeAll: {
        fontSize: 14, 
        fontWeight: '500', 
        color: 'hsl(221, 83%, 53%)',
    },
    categoriesGrid: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: 20, 
    },
})