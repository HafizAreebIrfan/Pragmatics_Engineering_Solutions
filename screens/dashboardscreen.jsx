import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Searchbar, ToggleButton } from 'react-native-paper';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { getFontFamily } from '../assets/utils/fontfamily';

const Dashboardscreen = () => {
  return (
    <SafeAreaView style={styles.dashboardview}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.mainview}
      >
        <Searchbar
          placeholder="Search"
          placeholderTextColor={'#6e6e6e'}
          icon={() => (
            <FontAwesome6
              iconStyle="solid"
              color={'#6f6f6f'}
              size={20}
              style={{ width: 20, height: 20 }}
              name="magnifying-glass"
            />
          )}
          inputStyle={styles.searchtext}
          style={styles.searchbar}
        />
        <View style={styles.summarytableview}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.summarytitle}>Site Summary</Text>
            <Button
              style={styles.summarybutton}
              mode="contained"
              icon={() => (
                <FontAwesome6
                  iconStyle="solid"
                  color={'#ffffff'}
                  size={12}
                  style={{ width: 12, height: 12 }}
                  name="upload"
                />
              )}
              onPress={() => Alert.alert('Export Site Summary')}
              labelStyle={styles.summarybuttontext}
            >
              Export
            </Button>
          </View>
        </View>
        <View style={styles.companydatatable}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboardview: {
    flex: 1,
    backgroundColor: '#151314',
    position: 'relative',
  },
  mainview: {
    gap: 20,
    marginHorizontal: 12,
  },
  searchbar: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#303030',
    paddingHorizontal: 12,
    backgroundColor: '#1b1a1b',
    height: 44,
  },
  searchtext: {
    fontSize: 12,
    color: '#6e6e6e',
    lineHeight: 12,
    fontFamily: getFontFamily('true', 'regular'),
    paddingBottom: 20,
  },
  summarytableview: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#303030',
    marginTop: 20,
    padding: 12,
  },
  summarytitle: {
    fontSize: 12,
    fontFamily: getFontFamily('true', 'medium'),
    color: '#ffffff',
    paddingLeft: 12,
  },
  summarybutton: {
    borderRadius: 65,
    backgroundColor: '#08820E',
    color: '#ffffff',
  },
  summarybuttontext: {
    fontSize: 8,
    fontFamily: getFontFamily('true', 'bold'),
    lineHeight: 12,
  },
});

export default Dashboardscreen;
