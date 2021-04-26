import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

import * as Notifications from 'expo-notifications';

export interface PLantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string
  };
  hour: string;
  dateTimeNotification: Date;
}

export interface StoragePLantProps {
  [id: string]: {
    data: PLantProps;
    notificationId: string;
  }
}

export async function savePlant(plant: PLantProps): Promise<void> {
  try {
    const nexTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const {times, repeat_every} = plant.frequency;

    if(repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nexTime.setDate(now.getDate() + interval);
    } else {
      nexTime.setDate(nexTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nexTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        }
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      }
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPLants = data ? (JSON.parse(data) as StoragePLantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    } 

    await AsyncStorage.setItem('@plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPLants
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlant(): Promise<PLantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePLantProps) : {};

    const plantsSorted = Object.keys(plants).map((plant) => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
      }
    })
    .sort((a, b) =>
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 -
        Math.floor(new Date(b.dateTimeNotification).getTime() / 1000 )
      )
    )

    return plantsSorted;

  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlant(id: string) {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePLantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

  delete plants[id];
  
  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));

}