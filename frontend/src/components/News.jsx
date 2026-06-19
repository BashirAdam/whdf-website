// components/News.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, User, BookOpen, ChevronRight, Play  } from 'lucide-react';
import { api } from '../api';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../utils/mediaUrl';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await api.getPublishedNews();
        setNewsArticles(response || []);
      } catch (error) {
        console.log('No news articles available');
        setNewsArticles([]);
      }
    };
    loadNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* News List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {newsArticles.length > 0 ? (
          newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
  {(article.image || article.video) && (
    article.image ? (
      <img
        src={getMediaUrl(article.image)}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
    ) : (
      <div className="w-full h-48 bg-gray-900 flex items-center justify-center">
        <Play className="h-16 w-16 text-white opacity-80" />
      </div>
    )
  )}
  <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date ? formatDate(article.date) : "No date"}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author || "Unknown"}
                  </div>
                  <Badge
                    className={
                      article.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
                {/* Title links to full article */}
                <Link to={`/news/${article.id}`}>
                  <CardTitle
                    dir="auto"
                    className="text-2xl hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {article.title}
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <div
                  dir="auto"
                  className="text-gray-600 mb-4 line-clamp-3 prose"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <Link to={`/news/${article.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No news yet</h3>
            <p className="text-gray-600">Check back soon for updates.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default News;