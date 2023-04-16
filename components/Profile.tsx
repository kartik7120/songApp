import { FileInput, Paper, Text, TextInput, Title, Checkbox, Textarea, ColorInput, Button, Alert } from "@mantine/core";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/profile.module.scss";
import { trpc } from "@/utils/trpc";
import { auth } from "@/firebase";
import { CgDanger } from "react-icons/cg";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";

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

    const user = auth.currentUser;

    const { register, handleSubmit, control, formState: { errors, isLoading, isSubmitting }, watch, setValue ,setError} = useForm<Form>({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            profileImage: null,
            bio: "",
            websiteUrl: undefined,
            location: "",
            education: "",
            work: "",
            brandingColor: "",
        },
    });

    const { data } = trpc.user.getUserInfo.useQuery({
        userUid: user?.uid!,
    });

    const { mutate } = trpc.user.uploadUserInfo.useMutation();

    const onsubmit: SubmitHandler<Form> = (data) => {
        mutate({
            name: data.name,
            email: data.email,
            username: data.username,
            bio: data.bio,
            websiteUrl: data.websiteUrl,
            location: data.location,
            education: data.education,
            work: data.work,
            brandingColor: data.brandingColor,
            userUid: user?.uid!,
        });
    };

    const onError: SubmitErrorHandler<Form> = (errors: any) => {
        console.log(errors);
    };

    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("email", data.email);
            setValue("username", data.username);
            setValue("bio", data.bio);
            setValue("websiteUrl", data.websiteUrl);
            setValue("location", data.location);
            setValue("education", data.education);
            setValue("work", data.work);
            setValue("brandingColor", data.brandingColor);
        }
    }, [data, setValue]);

    return (
        <div >
            <form onSubmit={handleSubmit(onsubmit, onError)}>
                <div className={styles.container}>
                    <Paper mb="lg" shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>User</Title>
                        <TextInput label="Name" placeholder="Your Name" {...register("name")} />
                        <TextInput label="Email" placeholder="Your Email" {...register("email")} />
                        <TextInput label="Username" placeholder="Your Username" {...register("username")} />
                        <Checkbox label="Display email on profile" />
                        {/* <FileInput label="Profile Image" {...register("profileImage")} /> */}
                    </Paper>
                    <Paper mb="lg" shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>Basic</Title>
                        <TextInput maxLength={100} label="Website url" placeholder="Your website url" {...register("websiteUrl")} />
                        <TextInput maxLength={100} label="Location" placeholder="Your location" {...register("location")} />
                        <Textarea label="Bio" placeholder="Your bio" {...register("bio")} />
                    </Paper>
                    <Paper mb="lg" shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>Work</Title>
                        <TextInput maxLength={100} label="Work" placeholder="Where did you go to school ?" {...register("work")} />
                        <TextInput maxLength={100} label="Education" placeholder="What do you do ?" {...register("education")} />
                    </Paper>
                    <Paper mb="lg" shadow="md" p="md" withBorder className={styles.paperClass}>
                        <Title order={2}>Branding</Title>
                        <Text weight="bold">Branding color</Text>
                        <Text>Used for backgrounds, borders etc.</Text>
                        <ColorInput label="Branding color" placeholder="Your brandingColor" />
                    </Paper>
                    <Paper p="md" withBorder>
                        <Button loading={isSubmitting} disabled={isLoading} type="submit" variant="filled" color="violet" fullWidth>
                            Save Information
                        </Button>
                    </Paper>
                </div>
            </form>
            {
                Object.keys(errors).length > 0 &&
                <Alert icon={<CgDanger />} color="red"
                    style={{ marginBottom: "2em", marginTop: "2em", display: "block" }} title="Bummer">
                    <p>There are some errors in your form. Please fix them before submitting.</p>
                    <ErrorMessage errors={errors} name="errorFeild" render={({ message }) => <Text weight="bold">{message}</Text>} />
                </Alert>
            }
        </div>
    )
}