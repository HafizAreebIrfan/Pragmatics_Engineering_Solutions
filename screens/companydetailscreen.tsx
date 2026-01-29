import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Themestore from '../store/themestore';
import { getFontFamily } from '../assets/utils/fontfamily';
import { Searchbar } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import Svg, { Path } from 'react-native-svg';

const Companydetailscreen: React.FC = () => {
  const theme = Themestore(state => state.theme);
  const mode = Themestore(state => state.mode);


  const [searchQuery, setSearchQuery] = useState<string>('');

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<string>('Views');

  const [selectedfilter, setselectedfilter] = useState<string>('Summary');

  const selectOption = (value: string) => {
    setSelectedView(value);
    setShowDropdown(false);
  };

  const selectFilter = (value: string) => {
    setselectedfilter(value);
  };

  const pieData = [
    { value: 45, color: theme.colors.piechartcolor1, text: '' },
    { value: 30, color: theme.colors.piechartcolor2, text: '' },
    { value: 5, color: theme.colors.piechartcolor4, text: '' },
    { value: 20, color: theme.colors.piechartcolor3, text: '' },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="none"
        scrollEventThrottle={16}
      >
        <View style={styles.searchbarcontainer}>
          <Searchbar
            placeholder="Search"
            rippleColor={'transparent'}
            placeholderTextColor={theme.colors.text}
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={() => (
              <FontAwesome6
                iconStyle="solid"
                color={theme.colors.text}
                size={18}
                style={{ width: 18, height: 18 }}
                name="magnifying-glass"
              />
            )}
            inputStyle={[styles.searchtext, { color: theme.colors.text }]}
            style={[
              styles.searchbar,
              {
                backgroundColor: theme.colors.overlaybackground,
                borderColor: theme.colors.bordercolor,
              },
            ]}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
            style={[
              styles.dropdownHeader,
              {
                borderColor: theme.colors.bordercolor,
                backgroundColor: theme.colors.overlaybackground,
              },
            ]}
          >
            <Text style={[styles.dropdownText, { color: theme.colors.text }]}>
              {selectedView}
            </Text>
            <FontAwesome6
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={14}
              iconStyle="solid"
              color={theme.colors.title}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View
              style={[
                styles.dropdownList,
                {
                  backgroundColor: theme.colors.overlaybackground,
                  borderColor: theme.colors.bordercolor,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.bordercolor,
                  },
                ]}
                onPress={() => selectOption('Views')}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      color:
                        selectedView === 'Views'
                          ? theme.colors.iconcolor
                          : theme.colors.text,
                    },
                  ]}
                >
                  Views
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.bordercolor,
                  },
                ]}
                onPress={() => selectOption('Live parameters')}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      color:
                        selectedView === 'Live parameters'
                          ? theme.colors.iconcolor
                          : theme.colors.text,
                    },
                  ]}
                >
                  Live parameters
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.bordercolor,
                  },
                ]}
                onPress={() => selectOption('Devices')}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      color:
                        selectedView === 'Devices'
                          ? theme.colors.iconcolor
                          : theme.colors.text,
                    },
                  ]}
                >
                  Devices
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectOption('Alarms')}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      color:
                        selectedView === 'Alarms'
                          ? theme.colors.iconcolor
                          : theme.colors.text,
                    },
                  ]}
                >
                  Alarms
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={[styles.filterRow]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedfilter === 'Summary'
                      ? theme.colors.buttonbg
                      : 'transparent',
                  borderColor:
                    selectedfilter === 'Summary'
                      ? theme.colors.buttonbg
                      : theme.colors.bordercolor,
                },
              ]}
              onPress={() => selectFilter('Summary')}
            >
              <FontAwesome6
                name="diagram-project"
                iconStyle="solid"
                size={12}
                color={
                  selectedfilter === 'Summary'
                    ? theme.colors.iconbuttonicon
                    : theme.colors.iconsecondary
                }
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedfilter === 'Summary'
                        ? theme.colors.iconbuttontext
                        : theme.colors.text,
                  },
                ]}
              >
                Summary
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedfilter === 'Cards'
                      ? theme.colors.buttonbg
                      : 'transparent',
                  borderColor:
                    selectedfilter === 'Cards'
                      ? theme.colors.buttonbg
                      : theme.colors.bordercolor,
                },
              ]}
              onPress={() => selectFilter('Cards')}
            >
              <FontAwesome6
                name="clone"
                iconStyle="solid"
                size={12}
                color={
                  selectedfilter === 'Cards'
                    ? theme.colors.iconbuttonicon
                    : theme.colors.iconsecondary
                }
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedfilter === 'Cards'
                        ? theme.colors.iconbuttontext
                        : theme.colors.text,
                  },
                ]}
              >
                Cards
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedfilter === 'Alarms'
                      ? theme.colors.buttonbg
                      : 'transparent',
                  borderColor:
                    selectedfilter === 'Alarms'
                      ? theme.colors.buttonbg
                      : theme.colors.bordercolor,
                },
              ]}
              onPress={() => selectFilter('Alarms')}
            >
              <FontAwesome6
                name="bell"
                iconStyle="solid"
                size={12}
                color={
                  selectedfilter === 'Alarms'
                    ? theme.colors.iconbuttonicon
                    : theme.colors.iconsecondary
                }
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedfilter === 'Alarms'
                        ? theme.colors.iconbuttontext
                        : theme.colors.text,
                  },
                ]}
              >
                Alarms
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedfilter === 'Trend'
                      ? theme.colors.buttonbg
                      : 'transparent',
                  borderColor:
                    selectedfilter === 'Trend'
                      ? theme.colors.buttonbg
                      : theme.colors.bordercolor,
                },
              ]}
              onPress={() => selectFilter('Trend')}
            >
              <FontAwesome6
                name="file-lines"
                iconStyle="solid"
                size={12}
                color={
                  selectedfilter === 'Trend'
                    ? theme.colors.iconbuttonicon
                    : theme.colors.iconsecondary
                }
                style={{ marginRight: 8 }}
              />
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedfilter === 'Trend'
                        ? theme.colors.iconbuttontext
                        : theme.colors.text,
                  },
                ]}
              >
                Trend
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

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
            <View
              style={[styles.indicatorBar, { backgroundColor: '#e8f80c' }]}
            />
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
            },
          ]}
        >
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Path
                d="M 70 80 Q 70 150 160 150"
                fill="none"
                stroke="#3AD04B"
                strokeWidth="1.5"
                strokeDasharray="5, 5"
              />
              <Path
                d="M 270 80 Q 270 150 180 150"
                fill="none"
                stroke="#3AD04B"
                strokeWidth="1.5"
                strokeDasharray="5, 5"
              />
              <Path
                d="M 70 230 Q 70 180 160 180"
                fill="none"
                stroke="#3A5FD0"
                strokeWidth="1.5"
                strokeDasharray="5, 5"
              />
              <Path
                d="M 270 230 Q 270 180 180 180"
                fill="none"
                stroke="#3A5FD0"
                strokeWidth="1.5"
                strokeDasharray="5, 5"
              />
            </Svg>
          </View>
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -40 }, { translateY: 0 }],
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 96,
                height: 69,
                borderRadius: 20,
                backgroundColor: theme.colors.background,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.1,
                borderColor: '#ff0000',
                padding: 9.6
              }}
            >
              <FontAwesome6
                name="volcano"
                iconStyle="solid"
                size={24}
                color="#ef476f"
              />
              <Text
                style={{
                  marginTop: 6,
                  color: theme.colors.title,
                  fontSize: 10,
                  fontFamily: getFontFamily('true', 'bold'),
                }}
              >
                Lucky Cement
              </Text>
              <Text style={{ color: theme.colors.text, fontSize: 7 }}>
                Load: 315.44
              </Text>
            </View>
          </View>

          <View style={{ position: 'absolute', top: 30, left: 0 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

          <View style={{ position: 'absolute', top: 30, left: 100 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

          <View style={{ position: 'absolute', top: 30, right: 0 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

          <View style={{ position: 'absolute', top: 30, right: 100 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

        
          <View
            style={{
              position: 'absolute',
              bottom: 15,
              left: 15,
              right: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ position: 'absolute', bottom: -40, left: -15 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

          <View style={{ position: 'absolute', bottom: -40, left: 100 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

          <View style={{ position: 'absolute', bottom: -40, left: 200 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>

          <View style={{ position: 'absolute', bottom: -40, left: 295 }}>
            <View
              style={{
                backgroundColor: theme.colors.overlaybackground,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                borderRadius: 10,
                padding: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: '#888', fontSize: 8 }}>Q: 58.95</Text>
              <Text style={{ color: '#888', fontSize: 8 }}>PF: 58.95</Text>
            </View>
          </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: mode === 'dark' ? 'rgba(26, 26, 26, 0.6)' : 'rgba(235, 235, 235, 0.6)',
                borderRadius: 100,
                borderWidth: 1,
                borderColor: theme.colors.bordercolor,
                height: 36,
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity style={{ padding: 8 }}>
                <FontAwesome6
                  iconStyle="solid"
                  name="plus"
                  size={12}
                  color={theme.colors.iconsecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 8 }}>
                <FontAwesome6
                  iconStyle="solid"
                  name="minus"
                  size={12}
                  color={theme.colors.iconsecondary}
                />
              </TouchableOpacity>
              <View style={{ width: 1, height: 16, backgroundColor: '#333' }} />
              <TouchableOpacity style={{ padding: 8 }}>
                <FontAwesome6
                  iconStyle="solid"
                  name="lock"
                  size={12}
                  color={theme.colors.iconsecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 8 }}>
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
                  backgroundColor: theme.colors.overlaybackground,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  height: 24,
                  borderRadius: 65,
                  marginHorizontal: 8,
                }}
                onPress={() => Alert.alert('Date Picker Opening...')}
              >
                <FontAwesome6
                  name="calendar"
                  size={12}
                  color={theme.colors.title}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: theme.colors.title,
                    fontFamily: getFontFamily('true', 'medium'),
                  }}
                >
                  15/12/25 - 17/12/25
                </Text>
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
          <View style={{ padding: 15, alignItems: 'center' }}>
            <PieChart
              data={pieData}
              donut
              radius={80}
              innerRadius={0}
              showText
              textColor="white"
              textSize={10}
              textBackgroundRadius={26}
              font={getFontFamily('true', 'bold')}
            />

            <View
              style={[
                StyleSheet.absoluteFill,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <View style={{ position: 'absolute', top: 20, left: 0 }}>
                <View
                  style={{
                    backgroundColor: theme.colors.overlaybackground,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.bordercolor,
                  }}
                >
                  <Text style={{ fontSize: 8, color: theme.colors.text }}>
                    Genset{'\n'}Production{'\n'}(kWh)
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: theme.colors.title,
                        fontFamily: getFontFamily('true', 'semi-bold'),
                      }}
                    >
                      23,424
                    </Text>
                    <View
                      style={{
                        backgroundColor: theme.colors.buttonbg,
                        borderRadius: 100,
                        padding: 4,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: theme.colors.title }}>
                        67%
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    width: 20,
                    backgroundColor: '#ef476f',
                    position: 'absolute',
                    right: -20,
                    top: 25,
                  }}
                />
                <View
                  style={{
                    height: 20,
                    width: 1,
                    backgroundColor: '#ef476f',
                    position: 'absolute',
                    right: -20,
                    top: 25,
                  }}
                />
              </View>

              <View style={{ position: 'absolute', top: 100, left: 0 }}>
                <View
                  style={{
                    backgroundColor: theme.colors.overlaybackground,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.bordercolor,
                  }}
                >
                  <Text style={{ fontSize: 8, color: theme.colors.text }}>
                    Wind Turbine{'\n'}Output (kWh)
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: theme.colors.title,
                        fontFamily: getFontFamily('true', 'semi-bold'),
                      }}
                    >
                      12,560
                    </Text>
                    <View
                      style={{
                        backgroundColor: theme.colors.buttonbg,
                        borderRadius: 100,
                        padding: 4,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: theme.colors.title }}>
                        38%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ position: 'absolute', bottom: 10, left: 0 }}>
                <View
                  style={{
                    backgroundColor: theme.colors.overlaybackground,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.bordercolor,
                  }}
                >
                  <Text style={{ fontSize: 8, color: theme.colors.text }}>
                    Solar Power{'\n'}Generation{'\n'}(kWh)
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: theme.colors.title,
                        fontFamily: getFontFamily('true', 'semi-bold'),
                      }}
                    >
                      15,300
                    </Text>
                    <View
                      style={{
                        backgroundColor: theme.colors.buttonbg,
                        borderRadius: 100,
                        padding: 4,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: theme.colors.title }}>
                        45%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ position: 'absolute', top: 50, right: 0 }}>
                <View
                  style={{
                    backgroundColor: theme.colors.overlaybackground,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.bordercolor,
                  }}
                >
                  <Text style={{ fontSize: 8, color: theme.colors.text }}>
                    Wind Turbine{'\n'}Output (kWh)
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: theme.colors.title,
                        fontFamily: getFontFamily('true', 'semi-bold'),
                      }}
                    >
                      12,560
                    </Text>
                    <View
                      style={{
                        backgroundColor: theme.colors.buttonbg,
                        borderRadius: 100,
                        padding: 4,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: theme.colors.title }}>
                        38%
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    width: 20,
                    backgroundColor: '#3A5FD0',
                    position: 'absolute',
                    left: -20,
                    top: 25,
                  }}
                />
              </View>

              <View style={{ position: 'absolute', bottom: 30, right: 0 }}>
                <View
                  style={{
                    backgroundColor: theme.colors.overlaybackground,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.bordercolor,
                  }}
                >
                  <Text style={{ fontSize: 8, color: theme.colors.text }}>
                    Wind Turbine{'\n'}Output (kWh)
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: theme.colors.title,
                        fontFamily: getFontFamily('true', 'semi-bold'),
                      }}
                    >
                      12,560
                    </Text>
                    <View
                      style={{
                        backgroundColor: theme.colors.buttonbg,
                        borderRadius: 100,
                        padding: 4,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={{ fontSize: 6, color: theme.colors.title }}>
                        38%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 55,
                gap: 8,
              }}
            />
          </View>
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
      </ScrollView>
    </View>
  );
};

export default Companydetailscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  searchbarcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginVertical: 20,
  },
  searchbar: {
    flex: 1,
    borderRadius: 100,
    borderWidth: 1,
    height: 44,
  },
  searchtext: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: getFontFamily('true', 'regular'),
    paddingBottom: 20,
  },

  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: {
    fontFamily: getFontFamily('true', 'regular'),
    fontSize: 12,
    lineHeight: 18,
  },
  dropdownList: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: getFontFamily('true', 'medium'),
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 8,
    width: 86,
  },
  filterText: {
    fontSize: 8,
    lineHeight: 12,
    fontFamily: getFontFamily('true', 'medium'),
    textAlign: 'center',
  },

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
