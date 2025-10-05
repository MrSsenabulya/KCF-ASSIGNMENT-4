import { AppShell, Burger, Group, Skeleton, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

function AppLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
            <Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Title order={3}>Eric's NewsApp</Title>
            </Link>
            {/* Optional: Navigation items or user profile could go here */}
            <Group>
                <Link to="/news" style={{ textDecoration: 'none', color: 'blue' }}>
                    Home
                </Link>
            </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {children} {/* This is where the NewsFeed or SinglePost pages render */}
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout;
