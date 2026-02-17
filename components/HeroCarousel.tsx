import { useEffect, useRef, useState } from "react";
import { View, Image, Animated, Easing } from 'react-native';
import { homeComponents as styles } from "../styles/homeComponents";

const slides = [
    { image: require("../assets/carousel-1.jpg") },
    { image: require("../assets/carousel2.png") },
    { image: require("../assets/carousel3.jpg") },
];


export function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const animation = useRef(new Animated.Value(1)).current;

    useEffect(() => {

        const timer = setInterval(() => {
            Animated.timing(animation, {
                toValue: 0,
                duration: 500, 
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);

                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }).start();
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [animation])

    return (
        <View style={styles.heroCarousel}>
            <Animated.View style={[styles.carouselSlide, { opacity: animation }]}>
                <Image
                    source={slides[currentIndex].image}
                    style={styles.carouselImg}
                    resizeMode="cover"
                />
            </Animated.View>
        </View>
    )
};
