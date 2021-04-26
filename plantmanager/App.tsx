import React, {useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';

import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PLantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    /**
     * Manipular dados ao receber uma notificação
     */
    // const subscription = Notifications.addNotificationReceivedListener(
    //  async notification => {
    //   const data =  notification.request.content.data.plant as PLantProps;
    //  }
    // )

    // return () => subscription.remove();

    /**
     * Pegar todas as notificações
     */
    // async function notifications() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    // }

    /**
     * Cancelar todas as notificações
     */
    // async function notifications() {
    //   const data = await Notifications.cancelAllScheduledNotificationsAsync()
    // }
  },[])

  if(!fontsLoaded)
  return <AppLoading/>

  return (
   <Routes />
  );
}


