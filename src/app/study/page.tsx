'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Word } from '@/types/word';

export default function Study() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        setWords(data);
      }
    } catch (error) {
      setError('単語の取得に失敗しました');
      console.error('Error fetching words:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
          <button 
            onClick={fetchWords}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">単語が登録されていません</p>
          <Link 
            href="/words"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            単語を追加する
          </Link>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const progress = (currentIndex / words.length) * 100;

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
    setCompleted([...completed, currentWord.id]);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-8">
            <Link 
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              ← 戻る
            </Link>
            <div className="text-gray-600 dark:text-gray-300">
              {currentIndex + 1} / {words.length}
            </div>
          </div>

          {/* プログレスバー */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* 単語カード */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 min-h-[300px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="text-center">
              {!isFlipped ? (
                <>
                  <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    {currentWord.word}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    クリックして意味を表示
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    {currentWord.meaning}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {currentWord.example}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* コントロールボタン */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white disabled:opacity-50"
            >
              前へ
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
            >
              {currentIndex === words.length - 1 ? '完了' : '次へ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 