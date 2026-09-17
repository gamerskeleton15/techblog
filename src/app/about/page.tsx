import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          About This Blog
        </h1>

        <div className="prose prose-lg mx-auto">
          {/* Author intro */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-white rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold select-none">
              AA
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Abdul Ahad</h2>
              <p className="text-blue-600 font-medium mb-2">ML/AI Engineer in Training · Tech Writer</p>
              <p className="text-gray-600">
                ICS (Physics) graduate from Govt. Islamia Graduate College, Lahore, Pakistan.
                Passionate about machine learning, data science, and building things with Python.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Hey, I&apos;m Abdul 👋
          </h2>
          <p>
            Welcome to TechBlog — a space where I write about artificial intelligence,
            machine learning, software development, and the technology shaping our world.
            I started this blog because I believe the best way to solidify what you&apos;re
            learning is to teach it. Every article here is something I&apos;ve wrestled with,
            experimented on, or built myself.
          </p>

          <p className="mt-4">
            My background is in Physics (ICS) from Govt. Islamia Graduate College, Lahore.
            That foundation in analytical thinking and mathematics turned out to be the
            perfect launchpad for machine learning — a field where linear algebra, calculus,
            and statistics are the daily bread. Since then I&apos;ve been sharpening my skills
            in Python, ML/DL frameworks, and the broader data science ecosystem.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            What I Work With
          </h2>
          <ul className="list-none space-y-2 pl-0">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">→</span>
              <span><strong>Languages & Data:</strong> Python, SQL</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">→</span>
              <span><strong>ML / Classical:</strong> Scikit-learn, feature engineering, model evaluation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">→</span>
              <span><strong>Deep Learning:</strong> TensorFlow, PyTorch, neural network design</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">→</span>
              <span><strong>Specialisations:</strong> Natural Language Processing (NLP), Computer Vision</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            What You&apos;ll Find Here
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Machine Learning & AI:</strong> Beginner-friendly breakdowns of
              algorithms, architectures, and real project walkthroughs.
            </li>
            <li>
              <strong>Programming & Development:</strong> Python tutorials, SQL patterns,
              and general software engineering best practices.
            </li>
            <li>
              <strong>Computer Vision & NLP:</strong> Hands-on guides using PyTorch and
              Hugging Face for image and text tasks.
            </li>
            <li>
              <strong>Tech News & Gadgets:</strong> Reviews and analysis of the devices
              and trends worth paying attention to.
            </li>
            <li>
              <strong>Industry Insights:</strong> Honest takes on where AI and software
              are heading and what it means for developers.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            My Philosophy
          </h2>
          <p>
            I write for the person I was a year ago — someone eager to break into ML/AI
            but overwhelmed by the sheer volume of information out there. I aim for clarity
            over cleverness: real code, concrete examples, and honest acknowledgement of
            where things get tricky. No fluff, no hype.
          </p>
          <p className="mt-4">
            If an article saves you an hour of confused Googling, it has done its job.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Get in Touch
          </h2>
          <p>
            You can find my projects and code on{' '}
            <a
              href="https://github.com/gamerskeleton15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              GitHub (gamerskeleton15)
            </a>
            . For questions, collaboration ideas, or just to say hi, use the{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact form
            </Link>
            .
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Based in Lahore, Pakistan · Writing since 2026
          </p>
        </div>
      </div>
    </div>
  );
}
