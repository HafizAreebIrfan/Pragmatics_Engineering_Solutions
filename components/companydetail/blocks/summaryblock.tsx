import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Themestore from '../../../store/themestore';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { getFontFamily } from '../../../assets/utils/fontfamily';
import DatePicker from 'react-native-date-picker';
import Piechart from '../charts/piechart';
// import Nodechart from '../charts/nodechart';
import Flowchart from '../charts/flowchart';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Summaryblock: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const theme = Themestore(state => state.theme);
  const mode = Themestore(state => state.mode);
  const [isLocked, setIsLocked] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const MIN_ZOOM = 0.8;
  const MAX_ZOOM = 2.0;
  const [currentZoom, setCurrentZoom] = useState<any>(1);

  const handleZoomIn = () => {
    if (isLocked) return;
    const newScale = Math.min(savedScale.value + 0.2, MAX_ZOOM);
    scale.value = withTiming(newScale);
    savedScale.value = newScale;
  };
  const handleZoomOut = () => {
    if (isLocked) return;
    const newScale = Math.max(savedScale.value - 0.2, MIN_ZOOM);
    scale.value = withTiming(newScale);
    savedScale.value = newScale;
  };
  const toggleLock = () => setIsLocked(!isLocked);
  const isZoomInDisabled = isLocked || currentZoom >= MAX_ZOOM - 0.001;

  const isZoomOutDisabled = isLocked || currentZoom <= MIN_ZOOM + 0.001;

  const renderChart = (isFull: boolean) => {
    return (
      <View style={{ flex: 1 }}>
        <Flowchart
          isFullScreen={isFull}
          islocked={isLocked}
          scale={scale}
          savedScale={savedScale}
          MAX_ZOOM={MAX_ZOOM}
          MIN_ZOOM={MIN_ZOOM}
          setCurrentZoom={setCurrentZoom}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={[styles.yieldbox, { borderColor: theme.colors.bordercolor }]}
      >
        <View
          style={[
            styles.yieldboxheader,
            { backgroundColor: theme.colors.cardheader },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Text
              style={[
                styles.yieldboxheadertitile,
                { color: theme.colors.title },
              ]}
            >
              Yield
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statCardContainer,
            {
              backgroundColor: theme.colors.overlaybackground,
              marginBottom: 8,
            },
          ]}
        >
          <View
            style={[
              styles.indicatorBar,
              { backgroundColor: theme.colors.iconcolor },
            ]}
          />
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              Total Plant Yield
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.title }]}>
              106,104.46 mWh
            </Text>
          </View>
          <View style={styles.statIconContainer}>
            <FontAwesome6
              iconStyle="solid"
              name="bolt"
              size={20}
              color={theme.colors.iconcolor}
            />
          </View>
        </View>

        <View
          style={[
            styles.statCardContainer,
            {
              backgroundColor: theme.colors.overlaybackground,
              marginBottom: 0,
            },
          ]}
        >
          <View
            style={[
              styles.indicatorBar,
              { backgroundColor: theme.colors.iconcolor },
            ]}
          />
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              Revenue
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.title }]}>
              20,159,846.83 USD
            </Text>
          </View>
          <View style={styles.statIconContainer}>
            <FontAwesome6
              iconStyle="solid"
              name="chart-line"
              size={20}
              color={theme.colors.iconcolor}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.environmentbox,
          { borderColor: theme.colors.bordercolor },
        ]}
      >
        <View
          style={[
            styles.environmentboxheader,
            { backgroundColor: theme.colors.cardheader },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Text
              style={[
                styles.yieldboxheadertitile,
                { color: theme.colors.title },
              ]}
            >
              Environmental Benefits
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statCardContainer,
            {
              backgroundColor: theme.colors.overlaybackground,
              marginBottom: 8,
            },
          ]}
        >
          <View style={[styles.indicatorBar, { backgroundColor: '#e8f80c' }]} />
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              CO₂ Reduction
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.title }]}>
              22,529.16 Tons
            </Text>
          </View>
          <View style={styles.statIconContainer}>
            <FontAwesome6
              iconStyle="solid"
              name="seedling"
              size={20}
              color={theme.colors.iconcolor}
            />
          </View>
        </View>

        <View
          style={[
            styles.statCardContainer,
            {
              backgroundColor: theme.colors.overlaybackground,
              marginBottom: 8,
            },
          ]}
        >
          <View
            style={[
              styles.indicatorBar,
              { backgroundColor: theme.colors.warningbtnbg },
            ]}
          />
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              Coal Saved
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.title }]}>
              50,865,032.12 Tons
            </Text>
          </View>
          <View style={styles.statIconContainer}>
            <FontAwesome6
              iconStyle="solid"
              name="industry"
              size={20}
              color={theme.colors.warningbtnbg}
            />
          </View>
        </View>

        <View
          style={[
            styles.statCardContainer,
            {
              backgroundColor: theme.colors.overlaybackground,
            },
          ]}
        >
          <View
            style={[
              styles.indicatorBar,
              { backgroundColor: theme.colors.iconcolor },
            ]}
          />
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              Trees Planted
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.title }]}>
              120,573,246.59 Nos.
            </Text>
          </View>
          <View style={styles.statIconContainer}>
            <FontAwesome6
              iconStyle="solid"
              name="seedling"
              size={20}
              color={theme.colors.iconcolor}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.nodechartbox,
          {
            height: 280,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: theme.colors.bordercolor,
            backgroundColor: theme.colors.background,
            overflow: 'hidden',
          },
        ]}
      >
        {renderChart(false)}

        <View
          style={{
            position: 'absolute',
            bottom: 15,
            left: 15,
            right: 15,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            pointerEvents: 'box-none',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(26,26,26,0.8)'
                  : 'rgba(235,235,235,0.8)',
              borderRadius: 100,
              borderWidth: 1,
              borderColor: theme.colors.bordercolor,
              height: 36,
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              disabled={isZoomInDisabled}
              style={{ padding: 8 }}
              onPress={handleZoomIn}
            >
              <FontAwesome6
                iconStyle="solid"
                name="plus"
                size={12}
                disabled={isZoomInDisabled}
                color={
                  isZoomInDisabled
                    ? theme.colors.inputborder
                    : theme.colors.iconsecondary
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isZoomOutDisabled}
              style={{ padding: 8 }}
              onPress={handleZoomOut}
            >
              <FontAwesome6
                iconStyle="solid"
                name="minus"
                size={12}
                disabled={isZoomOutDisabled}
                color={
                  isZoomOutDisabled
                    ? theme.colors.inputborder
                    : theme.colors.iconsecondary
                }
              />
            </TouchableOpacity>

            <View
              style={{
                width: 1,
                height: 16,
                backgroundColor: '#333',
                marginHorizontal: 4,
              }}
            />

            <TouchableOpacity style={{ padding: 8 }} onPress={toggleLock}>
              <FontAwesome6
                iconStyle="solid"
                name={isLocked ? 'lock' : 'lock-open'}
                size={12}
                color={isLocked ? theme.colors.title : theme.colors.title}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => setFullScreen(true)}
            >
              <FontAwesome6
                iconStyle="solid"
                name="expand"
                size={12}
                color={theme.colors.iconsecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={[styles.reportbox, { borderColor: theme.colors.bordercolor }]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
          }}
        >
          <Text style={[styles.reporttitle, { color: theme.colors.title }]}>
            Performance Report
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.colors.datepickerbackground,
                paddingVertical: 6,
                paddingHorizontal: 12,
                height: 24,
                borderRadius: 65,
                marginHorizontal: 8,
              }}
              onPress={() => setOpen(true)}
            >
              <FontAwesome6
                name="calendar"
                size={12}
                color={theme.colors.iconbuttontext}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: theme.colors.iconbuttontext,
                  fontFamily: getFontFamily('true', 'medium'),
                }}
              >
                15/12/25 - 17/12/25
              </Text>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.colors.buttonbg,
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 65,
              }}
              onPress={() => Alert.alert('Exporting Report...')}
            >
              <FontAwesome6
                iconStyle="solid"
                name="file-export"
                size={12}
                color={theme.colors.iconbuttonicon}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: theme.colors.iconbuttontext,
                  fontFamily: getFontFamily('true', 'medium'),
                }}
              >
                Export
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Piechart />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 5,
            gap: 8,
          }}
        >
          <View
            style={{
              backgroundColor: '#D03A3A',
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 6,
                color: theme.colors.buttontext,
                fontFamily: getFontFamily('true', 'semi-bold'),
              }}
            >
              Genset Production (kWh)
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#118AD6',
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 6,
                color: theme.colors.buttontext,
                fontFamily: getFontFamily('true', 'semi-bold'),
              }}
            >
              Solar Power Generation (kWh)
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#118AD6',
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 6,
                color: theme.colors.buttontext,
                fontFamily: getFontFamily('true', 'semi-bold'),
              }}
            >
              Wind Turbine Output (kWh)
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#3a5fd0',
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 6,
                color: theme.colors.buttontext,
                fontFamily: getFontFamily('true', 'semi-bold'),
              }}
            >
              Wind Turbine Output (kWh)
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#3AD04B',
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 6,
                color: theme.colors.buttontext,
                fontFamily: getFontFamily('true', 'semi-bold'),
              }}
            >
              Wind Turbine Output (kWh)
            </Text>
          </View>
        </View>
      </View>

      <Modal
        visible={fullScreen}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setFullScreen(false)}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.overlaybackground,
            }}
          >
            <View style={{ flex: 1 }}>{renderChart(true)}</View>
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
              <TouchableOpacity
                onPress={() => setFullScreen(false)}
                style={{
                  position: 'absolute',
                  top: 50,
                  right: 20,
                  backgroundColor: theme.colors.overlaybackground,
                  padding: 6,
                  borderRadius: 100,
                }}
              >
                <FontAwesome6
                  iconStyle="solid"
                  name="xmark"
                  size={12}
                  color={theme.colors.title}
                />
              </TouchableOpacity>

              <View
                style={{
                  position: 'absolute',
                  bottom: 15,
                  left: 15,
                  right: 15,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  pointerEvents: 'box-none',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor:
                      mode === 'dark'
                        ? 'rgba(26,26,26,0.8)'
                        : 'rgba(235,235,235,0.8)',
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: theme.colors.bordercolor,
                    height: 36,
                    paddingHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    disabled={isZoomInDisabled}
                    style={{ padding: 8 }}
                    onPress={handleZoomIn}
                  >
                    <FontAwesome6
                      iconStyle="solid"
                      name="plus"
                      size={12}
                      disabled={isZoomInDisabled}
                      color={
                        isZoomInDisabled
                          ? theme.colors.inputborder
                          : theme.colors.iconsecondary
                      }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={isZoomOutDisabled}
                    style={{ padding: 8 }}
                    onPress={handleZoomOut}
                  >
                    <FontAwesome6
                      iconStyle="solid"
                      name="minus"
                      size={12}
                      disabled={isZoomOutDisabled}
                      color={
                        isZoomOutDisabled
                          ? theme.colors.inputborder
                          : theme.colors.iconsecondary
                      }
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: 1,
                      height: 16,
                      backgroundColor: '#333',
                      marginHorizontal: 4,
                    }}
                  />

                  <TouchableOpacity style={{ padding: 8 }} onPress={toggleLock}>
                    <FontAwesome6
                      iconStyle="solid"
                      name={isLocked ? 'lock' : 'lock-open'}
                      size={12}
                      color={isLocked ? theme.colors.title : theme.colors.title}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => setFullScreen(false)}
                  >
                    <FontAwesome6
                      iconStyle="solid"
                      name="expand"
                      size={12}
                      color={theme.colors.iconsecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

export default Summaryblock;

const styles = StyleSheet.create({
  yieldbox: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 8,
  },
  environmentbox: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 8,
  },
  yieldboxheader: {
    padding: 12,
    gap: 12,
    height: 48,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  environmentboxheader: {
    padding: 12,
    gap: 12,
    height: 48,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  yieldboxheadertitile: {
    fontSize: 12,
    fontFamily: getFontFamily('true', 'medium'),
    lineHeight: 18,
  },

  statCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginTop: 8,
  },
  indicatorBar: {
    width: 2,
    height: 20,
    borderRadius: 100,
    marginRight: 15,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 8,
    fontFamily: getFontFamily('true', 'regular'),
    marginBottom: 2,
    lineHeight: 12,
  },
  statValue: {
    fontSize: 10,
    fontFamily: getFontFamily('true', 'medium'),
    lineHeight: 12,
  },
  statIconContainer: {
    marginLeft: 8,
  },
  reportbox: {
    marginBottom: 25,
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
  },
  reporttitle: {
    fontSize: 12,
    fontFamily: getFontFamily('true', 'medium'),
    lineHeight: 18,
  },
  nodechartbox: {
    marginBottom: 25,
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
  },
});
