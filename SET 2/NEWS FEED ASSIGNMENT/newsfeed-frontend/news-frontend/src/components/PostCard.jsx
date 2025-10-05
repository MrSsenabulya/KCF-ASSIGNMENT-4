import React from 'react';
import { Card, Image, Text, Button, Badge, Group, Skeleton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api.js';

function PostCard({ post, slug, postId }) {
  const navigate = useNavigate();

  // Validate post data
  if (!post) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Skeleton height={200} mb="md" />
        <Skeleton height={20} mb="xs" />
        <Skeleton height={16} mb="md" />
        <Skeleton height={14} mb="md" />
        <Skeleton height={32} />
      </Card>
    );
  }

  // Get image URL with fallback
  const getImageUrl = () => {
    if (post.coverImage?.data?.attributes?.url) {
      return API_CONFIG.MEDIA_BASE_URL + post.coverImage.data.attributes.url;
    }
    return 'https://via.placeholder.com/600x400.png?text=No+Cover+Image';
  };

  // Get post title with fallback
  const getTitle = () => {
    return post.title || 'Untitled Post';
  };

  // Get category with fallback
  const getCategory = () => {
    return post.category || 'Uncategorized';
  };

  // Get excerpt with fallback
  const getExcerpt = () => {
    if (post.excerpt) {
      return post.excerpt;
    }
    if (post.content) {
      // Handle both string and array content
      const contentText = Array.isArray(post.content) 
        ? post.content.map(block => block.text || block).join(' ')
        : post.content;
      return contentText.substring(0, 150) + '...';
    }
    return 'No excerpt available';
  };

  // Get author with fallback
  const getAuthor = () => {
    return post.author || 'Unknown Author';
  };

  // Handle read more click - navigate using post ID or slug
  const handleReadMore = () => {
    // Use post ID if available, otherwise use slug
    const routeParam = postId || slug;
    navigate(`/news/${routeParam}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Cover Image */}
      <Card.Section>
        <Image
          src={getImageUrl()}
          height={160}
          alt={getTitle()}
          style={{ objectFit: 'cover' }}
        />
      </Card.Section>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title and Category */}
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500} size="lg" lineClamp={2} style={{ flex: 1 }}>
            {getTitle()}
          </Text>
          <Badge color="pink" variant="light" size="sm">
            {getCategory()}
          </Badge>
        </Group>

        {/* Excerpt */}
        <Text size="sm" color="dimmed" lineClamp={3} mb="md" style={{ flex: 1 }}>
          {getExcerpt()}
        </Text>

        {/* Author */}
        <Text size="xs" color="gray" mb="md">
          By: {getAuthor()}
        </Text>

        {/* Read More Button */}
        <Button 
          variant="light" 
          color="blue" 
          fullWidth 
          radius="md" 
          onClick={handleReadMore}
          style={{ marginTop: 'auto' }}
        >
          Read More
        </Button>
      </div>
    </Card>
  );
}

export default PostCard;