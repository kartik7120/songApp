import { Alert, Badge, Button, Paper, Text, Title } from "@mantine/core";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import styles from "../styles/entry.module.scss";
import { auth, provider, googleProvider } from "../firebase";
import {
    GithubAuthProvider, signInWithPopup, signOut, signInWithRedirect,
    getRedirectResult, GoogleAuthProvider
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiAlertCircle } from "react-icons/fi";

export default function Entry() {

    const router = useRouter();
    const [user, setUser] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('user signed in');
                setUser(user);
            } else {
                setUser(null);
                console.log('user not signed in');
            }
        })
        return unsubscribe;
    }, [])

    function handleGithubClick() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential && credential.accessToken;
                const user = result.user;
                router.push('/');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
                console.log(`error code = ${errorCode}`);
                console.log(`error message = ${errorMessage}`);
                console.log(`email = ${email}`);
                console.log(`credential = ${credential}`);
                setError(error);
            })
        console.log("Github clicked");
    }

    function handleGoogleClick() {
        signInWithPopup(auth, googleProvider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential && credential.accessToken;
            const user = result.user;
            router.push('/');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(`error code = ${errorCode}`);
            console.log(`error message = ${errorMessage}`);
            console.log(`email = ${email}`);
            console.log(`credential = ${JSON.stringify(credential)}`);
            setError(error);
        })
        console.log("Google clicked");
    }

    return (
        <div className={styles.wrapper}>
            <Paper shadow="md" p="md" withBorder style={{ width: "640px" }}>
                <div className={styles.upperContainer}>
                    <Title>Welcome to Dev Community</Title>
                    <Text>DEV Community is a community of 1,037,803 amazing developers</Text>
                </div>
                <div className={styles.btnContainer}>
                    <Button color="gray" size="lg" fullWidth leftIcon={<FcGoogle />}
                        onClick={handleGoogleClick}>{router.query.login ? "Continue" : "Sign up"} with Google</Button>
                    <Button color="dark" size="lg" onClick={handleGithubClick}
                        fullWidth leftIcon={<BsGithub color="white" />}>{router.query.login ? "Continue" : "Sign up"} with GitHub</Button>
                    <Button color="dark" size="lg" fullWidth
                        onClick={() => {
                            signOut(auth).then(() => console.log('signed out')).catch((error) => {
                                console.log('error signing out', error);
                            })
                        }}>Sign out</Button>
                </div>
                {error
                    ?
                    <Alert color="red" icon={<FiAlertCircle />} title="This is a test alert" style={{ marginTop: "1rem" }}>
                        <Text>{error.errorCode}</Text>
                    </Alert>
                    : ""}
            </Paper>
        </div>
    )
}