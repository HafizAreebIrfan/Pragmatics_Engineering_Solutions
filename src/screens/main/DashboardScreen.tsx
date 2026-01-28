import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../../components/layout/Header';
import { SearchBar } from '../../components/ui/SearchBar';
import { SiteCard } from '../../components/site/SiteCard';
import { Site } from '../../types';
import { RootStackParamList } from '../../navigation/types';

// Mock data for development
const MOCK_SITES: Site[] = [
  {
    id: '1',
    name: 'Lucky Cement Nooribad',
    lastUpdated: '17/12/2025, 07:49 PM',
    powerMetrics: {
      solar: 3.2345,
      wind: 3.2345,
      grid: 4553.2,
      pvSize: 1500,
    },
    efficiency: 86.56,
    status: 'online',
    alarmCount: 2,
  },
  {
    id: '2',
    name: 'Master Molty Foam',
    lastUpdated: '17/12/2025, 07:45 PM',
    powerMetrics: {
      solar: 2.8765,
      wind: 1.5432,
      grid: 3200.5,
    },
    efficiency: 78.32,
    status: 'online',
    alarmCount: 0,
  },
  {
    id: '3',
    name: 'Young Food Pvt. Ltd.',
    lastUpdated: '17/12/2025, 07:30 PM',
    powerMetrics: {
      solar: 4.1234,
      wind: 2.9876,
      grid: 5100.8,
      pvSize: 2000,
    },
    efficiency: 92.15,
    status: 'warning',
    alarmCount: 5,
  },
  {
    id: '4',
    name: 'Packages Limited',
    lastUpdated: '17/12/2025, 07:15 PM',
    powerMetrics: {
      solar: 5.5678,
      wind: 3.4567,
      grid: 6789.1,
    },
    efficiency: 88.90,
    status: 'online',
    alarmCount: 1,
  },
  {
    id: '5',
    name: 'Engro Polymer',
    lastUpdated: '17/12/2025, 06:58 PM',
    powerMetrics: {
      solar: 6.7890,
      wind: 4.5678,
      grid: 8900.3,
      pvSize: 3500,
    },
    efficiency: 94.25,
    status: 'online',
    alarmCount: 0,
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sites, setSites] = useState<Site[]>(MOCK_SITES);

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: Fetch sites from API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleSitePress = (site: Site) => {
    navigation.navigate('Site', {
      screen: 'SiteDetail',
      params: { siteId: site.id, siteName: site.name },
    });
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.warn('Export pressed');
  };

  const handleFilter = () => {
    // TODO: Implement filter modal
    console.warn('Filter pressed');
  };

  const renderSiteCard = ({ item }: { item: Site }) => (
    <SiteCard
      site={item}
      onPress={() => handleSitePress(item)}
      onMenuPress={() => console.warn('Menu pressed for', item.name)}
    />
  );

  const renderHeader = () => (
    <View className="mb-4">
      {/* Search Bar */}
      <SearchBar
        onSearch={setSearchQuery}
        onFilterPress={handleFilter}
        placeholder="Search sites..."
      />

      {/* Site Summary Header */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-text-primary text-lg font-semibold">
          Site Summary
        </Text>
        <TouchableOpacity
          onPress={handleExport}
          className="bg-background-tertiary px-4 py-2 rounded-lg"
        >
          <Text className="text-text-primary text-sm">Export</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between mt-3 mb-2">
        <Text className="text-text-secondary text-sm">
          {filteredSites.length} site{filteredSites.length !== 1 ? 's' : ''}
        </Text>
        <Text className="text-text-muted text-sm">
          Last updated: Just now
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="items-center justify-center py-12">
      <Text className="text-5xl mb-4">🔍</Text>
      <Text className="text-text-secondary text-lg mb-2">No sites found</Text>
      <Text className="text-text-muted text-sm text-center">
        {searchQuery
          ? `No sites match "${searchQuery}"`
          : 'Pull down to refresh'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['top']}>
      <Header />

      <FlatList
        data={filteredSites}
        renderItem={renderSiteCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00D26A"
            colors={['#00D26A']}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
