
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface Memory {
  id: string;
  title: string;
  description?: string;
  type: 'photo' | 'video' | 'audio' | 'text' | 'voice' | 'geo';
  date: string;
  childIds: string[];
  location?: string;
  tags?: string[];
}

interface Child {
  id: string;
  name: string;
}

interface MemoryCardProps {
  memory: Memory;
  children: Child[];
  onPress?: () => void;
  onMorePress?: () => void;
}

export function MemoryCard({ memory, children, onPress, onMorePress }: MemoryCardProps) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return '#4CAF50';
      case 'video': return '#2196F3';
      case 'audio': return '#FF9800';
      case 'text': return '#9C27B0';
      case 'voice': return '#F44336';
      case 'geo': return '#795548';
      default: return '#4A90E2';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.icon, { backgroundColor: `${getTypeColor(memory.type)}20` }]}>
          <IconSymbol 
            name={getMemoryIcon(memory.type)} 
            size={24} 
            color={getTypeColor(memory.type)} 
          />
        </View>
        <View style={styles.info}>
          <ThemedText style={styles.title}>{memory.title}</ThemedText>
          <ThemedText style={styles.date}>
            {new Date(memory.date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </ThemedText>
        </View>
        {onMorePress && (
          <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
            <IconSymbol name="ellipsis" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {memory.description && (
        <ThemedText style={styles.description}>{memory.description}</ThemedText>
      )}

      {memory.location && (
        <View style={styles.locationContainer}>
          <IconSymbol name="location" size={14} color="#666" />
          <ThemedText style={styles.locationText}>{memory.location}</ThemedText>
        </View>
      )}

      {memory.tags && memory.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {memory.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <ThemedText style={styles.tagText}>#{tag}</ThemedText>
            </View>
          ))}
          {memory.tags.length > 3 && (
            <ThemedText style={styles.moreTagsText}>+{memory.tags.length - 3}</ThemedText>
          )}
        </View>
      )}

      <View style={styles.childrenContainer}>
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
    color: '#1a1a1a',
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  description: {
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
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: '500',
  },
  moreTagsText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
  },
  childrenContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  childTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  childTagText: {
    color: '#2e7d32',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});
