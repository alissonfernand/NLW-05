import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

export interface PLantProps {
  id: string,
  name: string,
  about: string,
  water_tips: string,
  photo: string,
  environments: [string],
  frequency: {
    times: number,
    repeat_every: string
  },
  dateTimeNotification: Date,
}

interface StoragePLantProps {
  [id: string]: {
    data: PLantProps;
  }
}

export async function savePlant(plant: PLantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPLants = data ? (JSON.parse(data) as StoragePLantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
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