import { FileInput, Paper, Text, TextInput, Title, Checkbox, Textarea, ColorInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import styles from "../styles/profile.module.scss";

interface Form {
    name: string;
    email: string;
    username: string;
    profileImage: File | null;
    bio: string;
    websiteUrl: string;
    location: string;
    education: string;
    work: string;
    brandingColor: string;
}

export default function Profile() {

    const { register, handleSubmit, control, formState, watch } = useForm<Form>({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            profileImage: null,
            bio: "",
            websiteUrl: "",
            location: "",
            education: "",
            work: "",
            brandingColor: "",
        },
    });

    return (
        <div >
            <form action="">
                <div className={styles.container}>
                    <Paper shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>User</Title>
                        <TextInput label="Name" placeholder="Your Name" {...register("name")} />
                        <TextInput label="Email" placeholder="Your Email" {...register("email")} />
                        <TextInput label="Username" placeholder="Your Username" {...register("username")} />
                        <Checkbox label="Display email on profile" />
                        {/* <FileInput label="Profile Image" {...register("profileImage")} /> */}
                    </Paper>
                    <Paper shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>Basic</Title>
                        <TextInput maxLength={100} label="Website url" placeholder="Your website url" {...register("websiteUrl")} />
                        <TextInput maxLength={100} label="Location" placeholder="Your location" {...register("location")} />
                        <Textarea label="Bio" placeholder="Your bio" {...register("bio")} />
                    </Paper>
                    <Paper shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>Work</Title>
                        <TextInput maxLength={100} label="Work" placeholder="Where did you go to school ?" {...register("work")} />
                        <TextInput maxLength={100} label="Education" placeholder="What do you do ?" {...register("education")} />
                    </Paper>
                    <Paper shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>Branding</Title>
                        <Text weight="bold">Branding color</Text>
                        <Text>Used for backgrounds, borders etc.</Text>
                        <ColorInput label="Branding color" placeholder="Your brandingColor" />
                    </Paper>
                </div>
            </form>
        </div>
    )
}