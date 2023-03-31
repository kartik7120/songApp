import Blog from "@/components/Blog";
import SidePostMenu from "@/components/SidePostMenu";
import UserInfo from "@/components/UserInfo";
import styles from "../../styles/postHome.module.scss";

export default function BlogPost() {
    return (
        <div className={styles.container}>
            <SidePostMenu />
            <Blog />
            <UserInfo />
        </div>
    )
}