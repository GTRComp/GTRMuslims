
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Memory {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'video' | 'audio' | 'text' | 'voice' | 'geo';
  date: string;
  childIds: string[];
  location?: string;
  tags: string[];
}

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string>('');

  const [memories] = useState<Memory[]>([
    {
      id: '1',
      title: 'Первые шаги Анны',
      description: 'Анна сделала свои первые самостоятельные шаги!',
      type: 'video',
      date: '2024-01-15',
      childIds: ['1'],
      location: 'Дом, гостиная',
      tags: ['первые шаги', 'развитие', 'милота']
    },
    {
      id: '2',
      title: 'Семейная прогулка',
      description: 'Прекрасный день в парке с детьми',
      type: 'photo',
      date: '2024-01-10',
      childIds: ['1', '2'],
      location: 'Центральный парк',
      tags: ['прогулка', 'семья', 'природа']
    },
    {
      id: '3',
      title: 'Колыбельная для Анны',
      description: 'Записал как пою колыбельную перед сном',
      type: 'audio',
      date: '2024-01-08',
      childIds: ['1'],
      tags: ['колыбельная', 'сон', 'музыка']
    },
    {
      id: '4',
      title: 'Смешная фраза Максима',
      description: 'Максим сказал что-то очень смешное за ужином',
      type: 'text',
      date: '2024-01-05',
      childIds: ['2'],
      location: 'Дом, кухня',
      tags: ['юмор', 'речь', 'семейный ужин']
    }
  ]);

  const children = [
    { id: '1', name: 'Анна' },
    { id: '2', name: 'Максим' }
  ];

  const memoryTypes = [
    { id: 'all', name: 'Все', icon: 'heart' },
    { id: 'photo', name: 'Фото', icon: 'photo' },
    { id: 'video', name: 'Видео', icon: 'video' },
    { id: 'audio', name: 'Аудио', icon: 'waveform' },
    { id: 'text', name: 'Заметки', icon: 'text.justify' },
    { id: 'voice', name: 'Голос', icon: 'mic' },
    { id: 'geo', name: 'Места', icon: 'location' }
  ];

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || memory.type === filterType;
    const matchesChild = selectedChild === '' || memory.childIds.includes(selectedChild);
    
    return matchesSearch && matchesType && matchesChild;
  });

  const getMemoryIcon = (type: string) => {
    const typeObj = memoryTypes.find(t => t.id === type);
    return typeObj ? typeObj.icon : 'heart';
  };

  const addNewMemory = (type: string) => {
    setShowAddModal(false);
    Alert.alert('Добавить воспоминание', `Добавление ${type} воспоминания...`);
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Галерея воспоминаний
        </ThemedText>
        
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск воспоминаний..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {memoryTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.filterButton,
                filterType === type.id && styles.activeFilterButton
              ]}
              onPress={() => setFilterType(type.id)}
            >
              <IconSymbol 
                name={type.icon} 
                size={16} 
                color={filterType === type.id ? 'white' : '#4A90E2'} 
              />
              <ThemedText 
                style={[
                  styles.filterText,
                  filterType === type.id && styles.activeFilterText
                ]}
              >
                {type.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.childrenFilter}>
          <TouchableOpacity
            style={[
              styles.childFilterButton,
              selectedChild === '' && styles.activeChildFilter
            ]}
            onPress={() => setSelectedChild('')}
          >
            <ThemedText style={[
              styles.childFilterText,
              selectedChild === '' && styles.activeChildFilterText
            ]}>
              Все дети
            </ThemedText>
          </TouchableOpacity>
          {children.map((child) => (
            <TouchableOpacity
              key={child.id}
              style={[
                styles.childFilterButton,
                selectedChild === child.id && styles.activeChildFilter
              ]}
              onPress={() => setSelectedChild(child.id)}
            >
              <ThemedText style={[
                styles.childFilterText,
                selectedChild === child.id && styles.activeChildFilterText
              ]}>
                {child.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <ScrollView style={styles.memoriesList}>
        {filteredMemories.map((memory) => (
          <TouchableOpacity key={memory.id} style={styles.memoryCard}>
            <View style={styles.memoryHeader}>
              <View style={styles.memoryIcon}>
                <IconSymbol 
                  name={getMemoryIcon(memory.type)} 
                  size={24} 
                  color="#4A90E2" 
                />
              </View>
              <View style={styles.memoryInfo}>
                <ThemedText style={styles.memoryTitle}>{memory.title}</ThemedText>
                <ThemedText style={styles.memoryDate}>
                  {new Date(memory.date).toLocaleDateString('ru-RU')}
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <IconSymbol name="ellipsis" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ThemedText style={styles.memoryDescription}>
              {memory.description}
            </ThemedText>

            {memory.location && (
              <View style={styles.locationContainer}>
                <IconSymbol name="location" size={14} color="#666" />
                <ThemedText style={styles.locationText}>{memory.location}</ThemedText>
              </View>
            )}

            <View style={styles.tagsContainer}>
              {memory.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <ThemedText style={styles.tagText}>#{tag}</ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.childrenTags}>
              {memory.childIds.map((childId) => {
                const child = children.find(c => c.id === childId);
                return child ? (
                  <View key={childId} style={styles.childTag}>
                    <IconSymbol name="person.fill" size={12} color="#1976d2" />
                    <ThemedText style={styles.childTagText}>{child.name}</ThemedText>
                  </View>
                ) : null;
              })}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setShowAddModal(true)}
      >
        <IconSymbol name="plus" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              Добавить воспоминание
            </ThemedText>
            
            <View style={styles.addOptionsGrid}>
              {memoryTypes.slice(1).map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.addOption}
                  onPress={() => addNewMemory(type.name)}
                >
                  <IconSymbol name={type.icon} size={30} color="#4A90E2" />
                  <ThemedText style={styles.addOptionText}>{type.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAddModal(false)}
            >
              <ThemedText style={styles.cancelButtonText}>Отмена</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    marginBottom: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f7ff',
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    marginLeft: 5,
    color: '#4A90E2',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  childrenFilter: {
    marginBottom: 10,
  },
  childFilterButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#e8f5e8',
    borderRadius: 15,
    marginRight: 10,
  },
  activeChildFilter: {
    backgroundColor: '#4caf50',
  },
  childFilterText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '500',
  },
  activeChildFilterText: {
    color: 'white',
  },
  memoriesList: {
    flex: 1,
    padding: 20,
  },
  memoryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  memoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memoryInfo: {
    flex: 1,
  },
  memoryTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  memoryDate: {
    color: '#666',
    fontSize: 14,
  },
  moreButton: {
    padding: 5,
  },
  memoryDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: '#555',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    color: '#666',
    fontSize: 13,
    marginLeft: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: '#f57c00',
    fontSize: 12,
  },
  childrenTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  childTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  childTagText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  addOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addOption: {
    width: '30%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    marginBottom: 15,
  },
  addOptionText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
