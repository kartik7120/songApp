import { Badge, Image, Text, Title } from "@mantine/core";
import parse from 'html-react-parser';

interface Props {
    body: string | null,
    coverImage?: File | string | null,
    tags: string[],
    title: string,
    blogImageUrl?: string | null,
}

export default function PreviewMarkdown(props: Props) {
    return (
        <>
            <Image withPlaceholder
                src={props.blogImageUrl || null}
                width={1000} height={420} alt="Mantine" />
            <Title order={1} >{props.title}</Title>
            {props.tags.map((tag, index) => (
                <Badge key={index} color="blue" variant="filled" size="md">
                    {tag}
                </Badge>
            ))}

            {props.body && parse(props.body)}
        </>
    )
}