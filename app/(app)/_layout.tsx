import { Slot, Redirect } from "expo-router";
// import { useAuth } from "@/services/auth/useAuth";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
    // const { user, loading } = useAuth();

    if (true) {
        return (
            <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator/>
            </View>
        );
    }

    if (false) {
        return <Redirect href="/(auth)/login"/>
    }

    return <Slot/>;
}