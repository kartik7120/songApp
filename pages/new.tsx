import CreatePost from "@/components/CreatePost";
import { Badge, Collapse, Group, Paper, Table, Text, Title, Transition } from "@mantine/core";
import styles from "../styles/new.module.scss";
import { useRef, useEffect, useState, useReducer } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import CreatePostMarkDownTable from "@/components/CreatePostMarkDownTable";
import FullEditor from "@/components/FullEditor";

export default function NewPost() {
    return (
        <FullEditor/>
    )
}