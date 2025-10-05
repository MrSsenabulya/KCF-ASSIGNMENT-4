import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Loader, Alert, Card, Skeleton, Button, Group } from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconCalendar, IconUser } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG, createAuthenticatedRequest } from '../config/api.js';
import { marked } from 'marked';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching post with ID/slug:', id);
        
        // Create authenticated axios instance
        const authenticatedAxios = createAuthenticatedRequest(axios);
        
        let response;
        
        // Try to fetch by ID first (if it's a number)
        if (!isNaN(id)) {
          console.log('Fetching by ID:', id);
          try {
            response = await authenticatedAxios.get(`/posts/${id}?populate=*`);
          } catch (err) {
            // If ID fetch fails, try fetching all posts and find by ID
            console.log('ID fetch failed, trying to find in all posts');
            const allPostsResponse = await authenticatedAxios.get('/posts?populate=*');
            const posts = allPostsResponse.data.data || [];
            const foundPost = posts.find(p => p.id == id);
            if (foundPost) {
              response = { data: foundPost };
            } else {
              throw new Error('Post not found');
            }
          }
        } else {
          // If not a number, treat as slug and search by title
          console.log('Fetching by slug:', id);
          const slugTitle = id.replace(/-/g, ' ');
          const query = `?filters[title][$contains]=${encodeURIComponent(slugTitle)}&populate=*`;
          response = await authenticatedAxios.get(`/posts${query}`);
        }
        
        const data = response.data;
        console.log('Post response:', data);
        
        // Handle different response structures
        let postData;
        if (data.data) {
          // Array response (from search)
          if (Array.isArray(data.data) && data.data.length > 0) {
            postData = data.data[0];
          } else if (data.data.attributes) {
            // Single object with attributes
            postData = data.data;
          } else {
            // Single object without attributes
            postData = data.data;
          }
        } else {
          postData = data;
        }
        
        // Extract the actual post data
        const actualPost = postData.attributes || postData;
        
        console.log('Extracted post data:', actualPost);
        
        if (actualPost && actualPost.title) {
          setPost(actualPost);
        } else {
          setError('Post not found.');
        }

      } catch (err) {
        console.error('Error fetching post:', err);
        
        if (err.response?.status === 401) {
          setError('Authentication failed. Please check your API token.');
        } else if (err.response?.status === 403) {
          setError('Access denied. Please check your API token permissions.');
        } else if (err.response?.status === 404) {
          setError('Post not found.');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Cannot connect to Strapi server. Please check your connection.');
        } else {
          setError(`Failed to fetch post details: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Container size="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Skeleton height={40} mb="md" />
        <Skeleton height={20} mb="xl" />
        <Skeleton height={300} mb="md" />
        <Skeleton height={200} mb="md" />
        <Skeleton height={100} />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container size="md" style={{ paddingTop: '2rem' }}>
        <Alert icon={<IconAlertCircle />} title="Error" color="red" mb="md">
          {error}
        </Alert>
        <Button 
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate('/news')}
          variant="light"
        >
          Back to News Feed
        </Button>
      </Container>
    );
  }

  // No post found
  if (!post) {
    return (
      <Container size="md" style={{ paddingTop: '2rem' }}>
        <Alert color="blue" mb="md">
          Post not found.
        </Alert>
        <Button 
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate('/news')}
          variant="light"
        >
          Back to News Feed
        </Button>
      </Container>
    );
  }

  // Render content safely
  const renderContent = () => {
    if (!post.content) return <Text>No content available.</Text>;
    
    try {
      // Handle different content formats
      let contentText;
      if (Array.isArray(post.content)) {
        contentText = post.content.map(block => {
          if (typeof block === 'string') return block;
          if (block.text) return block.text;
          if (block.children) {
            return block.children.map(child => child.text || child).join('');
          }
          return '';
        }).join('\n\n');
      } else {
        contentText = post.content;
      }
      
      // Parse markdown if it looks like markdown
      if (contentText.includes('**') || contentText.includes('*') || contentText.includes('#')) {
        return <div dangerouslySetInnerHTML={{ __html: marked(contentText) }} />;
      }
      
      // Otherwise render as plain text with line breaks
      return contentText.split('\n').map((line, index) => (
        <Text key={index} mb="sm">{line}</Text>
      ));
    } catch (err) {
      console.error('Error rendering content:', err);
      return <Text>{post.content}</Text>;
    }
  };

  return (
    <Container size="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Back Button */}
      <Button 
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => navigate('/news')}
        variant="light"
        mb="xl"
      >
        Back to News Feed
      </Button>

      {/* Post Title */}
      <Title order={1} mb="md">{post.title}</Title>
      
      {/* Post Meta */}
      <Group mb="xl" gap="lg">
        <Group gap="xs">
          <IconUser size={16} color="gray" />
          <Text size="sm" color="dimmed">By {post.author || 'Unknown Author'}</Text>
        </Group>
        <Group gap="xs">
          <IconCalendar size={16} color="gray" />
          <Text size="sm" color="dimmed">
            {post.category || 'Uncategorized'}
          </Text>
        </Group>
      </Group>

      {/* Cover Image */}
      {post.coverImage?.data?.attributes?.url && (
        <Card.Section mb="xl">
          <img 
            src={`${API_CONFIG.MEDIA_BASE_URL}${post.coverImage.data.attributes.url}`} 
            alt={post.title} 
            style={{ 
              width: '100%', 
              maxHeight: '400px', 
              objectFit: 'cover',
              borderRadius: '8px'
            }} 
          />
        </Card.Section>
      )}

      {/* Post Content */}
      <div style={{ lineHeight: 1.8, fontSize: '16px' }}>
        {renderContent()}
      </div>
    </Container>
  );
}

export default SinglePost;