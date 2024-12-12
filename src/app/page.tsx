import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            単語マスター
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            効率的に単語を学習・管理できるアプリ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/study" 
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">学習を始める</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">保存した単語を復習しましょう</p>
            </div>
          </Link>

          <Link href="/words"
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">単語を追加</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">新しい単語を登録できます</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              現在の登録単語数: <span className="font-bold text-blue-600 dark:text-blue-300">0</span> 個
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
