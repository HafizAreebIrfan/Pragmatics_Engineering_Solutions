import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Themestore from '../../../store/themestore';
import { useUIStore } from '../../../store/utilstore';

import Svg, {
  Line,
  Rect,
  G,
  Text,
  Defs,
  Pattern,
  Circle,
  Path
} from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { getFontFamily } from '../../../assets/utils/fontfamily';
import VolcanoIcon from '../../../assets/icons/volcano.svg';
import Fanicon from '../../../assets/icons/Primary.svg';
import Charticon from '../../../assets/icons/chart.svg';
import Bolticon from '../../../assets/icons/bolt-lightning.svg';
import Solaricon from '../../../assets/icons/solar-panel.svg';


interface NodeChartProps {
  isFullScreen?: boolean;
  islocked: boolean;
  scale: any;
  savedScale: any;
  MIN_ZOOM: number;
  MAX_ZOOM: number;
  setCurrentZoom: any;
}
const { width, height } = Dimensions.get('window');
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Flowchart: React.FC<NodeChartProps> = ({
  isFullScreen = false,
  islocked,
  scale,
  savedScale,
  MIN_ZOOM,
  MAX_ZOOM,
  setCurrentZoom,
}) => {
  const setScrollEnabled = useUIStore(state => state.setScrollEnabled);
  const theme = Themestore(state => state.theme);

  const DASH = 6;
  const GAP = 4;
  const PATTERN_LENGTH = DASH + GAP;

  const getCurvedPath = (targetX: number, targetY: number) => {
    const startX = center.x;
    const startY = center.y;

    const endX = targetX;
    const endY = targetY + 35;

    const cp1X = startX + (endX - startX) * 0.5;;
    const cp1Y = startY;

    const cp2X = endX;
    const cp2Y = endY + 50;

    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
  };

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  useAnimatedReaction(
    () => scale.value,
    value => {
      runOnJS(setCurrentZoom)(value);
    },
  );

  const dashOffset = useSharedValue(PATTERN_LENGTH);

  React.useEffect(() => {
    dashOffset.value = withRepeat(
      withTiming(0, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [dashOffset, PATTERN_LENGTH]);

  const pinch = Gesture.Pinch()
    .enabled(!islocked)
    .onUpdate(e => {
      const nextScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(nextScale, MIN_ZOOM), MAX_ZOOM);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const pan = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composed = Gesture.Simultaneous(pinch, pan);

  const animatedGroupProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const animatedLineProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  const CHART_HEIGHT = isFullScreen ? height : 280;
  const center = { x: width / 2, y: CHART_HEIGHT / 2 };
  const nodes = [
    {
      id: 'Solar',
      x: center.x - 250,
      y: center.y - 150,
      icon: Solaricon,
      p: '58.95',
      q: '58.95',
      pf: '58.95',
    },
    {
      id: 'Wind',
      x: center.x - 100,
      y: center.y - 150,
      icon: Fanicon,
      p: '58.95',
      q: '58.95',
      pf: '58.95',
    },
    {
      id: 'PCS',
      x: center.x + 50,
      y: center.y - 150,
      icon: Bolticon,
      p: '58.95',
      q: '58.95',
      pf: '58.95',
    },
    {
      id: 'DG',
      x: !isFullScreen ? center.x + 200 : center.x + 200,
      y: center.y - 150,
      icon: Charticon,
      p: '58.95',
      q: '58.95',
      pf: '58.95',
    },
  ];

  return (
    <>
      <View
        style={[
          styles.container,
          isFullScreen && styles.fullScreenContainer,
          isFullScreen && { backgroundColor: theme.colors.background },
        ]}
        onTouchStart={() => setScrollEnabled(false)}
        onTouchEnd={() => setScrollEnabled(true)}
        onTouchCancel={() => setScrollEnabled(true)}
      >
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width="100%" height="100%">
            <Defs>
              <Pattern
                id="dotGrid"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <Circle
                  cx="1"
                  cy="1"
                  r="1"
                  fill={theme.colors.text}
                  opacity={0.3}
                />
              </Pattern>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#dotGrid)" />
          </Svg>
        </View>

        <GestureDetector gesture={composed}>
          <Animated.View style={{ flex: 1 }}>
            <Svg width={width} height={CHART_HEIGHT}>
              <AnimatedG animatedProps={animatedGroupProps}>
                {nodes.map((node, index) => {
                  const isDashed = index % 2 === 0;
                  const curveData = getCurvedPath(node.x, node.y);
                  return isDashed ? (
                    <AnimatedPath
                      key={node.id + '-path'}
                      d={curveData}
                      stroke={theme.colors.nodechartedgegreen}
                      strokeWidth="1"
                      strokeDasharray={`${DASH}, ${GAP}`} 
                      animatedProps={animatedLineProps}
                      fill="none" 
                    />
                  ) : (
                    <Path
                      key={node.id + '-path'}
                      d={curveData}
                      stroke={theme.colors.nodechartedgeblue}
                      strokeWidth="1"
                      fill="none"
                    />
                  );
                })}

                <Rect
                  x={center.x - 50}
                  y={center.y - 30}
                  width={100}
                  height={60}
                  fill={theme.colors.overlaybackground}
                  stroke={theme.colors.cardscolorred}
                  strokeWidth="1"
                  rx="19.21"
                />
                <G x={center.x - 7} y={center.y - 20}>
                  <VolcanoIcon width={16} height={16} />
                </G>
                <Text
                  x={center.x}
                  y={center.y + 7}
                  fontSize="9.6"
                  fontFamily={getFontFamily('true', 'regular')}
                  fill={theme.colors.title}
                  textAnchor="middle"
                >
                  Lucky Cement
                </Text>
                <Text
                  x={center.x}
                  y={center.y + 20}
                  fontSize="7.2"
                  fontFamily={getFontFamily('true', 'regular')}
                  fill={theme.colors.text}
                  textAnchor="middle"
                >
                  Load: 315.44
                </Text>
                {nodes.map(node => {
                  const Nodeicon = node.icon;
                  return (
                    <G key={node.id + '-node'}>
                      <Rect
                        key={node.id + '-node'}
                        x={node.x - 60}
                        y={node.y - 35}
                        width={110}
                        height={95}
                        fill={theme.colors.overlaybackground}
                        stroke={theme.colors.inputborder}
                        strokeWidth="1"
                        rx="19.21"
                      />
                      <G x={node.x + 20} y={node.y - 25}>
                        <Nodeicon
                          width={12}
                          height={12}
                        />
                      </G>
                      <Text
                        x={node.x - 52}
                        y={node.y - 15}
                        fontSize="9.6"
                        fontFamily={getFontFamily('true', 'regular')}
                        fill={theme.colors.text}
                      >
                        {node.id}
                      </Text>

                      <Line
                        x1={node.x - 52}
                        y1={node.y - 5}
                        x2={node.x + 52}
                        y2={node.y - 5}
                        stroke={theme.colors.bordercolor}
                        strokeWidth="1"
                      />
                      <Text
                        x={node.x - 50}
                        y={node.y + 15}
                        fontSize="9.6"
                        fontFamily={getFontFamily('true', 'regular')}
                        fill={theme.colors.title}
                      >
                        P: {node.p}
                      </Text>
                      <Text
                        x={node.x - 50}
                        y={node.y + 32}
                        fontSize="9.6"
                        fontFamily={getFontFamily('true', 'regular')}
                        fill={theme.colors.title}
                      >
                        Q: {node.q}
                      </Text>

                      <Text
                        x={node.x - 50}
                        y={node.y + 48}
                        fontSize="9.6"
                        fontFamily={getFontFamily('true', 'regular')}
                        fill={theme.colors.title}
                      >
                        PF: {node.pf}
                      </Text>
                    </G>
                  );
                })}
              </AnimatedG>
            </Svg>
          </Animated.View>
        </GestureDetector>
      </View>
    </>
  );
};
export default Flowchart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fullScreenContainer: {
    width: width,
    height: height,
  },
});
