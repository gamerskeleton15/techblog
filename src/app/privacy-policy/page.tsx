export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg mx-auto">
          <p>
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>

          <p>
            TechBlog (“us”, “we”, or “our”) operates the TechBlog website. This
            page informs you of our policies regarding the collection, use, and
            disclosure of personal information when you use our Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Information Collection and Use
          </h2>
          <p>
            We collect several different types of information for various purposes
            to provide and improve our Service to you. This may include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Personal Data: While using our Service, we may ask you to provide
              us with certain personally identifiable information that can be used
              to contact or identify you (“Personal Data”). This may include, but
              is not limited to your email address, name, and cookies and usage
              data.
            </li>
            <li>
              Usage Data: We may also collect information how the Service is
              accessed and used (“Usage Data”). This Usage Data may include
              information such as your computer’s Internet Protocol address (e.g.
              IP address), browser type, browser version, the pages of our Service
              that you visit, the time and date of your visit, the time spent on
              those pages, unique device identifiers and other diagnostic data.
            </li>
            <li>
              Cookies & Tracking Technologies: We use cookies and similar tracking
              technologies to track the activity on our Service and hold certain
              information. Cookies are files with small amount of data which may
              include an anonymous unique identifier.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Use of Data
          </h2>
          <p>TechBlog uses the collected data for various purposes:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis so that we can improve our Service
            </li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Data Security
          </h2>
          <p>
            The security of your data is important to us, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Data, we cannot guarantee
            its absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Third-Party Services
          </h2>
          <p>
            We may employ third-party companies and individuals to facilitate our
            Service, to provide the Service on our behalf, to perform
            Service-related functions or to assist us in analyzing how our Service
            is used. These third parties have access to your Personal Data only to
            perform these tasks on our behalf and are obligated not to disclose or
            use it for any other purpose.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Google AdSense
          </h2>
          <p>
            We use Google AdSense to serve advertisements on our website. Google
            AdSense uses cookies to serve ads based on a user’s prior visits to
            your website or other websites on the internet. Google’s use of
            advertising cookies enables it and its partners to serve ads based on
            your visit to this site and/or other sites on the internet. You may
            opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Children’s Privacy
          </h2>
          <p>
            Our Service does not address anyone under the age of 13
            (“Children”). We do not knowingly collect personally identifiable
            information from anyone under the age of 13. If you are a parent or
            guardian and you are aware that your child has provided us with
            Personal Data, please contact us. If we become aware that we have
            collected Personal Data from children without verification of parental
            consent, we take steps to remove that information from our servers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{' '}
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