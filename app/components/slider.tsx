import React, { FC, useRef, useState } from "react";
import {
  useWindowDimensions,
  Dimensions,
  Animated,
  StyleSheet,
  View,
  FlatList,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "./theme";

interface SliderProps {
  images: string[];
  activeIndex?: number;
  fullWidth?: boolean;
  dotsColor?: string;
  inactiveDotColor?: string;
  fullScreen?: boolean;
  onPress?: (index: number) => void;
}

interface Styles {
  image: StyleProp<ImageStyle>;
  paginator: StyleProp<ViewStyle>;
  paginatorFullScreen: StyleProp<ViewStyle>;
  dot: StyleProp<ViewStyle>;
}

export const Slider: FC<SliderProps> = ({
  images,
  dotsColor = colors.white,
  inactiveDotColor = colors["gray.600"],
  activeIndex = 0,
  fullWidth,
  fullScreen,
  onPress,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [onTouch, setOnTouch] = useState(false);
  const [_, setPreviousScroll] = useState(activeIndex);
  const width = Dimensions.get("window").width;

  const screenHeight = Dimensions.get("window").height;

  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  const height = screenHeight + statusBarHeight;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const { top } = useSafeAreaInsets();
  const dynamicStyles = getDynamicStyles(width, height, top, fullWidth);
  const flatListRef = useRef<FlatList>(null);

  const openSliderFullScreen = (index: number) => {
    if (onPress) {
      onPress(index);
    }
  };

  const goToNextItem = () => {
    setOnTouch(true);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= 5) {
      return;
    }

    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const goToPreviousItem = () => {
    setOnTouch(true);

    const nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      return;
    }

    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const onTouchRef = useRef(onTouch);
  onTouchRef.current = onTouch;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const currentItem = viewableItems[0].index;
    if (onTouchRef.current) {
      setPreviousScroll(currentItem);
    } else {
      setPreviousScroll((prev) => {
        const scrollRight = prev < currentItem;
        const scrollLeft = prev > currentItem;

        if (scrollRight) {
          setCurrentIndex((prev) => prev + 1);
        } else if (scrollLeft) {
          setCurrentIndex((prev) => prev - 1);
        }

        return currentItem;
      });
    }
  });

  return (
    <View>
      {fullScreen ? (
        <View style={{ position: "relative" }}>
          <FlatList
            ref={flatListRef}
            style={{ flex: 1 }}
            data={images}
            initialScrollIndex={activeIndex}
            onMomentumScrollEnd={() => setOnTouch(false)}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewConfig}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item, index }) => (
              <View>
                <Image
                  key={index}
                  source={item}
                  style={dynamicStyles.imageFullScreen}
                />

                <View
                  style={{
                    position: "absolute",
                    flexDirection: "row",
                    zIndex: 1,
                    width: Dimensions.get("screen").width,
                    height: Dimensions.get("screen").height,
                  }}
                >
                  <Pressable onPress={goToPreviousItem} style={{ flex: 1 }} />
                  <Pressable onPress={goToNextItem} style={{ flex: 1 }} />
                </View>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
          />
          <Paginator
            styles={dynamicStyles}
            fullScreen={fullScreen}
            data={images}
            scrollX={scrollX}
            fullWidth={fullWidth}
            dotsColor={dotsColor}
            inactiveDotColor={inactiveDotColor}
          />
        </View>
      ) : (
        <View style={{ position: "relative" }}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={({ item, index }) => (
              <Pressable
                key={index}
                onPress={() => openSliderFullScreen(index)}
              >
                <Image source={item} style={dynamicStyles.image} />
              </Pressable>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
          />

          <Paginator
            styles={dynamicStyles}
            fullScreen={fullScreen}
            data={images}
            scrollX={scrollX}
            fullWidth={fullWidth}
            dotsColor={dotsColor}
            inactiveDotColor={inactiveDotColor}
          />
        </View>
      )}
    </View>
  );
};

interface PaginatorProps {
  data: string[];
  styles: Styles;
  scrollX: Animated.Value;
  dotsColor: string;
  inactiveDotColor: string;
  fullScreen?: boolean;
  fullWidth?: boolean;
}

export const Paginator: FC<PaginatorProps> = ({
  data,
  styles,
  dotsColor,
  inactiveDotColor,
  scrollX,
  fullWidth,
  fullScreen,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[fullScreen ? styles.paginatorFullScreen : styles.paginator]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: fullWidth ? [60, 60, 60] : [6, 12, 6],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });

        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: [inactiveDotColor, dotsColor, inactiveDotColor],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              { width: dotWidth, opacity: opacity, backgroundColor: dotColor },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const getDynamicStyles = (
  width: number,
  height: number,
  top: number,
  fullWidth?: boolean
) => {
  return StyleSheet.create({
    image: {
      marginHorizontal: fullWidth ? 0 : 24,
      width: fullWidth ? width : width - 48,
      aspectRatio: fullWidth ? 4 / 5 : 2 / 3,
      borderRadius: fullWidth ? 0 : 32,
    },
    imageFullScreen: {
      width: width,
      height: height,
    },
    paginator: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 12,
      bottom: fullWidth ? 32 : 0,
      gap: fullWidth ? 10 : 2,
    },
    paginatorFullScreen: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      bottom: height - top - 12,
      gap: 10,
    },
    dot: {
      height: fullWidth ? 4 : 6,
      borderRadius: 5,
      marginHorizontal: 4,
    },
  });
};
