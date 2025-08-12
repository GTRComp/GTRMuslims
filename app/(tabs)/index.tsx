
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Child {
  id: string;
  name: string;
  birthDate: string;
  avatar?: string;
}

interface Memory {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'audio' | 'text' | 'voice' | 'geo';
  date: string;
  childIds: string[];
  thumbnail?: string;
  location?: string;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [children] = useState<Child[]>([
    { id: '1', name: 'Анна', birthDate: '2020-05-15' },
    { id: '2', name: 'Максим', birthDate: '2018-08-22' },
  ]);

  const [memories] = useState<Memory[]>([
    {
      id: '1',
      title: 'Первые шаги',
      type: 'video',
      date: '2024-01-15',
      childIds: ['1'],
      location: 'Дом'
    },
    {
      id: '2',
      title: 'День в парке',
      type: 'photo',
      date: '2024-01-10',
      childIds: ['1', '2'],
      location: 'Центральный парк'
    },
    {
      id: '3',
      title: 'Колыбельная',
      type: 'audio',
      date: '2024-01-08',
      childIds: ['1']
    }
  ]);

  const addMemory = () => {
    Alert.alert(
      'Добавить воспоминание',
      'Выберите тип воспоминания',
      [
        { text: 'Фото', onPress: () => console.log('Add photo') },
        { text: 'Видео', onPress: () => console.log('Add video') },
        { text: 'Аудио', onPress: () => console.log('Add audio') },
        { text: 'Заметка', onPress: () => console.log('Add text') },
        { text: 'Голосовая заметка', onPress: () => console.log('Add voice') },
        { text: 'Место', onPress: () => console.log('Add location') },
        { text: 'Отмена', style: 'cancel' }
      ]
    );
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'photo': return 'photo';
      case 'video': return 'video';
      case 'audio': return 'waveform';
      case 'text': return 'text.justify';
      case 'voice': return 'mic';
      case 'geo': return 'location';
      default: return 'heart';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Семейные воспоминания
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Сохраните драгоценные моменты
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.childrenSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Ваши дети
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {children.map((child) => (
            <TouchableOpacity key={child.id} style={styles.childCard}>
              <View style={styles.childAvatar}>
                <IconSymbol name="person.circle.fill" size={50} color="#4A90E2" />
              </View>
              <ThemedText style={styles.childName}>{child.name}</ThemedText>
              <ThemedText style={styles.childAge}>
                {new Date().getFullYear() - new Date(child.birthDate).getFullYear()} лет
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.memoriesSection}>
        <View style={styles.memoriesHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Последние воспоминания
          </ThemedText>
          <TouchableOpacity onPress={addMemory} style={styles.addButton}>
            <IconSymbol name="plus.circle.fill" size={30} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {memories.map((memory) => (
          <TouchableOpacity key={memory.id} style={styles.memoryCard}>
            <View style={styles.memoryIcon}>
              <IconSymbol 
                name={getMemoryIcon(memory.type)} 
                size={24} 
                color="#4A90E2" 
              />
            </View>
            <View style={styles.memoryContent}>
              <ThemedText style={styles.memoryTitle}>{memory.title}</ThemedText>
              <ThemedText style={styles.memoryDate}>
                {new Date(memory.date).toLocaleDateString('ru-RU')}
              </ThemedText>
              {memory.location && (
                <View style={styles.locationContainer}>
                  <IconSymbol name="location" size={12} color="#666" />
                  <ThemedText style={styles.memoryLocation}>
                    {memory.location}
                  </ThemedText>
                </View>
              )}
              <View style={styles.childrenTags}>
                {memory.childIds.map((childId) => {
                  const child = children.find(c => c.id === childId);
                  return child ? (
                    <View key={childId} style={styles.childTag}>
                      <ThemedText style={styles.childTagText}>
                        {child.name}
                      </ThemedText>
                    </View>
                  ) : null;
                })}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <TouchableOpacity style={styles.floatingButton} onPress={addMemory}>
        <IconSymbol name="plus" size={30} color="white" />
      </TouchableOpacity>
    </ScrollView>
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
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  childrenSection: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 15,
    fontWeight: '600',
  },
  childCard: {
    alignItems: 'center',
    marginRight: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  childAvatar: {
    marginBottom: 8,
  },
  childName: {
    fontWeight: '600',
    fontSize: 16,
  },
  childAge: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  memoriesSection: {
    padding: 20,
    paddingTop: 0,
  },
  memoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    padding: 5,
  },
  memoryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  memoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  memoryContent: {
    flex: 1,
  },
  memoryTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  memoryDate: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  memoryLocation: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  childrenTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  childTag: {
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
  },
  floatingButton: {
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
});
