import { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/services/auth/useAuth";

export default function SignIn() {
    const { SignIn, user, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!loading && user) {
        return <Redirect href="/(app)" />
    }
 
    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            await SignIn(email.trim().toLowerCase(), password);
        } catch (e: any) {
            Alert.alert("Falha no login", e?.response?.data?.message ?? "Verifique suas credenciais.")
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 12}}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Entrar</Text>
        <TextInput
        placeholder="E-mail"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
        />
        <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
        />
        <Button title={submitting ? "Entrando..." : "Entrar"}
        onPress={handleSubmit} disabled={submitting}
        />
        </View>
    );
}