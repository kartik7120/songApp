import { ActionIcon, Avatar, Button, Group, TextInput } from "@mantine/core";
import { SiIconfinder } from "react-icons/si";
import { BsSearch } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { IoOptionsOutline } from "react-icons/io5";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <div className={styles.buttonGroup}>
                    <ActionIcon className={styles.optionsButton} size={50} component="button">
                        <IoOptionsOutline size={30} />
                    </ActionIcon>
                    <ActionIcon style={{ marginRight: "1em" }}>
                        <SiIconfinder size={50} />
                    </ActionIcon>
                </div>
                <TextInput
                    placeholder="Search..."
                    icon={<BsSearch />}
                    variant="filled"
                    size="md"
                    width={100}
                    className={styles.textInputClass}
                />
            </div>
            <div className={styles.lower}>
                <Button className={styles.button} type="button" variant="outline" color="rgb(61,75,223)">
                    Create Post
                </Button>
                <ActionIcon className={styles.searchButton}>
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
    );
}