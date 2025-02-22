import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Loading from '../components/Loading';
import { supabase } from '../lib/supabase';
import Loading from '../components/Loading';
const StartPage = () => {
    const [session, setSession] = useState(null);


    useEffect(() => {
   
        supabase.auth.onAuthStateChange((_event, session) => {
            //   setSession(session)
            console.log('got session');
            setSession(session);
            if (session) {
                router.replace("/home");
            } else {
                console.log("no user");
                router.replace('/welcome')
            }
        })
      }, []);

      if(!session) return null;
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
      </View>
  )
}

export default StartPage