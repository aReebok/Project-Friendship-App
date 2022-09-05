import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorageFunctions for User tord information across screens: role, email

export const _storeUserRole = async (role) => {
    try {
      await AsyncStorage.setItem(
        'ROLE',
        role
      );
    } catch (error) {
      // Error saving data
      console.log("There was an error saving your sid to AsyncStorage.")
    }
  };
  
export const _retrieveUserRole = async () => {
    try {
      return await AsyncStorage.getItem('ROLE');
    } catch (error) {
      // Error retrieving data
      console.log("There was an error in retriving role from AsyncStorage");
      return;
    }
  };

export const _storeUserEmail = async (email) => {
    try {
      await AsyncStorage.setItem(
        'EMAIL',
        email
      );
    } catch (error) {
      // Error saving data
      console.log("There was an error saving your sid to AsyncStorage.")
    }
  };
  
export const _retrieveUserEmail = async () => {
    try {
      return await AsyncStorage.getItem('EMAIL');
    } catch (error) {
      // Error retrieving data
      console.log("There was an error in retriving email from AsyncStorage");
      return;
    }
  };