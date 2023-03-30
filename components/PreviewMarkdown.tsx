import { Badge, Text, Title } from "@mantine/core";
import parse from 'html-react-parser';

interface Props {
    body: string | null,
    coverImage?: File | string | null,
    tags: string[],
    title: string,
}

export default function PreviewMarkdown(props: Props) {
    return (
        <>

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