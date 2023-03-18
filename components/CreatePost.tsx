import { FileInput, MultiSelect, TextInput } from "@mantine/core";
import { HiOutlineHashtag } from "react-icons/hi";

export default function CreatePost() {
    const tags = Array.from({ length: 10 }, (_, i) => ({
        value: `tag-${i}`,
        label: `Tag ${i}`,
    }));
    return (
        <>
            <FileInput placeholder="Upload a cover image" accept="image/jpeg image/png image/svg+xml image/webp" size="md" />
            <TextInput placeholder="New post title here..." withAsterisk size="xl" />
            <MultiSelect icon={<HiOutlineHashtag />} data={tags} placeholder="Add up to 4 tags" size="md" clearable maxDropdownHeight={160}
                maxSelectedValues={4} transitionProps={{
                    duration: 150, transition: "pop-top-left"
                }} />
            
        </>
    );
}
