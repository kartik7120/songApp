import { ActionIcon, Avatar, Button, Drawer, Group, Menu, TextInput } from "@mantine/core";
import { SiIconfinder } from "react-icons/si";
import { BsSearch } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { IoOptionsOutline } from "react-icons/io5";
import styles from "../styles/navbar.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { getHotkeyHandler } from '@mantine/hooks';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User, signOut } from "firebase/auth";

export default function Navbar() {
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
        return unsubscribe;
    }, [])

    return (
        <>
            <Drawer opened={opened} onClose={close} position="top" title="Search" size="sm" className={styles.searchButton}>
                <TextInput
                    placeholder="Search..."
                    icon={<BsSearch />}
                    variant="filled"
                    size="md"
                    width={100}
                    onKeyDown={getHotkeyHandler([
                        ['Enter', () => {
                            router.push("/search");
                        }],
                    ])}
                />
            </Drawer>
            <div className={styles.container}>
                <div className={styles.upper}>
                    <div className={styles.buttonGroup}>
                        <ActionIcon className={styles.optionsButton} size={50} component="button">
                            <IoOptionsOutline size={30} />
                        </ActionIcon>
                        <Link href={'/'}>
                            <ActionIcon style={{ marginRight: "1em" }}>
                                <SiIconfinder size={50} />
                            </ActionIcon>
                        </Link>
                    </div>
                    <TextInput
                        placeholder="Search..."
                        icon={<BsSearch />}
                        variant="filled"
                        size="md"
                        width={100}
                        className={styles.textInputClass}
                        onKeyDown={getHotkeyHandler([
                            ['Enter', () => {
                                router.push("/search");
                            }],
                        ])}
                    />
                </div>
                <div className={styles.lower}>
                    {user ? <Link href={'/new'}>
                        <Button className={styles.button} type="button" variant="outline" color="violet">
                            Create Post
                        </Button>
                    </Link> :
                        <>
                            <Link href={'/entry'}>
                                <Button className={styles.button} type="button" variant="outline" color="violet">
                                    Create Account
                                </Button>
                            </Link>
                            <Link href={`/entry?login=true`}>
                                <Button className={styles.button} type="button" variant="subtle" color="violet">
                                    Log in
                                </Button>
                            </Link>
                        </>
                    }
                    <ActionIcon onClick={open} className={styles.searchButton}>
                        <BiSearchAlt />
                    </ActionIcon>
                    <ActionIcon >
                        <AiOutlineBell size={30} />
                    </ActionIcon>
                    {user ? <Menu width={200} position="bottom">
                        <Menu.Target>
                            <ActionIcon>
                                <Avatar radius="xl" src={user.photoURL} size="md" />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => router.push(`/${user.uid}/profile`)}>
                                {user.displayName}
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item>
                                Dashboard
                            </Menu.Item>
                            <Menu.Item>
                                Create Post
                            </Menu.Item>
                            <Menu.Item>
                                Reading List
                            </Menu.Item>
                            <Link href="/settings" style={{ textDecoration: "none" }}>
                                <Menu.Item>
                                    Settings
                                </Menu.Item>
                            </Link>
                            <Menu.Divider />
                            <Menu.Item color="red" onClick={() => {
                                signOut(auth).then(() => console.log('signed out')).catch((error) => {
                                    console.log('error signing out', error);
                                })
                            }}>Sign out</Menu.Item>
                        </Menu.Dropdown>
                    </Menu> : ""}
                </div>
            </div>
        </>
    );
}