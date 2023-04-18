import { Button, Title } from "@mantine/core";
import styles from "../../styles/listings.module.scss";

export default function Listenings() {
    return (
        <>
            
            <div className={styles.container}>
                <div className={styles.upperContainer}>
                    <Title order={1}>Listings</Title>
                    <Button variant="outline" color="violet">
                        Create new listing
                    </Button>
                </div>
            </div>
        </>
    )
}