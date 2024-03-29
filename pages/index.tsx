import Head from 'next/head'
import { Inter } from 'next/font/google'
import ListeningsComponent from '@/components/Listenings'
import styles from "../styles/index.module.scss";
import { Tabs } from '@mantine/core';
import PostedBlogs from '@/components/RecentlyPostedBlogs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={styles.container}>
          <div>
            <Tabs defaultValue="gallery">
              <Tabs.List>
                <Tabs.Tab value="gallery">Recently posted blogs</Tabs.Tab>
                <Tabs.Tab value="messages">Messages</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery" pt="xs">
                <PostedBlogs />
              </Tabs.Panel>

              <Tabs.Panel value="messages" pt="xs">
                Messages tab content
              </Tabs.Panel>

              <Tabs.Panel value="settings" pt="xs">
                Settings tab content
              </Tabs.Panel>
            </Tabs>
          </div>
          <div>
            <ListeningsComponent />
          </div>
        </div>
      </main>
    </>
  )
}
