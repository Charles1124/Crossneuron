import { StyleSheet } from "react-native"; 

export const homeComponents= StyleSheet.create({

    //Estilos para el componente Carousel. 
    heroCarousel: {
        overflow: 'hidden',
        position: 'relative', 
        borderRadius: 10, 
        height: 200, 
        //IOS Shadows
        shadowColor: 'hsla(222, 47%, 11%, 1)',
        shadowOffset: { width: 8, height: 8}, 
        shadowOpacity: 0.12, 
        shadowRadius: 30, 
        //Android
        elevation: 5, 
        backgroundColor: '#fff', 
    }, 
    carouselSlide: {
        position: 'absolute', 
        inset: 0, 
    }, 
    carouselImg: {
        width: '100%', 
        height: '100%', 
    },

    //Estilos para componente CategoryCard. 
    categoryCard: {
        backgroundColor: ' hsl(0, 0%, 100%)', 
        borderRadius: 14,
        padding: 17, 
        shadowColor: 'hsla(222, 47%, 11%, 0.08)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        width: "46%",
        elevation: 3
    }, 
    categoryIconWrapper: {
        width: 40,
        height: 40, 
        borderRadius: 8, 
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 8,
    },
    categoryIcon: {
        color: 'hsl(210, 40%, 98%)',  
        width: 20, 
        height: 20,
    },
    textTitle: {
        fontSize: 14, 
        fontWeight: '600', 
        marginBottom: 4, 
        color: 'hsl(222, 47%, 11%)', 
    },
    textDescription: {
        fontSize: 11, 
        fontWeight: '700',
        color: 'hsl(240, 1%, 39%)',
    },
})

export const categoryGradients = {
  primary: ["hsl(221,83%,53%)", "hsl(245,75%,60%)"],
  accent: ["hsl(16,85%,60%)", "hsl(35,90%,55%)"],
  calm: ["hsl(187,70%,45%)", "hsl(221,83%,53%)"]
};