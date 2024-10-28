import React from 'react';
import { Image, Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors.ts';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import HomeIcon from '@/assets/images/Home.png';
import CalendarIcon from '@/assets/images/Schedule.png';
import SettingsIcon from '@/assets/images/Settings.png';
import CategoriesIcon from '@/assets/images/Categories.png'; // Import the new icon
import NewAccountIcon from '@/assets/images/plus.png'; // Import the new icon

// Custom component για την εμφάνιση των εικόνων
function TabBarIcon({ source, color }: { source: any; color?: string }) {
  return <Image source={source} style={{ width: 28, height: 28, tintColor: color }} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b8193', // Χρώμα όταν το tab είναι ενεργό
        tabBarStyle: { 
          height: 100, // Αυξάνουμε το ύψος του tab bar
          paddingBottom: 25, // Αυξάνουμε το κάτω περιθώριο
          paddingTop: 15, // Αυξάνουμε το πάνω περιθώριο για καλύτερη απόσταση από τον τίτλο
        },
        tabBarLabelStyle: {
          marginTop: 10, // Αυξάνει την απόσταση μεταξύ εικονιδίου και τίτλου
          fontSize: 14,  // Μέγεθος κειμένου για τον τίτλο
        },
    
        headerShown: useClientOnlyValue(false, true),
         headerLeft: () => (
           <Link href="/modal" asChild>
             <Pressable>
               {({ pressed }) => (
                 <Image
                   source={require('@/assets/images/trans.png')} // Χρήση της σχετικής διαδρομής για το info icon
                   style={{ width: 50, height: 50, opacity: pressed ? 0.5 : 1, padding: 25, marginLeft: 15 }}
                 />
               )}
             </Pressable>
           </Link>

         ),
        headerStyle: {
          height: 120, // Αυξάνουμε το ύψος του header
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Aρχική',
          tabBarIcon: ({ color }) => <TabBarIcon source={HomeIcon} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          
          title: 'Κατηγορίες',
          tabBarIcon: ({ color }) => <TabBarIcon source={CategoriesIcon} color={color}
           />, // Use the new icon
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Ημερολόγιο',
          tabBarIcon: ({ color }) => <TabBarIcon source={CalendarIcon} color={color}
           />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ρυθμίσεις',
          tabBarIcon: ({ color }) => <TabBarIcon source={SettingsIcon} color={color} />,
        }}
      />
    </Tabs>
  );
}