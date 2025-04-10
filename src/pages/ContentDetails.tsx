import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Eye, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Loading from '../components/Loading/Loading';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { linkvertise } from '../utils/linkvertise';

type ContentItem = {
  id: number;
  name: string;
  link: string;
  category: string;
  createdAt: string;
  description?: string;
  imageUrl?: string;
  views: number;
  isVip?: boolean;
};

const ContentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (content?.isVip === false) {
        linkvertise("1329936", { blacklist: ["discord.gg", "t.me"] });
    }
  }, [content?.isVip]);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        setLoading(true);
        
        // Try fetching from free content first
        try {
          const freeResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/freecontent/slug/${slug}`
          );
          setContent({ ...freeResponse.data, isVip: false });
          return;
        } catch (freeError) {
          // If not found in free content, try VIP content
          if (token) {
            const vipResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/vipcontent/slug/${slug}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setContent({ ...vipResponse.data, isVip: true });
          } else {
            throw new Error('Content not found');
          }
        }
      } catch (err) {
        setError('Content not found');
        console.error('Error fetching content details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetails();
  }, [slug, token]);

  const handleViewClick = async () => {
    if (!content) return;
    
    try {
      const endpoint = content.isVip ? 'vipcontent' : 'freecontent';
      const config = content.isVip ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } : {};

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${endpoint}/${content.id}/views`,
        {},
        config
      );
    } catch (error) {
      console.error("Error counting view:", error);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Content Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(content.isVip ? '/vip' : '/')}
          className={`mb-8 inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to {content.isVip ? 'VIP' : 'Free'} Content
        </button>

        <div className={`rounded-2xl p-8 ${
          theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white shadow-lg'
        }`}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {content.name}
              </h1>
              {content.isVip && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-purple-900/50 text-purple-300'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  VIP Content
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className={`flex items-center px-3 py-1.5 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-emerald-400' 
                  : 'bg-emerald-50 text-emerald-700'
              }`}>
                <Tag className="w-4 h-4 mr-2" />
                {content.category}
              </div>

              <div className={`flex items-center px-3 py-1.5 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Eye className="w-4 h-4 mr-2" />
                {content.views} views
              </div>

              <div className={`flex items-center px-3 py-1.5 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <Calendar className="w-4 h-4 mr-2" />
                {formatDistanceToNow(new Date(content.createdAt), {
                  addSuffix: true,
                  locale: enUS,
                })}
              </div>
            </div>

            {content.description && (
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {content.description}
              </p>
            )}

            {content.imageUrl && (
              <img
                src={content.imageUrl}
                alt={content.name}
                className="w-full h-auto rounded-xl object-cover"
              />
            )}

            <a
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleViewClick}
              className={`inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 font-medium rounded-xl transition-colors ${
                content.isVip
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              Visit Resource
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;