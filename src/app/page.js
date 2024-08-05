// app/page.js
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-red-100 text-center py-20">
        <h1 className="text-5xl font-bold text-red-600 mb-4">Join the Conversation</h1>
        <p className="text-xl mb-8">Explore the latest blogs and trending discussions on ForumPulse.</p>
        <a href="/forum" className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700">
          Join the Discussion
        </a>
      </section>

      {/* Featured Blog Posts */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Featured Blog Posts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <img src="/images/blog1.jpg" alt="Blog 1" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Blog Post Title 1</h3>
              <p className="text-gray-600">A brief description of the blog post content goes here...</p>
              <a href="/blog/post-1" className="text-red-600 mt-4 inline-block hover:underline">Read More</a>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <img src="/images/blog2.jpg" alt="Blog 2" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Blog Post Title 2</h3>
              <p className="text-gray-600">A brief description of the blog post content goes here...</p>
              <a href="/blog/post-2" className="text-red-600 mt-4 inline-block hover:underline">Read More</a>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <img src="/images/blog3.jpg" alt="Blog 3" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Blog Post Title 3</h3>
              <p className="text-gray-600">A brief description of the blog post content goes here...</p>
              <a href="/blog/post-3" className="text-red-600 mt-4 inline-block hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Forum Topics */}
      <section className="bg-red-50 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Trending Forum Topics</h2>
          <ul className="space-y-4">
            <li className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">Forum Topic Title 1</h3>
              <p className="text-gray-600">A brief description of the forum topic goes here...</p>
              <a href="/forum/topic-1" className="text-red-600 mt-4 inline-block hover:underline">Join the Discussion</a>
            </li>
            <li className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">Forum Topic Title 2</h3>
              <p className="text-gray-600">A brief description of the forum topic goes here...</p>
              <a href="/forum/topic-2" className="text-red-600 mt-4 inline-block hover:underline">Join the Discussion</a>
            </li>
            <li className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">Forum Topic Title 3</h3>
              <p className="text-gray-600">A brief description of the forum topic goes here...</p>
              <a href="/forum/topic-3" className="text-red-600 mt-4 inline-block hover:underline">Join the Discussion</a>
            </li>
          </ul>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for the latest updates and discussions.</p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-1/2 max-w-md rounded-l-md text-gray-800"
            />
            <button type="submit" className="bg-white text-red-600 p-3 rounded-r-md hover:bg-gray-200">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
