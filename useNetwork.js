import React from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetwork = () => {
  const [ isOnline, setIsOnline ] = React.useState()

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsOnline(state.isConnected)
    });

    return () => {
      unsubscribe();
    }
  }, [])

  return {
    isOnline
  }
}

export {useNetwork}