import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - TechBlog',
  description:
    'Read the TechBlog privacy policy to understand how we collect, use, and protect your personal information, including our use of cookies and Google AdSense.',
  openGraph: {
    title: 'Privacy Policy - TechBlog',
    description: 'How TechBlog collects, uses, and protects your personal information.',
    type: 'website',
    siteName: 'TechBlog',
  },
};

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
            Google AdSense &amp; Advertising
          </h2>
          <p>
            We use Google AdSense to serve advertisements on our website. Google
            AdSense uses cookies to serve ads based on a user&apos;s prior visits to
            your website or other websites on the internet. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads based on
            your visit to this site and/or other sites on the internet. You may
            opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-3">
            Google DoubleClick DART Cookie
          </h3>
          <p>
            Google, as a third-party vendor, uses the DART cookie to serve ads on
            our website. The DART cookie enables Google to serve ads to our
            visitors based on their visits to our site and other sites on the
            Internet. Users may opt out of the use of the DART cookie by visiting
            the{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Ad and Content Network Privacy Policy
            </a>
            .
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-3">
            Advertising Partners &amp; Cookies
          </h3>
          <p>
            Some of the ads served on our website may be provided by third-party
            advertising networks. These networks may use technologies such as
            cookies and web beacons to collect non-personally identifiable
            information including your IP address, your ISP, the browser you used
            to visit our site, and in some cases, whether you have Flash
            installed. This data is used to deliver advertisements targeted to
            your interests, to better understand the usage and visitation of our
            site and other sites tracked by these companies, and to serve
            targeted advertising.
          </p>
          <p className="mt-3">
            You can opt out of the use of cookies for personalized advertising by
            visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.aboutads.info/choices
            </a>{' '}
            or{' '}
            <a
              href="https://optout.networkadvertising.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Network Advertising Initiative Opt-Out
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Analytics
          </h2>
          <p>
            We may use third-party analytics tools, including but not limited to
            Google Analytics, to collect and analyse information about the use of
            our website. These tools collect data such as how often users visit
            the site, what pages they visit, and what other sites they used prior
            to coming to this site. We use this data solely to improve our
            Service. Google Analytics collects only the IP address assigned to you
            on the date you visit this site, rather than your name or other
            identifying information. We do not combine the information collected
            through the use of Google Analytics with personally identifiable
            information. You can prevent Google Analytics from recognising you on
            return visits by disabling cookies in your browser or by installing
            the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Analytics Opt-Out Browser Add-on
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            GDPR Compliance (For EEA Visitors)
          </h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have
            certain data protection rights under the General Data Protection
            Regulation (GDPR). TechBlog aims to take reasonable steps to allow
            you to correct, amend, delete, or limit the use of your personal
            data.
          </p>
          <p className="mt-3">Under the GDPR, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to the processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data (data portability)</li>
            <li>Withdraw consent at any time where we relied on your consent to process your personal data</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at{' '}
            <a
              href="mailto:abdulahad200916@gmail.com"
              className="text-blue-600 hover:underline"
            >
              abdulahad200916@gmail.com
            </a>
            . We will respond to your request within 30 days.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Consent
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms. If you require any more information or have any
            questions about our privacy policy, please feel free to contact us.
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
              href="mailto:abdulahad200916@gmail.com"
              className="text-blue-600 hover:underline"
            >
              abdulahad200916@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}