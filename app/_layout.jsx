import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const _layout = () => {


    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
        
      )
    }
    
    const MainLayout = ()=>{
        const {setAuth} = useAuth();
        const router = useRouter();
    
        useEffect(() => {
            supabase.auth.onAuthStateChange((_event, session) => {
            console.log('session: ', session?.user?.id);
            if (session) {
                setAuth(session?.user);
                router.replace("/tabs");
            } else {
                setAuth(null);
                router.replace('/welcome')
            }
            })
        }, []);


  return (
    <Stack 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
            name="login"
        />
    </Stack>
  )
}

export default _layout