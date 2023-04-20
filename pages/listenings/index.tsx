import { Button, Modal, MultiSelect, TextInput, Title } from "@mantine/core";
import styles from "../../styles/listings.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { auth } from "@/firebase";
import { Textarea } from '@mantine/core';
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { ErrorMessage } from "@hookform/error-message";
import ListeningsPreview from "@/components/ListeningsPreview";

interface Form {
    title: string;
    description: string;
    tags: string[];
}

export default function Listenings() {
    const [opened, { open, close }] = useDisclosure(false);
    const user = auth.currentUser;

    const { register, control, formState: { errors, isSubmitting }, handleSubmit } = useForm<Form>({
        defaultValues: {
            title: '',
            description: '',
            tags: [],
        }
    });

    const { mutate } = trpc.list.uploadListening.useMutation();
    const utils = trpc.useContext();
    const { data } = trpc.list.getAllListenings.useInfiniteQuery({
        limit: 10,
    }, {
        getNextPageParam: (lastPage) => {
            if (lastPage.length < 10) return undefined;
            return lastPage[lastPage.length - 1].createdAt;
        },
        onSuccess(data) {
            console.log(data);
        },
        onError(error) {
            console.error(error);
        },
    });

    const onSubmit: SubmitHandler<Form> = (data: Form) => {
        mutate({
            title: data.title,
            description: data.description,
            tags: data.tags,
            avatar: user?.photoURL || '',
            username: user?.displayName || '',
            userId: user?.uid!,
        });
        utils.list.getAllListenings.invalidate();
    }

    const onError: SubmitErrorHandler<Form> = (errors: any) => {
        console.log(errors);
    }

    return (
        <>
            <Modal opened={opened} onClose={close} padding="lg" size="lg" centered title="Create Listening">
                <form className={styles.formClass} onSubmit={handleSubmit(onSubmit, onError)}>
                    <Controller name="title" control={control} rules={{ required: true }} render={({ field }) => (
                        <TextInput {...field} label="Title" placeholder="Title" size="lg" required />
                    )} />
                    <Controller name="description" control={control} rules={{ required: true }} render={({ field }) => (
                        <Textarea required {...field} label="Description" placeholder="Description" autosize size="lg" minRows={3} />
                    )} />
                    <Controller name="tags" control={control} rules={{ required: true }} render={({ field }) => (
                        <MultiSelect required {...field} data={[
                            { label: 'React', value: 'react' },
                            { label: 'Next.js', value: 'next.js' },
                            { label: 'Node.js', value: 'node.js' },
                            { label: 'TypeScript', value: 'typescript' },
                            { label: 'JavaScript', value: 'javascript' },
                            { label: 'GraphQL', value: 'graphql' },
                            { label: 'Firebase', value: 'firebase' },
                            { label: 'MongoDB', value: 'mongodb' },
                            { label: 'MySQL', value: 'mysql' },
                            { label: 'PostgreSQL', value: 'postgresql' },
                            { label: 'Docker', value: 'docker' },
                        ]} label="Tags" clearable placeholder="Tags" size="lg" />
                    )} />
                    <Button loading={isSubmitting} type="submit" variant="outline" color="violet">
                        Create
                    </Button>
                    {Object.keys(errors).length > 0 &&
                        <ErrorMessage errors={errors} name="title" render={({ message }) => <p>{message}</p>} />
                    }
                </form>
            </Modal>
            <div className={styles.container}>
                <div className={styles.upperContainer}>
                    <Title order={1}>Listings</Title>
                    <Button onClick={open} variant="outline" color="violet">
                        Create new listing
                    </Button>
                </div>
                <div className={styles.listContainer}>
                    {data?.pages.map((item) => (
                        item.map((item) => (
                            <ListeningsPreview key={item.id} id={item.id} {...item} />
                        ))
                    ))}
                </div>
            </div>
        </>
    )
}