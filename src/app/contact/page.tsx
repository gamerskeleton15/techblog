import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="prose prose-lg mx-auto">
          <p>
            We value your feedback, questions, and suggestions. Whether you have a
            topic you'd like us to cover, a correction for one of our articles, or
            a business inquiry, we'd love to hear from you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            How to Reach Us
          </h2>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Email
            </h3>
            <p className="mb-4">
              The quickest way to reach us is by email:
              <a
                href="mailto:contact@techblog.example.com"
                className="text-blue-600 hover:underline ml-2"
              >
                contact@techblog.example.com
              </a>
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
              Contact Form
            </h3>
            <ContactForm />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Response Time
          </h2>
          <p>
            We aim to respond to all inquiries within 48 hours on business days.
            For urgent matters, we recommend reaching out via our social media
            channels (links available in the site footer).
          </p>
        </div>
      </div>
    </div>
  );
}