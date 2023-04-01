import { ActionIcon, Avatar, Button, Drawer, Group, TextInput } from "@mantine/core";
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

export default function Navbar() {
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();

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
                    <Link href={'/new'}>
                        <Button className={styles.button} type="button" variant="outline" color="violet">
                            Create Post
                        </Button>
                    </Link>
                    <Link href={'/entry'}>
                        <Button className={styles.button} type="button" variant="outline" color="violet">
                            Create Account
                        </Button>
                    </Link>
                    <ActionIcon onClick={open} className={styles.searchButton}>
                        <BiSearchAlt />
                    </ActionIcon>
                    <ActionIcon >
                        <AiOutlineBell size={30} />
                    </ActionIcon>
                    <ActionIcon>
                        <Avatar radius="xl" src="https://avatars.githubusercontent.com/u/25126241?v=4" size="md" />
                    </ActionIcon>
                </div>
            </div>
        </>
    );
}