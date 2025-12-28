import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const Eclipseshapetop = () => {
  const topeclipse = `<svg width="393" height="568" viewBox="0 0 393 568" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.1" filter="url(#filter0_f_2_165)">
      <circle cx="-23.5" cy="67.5" r="274.5" fill="#B1B1B1"/>
    </g>
    <defs>
      <filter id="filter0_f_2_165" x="-523.883" y="-432.883" width="1000.77" height="1000.77" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="112.941" result="effect1_foregroundBlur_2_165"/>
      </filter>
    </defs>
  </svg>`;
  return (
    <View style={styles.eclipsecontainer} pointerEvents="none">
      <SvgXml xml={topeclipse} width="100%" height="100%" />
    </View>
  );
};

const styles = StyleSheet.create({
  eclipsecontainer: {
    position: 'absolute',
    top: 0,
    width: 549, 
    height: 549,
  },
});

export default Eclipseshapetop;
