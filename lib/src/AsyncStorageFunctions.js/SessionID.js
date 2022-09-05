import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeSessionID = async (sid) => {
    try {
      await AsyncStorage.setItem(
        'SID',
        sid
      );
    } catch (error) {
      // Error saving data
      console.log("There was an error saving your sid to AsyncStorage.")
    }
  };
  
export const _retrieveSessionID = async () => {
    try {
      return await AsyncStorage.getItem('SID');
    } catch (error) {
      // Error retrieving data
      console.log("There was an error in retriving given sid from AsyncStorage");
      return;
    }
  };