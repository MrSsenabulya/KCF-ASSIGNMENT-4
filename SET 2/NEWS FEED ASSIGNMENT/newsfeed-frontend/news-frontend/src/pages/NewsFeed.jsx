import React, { useState, useEffect } from 'react';
import { Container, Title, Loader, Alert, TextInput, Grid, Pagination, Text, Skeleton } from '@mantine/core';
import { IconSearch, IconAlertCircle, IconNews } from '@tabler/icons-react';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';
import { API_CONFIG, createAuthenticatedRequest } from '../config/api.js';

const PAGE_SIZE = 6;

function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch posts from Strapi with pagination and search
  const fetchPosts = async (page = 1, search = '') => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching posts...');
      
      // Build query parameters for Strapi API
      let query = `?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate=*&sort=createdAt:desc`;
      
      // Add search filter if provided (search by title or category)
      if (search.trim()) {
        const encodedSearch = encodeURIComponent(search.trim());
        query += `&filters[$or][0][title][$contains]=${encodedSearch}`;
        query += `&filters[$or][1][category][$contains]=${encodedSearch}`;
        query += `&filters[$or][2][author][$contains]=${encodedSearch}`;
      }

      console.log('API Query:', query);

      // Create authenticated request
      const authenticatedAxios = createAuthenticatedRequest(axios);
      
      // Make API call to fetch posts
      const response = await authenticatedAxios.get(`/posts${query}`);
      const data = response.data;

      console.log('API Response:', data);
      console.log('Posts found:', data.data?.length || 0);

      // Set posts data
      setPosts(data.data || []);
      setTotalPages(data.meta?.pagination?.pageCount || 1);
      setTotalPosts(data.meta?.pagination?.total || 0);

    } catch (err) {
      console.error('Error fetching posts:', err);
      
      let errorMessage = 'Failed to fetch posts. ';
      
      if (err.response?.status === 401) {
        errorMessage += 'Authentication failed. Please check your API token.';
      } else if (err.response?.status === 403) {
        errorMessage += 'Access denied. Please check your API token permissions.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage += 'Cannot connect to Strapi server. Please check your connection.';
      } else if (err.response?.status === 404) {
        errorMessage += 'Posts endpoint not found. Please check your Strapi configuration.';
      } else {
        errorMessage += 'Please try again later.';
      }
      
      setError(errorMessage);
      setPosts([]);
      setTotalPages(1);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount and when page/search changes
  useEffect(() => {
    fetchPosts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Handle search input with debouncing
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton for posts
  const LoadingSkeleton = () => (
    <Grid gutter="xl">
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
          <Skeleton height={300} radius="md" />
        </Grid.Col>
      ))}
    </Grid>
  );

  // Loading state
  if (loading && posts.length === 0) {
    return (
      <Container size="lg" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Title order={1} mb="md">News Feed</Title>
        
        {/* Search Bar Skeleton */}
        <Skeleton height={40} mb="xl" />
        
        {/* Posts Grid Skeleton */}
        <LoadingSkeleton />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container size="lg" style={{ paddingTop: '2rem' }}>
        <Alert icon={<IconAlertCircle />} title="Error Loading Posts" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  // Main content
  return (
    <Container size="lg" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Header */}
      <Title order={1} mb="md" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <IconNews size={32} />
        News Feed
      </Title>

      {/* Search Bar */}
      <TextInput
        placeholder="Search by title, category, or author..."
        value={searchTerm}
        onChange={handleSearch}
        leftSection={<IconSearch size={16} />}
        mb="xl"
        size="md"
      />

      {/* Posts Grid */}
      <Grid gutter="xl">
        {posts.length > 0 ? (
          posts.map((post) => {
            // Validate post data
            if (!post) {
              console.warn('Invalid post data:', post);
              return null;
            }

            // Handle both Strapi v4 structure (with attributes) and direct structure
            const postData = post.attributes || post;
            
            // Validate that we have the required fields
            if (!postData.title) {
              console.warn('Post missing title:', post);
              return null;
            }

            // Create slug from title for URL
            const slug = postData.title 
              ? postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
              : `post-${post.id}`;

            return (
              <Grid.Col key={post.id} span={{ base: 12, md: 6, lg: 4 }}>
                <PostCard post={postData} slug={slug} postId={post.id} />
              </Grid.Col>
            );
          })
        ) : (
          <Grid.Col span={12}>
            <Alert color="blue" icon={<IconNews />}>
              {searchTerm ? `No posts found matching "${searchTerm}".` : 'No posts available.'}
            </Alert>
          </Grid.Col>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Pagination 
            total={totalPages} 
            value={currentPage} 
            onChange={handlePageChange}
            size="md"
          />
        </div>
      )}

      {/* Footer info */}
      <Text size="sm" color="dimmed" mt="xl" style={{ textAlign: 'center' }}>
        {searchTerm ? (
          `Showing ${posts.length} of ${totalPosts} posts matching "${searchTerm}" (Page ${currentPage} of ${totalPages})`
        ) : (
          `Showing ${posts.length} of ${totalPosts} posts (Page ${currentPage} of ${totalPages})`
        )}
      </Text>
    </Container>
  );
}

export default NewsFeed;