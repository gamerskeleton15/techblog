import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg mx-auto">
          <p>
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>

          <p>
            Welcome to TechBlog. These Terms of Service govern your use of the
            TechBlog website operated by TechBlog. By accessing or using our
            website, you agree to be bound by these Terms. If you disagree with
            any part of the terms, you may not access the website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Intellectual Property
          </h2>
          <p>
            The website and its original content, features, and functionality are
            owned by TechBlog and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property or
            proprietary rights laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Links to Other Websites
          </h2>
          <p>
            Our Service may contain links to third-party web sites or services
            that are not owned or controlled by TechBlog. TechBlog has no control
            over, and assumes no responsibility for, the content, privacy
            policies, or practices of any third party web sites or services. You
            further acknowledge and agree that TechBlog shall not be responsible
            or liable, directly or indirectly, for any damage or loss caused or
            alleged to be caused by or in connection with use of or reliance on
            any such content, goods or services available on or through any such
            web sites or services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Termination
          </h2>
          <p>
            We may terminate or suspend access to our Service immediately, without
            prior notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Limitation of Liability
          </h2>
          <p>
            In no event shall TechBlog, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the Service; (ii) any conduct or content of
            any third party on the Service; (iii) any content obtained from the
            Service; and (iv) unauthorized access, use or alteration of your
            transmissions or content, whether based on warranty, contract, tort
            (including negligence) or any other legal theory, whether or not we
            have been informed of the possibility of such damage, and even if a
            remedy set forth herein is found to have failed of its essential
            purpose.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Disclaimer
          </h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided
            on an "AS IS" and "AS AVAILABLE" basis. The Service is provided
            without warranties of any kind, whether express or implied, including,
            but not limited to, implied warranties of merchantability, fitness for
            a particular purpose, non-infringement or course of performance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Governing Law
          </h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws
            of [Your Country/State], without regard to its conflict of law
            provisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Changes
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking effect.
            What constitutes a material change will be determined at our sole
            discretion.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a
              href="mailto:contact@techblog.example.com"
              className="text-blue-600 hover:underline"
            >
              contact@techblog.example.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}