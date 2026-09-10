import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          About This Blog
        </h1>

        <div className="prose prose-lg mx-auto">
          <p>
            Welcome to TechBlog, your trusted source for the latest technology news,
            in-depth programming tutorials, honest gadget reviews, and insightful
            industry analysis. Founded in 2024 by a team of passionate technologists,
            our mission is to make complex technology topics accessible to everyone,
            from beginners to seasoned professionals.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Our Purpose
          </h2>
          <p>
            In today's rapidly evolving tech landscape, staying informed can be
            overwhelming. We cut through the noise to deliver clear, accurate, and
            practical information that helps our readers make better decisions,
            whether they're choosing a new smartphone, learning a programming
            language, or understanding the implications of emerging technologies
            like AI and blockchain.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            What We Cover
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Artificial Intelligence:</strong> From practical AI
              applications to ethical considerations and future implications.
            </li>
            <li>
              <strong>Programming & Development:</strong> Tutorials, best practices,
              and insights across multiple languages and frameworks.
            </li>
            <li>
              <strong>Gadget Reviews:</strong> Honest, in-depth reviews of the
              latest smartphones, laptops, wearables, and smart home devices.
            </li>
            <li>
              <strong>Industry News:</strong> Breaking news and analysis from the
              world of tech, including major company announcements and market
              trends.
            </li>
            <li>
              <strong>How-To Guides:</strong> Step-by-step tutorials for solving
              common tech problems and learning new skills.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Meet the Team
          </h2>
          <p>
            Our team consists of experienced software engineers, tech journalists,
            and industry analysts who bring diverse perspectives to every piece of
            content we create. We're committed to editorial integrity, thorough
            research, and transparent reporting.
          </p>

          <p className="mt-6">
            Have questions or suggestions? <Link href="/contact" className="text-blue-600 hover:underline">
              Get in touch with us
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}