import { Badge, Table } from "@mantine/core";

export default function CreatePostMarkDownTable() {
    return (
        <Table>
            <tr>
                <th>
                    Markdown
                </th>
                <th>
                    Formatted Text
                </th>
            </tr>
            <tr>
                <td>
                    <pre>
                        # Header
                        <br />
                        ...
                        <br />
                        ###### Header
                    </pre>
                </td>
                <td>
                    <pre>
                        H1 Header
                        <br />
                        ...
                        <br />
                        H6 Header
                    </pre>
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        *italics*
                        <br />
                        or
                        <br />
                        _italics_
                    </pre>
                </td>
                <td>
                    <i>italics</i>
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        **bold**
                    </pre>
                </td>
                <td>
                    <strong>
                        bold
                    </strong>
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        [Link](https://...)
                    </pre>
                </td>
                <td>
                    <a href="www.google.com">link</a>
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        * item 1
                        <br />
                        * item 2
                    </pre>
                </td>
                <td>
                    item 1
                    <br />
                    item 2
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        1. item 1
                        <br />
                        2. item 2
                    </pre>
                </td>
                <td>
                    item 1
                    <br />
                    item 2
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        &gt; quoted text
                    </pre>
                </td>
                <td>
                    |  quoted text
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        `inline code`
                    </pre>
                </td>
                <td>
                    <Badge color="gray">Inline Code</Badge>
                </td>
            </tr>
            <tr>
                <td>
                    <pre>
                        ```
                        <br />
                        code block
                        <br />
                        ```
                    </pre>
                </td>
                <td>
                    <div style={{
                        background: "black", width: 150, height: 80,
                        display: "flex", justifyContent: "center",
                        alignItems: "center", borderRadius: "10px"
                    }}>
                        <code>code block</code>
                    </div>
                </td>
            </tr>
        </Table>
    )
}