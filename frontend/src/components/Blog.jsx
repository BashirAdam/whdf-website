// components/Blog.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar, User, Search, Tag, ChevronRight, BookOpen, Play  } from 'lucide-react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getMediaUrl } from '../utils/mediaUrl';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await api.getPublishedBlogs();
        setBlogPosts(response || []);
      } catch (error) {
        console.log('No blog posts available');
        setBlogPosts([]);
      }
    };
    loadBlogPosts();
  }, []);

  const publishedPosts = blogPosts.filter((post) => post.status === 'published');

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(publishedPosts.map((post) => post.category))];
  const recentPosts = publishedPosts.slice(0, 3);
  const allTags = [...new Set(publishedPosts.flatMap((post) => post.tags))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? 'bg-[#d78525] hover:bg-[#d78525] text-white'
                          : 'border-[#d78525] text-[#d78525] hover:bg-[#d78525] hover:text-white'
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="md:flex">
                    {(post.image || post.video) && (
  <div className="md:w-1/3">
    {post.image ? (
      <img
        src={getMediaUrl(post.image)}
        alt={post.title}
        className="w-full h-48 md:h-full object-cover"
      />
    ) : (
      <div className="w-full h-48 md:h-full bg-gray-900 flex items-center justify-center">
        <Play className="h-16 w-16 text-white opacity-80" />
      </div>
    )}
  </div>
)}
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {post.publishDate ? formatDate(post.publishDate) : 'No date'}
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {post.author || 'Unknown'}
                            </div>
                            <Badge className="bg-[#d78525] text-white hover:bg-[#d78525]">
                              {post.category}
                            </Badge>
                          </div>
                          <CardTitle
                            dir="auto"
                            className="text-2xl hover:text-[#d78525] transition-colors cursor-pointer"
                          >
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p dir="auto" className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#d78525] hover:text-[#d78525] hover:bg-[#d78525]"
                              asChild
                            >
                              <Link to={`/blog/${post.id}`}>
                                Read More <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">لم يتم العثور على مقالات</h3>
                  <p className="text-gray-600">جرّب تعديل بحثك أو معايير التصفية.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 sticky top-8">
              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#d78525] text-right">المقالات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div
                        key={post.id}
                        className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                      >
                        <h4
                          dir="auto"
                          className="font-semibold text-sm mb-1 hover:text-[#d78525] cursor-pointer transition-colors text-right"
                        >
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <div className="flex items-center justify-end text-xs text-gray-500">
                          <span>{post.publishDate ? formatDate(post.publishDate) : 'No date'}</span>
                          <Calendar className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#d78525] text-right">الفئات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories
                      .filter((cat) => cat !== 'All')
                      .map((category) => {
                        const count = publishedPosts.filter(
                          (post) => post.category === category
                        ).length;
                        return (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-right px-3 py-2 rounded-md text-sm transition-colors ${
                              selectedCategory === category
                                ? 'bg-blue-100 text-blue-700'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">({count})</span>
                              <span dir="auto">{category}</span>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#d78525] text-right">العلامات الشائعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-[#d78525] hover:border-[#d78525] text-xs"
                        onClick={() => setSearchTerm(tag)}
                      >
                        <span dir="auto">{tag}</span>
                        <Tag className="h-3 w-3 mr-1" />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-white text-black">
                <CardHeader>
                  <CardTitle className="text-lg text-[#d78525] text-right">اشترك في النشرة البريدية</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 text-right">
                    احصل على آخر المقالات والتحديثات مباشرة في بريدك الإلكتروني
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="بريدك الإلكتروني"
                      className="text-right"
                      style={{ direction: 'rtl' }}
                    />
                    <Button className="w-full bg-[#d78525] hover:bg-[#d78525] text-white">
                      اشتراك
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;